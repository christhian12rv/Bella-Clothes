$(".sidebar-favoritos").addClass("active");

// Icons Bootstraps para cor cheia no sidebar active
var iconClass = $(".usuario-sidebar ul li a.active i.changeFill").attr("class").substr(14);
$(".usuario-sidebar ul li a.active i.changeFill").removeClass(iconClass);
$(".usuario-sidebar ul li a.active i.changeFill").addClass(iconClass + "-fill");

$("#btn-remover-todos").prop("disabled", true);

$(".checkmark").on("click", function () {
    var input = $(this).prev("input");
    input.prop("checked", !input.prop("checked"));

    if ($(this).attr("id") == "check-all") {
        $("input[type=checkbox]").each(function () {
            $(this).prop("checked", input.prop("checked"));
        });
    }

    var inputsChecked = 0;
    $("input[type=checkbox]").each(function () {
        if ($(this).prop("checked"))
            inputsChecked++;
    })

    if (inputsChecked == 1 && $("#check-all").prev("input").prop("checked")) {
        $("#btn-remover-todos").prop("disabled", true);
        $("#check-all").prev("input").prop("checked", false);
    } else if (inputsChecked >= 1)
        $("#btn-remover-todos").prop("disabled", false);
    else
        $("#btn-remover-todos").prop("disabled", true);
})