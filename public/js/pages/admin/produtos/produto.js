$(".sidebar-link.produtos").addClass("active").addClass("only");
$(".sidebar-link.ver-produtos").addClass("active");

$(document).on('click', '.btn-open-details-variacao-produto', function () {
    var idDetail = $(this).attr("id").substr(20);
    $(this).css("display", "none");
    $("#btn-close-detail-cor-" + idDetail).css("display", "block");
    $("#detail-variacao-" + idDetail).css("display", "table-row");
});

$(document).on('click', '.btn-close-details-variacao-produto', function () {
    var idDetail = $(this).attr("id").substr(21);
    $(this).css("display", "none");
    $("#btn-open-detail-cor-" + idDetail).css("display", "block");
    $("#detail-variacao-" + idDetail).css("display", "none");
});

$("#genero").on("change", function () {
    if ($(this).val() == "Infantil")
        $("#div-genero").after(generoInfantil());
    else
        if ($("#genero-infantil"))
            $("#genero-infantil").remove();
})

$(window).on("load", function () {
    if ($("#cp-dark-content").prop("checked")) {
        $("#descricao_introducao").parent().addClass("trumbowyg-dark");
    }
    $('#descricao_introducao').trumbowyg(trumbowygOptions());
    $('#descricao_recursos').trumbowyg(trumbowygOptions());
})

// Adicionar variação 1 do produto
$(".box-variacoes-produto").append(productVariation(1));
$("input[id='variacao[1][preco_original]']").maskMoney({ prefix: 'R$ ', allowNegative: true, thousands: '.', decimal: ',', affixesStay: true });
$("input[id='variacao[1][parcela_box_1][preco_parcela]']").maskMoney({ prefix: 'R$ ', allowNegative: true, thousands: '.', decimal: ',', affixesStay: true });
$("input[id='variacao[1][parcela_box_1][juros_parcela]']").mask('##0,00%', { reverse: true });
adicionarImagem(1);

// Adicionar e Remover variações do produto
$("#quantidade_cores").on("input", function () {
    var qtdInput = parseInt(this.value);
    if (!qtdInput) {
        qtdInput = 0;
    }

    var qtdVariationsOpen = parseInt($(".details-variacao-produto").length);
    if (qtdVariationsOpen < qtdInput) {
        for (i = 1; i <= (qtdInput - qtdVariationsOpen); i++) {
            $(".box-variacoes-produto").append(productVariation(i + qtdVariationsOpen));
            masksInputsOfNewVariation(i + qtdVariationsOpen);
            adicionarImagem(i + qtdVariationsOpen);
        }
    } else if (qtdInput > 0) {
        for (i = qtdVariationsOpen; i >= qtdInput + 1; i--) {
            $("#table-variacao-produto-" + i).remove();
        }
    }
})


$(document).on('change', '.tipo-desconto', function () {
    var tipo = $(this).val();
    switch (tipo) {
        case 'porcentagem':
            $(this).next('input').removeAttr("disabled");
            $(this).next('input').maskMoney('destroy');
            $(this).next('input').mask('##0,00%', { reverse: true });
            break;
        case 'bruto':
            $(this).next('input').removeAttr("disabled");
            $(this).next('input').unmask('destroy');
            $(this).next('input').maskMoney({ prefix: 'R$ ', allowNegative: true, thousands: '.', decimal: ',', affixesStay: true });
            break;
        default:
            $(this).next('input').val("");
            $(this).next('input').attr("disabled", "true");
            break;
    }
    $(this).next('input').focus();
})


$(document).on('input', '.qtd-parcelas', function (index) {
    var idVariacao = $(this).attr("id").match(/\[(-?\d+)\]/)[1];

    var qtdInput = parseInt(this.value);
    console.log("inputa:" + qtdInput)
    if (!qtdInput) {
        qtdInput = 1;
    }
    if (qtdInput <= 0) {
        $(this).val(1);
        qtdInput = 1;
    } else if (qtdInput > 12) {
        $(this).val(12);
        qtdInput = 12;
    }

    var qtdParcelasOpen = parseInt($("#parcelas-group-" + idVariacao + " .parcela-box").length);
    if (qtdParcelasOpen < qtdInput) {
        for (i = 1; i <= (qtdInput - qtdParcelasOpen); i++) {
            $("#parcelas-group-" + idVariacao).append(parcela(idVariacao, i + qtdParcelasOpen));
        }
    } else if (qtdInput > 0) {
        for (i = qtdParcelasOpen; i >= qtdInput + 1; i--) {
            $("div[id='variacao[" + idVariacao + "][parcela_box_" + i + "]']").remove();
        }
    }

    maskParcelas(idVariacao);
})


$(document).on('input', '.qtd-tamanhos', function () {
    var idVariacao = $(this).attr("id").match(/\[(-?\d+)\]/)[1];
    var qtdInput = parseInt(this.value);
    if (!qtdInput) {
        qtdInput = 1;
    }
    if (qtdInput <= 0) {
        $(this).val(1);
        qtdInput = 1;
    }

    var qtdTamanhosOpen = parseInt($("#tamanhos-group-" + idVariacao + " .tamanho-box").length);
    if (qtdTamanhosOpen < qtdInput) {
        for (i = 1; i <= (qtdInput - qtdTamanhosOpen); i++) {
            $("#tamanhos-group-" + idVariacao).append(tamanho(idVariacao, i + qtdTamanhosOpen));
        }
    } else if (qtdInput > 0) {
        for (i = qtdTamanhosOpen; i >= qtdInput + 1; i--) {
            $("div[id='variacao[" + idVariacao + "][tamanho_box_" + i + "]']").remove();
        }
    }
})

$(document).on('click', '.remover-imagem', function () {
    var idVariacao = $(this).parent().parent().attr("id").match(/\[(-?\d+)\]/)[1];
    $(this).parent().remove();
    var numeroImagens = $("div[id='variacao[" + idVariacao + "][box-images]'] .box-image-product").length;
    $("div[id='variacao[" + idVariacao + "][numeroImagens]']").html(numeroImagens + " imagens selecionadas");
})

$("#cp-dark-content").on("click", function () {
    $('#descricao_introducao').trumbowyg('destroy');
    $('#descricao_recursos').trumbowyg('destroy');
    if ($(this).prop("checked")) {
        $("#descricao_introducao").parent().addClass("trumbowyg-dark");
    } else {
        $("#descricao_introducao").parent().removeClass("trumbowyg-dark");
    }
    $('#descricao_introducao').trumbowyg(trumbowygOptions());
    $('#descricao_recursos').trumbowyg(trumbowygOptions());
})




/**************************************************** FUNÇÕES ****************************************************************** */

function productImagesChoose(id) {

    var dragSrcEl = null;

    function handleDragStart(e) {
        this.style.opacity = '0.4';

        dragSrcEl = this;

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', e.target.getAttribute("dataDragImg"));
        this.classList.add("dragging");
    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }

        e.dataTransfer.dropEffect = 'move';

        return false;
    }

    function handleDragEnter(e) {
        e.target.classList.add('over');
    }

    function handleDragLeave(e) {
        e.target.classList.remove('over');
    }

    function handleDrop(e) {
        if (e.target.tagName != "IMG" && e.target.tagName != "DIV") {
            return false
        }
        if (e.stopPropagation) {
            e.stopPropagation(); // stops the browser from redirecting.
        }

        if (dragSrcEl != this) {
            dragSrcEl = this;
            var beforeElemPos = e.target;
            if (e.target.tagName == "IMG") {
                beforeElemPos = e.target.parentElement;
            }
            if (e.target.getAttribute("dataDragImg") != $('#imagens-box-' + id + ' .images-choose .box-image-product').eq(0).attr("dataDragImg"))
                beforeElemPos.after(document.querySelector("[dataDragImg='" + e.dataTransfer.getData('text/html') + "']"));
            else
                beforeElemPos.before(document.querySelector("[dataDragImg='" + e.dataTransfer.getData('text/html') + "']"));
        }

        return false;
    }

    function handleDragEnd(e) {
        this.style.opacity = '1';

        $("#imagens-box-" + id + " .images-choose .box-image-product").each(function () {
            $(this).removeClass("over");
        })
        $("#imagens-box-" + id + " .images-choose .box-image-product img").each(function () {
            $(this).removeClass("over");
        })
    }


    let items = document.querySelectorAll('#imagens-box-' + id + ' .images-choose .box-image-product');
    items.forEach(function (item) {
        item.addEventListener('dragstart', handleDragStart, false);
        item.addEventListener('dragenter', handleDragEnter, false);
        item.addEventListener('dragover', handleDragOver, false);
        item.addEventListener('dragleave', handleDragLeave, false);
        item.addEventListener('drop', handleDrop, false);
        item.addEventListener('dragend', handleDragEnd, false);
    });
}

function masksInputsOfNewVariation(id) {
    $("input[id='variacao[" + id + "][preco_original]']").maskMoney({ prefix: 'R$ ', allowNegative: true, thousands: '.', decimal: ',', affixesStay: true });
    $("input[id='variacao[" + id + "][parcela_box_1][preco_parcela]']").maskMoney({ prefix: 'R$ ', allowNegative: true, thousands: '.', decimal: ',', affixesStay: true });
    $("input[id='variacao[" + id + "][parcela_box_1][juros_parcela]']").mask('##0,00%', { reverse: true });
}

function maskParcelas(idVariacao) {
    $("#parcelas-group-" + idVariacao + " .parcela-box").each(function () {
        $(this).children(".preco-parcela").maskMoney({ prefix: 'R$ ', allowNegative: true, thousands: '.', decimal: ',', affixesStay: true });
        $(this).children(".juros-parcela").mask('##0,00%', { reverse: true });
    })
}

function productVariation(id) {
    var productVariation =
        '            <div class="table-responsive table-variacao-produto" id="table-variacao-produto-' + id + '">' +
        '                <table class="table table-bordered">' +
        '                    <thead>' +
        '                        <tr>' +
        '                            <th style="border-bottom-width: 1px;"><label for="variacao[' + id + '][cor]">* Cor ' + id + '</label></th>' +
        '                            <th class="border-bottom-0"><label for="variacao[' + id + '][preco_original]">* Preço original</label></th>' +
        '                        </tr>' +
        '                    </thead>' +
        '                    <tbody>' +
        '                        <tr>' +
        '                            <td class="d-flex flex-row flex-wrap border-top-0 border-right-0"' +
        '                                style="gap: .7rem;">' +
        '                                <i class="bi bi-plus btn-open-details-variacao-produto" id="btn-open-detail-cor-' + id + '"></i>' +
        '                                <i class="bi bi-dash btn-close-details-variacao-produto"' +
        '                                    id="btn-close-detail-cor-' + id + '"></i>' +
        '                                <input type="text" name="variacao[' + id + '][cor]" id="variacao[' + id + '][cor]" placeholder="* Nome da cor"' +
        '                                    class="flex-grow-1" required>' +
        '                            </td>' +
        '                            <td style="vertical-align: bottom;">' +
        '                                <input type="text" name="variacao[' + id + '][preco_original]" id="variacao[' + id + '][preco_original]" placeholder="* Preço"' +
        '                                    class="w-100 preco-original" style="min-width: 200px;" required>' +
        '                            </td>' +
        '                        </tr>' +
        '                        <tr class="details-variacao-produto" id="detail-variacao-' + id + '" style="display: none;">' +
        '                            <td colspan="2" class="m-0 p-0 w-100 border-top-0">' +
        '                                <table class="w-100 border-0">' +
        '                                    <tbody>' +
        '                                        <tr>' +
        '                                            <td><label for="variacao[' + id + '][tipo_desconto]">Desconto</label></td>' +
        '                                            <td class="d-flex flex-row flex-wrap" style="gap: .5rem;">' +
        '                                                <select class="tipo-desconto" name="variacao[' + id + '][tipo_desconto]" id="variacao[' + id + '][tipo_desconto]">' +
        '                                                    <option value="">Tipo do desconto</option>' +
        '                                                    <option value="porcentagem">Porcentagem (%)</option>' +
        '                                                    <option value="bruto">Bruto (R$)</option>' +
        '                                                </select>' +
        '                                                <input type="text" name="variacao[' + id + '][desconto]" id="variacao[' + id + '][desconto]" placeholder="Desconto"' +
        '                                                    class="flex-grow-1 input-desconto" disabled="true">' +
        '                                            </td>' +
        '                                        </tr>' +
        '                                        <tr>' +
        '                                            <td><label for="variacao[' + id + '][qtd_parcelas]">* Parcelas</label></td>' +
        '                                            <td class="d-flex flex-column flex-wrap parcelas-group" id="parcelas-group-' + id + '" style="gap: .5rem;">' +
        '                                               <input type="number" id="variacao[' + id + '][qtd_parcelas]" name="variacao[' + id + '][qtd_parcelas]" placeholder="* Quantidade de parcelas"' +
        '                                                   class="qtd-parcelas" value="1" onkeydown="return event.keyCode == 69 ? false : true" min="1" max="12" required></input>' +
        '                                                <div class="d-flex flex-row flex-wrap parcela-box" id="variacao[' + id + '][parcela_box_1]" style="gap: .5rem;">' +
        '                                                    <select name="variacao[' + id + '][parcela_box_1][vezes_parcela]" id="variacao[' + id + '][parcela_box_1][vezes_parcela]" required>' +
        '                                                        <option value="1">1x</option>' +
        '                                                        <option value="2">2x</option>' +
        '                                                        <option value="3">3x</option>' +
        '                                                        <option value="4">4x</option>' +
        '                                                        <option value="5">5x</option>' +
        '                                                        <option value="6">6x</option>' +
        '                                                        <option value="7">7x</option>' +
        '                                                        <option value="8">8x</option>' +
        '                                                        <option value="9">9x</option>' +
        '                                                        <option value="10">10x</option>' +
        '                                                        <option value="11">11x</option>' +
        '                                                        <option value="12">12x</option>' +
        '                                                    </select>' +
        '                                                    <select name="" id="escolher-juros-parcela" required>' +
        '                                                        <option value="sem-juros">Sem juros</option>' +
        '                                                        <option value="com-juros">Com juros</option>' +
        '                                                    </select>' +
        '                                                    <input type="text" name="variacao[' + id + '][parcela_box_1][preco_parcela]" id="variacao[' + id + '][parcela_box_1][preco_parcela]"' +
        '                                                        class="preco-parcela" placeholder="* R$ 00,00" required>' +
        '                                                    <input type="text" name="variacao[' + id + '][parcela_box_1][juros_parcela]" id="variacao[' + id + '][parcela_box_1][juros_parcela]"' +
        '                                                        class="juros-parcela" placeholder="Juros ao mês (%)">' +
        '                                                </div>' +
        '                                            </td>' +
        '                                        </tr>' +
        '                                        <tr>' +
        '                                            <td><label for="variacao[' + id + '][qtd_tamanhos]">* Tamanhos / Estoque</label></td>' +
        '                                            <td class="d-flex flex-column flex-wrap tamanhos-group" id="tamanhos-group-' + id + '" style="gap: .5rem;">' +
        '                                               <input type="number" id="variacao[' + id + '][qtd_tamanhos]" name="variacao[' + id + '][qtd_tamanhos]" placeholder="* Quantidade de Tamanhos"' +
        '                                                   class="qtd-tamanhos" value="1" onkeydown="return event.keyCode == 69 ? false : true" min="1" max="12" required></input>' +
        '                                                <div class="d-flex flex-row flex-wrap tamanho-box" id="variacao[' + id + '][tamanho_box_1]" style="gap: .5rem;">' +
        '                                                    <input type="text" name="variacao[' + id + '][tamanho_box_1][tamanho]" id="variacao[' + id + '][tamanho_box_1][tamanho]"' +
        '                                                        class="flex-grow-1" placeholder="* Tamanho 1">' +
        '                                                    <input type="number" name="variacao[' + id + '][tamanho_box_1][estoque]" id="variacao[' + id + '][tamanho_box_1][estoque]"' +
        '                                                        placeholder="* Estoque 1"' +
        '                                                        onkeydown="return event.keyCode == 69 ? false : true">' +
        '                                                </div>' +
        '                                            </td>' +
        '                                        </tr>' +
        '                                        <tr>' +
        '                                            <td><label>* Imagens</label></td>' +
        '                                            <td>' +
        '                                                <div class=".d-flex flex-row flex-wrap mx-3 mb-3 imagens-box" id="imagens-box-' + id + '">' +
        '                                                    <p class="dica-imagens w-100">Dica: Arraste e troque as imagens de' +
        '                                                        lugar' +
        '                                                        para alterar sua ordem de' +
        '                                                        exibição no' +
        '                                                        site</p>' +
        '                                                    <div class="w-100 mb-2">' +
        '                                                        <div class="image-upload">' +
        '                                                            <div class="image-select">' +
        '                                                                <div class="image-select-button" id="imageName">Escolher' +
        '                                                                    imagem</div>' +
        '                                                                <div class="image-select-name" id="variacao[' + id + '][numeroImagens]">0 Imagens' +
        '                                                                    selecionadas</div>' +
        '                                                                <input type="file" class="escolher-imagem" id="variacao[' + id + '][escolherImagem]" name="variacao[' + id + '][escolherImagem]" onchange="novoArquivo(this)">' +
        '                                                            </div>' +
        '                                                        </div>' +
        '                                                    </div>' +
        '                                                    <div class="d-flex flex-row flex-wrap images-choose" id="variacao[' + id + '][box-images]">' +
        '                                                        <div class="box-image-product" draggable="true"' +
        '                                                            dataDragImg="bip-tenisTeste.jpg">' +
        '                                                            <img src="/img/tenisTeste.jpg" alt="" class="imagem-produto"' +
        '                                                                dataDragImg="bip-tenisTeste.jpg">' +
        '                                                            <div class="remover-imagem remover-imagem-produto-' + id + '">' +
        '                                                                <a href="#"><i class="bi bi-x-lg"></i></a>' +
        '                                                            </div>' +
        '                                                        </div>' +
        '                                                    </div>' +
        '                                                    <div id="variacao[' + id + '][group-imagens]">' +
        '                                                    </div>' +
        '                                                </div>' +
        '                                            </td>' +
        '                                        </tr>' +
        '                                    </tbody>' +
        '                                </table>' +
        '                            </td>' +
        '                        </tr>' +
        '                    </tbody>' +
        '                </table>' +
        '            </div>' +
        '        </div>';
    return productVariation;
}

function parcela(idVariacao, idParcela) {
    var parcela =
        '                                                <div class="d-flex flex-row flex-wrap parcela-box" id="variacao[' + idVariacao + '][parcela_box_' + idParcela + ']" style="gap: .5rem;">' +
        '                                                    <select name="variacao[' + idVariacao + '][parcela_box_' + idParcela + '][vezes_parcela]" id="variacao[' + idVariacao + '][parcela_box_' + idParcela + '][vezes_parcela]" required>' +
        '                                                        <option value="1">1x</option>' +
        '                                                        <option value="2">2x</option>' +
        '                                                        <option value="3">3x</option>' +
        '                                                        <option value="4">4x</option>' +
        '                                                        <option value="5">5x</option>' +
        '                                                        <option value="6">6x</option>' +
        '                                                        <option value="7">7x</option>' +
        '                                                        <option value="8">8x</option>' +
        '                                                        <option value="9">9x</option>' +
        '                                                        <option value="10">10x</option>' +
        '                                                        <option value="11">11x</option>' +
        '                                                        <option value="12">12x</option>' +
        '                                                    </select>' +
        '                                                    <select name="" id="escolher-juros-parcela" required>' +
        '                                                        <option value="sem-juros">Sem juros</option>' +
        '                                                        <option value="com-juros">Com juros</option>' +
        '                                                    </select>' +
        '                                                    <input type="text" name="variacao[' + idVariacao + '][parcela_box_' + idParcela + '][preco_parcela]" id="variacao[' + idVariacao + '][parcela_box_' + idParcela + '][preco_parcela]"' +
        '                                                        class="preco-parcela" placeholder="* R$ 00,00" required>' +
        '                                                    <input type="text" name="variacao[' + idVariacao + '][parcela_box_' + idParcela + '][juros_parcela]" id="variacao[' + idVariacao + '][parcela_box_' + idParcela + '][juros_parcela]"' +
        '                                                        class="juros-parcela" placeholder="Juros ao mês (%)">' +
        '                                                </div>';
    return parcela;
}

function tamanho(idVariacao, idTamanho) {
    var tamanho =
        '                                                <div class="d-flex flex-row flex-wrap tamanho-box" id="variacao[' + idVariacao + '][tamanho_box_' + idTamanho + ']" style="gap: .5rem;">' +
        '                                                    <input type="text" name="variacao[' + idVariacao + '][tamanho_box_' + idTamanho + '][tamanho]" id="variacao[' + idVariacao + '][tamanho_box_' + idTamanho + '][tamanho]"' +
        '                                                        class="flex-grow-1" placeholder="* Tamanho ' + idTamanho + '">' +
        '                                                    <input type="number" name="variacao[' + idVariacao + '][tamanho_box_' + idTamanho + '][estoque]" id="variacao[' + idVariacao + '][tamanho_box_' + idTamanho + '][estoque]"' +
        '                                                        placeholder="* Estoque ' + idTamanho + '"' +
        '                                                        onkeydown="return event.keyCode == 69 ? false : true">' +
        '                                                </div>';
    return tamanho
}

function adicionarImagem(idVariacao) {
    var escolherImagem = document.getElementById("variacao[" + idVariacao + "][escolherImagem]");
    inputImagemChangeEvent(escolherImagem, idVariacao);
}

function inputImagemChangeEvent(inputImagem, idVariacao) {
    inputImagem.addEventListener("change", function () {
        var files = inputImagem.files[0];
        if (files) {
            var fileReader = new FileReader();
            fileReader.readAsDataURL(files);
            var fileName = this.files[0].name;
            fileReader.addEventListener("load", function (event) {
                var newImage =
                    ' <div class="box-image-product" draggable="true"' +
                    '   dataDragImg="' + this.result + '">' +
                    '       <img src="' + this.result + '" alt="" class="imagem-produto"' +
                    '         dataDragImg="' + this.result + '">' +
                    '       <div class="remover-imagem remover-imagem-produto-' + idVariacao + '">' +
                    '           <a><i class="bi bi-x-lg"></i></a>' +
                    '       </div>' +
                    ' </div>';
                $("div[id='variacao[" + idVariacao + "][box-images]']").append(newImage);
                productImagesChoose(idVariacao);
                var numeroImagens = $("div[id='variacao[" + idVariacao + "][box-images]'] .box-image-product").length;
                $("div[id='variacao[" + idVariacao + "][numeroImagens]']").html(numeroImagens + " imagens selecionadas");
            });
        }
    });
}

function novoArquivo(input) {
    var idVariacao = $(input).attr("id").match(/\[(-?\d+)\]/)[1];
    var inputImagem = document.createElement('input');
    inputImagem.setAttribute("type", "file");
    inputImagem.setAttribute("id", "variacao[" + idVariacao + "][escolherImagem]");
    inputImagem.setAttribute("name", "variacao[" + idVariacao + "][escolherImagem]");
    inputImagem.setAttribute("onchange", "novoArquivo(this)");
    input.parentNode.insertBefore(inputImagem, input.nextSibling);
    $(input).css("display", "none");
    inputImagemChangeEvent(inputImagem, idVariacao);
}

function generoInfantil() {
    var generoInfantil =
        '<div id="genero-infantil">' +
        '    <label for="infantil">* Infantil</label>' +
        '    <select name="infantil" id="infantil" required>' +
        '        <option value="">* Escolha um gênero infantil</option>' +
        '        <option value="menino">Menino</option>' +
        '        <option value="menina">Menina</option>' +
        '        <option value="Bebê Menino">Bebê Menino</option>' +
        '        <option value="Bebê Menina">Bebê Menina</option>' +
        '    </select>' +
        '</div>';
    return generoInfantil;
}

function trumbowygOptions() {
    var options = {
        lang: "pt_br",
        btns: [
            ['undo', 'redo'], // Only supported in Blink browsers
            ['formatting'],
            ['strong', 'em', 'del'],
            ['foreColor', 'backColor'],
            ['superscript', 'subscript'],
            ['link'],
            ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
            ['indent', 'outdent'],
            ['unorderedList', 'orderedList'],
            ['table'],
            ['horizontalRule'],
            ['removeformat'],
            ['fullscreen']
        ],
        removeformatPasted: true,
        urlProtocol: true,
        minimalLinks: true,
        autogrow: true
    };

    return options;
}