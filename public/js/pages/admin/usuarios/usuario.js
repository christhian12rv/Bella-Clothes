$(".sidebar-link.usuarios").addClass("active").addClass("only");
$(".sidebar-link.ver-usuarios").addClass("active");


$(".tabs input[type=radio]").on("click", function () {
    $(".tabs input[type=radio]:not(:checked)").each(function () {
        $(this).next('label').next('.tab').css("display", "none");
    })

    var tab = $(this).next('label').next('.tab');
    if (tab.css("display") == "none") {
        tab.css("display", "block");
    } else {
        tab.css("display", "none");
    }
})