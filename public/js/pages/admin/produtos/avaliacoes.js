$(".sidebar-link.produtos").addClass("active").addClass("only");
$(".sidebar-link.avaliacoes").addClass("active");

$(document).ready(function () {
    var table = $('#table-avaliacoes').DataTable({
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
            url: '/get/avaliacoes',
            dataSrc: ''
        },
        columns: [
            { data: 'id' },
            { data: 'fotoUsuario' },
            { data: 'usuario' },
            { data: 'fotoProduto' },
            { data: 'produto' },
            { data: 'avaliacao' },
            { data: 'data' },
            { data: 'id' }
        ],
        columnDefs: [
            {
                targets: [1],
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {
                    return '<img src="/img/' + data + '" class="foto-usuario mr-2">';
                }
            },
            {
                targets: [3],
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {
                    return '<img src="/img/' + data + '" class="foto-produto mr-2">';
                }
            },
            {
                targets: [5],
                "searchable": false,
                render: function (data, type, row, meta) {
                    var estrelasAvaliacao = "";
                    if (data > 0)
                        for (let i = 1; i <= data; i++)
                            estrelasAvaliacao += "<i class='bi bi-star-fill estrelas-avaliacao'></i>";
                    var estrelasRestantes = 5 - data;
                    if (estrelasRestantes > 0)
                        for (let i = 1; i <= estrelasRestantes; i++)
                            estrelasAvaliacao += "<i class='bi bi-star estrelas-avaliacao'></i>";
                    return estrelasAvaliacao;
                }
            },
            {
                targets: [7],
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {
                    return '<a href="/produto/' + data + '" class="ver-avaliacao mr-2"><i class="bi bi-globe2"></i></a>' +
                        '<label class="switch switch-ativar-avaliacao"><input type="checkbox" checked><span class="slider slider-ativar-avaliacao round"></span></label>';
                }
            }
        ],
        "language": {
            "url": "/json/datatable-language-pt_br.json"
        }
    })
})
