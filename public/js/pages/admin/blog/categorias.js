$(".sidebar-link.blog").addClass("active").addClass("only");
$(".sidebar-link.categorias").addClass("active");

$("#search-categorias").on("input", function () {
    var search = $.trim($(this).val().toLowerCase());
    $(".category-card").each(function () {
        var categoryInput = $.trim($(this).find("#categoria").val().toLowerCase());
        if (categoryInput.search(search) >= 0) {
            $(this).removeClass("notOnSearch");

        } else {
            $(this).addClass("notOnSearch");
        }
    })
})

var meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
];

$(".adicionar-categoria").on("click", function () {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var date = day + " " + meses[month] + " " + year;

    $("#category-flex").prepend(newcategory(date));
})


/*********************************************************************** FUNÇÕES **************************************************************************************************/

function newcategory(date) {
    var category =
        '<div class="category-card">' +
        '        <form action="#" method="POST">' +
        '            <header class="category-card__header">' +
        '                <div class="badge new-category-badge p-1">' +
        '                   <p class="m-0">Novo</p>' +
        '                </div>' +
        '                <label class="switch">' +
        '                    <input type="checkbox" id="cp-dark-sidebar" checked>' +
        '                    <span class="slider round"></span>' +
        '                </label>' +
        '                <p class="category-id mt-3">1</p>' +
        '                <div>' +
        '                    <input type="text" placeholder="categoria" name="categoria" id="categoria" required>' +
        '                </div>' +
        '                <div class="mt-1">' +
        '                    <textarea name="descricao" id="descricao" placeholder="Descrição" class="mb-0" rows="3"' +
        '                        required></textarea>' +
        '                </div>' +
        '                <div>' +
        '                    <input type="text" name="slug" id="slug" placeholder="Slug" required></input>' +
        '                </div>' +
        '                <p class="data-criacao mt-3">Data de criação:<span class="ml-2">' + date + '</span></p>' +
        '            </header>' +
        '            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="wave" preserveAspectRatio="none">' +
        '                <path class="path-wave" fill-opacity="1"' +
        '                    d="M0,192L80,181.3C160,171,320,149,480,165.3C640,181,800,235,960,250.7C1120,267,1280,245,1360,234.7L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z">' +
        '                </path>' +
        '            </svg>' +
        '            <section class="category-card__body">' +

        '                <div class="category-card__title">' +
        '                    <div class="mb-3">' +
        '                        <span class="badge-title px-2 py-1 mr-2">31</span>' +
        '                        posts' +
        '                    </div>' +
        '                </div>' +
        '            </section>' +
        '            <div class="submit-div">' +
        '                <input type="submit" value="Salvar" class="btn">' +
        '                <a href="/excluir-categoria" class="btn excluir-categoria">Excluir</a>' +
        '            </div>' +
        '        </form>' +
        '    </div>';
    return category;
}