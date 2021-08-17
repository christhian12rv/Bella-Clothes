
$(".sidebar-link.blog").addClass("active").addClass("only");
$(".sidebar-link.posts").addClass("active");

$(window).on("load", function () {
    if ($("#cp-dark-content").prop("checked")) {
        $("#conteudo").parent().addClass("trumbowyg-dark");
    }
    $('#conteudo').trumbowyg(trumbowygOptions());
})

$("#cp-dark-content").on("click", function () {
    $('#conteudo').trumbowyg('destroy');
    if ($(this).prop("checked"))
        $("#conteudo").parent().addClass("trumbowyg-dark");
    else
        $("#conteudo").parent().removeClass("trumbowyg-dark");
    $('#conteudo').trumbowyg(trumbowygOptions());
})


$("input[type=file]").on("change", function () {
    if ($(this)[0].files.length >= 1)
        $(this).prev(".image-select-name").html($(this)[0].files[0].name);
})


/**************************************************** FUNÇÕES ****************************************************************** */

function trumbowygOptions() {
    var options = {
        lang: "pt_br",
        btns: [
            ['undo', 'redo'], // Only supported in Blink browsers
            ['formatting'],
            ['strong', 'em', 'del'],
            ['foreColor', 'backColor'],
            ['superscript', 'subscript'],
            ['link'],
            ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
            ['indent', 'outdent'],
            ['unorderedList', 'orderedList'],
            ['table'],
            ['horizontalRule'],
            ['removeformat'],
            ['fullscreen']
        ],
        removeformatPasted: true,
        urlProtocol: true,
        minimalLinks: true,
        autogrow: true
    };

    return options;
}