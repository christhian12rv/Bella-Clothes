$(".sidebar-compras").addClass("active");
$(".card-detalhes-compra").css("height", $(".card-detalhes-compra .first-content").height() + 30);

// Icons Bootstraps para cor cheia no sidebar active
var iconClass = $(".usuario-sidebar ul li a.active i.changeFill").attr("class").substr(14);
$(".usuario-sidebar ul li a.active i.changeFill").removeClass(iconClass);
$(".usuario-sidebar ul li a.active i.changeFill").addClass(iconClass + "-fill");

$("#link-detalhes-pagamento").on("click", function () {
    if ($(".card-detalhes-compra").hasClass("open")) {
        $(".card-detalhes-compra").removeClass("open");
        $("#link-detalhes-pagamento").children("i").remove("bi-chevron-down").addClass("bi-chevron-right");
        $(".card-detalhes-compra").css("height", $(".card-detalhes-compra .first-content").height() + 30);
    }
    else {
        $(".card-detalhes-compra").addClass("open");
        $("#link-detalhes-pagamento").children("i").removeClass("bi-chevron-right").addClass("bi-chevron-down");
        $(".card-detalhes-compra").css("height", "100%");
    }
})

$(window).resize(function () {
    $(".card-detalhes-compra").removeClass("open");
    $("#link-detalhes-pagamento").children("i").remove("bi-chevron-down").addClass("bi-chevron-right");
    $(".card-detalhes-compra").css("height", $(".card-detalhes-compra .first-content").outerHeight() + 30);
    console.log("aee");
})