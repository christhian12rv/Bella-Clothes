const chooseFile = document.getElementById("escolher-imagem");
const imgPreview = document.getElementById("visualizar-imagem");

chooseFile.addEventListener("change", function () {
    getImgData();
});

$("#slider-transparencia").rangeSlider({
    type: "single",
    skin: "green",
    direction: "horizontal"
}, {
    min: 0,
    max: 100,
    step: 1,
    values: [100, 100]
});

$("#slider-transparencia").rangeSlider("onChange", function (event) {
    var transparencia = event.detail.values[0] / 100;
    $("#visualizar-imagem").css("opacity", transparencia);
    console.log($("#visualizar-imagem").css("opacity"));
});

$(window).on("resize", function () {
    $("#slider-transparencia").rangeSlider("reset");
})

function getImgData() {
    const files = chooseFile.files[0];
    if (files) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files);
        fileReader.addEventListener("load", function () {
            imgPreview.style.display = "block";
            imgPreview.innerHTML = '<img src="' + this.result + '" />';
        });
    }

    if ($("#default-escolher-imagem").css("display", "block")) {
        $("#default-escolher-imagem").css("display", "none");
    }
}