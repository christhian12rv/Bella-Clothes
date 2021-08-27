$(".sidebar-link.usuarios").addClass("active").addClass("only");
$(".sidebar-link.ver-pedidos").addClass("active");

$(document).ready(function () {
    var table = $('#table-pedidos').DataTable({
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
            url: '/api/pedidos',
            dataSrc: ''
        },
        columns: [
            { data: 'id' },
            { data: 'foto' },
            { data: 'nome' },
            { data: 'email' },
            { data: 'produtos' },
            { data: 'total' },
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
                    return '<img src="/img/foto-usuarios/' + data + '" class="foto-perfil-usuario mr-2">';
                }
            },
            {
                targets: [8],
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {
                    return '<a href="/admin/pedido/' + data + '" class="ver-pedido mr-2"><i class="bi bi-pencil-square"></i></a>';
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
                    if (data == "Entregue")
                        return '<span class="badge badge-success py-2 px-3">' + data + '</span>';
                    else if (data == "Cancelado")
                        return '<span class="badge badge-danger py-2 px-3">' + data + '</span>';
                    else if (data == "Pendente" || "Esperando pagamento")
                        return '<span class="badge badge-warning py-2 px-3">' + data + '</span>';
                }
            }
        ],
        "language": {
            "url": "/json/datatable-language-pt_br.json"
        }
    })
})
