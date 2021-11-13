$(".sidebar-link.produtos").addClass("active").addClass("only");
$(".sidebar-link.ver-produtos").addClass("active");

$('#materiais').tagsinput({
    tagClass: 'input-tag',
    trimValue: true,
    minChars: 2
});
$('#materiais').on('beforeItemAdd', function (event) {
    if (event.item.length < 2)
        event.cancel = true;
});

$('#composicao').tagsinput({
    tagClass: 'input-tag',
    trimValue: true,
    minChars: 2
});
$('#composicao').on('beforeItemAdd', function (event) {
    if (event.item.length < 2)
        event.cancel = true;
});

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

$("#categoria").on("change", function () {
    let select = $(this);
    let value = select.val();
    let selectSubcategoria = $("#subcategoria");

    if (value !== "") {
        $.ajax({
            type: 'GET',
            url: '/api/subcategorias-by-categoria/' + value
        }).then(function (data) {
            let options = "<option value='' selected>* Escolha uma subcategoria</option>";
            data.subcategorias.forEach((subcategoria) => {
                options += "<option value='" + subcategoria._id + "'>" + subcategoria.nome + "</option>";
            })
            selectSubcategoria.html(options);
            selectSubcategoria.prop("disabled", false);
        }).fail(function () {
            window.location.href = "/admin/erro-500";
        })
    } else {
        selectSubcategoria.html("<option value='' selected>* Escolha uma subcategoria</option>");
        selectSubcategoria.prop("disabled", true);
    }
})

if ($("#cp-dark-content").prop("checked")) {
    $("#descricao_introducao").parent().addClass("trumbowyg-dark");
}
$('#descricao_introducao').trumbowyg(trumbowygOptions());
$('#descricao_recursos').trumbowyg(trumbowygOptions());


// Adicionar variação 1 do produto
async function initProductVariation() {
    await $(".box-variacoes-produto").append(await productVariation(0, 1));
    $("input[id='variacao[0][preco_original]']").maskMoney({ prefix: 'R$ ', allowNegative: true, thousands: '.', decimal: ',', affixesStay: true });
    $("input[id='variacao[0][parcela_box][0][preco_parcela]']").maskMoney({ prefix: 'R$ ', allowNegative: true, thousands: '.', decimal: ',', affixesStay: true });
    $("input[id='variacao[0][parcela_box][0][juros_parcela]']").mask('##0,00%', { reverse: true });
    adicionarImagem(0);
}

initProductVariation();

// Adicionar e Remover variações do produto
$("#quantidade_cores").on("input", async function () {
    var qtdInput = parseInt(this.value);
    if (!qtdInput) {
        qtdInput = 0;
    }

    var qtdVariationsOpen = parseInt($(".details-variacao-produto").length);
    if (qtdVariationsOpen < qtdInput) {
        for (i = 1; i <= (qtdInput - qtdVariationsOpen); i++) {
            await $(".box-variacoes-produto").append(await productVariation(qtdVariationsOpen, qtdVariationsOpen + 1));
            masksInputsOfNewVariation(qtdVariationsOpen);
            adicionarImagem(qtdVariationsOpen);
        }
    } else if (qtdInput > 0) {
        for (i = qtdVariationsOpen - 1; i >= qtdInput; i--) {
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


$(document).on('input', '.qtd-parcelas', async function (index) {
    var idVariacao = $(this).attr("id").match(/\[(-?\d+)\]/)[1];

    var qtdInput = parseInt(this.value);
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
            await $("#parcelas-group-" + idVariacao).append(await parcela(idVariacao, qtdParcelasOpen));
        }
    } else if (qtdInput > 0) {
        for (i = qtdParcelasOpen - 1; i >= qtdInput; i--) {
            $("div[id='variacao[" + idVariacao + "][parcela_box][" + i + "]']").remove();
        }
    }

    maskParcelas(idVariacao);
})


$(document).on('input', '.qtd-tamanhos', async function () {
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
            await $("#tamanhos-group-" + idVariacao).append(await tamanho(idVariacao, qtdTamanhosOpen));
        }
    } else if (qtdInput > 0) {
        for (i = qtdTamanhosOpen - 1; i >= qtdInput; i--) {
            $("div[id='variacao[" + idVariacao + "][tamanho_box][" + i + "]']").remove();
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
    $("input[id='variacao[" + id + "][parcela_box][0][preco_parcela]']").maskMoney({ prefix: 'R$ ', allowNegative: true, thousands: '.', decimal: ',', affixesStay: true });
    $("input[id='variacao[" + id + "][parcela_box][0][juros_parcela]']").mask('##0,00%', { reverse: true });
}

function maskParcelas(idVariacao) {
    $("#parcelas-group-" + idVariacao + " .parcela-box").each(function () {
        $(this).children(".preco-parcela").maskMoney({ prefix: 'R$ ', allowNegative: true, thousands: '.', decimal: ',', affixesStay: true });
        $(this).children(".juros-parcela").mask('##0,00%', { reverse: true });
    })
}

async function productVariation(id, idPlusOne) {
    return await $.ajax({
        url: "/getTemplate",
        method: "POST",
        data: {
            template: 'produto/variacao-cor',
            id: id,
            idPlusOne: idPlusOne
        },
        success: function (data) {
            return data;
        },
        fail: function () {
            return window.location.href = "/admin/erro-500";
        }
    })
}

async function parcela(idVariacao, idParcela) {
    return await $.ajax({
        url: "/getTemplate",
        method: "POST",
        data: {
            template: 'produto/parcela-variacao-cor',
            idVariacao: idVariacao,
            idParcela: idParcela
        },
        success: function (data) {
            return data;
        },
        fail: function () {
            return window.location.href = "/admin/erro-500";
        }
    })
}

async function tamanho(idVariacao, idTamanho) {
    return await $.ajax({
        url: "/getTemplate",
        method: "POST",
        data: {
            template: 'produto/tamanho-variacao-cor',
            idVariacao: idVariacao,
            idTamanho: idTamanho
        },
        success: function (data) {
            console.log(data)
            return data;
        },
        fail: function () {
            return window.location.href = "/admin/erro-500";
        }
    })
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
    inputImagem.setAttribute("accept", ".png, .jpg, .jpeg");
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
        '        <option value="Menino">Menino</option>' +
        '        <option value="Menina">Menina</option>' +
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

const regexExpSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/g;
function validateSlug(input) {
    if (!regexExpSlug.test(input.value)) {
        input.setCustomValidity("Digite um slug válido");
    } else {
        input.setCustomValidity("");
    }
}