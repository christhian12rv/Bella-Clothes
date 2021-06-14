var minValuePreco = parseInt($("#slider-preco").attr("data-min-value"));
var maxValuePreco = parseInt($("#slider-preco").attr("data-max-value"));
var actualMinValuePreco = minValuePreco;
var actualMaxValuePreco = maxValuePreco;

var actualMinValueDesconto = 0;
var actualMaxValueDesconto = 100;

jQuery(document).ready(function ($) {

	// Input Slider Preço

	$("#slider-preco").rangeSlider({
		type: "interval"
	}, {
		min: minValuePreco,
		max: maxValuePreco,
		step: 1,
		values: [minValuePreco, maxValuePreco]
	});

	$("#slider-preco-inputMin").val(minValuePreco);
	$("#slider-preco-inputMax").val(maxValuePreco);

	$("#slider-preco").rangeSlider("onChange", function (event) {
		$("#slider-preco-inputMin").val(event.detail.values[0]);
		$("#slider-preco-inputMax").val(event.detail.values[1]);
		actualMinValuePreco = event.detail.values[0];
		actualMaxValuePreco = event.detail.values[1];
	});

	var inputPrecoMinValue = "";
	var inputPrecoMaxValue = "";

	$("#slider-preco-inputMin").on("change", function () {
		inputPrecoMinValue = $(this).val();
		$("#slider-preco").rangeSlider(
			{},
			{
				values: [inputPrecoMinValue, actualMaxValuePreco]
			});
	});

	$("#slider-preco-inputMax").on("change", function () {
		inputPrecoMaxValue = $(this).val();
		$("#slider-preco").rangeSlider(
			{},
			{
				values: [actualMinValuePreco, inputPrecoMaxValue]
			});
	})


	// Input Slider Desconto
	$("#slider-desconto").rangeSlider({
		type: "interval"
	}, {
		min: 0,
		max: 100,
		step: 1,
		values: [0, 100]
	})

	$("#slider-desconto-inputMin").val(0);
	$("#slider-desconto-inputMax").val(100);

	$("#slider-desconto").rangeSlider("onChange", function (event) {
		$("#slider-desconto-inputMin").val(event.detail.values[0]);
		$("#slider-desconto-inputMax").val(event.detail.values[1]);
		actualMinValueDesconto = event.detail.values[0];
		actualMaxValueDesconto = event.detail.values[1];
	})

	var inputDescontoMinValue = "";
	var inputDescontoMaxValue = "";

	$("#slider-desconto-inputMin").on("change", function () {
		inputDescontoMinValue = $(this).val();
		$("#slider-desconto").rangeSlider(
			{},
			{
				values: [inputDescontoMinValue, actualMaxValueDesconto]
			});
	});

	$("#slider-desconto-inputMax").on("change", function () {
		inputDescontoMaxValue = $(this).val();
		$("#slider-desconto").rangeSlider(
			{},
			{
				values: [actualMinValueDesconto, inputDescontoMaxValue]
			});
	})



	//open/close lateral filter
	$('.cd-filter-trigger').on('click', function () {
		triggerFilter(true);
	});
	$('.cd-filter .cd-close').on('click', function () {
		triggerFilter(false);
	});

	function triggerFilter($bool) {
		var elementsToTrigger = $([$('.cd-filter-trigger'), $('.cd-filter'), $('.cd-tab-filter'), $('.cd-gallery')]);
		elementsToTrigger.each(function () {
			$(this).toggleClass('filter-is-visible', $bool);
		});
	}

	// Fechar todos os filtere tabs
	$(".cd-filter-block h4").each(function () {
		$(this).addClass("closed");
		$(this).next().css("display", "none");
	})
	// Abrir apenas o filter tab pesquisar
	$(".cd-filter-block.pesquisar h4").removeClass("closed");
	$(".cd-filter-block.pesquisar h4").next().css("display", "block");

	$(".cd-filter-block .cd-filter-content").each(function () {
		if ($(this).height() >= 110) {
			$(this).css("overflow-y", "scroll");
		}
	})

	$(".cd-filter-block.cd-ft-preco .cd-filter-content").css("overflow", "hidden");
	$(".cd-filter-block.cd-ft-preco .cd-filter-content").css("max-height", "100%");
	$(".cd-filter-block.cd-ft-desconto .cd-filter-content").css("overflow", "hidden");
	$(".cd-filter-block.cd-ft-desconto .cd-filter-content").css("max-height", "100%");


	//mobile version - detect click event on filters tab
	var filter_tab_placeholder = $('.cd-tab-filter .placeholder a'),
		filter_tab_placeholder_default_value = 'Select',
		filter_tab_placeholder_text = filter_tab_placeholder.text();

	$('.cd-tab-filter li').on('click', function (event) {
		//detect which tab filter item was selected
		var selected_filter = $(event.target).data('type');

		//check if user has clicked the placeholder item
		if ($(event.target).is(filter_tab_placeholder)) {
			(filter_tab_placeholder_default_value == filter_tab_placeholder.text()) ? filter_tab_placeholder.text(filter_tab_placeholder_text) : filter_tab_placeholder.text(filter_tab_placeholder_default_value);
			$('.cd-tab-filter').toggleClass('is-open');

			//check if user has clicked a filter already selected 
		} else if (filter_tab_placeholder.data('type') == selected_filter) {
			filter_tab_placeholder.text($(event.target).text());
			$('.cd-tab-filter').removeClass('is-open');

		} else {
			//close the dropdown and change placeholder text/data-type value
			$('.cd-tab-filter').removeClass('is-open');
			filter_tab_placeholder.text($(event.target).text()).data('type', selected_filter);
			filter_tab_placeholder_text = $(event.target).text();

			//add class selected to the selected filter item
			$('.cd-tab-filter .selected').removeClass('selected');
			$(event.target).addClass('selected');
		}
	});

	//close filter dropdown inside lateral .cd-filter 
	$('.cd-filter-block h4').on('click', function () {
		$(this).toggleClass('closed').siblings('.cd-filter-content').slideToggle(300);
	})

	//fix lateral filter and gallery on scrolling
	$(window).on('scroll', function () {
		(!window.requestAnimationFrame) ? fixGallery() : window.requestAnimationFrame(fixGallery);
	});

	function fixGallery() {
		var offsetTop = $('.cd-main-content').offset().top,
			scrollTop = $(window).scrollTop();
		(scrollTop >= offsetTop) ? $('.cd-main-content').addClass('is-fixed') : $('.cd-main-content').removeClass('is-fixed');
	}

	/************************************
		MitItUp filter settings
		More details: 
		https://mixitup.kunkalabs.com/
		or:
		http://codepen.io/patrickkunka/
	*************************************/

	buttonFilter.init();
	$('.cd-gallery ul').mixItUp({
		controls: {
			enable: false
		},
		callbacks: {
			onMixStart: function () {
				$('.cd-fail-message').fadeOut(200);
			},
			onMixFail: function () {
				$('.cd-fail-message').fadeIn(200);
			}
		}
	});

	//search filtering
	//credits http://codepen.io/edprats/pen/pzAdg
	var inputText;
	var $matching = $();

	var delay = (function () {
		var timer = 0;
		return function (callback, ms) {
			clearTimeout(timer);
			timer = setTimeout(callback, ms);
		};
	})();

	$(".cd-filter-content input[type='search']").keyup(function () {
		// Delay function invoked to make sure user stopped typing
		delay(function () {
			inputText = $(".cd-filter-content input[type='search']").val().toLowerCase();
			// Check to see if input field is empty
			if ((inputText.length) > 0) {
				$('.mix').each(function () {
					var $this = $(this);

					// add item to be filtered out if input text matches items inside the title   
					if ($this.attr('class').toLowerCase().match(inputText)) {
						$matching = $matching.add(this);
					} else {
						// removes any previously matched item
						$matching = $matching.not(this);
					}
				});
				$('.cd-gallery ul').mixItUp('filter', $matching);
			} else {
				// resets the filter to show all item if input is empty
				$('.cd-gallery ul').mixItUp('filter', 'all');
			}
		}, 200);
	});
});

/*****************************************************
	MixItUp - Define a single object literal 
	to contain all filter custom functionality
*****************************************************/
var buttonFilter = {
	// Declare any variables we will need as properties of the object
	$filters: null,
	groups: [],
	outputArray: [],
	outputString: '',

	// The "init" method will run on document ready and cache any jQuery objects we will need.
	init: function () {
		var self = this; // As a best practice, in each method we will asign "this" to the variable "self" so that it remains scope-agnostic. We will use it to refer to the parent "buttonFilter" object so that we can share methods and properties between all parts of the object.

		self.$filters = $('.cd-main-content');
		self.$container = $('.cd-gallery ul');

		self.$filters.find('.cd-filters').each(function () {
			var $this = $(this);

			self.groups.push({
				$inputs: $this.find('.filter'),
				active: '',
				tracker: false
			});
		});

		self.bindHandlers();
	},

	// The "bindHandlers" method will listen for whenever a button is clicked. 
	bindHandlers: function () {
		var self = this;

		self.$filters.on('click', 'a', function (e) {
			self.parseFilters();

		});
		self.$filters.on('change', function () {
			self.parseFilters();


		});
	},

	parseFilters: function () {
		var self = this;

		// loop through each filter group and grap the active filter from each one.
		for (var i = 0, group; group = self.groups[i]; i++) {
			group.active = [];
			group.$inputs.each(function () {
				var $this = $(this);
				if ($this.is('input[type="radio"]') || $this.is('input[type="checkbox"]')) {
					if ($this.is(':checked')) {
						group.active.push($this.attr('data-filter'));

						var isFiltered = false;
						$(".cd-filter-selected").each(function () {
							if ($(this).html().split(" <i", 1)[0] == $this.next().html()) {
								isFiltered = true;
							}
						})

						if (!isFiltered) {
							$(".cd-filter-selected-filters .cd-clean-all").prev().after('<h5 class="cd-filter-selected" id="' + $this.attr("id").substr(9) + '">' + $this.next().html() + ' <i class="bi bi-x-lg"></i></h5>');
						}
						if ($this.hasClass("category")) {
							var category = $this.attr("class").substr(20);
							$(".sub-" + category).each(function () {
								$(this).attr("disabled", true);
								$(this).prop("checked", false);
							})

						}

					} else {
						var isFiltered = false;
						$(".cd-filter-selected").each(function () {
							if ($(this).html().split(" <i", 1)[0] == $this.next().html()) {
								isFiltered = true;
							}
						})
						if (isFiltered) {
							$(".cd-filter-selected#" + $this.attr("id").substr(9)).remove();
						}

						if ($this.hasClass("category")) {
							var category = $this.attr("class").substr(20);
							$(".sub-" + category).each(function () {

								$(this).attr("disabled", false);

							})

						}
					}

				} else if ($this.is('select')) {
					group.active.push($this.val());

					var isFiltered = false;
					$(".cd-filter-selected").each(function () {
						if ($(this).html().split(" <i", 1)[0] == $this.val()) {
							isFiltered = true;
						}
					})
					if (!isFiltered && $this.val() != "escolha") {
						$(".cd-filter-selected-filters .cd-clean-all").prev().after('<h5 class="cd-filter-selected">' + $this.val() + ' <i class="bi bi-x-lg"></i></h5>');
					}
				} else if ($this.find('.selected').length > 0) {
					group.active.push($this.attr('data-filter'));
				}

			});

		}
		self.concatenate();

		// Filters Quantity
		var quantityFilters = $('.cd-filter-selected-filters .cd-filter-selected').length;
		$(".cd-qty-filters-selected").html('Filtros Selecionados(' + quantityFilters + ')');

		// Show and Hide Div Filters
		if (quantityFilters <= 0) {
			$(".cd-filter-selected-filters").css("display", "none");
		} else {
			$(".cd-filter-selected-filters").css("display", "block");
		}
	},

	concatenate: function () {
		var self = this;

		self.outputString = ''; // Reset output string

		for (var i = 0, group; group = self.groups[i]; i++) {
			self.outputString += group.active;
		}

		// If the output string is empty, show all rather than none:    
		!self.outputString.length && (self.outputString = 'all');

		// Send the output string to MixItUp via the 'filter' method:    
		if (self.$container.mixItUp('isLoaded')) {
			self.$container.mixItUp('filter', self.outputString);
		}
	}
};

$(document.body).on("click", ".cd-filter-selected", function (event) {
	var filtro = event.target;
	if ($(filtro).attr("class") == "bi bi-x-lg") {
		$(filtro).parent().remove();
		var inputId = $(filtro).parent().attr("id");
	} else {
		$(filtro).remove();
		var inputId = $(filtro).attr("id");
	}

	$("input#checkbox-" + inputId).prop("checked", false);

	verifyQuantityFilters();
});

$(document.body).on("click", ".cd-clean-all", function () {
	$(".cd-filter-selected").each(function () {
		$(this).remove();
	})

	verifyQuantityFilters();

	$("input.filter").each(function () {
		$(this).prop("checked", false);
	})
});

var precoInput = "";
$(document.body).on("click", ".btn-filtrar-preco", function () {

	$("#preco-" + precoInput).remove();
	precoInput = actualMinValuePreco + '-' + actualMaxValuePreco;

	$(".cd-filter-selected-filters .cd-clean-all").prev().after('<h5 class="cd-filter-selected" id="preco-' + precoInput + '"> R$ ' + actualMinValuePreco + ' - ' + actualMaxValuePreco + '<i class="bi bi-x-lg"></i></h5>');

	verifyQuantityFilters();

})

var descontoInput = "";
$(document.body).on("click", ".btn-filtrar-desconto", function () {

	$("#desconto-" + descontoInput).remove();
	descontoInput = actualMinValueDesconto + '-' + actualMaxValueDesconto;

	$(".cd-filter-selected-filters .cd-clean-all").prev().after('<h5 class="cd-filter-selected" id="desconto-' + descontoInput + '"> Desconto ' + actualMinValueDesconto + ' - ' + actualMaxValueDesconto + '% <i class="bi bi-x-lg"></i></h5>');
	console.log(descontoInput);

	verifyQuantityFilters();
})


function verifyQuantityFilters() {
	var quantityFilters = $('.cd-filter-selected-filters .cd-filter-selected').length;
	$(".cd-qty-filters-selected").html('Filtros Selecionados(' + quantityFilters + ')');

	// Show and Hide Div Filters
	if (quantityFilters <= 0) {
		$(".cd-filter-selected-filters").css("display", "none");
	} else {
		$(".cd-filter-selected-filters").css("display", "block");
	}
}