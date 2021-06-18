$(".sidebar-privacidade").addClass("active");

// Icons Bootstraps para cor cheia no sidebar active
var iconClass = $(".usuario-sidebar ul li a.active i.changeFill").attr("class").substr(14);
$(".usuario-sidebar ul li a.active i.changeFill").removeClass(iconClass);
$(".usuario-sidebar ul li a.active i.changeFill").addClass(iconClass + "-fill");