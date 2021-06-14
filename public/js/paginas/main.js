// Container em 100% da tela
var widthContainerInicial = $("body").width();
$(".container-box").css("max-width", $("body").width());

// Search Box responsivo
$(".search-filters-box").css("width", $(".search-bar-input").width());
$(window).resize(() => {
    if (widthContainerInicial == $(".container-box").width()) {
        $(".container-box").css("max-width", $("body").width());
    }

    $(".search-filters-box").css("width", $(".search-bar-input").width() + 30);
});

// Mostrar o site carregando
$(window).on('load', function () {
    $(".loader").fadeOut();
    $("#preloder").delay(100).fadeOut("slow");
});

// Ao clicar em alguma coisa na página
$("body").on("click", function (event) {
    target = $(event.target);

    // Animação do Link "Todas as Categorias" do Dropdown Menu
    if (!target.closest(".dropdown-menu").length &&
        $(".dropdown-menu").is(":visible")) {
        if ($(".nav-link.td-categorias .link-categorias-icon").hasClass("on")) {
            $(".nav-link.td-categorias .link-categorias-icon").removeClass("on");
            $(".nav-link.td-categorias .after").addClass("on");
        } else {
            $(".nav-link.td-categorias .link-categorias-icon").addClass("on");
            $(".nav-link.td-categorias .after").removeClass("on");
        }
    }

    // Fechar o search filters
    if (!target.closest(".search-filters-box").length &&
        $(".search-filters-box").is(":visible") && target.attr("id") != "search-bar-input") {
        $(".search-filters-box").css("display", "none");
        $(".modal-background").css("display", "none");
    }

})

// Aplicar classe CSS no nav-link "Todas as Categorias" ao clicar
$(".nav-link.td-categorias").on("click", function () {
    if ($(".nav-link.td-categorias .link-categorias-icon").hasClass("on")) {
        $(".nav-link.td-categorias .link-categorias-icon").removeClass("on");
        $(".nav-link.td-categorias .after").addClass("on");
    } else {
        $(".nav-link.td-categorias .link-categorias-icon").addClass("on");
        $(".nav-link.td-categorias .after").removeClass("on");
    }
})

// Mostrar o search filters ao clicar no search input
$("#search-bar-input").on("click", function () {
    $(".search-filters-box").css("display", "block");
    $(".modal-background").css("display", "block");
})

// Pesquisa - Ao passar o mouse nos mais procurados, inserir no search input
$(".filter-pesquisa-populares").on("mouseenter", function () {
    $("#search-bar-input").val($(this).find("p").html());
})

// Pesquisa - Ao clicar nos mais procurados, submeter o formulário
$(".filter-pesquisa-populares").on("click", function () {
    $("#search-form").submit();
})

// Cart Dropdown Menu aparecer e desaparecer
var delayDropdownMouseOutCart = "";
$(".cart-dropdown").on("mouseover click", function () {
    $('.cart-dropdown .dropdown-menu').css("display", "block");
    $('.cart-dropdown').addClass('active');
    $('.login-dropdown').removeClass('active');
    if (delayDropdownMouseOutCart != "")
        clearTimeout(delayDropdownMouseOutCart);
})

$(".cart-dropdown").on("mouseout", function () {
    $('.login-dropdown .dropdown-menu').css("display", "none");
    clearTimeout(delayDropdownMouseOutLogin);
    delayDropdownMouseOutCart = setTimeout(function () {
        $('.cart-dropdown .dropdown-menu').css("display", "none");
        $('.cart-dropdown').removeClass('active');
    }, 300);
})

// Login Dropdown Menu aparecer e desaparecer
var delayDropdownMouseOutLogin = "";
$(".login-dropdown").on("mouseover click", function () {
    $('.login-dropdown .dropdown-menu').css("display", "block");
    $('.login-dropdown').addClass('active');
    $('.cart-dropdown').removeClass('active');
    if (delayDropdownMouseOutLogin != "")
        clearTimeout(delayDropdownMouseOutLogin);
})

$(".login-dropdown").on("mouseout", function () {
    $('.cart-dropdown .dropdown-menu').css("display", "none");
    clearTimeout(delayDropdownMouseOutCart);
    delayDropdownMouseOutLogin = setTimeout(function () {
        $('.login-dropdown .dropdown-menu').css("display", "none");
        $('.login-dropdown').removeClass('active');
    }, 300);
})

// Icons Bootstraps para cor cheia e sem cor cheia
$(".login-dropdown a.dropdown-item.changeFill").on("mouseenter", function () {
    var iconClass = $(this).children("i").attr("class").substr(8);
    $(this).children("i").removeClass(iconClass);
    $(this).children("i").addClass(iconClass + "-fill");
})
$(".login-dropdown a.dropdown-item.changeFill").on("mouseout", function () {
    var iconClass = $(this).children("i").attr("class").substr(8);
    $(this).children("i").removeClass(iconClass);
    iconClass = iconClass.replace("-fill", "");
    $(this).children("i").addClass(iconClass);
})


/* ----------------------------------------------------------------------------------- */
// FUNCIONAMENTO DO DROPDOWN MENU

// Dropdown Menu Responsivo (Para funcionar em mobiles devices)
if (window.matchMedia('screen and (max-width: 768px)').matches) {
    $("#content").hide();
    $(".sub-menu .dropdown-menu .nav-tabs-categorias .nav-link").children().addClass("bi-chevron-right").removeClass("bi-chevron-down");
    $(".sub-menu .dropdown-menu .nav-tabs-categorias .nav-link.active").removeClass("active");
}

var content = $(".sub-menu #content");

// Não fechar o dropdown menu ao clicar nele
$(".dropdown-menu").on("click", function (e) {
    e.stopPropagation();
})

// Ao clicar em um Dropdown Menu Nav-Link
$('.sub-menu  .dropdown-menu .nav-tabs-categorias .nav-link').on("click.bs.dropdown", function (e) {
    // Não fechar o dropdown menu ao clicar em um Nav-Link
    $(this).tab('show');
    e.stopPropagation();

    // Dropdown Menu Responsivo (Para funcionar em mobiles devices)
    if (window.matchMedia('screen and (max-width: 768px)').matches) {
        content.css("width", $(".sub-menu .dropdown-menu").width());
        // Fazer aparecer e desaparecer
        if ($(this).parent().next().hasClass("tab-content")) {
            $(this).children().addClass("bi-chevron-right").removeClass("bi-chevron-down");
            content = content.detach();
        } else {

            $(this).children().addClass("bi-chevron-down").removeClass("bi-chevron-right");
            content.show();
            content.insertAfter($(this).parent());
        }

    } else {
        content.css("width", $(".sub-menu  .dropdown-menu").width());
    }
});

// Ao redimensionar o tamanho da tela
$(window).on("resize", function () {
    // Dropdown Menu Responsivo (Para funcionar em mobiles devices)
    if (window.matchMedia('screen and (max-width: 768px)').matches) {
        content.hide();
        $(".sub-menu  .dropdown-menu .nav-tabs-categorias .nav-link").children().addClass("bi-chevron-right").removeClass("bi-chevron-down");
    } else {
        content.show();
        content.insertAfter($(".nav-tabs-categorias"));
        $(".sub-menu .dropdown-menu .nav-tabs-categorias .nav-link").children().addClass("bi-chevron-down").removeClass("bi-chevron-right");
        content.css("width", $(".sub-menu  .dropdown-menu").width());
    }
})

