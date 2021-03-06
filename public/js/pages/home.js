$(document).ready(function () {

    // Carrossel primeiro banner da página
    $('.owl-headBanner').owlCarousel({
        mouseDrag: false,
        autoplay: true,
        smartSpeed: 500,
        margin: 0,
        loop: true,
        items: 1,
        dots: true,
        animateOut: 'fadeOut'
    });

    // Carrossel PRODUTOS MAIS VENDIDOS
    $('.owl-pMaisVendidos').owlCarousel({
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


    // Carrossel LANÇAMENTOS
    $('.owl-lancamentos').owlCarousel({
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


    // CARROSSEL Na Bella CLothes também tem
    $('.owl-tambemTem').owlCarousel({
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
                items: 4,
                nav: true,
            },
            1000: {
                items: 6,
                nav: true
            }
        }
    });


    // Carrossel Melhores Descontos
    $('.owl-mDescontos').owlCarousel({
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
        let toastId = $(".toast-container .toast").length + 1;
        let textoMsgToast;
        if (hasFavorited)
            textoMsgToast = 'Produto adicionado aos favoritos';
        else
            textoMsgToast = 'Produto retirado dos favoritos';
        $.ajax({
            url: "/getToast",
            method: "POST",
            data: {
                type: 'success',
                text: textoMsgToast,
                autoHide: true,
                autoHideDelay: 4000,
                toastId: toastId
            }
        }).done(function (data) {
            $(".toast-container").append(data);
            $("#toast-" + toastId).toast("show");
        })
    })
});