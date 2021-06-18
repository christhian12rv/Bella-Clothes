$(".sidebar-toggle").on("click", () => {
    const sidebar = $(".main-sidebar");
    if (sidebar.hasClass("open")) {
        var widthNavbar = $(window).width() - 80;
        $(".main-navbar").animate({ width: widthNavbar + "px" }, 300);
        sidebar.removeClass("open");
    } else {
        var widthNavbar = $(window).width() - 233.188;
        $(".main-navbar").animate({ width: widthNavbar + "px" }, 300);
        sidebar.addClass("open");
    }
})

/* View in fullscreen */
$(".full-screen-toggle").on("click", () => {
    if ($(".full-screen-toggle").hasClass("open")) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }

        $(".full-screen-toggle").removeClass("open");
    } else {
        var elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }

        $(".full-screen-toggle").addClass("open");
    }
})


// Customize Page
$("#cp-dark-sidebar").prop("checked", true);
$(".main-sidebar").addClass("dark");

$("#cp-fixed-sidebar").on("click", function () {
    if ($(this).prop("checked")) {
        $(".main-sidebar").addClass("fixed");
    } else {
        $(".main-sidebar").removeClass("fixed");
    }

    if ($(".main-sidebar").hasClass("open")) {
        var widthNavbar = $(window).width() - 233.188;
        $(".main-navbar").css("width", widthNavbar + "px");
    } else {
        var widthNavbar = $(window).width() - 70;
        $(".main-navbar").css("width", widthNavbar + "px");
    }
})

$("#cp-dark-sidebar").on("click", function () {
    if ($(this).prop("checked")) {
        $(".main-sidebar").addClass("dark");
    } else {
        $(".main-sidebar").removeClass("dark");
    }
})

$("#cp-compact-sidebar").on("click", function () {
    if ($(this).prop("checked")) {
        $(".main-sidebar").addClass("compact");
    } else {
        $(".main-sidebar").removeClass("compact");
    }
})

$("#cp-small-text-sidebar").on("click", function () {
    if ($(this).prop("checked")) {
        $(".main-sidebar").addClass("small-text");
    } else {
        $(".main-sidebar").removeClass("small-text");
    }
})


$("#cp-fixed-navbar").on("click", function () {
    if ($(this).prop("checked")) {
        $(".main-navbar").addClass("fixed");
    }
    else {
        $(".main-navbar").removeClass("fixed");
    }

    if ($(".main-sidebar").hasClass("open")) {
        var widthNavbar = $(window).width() - 233.188;
        $(".main-navbar").css("width", widthNavbar + "px");
    } else {
        var widthNavbar = $(window).width() - 70;
        $(".main-navbar").css("width", widthNavbar + "px");
    }
})

$("#cp-dark-navbar").on("click", function () {
    if ($(this).prop("checked")) {
        $(".main-navbar").addClass("dark");
    } else {
        $(".main-navbar").removeClass("dark");
    }
})

$("#cp-border-bottom-navbar").on("click", function () {
    if ($(this).prop("checked")) {
        $(".main-navbar").addClass("no-border");
    } else {
        $(".main-navbar").removeClass("no-border");
    }
})

$(window).on("resize", function () {
    if ($(".main-sidebar").hasClass("open")) {
        var widthNavbar = $(window).width() - 233.188;
        $(".main-navbar").css("width", widthNavbar + "px");
    } else {
        var widthNavbar = $(window).width() - 80;
        $(".main-navbar").css("width", widthNavbar + "px");
    }
})