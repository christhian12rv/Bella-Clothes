const moment = require("moment");
moment.locale("pt-br");
require("moment-timezone");

const Categoria = require("../models/produto/Categoria");
const Subcategoria = require("../models/produto/Subcategoria");
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

exports.getSubcategoriasByCategoria = async (id_categoria) => {
    try {
        let subcategorias = await Subcategoria.find({ categoria: id_categoria }).sort({ nome: 1 }).lean().populate("categoria");
        subcategorias.forEach((subcategoria) => {
            subcategoria.createdAt = moment(subcategoria.createdAt).tz('America/Sao_Paulo').format('D MMMM YYYY');
        });
        return subcategorias;
    } catch (error) {
        throw new Error(error);
    }
}



exports.getUsuarios = async (query) => {
    let { columns, order, length, start, search } = query;
    search = search.value;
    let orderDir = order[0].dir == 'asc' ? 1 : -1;

    let columnToSortStr = columns[order[0].column].name;
    if (columnToSortStr.includes('_and_')) {
        columnToSortStr = columnToSortStr.split("_and_");
        columnToSortStr = columnToSortStr.map(column => 'tipo_usuario.' + column);
    }
    columnToSortStr = [columnToSortStr].flat();
    let columnToSort = columnToSortStr.map(column => "$" + column);


    let fieldsToSearch = [];
    columns.forEach(column => {
        let name = column.name;
        if (column.searchable != "true")
            return;
        if (name.includes('_and_')) {
            name = name.split("_and_");
            name.forEach(n => {
                n = 'tipo_usuario.' + n;
                if (!fieldsToSearch.some(field => field.hasOwnProperty(n))) {
                    if (n.includes('_id')) {
                        /^[0-9a-fA-F]{24}$/.test(search) && fieldsToSearch.push({
                            [name]: { '$regex': search, '$options': 'i' }
                        });
                        return;
                    }
                    fieldsToSearch.push({ [n]: { '$regex': search, '$options': 'i' } });
                }
            })
            return;
        }
        if (!fieldsToSearch.some(field => field.hasOwnProperty(name))) {
            if (name.includes('_id')) {
                /^[0-9a-fA-F]{24}$/.test(search) && fieldsToSearch.push({
                    [name]: { '$regex': search, '$options': 'i' }
                });
                return;
            }
            fieldsToSearch.push({ [name]: { '$regex': search, '$options': 'i' } });
        }
    })

    try {
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
                            if: {
                                $gt: [[columnToSort], 1]
                            },
                            then: {
                                $cond: {
                                    if: {
                                        $ifNull: [columnToSort[0], false]
                                    },
                                    then: columnToSort[0],
                                    else: columnToSort[1]
                                }
                            },
                            else: columnToSort[0]
                        }
                    }
                }
            },
            {
                $match: {
                    $or: search !== '' ? fieldsToSearch : [{}]
                }
            }
        ]).sort({ 'sort_field': orderDir })

        usuarios.forEach(usuario => {
            usuario.createdAt = moment(usuario.createdAt).tz('America/Sao_Paulo').format('D/MM/YYYY, HH:mm:ss');
        })

        let recordsTotal = await Usuario.find().countDocuments();
        let recordsFiltered = usuarios.length;
        if (length > -1)
            usuarios = usuarios.slice(parseInt(start), parseInt(length) + parseInt(start));

        return { usuarios: usuarios, recordsTotal: recordsTotal, recordsFiltered: recordsFiltered };
    } catch (error) {
        throw new Error(error);
    }
}