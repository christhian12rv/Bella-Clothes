$(window).on("load", function () {
    $(".sidebar-meus-dados").addClass("active");

    $("input#cep").mask("00000-000");
    $("input#cep").on("input", validaCEP);
    $("input#telefone").phoneBrazil();
    $("input#nome, input#cidade, input#nome_endereco, input#complemento, input#bairro, input#ponto_referencia").on("input", capitalizeValue);
})


function submitForm() {
    $("select#estado").prop("disabled", false);
    $("input#cidade").prop("disabled", false);
}

function validaCEP() {
    if ($(this).val().length == 9) {
        const inputCEP = $(this)
        const verificaEstadoCidade = $.ajax({
            url: 'https://viacep.com.br/ws/' + inputCEP.val().replace("-", "") + '/json/unicode/',
            dataType: 'json'
        });
        verificaEstadoCidade
            .done(function (data) {
                if (!("erro" in data)) {
                    $("select#estado").val(data.uf);
                    $("input#cidade").val(data.localidade);

                    $("select#estado").prop("disabled", true);
                    $("input#cidade").prop("disabled", true);
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.log("Erro Interno");
            });
    } else {
        $("select#estado").prop("disabled", false);
        $("input#cidade").prop("disabled", false);
    }
}

function capitalizeValue() {
    let capitalizedValue = $(this).val().toLowerCase()
        .replace(/(^\w|\s\w)/g, m => m.toUpperCase())
        .replace(/ Da /g, ' da ')
        .replace(/ De /g, ' de ')
        .replace(/ Do /g, ' do ')
        .replace(/ Das /g, ' das ')
        .replace(/ Dos /g, ' dos ');
    $(this).val(capitalizedValue);
}