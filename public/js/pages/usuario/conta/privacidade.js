$(window).on("load", function () {
    $(".sidebar-privacidade").addClass("active");

    // Icons Bootstraps para cor cheia no sidebar active
    var iconClass = $(".usuario-sidebar ul li a.active i.changeFill").attr("class").substr(14);
    $(".usuario-sidebar ul li a.active i.changeFill").removeClass(iconClass);
    $(".usuario-sidebar ul li a.active i.changeFill").addClass(iconClass + "-fill");

    $("#ofertas_email").on("change", function () {
        let ofertas_email = $(this).prop("checked");
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

    if ($("#ofertas_email").attr("data-checked") == "true")
        $("#ofertas_email").prop("checked", true);


    $("#button-excluir-conta").on("click", function () {
        let form = $(this).parent("form");
        Swal.fire({
            type: "warning",
            title: 'Tem certeza que deseja excluir sua conta? Todos os seus dados, incluindo endereços e cartões serão excluidos. Os dados de suas compras serão mantidos em nosso servidor.',
            showCancelButton: true,
            confirmButtonText: 'Excluir',
            confirmButtonColor: '#19c880',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#eb5050',
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value)
                form.submit();
        })
    })
})