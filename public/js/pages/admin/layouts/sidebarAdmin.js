$(".flex-list .main-title").on("click", function () {
    var subListHeight = 0;
    var parentList = $(this).parent(".flex-list");
    if (parentList.hasClass("open")) {
        parentList.removeClass("open");
    }
    else {
        parentList.addClass("open");
        parentList.children(".sub-list").children(".sub-title").each(function () {
            subListHeight += $(this).outerHeight();
        })
        subListHeight += 6;
    }
    $(this).parent(".flex-list").children(".sub-list").css("height", subListHeight + "px");
})