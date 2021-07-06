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