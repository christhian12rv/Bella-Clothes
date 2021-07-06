$(".sidebar-link.painel-controle").addClass("active");
$(".sidebar-link.painel-controle-quantidade-vendas").addClass("active");

var GraphTicksColor = 'black';
var GraphBorderColor = 'rgba(255, 255, 255, .9)';
var radialBackgroundColorGraph = $("#card-quantidade-vendas").outerHeight();
var activeQuantidadeVendasGraphic;
var activeQuantidadeVendasGraphicFunction;
quantidadeVendasVerticalLine();

var datePickerLanguageOptions = {
    days: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    daysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    daysMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'hoje',
    clear: 'limpar',
    dateFormat: 'dd/mm/yyyy',
    timeFormat: 'hh:ii aa',
    firstDay: 0
};

var datepicker = $('#datepicker-chart').datepicker({
    view: 'days',
    minView: 'days',
    dateFormat: 'dd/mm/yyyy',
    range: true,
    multipleDatesSeparator: " - ",
    language: 'br'
}).data('datepicker');
$.fn.datepicker.language['br'] = datePickerLanguageOptions;

$(window).on("resize", function () {
    reloadGraphic(activeQuantidadeVendasGraphic, activeQuantidadeVendasGraphicFunction);
})

$('#filtrar').on("change", function () {
    var filtro = $(this).val();
    if (filtro == 'dia') {
        datepickerDia();
    } else if (filtro == 'mes') {
        datepickerMes();
    } else {
        datepickerAno();
    }
})

$("#cp-dark-content").on("click", function () {
    if ($(this).prop("checked")) {
        GraphTicksColor = "rgba(255, 255, 255, .9)";
        GraphBorderColor = "#1a1a1a";
    } else {
        GraphTicksColor = "black";
        GraphBorderColor = "rgba(255, 255, 255, .9)"
    }
    reloadGraphic(activeQuantidadeVendasGraphic, activeQuantidadeVendasGraphicFunction);
})

$("#btn-vertical-line-quantidade-vendas").on("click", function () {
    reloadGraphic(activeQuantidadeVendasGraphic, quantidadeVendasVerticalLine, $(this));
})
$("#btn-horizontal-line-quantidade-vendas").on("click", function () {
    reloadGraphic(activeQuantidadeVendasGraphic, quantidadeVendasHorizontalLine, $(this));
})
$("#btn-vertical-bar-quantidade-vendas").on("click", function () {
    reloadGraphic(activeQuantidadeVendasGraphic, quantidadeVendasVerticalBar, $(this));
})
$("#btn-horizontal-bar-quantidade-vendas").on("click", function () {
    reloadGraphic(activeQuantidadeVendasGraphic, quantidadeVendasHorizontalBar, $(this));
})
$("#btn-pie-quantidade-vendas").on("click", function () {
    reloadGraphic(activeQuantidadeVendasGraphic, quantidadeVendasPie, $(this));
})

/******************************************* FUNÇÕES ********************************************************/
function datepickerDia() {
    datepicker.clear();
    datepicker.destroy();
    datepicker = $('#datepicker-chart').datepicker({
        view: 'days',
        minView: 'days',
        dateFormat: 'dd/mm/yyyy',
        range: true,
        multipleDatesSeparator: " - ",
        language: 'br'
    }).data('datepicker');
}

function datepickerMes() {
    datepicker.clear();
    datepicker.destroy();
    datepicker = $('#datepicker-chart').datepicker({
        view: 'months',
        minView: 'months',
        dateFormat: 'MM yyyy',
        range: true,
        multipleDatesSeparator: " - ",
        language: 'br'
    }).data('datepicker');
}

function datepickerAno() {
    datepicker.clear();
    datepicker.destroy();
    datepicker = $('#datepicker-chart').datepicker({
        view: 'years',
        minView: 'years',
        dateFormat: 'yyyy',
        range: true,
        multipleDatesSeparator: " - ",
        language: 'br'
    }).data('datepicker');
}

function reloadGraphic(activeGraphic, graphicFunction, button) {
    if (button) {
        $("#card-quantidade-vendas button").each(function () {
            if ($(this).hasClass("active"))
                $(this).removeClass("active")
        })
        button.addClass("active");
    }
    activeGraphic.destroy();
    $("#chart-quantidade-vendas").css("opacity", "0");
    $("#chart-quantidade-vendas").animate({ opacity: "1" }, 300);
    graphicFunction();
}
/******************************************* GRÁFICOS ********************************************************/

// ------------- PEDIDOS
// Vertical Line Graphic - QuantidadeVendas
var chartQuantidadeVendasVerticalLine;
function quantidadeVendasVerticalLine() {
    var canvas = $('#chart-quantidade-vendas');
    var ctx = document.getElementById('chart-quantidade-vendas').getContext('2d');
    var gradientLine = ctx.createLinearGradient(0, 0, 0, canvas.outerHeight());
    gradientLine.addColorStop(0, "#ffba00");
    gradientLine.addColorStop(0.5, "#fc9244");
    gradientLine.addColorStop(1, "rgb(255, 0, 68)");
    var gradientLineFill = ctx.createLinearGradient(0, 0, 0, canvas.outerHeight());
    gradientLineFill.addColorStop(0, "rgba(254,186,68,0.6)");
    gradientLineFill.addColorStop(0.5, "rgba(256,142,68,0.4)");
    gradientLineFill.addColorStop(0.85, "rgba(255, 0, 68, 0.1)");
    gradientLineFill.addColorStop(1, "transparent");
    chartQuantidadeVendasVerticalLine = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [{
                label: 'Quantidade de Vendas',
                data: [12, 19, 3, 5, 2, 3, 10, 15, 3, 1, 20, 16],
                borderColor: gradientLine,
                borderWidth: 2,
                pointBackgroundColor: gradientLine,
                pointHoverBackgroundColor: 'white',
                backgroundColor: gradientLineFill,
                spanGaps: false,
                tension: 0.4,
                fill: {
                    target: 'origin',
                    above: gradientLineFill
                }
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: GraphTicksColor
                    }
                },
                x: {
                    ticks: {
                        color: GraphTicksColor
                    }
                }
            },
            plugins: {
                filler: {
                    propagate: true
                },
                legend: {
                    labels: {
                        color: GraphTicksColor
                    }
                }
            },
            legend: {
                borderColor: "blue",
                lineWidth: 20
            }
        }
    })
    activeQuantidadeVendasGraphic = chartQuantidadeVendasVerticalLine;
    activeQuantidadeVendasGraphicFunction = quantidadeVendasVerticalLine;
    return chartQuantidadeVendasVerticalLine;
}

// Vertical Line Graphic - QuantidadeVendas
var chartQuantidadeVendasHorizontalLine;
function quantidadeVendasHorizontalLine() {
    var canvas = $('#chart-quantidade-vendas');
    var ctx = document.getElementById('chart-quantidade-vendas').getContext('2d');
    var gradientLine = ctx.createLinearGradient(0, 0, canvas.outerWidth(), 0);
    gradientLine.addColorStop(0, "rgb(255, 0, 68)");
    gradientLine.addColorStop(0.5, "rgb(256,142,68)");
    gradientLine.addColorStop(1, "rgb(254,186,68)");
    var gradientLineFill = ctx.createLinearGradient(0, 0, canvas.outerWidth(), 0);
    gradientLineFill.addColorStop(0, "transparent");
    gradientLineFill.addColorStop(0.15, "rgba(255, 0, 68, 0.1)");
    gradientLineFill.addColorStop(0.5, "rgba(256,142,68,0.4)");
    gradientLineFill.addColorStop(1, "rgba(254,186,68,0.6)");
    chartQuantidadeVendasHorizontalLine = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [{
                axis: 'y',
                label: 'Quantidade de Vendas',
                data: [12, 19, 3, 5, 2, 3, 10, 15, 3, 1, 20, 16],
                borderColor: gradientLine,
                borderWidth: 2,
                pointBackgroundColor: gradientLine,
                pointHoverBackgroundColor: 'white',
                backgroundColor: gradientLineFill,
                spanGaps: false,
                tension: 0.4,
                fill: {
                    target: 'origin',
                    above: gradientLineFill
                }
            }]
        },
        options: {
            indexAxis: 'y',
            scales: {
                y: {
                    ticks: {
                        color: GraphTicksColor
                    }
                },
                x: {
                    beginAtZero: true,
                    ticks: {
                        color: GraphTicksColor
                    }
                }
            },
            plugins: {
                filler: {
                    propagate: true
                },
                legend: {
                    labels: {
                        color: GraphTicksColor
                    }
                }
            },
            legend: {
                borderColor: "blue",
                lineWidth: 20
            }
        }
    })
    activeQuantidadeVendasGraphic = chartQuantidadeVendasHorizontalLine;
    activeQuantidadeVendasGraphicFunction = quantidadeVendasHorizontalLine;
    return chartQuantidadeVendasHorizontalLine;
}

// Vertical Bar Graphic - QuantidadeVendas
var chartQuantidadeVendasVerticalBar;
function quantidadeVendasVerticalBar() {
    var canvas = $('#chart-quantidade-vendas');
    var ctxQuantidadeVendas = document.getElementById('chart-quantidade-vendas').getContext('2d');
    var gradientQuantidadeVendas = ctxQuantidadeVendas.createLinearGradient(0, 0, 0, canvas.outerHeight());
    gradientQuantidadeVendas.addColorStop(0, "#ffba00");
    gradientQuantidadeVendas.addColorStop(0.45, "#fc9244");
    gradientQuantidadeVendas.addColorStop(1, "rgb(255, 0, 68)");
    chartQuantidadeVendasVerticalBar = new Chart(ctxQuantidadeVendas, {
        type: 'bar',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [{
                label: 'Quantidade de Vendas',
                data: [12200, 19110, 3666, 5321, 2678, 3901, 11109, 15000, 3211, 1564, 21039, 16023],
                borderWidth: 1,
                borderRadius: 5,
                borderColor: 'rgba(0,0,0,0)',
                backgroundColor: gradientQuantidadeVendas
            }]
        },
        options: {
            indexAxis: 'x',
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: GraphTicksColor
                    },
                },
                x: {
                    ticks: {
                        color: GraphTicksColor
                    }
                }
            },
            plugins: {
                filler: {
                    propagate: true
                },
                legend: {
                    labels: {
                        color: GraphTicksColor
                    }
                }
            }
        }
    })
    activeQuantidadeVendasGraphic = chartQuantidadeVendasVerticalBar;
    activeQuantidadeVendasGraphicFunction = quantidadeVendasVerticalBar;
    return chartQuantidadeVendasVerticalBar;
}

// Horizontal Bar Graphic - QuantidadeVendas
var chartQuantidadeVendasHorizontalBar;
function quantidadeVendasHorizontalBar() {
    var canvas = $('#chart-quantidade-vendas');
    var ctxQuantidadeVendas = document.getElementById('chart-quantidade-vendas').getContext('2d');
    var gradientQuantidadeVendas = ctxQuantidadeVendas.createLinearGradient(0, 0, canvas.outerWidth(), 0);
    gradientQuantidadeVendas.addColorStop(0, "rgb(255, 0, 68)");
    gradientQuantidadeVendas.addColorStop(0.45, "#fc9244");
    gradientQuantidadeVendas.addColorStop(1, "#ffba00");
    chartQuantidadeVendasHorizontalBar = new Chart(ctxQuantidadeVendas, {
        type: 'bar',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [{
                label: 'Quantidade de Vendas',
                data: [12200, 19110, 3666, 5321, 2678, 3901, 11109, 15000, 3211, 1564, 21039, 16023],
                borderWidth: 1,
                borderRadius: 5,
                borderColor: 'rgba(0,0,0,0)',
                backgroundColor: gradientQuantidadeVendas
            }]
        },
        options: {
            indexAxis: 'y',
            scales: {
                y: {
                    ticks: {
                        color: GraphTicksColor
                    },
                },
                x: {
                    beginAtZero: true,
                    ticks: {
                        color: GraphTicksColor
                    }
                }
            },
            plugins: {
                filler: {
                    propagate: true
                },
                legend: {
                    labels: {
                        color: GraphTicksColor
                    }
                }
            }
        }
    })
    activeQuantidadeVendasGraphic = chartQuantidadeVendasHorizontalBar;
    activeQuantidadeVendasGraphicFunction = quantidadeVendasHorizontalBar;
    return chartQuantidadeVendasHorizontalBar;
}

// Pie Graphic - Produtos
var chartQuantidadeVendasPie;
function quantidadeVendasPie() {
    var canvas = $('#chart-quantidade-vendas');
    var ctxQuantidadeVendas = document.getElementById('chart-quantidade-vendas').getContext('2d');
    var gradientQuantidadeVendas = ctxQuantidadeVendas.createRadialGradient(canvas.outerHeight(), canvas.outerHeight(), canvas.outerHeight(), canvas.outerHeight(), canvas.outerHeight(), canvas.outerHeight() / 2);
    gradientQuantidadeVendas.addColorStop(0, "#ffba00");
    gradientQuantidadeVendas.addColorStop(0.5, "#fc9244");
    gradientQuantidadeVendas.addColorStop(1, "rgb(255, 0, 68)");
    chartQuantidadeVendasPie = new Chart(ctxQuantidadeVendas, {
        type: 'pie',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [{
                label: 'Quantidade de Vendas',
                data: [12200, 19110, 3666, 5321, 2678, 3901, 11109, 15000, 3211, 1564, 21039, 16023],
                borderWidth: 2,
                borderRadius: 10,
                borderColor: GraphBorderColor,
                backgroundColor: gradientQuantidadeVendas,
                hoverOffset: 4
            }]
        },
        options: {
            plugins: {
                filler: {
                    propagate: true
                },
                tooltip: {
                    callbacks: {
                        title: function (tooltipItem) {
                            return tooltipItem[0].label;
                        },
                        label: function (tooltipItem) {
                            return "Quantidade de Vendas: " + tooltipItem.formattedValue;
                        }
                    }
                },
                legend: {
                    display: false
                }
            }
        }
    })
    activeQuantidadeVendasGraphic = chartQuantidadeVendasPie;
    activeQuantidadeVendasGraphicFunction = quantidadeVendasPie;
    return chartQuantidadeVendasPie;
}