$(document).ready(function () {

    // Carrossel primeiro banner da página
    $('.owl-headBanner').owlCarousel({
        mouseDrag: true,
        autoplay: true,
        smartSpeed: 500,
        margin: 0,
        loop: true,
        items: 1,
        dots: true
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
                items: 4,
                margin: 0,
                nav: false,
            },
            600: {
                items: 5,
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
});