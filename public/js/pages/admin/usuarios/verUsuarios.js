$(document).ready(function () {
    var table = $('#table-usuarios').DataTable({
        responsive: true,
        dom:
            '<"top"' +
            '<"row"' +
            '<"col-sm-12 col-md-4" l>' +
            '<"col-sm-12 col-md-4" B>' +
            '<"col-sm-12 col-md-4" f>' +
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
            url: '/get/usuarios',
            dataSrc: ''
        },
        columns: [
            { data: 'id' },
            { data: 'foto' },
            { data: 'nome' },
            { data: 'email' },
            { data: 'cpf_cnpj' },
            { data: 'telefone' },
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
                    return '<a href="/admin/usuario/' + data + '" class="ver-usuario mr-2"><i class="bi bi-eye-fill"></i></a>' +
                        '<a href="/admin/excluir-usuario/' + data + '" class="excluir-usuario"><i class="bi bi-trash"></i></a>';
                }
            }, {
                targets: [4, 5],
                "orderable": false,
            }
        ],
        "language": {
            "url": "/json/datatable-language-pt_br.json"
        }
    })
})
