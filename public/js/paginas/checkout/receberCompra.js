$("#input-transporte-normal").prop("checked", true);
$(".card-transporte").on("click", function () {
    $(".card-transporte").removeClass("active");
    var radio = "#input-" + $(this).attr("id").substr(5);
    if ($(radio).not(":checked")) {
        $(this).addClass("active");
        $(radio).prop("checked", true);
    }
})