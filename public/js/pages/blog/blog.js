$(document).ready(function () {

    // Carrossel primeiro banner da página
    $('.owl-headBanner').owlCarousel({
        mouseDrag: false,
        autoplay: false,
        smartSpeed: 500,
        margin: 0,
        loop: true,
        items: 1,
        dots: true,
        animateOut: 'fadeOut'
    })
})