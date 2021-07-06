// Função para saber se o Input foi clicado ou teve um fora de foco na primeira vez
$(".group-input input").one("click", function () {
    $(this).addClass("hasClicked");
})
$(".group-input input").one("focusout", function () {
    $(this).addClass("hasOutFocusFirst");
})

$(".group-input textarea").one("click", function () {
    $(this).addClass("hasClicked");
})
$(".group-input textarea").one("focusout", function () {
    $(this).addClass("hasOutFocusFirst");
})

// Preencher os inputs como inválidos e remover a invalidade dos inputs não obrigatórios
$("input").addClass("invalid");
$("textarea").addClass("invalid");
$("input.search-bar-input").removeClass("invalid");
$("input#complemento").removeClass("invalid");
$("input#ponto_referencia").removeClass("invalid");
$("textarea#informacoes_adicionais").removeClass("invalid");
$("input#continuar").removeClass("invalid");

// Verificar validade de todos os inputs
// Input Nome
$("input#nome").on("input", validaNomes);
$("input#nome").one("focusout", validaNomes);

// CEP
$("input#cep").on("input", validaCEP);
$("input#cep").one("focusout", validaCEP);

// Nome do Endereço
$("input#nome_do_endereco").on("input", validaNomes);
$("input#nome_do_endereco").one("focusout", validaNomes);

// Número do Endereço
$("input#numeroEndereco").on("input", function () {
    if ($(this).val().length == 0) {
        if ($(this).hasClass("hasOutFocusFirst"))
            $(this).next().css("display", "block");
        if (!$(this).hasClass("invalid"))
            $(this).addClass("invalid");
        $(this).next().html("Preencha o campo Nº");
    } else {
        $(this).next().css("display", "none");
        $(this).removeClass("invalid");
    }
});
$("input#numeroEndereco").one("focusout", function () {
    if ($(this).val().length == 0) {
        if ($(this).hasClass("hasOutFocusFirst"))
            $(this).next().css("display", "block");
        if (!$(this).hasClass("invalid"))
            $(this).addClass("invalid");
        $(this).next().html("Preencha o campo Nº");
    } else {
        $(this).next().css("display", "none");
        $(this).removeClass("invalid");
    }
});

// Bairro
$("input#bairro").on("input", validaNomes);
$("input#bairro").one("focusout", validaNomes);

// Capitalizar Complemento e Ponto de Referência
$("input#complemento").on("input", function () {
    var capitalizedText = capitalizeText($(this).val());
    $(this).val(capitalizedText);
});
$("input#ponto_referencia").on("input", function () {
    var capitalizedText = capitalizeText($(this).val());
    $(this).val(capitalizedText);
});



function verificarFormulario() {


    // Exibir tooltips dos Inputs Inválidos e os Invalidar
    $("input").each(function () {
        if ($(this).next().hasClass("theTooltip")) {
            if ($(this).hasClass("invalid")) {
                $(this).next().css("display", "block");
                $(this).addClass("hasClicked");
                $(this).addClass("hasOutFocusFirst");
            } else {
                $(this).next().css("display", "none");
            }
        }
    })

    if (!$("*input").hasClass("invalid")) {
        $("#formEndereco").submit();
    }
}


/*-------------------------------------------------------------------------------------------
                                        Funções
-------------------------------------------------------------------------------------------*/

//Nomes
function validaNomes() {
    // Capitalizar texto
    var capitalizedText = capitalizeText($(this).val());
    $(this).val(capitalizedText);

    // Pegar o nome do Placeholder sem o *
    var type = $(this).attr("placeholder").substr(2);

    if ($(this).val().length >= 1 && $(this).val().length < 3) {
        if ($(this).hasClass("hasOutFocusFirst"))
            $(this).next().css("display", "block");
        if (!$(this).hasClass("invalid"))
            $(this).addClass("invalid");

        $(this).next().html("O campo " + type + " deve conter no mínimo 3 caracteres (" + $(this).val().length + " caracteres atualmente");

    } else if ($(this).val().length == 0) {
        if ($(this).hasClass("hasOutFocusFirst"))
            $(this).next().css("display", "block");
        if (!$(this).hasClass("invalid"))
            $(this).addClass("invalid");

        $(this).next().html("Preencha o campo " + type);

    } else {
        $(this).next().css("display", "none");
        $(this).removeClass("invalid");
    }
}

function validaCEP() {
    if ($(this).val().length >= 1 && $(this).val().length < 8) {
        if ($(this).hasClass("hasOutFocusFirst"))
            $(this).next().css("display", "block");
        if (!$(this).hasClass("invalid"))
            $(this).addClass("invalid");

        $(this).next().html("Digite um CEP válido");
        $("input#cidade").prop("disabled", false);
        $("select#estado").prop("disabled", false);

    } else if ($(this).val().length == 0) {
        if ($(this).hasClass("hasOutFocusFirst"))
            $(this).next().css("display", "block");
        if (!$(this).hasClass("invalid"))
            $(this).addClass("invalid");

        $(this).next().html("Preencha o campo CEP");
        $("input#cidade").prop("disabled", false);
        $("select#estado").prop("disabled", false);

    } else {
        const inputCEP = $(this)
        // Puxa estados e cidades do "viacep" por JQuery AJAX
        const verificaEstadoCidade = $.ajax({
            url: 'https://viacep.com.br/ws/' + inputCEP.val() + '/json/unicode/',
            dataType: 'json'
        });
        verificaEstadoCidade
            .done(function (data) {
                if ("erro" in data) {
                    if (inputCEP.hasClass("hasOutFocusFirst"))
                        inputCEP.next().css("display", "block");
                    if (!inputCEP.hasClass("invalid"))
                        inputCEP.addClass("invalid");
                    inputCEP.next().html("Digite um CEP válido");
                } else {
                    $("select#estado").val(data.uf);
                    $("input#cidade").val(data.localidade);

                    $("input#cidade").prop("disabled", true);
                    $("select#estado").prop("disabled", true);

                    $("input#cidade").removeClass("invalid");
                    $("select#estado").removeClass("invalid");
                    $("#hidden-estado").removeClass("invalid");

                    $("#tooltipEstado").css("display", "none");
                    $("input#cidade").next().css("display", "none");

                    inputCEP.next().css("display", "none");
                    inputCEP.removeClass("invalid");
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.log("Erro Interno");
            });
    }
}


function capitalizeText(text) {
    text = text.toLowerCase();
    var beginText = "";
    var restText = text.substr(1, text.length);
    text = text.charAt(0).toUpperCase() + restText;
    for (var i = 0; i < text.length; i++) {
        if (text.charAt(i) == " ") {
            beginText = text.substr(0, i + 1);
            restText = text.substr(i + 2, text.length);
            text = beginText + text.charAt(i + 1).toUpperCase() + restText;
        }

    }

    // Tirar o Capitalize das palavras abaixo

    do {
        text = text.replace(" Da ", " da ");
    } while (text.includes(" Da "));
    do {
        text = text.replace(" De ", " de ");
    } while (text.includes(" De "));
    do {
        text = text.replace(" Do ", " do ");
    } while (text.includes(" Do "));
    do {
        text = text.replace(" Das ", " das ");
    } while (text.includes(" Das "));
    do {
        text = text.replace(" Dos ", " dos ");
    } while (text.includes(" Dos "));

    // Não permitir dois espaços consecutivos
    text = text.replace(/\s{2,}/g, ' ');

    return text;
}