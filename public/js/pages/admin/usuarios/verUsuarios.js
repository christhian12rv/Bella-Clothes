$(".sidebar-link.usuarios").addClass("active").addClass("only");
$(".sidebar-link.ver-usuarios").addClass("active");

$(document).ready(function () {
    const table = $('#table-usuarios').DataTable({
        lengthMenu: [[10, 25, 50, -1], ["Exibir " + 10, "Exibir " + 25, "Exibir " + 50, "Exibir Todos"]],
        processing: true,
        serverSide: true,
        dom:
            '<"top"' +
            '<"d-flex flex-row flex-wrap"' +
            '<"flex-grow-1" B>' +
            '<"" l>' +
            '<"" f>' +
            '<"column-filter-to-select">' +
            '>>' +
            'rt' +
            '<"bottom"' +
            '<"row"' +
            '<"col-sm-12 col-md-6" i>' +
            '<"col-sm-12 col-md-6" p>' +
            '>>' +
            '<"clear">',
        buttons: [
            'pdf', 'print'
        ],
        ajax: {
            url: '/api/usuarios',
            dataSrc: 'usuarios'
        },
        columns: [
            { data: '_id', name: '_id' },
            { data: 'foto', name: 'foto' },
            {
                data: (data) => {
                    if (data.tipo_usuario.nome)
                        return data.tipo_usuario.nome + " " + data.tipo_usuario.sobrenome;
                    else
                        return data.tipo_usuario.razao_social;
                },
                name: 'nome_and_razao_social'
            },
            { data: 'email', name: 'email' },
            {
                data: (data) => {
                    return data.tipo_usuario.cpf || data.tipo_usuario.cnpj;
                },
                name: 'cpf_and_cnpj'
            },
            { data: 'ativo', name: 'ativo' },
            { data: 'createdAt', name: 'createdAt' },
            { data: '_id', name: '_id' }
        ],
        columnDefs: [
            {
                targets: [0],
                render: function (data, type, row, meta) {
                    return '<span class="id-usuario">' + data + '</span>'
                }
            },
            {
                targets: [1],
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {
                    if (data)

                        return '<div class="foto-perfil-usuario" style="--foto-perfil:url(/img/foto-usuarios/' + data + ');"></div>'
                    else
                        return '<i class="bi bi-person-fill foto-perfil-usuario"></i>'
                }
            },
            {
                targets: [3],
                render: function (data, type, row, meta) {
                    return '<span class="email-usuario">' + data + '</span>'
                }
            },
            {
                targets: [4],
                "orderable": false,
            },
            {
                targets: [5],
                render: function (data, type, row, meta) {
                    if (data)
                        return '<span class="badge badge-success py-2 px-3">Ativo</span>';
                    else
                        return '<span class="badge badge-danger py-2 px-3">Desativado</span>';
                }
            },
            {
                targets: [6],
                "searchable": false,
            },
            {
                targets: [7],
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {
                    let ativo = row.ativo ? "checked" : "";
                    return '<a href="/admin/usuario/' + data + '" class="ver-usuario mr-2"><i class="bi bi-pencil-square"></i></a>' +
                        '<a href="javascript: void(0)" class="excluir-usuario mr-2"><i class="bi bi-eraser"></i></a>' +
                        '<label class="switch switch-ativar-usuario"><input type="checkbox" class="checkbox-ativar-usuario"' + ativo + '><span class="slider slider-ativar-usuario round"></span></label>';
                }
            }
        ],
        language: {
            "url": "/json/datatable-language-pt_br.json"
        }
    })

    $(document).on("change", ".checkbox-ativar-usuario", function () {
        let ativo = $(this).prop("checked");
        let id_usuario = $(this).parents("tr").find(".id-usuario").html();
        console.log(id_usuario);
        $.ajax({
            url: "/admin/usuario/" + id_usuario,
            method: "PUT",
            data: {
                ativo: ativo
            }
        }).done(function (data) {
            console.log(data);
            table.ajax.reload(null, false);
        }).fail(function () {
            window.location.href = "/admin/erro-500";
        })
    })

    $(document).on("click", ".excluir-usuario", function () {
        let id_usuario = $(this).parents("tr").find(".id-usuario").html();
        let email_usuario = $(this).parents("tr").find(".email-usuario").html();
        Swal.fire({
            type: "warning",
            html:
                '<input type="text" id="swal_excluir" class="swal2-input">',
            title: '<span>Tem certeza que deseja excluir a conta do usuário de email <span style="font-weight: bold; color: #19c880 !important;">' + email_usuario + '</span>? Se sim, digite "excluir" no campo abaixo.</span>',
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
                let toastId = $(".toast-container .toast").length + 1;
                $.ajax({
                    url: "/getToast",
                    method: "POST",
                    data: {
                        type: 'success',
                        text: 'Usuário excluido com sucesso',
                        autoHide: true,
                        autoHideDelay: 4000,
                        toastId: toastId
                    }
                }).done(function (data) {
                    $(".toast-container").append(data);
                    $("#toast-" + toastId).toast("show");
                }).fail(function () {
                    window.location.href = "/admin/erro-500";
                })
                table.ajax.reload(null, false);
            }
        })
    })
})
