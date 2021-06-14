$("#input-endereco-principal").prop("checked", true);
$(".card-endereco").on("click", function () {
    $(".card-endereco").removeClass("active");
    var radio = "#input-" + $(this).attr("id").substr(5);
    if ($(radio).not(":checked")) {
        $(this).addClass("active");
        $(radio).prop("checked", true);
    }
})