$(window).on("load", function () {
    $(".ajuda-container .ajuda-categorias button").on("click", function () {
        if (!$(this).hasClass("active")) {
            var tabActive = $(".ajuda-container .ajuda-perguntas.active");
            var tab = $(".ajuda-container .ajuda-perguntas#" + $(this).attr("data-tab"));

            tabActive.animate({ opacity: 0 }, 300);
            $(".ajuda-container .ajuda-categorias button.active").removeClass("active");
            setTimeout(() => {
                tabActive.removeClass("active");
                tab.css("opacity", "0");
                tab.addClass("active");
                tab.animate({ opacity: 1 }, 300);
                $(this).addClass("active");
            }, 300);
        }
    })

    $(".ajuda-container .ajuda-perguntas .question").on("click", function () {
        var answer = $(this).next(".answer");
        var boxQuestion = $(this).parent(".box-question");


        $(".box-question.active .answer").not(answer).css("height", "0px");
        $(".box-question.active").not(boxQuestion).removeClass("active");

        boxQuestion.toggleClass("active");

        if (boxQuestion.hasClass("active"))
            answer.css("height", answer[0].scrollHeight + "px");
        else
            answer.css("height", "0px");
    })

    var pageQuery = new URLSearchParams(window.location.search);
    var pageQueryAjuda = pageQuery.get("ajuda");
    var tabAjuda = $(".ajuda-perguntas#" + pageQueryAjuda);

    if (tabAjuda.length > 0) {
        $("#link-" + pageQueryAjuda).addClass("active");
        tabAjuda.addClass("active");
    } else {
        $("#link-trocas-e-devolucoes").addClass("active");
        $(".ajuda-perguntas#trocas-e-devolucoes").addClass("active");
    }
})