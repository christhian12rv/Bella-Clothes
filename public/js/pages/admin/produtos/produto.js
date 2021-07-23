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

// Adicionar variação 1 do produto
$(".box-variacoes-produto").append(productVariation(1));
$("#preco-original-1").maskMoney({ prefix: 'R$ ', allowNegative: true, thousands: '.', decimal: ',', affixesStay: true });
$("#preco-parcela-1").maskMoney({ prefix: 'R$ ', allowNegative: true, thousands: '.', decimal: ',', affixesStay: true });
$("#juros-parcela-1").mask('##0,00%', { reverse: true });
productImagesChoose(1);

// Adicionar e Remover variações do produto
$("#quantidade-cores").on("input", function () {
    var qtdInput = parseInt(this.value);
    if (!qtdInput) {
        qtdInput = 0;
    }

    var qtdVariationsOpen = parseInt($(".details-variacao-produto").length);
    if (qtdVariationsOpen < qtdInput) {
        for (i = 1; i <= (qtdInput - qtdVariationsOpen); i++) {
            $(".box-variacoes-produto").append(productVariation(i + qtdVariationsOpen));
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

$(document).on('input', '.qtd-parcelas', function () {
    var thisId = $(this).attr("id").substr(13);
    console.log("this id " + thisId);
    var qtdInput = parseInt(this.value);
    if (!qtdInput) {
        qtdInput = 0;
    }

    if (qtdInput > 12) {
        $(this).val(12);
    }
    var qtdParcelasOpen = parseInt($(".parcela-box").length);
    if (qtdParcelasOpen < qtdInput) {
        for (i = 1; i <= (qtdInput - qtdParcelasOpen); i++) {
            if (parseInt($(".parcela-box").length) < 12) {
                $(".parcelas-group").append(parcela(i + qtdParcelasOpen));
                maskParcelas(thisId);
            }
        }
    } else if (qtdInput > 0) {
        for (i = qtdParcelasOpen; i >= qtdInput + 1; i--) {
            $("#parcela-box-" + i).remove();
        }
    }
})

$(document).on('input', '.qtd-parcelas', function () {
    var thisId = $(this).attr("id").substr(13);
    console.log("this id " + thisId);
    var qtdInput = parseInt(this.value);
    if (!qtdInput) {
        qtdInput = 0;
    }

    if (qtdInput > 12) {
        $(this).val(12);
    }
    var qtdParcelasOpen = parseInt($(".parcela-box").length);
    if (qtdParcelasOpen < qtdInput) {
        for (i = 1; i <= (qtdInput - qtdParcelasOpen); i++) {
            if (parseInt($(".parcela-box").length) < 12) {
                $(".parcelas-group").append(parcela(i + qtdParcelasOpen));
                maskParcelas(thisId);
            }
        }
    } else if (qtdInput > 0) {
        for (i = qtdParcelasOpen; i >= qtdInput + 1; i--) {
            $("#parcela-box-" + i).remove();
        }
    }
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
        '                            <th style="border-bottom-width: 1px;"><label for="cor-' + id + '">* Cor ' + id + '</label></th>' +
        '                            <th class="border-bottom-0"><label for="preco-original-' + id + '">* Preço original</label></th>' +
        '                        </tr>' +
        '                    </thead>' +
        '                    <tbody>' +
        '                        <tr>' +
        '                            <td class="d-flex flex-row flex-wrap border-top-0 border-right-0"' +
        '                                style="gap: .7rem;">' +
        '                                <i class="bi bi-plus btn-open-details-variacao-produto" id="btn-open-detail-cor-' + id + '"></i>' +
        '                                <i class="bi bi-dash btn-close-details-variacao-produto"' +
        '                                    id="btn-close-detail-cor-' + id + '"></i>' +
        '                                <input type="text" name="cor-' + id + '" id="cor-' + id + '" placeholder="* Nome da cor"' +
        '                                    class="flex-grow-1" required>' +
        '                            </td>' +
        '                            <td>' +
        '                                <input type="text" name="preco-original-' + id + '" id="preco-original-' + id + '" placeholder="* Preço"' +
        '                                    class="w-100 preco-original" style="min-width: 200px;" required>' +
        '                            </td>' +
        '                        </tr>' +
        '                        <tr class="details-variacao-produto" id="detail-variacao-' + id + '" style="display: none;">' +
        '                            <td colspan="2" class="m-0 p-0 w-100 border-top-0">' +
        '                                <table class="w-100 border-0">' +
        '                                    <tbody>' +
        '                                        <tr>' +
        '                                            <td><label for="tipo-desconto-' + id + '">Desconto</label></td>' +
        '                                            <td class="d-flex flex-row flex-wrap" style="gap: .5rem;">' +
        '                                                <select class="tipo-desconto" name="tipo-desconto-' + id + '" id="tipo-desconto-' + id + '">' +
        '                                                    <option value="">Tipo do desconto</option>' +
        '                                                    <option value="porcentagem">Porcentagem (%)</option>' +
        '                                                    <option value="bruto">Bruto (R$)</option>' +
        '                                                </select>' +
        '                                                <input type="text" name="desconto-' + id + '" id="desconto-' + id + '" placeholder="Desconto"' +
        '                                                    class="flex-grow-1 input-desconto" disabled="true">' +
        '                                            </td>' +
        '                                        </tr>' +
        '                                        <tr>' +
        '                                            <td><label for="qtd-parcelas-' + id + '">* Parcelas</label></td>' +
        '                                            <td class="d-flex flex-column flex-wrap parcelas-group" id="parcelas-group-' + id + '" style="gap: .5rem;">' +
        '                                               <input type="number" id="qtd-parcelas-' + id + '" name="qtd-parcelas-' + id + '" placeholder="* Quantidade de parcelas"' +
        '                                                   class="qtd-parcelas" value="1" onkeydown="return event.keyCode == 69 ? false : true" min="1" max="12" required></input>' +
        '                                                <div class="d-flex flex-row flex-wrap parcela-box" id="parcela-box-' + id + '" style="gap: .5rem;">' +
        '                                                    <select name="x-parcela-' + id + '" id="x-parcela-' + id + '" required>' +
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
        '                                                    <select name="escolher-juros-parcela-' + id + '" id="escolher-juros-parcela-' + id + '">' +
        '                                                        <option value="sem-juros">Sem juros</option>' +
        '                                                        <option value="com-juros">Com juros</option>' +
        '                                                    </select>' +
        '                                                    <input type="text" name="preco-parcela-' + id + '" id="preco-parcela-' + id + '"' +
        '                                                        placeholder="* R$ 00,00">' +
        '                                                    <input type="text" name="juros-parcela-' + id + '" id="juros-parcela-' + id + '"' +
        '                                                        placeholder="* Juros ao mês (%)">' +
        '                                                </div>' +
        '                                            </td>' +
        '                                        </tr>' +
        '                                        <tr>' +
        '                                            <td><label for="qtd-tamanhos-' + id + '">* Tamanhos / Estoque</label></td>' +
        '                                            <td class="d-flex flex-column flex-wrap" style="gap: .5rem;">' +
        '                                                <input type="number" name="qtd-tamanhos-' + id + '" id="qtd-tamanhos-' + id + '"' +
        '                                                    placeholder="* Quantidade de tamanhos"' +
        '                                                    onkeydown="return event.keyCode == 69 ? false : true">' +
        '                                                <div class="d-flex flex-row flex-wrap" style="gap: .5rem;">' +
        '                                                    <input type="text" name="tamanho-' + id + '" id="tamanho-' + id + '"' +
        '                                                        class="flex-grow-1" placeholder="* Tamanho 1">' +
        '                                                    <input type="number" name="estoque-' + id + '" id="estoque-' + id + '"' +
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
        '                                                        <div class="image-upload w-50">' +
        '                                                            <div class="image-select">' +
        '                                                                <div class="image-select-button" id="imageName">Escolher' +
        '                                                                    imagem</div>' +
        '                                                                <div class="image-select-name" id="noImage">0 Imagens' +
        '                                                                    selecionadas</div>' +
        '                                                                <input type="file" name="chooseImage" id="chooseImage">' +
        '                                                            </div>' +
        '                                                        </div>' +
        '                                                    </div>' +
        '                                                    <div class="d-flex flex-row flex-wrap images-choose">' +
        '                                                        <div class="box-image-product" draggable="true"' +
        '                                                            dataDragImg="bip-tenisTeste.jpg">' +
        '                                                            <input type="hidden" value="/img/tenisTeste.jpg" name="imagem-produto-' + id + '" id="imagem-produto-' + id + '">' +
        '                                                            <img src="/img/tenisTeste.jpg" alt="" class="imagem-produto"' +
        '                                                                dataDragImg="bip-tenisTeste.jpg">' +
        '                                                            <div class="remover-imagem remover-imagem-produto-' + id + '">' +
        '                                                                <a href="#"><i class="bi bi-x-lg"></i></a>' +
        '                                                            </div>' +
        '                                                        </div>' +
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

function parcela(id) {
    var parcela =
        '                                                <div class="d-flex flex-row flex-wrap parcela-box" id="parcela-box-' + id + '" style="gap: .5rem;">' +
        '                                                    <select name="x-parcela-' + id + '" id="x-parcela-' + id + '" required>' +
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
        '                                                    <select name="escolher-juros-parcela-' + id + '" id="escolher-juros-parcela-' + id + '">' +
        '                                                        <option value="sem-juros">Sem juros</option>' +
        '                                                        <option value="com-juros">Com juros</option>' +
        '                                                    </select>' +
        '                                                    <input type="text" name="preco-parcela-' + id + '" id="preco-parcela-' + id + '"' +
        '                                                        class="preco-parcela" placeholder="* R$ 00,00">' +
        '                                                    <input type="text" name="juros-parcela-' + id + '" id="juros-parcela-' + id + '"' +
        '                                                        class="juros-parcela" placeholder="* Juros ao mês (%)">' +
        '                                                </div>';

    return parcela;
}