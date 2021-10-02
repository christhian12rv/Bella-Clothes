$(window).on("load", function () {
    $(".filter-tab .filter-tab-block h4").on("click", function () {
        let filterBlock = $(this).parent(".filter-tab-block");
        let content = $(this).next(".filter-tab-block-content");
        if (filterBlock.hasClass("show")) {
            filterBlock.removeClass("show");
            content.removeClass("overflow-show");
        } else {
            content.addClass("overflow-show");
            filterBlock.addClass("show");
        }

    })

    var minPrice = 0;
    var maxPrice = 1000;
    var minDiscount = 0;
    var maxDiscount = 100;

    $("#price_slider").ionRangeSlider(rangeSliderPriceOptions(minPrice, maxPrice));
    $("#discount_slider").ionRangeSlider(rangeSliderDiscountOptions(minDiscount, maxDiscount));

    const priceSliderInstance = $("#price_slider").data("ionRangeSlider");
    const discountSliderInstance = $("#discount_slider").data("ionRangeSlider");

    $("#min-price").on("input", function () {
        let val = $(this).val();
        if (val < minPrice)
            val = minPrice;
        else if (val > maxPrice)
            val = maxPrice;
        priceSliderInstance.update({
            from: val
        });
    });
    $("#max-price").on("input", function () {
        let val = $(this).val();
        if (val < minPrice)
            val = minPrice;
        else if (val > maxPrice)
            val = maxPrice;
        priceSliderInstance.update({
            to: val
        });
    });

    $("#min-discount").on("input", function () {
        let val = $(this).val();
        if (val < minDiscount)
            val = minDiscount;
        else if (val > maxDiscount)
            val = maxDiscount;
        discountSliderInstance.update({
            from: val
        });
    });
    $("#max-discount").on("input", function () {
        let val = $(this).val();
        if (val < minDiscount)
            val = minDiscount;
        else if (val > maxDiscount)
            val = maxDiscount;
        discountSliderInstance.update({
            to: val
        });
    });


    $("input[type=checkbox]").on("change", function () {
        let inputId = $(this).attr("id");
        let check = $(this).prop("checked");
        let labelText = $(this).next("label").html();

        if (check) {
            addFilterSelected(inputId, labelText);
        } else {
            $(".filter-tab .selected-filters-box .selected-filters .filter-selected#filter_" + inputId).remove();
        }

        checkFiltersSelecteds();
    })

    $(document).on("click", ".filter-tab .selected-filters-box .selected-filters .filter-selected", function () {
        let dataFilterIdInput = $("#" + $(this).attr("data-filter-id"));

        $(this).remove();
        if (dataFilterIdInput.attr("type") === "checkbox")
            dataFilterIdInput.prop("checked", false);
        else if (dataFilterIdInput.attr("type") === "text")
            dataFilterIdInput.val("");

        checkFiltersSelecteds();
    })

    $("#products-search-filter").on("change", function () {
        let inputId = $(this).attr("id");
        let inputText = $(this).val();
        let filterInput = $("#filter_" + inputId);
        if (filterInput[0]) {
            filterInput.children("p").html(inputText);
            if (filterInput.children("p").html() == "")
                filterInput.remove();
        } else {
            addFilterSelected(inputId, inputText);
        }

        checkFiltersSelecteds();
    })

    $("#filter-button-price").on("click", function () {
        let minInput = $("input#min-price").val();
        let maxInput = $("input#max-price").val();
        let filterInput = $("#filter_price");
        let inputsText;
        if (minInput === maxInput)
            inputsText = minInput;
        else
            inputsText = "Preço: R$ " + minInput + " - " + maxInput;

        if (filterInput[0])
            filterInput.children("p").html(inputsText);
        else
            addFilterSelected("price", inputsText);

        checkFiltersSelecteds();
    })

    $("#filter-button-discount").on("click", function () {
        let minInput = $("input#min-discount").val();
        let maxInput = $("input#max-discount").val();
        let filterInput = $("#filter_discount");
        let inputsText;
        if (minInput === maxInput)
            inputsText = minInput;
        else
            inputsText = "Desconto: " + minInput + " - " + maxInput + "%";

        if (filterInput[0])
            filterInput.children("p").html(inputsText);
        else
            addFilterSelected("discount", inputsText);

        checkFiltersSelecteds();
    })

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
        if (hasFavorited) {
            $.ajax({
                url: "/mensagemDinamica",
                method: "GET",
                data: {
                    tipoMsg: 'success',
                    textoMsg: 'Produto adicionado aos favoritos',
                    autoHideMsg: true,
                    toastId: toastsCountNextId
                }
            }).done(function (data) {
                let toastCreated = $(".toast-container").append(data);
                $("#toast-" + toastsCountNextId).toast("show");
            })
        } else {
            $.ajax({
                url: "/mensagemDinamica",
                method: "GET",
                data: {
                    tipoMsg: 'success',
                    textoMsg: 'Produto retirado dos favoritos',
                    autoHideMsg: true,
                    toastId: toastsCountNextId
                }
            }).done(function (data) {
                let toastCreated = $(".toast-container").append(data);
                $("#toast-" + toastsCountNextId).toast("show");
            })
        }
    })

    $("#products-cards-pagination").pagination({
        dataSource: [1, 2, 3, 4, 5, 6, 7, 195, 1, 2, 3, 4, 5, 6, 7, 195, 1, 2, 3, 4, 5, 6, 7, 195, 1, 2, 3, 4, 5, 6, 7, 195, 1, 2, 3, 4, 5, 6, 7, 195, 1, 2, 3, 4, 5, 6, 7, 195, 1, 2, 3, 4, 5, 6, 7, 195],
        pageSize: 3,
        prevText: "<i class='bi bi-chevron-left mr-1'></i>Anterior",
        nextText: "Próximo<i class='bi bi-chevron-right ml-1'></i>",
        callback: function (data, pagination) {
            // template method of yourself
            var html = data;
            $('#teste').html(html);
        }
    })

})





function rangeSliderPriceOptions(min, max) {
    let options = {
        type: "double",
        grid: true,
        min: min,
        max: max,
        from: min,
        to: max,
        step: 1,
        prettify_enabled: true,
        prettify_separator: ".",
        decorate_both: false,
        grid: true,
        grid_num: 1,
        drag_interval: true,
        prefix: "R$ ",
        skin: "square",
        onStart: function (data) {
            $("#min-price").val(data.from);
            $("#max-price").val(data.to);
        },
        onChange: function (data) {
            $("#min-price").val(data.from);
            $("#max-price").val(data.to);
        }
    };
    return options;
}

function rangeSliderDiscountOptions(min, max) {
    let options = {
        type: "double",
        grid: true,
        min: min,
        max: max,
        from: min,
        to: max,
        step: 1,
        decorate_both: false,
        grid: true,
        grid_num: 1,
        drag_interval: true,
        postfix: "%",
        skin: "square",
        onStart: function (data) {
            $("#min-discount").val(data.from);
            $("#max-discount").val(data.to);
        },
        onChange: function (data) {
            $("#min-discount").val(data.from);
            $("#max-discount").val(data.to);
        }
    };
    return options;
}

function addFilterSelected(id, text) {
    let filterSelected =
        '<div class="filter-selected" id="filter_' + id + '" data-filter-id="' + id + '">' +
        '   <p>' + text + '</p>' +
        '   <i class="bi bi-x-lg"></i>' +
        '</div>';

    $(".filter-tab .selected-filters-box .selected-filters").append(filterSelected);
}

function checkFiltersSelecteds() {
    let count = $(".filter-tab .selected-filters-box .selected-filters .filter-selected").length;

    if (count >= 1) {
        $(".filter-tab .selected-filters-box .count-filters-selected").html("FILTROS SELECIONADOS (" + count + ")");
        $(".filter-tab .selected-filters-box").show();
    } else {
        $(".filter-tab .selected-filters-box").hide();
    }
}

function cleanAllFilters() {
    $(".filter-tab .filter-tab-block .filter-tab-block-content .item-checkbox input[type=checkbox]").each(function () {
        $(this).prop("checked", false);
    })

    $(".filter-tab .selected-filters-box .selected-filters").html("");
    checkFiltersSelecteds();
}

function filterTabToggle() {
    $(".filter-tab").toggleClass("show");
    $(".navbar-filter-loja").toggleClass("show");
}

$('.filter-tab').parents().filter(function () {
    return $(this).css('overflow') === 'hidden';
});