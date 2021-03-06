$(window).on("load", function () {

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
    })

    $(".search-posts-icon").on("click", function () {
        $("#search-blog-form").submit();
    })

    $(".tabs .tabs-menu input[type=radio]").first().prop("checked", true);
    $(".tabs .tab").first().css("display", "flex");

    $(".tabs input[type=radio]").on("click", function () {
        var tabId = $(this).attr("id");
        $(".tabs input[type=radio]:not(:checked)").each(function () {
            var notCheckedTabId = $(this).attr("id");
            $("div[data-tab=" + notCheckedTabId + "]").css("display", "none");
        })

        var tab = $("div[data-tab=" + tabId + "]");
        if (tab.css("display") == "none") {
            tab.css("display", "flex");
        }
    })
})