$(".sidebar-link.outros").addClass("active").addClass("only");
$(".sidebar-link.cupons-desconto").addClass("active");

$(".valor-minimo-compra").each(function () {
    $(this).maskMoney({ prefix: 'R$ ', allowNegative: true, thousands: '.', decimal: ',', affixesStay: true });
})

$("#search-cupoms").on("input", function () {
    var search = $.trim($(this).val().toLowerCase());
    $(".cupom-card").each(function () {
        var categoryInput = $.trim($(this).find("#cupom").val().toLowerCase());
        if (categoryInput.search(search) >= 0) {
            $(this).removeClass("notOnSearch");

        } else {
            $(this).addClass("notOnSearch");
        }
    })
})

var meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
];

$(".adicionar-cupom").on("click", function () {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var date = day + " " + meses[month] + " " + year;

    $("#cupom-flex").prepend(newCupom(date));
    $(".valor-minimo-compra").each(function () {
        console.log($(this));
        $(this).maskMoney({ prefix: 'R$ ', allowNegative: true, thousands: '.', decimal: ',', affixesStay: true });
    })
})

$(document).on("change", ".validade-cupom", function () {
    var tipoValidade = $(this).val();
    if (tipoValidade == "varios-usos")
        $(this).parent().after(usosCupom());
    else if ($(this).parent().next(".validade-usos"))
        $(this).parent().next(".validade-usos").remove();
})

$(document).on("change", ".tipo-cupom", function () {
    console.log("haha");
    var tipo = $(this).val();
    switch (tipo) {
        case 'porcentagem':
            $(this).parent().next().children().removeAttr("disabled");
            $(this).parent().next().children().maskMoney('destroy');
            $(this).parent().next().children().mask('##0,00%', { reverse: true });
            break;
        case 'bruto':
            $(this).parent().next().children().removeAttr("disabled");
            $(this).parent().next().children().unmask('destroy');
            $(this).parent().next().children().maskMoney({ prefix: 'R$ ', allowNegative: true, thousands: '.', decimal: ',', affixesStay: true });
            break;
        default:
            $(this).parent().next().children().val("");
            $(this).parent().next().children().attr("disabled", "true");
            break;
    }
})


/*********************************************************************** FUNÇÕES **************************************************************************************************/

function newCupom(date) {
    var newCupom =
        '<div class="cupom-card">' +
        '        <form action="#" method="POST">' +
        '            <header class="cupom-card__header">' +
        '                <div class="badge new-cupom-badge p-1">' +
        '                   <p class="m-0">Novo</p>' +
        '                </div>' +
        '                <label class="switch">' +
        '                    <input type="checkbox" id="cp-dark-sidebar">' +
        '                    <span class="slider round"></span>' +
        '                </label>' +
        '                <p class="cupom-id mt-3">1</p>' +
        '                <div>' +
        '                    <input type="text" placeholder="Cupom" name="cupom" id="cupom" minlength="2" required>' +
        '                </div>' +
        '                <div>' +
        '                    <input type="number" id="quantidade" name="quantidade" placeholder="Quantidade"' +
        '                        onkeydown="return event.keyCode == 69 ? false : true" min="1" required>' +
        '                </div>' +
        '                <div class="mt-1">' +
        '                    <select name="validade" id="validade" class="validade-cupom" required>' +
        '                        <option value="">Escolha uma Validade</option>' +
        '                        <option value="uso-unico">Uso Único</option>' +
        '                        <option value="varios-usos">Vários Usos</option>' +
        '                        <option value="ilimitada">Ilimitada</option>' +
        '                    </select>' +
        '                </div>' +
        '                <div class="mt-1">' +
        '                    <select name="tipo" id="tipo" class="tipo-cupom" required>' +
        '                        <option value="">Escolha um Tipo</option>' +
        '                        <option value="porcentagem">Porcentagem (%)</option>' +
        '                        <option value="bruto">Bruto (R$)</option>' +
        '                    </select>' +
        '                </div>' +
        '                <div>' +
        '                    <input type="text" id="valor" name="valor" placeholder="Valor" disabled required>' +
        '                </div>' +
        '                <div>' +
        '                    <input type="text" id="minimo" name="minimo" placeholder="Valor de compra Mínimo" class="valor-minimo-compra" required>' +
        '                </div>' +
        '                <p class="data-criacao mt-3">Data de criação:<span class="ml-2">' + date + '</span></p>' +
        '            </header>' +
        '            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="wave" preserveAspectRatio="none">' +
        '                <path class="path-wave" fill-opacity="1"' +
        '                    d="M0,192L80,181.3C160,171,320,149,480,165.3C640,181,800,235,960,250.7C1120,267,1280,245,1360,234.7L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z">' +
        '                </path>' +
        '            </svg>' +
        '            <section class="cupom-card__body">' +
        '                <div class="cupom-card__title">' +
        '                    <div class="mb-3">' +
        '                        <span class="badge-title px-2 py-1 mr-2">31</span>' +
        '                        usos' +
        '                    </div>' +
        '                </div>' +
        '            </section>' +
        '            <div class="submit-div">' +
        '                <input type="submit" value="Alterar" class="btn">' +
        '                <a href="/excluir-cupom" class="btn excluir-cupom">Excluir</a>' +
        '            </div>' +
        '        </form>' +
        '    </div>';
    return newCupom;
}

function usosCupom() {
    var usosCupom =
        '<div class="validade-usos">' +
        '    <input type="number" id="usos" name="usos" placeholder="Usos"' +
        '       onkeydown="return event.keyCode == 69 ? false : true" min="1" required>' +
        '</div>';
    return usosCupom;
}