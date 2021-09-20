$(".sidebar-meus-dados").addClass("active");

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


    $("#link_alterar_telefone").on("click", function () {
        Swal.fire({
            title: 'Alterar Telefone',
            html: '<input type="text" id="swal_novo_telefone" class="swal2-input" placeholder="Novo telefone">',
            showCancelButton: true,
            confirmButtonText: 'Alterar',
            confirmButtonColor: '#19c880',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#eb5050',
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading(),
            onOpen: function (el) {
                var container = $(el);
                container.find('#swal_novo_telefone').phoneBrazil();
            },
            preConfirm: () => {
                let novo_telefone = $("#swal_novo_telefone").val();
                if (novo_telefone.trim() == "") {
                    return Swal.showValidationMessage(
                        `O telefone informado é inválido`
                    )
                }
                return $.ajax({
                    type: 'POST',
                    url: '/usuario/alterarTelefone',
                    data: {
                        novo_telefone: novo_telefone,
                        campo_telefone: 'telefone'
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
            $("#telefone_usuario").html(result.value.novo_telefone);
            Swal.fire({
                title: 'Telefone alterado com sucesso para ' + result.value.novo_telefone,
                type: 'success'
            })
        })
    })


    $("#link_alterar_outro_telefone").on("click", function () {
        Swal.fire({
            title: 'Alterar Telefone',
            html: '<input type="text" id="swal_novo_outro_telefone" class="swal2-input" placeholder="Novo telefone">',
            showCancelButton: true,
            confirmButtonText: 'Alterar',
            confirmButtonColor: '#19c880',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#eb5050',
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading(),
            onOpen: function (el) {
                var container = $(el);
                container.find('#swal_novo_outro_telefone').phoneBrazil();
            },
            preConfirm: () => {
                let novo_outro_telefone = $("#swal_novo_outro_telefone").val();
                return $.ajax({
                    type: 'POST',
                    url: '/usuario/alterarTelefone',
                    data: {
                        novo_telefone: novo_outro_telefone,
                        campo_telefone: 'outro_telefone'
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
            $("#outro_telefone_usuario").html(result.value.novo_telefone);
            let title = (result.value.novo_telefone != "") ? 'Telefone alternativo alterado com sucesso para ' + result.value.novo_telefone : 'Telefone retirado com sucesso';
            Swal.fire({
                title: title,
                type: 'success'
            })
        })
    })

    $(".button-excluir-endereco").on("click", function () {
        let form = $(this).parent("form");
        let nome_endereco = $(this).attr("nome-endereco");
        Swal.fire({
            type: "question",
            title: 'Tem certeza que deseja excluir o Endereço ' + nome_endereco + "?",
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

    $(".button-endereco-principal:not(.active)").on("click", function () {
        let id_endereco = $(this).attr("id-endereco");
        let nome_endereco = $(this).attr("nome-endereco");
        Swal.fire({
            title: 'Tem certeza que deseja atualizar o Endereço ' + nome_endereco + ' para principal?',
            showCancelButton: true,
            confirmButtonText: 'Alterar',
            confirmButtonColor: '#19c880',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#eb5050',
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading(),
            preConfirm: () => {
                return $.ajax({
                    type: 'POST',
                    url: '/usuario/alterarEnderecoPrincipal',
                    data: {
                        id_endereco: id_endereco
                    },
                    dataType: 'json'
                }).done(function (result) {
                    if (result.status === 200) {
                        return;
                    } else {
                        Swal.showValidationMessage(
                            `${result.error}`
                        )
                    }
                }).fail(function (error) {
                    Swal.showValidationMessage(
                        `${error}`
                    )
                })
            }
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    title: 'Endereço Principal alterado com sucesso',
                    type: 'success'
                }).then((result2) => {
                    location.reload();
                })
            }
        })
    })
})
