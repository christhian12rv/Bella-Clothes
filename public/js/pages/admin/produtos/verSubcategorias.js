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

$(".adicionar-subcategoria").on("click", function () {
    let date = moment().tz('America/Sao_Paulo').format('D MMMM YYYY');
    let categorias;
    $.ajax({
        url: "/api/categorias",
        method: "GET"
    }).done(function (data) {
        categorias = data.categorias;
        $.ajax({
            url: "/getTemplate",
            method: "POST",
            data: {
                template: 'produto/adicionar-subcategoria',
                date: date,
                categorias: categorias
            }
        }).done(function (data) {
            $("#subcategory-flex").prepend(data);
        }).fail(function () {
            window.location.href = "/admin/erro-500";
        })
    }).fail(function () {
        window.location.href = "/admin/erro-500";
    })
})

$(document).on("change", ".subcategory-activate", function () {
    let ativo = $(this).prop("checked");
    let form = $(this).parents((".form-editar-subcategoria"));
    let id_subcategoria = form.find(".id-subcategoria");

    $.ajax({
        url: "/admin/produtos/subcategorias",
        method: "PUT",
        dataType: 'json',
        data: {
            id_subcategoria: id_subcategoria.val(),
            subcategoriaToUpdate: {
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

$(document).on("click", ".btn-submit-adicionar-subcategoria", function () {
    let button = $(this);
    let form = $(this).parents((".form-adicionar-subcategoria"));
    let subcategoria = form.find("#subcategoria");
    let descricao = form.find("#descricao");
    let slug = form.find("#slug");
    let categoria = form.find("#categoria");
    let genero = form.find("#genero");
    let modalLoader = form.prev(".modal-loader-subcategory");
    modalLoader.addClass("show");

    $.ajax({
        url: "/admin/produtos/subcategorias",
        method: "POST",
        dataType: 'json',
        data: {
            nome: subcategoria.val(),
            descricao: descricao.val(),
            slug: slug.val(),
            categoria: categoria.val(),
            genero: genero.val()
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
            form.removeClass("form-adicionar-subcategoria").addClass("form-editar-subcategoria");
            form.find(".new-subcategory-badge").remove();
            button.removeClass("btn-submit-adicionar-subcategoria").addClass("btn-submit-editar-subcategoria");
            button.html("Editar");
            form.prepend("<input type='hidden' value='" + data.subcategoria._id + "' class='id-subcategoria'>");
            form.find(".data-criacao-span").html(moment(data.createdAt).tz('America/Sao_Paulo').format('D MMMM YYYY'));
            form.children(".subcategory-card__header").prepend('<label class="switch"><input type="checkbox" class="subcategory-activate" checked><span class="slider round"></span></label>');
            subcategoria.val(data.subcategoria.nome);
            descricao.val(data.subcategoria.descricao);
            slug.val(data.subcategoria.slug);
            categoria.children("option:selected").removeAttr("selected");
            categoria.children("option[value=" + data.categoria._id + "]").attr('selected', 'selected');
            genero.children("option:selected").removeAttr("selected");
            genero.children("option[value=" + data.genero + "]").attr('selected', 'selected');
            toastId = $(".toast-container .toast").length + 1;
            $.ajax({
                url: "/getToast",
                method: "POST",
                data: {
                    type: 'success',
                    text: 'Subcategoria adicionada com sucesso',
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


/*********************************************************************** FUNÇÕES **************************************************************************************************/

const regexExpSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/g;
function validateSlug(input) {
    if (!regexExpSlug.test(input.value)) {
        input.setCustomValidity("Digite um slug válido");
    } else {
        input.setCustomValidity("");
    }
}