$(window).on("load", function () {
    $(".sidebar-privacidade").addClass("active");

    // Icons Bootstraps para cor cheia no sidebar active
    var iconClass = $(".usuario-sidebar ul li a.active i.changeFill").attr("class").substr(14);
    $(".usuario-sidebar ul li a.active i.changeFill").removeClass(iconClass);
    $(".usuario-sidebar ul li a.active i.changeFill").addClass(iconClass + "-fill");

    $("#ofertas_email").on("change", function () {
        console.log($(this));
        let ofertas_email = $(this).prop("checked");
        console.log(ofertas_email);
        $.ajax({
            type: 'POST',
            url: '/usuario/alterarReceberOfertasEmail',
            data: {
                ofertas_email: ofertas_email
            },
            dataType: 'json'
        }).done(function (result) {
            if (result.status === 200)
                return;
        })
    })
})