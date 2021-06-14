$(".sidebar-compras").addClass("active");

// Icons Bootstraps para cor cheia no sidebar active
var iconClass = $(".usuario-sidebar ul li a.active i.changeFill").attr("class").substr(14);
$(".usuario-sidebar ul li a.active i.changeFill").removeClass(iconClass);
$(".usuario-sidebar ul li a.active i.changeFill").addClass(iconClass + "-fill");

$("#link-detalhes-pagamento").on("click", function () {
    if ($(".box-detalhes-pagamento").hasClass("open")) {
        $(".box-detalhes-pagamento").removeClass("open");
        $("#link-detalhes-pagamento").children("i").remove("bi-chevron-down").addClass("bi-chevron-right");
    }
    else {
        $(".box-detalhes-pagamento").addClass("open");
        $("#link-detalhes-pagamento").children("i").removeClass("bi-chevron-right").addClass("bi-chevron-down");
    }
})