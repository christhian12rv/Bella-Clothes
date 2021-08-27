$(window).on("load", function () {
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

    // Carrossel dos Produtos da Seção Final da Página
    $(".owl-ProductsSectionEnd").owlCarousel({
        mouseDrag: true,
        autoplay: true,
        smartSpeed: 500,
        margin: 0,
        loop: true,
        dots: false,
        responsive: {
            0: {
                items: 2,
                margin: 0,
                nav: false,
            },
            600: {
                items: 3,
                nav: true,
            },
            1000: {
                items: 4,
                nav: true
            }
        }
    });

    $(".product-info").on("mouseenter", function () {
        var carousel = $(this).parent().parent().parent().parent();
        carousel.trigger('stop.owl.autoplay');
        var contentsHeight = parseInt($(this).children('.contents').outerHeight());
        $(this).css("height", contentsHeight + "px");
    })
    $(".product-info").on("mouseleave", function () {
        var carousel = $(this).parent().parent().parent().parent();
        carousel.trigger('play.owl.autoplay');
        $(this).css("height", "50px");
    })

    $(".item .product-add-favorite").on("click", function () {
        $(this).toggleClass("favorited");
        let hasFavorited = $(this).hasClass("favorited");
        let toastsCountNextId = $(".toast-container .toast").length + 1;
        let textoMsgToast;
        if (hasFavorited)
            textoMsgToast = 'Produto adicionado aos favoritos';
        else
            textoMsgToast = 'Produto retirado aos favoritos';

        $.ajax({
            url: "/mensagemDinamica",
            method: "GET",
            data: {
                tipoMsg: 'success',
                textoMsg: textoMsgToast,
                autoHideMsg: true,
                toastId: toastsCountNextId
            }
        }).done(function (data) {
            toastCreated = $(".toast-container").append(data);
            $("#toast-" + toastsCountNextId).toast("show");
        })
    })
})