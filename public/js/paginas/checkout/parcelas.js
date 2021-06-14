$(".card-parcela").on("click", function () {
    $(".card-parcela").removeClass("active");

    var radio = "#input-" + $(this).attr("id").substr(5);
    console.log(radio);
    if ($(radio).not(":checked")) {
        $(this).addClass("active");
        $(radio).prop("checked", true);
    }
})