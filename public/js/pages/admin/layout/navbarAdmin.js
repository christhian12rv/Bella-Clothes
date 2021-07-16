var sheet = window.document.styleSheets[0];
var sidebarCloseWidth = $(".main-sidebar").width();
$(".main-sidebar").addClass("open");
var sidebarOpenWidth;
setTimeout(() => {
    sidebarOpenWidth = $(".main-sidebar").width();
    sheet.insertRule('.main-sidebar.fixed { max-width: ' + sidebarOpenWidth + 'px !important;}', sheet.cssRules.length);
    sheet.insertRule('.main-sidebar.fixed~div>.main-navbar { margin-left: ' + sidebarCloseWidth + 'px !important;}', sheet.cssRules.length);
    sheet.insertRule('.main-sidebar.fixed.open~div>.main-navbar { margin-left: ' + sidebarOpenWidth + 'px !important;}', sheet.cssRules.length);
    sheet.insertRule('.main-sidebar.fixed~div>.admin-content { margin-left: ' + sidebarCloseWidth + 'px !important;}', sheet.cssRules.length);
    sheet.insertRule('.main-sidebar.fixed.open~div>.admin-content { margin-left: ' + sidebarOpenWidth + 'px !important;}', sheet.cssRules.length);
    sheet.insertRule('.main-sidebar.fixed~div>.admin-footer { margin-left: ' + sidebarCloseWidth + 'px !important;}', sheet.cssRules.length);
    sheet.insertRule('.main-sidebar.fixed.open~div>.admin-footer { margin-left: ' + sidebarOpenWidth + 'px !important;}', sheet.cssRules.length);
    var sidebarOpenOnLargeWindowResize = true;
    if (window.matchMedia('screen and (max-width: 768px)').matches) {
        $(".main-sidebar").removeClass("open");
        sidebarOpenOnLargeWindowResize = false;
    } else {
    }
}, 1001);


document.documentElement.style.setProperty('--sidebar-image', 'url(/img/admin-sidebar/wood.jpg) no-repeat');
document.documentElement.style.setProperty('--sidebar-background-opacity', '0.8');


// Rediomensionamento da Tela
$(window).on("resize", function () {
    const customizePage = $(".customize-page");
    if (window.matchMedia('screen and (max-width: 768px)').matches) {
        if ($(".main-sidebar").hasClass("open")) {
            $(".main-navbar").css("width", "100%");
            $(".modal-background").css("display", "block");
        }
        if (sidebarOpenOnLargeWindowResize) {
            $(".main-sidebar").removeClass("open");
            sidebarOpenOnLargeWindowResize = false;
        }
        if (customizePage.children("#fixed-sidebar").children(".switch").children("#cp-fixed-sidebar").prop("checked")) {
            customizePage.children("#fixed-sidebar").children(".switch").children("#cp-fixed-sidebar").trigger("click");
        }
    } else {
        if ($(".main-navbar").hasClass("fixed")) {
            var widthNavbar = $(window).width() - sidebarOpenWidth;
            $(".main-navbar").css("width", widthNavbar + "px");
        }
        if (!sidebarOpenOnLargeWindowResize) {
            $(".main-sidebar").addClass("open");
            sidebarOpenOnLargeWindowResize = true;
        }
        $(".modal-background").css("display", "none");
    }
})

$("body").on("click", function (event) {
    target = $(event.target);

    // Animação do Link "Todas as Categorias" do Dropdown Menu
    if (!target.closest(".flex-search").length && $(".flex-search").is(":visible")) {
        $(".flex-search").removeClass("open");
        setTimeout(() => {
            $(".flex-search .search-box .search").css("padding", "0px");
            $(".flex-search i.bi-search").css("padding-left", "0px");
        }, 500);
    }
})

// Abrir e Fechar Sidebar
var sidebarFullHeight = $(".main-sidebar").outerHeight();
$(".sidebar-toggle").on("click", () => {
    const sidebar = $(".main-sidebar");
    if (window.matchMedia('screen and (max-width: 768px)').matches) {
        if (sidebar.hasClass("open")) {
            sidebar.removeClass("open");
        } else {
            sidebar.addClass("open");
            $(".modal-background").css("display", "block");
        }
    } else {
        if (sidebar.hasClass("open")) {
            sidebar.removeClass("open");
            if ($(".main-navbar").hasClass("fixed") || $(".main-sidebar").hasClass("fixed")) {
                $(".main-navbar").animate({ width: ($(window).width() - sidebarCloseWidth) + "px" }, 300)
            }
            if ($(".admin-footer").hasClass("fixed") || $(".main-sidebar").hasClass("fixed")) {
                sheet.insertRule('.admin-footer { width: ' + ($(window).width() - sidebarCloseWidth) + 'px !important;}', sheet.cssRules.length);
            }
        } else {
            sidebar.addClass("open");
            if ($(".main-navbar").hasClass("fixed") || $(".main-sidebar").hasClass("fixed")) {
                $(".main-navbar").animate({ width: ($(window).width() - sidebarOpenWidth) + "px" }, 300)
            }
            if ($(".admin-footer").hasClass("fixed") || $(".main-sidebar").hasClass("fixed")) {
                sheet.insertRule('.admin-footer { width: ' + ($(window).width() - sidebarOpenWidth) + 'px !important;}', sheet.cssRules.length);
            }
        }
    }

    subListResize();
})

$(".modal-background").on("click", function () {
    if ($(".main-sidebar").hasClass("open")) {
        $(".main-sidebar").removeClass("open");
        $(this).css("display", "none");
    }
})

// Botão Search da Navbar
$(".search-icon").on("click", function () {
    if (!$(".flex-search").hasClass("open")) {
        $(".flex-search .search-box .search").css("padding", ".25rem .5rem .25rem .5rem");
        $(".flex-search i.bi-search").animate({ paddingLeft: "1rem" }, 300);
        $(".flex-search .search-box .search").focus();
        $(".flex-search").addClass("open");
    } else
        $("#search-form").submit();
})

// Botão FullScreen da Navbar
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

$(".customize-toggle").on("click", () => {
    if ($(".customize-page").hasClass("open")) {
        $(".customize-page").removeClass("open");
    } else {
        $(".customize-page").addClass("open");
    }
})


/******************************** CUSTOMIZAR PÁGINA *************************************************** */

// Customizar Sidebar
// Sidebar Escura checada
$("#cp-dark-sidebar").prop("checked", true);
$(".main-sidebar").addClass("dark");

// Sidebar Fixa
$("#cp-fixed-sidebar").on("click", function () {
    if ($(this).prop("checked")) {
        $(".main-sidebar").addClass("fixed");
    } else {
        $(".main-sidebar").removeClass("fixed");
    }

    if ($(".main-sidebar").hasClass("open")) {
        var widthNavbar = $(window).width() - sidebarOpenWidth;
        $(".main-navbar").css("width", widthNavbar + "px");
        var widthFooter = $(window).width() - sidebarOpenWidth;
        sheet.insertRule('.admin-footer { width: ' + widthFooter + 'px !important;}', sheet.cssRules.length);
    } else {
        var widthNavbar = $(window).width() - sidebarCloseWidth;
        $(".main-navbar").css("width", widthNavbar + "px");
        var widthFooter = $(window).width() - sidebarCloseWidth;
        sheet.insertRule('.admin-footer { width: ' + widthFooter + 'px !important;}', sheet.cssRules.length);
    }
})

// Sidebar Escura
$("#cp-dark-sidebar").on("click", function () {
    if ($(this).prop("checked")) {
        $(".main-sidebar").addClass("dark");
        document.documentElement.style.setProperty('--sidebar-color-mode-rgb', '0,0,0');
    } else {
        $(".main-sidebar").removeClass("dark");
        document.documentElement.style.setProperty('--sidebar-color-mode-rgb', '248,249,250');
    }
})

// Sidebar Compacta
$("#cp-compact-sidebar").on("click", function () {
    if ($(this).prop("checked")) {
        $(".main-sidebar").addClass("compact");
    } else {
        $(".main-sidebar").removeClass("compact");
    }
    subListResize();
})

// Sidebar com Texto Pequeno
$("#cp-small-text-sidebar").on("click", function () {
    if ($(this).prop("checked")) {
        $(".main-sidebar").addClass("small-text");
    } else {
        $(".main-sidebar").removeClass("small-text");
    }
    subListResize();
})


//Customizar Navbar
//Navbar Fixa
$("#cp-fixed-navbar").on("click", function () {
    if ($(this).prop("checked")) {
        $(".main-navbar").addClass("fixed");
        $(".customize-page").addClass("fixed");
    }
    else {
        $(".main-navbar").removeClass("fixed");
        $(".customize-page").removeClass("fixed");
    }

    if (window.matchMedia('screen and (min-width: 769px)').matches) {
        if ($(".main-sidebar").hasClass("open")) {
            var widthNavbar = $(window).width() - sidebarOpenWidth;
            $(".main-navbar").css("width", widthNavbar + "px");
        } else {
            var widthNavbar = $(window).width() - sidebarCloseWidth;
            $(".main-navbar").css("width", widthNavbar + "px");
        }
    }
})

//Navbar Escura
$("#cp-dark-navbar").on("click", function () {
    if ($(this).prop("checked")) {
        $(".main-navbar").addClass("dark");
        $(".customize-page").addClass("dark");
    } else {
        $(".main-navbar").removeClass("dark");
        $(".customize-page").removeClass("dark");
    }
})

//Navbar Sem Borda
$("#cp-border-bottom-navbar").on("click", function () {
    if ($(this).prop("checked")) {
        $(".main-navbar").addClass("no-border");
    } else {
        $(".main-navbar").removeClass("no-border");
    }
})

//Customizar Content
//Content Escuro
$("#cp-dark-content").on("click", function () {
    if ($(this).prop("checked")) {
        $(".admin-content").addClass("dark");
        $(".card.color-mode").each(function () {
            $(this).addClass("dark");
        })
    } else {
        $(".admin-content").removeClass("dark");
        $(".card.color-mode").each(function () {
            $(this).removeClass("dark");
        })
    }
})

//Customizar Footer
//Footer Fixo
$("#cp-fixed-footer").on("click", function () {
    if ($(this).prop("checked")) {
        $(".admin-footer").addClass("fixed");
    }
    else {
        $(".admin-footer").removeClass("fixed");
    }

    if (window.matchMedia('screen and (min-width: 769px)').matches) {
        if ($(".main-sidebar").hasClass("open")) {
            var widthNavbar = $(window).width() - sidebarOpenWidth;
            $(".admin-footer").css("width", widthNavbar + "px");
        } else {
            var widthNavbar = $(window).width() - sidebarCloseWidth;
            $(".admin-footer").css("width", widthNavbar + "px");
        }
    }
})

//Footer Escuro
$("#cp-dark-footer").on("click", function () {
    if ($(this).prop("checked")) {
        $(".admin-footer").addClass("dark");
    } else {
        $(".admin-footer").removeClass("dark");
    }
})

//Footer Sem Borda
$("#cp-border-top-footer").on("click", function () {
    if ($(this).prop("checked")) {
        $(".admin-footer").addClass("no-border");
    } else {
        $(".admin-footer").removeClass("no-border");
    }
})


/******************************** FUNÇÕES ***************************************/7

// Redimensionar os Sub List da Sidebar
function subListResize() {
    $(".flex-list.open .main-title").each(function () {
        setTimeout(() => {
            var subListHeight = 0;
            var parentList = $(this).parent(".flex-list");

            parentList.children(".sub-list").children(".sub-title").each(function () {
                subListHeight += $(this).outerHeight();
            })
            subListHeight += 6;
            console.log(subListHeight);
            $(this).parent(".flex-list").children(".sub-list").css("height", subListHeight + "px");
        }, 300);
    })
}