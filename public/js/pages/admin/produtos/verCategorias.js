$(".sidebar-link.produtos").addClass("active").addClass("only");
$(".sidebar-link.ver-categorias").addClass("active");


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


$(".category-card__body, .path-wave, .submit-div").on("mouseenter", function () {
    if ($(this).attr("class") == "path-wave") {
        var card = $(this).parent("svg").parent("form").parent(".category-card");
        var cardBody = $(this).parent("svg").next(".category-card__body");
        var subcategoriasHeight = $(this).parent("svg").next(".category-card__body").children(".category-card__knowledge").outerHeight();
    } else if ($(this).attr("class") == "category-card__body") {
        var card = $(this).parent("form").parent(".category-card");
        var cardBody = $(this);
        var subcategoriasHeight = $(this).children(".category-card__knowledge").outerHeight();
    } else {
        var card = $(this).parent("form").parent(".category-card");
        var cardBody = $(this).prev();
        var subcategoriasHeight = $(this).prev().children(".category-card__knowledge").outerHeight();
    }
    card.addClass("body-open");
    cardBody.css("height", (parseInt(subcategoriasHeight) + 93) + "px");
})

$(".category-card__body, .path-wave, .submit-div").on("mouseleave", function () {
    if ($(this).attr("class") == "path-wave") {
        var card = $(this).parent("svg").parent("form").parent(".category-card");
        var cardBody = $(this).parent("svg").next(".category-card__body");
    } else if ($(this).attr("class") == "category-card__body") {
        var card = $(this).parent("form").parent(".category-card");
        var cardBody = $(this);
    } else {
        var card = $(this).parent("form").parent(".category-card");
        var cardBody = $(this).prev();
    }
    card.removeClass("body-open");
    cardBody.css("height", "80px");
})

$(".adicionar-categoria").on("click", function () {
    let date = moment().tz('America/Sao_Paulo').format('D MMMM YYYY');
    $("#category-flex").prepend(newCategory(date));
})

$(document).on("submit", ".form-editar-categoria", function (e) {
    e.preventDefault();
})

$(document).on("submit", ".form-adicionar-categoria", function (e) {
    e.preventDefault();
    let form = $(this);
    let categoria = form.find("#categoria");
    let descricao = form.find("#descricao");
    let slug = form.find("#slug");
    let modalLoader = form.prev(".modal-loader-category");
    modalLoader.addClass("show");
    $.ajax({
        url: "/admin/produtos/categorias",
        method: "POST",
        dataType: 'json',
        data: {
            categoria: categoria.val(),
            descricao: descricao.val(),
            slug: slug.val()
        }
    }).done(function (data) {
        console.log(data);
        console.log(moment.tz('America/Sao_Paulo').format(data.createdAt))
        let toastId;
        if (data.status === 400) {
            let getErrorMessages = async () => {
                for (const error of data.errors) {
                    try {
                        toastId = $(".toast-container .toast").length + 1;
                        await $.ajax({
                            url: "/getToast",
                            method: "POST",
                            data: {
                                type: 'error',
                                text: error.msg,
                                autoHide: false,
                                toastId: toastId
                            },
                            success: function (data) {
                                $(".toast-container").append(data);
                                $("#toast-" + toastId).toast("show");
                            }
                        })
                    } catch (error) {
                        console.log(error);
                    }
                }
                modalLoader.removeClass("show");
            }
            getErrorMessages();
        } else {
            form.removeClass("form-adicionar-categoria").addClass("form-editar-categoria");
            form.find(".new-category-badge").remove();
            form.find("input[type=submit]").val("Alterar");
            form.append("<input type='hidden' value='" + data.categoria.id_categoria + "' class='id-categoria'>");
            form.find(".data-criacao-span").html(moment(data.createdAt).tz('America/Sao_Paulo').format('D MMMM YYYY'));
            categoria.val(data.categoria.nome);
            descricao.val(data.categoria.descricao);
            slug.val(data.categoria.slug);
            toastId = $(".toast-container .toast").length + 1;
            $.ajax({
                url: "/getToast",
                method: "POST",
                data: {
                    type: 'success',
                    text: 'Categoria adicionada com sucesso',
                    autoHide: true,
                    autoHideDelay: 4000,
                    toastId: toastId
                }
            }).done(function (data) {
                $(".toast-container").append(data);
                $("#toast-" + toastId).toast("show");
                modalLoader.removeClass("show");
            })
        }
    })
})


/*********************************************************************** FUNÇÕES **************************************************************************************************/

const regexExpSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
function validateSlug(input) {
    if (!regexExpSlug.test(input.value)) {
        input.setCustomValidity("Digite um slug válido");
    } else {
        input.setCustomValidity("");
    }
}

function newCategory(date) {
    var category =
        '   <div class="category-card">' +
        '       <div class="modal-loader-category">' +
        '           <div class="modal-loader-category-loader"></div>' +
        '       </div>' +
        '        <form action="#" method="POST" class="form-adicionar-categoria">' +
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
        '                    <input type="text" placeholder="Categoria" name="categoria" id="categoria" minlength="2" required>' +
        '                </div>' +
        '                <div class="mt-1">' +
        '                    <textarea name="descricao" id="descricao" placeholder="Descrição" minlength="3" class="mb-0" rows="3" required></textarea>' +
        '                </div>' +
        '                <div>' +
        '                    <input type="text" name="slug" id="slug" placeholder="Slug" oninput="validateSlug(this)" required></input>' +
        '                </div>' +
        '                <p class="data-criacao mt-3">Data de criação:<span class="ml-2 data-criacao-span">' + date + '</span></p>' +
        '            </header>' +
        '            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="wave" preserveAspectRatio="none">' +
        '                <path class="path-wave" fill-opacity="1"' +
        '                    d="M0,192L80,181.3C160,171,320,149,480,165.3C640,181,800,235,960,250.7C1120,267,1280,245,1360,234.7L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z">' +
        '                </path>' +
        '            </svg>' +
        '            <section class="category-card__body">' +

        '                <div class="category-card__title">' +
        '                    <div class="mb-3">' +
        '                        <span class="badge-title px-2 py-1 mr-2">0</span>' +
        '                        produtos' +
        '                    </div>' +
        '                    <div>' +
        '                        <span class="badge-title px-2 py-1">0</span>' +
        '                        subcategorias</i>' +
        '                    </div>' +
        '                </div>' +
        '                <div class="category-card__knowledge">' +
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