var itemsSidebarOpen = JSON.parse(localStorage.getItem('itemsSidebarOpen')) || [];
var itemIndex;
$(window).on("load", function () {
    itemsSidebarOpen.forEach((item) => {
        $(".main-sidebar .sidebar .flex-list").eq(item).children(".main-title").trigger("click");
    });

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
        }, 1001);
    })
})

$(".flex-list .main-title").on("click", function () {
    var subListHeight = 0;
    var parentList = $(this).parent(".flex-list");
    itemIndex = $(".main-sidebar .sidebar .flex-list").index(parentList);

    if (parentList.hasClass("open")) {
        parentList.removeClass("open");

        itemsSidebarOpen.splice(itemsSidebarOpen.indexOf(itemIndex), 1);
    }
    else {
        parentList.addClass("open");
        parentList.children(".sub-list").children(".sub-title").each(function () {
            subListHeight += $(this).outerHeight();
        })
        subListHeight += 6;

        if (itemsSidebarOpen.indexOf(itemIndex) < 0)
            itemsSidebarOpen.push(itemIndex);
    }

    $(this).parent(".flex-list").children(".sub-list").css("height", subListHeight + "px");

    localStorage.setItem('itemsSidebarOpen', JSON.stringify(itemsSidebarOpen));
})

var footerHeight = $(".admin-footer").outerHeight();
$(".admin-content").css("height", "calc(100% - " + (52 + footerHeight) + "px)");

$(window).on("resize", function () {
    if (!$(".main-sidebar").hasClass("fixed")) {
        footerHeight = $(".admin-footer").outerHeight();
        $(".admin-content").css("height", "calc(100% - " + (52 + footerHeight) + "px)");
    }
})

/******************************************************************************** FUNÇÕES *******************************************************************************/
