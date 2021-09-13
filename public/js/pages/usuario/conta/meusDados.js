$(".sidebar-meus-dados").addClass("active");
$(window).on("load", function () {
    $("#link_alterar_email").on("click", function () {
        let id_usuario = $("#id_usuario").val();
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
                        id_usuario: id_usuario,
                        novo_email: novo_email,
                        senha: senha
                    },
                    dataType: 'json'
                }).fail(function (error) {
                    Swal.showValidationMessage(
                        `${error}`
                    )
                })
            }
        }).then((result) => {
            if (result.value.status === 200) {
                $("#email_usuario").html(result.value.novo_email);
                Swal.fire({
                    title: 'Email alterado com sucesso para ' + result.value.novo_email,
                    type: 'success'
                })
            } else {
                let errorsMessages = "";
                if (result.value.error instanceof Array) {
                    result.value.error.forEach((value, i, array) => {
                        errorsMessages += value;
                        if (i !== array.length - 1)
                            errorsMessages += ', <br>';
                    })
                } else
                    errorsMessages = result.value.error;
                Swal.fire({
                    title: errorsMessages,
                    type: 'error'
                })
            }
        })
    })
})
