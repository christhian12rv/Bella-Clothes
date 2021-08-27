$(".sidebar-link.usuarios").addClass("active").addClass("only");
$(".sidebar-link.ver-usuarios").addClass("active");

$(document).ready(function () {
    var table = $('#table-usuarios').DataTable({
        "lengthMenu": [[10, 25, 50, -1], ["Exibir " + 10, "Exibir " + 25, "Exibir " + 50, "Exibir Todos"]],
        processing: true,
        dom:
            '<"top"' +
            '<"d-flex flex-row flex-wrap"' +
            '<"flex-grow-1" B>' +
            '<"" l>' +
            '<"" f>' +
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
            dataSrc: ''
        },
        columns: [
            { data: 'id' },
            { data: 'foto' },
            { data: 'nome' },
            { data: 'email' },
            { data: 'cpf_cnpj' },
            { data: 'status' },
            { data: 'data_registro' },
            { data: 'id' }
        ],
        columnDefs: [
            {
                targets: [1],
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {
                    return '<img src="/img/foto-usuarios/' + data + '" class="foto-perfil-usuario mr-2">';
                }
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
            }, {
                targets: [4],
                "orderable": false,
            },
            {
                targets: [5],
                render: function (data, type, row, meta) {
                    if (data == "Ativo")
                        return '<span class="badge badge-success py-2 px-3">' + data + '</span>';
                    else if (data == "Inativo")
                        return '<span class="badge badge-danger py-2 px-3">' + data + '</span>';
                }
            }
        ],
        "language": {
            "url": "/json/datatable-language-pt_br.json"
        }
    })
})
