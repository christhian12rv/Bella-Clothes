const chooseFile = document.getElementById("escolher-imagem");
const imgPreview = document.getElementById("visualizar-imagem");

let imgUrl;
$("#image-transparency_slider").ionRangeSlider(rangeSliderOptions(0, 100));
const imageTransparencySlider = $("#image-transparency_slider").data("ionRangeSlider");

chooseFile.addEventListener("change", function () {
    getImgData();
});

$('#radio-imagem').prop("checked", true);

let toastId;
$("button#alterar-imagem").on("click", function () {
    if ($('#radio-imagem').is(':checked')) {
        if (!$(".image-sidebar-preview").length) {
            toastId = $(".toast-container .toast").length + 1;
            $.ajax({
                url: "/getToast",
                method: "POST",
                data: {
                    type: 'error',
                    text: 'Escolha uma imagem ou altere o tipo de fundo para "Sem Imagem" ou "Padrão',
                    autoHide: true,
                    autoHideDelay: 4000,
                    toastId: toastId
                }
            }).done(function (data) {
                $(".toast-container").append(data);
                $("#toast-" + toastId).toast("show");
            })
            return;
        } else {
            localStorage.setItem("image_sidebar", imgUrl);
            localStorage.setItem("transparency_sidebar", ((100 - imageTransparencySlider.result.from) / 100));
        }
    } else if ($('#radio-padrao').is(':checked')) {
        localStorage.removeItem("image_sidebar");
        localStorage.removeItem("transparency_sidebar");
    } else {
        localStorage.removeItem("image_sidebar");
        localStorage.setItem("transparency_sidebar", "1");
    }

    toastId = $(".toast-container .toast").length + 1;
    $.ajax({
        url: "/getToast",
        method: "POST",
        data: {
            type: 'success',
            text: 'Fundo da barra lateral atualizado',
            autoHide: true,
            autoHideDelay: 3000,
            toastId: toastId
        }
    }).done(function (data) {
        const imageSidebar = localStorage.getItem("image_sidebar");
        const transparencySidebar = localStorage.getItem("transparency_sidebar");
        document.documentElement.style.setProperty('--sidebar-image', 'url(' + (imageSidebar || "/img/admin-sidebar/wood.jpg") + ')');
        document.documentElement.style.setProperty('--sidebar-background-opacity', (transparencySidebar || "0.85"));

        $(".toast-container").append(data);
        $("#toast-" + toastId).toast("show");
    })
})

$(".tipo-fundo").on("change", function () {
    if ($(this).attr("id") === 'radio-solido' || $(this).attr("id") === 'radio-padrao')
        $(".box-escolher-imagem").hide()
    else
        $(".box-escolher-imagem").show()
})

function getImgData() {
    const files = chooseFile.files[0];
    if (files) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files);
        fileReader.addEventListener("load", function () {
            imgPreview.style.display = "block";
            imgPreview.innerHTML = '<img class="image-sidebar-preview" src="' + this.result + '" />';
            imgUrl = this.result;
        });
    }

    if ($("#default-escolher-imagem").css("display", "block")) {
        $("#default-escolher-imagem").css("display", "none");
    }
}

function rangeSliderOptions(min, max) {
    let options = {
        grid: true,
        min: min,
        max: max,
        from: max,
        step: 1,
        decorate_both: false,
        grid: true,
        grid_num: 1,
        postfix: "%",
        skin: "square",
        onChange: function (data) {
            let transparencia = data.from / 100;
            $("#visualizar-imagem").css("opacity", transparencia);
        }
    };
    return options;
}