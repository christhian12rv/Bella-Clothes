// Remove a navbar da página
$("#content").remove();

// Inserir opções no select "ano"
const year = new Date().getFullYear();
for (let i = (year - 18); i >= (year - 118); i--) {
    $(".select-ano").append('<option value="' + i + '">' + i + '</option>');
}

// Função para saber se o Input foi clicado ou teve um fora de foco na primeira vez
$(".group-input input").one("click", function () {
    $(this).addClass("hasClicked");
})
$(".group-input input").one("focusout", function () {
    $(this).addClass("hasOutFocusFirst");
})
$(".group-input select").one("focusout", function () {
    $(this).addClass("hasOutFocusFirst");
})

// Preencher os inputs como inválidos e remover a invalidade dos inputs não obrigatórios
$("input").addClass("invalid");
$("input.search-bar-input").removeClass("invalid");
$("input#tipoPessoa").removeClass("invalid");
$("input#complemento").removeClass("invalid");
$("input#ponto_referencia").removeClass("invalid");
$("input#outro_telefone").removeClass("invalid");
$("input#check_ofertas").removeClass("invalid");
$("input#data_nascimento").removeClass("invalid");

// Verificar validade de todos os inputs
// Input Nome
$("input#nome").on("input", validaNomes);
$("input#nome").one("focusout", validaNomes);

// Input Sobrenome
$("input#sobrenome").on("input", validaNomes);
$("input#sobrenome").one("focusout", validaNomes);

// Sexo
$("input.sexo").on("change", function () {
    $("#tooltipSexo").css("display", "none");
    $("input#sexoMasculino").removeClass("invalid");
    $("input#sexoFeminino").removeClass("invalid");
    $("#hidden-sexo").removeClass("invalid");
})

// Data
// Dia
$("select#dia").on("change", validaDia);
// Mês
$("select#mes").on("change", validaMes);
// Ano
$("select#ano").on("change", validaAno);

// CPF
$("input#cpf").mask("000.000.000-00");
$("input#cpf").on("input", validaCPF);
$("input#cpf").one("focusout", validaCPF);

// Nome do Endereço
$("input#nome_do_endereco").on("input", validaNomes);
$("input#nome_do_endereco").one("focusout", validaNomes);

// Número do Endereço
$("input#numero_endereco").on("input", function () {
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
$("input#numero_endereco").one("focusout", function () {
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

// CEP
$("input#cep").mask("00000-000");
$("input#cep").on("input", validaCEP);
$("input#cep").one("focusout", validaCEP);

// Estado
$("select#estado").on("change", validaEstado);

// Cidade
$("input#cidade").on("input", validaNomes);
$("input#cidade").one("focusout", validaNomes);

// Telefone e Outro Telefone
$("input#telefone").phoneBrazil();
$("input#telefone").on("input", validaTelefone);
$("input#telefone").on("focusout", validaTelefone);
$('input#outro_telefone').phoneBrazil();
$("input#outro_telefone").on("input", validaTelefone);
$("input#outro_telefone").on("focusout", validaTelefone);

// Email
$("input#email").on("input", validaEmail);
$("input#email").one("focusout", validaEmail);
// Senha e Confirmar Senha
$("input#senha").on("input", validaSenhas);
$("input#senha").one("focusout", validaSenhas);
$("input#con_senha").on("input", validaSenhas);
$("input#con_senha").one("focusout", validaSenhas);

// Capitalizar Complemento e Ponto de Referência
$("input#complemento").on("input", function () {
    var capitalizedText = capitalizeText($(this).val());
    $(this).val(capitalizedText);
});
$("input#ponto_referencia").on("input", function () {
    var capitalizedText = capitalizeText($(this).val());
    $(this).val(capitalizedText);
});

// Checkbox Ofertas
var checkOfertasChecked = true;
$("input#check_ofertas").on("click", function () {
    checkOfertasChecked = !checkOfertasChecked;
    $(this).attr("checked", checkOfertasChecked);
})
// Checkbox Política de Privacidade
var checkPoliticaChecked = true;
$("input#check_politica").on("click", function () {
    checkPoliticaChecked = !checkPoliticaChecked;
    $(this).attr("checked", checkPoliticaChecked);
})

// Verifica se existe algum input inválido ao clicar em Registrar
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

    if ($("select#estado").val() == "") {
        $("select#estado").addClass("hasOutFocusFirst");
        $("select#estado").addClass("invalid");
    }

    if (!$("input#check_politica").attr("checked")) {
        $("#label-politica").next().css("display", "block");
        $("input#check_politica").addClass("invalid");
    } else {
        $("#label-politica").next().css("display", "none");
        $("input#check_politica").removeClass("invalid");
    }

    var isDate = validaDataTotal();
    if (!$("*input").hasClass("invalid") && isDate && $("input#check_politica").attr("checked")) {
        let dia = $("#dia").val();
        let mes = parseInt($("#mes").val()) + 1;
        if (mes < 10) mes = "0" + mes;
        let ano = $("#ano").val();
        $("#data_nascimento").val(dia + "/" + mes + "/" + ano)

        $("#check_ofertas").val($("#check_ofertas").attr("checked") ? true : false);
        $("#check_politica").val($("#check_politica").attr("checked") ? true : false);

        $("input#cidade").prop("disabled", false);
        $("select#estado").prop("disabled", false);
        $("#formRegistro").submit();
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

// Data - Dia
function validaDia() {
    if ($("select#dia").val() != "") {
        $("#tooltipDia").css("display", "none");
        $("#hidden-dia").removeClass("invalid");
        if ($("select#dia").hasClass("invalid"))
            $("select#dia").removeClass("invalid");
    } else {
        $("#tooltipDia").css("display", "block");
        $("#hidden-dia").addClass("invalid");
        $("select#dia").addClass("invalid");
        $("#tooltipDataTotal").css("display", "none");
    }
}

// Data - Mês
function validaMes() {
    if ($("select#mes").val() != "") {
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
    if ($("select#ano").val() != "") {
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

// Data - Total
function validaDataTotal() {
    var day = parseInt($("select#dia").val()) || false;
    var month = parseInt($("select#mes").val()) || false;
    var year = parseInt($("select#ano").val()) || false;
    var monthLength = "";

    if (!day || !month || !year) {
        validaDia();
        $("select#dia").addClass("hasOutFocusFirst");
        validaMes();
        $("select#mes").addClass("hasOutFocusFirst");
        validaAno();
        $("select#ano").addClass("hasOutFocusFirst");
        return false;
    }

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
        monthLength[1] = 29;
    }
    if (day <= monthLength[month - 1]) {
        $("#tooltipDataTotal").css("display", "none");
        return true;
    } else {
        $("#tooltipDataTotal").css("display", "block");
        return false;
    }
}

function validaCPF() {
    if ($(this).val().length >= 1 && $(this).val().length < 14) {
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

function validaCEP() {
    if ($(this).val().length >= 1 && $(this).val().length < 9) {
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
            url: 'https://viacep.com.br/ws/' + inputCEP.val().replace("-", "") + '/json/unicode/',
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

function validaEstado() {
    if ($("select#estado").val() != "") {
        $("#tooltipEstado").css("display", "none");
        if ($("#hidden-estado").hasClass("invalid"))
            $("#hidden-estado").removeClass("invalid");
        if ($("select#estado").hasClass("invalid"))
            $("select#estado").removeClass("invalid");
    } else {
        $("#tooltipEstado").css("display", "block");
        $("#hidden-estado").addClass("invalid");
        $("select#estado").addClass("invalid");
    }
}

function validaTelefone() {
    var type = $(this).attr("placeholder").substr(2);
    if ($(this).attr("id") == "telefone") {
        telefone2 = $("#outro_telefone");
    } else {
        telefone2 = $("#telefone");
    }
    if ($(this).val().length >= 1 && $(this).val().length < 14) {
        if ($(this).hasClass("hasOutFocusFirst"))
            $(this).next().css("display", "block");
        if (!$(this).hasClass("invalid"))
            $(this).addClass("invalid");

        $(this).next().html("Digite um Telefone válido");
    } else if ($(this).val().length == 0) {
        if (type == "Telefone") {
            if ($(this).hasClass("hasOutFocusFirst"))
                $(this).next().css("display", "block");
            if (!$(this).hasClass("invalid"))
                $(this).addClass("invalid");
            $(this).next().html("Preencha o campo " + type);
        } else {
            $(this).next().css("display", "none");
            $(this).removeClass("invalid");
        }
    } else if ($(this).val() == telefone2.val()) {
        if ($(this).hasClass("hasOutFocusFirst"))
            $(this).next().css("display", "block");
        if (!$(this).hasClass("invalid"))
            $(this).addClass("invalid");

        if (telefone2.hasClass("hasOutFocusFirst"))
            telefone2.next().css("display", "block");
        if (!telefone2.hasClass("invalid"))
            telefone2.addClass("invalid");

        $(this).next().html("Digite um telefone diferente");
        telefone2.next().html("Digite um telefone diferente");
    } else {
        $(this).next().css("display", "none");
        $(this).removeClass("invalid");
        telefone2.next().css("display", "none");
        telefone2.removeClass("invalid");
    }
}

function validaEmail() {
    var email = $(this).val();
    // Verificar caracteres especiais no email
    var specialChar = /[ `!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/.test(email);
    // Verificar repetição do caractere @
    var repeatedAt = /(\@)[^\1]{0,}\1/g.test(email);
    // Verificar se existe um @ e um . depois do @ no email
    var hasAt = email.includes("@");
    var hasDot = email.substr(email.indexOf("@"), email.length).includes(".");
    if (!email.includes("@")) hasDot = false;
    // Verificar se existe algo entre @ e .
    var dominio = email.substr(email.indexOf("@") + 1, email.length);
    var hasDomain = email.substr(email.indexOf("@") + 1, dominio.indexOf(".")) != "" ? true : false;
    // Verificar se existe algo antes do @
    var hasUserAddress = email.substr(0, email.indexOf("@"));
    // Verificar se existe algo depois do . do domínio
    var hasAfterDot = dominio.substr(dominio.indexOf(".") + 2, dominio.length) != "" ? true : false;
    if (!hasDot) hasAfterDot = false;

    if (specialChar) {
        if ($(this).hasClass("hasOutFocusFirst"))
            $(this).next().css("display", "block");
        if (!$(this).hasClass("invalid"))
            $(this).addClass("invalid");
        $(this).next().html("O email não deve conter caracteres especiais");

    } else if (email.length == 0) {
        if ($(this).hasClass("hasOutFocusFirst"))
            $(this).next().css("display", "block");
        if (!$(this).hasClass("invalid"))
            $(this).addClass("invalid");
        $(this).next().html("Preencha o campo Email");

    } else if (repeatedAt || !hasAt || !hasDot || !hasDomain || !hasUserAddress || !hasAfterDot) {
        if ($(this).hasClass("hasOutFocusFirst"))
            $(this).next().css("display", "block");
        if (!$(this).hasClass("invalid"))
            $(this).addClass("invalid");
        $(this).next().html("Digite um email válido");

    } else {
        $(this).next().css("display", "none");
        $(this).removeClass("invalid");
    }
}

function validaSenhas() {
    var senha = $(this).val();
    if ($(this).attr("id") == "senha") {
        var senha2 = $("#con_senha");
    } else {
        var senha2 = $("#senha");
    }
    var type = $(this).attr("placeholder").substr(2);

    if ((senha.length >= 1 && senha.length < 8) || (senha.length > 18)) {
        if ($(this).hasClass("hasOutFocusFirst"))
            $(this).next().css("display", "block");
        if (!$(this).hasClass("invalid"))
            $(this).addClass("invalid");
        if (senha2.hasClass("hasOutFocusFirst"))
            senha2.next().css("display", "block");
        if (!senha2.hasClass("invalid"))
            senha2.addClass("invalid");

        $(this).next().html("A senha deve conter entre 8 e 18 caracteres (" + $(this).val().length + " caracteres atualmente");

    } else if ($(this).val().length == 0) {
        if ($(this).hasClass("hasOutFocusFirst"))
            $(this).next().css("display", "block");
        if (!$(this).hasClass("invalid"))
            $(this).addClass("invalid");
        if (senha2.hasClass("hasOutFocusFirst"))
            senha2.next().css("display", "block");
        if (!senha2.hasClass("invalid"))
            senha2.addClass("invalid");

        $(this).next().html("Preencha o campo " + type);

    } else if (senha != senha2.val()) {
        $(this).next().html("Senhas diferentes");
        senha2.next().html("Senhas diferentes");
        if (senha2.hasClass("hasOutFocusFirst")) {
            if (!$(this).hasClass("invalid"))
                $(this).addClass("invalid");
            if (!senha2.hasClass("invalid"))
                senha2.addClass("invalid");
            $(this).next().css("display", "block");
            senha2.next().css("display", "block");

        } else {
            $(this).next().css("display", "none");
            senha2.next().css("display", "none");
        }
    } else {
        $(this).next().css("display", "none");
        $(this).removeClass("invalid");
        senha2.next().css("display", "none");
        senha2.removeClass("invalid");
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