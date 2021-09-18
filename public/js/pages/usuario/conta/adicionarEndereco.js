$(".sidebar-meus-dados").addClass("active");

$("input#cep").mask("00000-000");
$("input#cep").on("input", validaCEP);

function validaCEP() {
    if ($(this).val().length == 9) {
        console.log("ata");
        const inputCEP = $(this)
        // Puxa estados e cidades do "viacep" por JQuery AJAX
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

function submitForm() {
    $("select#estado").prop("disabled", false);
    $("input#cidade").prop("disabled", false);
}