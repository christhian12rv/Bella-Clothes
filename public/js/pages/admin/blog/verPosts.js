$(".sidebar-link.blog").addClass("active").addClass("only");
$(".sidebar-link.posts").addClass("active");

$(document).ready(function () {
    var table = $('#table-posts').DataTable({
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
            url: '/api/posts',
            dataSrc: ''
        },
        columns: [
            { data: 'id' },
            { data: 'titulo' },
            { data: 'categoria' },
            { data: 'fotoAdmin' },
            { data: 'postadoPor' },
            { data: 'data' },
            { data: 'id' }
        ],
        columnDefs: [
            {
                targets: [3],
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {
                    return '<img src="/img/' + data + '" class="foto-admin mr-2">';
                }
            },
            {
                targets: [6],
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {
                    return '<a href="/blog/post/' + row.slug + '" class="ver-post-loja mr-2"><i class="bi bi-globe2"></i></a>' +
                        '<a href="/admin/blog/post/' + data + '" class="ver-post mr-2"><i class="bi bi-pencil-square"></i></a>' +
                        '<label class="switch switch-ativar-post"><input type="checkbox" checked><span class="slider slider-ativar-post round"></span></label>';
                }
            }
        ],
        "language": {
            "url": "/json/datatable-language-pt_br.json"
        }
    })
})
