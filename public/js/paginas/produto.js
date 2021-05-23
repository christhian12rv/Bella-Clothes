// Mlens na Foto Principal do Produto
$(document).ready(function () {
    $("#imagemProdutoPrincipal").mlens({
        imgSrc: $("#imagemProdutoPrincipal").attr("data-big"),
        lensShape: "circle",
        borderSize: 1,
        lensSize: ["27%", "35%"],
        imgOverlay: $("#imagemProdutoPrincipal").attr("data-overlay"),
        overlayAdapt: true,
        responsive: true,
        zoomLevel: 0.6
    });

    // Carrossel das fotos do Produto
    $(".ps-slider").owlCarousel({
        loop: false,
        margin: 10,
        nav: true,
        items: 3,
        dots: false,
        navText: ['<i class="bi bi-chevron-left"></i>', '<i class="bi bi-chevron-right"></i>'],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: false
    });

    // Trocar a foto do produto clicada para a Foto Principal
    $('.product-thumbs-track .pt').on('click', function () {

        $('.product-thumbs-track .pt').removeClass('active');
        $(this).addClass('active');
        var dataBig = $(this).data('big');
        var imgurl = $(this).data('imgbigurl');
        var bigImg = $('.product-big-img').attr('src');
        if (imgurl != bigImg) {
            $('.product-big-img').attr({ src: imgurl });
            $('.product-big-img').attr('data-big', dataBig);
            $('.zoomImg').attr({ src: imgurl });
            $("#mlens_target_0").css('background-image', 'url("' + dataBig + '")');
            $('#mlens_target_0').next().attr('src', dataBig);
        }
    });

    // Exibir borda na cor selecionada
    $('.cc-item').on("click", function () {
        $('.cc-item').removeClass("active");
        $(this).addClass("active");
    })

    // Trocar cor da caixa do tamanho selecionado
    $(".fw-size-choose .sc-item label, .pd-size-choose .sc-item label").on('click', function () {
        $(".fw-size-choose .sc-item label, .pd-size-choose .sc-item label").removeClass('active');
        $(this).addClass('active');
    });

    // Trocar quantidade do Produto
    var proQty = $('.pro-qty');
    proQty.prepend('<span class="dec qtybtn">-</span>');
    proQty.append('<span class="inc qtybtn">+</span>');
    proQty.on('click', '.qtybtn', function () {
        var $button = $(this);
        var oldValue = $button.parent().find('input').val();
        if ($button.hasClass('inc')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 1) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                var newVal = parseFloat(oldValue);
            }
        }
        $button.parent().find('input').val(newVal);
    });

    const ratingStars = [...document.getElementsByClassName("star-your-rating")];

    function executeRating(stars) {
        const starClassActive = "star-your-rating bi bi-star-fill";
        const starClassInactive = "star-your-rating bi bi-star";
        const starsLength = stars.length;
        let i;
        stars.map((star) => {
            star.onclick = () => {
                i = stars.indexOf(star);

                if (star.className === starClassInactive) {
                    for (i; i >= 0; --i) stars[i].className = starClassActive;
                } else {
                    for (i; i < starsLength; ++i) stars[i].className = starClassInactive;
                }
                $('#avaliacaoComentario').val([...document.getElementsByClassName("star-your-rating bi bi-star-fill")].length);
            };

        });

    }
    executeRating(ratingStars);

    var checado = true;
    $("#acc-create").on("click", function () {
        checado = !checado;
        $("#acc-create").attr('checked', checado);
    })
});