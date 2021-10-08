const moment = require("moment");
moment.locale("pt-br");
require("moment-timezone");

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

// SEARCH - SIM
// SORT - NAO
// LIMIT - SIM
exports.getUsuarios = async (query) => {
    console.log(query)
    let { order, length, start, search } = query;
    search = search.value;
    let orderDir = order[0].dir == 'asc' ? 1 : -1;

    let getColumnToSort = (usuario, column) => {
        let columnToSort = {
            0: '_id',
            2: 'tipo_usuario.nome',
            3: 'email',
            5: 'ativo',
            6: 'createdAt',
            default: ''
        }
        let columnValue = columnToSort[column];
        if (column === 2)
            columnValue = columnValue.toString().toLowerCase();
        return columnValue;
    }

    let fieldsToUsuarioSearch = [
        {
            'email': { '$regex': search, '$options': 'i' }
        },
        {
            'ativo': { '$regex': search, '$options': 'i' }
        },
        {
            'tipo_usuario.nome': { '$regex': search, '$options': 'i' }
        },
        {
            'tipo_usuario.razao_social': { '$regex': search, '$options': 'i' }
        }
    ];
    /^[0-9a-fA-F]{24}$/.test(search) && fieldsToUsuarioSearch.push({
        '_id': { '$regex': search, '$options': 'i' }
    });
    try {
        /* let toUsuarioFind = search !== '' ? { "$or": fieldsToUsuarioSearch } : {};
        let toUsuarioFisicoFind = search !== '' ? { nome: search } : {};
        let toUsuarioJuridicoFind = search !== '' ? { razao_social: search } : {};
        let usuariosFisicos = await UsuarioFisico.find().populate('id_usuario').lean();
        let usuariosJuridicos = await UsuarioJuridico.find().populate('id_usuario').lean();

        let usuarios = usuariosFisicos.concat(usuariosJuridicos);
        usuarios = usuarios.filter(usuario => usuario.id_usuario);
        usuarios.sort((a, b) => {
            let nomeA = getColumnToSort(a, parseInt(order[0].column));
            let nomeB = getColumnToSort(b, parseInt(order[0].column));
            if (nomeA < nomeB) { return orderDir * -1; }
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
                return ata;
            })
        }

        usuarios.forEach((usuario) => {
            usuario.id_usuario.createdAt = moment(usuario.createdAt).tz('America/Sao_Paulo').format('D/MM/YYYY')
        });
        usuarios = usuarios.slice(length, length + start);

        const totalUsuarios = await Usuario.find().count();
 */
        /* await Usuario.find(toFind).skip(parseInt(start)).sort(sort).limit(parseInt(length)).lean(); */


        let usuarios = await Usuario.aggregate([
            {
                $lookup: {
                    "from": "usuariosfisicos",
                    "localField": "_id",
                    "foreignField": "id_usuario",
                    "as": "tipo_usuario_fisico"
                }
            },
            {
                $lookup: {
                    "from": "usuariosjuridicos",
                    "localField": "_id",
                    "foreignField": "id_usuario",
                    "as": "tipo_usuario_juridico"
                }
            },
            {
                $addFields: {
                    tipo_usuario: {
                        $concatArrays: ["$tipo_usuario_fisico", "$tipo_usuario_juridico"]
                    }
                }
            },
            {
                $unset: ["tipo_usuario_fisico", "tipo_usuario_juridico"],
            },
            {
                $unwind: "$tipo_usuario"
            },
            {
                $addFields: {
                    sort_field: {
                        $cond: {
                            if: { $ifNull: ["$tipo_usuario.nome", false] },
                            then: "$tipo_usuario.nome",
                            else: "$tipo_usuario.razao_social"
                        }
                    }
                }
            },
            {
                $match: {
                    $or: search !== '' ? fieldsToUsuarioSearch : [{}]
                }
            }
        ]).sort({ 'sort_field': 1 }).skip(parseInt(start) * parseInt(length)).limit(parseInt(length))
        console.log(usuarios);
        let recordsTotal = await Usuario.find().countDocuments();
        let recordsFiltered = usuarios.length;
        return { usuarios: usuarios, recordsTotal: recordsTotal, recordsFiltered: recordsFiltered };
    } catch (error) {
        throw new Error(error);
    }
}