const Categoria = require("../models/produto/Categoria");
const Usuario = require("../models/usuario/registro/Usuario");
const UsuarioFisico = require("../models/usuario/registro/UsuarioFisico");
const UsuarioJuridico = require("../models/usuario/registro/UsuarioJuridico");

exports.getCategorias = async (body) => {
    try {
        let categorias = await Categoria.find().sort({ nome: 1 }).lean();
        return categorias;
    } catch (error) {
        throw new Error(error);
    }
}

exports.getUsuarios = async (query) => {
    let { order, length, start, search } = query;
    search = search.value;
    let orderDir = order[0].dir == 'asc' ? 1 : -1;

    let getColumnToSort = (usuario, column) => {
        let columnToSort = {
            0: usuario['id_usuario']['_id'],
            2: usuario['nome'],
            3: usuario['id_usuario']['email'],
            5: usuario['id_usuario']['ativo'],
            6: usuario['id_usuario']['createdAt'],
            default: ''
        }
        return columnToSort[column];
    }

    let fieldsToUsuarioSearch = [
        {
            email: search
        },
        {
            ativo: search
        }
    ];
    /^[0-9a-fA-F]{24}$/.test(search) && fieldsToUsuarioSearch.push({
        _id: search
    });
    try {
        let toUsuarioFind = search !== '' ? { "$or": fieldsToUsuarioSearch } : {};
        let toUsuarioFisicoFind = search !== '' ? { nome: search } : {};
        let toUsuarioJuridicoFind = search !== '' ? { razao_social: search } : {};
        let usuariosFisicos = await UsuarioFisico.find().populate({
            path: 'id_usuario',
            options: {
                skip: parseInt(start),
                limit: parseInt(length)
            }
        }).lean();
        let usuariosJuridicos = await UsuarioJuridico.find().populate({
            path: 'id_usuario',
            options: {
                skip: parseInt(start),
                limit: parseInt(length)
            }
        }).lean();

        let usuarios = usuariosFisicos.concat(usuariosJuridicos);
        usuarios = usuarios.filter(usuario => usuario.id_usuario);
        usuarios.sort((a, b) => {
            let nomeA = getColumnToSort(a, parseInt(order[0].column));
            let nomeB = getColumnToSort(b, parseInt(order[0].column));
            if (nomeA < nomeB) { return orderDir; }
            if (nomeA > nomeB) { return orderDir; }
            return 0;
        })
        if (search !== '') {
            usuarios = usuarios.filter(usuario => {
                let nome = usuario.nome || usuario.razao_social;
                let cadastro = usuario.cpf || usuario.cnpj;
                let ata = (usuario.id_usuario._id.toString().includes(search) ||
                    nome.includes(search) ||
                    usuario.id_usuario.email.includes(search) ||
                    cadastro.includes(search));
                console.log("ata " + ata);
                return ata;
            })
        }

        /* await Usuario.find(toFind).skip(parseInt(start)).sort(sort).limit(parseInt(length)).lean(); */
        console.log(usuarios);
        console.log("////////////////////////////")
        return usuarios;
    } catch (error) {
        throw new Error(error);
    }
}