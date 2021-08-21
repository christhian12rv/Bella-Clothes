$(".sidebar-link.produtos").addClass("active").addClass("only");
$(".sidebar-link.ver-subcategorias").addClass("active");

$("#search-subcategorias").on("input", function () {
    var search = $.trim($(this).val().toLowerCase());
    $(".subcategory-card").each(function () {
        var categoryInput = $.trim($(this).find("#subcategoria").val().toLowerCase());
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

$(".adicionar-subcategoria").on("click", function () {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var date = day + " " + meses[month] + " " + year;

    $("#subcategory-flex").prepend(newsubcategory(date));
})


/*********************************************************************** FUNÇÕES **************************************************************************************************/

const regexExpSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/g;
function validateSlug(input) {
    if (!regexExpSlug.test(input.value)) {
        input.setCustomValidity("Digite um slug válido");
    } else {
        input.setCustomValidity("");
    }
}

function newsubcategory(date) {
    var subcategory =
        '<div class="subcategory-card">' +
        '        <form action="#" method="POST">' +
        '            <header class="subcategory-card__header">' +
        '                <div class="badge new-subcategory-badge p-1">' +
        '                   <p class="m-0">Novo</p>' +
        '                </div>' +
        '                <label class="switch">' +
        '                    <input type="checkbox" id="cp-dark-sidebar" checked>' +
        '                    <span class="slider round"></span>' +
        '                </label>' +
        '                <p class="subcategory-id mt-3">1</p>' +
        '                <div>' +
        '                    <input type="text" placeholder="Subcategoria" name="subcategoria" id="subcategoria" minlength="2" required>' +
        '                </div>' +
        '                <div class="mt-1">' +
        '                    <textarea name="descricao" id="descricao" placeholder="Descrição" minlength="3" class="mb-0" rows="3"' +
        '                        required></textarea>' +
        '                </div>' +
        '                <div>' +
        '                    <input type="text" name="slug" id="slug" placeholder="Slug" oninput="validateSlug(this)" required></input>' +
        '                </div>' +
        '                <div class="mt-1">' +
        '                    <select name="categoria" id="categoria" required>' +
        '                        <option value="">Escolha uma Categoria</option>' +
        '                        <option value="1">Roupas</option>' +
        '                        <option value="2">Calçados</option>' +
        '                        <option value="3">Acessórios</option>' +
        '                        <option value="4">Cosméticos</option>' +
        '                    </select>' +
        '                </div>' +
        '                <div class="mt-1">' +
        '                    <select name="genero" id="genero" required>' +
        '                        <option value="">Escolha um Gênero</option>' +
        '                        <option value="Homem">Homem</option>' +
        '                        <option value="Mulher">Mulher</option>' +
        '                        <option value="Unissex">Unissex</option>' +
        '                        <option value="Infantil">Infantil</option>' +
        '                    </select>' +
        '                </div>' +
        '                <p class="data-criacao mt-3">Data de criação:<span class="ml-2">' + date + '</span></p>' +
        '            </header>' +
        '            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="wave" preserveAspectRatio="none">' +
        '                <path class="path-wave" fill-opacity="1"' +
        '                    d="M0,192L80,181.3C160,171,320,149,480,165.3C640,181,800,235,960,250.7C1120,267,1280,245,1360,234.7L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z">' +
        '                </path>' +
        '            </svg>' +
        '            <section class="subcategory-card__body">' +

        '                <div class="subcategory-card__title">' +
        '                    <div class="mb-3">' +
        '                        <span class="badge-title px-2 py-1 mr-2">31</span>' +
        '                        produtos' +
        '                    </div>' +
        '                </div>' +
        '            </section>' +
        '            <div class="submit-div">' +
        '                <input type="submit" value="Salvar" class="btn">' +
        '                <a href="/excluir-subcategoria" class="btn excluir-subcategoria">Excluir</a>' +
        '            </div>' +
        '        </form>' +
        '    </div>';
    return subcategory;
}