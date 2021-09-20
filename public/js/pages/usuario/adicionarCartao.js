$(window).on("load", function () {
    $(".sidebar-meus-dados").addClass("active");

    const year = new Date().getFullYear();
    for (let i = (year + 20); i >= (year); i--) {
        $(".select-ano").append('<option value="' + i + '">' + i + '</option>');
    }

    $("#numero_cartao").mask("0000 0000 0000 0000");

    $("#fisico").prop("checked", true);
    $(".checkbox-tipo-cartao").on("change", function () {
        let tipo = $(this).attr("id");
        if (tipo === "empresarial") {
            $("#cadastro").prop("disabled", true);
            $("#tipo_label").html("&nbsp;");
        } else {
            $("#cadastro").prop("disabled", false);
            $("#tipo_label").html("CPF");
        }
    })
})
