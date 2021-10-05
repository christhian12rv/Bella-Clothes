/* get localStorages */
var localStorageCustomizePage = {
    'sidebar': {
        'fixed': localStorage.getItem('fixedSidebar') ? JSON.parse(localStorage.getItem('fixedSidebar')) : false,
        'dark': localStorage.getItem('darkSidebar') ? JSON.parse(localStorage.getItem('darkSidebar')) : true,
        'compact': localStorage.getItem('compactSidebar') ? JSON.parse(localStorage.getItem('compactSidebar')) : false,
        'small-text': localStorage.getItem('smallTextSidebar') ? JSON.parse(localStorage.getItem('smallTextSidebar')) : false
    },
    'navbar': {
        'fixed': localStorage.getItem('fixedNavbar') ? JSON.parse(localStorage.getItem('fixedNavbar')) : false,
        'dark': localStorage.getItem('darkNavbar') ? JSON.parse(localStorage.getItem('darkNavbar')) : false,
        'border-bottom': localStorage.getItem('noBorderBottomNavbar') ? JSON.parse(localStorage.getItem('noBorderBottomNavbar')) : false
    },
    'content': {
        'dark': localStorage.getItem('darkContent') ? JSON.parse(localStorage.getItem('darkContent')) : false,
    },
    'footer': {
        'fixed': localStorage.getItem('fixedFooter') ? JSON.parse(localStorage.getItem('fixedFooter')) : false,
        'dark': localStorage.getItem('darkFooter') ? JSON.parse(localStorage.getItem('darkFooter')) : false,
        'border-top': localStorage.getItem('noBorderBottomFooter') ? JSON.parse(localStorage.getItem('noBorderBottomFooter')) : false
    }
};


$(window).on("load", function () {
    const customizePage = $(".customize-page");
    if (window.matchMedia('screen and (max-width: 768px)').matches)
        $(".main-sidebar").removeClass("open");

    // Verificar se a sidebar está aberta ou fechada no local storage
    var sidebarOpen = localStorage.getItem('sidebarOpen') ? JSON.parse(localStorage.getItem('sidebarOpen')) : true;
    if (!sidebarOpen)
        $(".main-sidebar").removeClass("open");

    // sidebar

    Object.entries(localStorageCustomizePage).forEach(([mainKey, mainValue]) => {
        var obj = localStorageCustomizePage[mainKey];
        Object.entries(obj).forEach(([key, value]) => {
            if (value) {
                $("#cp-" + key + "-" + mainKey).trigger("click");
                $("#cp-" + key + "-" + mainKey).prop("checked", "true");
            }
        })
    })

    document.documentElement.style.setProperty('--footer-height', $(".admin-footer").outerHeight() + "px");
})
/* var lsFixedSidebar = localStorage.getItem('fixedSidebar');
var lsDarkSidebar = localStorage.getItem('darkSidebar');
var lsCompactSidebar = localStorage.getItem('compactSidebar');
var lsSmallTextSidebar = localStorage.getItem('smallTextSidebar');

var lsFixedNavbar = localStorage.getItem('fixedNavbar');
var lsDarkNavbar = localStorage.getItem('darkNavbar');
var lsBorderBottomNavbar = localStorage.getItem('borderBottomNavbar');

var lsDarkContent = localStorage.getItem('darkContent');

var lsFixedFooter = localStorage.getItem('fixedFooter');
var lsDarkFooter = localStorage.getItem('darkFooter');
var lsBorderBottomFooter = localStorage.getItem('borderBottomFooter'); */

/*-------------------*/


// Rediomensionamento da Tela
$(window).on("resize", function () {
    const customizePage = $(".customize-page");
    if (window.matchMedia('screen and (max-width: 768px)').matches) {
        if ($(".main-sidebar").hasClass("open")) {
            $(".modal-background").css("display", "block");
        }
        if (customizePage.children("#fixed-sidebar").children(".switch").children("#cp-fixed-sidebar").prop("checked")) {
            customizePage.children("#fixed-sidebar").children(".switch").children("#cp-fixed-sidebar").trigger("click");
        }
    } else {
        $(".modal-background").css("display", "none");
    }

    document.documentElement.style.setProperty('--footer-height', $(".admin-footer").outerHeight() + "px");
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
$(".sidebar-toggle").on("click", () => {
    const sidebar = $(".main-sidebar");
    var isOpenSidebar = sidebar.hasClass("open");
    if (isOpenSidebar) {
        sidebar.removeClass("open");
    } else {
        sidebar.addClass("open");
        if (window.matchMedia('screen and (max-width: 768px)').matches)
            $(".modal-background").css("display", "block");
    }

    subListResize();

    footerHeight = $(".admin-footer").outerHeight();
    $(".admin-content").css("height", "calc(100% - " + (52 + footerHeight) + "px)");

    localStorage.setItem('sidebarOpen', !isOpenSidebar);
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

// Sidebar Fixa
$("#cp-fixed-sidebar").on("click", function () {
    var isFixedSidebar = $(this).prop("checked");
    if (isFixedSidebar) {
        $(".main-sidebar").addClass("fixed");
    } else {
        $(".main-sidebar").removeClass("fixed");
    }

    localStorage.setItem('fixedSidebar', isFixedSidebar);
})

// Sidebar Escura
$("#cp-dark-sidebar").on("click", function () {
    var isDarkSidebar = $(this).prop("checked");
    if (isDarkSidebar) {
        $(".main-sidebar").addClass("dark");
        document.documentElement.style.setProperty('--sidebar-color-mode-rgb', '0,0,0');
    } else {
        $(".main-sidebar").removeClass("dark");
        document.documentElement.style.setProperty('--sidebar-color-mode-rgb', '248,249,250');
    }

    localStorage.setItem('darkSidebar', isDarkSidebar);
})

// Sidebar Compacta
$("#cp-compact-sidebar").on("click", function () {
    var isCompactSidebar = $(this).prop("checked");
    if (isCompactSidebar) {
        $(".main-sidebar").addClass("compact");
    } else {
        $(".main-sidebar").removeClass("compact");
    }
    subListResize();

    localStorage.setItem('compactSidebar', isCompactSidebar);
})

// Sidebar com Texto Pequeno
$("#cp-small-text-sidebar").on("click", function () {
    var isSmallTextSidebar = $(this).prop("checked");
    if (isSmallTextSidebar) {
        $(".main-sidebar").addClass("small-text");
    } else {
        $(".main-sidebar").removeClass("small-text");
    }
    subListResize();

    localStorage.setItem('smallTextSidebar', isSmallTextSidebar);
})


//Customizar Navbar
//Navbar Fixa
$("#cp-fixed-navbar").on("click", function () {
    var isFixedNavbar = $(this).prop("checked");
    if (isFixedNavbar) {
        $(".main-navbar").addClass("fixed");
        $(".customize-page").addClass("fixed");
    }
    else {
        $(".main-navbar").removeClass("fixed");
        $(".customize-page").removeClass("fixed");
    }

    localStorage.setItem('fixedNavbar', isFixedNavbar);
})

//Navbar Escura
$("#cp-dark-navbar").on("click", function () {
    var isDarkNavbar = $(this).prop("checked");

    if (isDarkNavbar) {
        $(".main-navbar").addClass("dark");
        $(".customize-page").addClass("dark");
    } else {
        $(".main-navbar").removeClass("dark");
        $(".customize-page").removeClass("dark");
    }

    localStorage.setItem('darkNavbar', isDarkNavbar);
})

//Navbar Sem Borda
$("#cp-border-bottom-navbar").on("click", function () {
    var isNoBorderBottomNavbar = $(this).prop("checked");

    if (isNoBorderBottomNavbar) {
        $(".main-navbar").addClass("no-border");
    } else {
        $(".main-navbar").removeClass("no-border");
    }

    localStorage.setItem('noBorderBottomNavbar', isNoBorderBottomNavbar);
})

//Customizar Content
//Content Escuro
$("#cp-dark-content").on("click", function () {
    var isDarkContent = $(this).prop("checked");

    if (isDarkContent) {
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

    localStorage.setItem('darkContent', isDarkContent);
})

//Customizar Footer
//Footer Fixo
$("#cp-fixed-footer").on("click", function () {
    var isFixedFooter = $(this).prop("checked");

    if (isFixedFooter) {
        $(".admin-footer").addClass("fixed");
    }
    else {
        $(".admin-footer").removeClass("fixed");
    }

    if (window.matchMedia('screen and (min-width: 769px)').matches) {
        if ($(".main-sidebar").hasClass("open")) {
        } else {
        }
    }

    localStorage.setItem('fixedFooter', isFixedFooter);
})

//Footer Escuro
$("#cp-dark-footer").on("click", function () {
    var isDarkFooter = $(this).prop("checked");

    if (isDarkFooter) {
        $(".admin-footer").addClass("dark");
    } else {
        $(".admin-footer").removeClass("dark");
    }

    localStorage.setItem('darkFooter', isDarkFooter);
})

//Footer Sem Borda
$("#cp-border-top-footer").on("click", function () {
    var isNoBorderBottomFooter = $(this).prop("checked");

    if (isNoBorderBottomFooter) {
        $(".admin-footer").addClass("no-border");
    } else {
        $(".admin-footer").removeClass("no-border");
    }

    localStorage.setItem('noBorderBottomFooter', isNoBorderBottomFooter);
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