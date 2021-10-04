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
        var card = $(this).parent("svg").parent(".form").parent(".category-card");
        var cardBody = $(this).parent("svg").next(".category-card__body");
        var subcategoriasHeight = $(this).parent("svg").next(".category-card__body").children(".category-card__knowledge").outerHeight();
    } else if ($(this).attr("class") == "category-card__body") {
        var card = $(this).parent(".form").parent(".category-card");
        var cardBody = $(this);
        var subcategoriasHeight = $(this).children(".category-card__knowledge").outerHeight();
    } else {
        var card = $(this).parent(".form").parent(".category-card");
        var cardBody = $(this).prev();
        var subcategoriasHeight = $(this).prev().children(".category-card__knowledge").outerHeight();
    }
    card.addClass("body-open");
    cardBody.css("height", (parseInt(subcategoriasHeight) + 93) + "px");
})

$(".category-card__body, .path-wave, .submit-div").on("mouseleave", function () {
    if ($(this).attr("class") == "path-wave") {
        var card = $(this).parent("svg").parent(".form").parent(".category-card");
        var cardBody = $(this).parent("svg").next(".category-card__body");
    } else if ($(this).attr("class") == "category-card__body") {
        var card = $(this).parent(".form").parent(".category-card");
        var cardBody = $(this);
    } else {
        var card = $(this).parent(".form").parent(".category-card");
        var cardBody = $(this).prev();
    }
    card.removeClass("body-open");
    cardBody.css("height", "80px");
})

$(".adicionar-categoria").on("click", function () {
    let date = moment().tz('America/Sao_Paulo').format('D MMMM YYYY');
    $.ajax({
        url: "/getTemplate",
        method: "POST",
        data: {
            template: 'produto/adicionar-categoria',
            date: date
        }
    }).done(function (data) {
        $("#category-flex").prepend(data);
    }).fail(function () {
        window.location.href = "/admin/erro-500";
    })
})

$(document).on("change", ".category-activate", function () {
    let ativo = $(this).prop("checked");
    let form = $(this).parents((".form-editar-categoria"));
    let id_categoria = form.find(".id-categoria");

    $.ajax({
        url: "/admin/produtos/categorias",
        method: "PUT",
        dataType: 'json',
        data: {
            id_categoria: id_categoria.val(),
            categoriaToUpdate: {
                ativo: ativo
            }
        }
    }).done(function (data) {
        let toastId;
        if (data.status === 400) {
            let getErrorMessages = async () => {
                let numberDelayBasedOnCountErrors = 0;
                for (const error of data.errors) {
                    numberDelayBasedOnCountErrors++;
                    try {
                        toastId = $(".toast-container .toast").length + 1;
                        await $.ajax({
                            url: "/getToast",
                            method: "POST",
                            data: {
                                type: 'error',
                                text: error.msg,
                                autoHide: true,
                                autoHideDelay: (4000 * numberDelayBasedOnCountErrors),
                                toastId: toastId
                            },
                            success: function (data) {
                                $(".toast-container").append(data);
                                $("#toast-" + toastId).toast("show");
                            },
                            fail: function () {
                                window.location.href = "/admin/erro-500";
                            }
                        })
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
            getErrorMessages();
        }
    }).fail(function () {
        window.location.href = "/admin/erro-500";
    })
})

$(document).on("click", ".btn-submit-adicionar-categoria", function () {
    let button = $(this);
    let form = $(this).parents((".form-adicionar-categoria"));
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
            nome: categoria.val(),
            descricao: descricao.val(),
            slug: slug.val()
        }
    }).done(function (data) {
        let toastId;
        if (data.status === 400) {
            let getErrorMessages = async () => {
                let numberDelayBasedOnCountErrors = 0;
                for (const error of data.errors) {
                    numberDelayBasedOnCountErrors++;
                    try {
                        toastId = $(".toast-container .toast").length + 1;
                        await $.ajax({
                            url: "/getToast",
                            method: "POST",
                            data: {
                                type: 'error',
                                text: error.msg,
                                autoHide: true,
                                autoHideDelay: (4000 * numberDelayBasedOnCountErrors),
                                toastId: toastId
                            },
                            success: function (data) {
                                $(".toast-container").append(data);
                                $("#toast-" + toastId).toast("show");
                            },
                            fail: function () {
                                window.location.href = "/admin/erro-500";
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
            button.removeClass("btn-submit-adicionar-categoria").addClass("btn-submit-editar-categoria");
            button.html("Editar");
            form.prepend("<input type='hidden' value='" + data.categoria._id + "' class='id-categoria'>");
            form.find(".data-criacao-span").html(moment(data.createdAt).tz('America/Sao_Paulo').format('D MMMM YYYY'));
            form.children(".category-card__header").prepend('<label class="switch"><input type="checkbox" class="category-activate" checked><span class="slider round"></span></label>');
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
            }).fail(function () {
                window.location.href = "/admin/erro-500";
            })
        }
    }).fail(function () {
        window.location.href = "/admin/erro-500";
    })
})

$(document).on("click", ".btn-submit-editar-categoria", function () {
    let form = $(this).parents((".form-editar-categoria"));
    let id_categoria = form.find(".id-categoria");
    let categoria = form.find("#categoria");
    let descricao = form.find("#descricao");
    let slug = form.find("#slug");
    let modalLoader = form.prev(".modal-loader-category");
    modalLoader.addClass("show");

    $.ajax({
        url: "/admin/produtos/categorias",
        method: "PUT",
        dataType: 'json',
        data: {
            id_categoria: id_categoria.val(),
            categoriaToUpdate: {
                nome: categoria.val(),
                descricao: descricao.val(),
                slug: slug.val()
            }
        }
    }).done(function (data) {
        let toastId;
        if (data.status === 400) {
            let getErrorMessages = async () => {
                let numberDelayBasedOnCountErrors = 0;
                for (const error of data.errors) {
                    numberDelayBasedOnCountErrors++;
                    try {
                        toastId = $(".toast-container .toast").length + 1;
                        await $.ajax({
                            url: "/getToast",
                            method: "POST",
                            data: {
                                type: 'error',
                                text: error.msg,
                                autoHide: true,
                                autoHideDelay: (4000 * numberDelayBasedOnCountErrors),
                                toastId: toastId
                            },
                            success: function (data) {
                                $(".toast-container").append(data);
                                $("#toast-" + toastId).toast("show");
                            },
                            fail: function (error) {
                                console.log(error);
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
            categoria.val(data.categoria.nome);
            descricao.val(data.categoria.descricao);
            slug.val(data.categoria.slug);
            toastId = $(".toast-container .toast").length + 1;
            $.ajax({
                url: "/getToast",
                method: "POST",
                data: {
                    type: 'success',
                    text: 'Categoria alterada com sucesso',
                    autoHide: true,
                    autoHideDelay: 4000,
                    toastId: toastId
                }
            }).done(function (data) {
                $(".toast-container").append(data);
                $("#toast-" + toastId).toast("show");
                modalLoader.removeClass("show");
            }).fail(function (error) {
                console.log(error);
            })
        }
    }).fail(function (error) {
        console.log(error);
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