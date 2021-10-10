$(".sidebar-link.usuarios").addClass("active").addClass("only");
$(".sidebar-link.ver-usuarios").addClass("active");

$(window).on("load", function () {
    $(".tabs input[type=radio]").on("click", function () {
        $(".tabs input[type=radio]:not(:checked)").each(function () {
            $(this).next('label').next('.tab').css("display", "none");
        })

        var tab = $(this).next('label').next('.tab');
        if (tab.css("display") == "none") {
            tab.css("display", "block");
        } else {
            tab.css("display", "none");
        }
    })

    $(".btn-ativar-usuario").on("click", function () {
        let ativo = $(this).hasClass("btn-ativar-usuario-true") ? true : false;
        let id_usuario = $(".main-card").find("#id-usuario").val();
        $.ajax({
            url: "/admin/usuario/" + id_usuario,
            method: "PUT",
            data: {
                ativo: !ativo
            }
        }).done(function () {
            location.reload();
        }).fail(function () {
            window.location.href = "/admin/erro-500";
        })
    })

    $(".btn-excluir-usuario").on("click", function () {
        let id_usuario = $(".main-card").find("#id-usuario").val();
        Swal.fire({
            type: "warning",
            html:
                '<input type="text" id="swal_excluir" class="swal2-input">',
            title: 'Tem certeza que deseja excluir a conta desse usuário? Se sim, digite "excluir" no campo abaixo.',
            showCancelButton: true,
            confirmButtonText: 'Excluir',
            confirmButtonColor: '#19c880',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#eb5050',
            allowOutsideClick: () => !Swal.isLoading(),
            preConfirm: () => {
                let excluirInput = $("#swal_excluir").val();
                if (excluirInput !== "excluir")
                    return Swal.showValidationMessage(
                        `Digite "excluir"`
                    )
                return $.ajax({
                    type: 'DELETE',
                    url: '/admin/usuario/' + id_usuario,
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
                    title: 'Conta exclúida com sucesso!',
                    type: 'success'
                }).then(() => {
                    window.location = '/admin/ver-usuarios';
                })
            }
        })
    })
})