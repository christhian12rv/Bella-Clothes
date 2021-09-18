$(".sidebar-seguranca").addClass("active");

// Icons Bootstraps para cor cheia no sidebar active
var iconClass = $(".usuario-sidebar ul li a.active i.changeFill").attr("class").substr(14);
$(".usuario-sidebar ul li a.active i.changeFill").removeClass(iconClass);
$(".usuario-sidebar ul li a.active i.changeFill").addClass(iconClass + "-fill");

$(window).on("load", function () {
    $("#link_alterar_email").on("click", function () {
        Swal.fire({
            title: 'Alterar Email',
            html:
                '<input type="email" id="swal_novo_email" class="swal2-input mb-0" placeholder="Novo email">' +
                '<input type="password" id="swal_senha" class="swal2-input mt-2" placeholder="Confirme a senha da sua conta">',
            showCancelButton: true,
            confirmButtonText: 'Alterar',
            confirmButtonColor: '#19c880',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#eb5050',
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading(),
            preConfirm: () => {
                let novo_email = $("#swal_novo_email").val();
                let senha = $("#swal_senha").val();
                return $.ajax({
                    type: 'POST',
                    url: '/usuario/alterarEmail',
                    data: {
                        novo_email: novo_email,
                        senha: senha
                    },
                    dataType: 'json'
                }).done(function (result) {
                    if (result.status === 200) {
                        return;
                    } else {
                        let errorsMessages = "";
                        if (result.error instanceof Array) {
                            result.error.forEach((value, i, array) => {
                                errorsMessages += value;
                                if (i !== array.length - 1)
                                    errorsMessages += ', <br>';
                            })
                        } else
                            errorsMessages = result.error;
                        Swal.showValidationMessage(
                            `${errorsMessages}`
                        )
                    }
                }).fail(function (error) {
                    Swal.showValidationMessage(
                        `${error}`
                    )
                })
            }
        }).then((result) => {
            $("#email_usuario").html(result.value.novo_email);
            Swal.fire({
                title: 'Email alterado com sucesso para ' + result.value.novo_email,
                type: 'success'
            })
        })
    })
})