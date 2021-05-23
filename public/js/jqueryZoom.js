$(function(){
	var element = $('[zoom]')[0];
	
	var guid = function () {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
			  .toString(16)
			  .substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		  s4() + '-' + s4() + s4() + s4();
	};

	var id = guid();

	var cardImg = $(element);

	var imgWidth = 0;
	var imgHeight = 0;
	var actualLeft = 0;
	var actualTop = 0;

	var setZoom = function () {

		/////// Image-Zoom ////////

		var lenWidth = 160;
		var lenHeight = 160;
		var lenRadius = 32;
		var lenOpacity = 1;
		var xAdjust = 16; // Element and mouse position are not exactly aligned.

		//  Remove any existing components
		
		
		// Get actual size before creating magnifier (len)
		$("<img/>")
			.attr("src", cardImg.attr("src"))
			.load(function () {

				$('.zoom-mouse-catcher-' + id).remove();
				$('.zoom-len-' + id).remove();

				w = cardImg.width();
				h = cardImg.height();

				actualWidth = this.width;
				actualHeight = this.height;
				actualLeft = parseInt(cardImg.position().left);
				actualTop = parseInt(cardImg.position().top);

				// Get original image source to share with magnifier
				var imgSource = cardImg.attr("src");

				// Get original click binding to copy on mouse catcher
				var originalClick = cardImg.attr('ng-click');

				// Creating a mouse position catcher on topmost

				var mouseCatcher = $("<div />")
					.attr('class', 'zoom-mouse-catcher-' + id)
					.css({
						'opacity': '0',
						'width': w,
						'height': h,
						'position': 'absolute',
						'left': actualLeft + 'px',
						'top': actualTop + 'px'
					});

				
				// Creating the magnifier under the mouse position catcher
				var len = $("<div />")
					.attr('class', 'zoom-len-' + id)
					.css({
						'display': 'none',
						'opacity': lenOpacity,
						'width': lenWidth + 'px',
						'height': lenHeight + 'px',
						'position': 'absolute',
						'left': actualLeft,
						'top': actualTop,
						'margin-left': -lenWidth / 2 + 'px',
						'margin-top': -lenHeight / 2 + 'px',
						'box-shadow': 'inset 0 2px 4px rgba(0, 0, 0, 0.25)',
						'border-radius': lenRadius + 'px',
						'background': 'url(' + imgSource + ') no-repeat',
						'background-size': actualWidth + 'px ' + actualHeight + 'px',
					})
					.insertAfter(cardImg);

				mouseCatcher.insertAfter(len);

				mouseCatcher.click(function (e) {
					//scope.$eval(originalClick);
					//scope.$apply();
				});

				mouseCatcher.mouseleave(function (e) {
					len.css('display', 'none');
				});

				mouseCatcher.mouseenter(function (e) {
					len.css('display', '');
				});

				mouseCatcher.mousemove(function (e) {

					var parentOffset = $(this).parent().offset();
					imgWidth = cardImg.width();
					imgHeight = cardImg.height();
					actualLeft = $(element).position().left;
					actualTop = $(element).position().top;
					
					setMouseCatcher();

					// Mouse cursor relative to image
					var x = e.pageX - cardImg.offset().left;
					var y = e.pageY - cardImg.offset().top;

					// Mouse cursor in term of ratio [0-1].
					var ratioX = (x / imgWidth);
					var ratioY = (y / imgHeight);

					// Background position to subtract to show proper part of the original image
					var offsetX = (ratioX * actualWidth) - lenWidth / 2;
					var offsetY = (ratioY * actualHeight) - lenHeight / 2;

					var position = -offsetX + 'px ' + -offsetY + 'px';
					len.css('background-position', position);
					len.css('left', actualLeft + e.offsetX);
					len.css('top', actualTop + e.offsetY);
				});
			});
	}

	var setMouseCatcher = function () {
		var mouseCatcher = $('.zoom-mouse-catcher-' + id);
		mouseCatcher.width(imgWidth);
		mouseCatcher.height(imgHeight);
		mouseCatcher.css('left', actualLeft + 'px');
		mouseCatcher.css('top', actualTop + 'px');
	}

	var watchResize = $(window).resize(function ($event) {
		imgWidth = cardImg.width();
		imgHeight = cardImg.height();
		actualLeft = parseInt($(element).position().left);
		actualTop = parseInt($(element).position().top);
		setMouseCatcher();
	});

	var observer = new MutationObserver(function (mutations) {
		actualLeft = $(element).position().left;
		actualTop = $(element).position().top;
		$timeout(function () { setMouseCatcher(); }, 0);
		setZoom(); // NOT SURE
	});
	
	var config = { subtree: true, childList: true };
	observer.observe($(element).get(0), config);
	
	setZoom();
});