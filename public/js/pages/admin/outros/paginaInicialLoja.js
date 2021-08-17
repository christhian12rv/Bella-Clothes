$(".sidebar-link.outros").addClass("active").addClass("only");
$(".sidebar-link.pagina-inicial-loja").addClass("active");

$(".box-banners-iniciais").append(bannerInicial(1));

$("#quantidade_banners_iniciais").on("input", function () {
    var qtdInput = parseInt(this.value);
    if (!qtdInput) {
        qtdInput = 0;
    }

    var qtdVariationsOpen = parseInt($(".banner-inicial").length);
    if (qtdVariationsOpen < qtdInput) {
        for (i = 1; i <= (qtdInput - qtdVariationsOpen); i++) {
            $(".box-banners-iniciais").append(bannerInicial(i + qtdVariationsOpen));
        }
    } else if (qtdInput > 0) {
        for (i = qtdVariationsOpen; i >= qtdInput + 1; i--) {
            $("#banner-inicial-" + i).remove();
        }
    }
})

$(document).on("click", ".tipo_banner_inicial_texto", function () {
    if ($(this).parent("div").next(".tipo-banner-imagem")) {
        $(this).parent("div").next(".tipo-banner-imagem").remove();
        var banner = $(this).parent("div").parent(".banner-inicial");
        var idBannerInicial = banner.attr("id").substr(15);
        banner.append(bannerInicialTexto(idBannerInicial));
    }
})

$(document).on("click", ".tipo_banner_inicial_imagem", function () {
    console.log("hihi");
    if ($(this).parent("div").next(".tipo-banner-texto")) {
        $(this).parent("div").next(".tipo-banner-texto").remove();
        var banner = $(this).parent("div").parent(".banner-inicial");
        var idBannerInicial = banner.attr("id").substr(15);
        banner.append(bannerInicialImagem(idBannerInicial));
    }
})

$(document).on("click", ".tipo_banner_segundo_texto", function () {
    if ($(this).parent("div").next(".tipo-banner-imagem")) {
        $(this).parent("div").next(".tipo-banner-imagem").remove();
        var banner = $(this).parent("div").parent(".banner-segundo");
        banner.append(bannerSegundoTexto());
    }
})

$(document).on("click", ".tipo_banner_segundo_imagem", function () {
    console.log("hihi");
    if ($(this).parent("div").next(".tipo-banner-texto")) {
        $(this).parent("div").next(".tipo-banner-texto").remove();
        var banner = $(this).parent("div").parent(".banner-segundo");
        banner.append(bannerSegundoImagem());
    }
})

$(document).on("click", ".tipo_banner_quarto_texto", function () {
    if ($(this).parent("div").next(".tipo-banner-imagem")) {
        $(this).parent("div").next(".tipo-banner-imagem").remove();
        var banner = $(this).parent("div").parent(".banner-quarto");
        banner.append(bannerQuartoTexto());
    }
})

$(document).on("click", ".tipo_banner_quarto_imagem", function () {
    console.log("hihi");
    if ($(this).parent("div").next(".tipo-banner-texto")) {
        $(this).parent("div").next(".tipo-banner-texto").remove();
        var banner = $(this).parent("div").parent(".banner-quarto");
        banner.append(bannerQuartoImagem());
    }
})

$("input[type=file]").on("change", function () {
    if ($(this)[0].files.length >= 1)
        $(this).prev(".image-select-name").html($(this)[0].files[0].name);
})

/**************************************************** FUNÇÕES ****************************************************************** */

function bannerInicial(id) {
    var bannerInicial =
        '<div class="banner-inicial box-banner d-flex flex-column flex-wrap" id="banner-inicial-' + id + '">' +
        '    <h5>Banner ' + id + '</h5>' +
        '    <label for="tipo_banner_inicial_' + id + '">Tipo</label>' +
        '    <div class="d-flex flex-row flex-wrap">' +
        '        <input type="radio" name="tipo_banner_inicial_' + id + '" id="tipo_banner_inicial_' + id + '_texto" class="tipo_banner_inicial_texto" checked required>' +
        '        <label for="tipo_banner_inicial_' + id + '_texto" class="mr-3 ml-1">Texto</label>' +
        '        <input type="radio" name="tipo_banner_inicial_' + id + '" id="tipo_banner_inicial_' + id + '_imagem" class="tipo_banner_inicial_imagem" required>' +
        '        <label for="tipo_banner_inicial_' + id + '_imagem" class="ml-1">Imagem</label>' +
        '    </div>' +
        '    <div class="tipo-banner-texto">' +
        '       <label for="titulo_banner_inicial_' + id + '">Título</label>' +
        '       <input type="text" name="titulo_banner_inicial_' + id + '" id="titulo_banner_inicial_' + id + '" placeholder="Título"' +
        '           required>' +
        '       <label for="descricao_banner_inicial_' + id + '">Descrição</label>' +
        '       <textarea name="descricao_banner_inicial_' + id + '" id="descricao_banner_inicial_' + id + '" cols="30" rows="10"' +
        '           required></textarea>' +
        '       <label for="texto_botao_banner_inicial_' + id + '">Botão</label>' +
        '       <input type="text" name="texto_botao_banner_inicial_' + id + '" name="texto_botao_banner_inicial_' + id + '"' +
        '           placeholder="Texto do botão" class="mb-2">' +
        '       <input type="url" name="link_botao_banner_inicial_' + id + '" id="link_botao_banner_inicial_' + id + '"' +
        '           placeholder="Link do botão" class="mb-2">' +
        '       <label for="imagem_banner_inicial_' + id + '">Imagem</label>' +
        '       <div class="image-upload">' +
        '           <div class="image-select">' +
        '               <div class="image-select-button" id="imageName">Escolher' +
        '                   imagem</div>' +
        '               <div class="image-select-name">Escolha uma imagem</div>' +
        '               <input type="file" class="escolher-imagem" id="imagem_banner_inicial_' + id + '" name="imagem_banner_inicial_' + id + '">' +
        '           </div>' +
        '       </div>' +
        '    </div>'
    '</div>';
    return bannerInicial;
}

function bannerInicialTexto(id) {
    var bannerInicialTexto =
        '    <div class="tipo-banner-texto">' +
        '       <label for="titulo_banner_inicial_' + id + '">Título</label>' +
        '       <input type="text" name="titulo_banner_inicial_' + id + '" id="titulo_banner_inicial_' + id + '" placeholder="Título"' +
        '           required>' +
        '       <label for="descricao_banner_inicial_' + id + '">Descrição</label>' +
        '       <textarea name="descricao_banner_inicial_' + id + '" id="descricao_banner_inicial_' + id + '" cols="30" rows="10"' +
        '           required></textarea>' +
        '       <label for="texto_botao_banner_inicial_' + id + '">Botão</label>' +
        '       <input type="text" name="texto_botao_banner_inicial_' + id + '" name="texto_botao_banner_inicial_' + id + '"' +
        '           placeholder="Texto do botão" class="mb-2">' +
        '       <input type="url" name="link_botao_banner_inicial_' + id + '" id="link_botao_banner_inicial_' + id + '"' +
        '           placeholder="Link do botão" class="mb-2">' +
        '       <label for="imagem_banner_inicial_' + id + '">Imagem</label>' +
        '       <div class="image-upload">' +
        '           <div class="image-select">' +
        '               <div class="image-select-button" id="imageName">Escolher' +
        '                   imagem</div>' +
        '               <div class="image-select-name">Escolha uma imagem</div>' +
        '               <input type="file" class="escolher-imagem" id="imagem_banner_inicial_' + id + '" name="imagem_banner_inicial_' + id + '">' +
        '           </div>' +
        '       </div>' +
        '   </div>';
    return bannerInicialTexto;
}

function bannerInicialImagem(id) {
    var bannerInicialImagem =
        '   <div class="tipo-banner-imagem">' +
        '       <label for="imagem_banner_inicial_' + id + '">Imagem</label>' +
        '       <div class="image-upload">' +
        '           <div class="image-select">' +
        '               <div class="image-select-button" id="imageName">Escolher' +
        '                   imagem</div>' +
        '               <div class="image-select-name">Escolha uma imagem</div>' +
        '               <input type="file" class="escolher-imagem" id="imagem_banner_inicial_' + id + '" name="imagem_banner_inicial_' + id + '">' +
        '           </div>' +
        '       </div>' +
        '       <label for="link_imagem_banner_inicial_' + id + '">Link</label>' +
        '       <input type="url" name="link_imagem_banner_inicial_' + id + '" id="link_imagem_banner_inicial_' + id + '"' +
        '           placeholder="Link da imagem" class="mb-2">' +
        '   </div>';
    return bannerInicialImagem;
}

function bannerSegundoTexto() {
    var bannerSegundoTexto =
        '    <div class="tipo-banner-texto">' +
        '       <label for="titulo_banner_segundo">Título</label>' +
        '       <input type="text" name="titulo_banner_segundo" id="titulo_banner_segundo" placeholder="Título"' +
        '           required>' +
        '       <label for="descricao_banner_segundo">Descrição</label>' +
        '       <textarea name="descricao_banner_segundo" id="descricao_banner_segundo" cols="30" rows="10"' +
        '           required></textarea>' +
        '       <label for="texto_botao_banner_segundo">Botão</label>' +
        '       <input type="text" name="texto_botao_banner_segundo" name="texto_botao_banner_segundo"' +
        '           placeholder="Texto do botão" class="mb-2">' +
        '       <input type="url" name="link_botao_banner_segundo" id="link_botao_banner_segundo"' +
        '           placeholder="Link do botão" class="mb-2">' +
        '       <label for="imagem_banner_segundo">Imagem</label>' +
        '       <div class="image-upload">' +
        '           <div class="image-select">' +
        '               <div class="image-select-button" id="imageName">Escolher' +
        '                   imagem</div>' +
        '               <div class="image-select-name">Escolha uma imagem</div>' +
        '               <input type="file" class="escolher-imagem" id="imagem_banner_segundo" name="imagem_banner_segundo">' +
        '           </div>' +
        '       </div>' +
        '   </div>';
    return bannerSegundoTexto;
}

function bannerSegundoImagem() {
    var bannerSegundoImagem =
        '   <div class="tipo-banner-imagem">' +
        '       <label for="imagem_banner_segundo">Imagem</label>' +
        '       <div class="image-upload">' +
        '           <div class="image-select">' +
        '               <div class="image-select-button" id="imageName">Escolher' +
        '                   imagem</div>' +
        '               <div class="image-select-name">Escolha uma imagem</div>' +
        '               <input type="file" class="escolher-imagem" id="imagem_banner_segundo" name="imagem_banner_segundo">' +
        '           </div>' +
        '       </div>' +
        '       <label for="link_imagem_banner_segundo">Link</label>' +
        '       <input type="url" name="link_imagem_banner_segundo" id="link_imagem_banner_segundo"' +
        '           placeholder="Link da imagem" class="mb-2">' +
        '   </div>';
    return bannerSegundoImagem;
}

function bannerQuartoTexto() {
    var bannerQuartoTexto =
        '    <div class="tipo-banner-texto">' +
        '       <label for="titulo_banner_quarto">Título</label>' +
        '       <input type="text" name="titulo_banner_quarto" id="titulo_banner_quarto" placeholder="Título"' +
        '           required>' +
        '       <label for="descricao_banner_quarto">Descrição</label>' +
        '       <textarea name="descricao_banner_quarto" id="descricao_banner_quarto" cols="30" rows="10"' +
        '           required></textarea>' +
        '       <label for="texto_botao_banner_quarto">Botão</label>' +
        '       <input type="text" name="texto_botao_banner_quarto" name="texto_botao_banner_quarto"' +
        '           placeholder="Texto do botão" class="mb-2">' +
        '       <input type="url" name="link_botao_banner_quarto" id="link_botao_banner_quarto"' +
        '           placeholder="Link do botão" class="mb-2">' +
        '       <label for="imagem_banner_quarto">Imagem</label>' +
        '       <div class="image-upload">' +
        '           <div class="image-select">' +
        '               <div class="image-select-button" id="imageName">Escolher' +
        '                   imagem</div>' +
        '               <div class="image-select-name">Escolha uma imagem</div>' +
        '               <input type="file" class="escolher-imagem" id="imagem_banner_quarto" name="imagem_banner_quarto">' +
        '           </div>' +
        '       </div>' +
        '   </div>';
    return bannerQuartoTexto;
}

function bannerQuartoImagem() {
    var bannerQuartoImagem =
        '   <div class="tipo-banner-imagem">' +
        '       <label for="imagem_banner_quarto">Imagem</label>' +
        '       <div class="image-upload">' +
        '           <div class="image-select">' +
        '               <div class="image-select-button" id="imageName">Escolher' +
        '                   imagem</div>' +
        '               <div class="image-select-name">Escolha uma imagem</div>' +
        '               <input type="file" class="escolher-imagem" id="imagem_banner_quarto" name="imagem_banner_quarto">' +
        '           </div>' +
        '       </div>' +
        '       <label for="link_imagem_banner_quarto">Link</label>' +
        '       <input type="url" name="link_imagem_banner_quarto" id="link_imagem_banner_quarto"' +
        '           placeholder="Link da imagem" class="mb-2">' +
        '   </div>';
    return bannerQuartoImagem;
}