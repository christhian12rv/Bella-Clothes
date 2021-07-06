// Remove a navbar da página
$("#content").remove();

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
$("input#inscricao_municipal").removeClass("invalid");
$("input#check-isento").removeClass("invalid");
$("input#complemento").removeClass("invalid");
$("input#ponto_referencia").removeClass("invalid");
$("input#outro_telefone").removeClass("invalid");
$("input#check-ofertas").removeClass("invalid");

// Verificar validade de todos os inputs
    // Razão Social
        $("input#razao_social").on("input", validaNomes);
        $("input#razao_social").one("focusout", validaNomes);

    // Nome Fantasia
        $("input#fantasia").on("input", validaNomes);
        $("input#fantasia").one("focusout", validaNomes);
    
    // CNPJ
        $("input#cnpj").mask('00.000.000/0000-00');
        $("input#cnpj").on("input", validaCNPJ);
        $("input#cnpj").one("focusout", validaCNPJ);

    // Inscrição Estadual
        $("input#inscricao_estadual").on("input", function() {
            if ($(this).val().length == 0) {
                if ($(this).hasClass("hasOutFocusFirst"))
                    $(this).next().css("display", "block");   
                if (!$(this).hasClass("invalid"))
                    $(this).addClass("invalid");
                $(this).next().html("Preencha o campo Inscrição Estadual");
            } else {
                $(this).next().css("display", "none");
                $(this).removeClass("invalid");
            }
        });
        $("input#inscricao_estadual").one("focusout", function() {
            if ($(this).val().length == 0) {
                if ($(this).hasClass("hasOutFocusFirst"))
                    $(this).next().css("display", "block");   
                if (!$(this).hasClass("invalid"))
                    $(this).addClass("invalid");
                $(this).next().html("Preencha o campo Inscrição Estadual");
            } else {
                $(this).next().css("display", "none");
                $(this).removeClass("invalid");
            }
        });

    // Checkbox Isento
        var checkIsentoChecked = false;
        $("input#check-isento").on("click", function() {
            checkIsentoChecked = !checkIsentoChecked;
            $(this).attr("checked", checkIsentoChecked);
            if ($("input#check-isento").attr("checked")) {
                $("input#inscricao_estadual").val("");
                $("input#inscricao_estadual").removeClass("invalid");
                $("input#inscricao_estadual").next().css("display", "none");
                $("input#inscricao_estadual").prop("disabled", true);
                $("input#inscricao_estadual").attr("placeholder", "");
            } else {
                $("input#inscricao_estadual").addClass("invalid");
                $("input#inscricao_estadual").removeClass("hasClicked");
                $("input#inscricao_estadual").removeClass("hasOutFocusFirst");
                $("input#inscricao_estadual").prop("disabled", false);
                $("input#inscricao_estadual").attr("placeholder", "* Inscrição Estadual");
            }  
        })

    // Nome do Endereço
        $("input#nome_do_endereco").on("input", validaNomes);
        $("input#nome_do_endereco").one("focusout", validaNomes);

    // Número do Endereço
        $("input#numeroEndereco").on("input", function() {
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
        $("input#numeroEndereco").one("focusout", function() {
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
        $("input#cep").on("input", function () {validaCEP($("input#cep"))});
        $("input#cep").one("focusout", function () {validaCEP($("input#cep"))});

    // Estado
        $("select#estado").on("change",  validaEstado);

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
        $("input#con-senha").on("input", validaSenhas);
        $("input#con-senha").one("focusout", validaSenhas);

    // Inscrição Municipal, Capitalizar Complemento e Ponto de Referência
        $("input#inscricao_municipal").on("input", function () {
            var capitalizedText =  capitalizeText($(this).val());
            $(this).val(capitalizedText);
        });
        $("input#complemento").on("input", function () {
            var capitalizedText =  capitalizeText($(this).val());
            $(this).val(capitalizedText);
        });
        $("input#ponto_referencia").on("input", function () {
            var capitalizedText =  capitalizeText($(this).val());
            $(this).val(capitalizedText);
        });

    // Checkbox Ofertas
        var checkOfertasChecked = true;
        $("input#check-ofertas").on("click", function() {
            checkOfertasChecked = !checkOfertasChecked;
            $(this).attr("checked", checkOfertasChecked);       
        })
    // Checkbox Política de Privacidade
        var checkPoliticaChecked = true;
        $("input#check-politica").on("click", function() {
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

    if ($("select#estado").val() == "Selecione") {
        $("select#estado").addClass("hasOutFocusFirst");
        $("select#estado").addClass("invalid");
    }
      
    if (!$("input#check-politica").attr("checked")) {
        $("#label-politica").next().css("display", "block");
        $("input#check-politica").addClass("invalid");
    } else {
        $("#label-politica").next().css("display", "none");
        $("input#check-politica").removeClass("invalid");
    }

    if (!$("*input").hasClass("invalid") && $("input#check-politica").attr("checked")) {
        $("#formRegistro").submit();
    }
}





/*-------------------------------------------------------------------------------------------
                                        Funções
-------------------------------------------------------------------------------------------*/

//Nomes
function validaNomes() {
    // Capitalizar texto
    if ($(this).attr("id") != "razao_social" && $(this).attr("id") != "fantasia") {
        var capitalizedText =  capitalizeText($(this).val());
        $(this).val(capitalizedText);
    } else {
        $(this).val($(this).val().toUpperCase());
    }

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

function validaCNPJ() {
    var cnpj = $(this).val().replace(/[^0-9]/g, '');
    if (cnpj.length >= 1 && cnpj.length < 14) {
        if ($(this).hasClass("hasOutFocusFirst"))
            $(this).next().css("display", "block");   
        if (!$(this).hasClass("invalid"))
            $(this).addClass("invalid");

        $(this).next().html("Digite um CNPJ válido");

        $("input#razao_social").prop("disabled", false);
        $("input#fantasia").prop("disabled", false);
        $("input#cep").prop("disabled", false);
    } else if (cnpj.length == 0) {
        if ($(this).hasClass("hasOutFocusFirst"))
            $(this).next().css("display", "block");   
        if (!$(this).hasClass("invalid"))
            $(this).addClass("invalid");

        $(this).next().html("Preencha o campo CNPJ");

        $("input#razao_social").prop("disabled", false);
        $("input#fantasia").prop("disabled", false);
        $("input#cep").prop("disabled", false);
    } else {
        const inputCNPJ = $(this);
        const verificaCNPJ = $.ajax({
            url: 'https://www.receitaws.com.br/v1/cnpj/' + cnpj,
            method: 'GET',			
            dataType: 'jsonp'          
        });
        verificaCNPJ
            .done(function(data) {
                if ("erro" in data) {
                    if (inputCNPJ.hasClass("hasOutFocusFirst"))
                        inputCNPJ.next().css("display", "block");   
                    if (!inputCNPJ.hasClass("invalid"))
                        inputCNPJ.addClass("invalid");
                    inputCNPJ.next().html(data.message);
                } else {
                    // Razão Social
                    $("input#razao_social").val(data.nome);
                    $("input#razao_social").prop("disabled", true);
                    $("input#razao_social").removeClass("invalid");
                    $("input#razao_social").next().css("display", "none");

                    // Nome Fantasia
                    $("input#fantasia").val(data.fantasia);
                    $("input#fantasia").prop("disabled", true);
                    $("input#fantasia").removeClass("invalid");
                    $("input#fantasia").next().css("display", "none");

                    // CEP
                    $("input#cep").val(data.cep.replace(/[^0-9]/g, ''));		
                    $("input#cep").next().css("display", "none");
                    $("input#cep").removeClass("invalid");
                    $("input#cep").addClass("hasClicked");
                    $("input#cep").addClass("hasOutFocusFirst");
                    $("input#cep").prop("disabled", true);
                    validaCEP($("input#cep"));
    
                    // Nome do Endereço
                    $("input#nome_do_endereco").val(data.logradouro);
                    $("input#nome_do_endereco").prop("disabled", true);
                    $("input#nome_do_endereco").removeClass("invalid");
                    $("input#nome_do_endereco").next().css("display", "none");

                    // Nome do Endereço
                    $("input#numeroEndereco").val(data.numero);
                    $("input#numeroEndereco").prop("disabled", true);
                    $("input#numeroEndereco").removeClass("invalid");
                    $("input#numeroEndereco").next().css("display", "none");

                    // Nome do Endereço
                    $("input#bairro").val(data.bairro);
                    $("input#bairro").prop("disabled", true);
                    $("input#bairro").removeClass("invalid");
                    $("input#bairro").next().css("display", "none");
        
                    inputCNPJ.next().css("display", "none");
                    inputCNPJ.removeClass("invalid");
                }
            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.log("Erro Interno");    
            });
    }
}

function validaCEP(CEP) {
    if (CEP.val().length >= 1 && CEP.val().length < 8) {
        if (CEP.hasClass("hasOutFocusFirst"))
            CEP.next().css("display", "block");   
        if (!CEP.hasClass("invalid"))
            CEP.addClass("invalid");

        CEP.next().html("Digite um CEP válido");
        $("input#cidade").prop("disabled", false);
        $("select#estado").prop("disabled", false);
        
    } else if (CEP.val().length == 0) {
        if (CEP.hasClass("hasOutFocusFirst"))
            CEP.next().css("display", "block");   
        if (!CEP.hasClass("invalid"))
            CEP.addClass("invalid");

        CEP.next().html("Preencha o campo CEP");
        $("input#cidade").prop("disabled", false);
        $("select#estado").prop("disabled", false);

    } else {
        const inputCEP = CEP;
        // Puxa estados e cidades do "viacep" por JQuery AJAX
        const verificaEstadoCidade = $.ajax({
            url: 'https://viacep.com.br/ws/' + inputCEP.val() + '/json/unicode/',			
            dataType: 'json'          
        });
        verificaEstadoCidade
            .done(function(data) {
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
            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.log("Erro Interno");    
            });
    }

    
}

function validaEstado() {
    if ($("select#estado").val() != "Selecione") {
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
    } else if ($(this).val() == telefone2.val()){
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
    var repeatedAt =/(\@)[^\1]{0,}\1/g.test(email);  
    // Verificar se existe um @ e um . depois do @ no email
    var hasAt = email.includes("@");
    var hasDot = email.substr(email.indexOf("@"), email.length).includes(".");
    if (!email.includes("@")) hasDot = false;
    // Verificar se existe algo entre @ e .
    var dominio = email.substr(email.indexOf("@")+1, email.length);
    var hasDomain = email.substr(email.indexOf("@")+1, dominio.indexOf(".")) != "" ? true : false;
    // Verificar se existe algo antes do @
    var hasUserAddress = email.substr(0, email.indexOf("@"));
    // Verificar se existe algo depois do . do domínio
    var hasAfterDot = dominio.substr(dominio.indexOf(".")+1, dominio.length) != "" ? true : false;
    if (!hasDot) hasAfterDot = false;
    
    if (specialChar) {
        if ($(this).hasClass("hasOutFocusFirst"))
            $(this).next().css("display", "block");   
        if (!$(this).hasClass("invalid"))
            $(this).addClass("invalid");
        $(this).next().html("O email não deve conter caracteres especiais");

        console.log("Erro 1");

    } else if (email.length == 0) {
        if ($(this).hasClass("hasOutFocusFirst"))
            $(this).next().css("display", "block");   
        if (!$(this).hasClass("invalid"))
            $(this).addClass("invalid");
        $(this).next().html("Preencha o campo Email");
        console.log("Erro 2");

    } else if (repeatedAt || !hasAt || !hasDot || !hasDomain || !hasUserAddress || !hasAfterDot) {
        if ($(this).hasClass("hasOutFocusFirst"))
            $(this).next().css("display", "block");   
        if (!$(this).hasClass("invalid"))
            $(this).addClass("invalid");
        $(this).next().html("Digite um email válido");
        console.log("Erro 3");
    } else {
        $(this).next().css("display", "none");
        $(this).removeClass("invalid");
        console.log("Certo");
    }
}

function validaSenhas() {
    var senha = $(this).val();
    if ($(this).attr("id") == "senha") {
        var senha2 = $("#con-senha");
    } else {
        var senha2 = $("#senha");
    }
    var type = $(this).attr("placeholder").substr(2);

    if ((senha.length >= 1 && senha.length < 6) || (senha.length > 18)) {
        if ($(this).hasClass("hasOutFocusFirst"))
            $(this).next().css("display", "block");   
        if (!$(this).hasClass("invalid"))
            $(this).addClass("invalid");
        if (senha2.hasClass("hasOutFocusFirst"))
            senha2.next().css("display", "block");   
        if (!senha2.hasClass("invalid"))
            senha2.addClass("invalid");

        $(this).next().html("A senha deve conter entre 6 e 18 caracteres (" + $(this).val().length + " caracteres atualmente");
    
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
                beginText = text.substr(0, i+1);
                restText = text.substr(i+2,text.length);
                text = beginText + text.charAt(i+1).toUpperCase() + restText;   
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