$("#input-pagamento-123").prop("checked", true);
$(".card-pagamento").on("click", function () {
    $(".card-pagamento").removeClass("active");
    var radio = "#input-" + $(this).attr("id").substr(5);
    if ($(radio).not(":checked")) {
        $(this).addClass("active");
        $(radio).prop("checked", true);
    }
})