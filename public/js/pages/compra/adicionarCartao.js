// Remove a navbar da página
$("#content").remove();

// Inserir opções no select "ano"
currentYear = new Date().getFullYear();
for (let i = currentYear + 30; i >= currentYear - 118; i--) {
    $(".select-ano").append('<option value="' + i + '">' + i + '</option>');
}

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

// Número do Cartão
$("#numero-cartao").mask("0000 0000 0000 0000");
$("#numero-cartao").on("input", validaNumCartao);
$("#numero-cartao").one("focusout", validaNumCartao);

// Código de Segurança
$("#codigo-seguranca").on("input", validaCodigoSeg);
$("#codigo-seguranca").one("focusout", validaCodigoSeg);

// Input Nome
$("input#nome").on("input", validaNomes);
$("input#nome").one("focusout", validaNomes);

// CPF
$("input#cpf").on("input", validaCPF);
$("input#cpf").one("focusout", validaCPF);

// Data
// Mês
$("select#mes").on("change", validaMes);
// Ano
$("select#ano").on("change", validaAno);


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

function validaNumCartao() {
    if ($(this).val().length > 0 && $(this).val().length < 19) {
        if ($(this).hasClass("hasOutFocusFirst"))
            $(this).next().css("display", "block");
        if (!$(this).hasClass("invalid"))
            $(this).addClass("invalid");

        $(this).next().html("Digite um número válido");
    } else if ($(this).val().length == 0) {
        if ($(this).hasClass("hasOutFocusFirst"))
            $(this).next().css("display", "block");
        if (!$(this).hasClass("invalid"))
            $(this).addClass("invalid");

        $(this).next().html("Preencha o campo Número do Cartão");
    } else {
        $(this).next().css("display", "none");
        $(this).removeClass("invalid");
    }
}

function validaCodigoSeg() {
    if ($(this).val().length > 0 && $(this).val().length < 3) {
        if ($(this).hasClass("hasOutFocusFirst"))
            $(this).next().css("display", "block");
        if (!$(this).hasClass("invalid"))
            $(this).addClass("invalid");

        $(this).next().html("Digite um código válido<br>Dica: O código de segurança são os 3 últimos números no verso do seu cartão");
    } else if ($(this).val().length == 0) {
        if ($(this).hasClass("hasOutFocusFirst"))
            $(this).next().css("display", "block");
        if (!$(this).hasClass("invalid"))
            $(this).addClass("invalid");

        $(this).next().html("Preencha o campo Código de Segurança");
    } else {
        $(this).next().css("display", "none");
        $(this).removeClass("invalid");
    }
}

function validaCPF() {
    if ($(this).val().length >= 1 && $(this).val().length < 11) {
        if ($(this).hasClass("hasOutFocusFirst"))
            $(this).next().css("display", "block");
        if (!$(this).hasClass("invalid"))
            $(this).addClass("invalid");

        $(this).next().html("Digite um CPF válido");
    } else if ($(this).val().length == 0) {
        if ($(this).hasClass("hasOutFocusFirst"))
            $(this).next().css("display", "block");
        if (!$(this).hasClass("invalid"))
            $(this).addClass("invalid");

        $(this).next().html("Preencha o campo CPF");
    } else {
        $(this).next().css("display", "none");
        $(this).removeClass("invalid");
    }
}

// Data - Mês
function validaMes() {
    if ($("select#mes").val() != "Mês") {
        $("#tooltipMes").css("display", "none");
        $("#hidden-mes").removeClass("invalid");
        if ($("select#mes").hasClass("invalid"))
            $("select#mes").removeClass("invalid");
    } else {
        $("#tooltipMes").css("display", "block");
        $("#hidden-mes").addClass("invalid");
        $("select#mes").addClass("invalid");
        $("#tooltipDataTotal").css("display", "none");
    }
}

// Data - Ano
function validaAno() {
    if ($("select#ano").val() != "Ano") {
        $("#tooltipAno").css("display", "none");
        $("#hidden-ano").removeClass("invalid");
        if ($("select#ano").hasClass("invalid"))
            $("select#ano").removeClass("invalid");
    } else {
        $("#tooltipAno").css("display", "block");
        $("#hidden-ano").addClass("invalid");
        $("select#ano").addClass("invalid");
        $("#tooltipDataTotal").css("display", "none");

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