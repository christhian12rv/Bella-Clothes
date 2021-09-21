$(window).on("load", function () {
    $(".sidebar-meus-dados").addClass("active");

    const year = new Date().getFullYear();
    for (let i = (year + 20); i >= (year); i--) {
        $(".select-ano").append('<option value="' + i + '">' + i + '</option>');
    }

    $("#numero_cartao").mask("0000 0000 0000 0000");
    $("#cadastro").mask("000.000.000-00");

    $("#fisico").prop("checked", true);
    $(".checkbox-tipo-cartao").on("change", function () {
        let tipo = $(this).attr("id");
        if (tipo === "empresarial") {
            $("#cadastro").mask('00.000.000/0000-00');
            $("#cadastro").attr("minLength", 18);
            $("#tipo_label").html("CNPJ");
        } else {
            $("#cadastro").mask("000.000.000-00");
            $("#cadastro").attr("minLength", 14);
            $("#tipo_label").html("CPF");
        }
    })
})

function submitForm() {
    $("#data_vencimento").val($("#mes").val() + "/" + $("#ano").val());
}
