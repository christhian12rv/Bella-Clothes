// Icons Bootstraps para cor cheia e sem cor cheia ao passar e tirar o mouse

$(".usuario-sidebar ul li").on("mouseenter", function () {
    if (window.matchMedia('screen and (min-width: 768px)').matches) {
        if (!$(this).children("a").hasClass("active")) {
            var iconClass = $(this).children("a").children("i.changeFill").attr("class").substr(14);
            $(this).children("a").children("i.changeFill").removeClass(iconClass);
            $(this).children("a").children("i.changeFill").addClass(iconClass + "-fill");
        }
    }
})
$(".usuario-sidebar ul li").on("mouseleave", function () {
    if (window.matchMedia('screen and (min-width: 768px)').matches) {
        if (!$(this).children("a").hasClass("active")) {
            var iconClass = $(this).children("a").children("i.changeFill").attr("class").substr(14);
            $(this).children("a").children("i.changeFill").removeClass(iconClass);
            iconClass = iconClass.replace("-fill", "");
            $(this).children("a").children("i.changeFill").addClass(iconClass);
        }
    }
})

// Entrar no sidebar
$(".usuario-sidebar").on("mouseenter", function () {
    if (window.matchMedia('screen and (min-width: 768px)').matches) {
        $(".usuario-sidebar-toggle").addClass("on");
        $(this).addClass("open");
    }
})

// Sair do Sidebar
$(".usuario-sidebar").on("mouseleave", function () {
    if (window.matchMedia('screen and (min-width: 768px)').matches) {
        $(".usuario-sidebar-toggle").removeClass("on");
        $(this).removeClass("open");
    }
})


$(".usuario-sidebar-toggle").on("click", function () {
    console.log("asdf");
    if ($(this).hasClass("on")) {
        $(".usuario-sidebar").removeClass("open");
        $(this).removeClass("on");
    } else {
        $(".usuario-sidebar").addClass("open");
        $(this).addClass("on");
    }
})