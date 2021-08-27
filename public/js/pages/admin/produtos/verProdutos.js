$(".sidebar-link.produtos").addClass("active").addClass("only");
$(".sidebar-link.ver-produtos").addClass("active");

$(document).ready(function () {
    var table = $('#table-produtos').DataTable({
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
            url: '/api/produtos',
            dataSrc: ''
        },
        columns: [
            { data: 'id' },
            { data: 'foto' },
            { data: 'produto' },
            { data: 'categoria' },
            { data: 'subcategoria' },
            { data: 'preco' },
            { data: 'status' },
            { data: 'data' },
            { data: 'id' }
        ],
        columnDefs: [
            {
                targets: [1],
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {
                    return '<img src="/img/' + data + '" class="foto-produto mr-2">';
                }
            },
            {
                targets: [8],
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {
                    return '<a href="/produto/' + data + '" class="ver-produto-loja mr-2"><i class="bi bi-globe2"></i></a>' +
                        '<a href="/admin/produto/' + data + '" class="ver-produto mr-2"><i class="bi bi-pencil-square"></i></a>' +
                        '<label class="switch switch-ativar-produto"><input type="checkbox"><span class="slider slider-ativar-produto round"></span></label>';
                }
            }, {
                targets: [5],
                render: function (data, type, row, meta) {
                    return 'R$ ' + data;
                }
            },
            {
                targets: [6],
                render: function (data, type, row, meta) {
                    if (data == "Habilitado")
                        return '<span class="badge badge-success py-2 px-3">' + data + '</span>';
                    else if (data == "Desabilitado")
                        return '<span class="badge badge-danger py-2 px-3">' + data + '</span>';
                }
            }
        ],
        "language": {
            "url": "/json/datatable-language-pt_br.json"
        }
    })
})
