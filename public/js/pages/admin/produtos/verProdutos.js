$(".sidebar-link.produtos").addClass("active").addClass("only");
$(".sidebar-link.ver-produtos").addClass("active");

$(document).ready(function () {
    var table = $('#table-produtos').DataTable({
        "lengthMenu": [[10, 25, 50, -1], ["Exibir " + 10, "Exibir " + 25, "Exibir " + 50, "Exibir Todos"]],
        processing: true,
        serverSide: true,
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
            dataSrc: 'produtos'
        },
        columns: [
            { data: '_id' },
            { data: 'produto' },
            { data: 'nome_produto' },
            { data: 'categoria.nome' },
            { data: 'subcategoria.nome' },
            { data: 'ativo' },
            { data: 'createdAt' },
            { data: '_id' }
        ],
        columnDefs: [
            {
                targets: [1],
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {
                    console.log(data[0].imagens[0])
                    return '<div class="foto-produto" style="--foto-perfil:url(/img/produtos/' + data[0].imagens[0] + ');"></div>'
                }
            },
            {
                targets: [7],
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {
                    return '<a href="/produto/' + data + '" class="ver-produto-loja mr-2"><i class="bi bi-globe2"></i></a>' +
                        '<a href="/admin/produto/' + data + '" class="ver-produto mr-2"><i class="bi bi-pencil-square"></i></a>' +
                        '<label class="switch switch-ativar-produto"><input type="checkbox"><span class="slider slider-ativar-produto round"></span></label>';
                }
            },
            {
                targets: [5],
                render: function (data, type, row, meta) {
                    if (data == true)
                        return '<span class="badge badge-success py-2 px-3">' + data + '</span>';
                    else if (data == false)
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
                    let ativo = row.ativo ? "checked" : "";
                    return '<a href="/admin/produto/' + data + '" class="ver-produto mr-2"><i class="bi bi-pencil-square"></i></a>' +
                        '<a href="javascript: void(0)" class="excluir-produto mr-2"><i class="bi bi-eraser"></i></a>' +
                        '<label class="switch switch-ativar-produto"><input type="checkbox" class="checkbox-ativar-produto"' + ativo + '><span class="slider slider-ativar-produto round"></span></label>';
                }
            }
        ],
        "language": {
            "url": "/json/datatable-language-pt_br.json"
        }
    })
})
