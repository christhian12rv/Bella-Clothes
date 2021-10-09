$(".sidebar-link.usuarios").addClass("active").addClass("only");
$(".sidebar-link.ver-usuarios").addClass("active");

var usuarioNomeName;
let usuarioCadastroName;
$(document).ready(function () {
    var table = $('#table-usuarios').DataTable({
        lengthMenu: [[3, 10, 25, 50, -1], ["Exibir " + 3, "Exibir " + 10, "Exibir " + 25, "Exibir " + 50, "Exibir Todos"]],
        processing: true,
        serverSide: true,
        dom:
            '<"top"' +
            '<"d-flex flex-row flex-wrap"' +
            '<"flex-grow-1" B>' +
            '<"" l>' +
            '<"" f>' +
            '<"column-filter-to-select">' +
            '>>' +
            'rt' +
            '<"bottom"' +
            '<"row"' +
            '<"col-sm-12 col-md-6" i>' +
            '<"col-sm-12 col-md-6" p>' +
            '>>' +
            '<"clear">',
        buttons: [
            'pdf', 'print'
        ],
        ajax: {
            url: '/api/usuarios',
            dataSrc: 'usuarios'
        },
        columns: [
            { data: '_id', name: '_id' },
            { data: 'foto', name: 'foto' },
            {
                data: (data) => {
                    if (data.tipo_usuario.nome) {
                        usuarioNomeName = 'tipo_usuario.nome';
                        return data.tipo_usuario.nome
                    } else {
                        usuarioNomeName = 'tipo_usuario.razao_social';
                        return data.tipo_usuario.razao_social;
                    }
                },
                name: 'nome_and_razao_social'
            },
            { data: 'email', name: 'email' },
            {
                data: (data) => {
                    return data.tipo_usuario.cpf || data.tipo_usuario.cnpj;
                },
                name: 'cpf_and_cnpj'
            },
            { data: 'ativo', name: 'ativo' },
            { data: 'createdAt', name: 'createdAt' },
            { data: '_id', name: '_id' }
        ],
        columnDefs: [
            {
                targets: [1],
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {
                    if (data)
                        return '<img src="/img/foto-usuarios/' + data + '" class="foto-perfil-usuario">';
                    else
                        return '<i class="bi bi-person-fill foto-perfil-usuario"></i>'
                }
            },
            {
                targets: [4],
                "orderable": false,
            },
            {
                targets: [5],
                render: function (data, type, row, meta) {
                    if (data)
                        return '<span class="badge badge-success py-2 px-3">' + data + '</span>';
                    else
                        return '<span class="badge badge-danger py-2 px-3">' + data + '</span>';
                }
            },
            {
                targets: [6],
                "searchable": false,
            },
            {
                targets: [7],
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {
                    return '<a href="/admin/usuario/' + data + '" class="ver-usuario mr-2"><i class="bi bi-pencil-square"></i></a>' +
                        '<a href="/admin/excluir-usuario/' + data + '" class="excluir-usuario mr-2"><i class="bi bi-eraser"></i></a>' +
                        '<label class="switch switch-ativar-usuario"><input type="checkbox"><span class="slider slider-ativar-usuario round"></span></label>';
                }
            }
        ],
        language: {
            "url": "/json/datatable-language-pt_br.json"
        }
    })


})
