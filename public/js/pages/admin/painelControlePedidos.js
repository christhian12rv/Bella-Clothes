$(".sidebar-link.painel-controle").addClass("active");
$(".sidebar-link.painel-controle-pedidos").addClass("active");

var GraphTicksColor = 'black';
var GraphBorderColor = 'rgba(255, 255, 255, .9)';
var radialBackgroundColorGraph = $("#card-pedidos").outerHeight();
var activePedidosGraphic;
var activePedidosGraphicFunction;
pedidosVerticalLine();

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
    reloadGraphic(activePedidosGraphic, activePedidosGraphicFunction);
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
    reloadGraphic(activePedidosGraphic, activePedidosGraphicFunction);
})

$("#btn-vertical-line-pedidos").on("click", function () {
    reloadGraphic(activePedidosGraphic, pedidosVerticalLine, $(this));
})
$("#btn-horizontal-line-pedidos").on("click", function () {
    reloadGraphic(activePedidosGraphic, pedidosHorizontalLine, $(this));
})
$("#btn-vertical-bar-pedidos").on("click", function () {
    reloadGraphic(activePedidosGraphic, pedidosVerticalBar, $(this));
})
$("#btn-horizontal-bar-pedidos").on("click", function () {
    reloadGraphic(activePedidosGraphic, pedidosHorizontalBar, $(this));
})
$("#btn-pie-pedidos").on("click", function () {
    reloadGraphic(activePedidosGraphic, pedidosPie, $(this));
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
        $("#card-pedidos button").each(function () {
            if ($(this).hasClass("active"))
                $(this).removeClass("active")
        })
        button.addClass("active");
    }
    activeGraphic.destroy();
    $("#chart-pedidos").css("opacity", "0");
    $("#chart-pedidos").animate({ opacity: "1" }, 300);
    graphicFunction();
}
/******************************************* GRÁFICOS ********************************************************/

// ------------- PEDIDOS
// Vertical Line Graphic - Pedidos
var chartPedidosVerticalLine;
function pedidosVerticalLine() {
    var canvas = $('#chart-pedidos');
    var ctx = document.getElementById('chart-pedidos').getContext('2d');
    var gradientLine1 = ctx.createLinearGradient(0, 0, 0, canvas.outerHeight());
    gradientLine1.addColorStop(0, "#ffba00");
    gradientLine1.addColorStop(0.5, "#fc9244");
    gradientLine1.addColorStop(1, "rgb(255, 0, 68)");
    var gradientLine1Fill = ctx.createLinearGradient(0, 0, 0, canvas.outerHeight());
    gradientLine1Fill.addColorStop(0, "rgba(254,186,68,0.6)");
    gradientLine1Fill.addColorStop(0.5, "rgba(256,142,68,0.4)");
    gradientLine1Fill.addColorStop(0.85, "rgba(255, 0, 68, 0.1)");
    gradientLine1Fill.addColorStop(1, "transparent");
    var gradientLine2 = ctx.createLinearGradient(0, 0, 0, canvas.outerHeight());
    gradientLine2.addColorStop(0, "rgb(30,235,163)");
    gradientLine2.addColorStop(0.5, "rgb(23,175,130)");
    gradientLine2.addColorStop(1, "rgb(17,103,210)");
    var gradientLine2Fill = ctx.createLinearGradient(0, 0, 0, canvas.outerHeight());
    gradientLine2Fill.addColorStop(0, "rgba(30,235,163,0.6)");
    gradientLine2Fill.addColorStop(0.5, "rgba(23,175,130,0.4)");
    gradientLine2Fill.addColorStop(0.85, "rgba(17,103,210, 0.4)");
    gradientLine2Fill.addColorStop(1, "transparent");
    chartPedidosVerticalLine = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [{
                label: 'Pedidos (Todos)',
                data: [12, 19, 3, 5, 2, 3, 10, 15, 3, 1, 20, 16],
                borderColor: gradientLine1,
                borderWidth: 2,
                pointBackgroundColor: gradientLine1,
                pointHoverBackgroundColor: 'white',
                backgroundColor: gradientLine1Fill,
                spanGaps: false,
                tension: 0.4,
                fill: {
                    target: 'origin',
                    above: gradientLine1Fill
                }
            },
            {
                label: 'Pedidos Cancelados',
                data: [22, 14, 19, 6, 3, 14, 11, 10, 9, 10, 28, 12],
                borderColor: gradientLine2,
                borderWidth: 2,
                pointBackgroundColor: gradientLine2,
                pointHoverBackgroundColor: 'rgb(0, 60, 255)',
                backgroundColor: gradientLine2Fill,
                spanGaps: false,
                tension: 0.4,
                fill: {
                    target: 'origin',
                    above: gradientLine2Fill
                },
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
    activePedidosGraphic = chartPedidosVerticalLine;
    activePedidosGraphicFunction = pedidosVerticalLine;
    return chartPedidosVerticalLine;
}

// Vertical Line Graphic - Pedidos
var chartPedidosHorizontalLine;
function pedidosHorizontalLine() {
    var canvas = $('#chart-pedidos');
    var ctx = document.getElementById('chart-pedidos').getContext('2d');
    var gradientLine1 = ctx.createLinearGradient(0, 0, canvas.outerWidth(), 0);
    gradientLine1.addColorStop(0, "rgb(255, 0, 68)");
    gradientLine1.addColorStop(0.5, "rgb(256,142,68)");
    gradientLine1.addColorStop(1, "rgb(254,186,68)");
    var gradientLine1Fill = ctx.createLinearGradient(0, 0, canvas.outerWidth(), 0);
    gradientLine1Fill.addColorStop(0, "transparent");
    gradientLine1Fill.addColorStop(0.15, "rgba(255, 0, 68, 0.1)");
    gradientLine1Fill.addColorStop(0.5, "rgba(256,142,68,0.4)");
    gradientLine1Fill.addColorStop(1, "rgba(254,186,68,0.6)");
    var gradientLine2 = ctx.createLinearGradient(0, 0, canvas.outerWidth(), 0);
    gradientLine2.addColorStop(0, "rgb(17,103,210)");
    gradientLine2.addColorStop(0.5, "rgb(23,175,130)");
    gradientLine2.addColorStop(1, "rgb(30,235,163)");
    var gradientLine2Fill = ctx.createLinearGradient(0, 0, canvas.outerWidth(), 0);
    gradientLine2Fill.addColorStop(0, "transparent");
    gradientLine2Fill.addColorStop(0.15, "rgba(17,103,210, 0.4)");
    gradientLine2Fill.addColorStop(0.5, "rgba(23,175,130,0.4)");
    gradientLine2Fill.addColorStop(1, "rgba(30,235,163,0.6)");
    chartPedidosHorizontalLine = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [{
                axis: 'y',
                label: 'Pedidos (Todos)',
                data: [12, 19, 3, 5, 2, 3, 10, 15, 3, 1, 20, 16],
                borderColor: gradientLine1,
                borderWidth: 2,
                pointBackgroundColor: gradientLine1,
                pointHoverBackgroundColor: 'white',
                backgroundColor: gradientLine1Fill,
                spanGaps: false,
                tension: 0.4,
                fill: {
                    target: 'origin',
                    above: gradientLine1Fill
                }
            },
            {
                axis: 'y',
                label: 'Pedidos Cancelados',
                data: [22, 14, 19, 6, 3, 14, 11, 10, 9, 10, 28, 12],
                borderColor: gradientLine2,
                borderWidth: 2,
                pointBackgroundColor: gradientLine2,
                pointHoverBackgroundColor: 'rgb(0, 60, 255)',
                backgroundColor: gradientLine2Fill,
                spanGaps: false,
                tension: 0.4,
                fill: {
                    target: 'origin',
                    above: gradientLine2Fill
                },
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
    activePedidosGraphic = chartPedidosHorizontalLine;
    activePedidosGraphicFunction = pedidosHorizontalLine;
    return chartPedidosHorizontalLine;
}

// Vertical Bar Graphic - Pedidos
var chartPedidosVerticalBar;
function pedidosVerticalBar() {
    var canvas = $('#chart-pedidos');
    var ctxPedidos = document.getElementById('chart-pedidos').getContext('2d');
    var gradientPedidosTodos = ctxPedidos.createLinearGradient(0, 0, 0, canvas.outerHeight());
    gradientPedidosTodos.addColorStop(0, "#ffba00");
    gradientPedidosTodos.addColorStop(0.45, "#fc9244");
    gradientPedidosTodos.addColorStop(1, "rgb(255, 0, 68)");
    var gradientPedidosCancelados = ctxPedidos.createLinearGradient(0, 0, 0, canvas.outerHeight());
    gradientPedidosCancelados.addColorStop(0, "rgb(17,103,210)");
    gradientPedidosCancelados.addColorStop(0.5, "rgb(23,175,130)");
    gradientPedidosCancelados.addColorStop(1, "rgb(30,235,163)");
    chartPedidosVerticalBar = new Chart(ctxPedidos, {
        type: 'bar',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [{
                label: 'Pedidos (Todos)',
                data: [12200, 19110, 3666, 5321, 2678, 3901, 11109, 15000, 3211, 1564, 21039, 16023],
                borderWidth: 1,
                borderRadius: 5,
                borderColor: 'rgba(0,0,0,0)',
                backgroundColor: gradientPedidosTodos
            },
            {
                label: 'Pedidos Cancelados',
                data: [12200, 19110, 3666, 5321, 2678, 3901, 11109, 15000, 3211, 1564, 21039, 16023],
                borderWidth: 1,
                borderRadius: 5,
                borderColor: 'rgba(0,0,0,0)',
                backgroundColor: gradientPedidosCancelados
            }
            ]
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
    activePedidosGraphic = chartPedidosVerticalBar;
    activePedidosGraphicFunction = pedidosVerticalBar;
    return chartPedidosVerticalBar;
}

// Horizontal Bar Graphic - Pedidos
var chartPedidosHorizontalBar;
function pedidosHorizontalBar() {
    var canvas = $('#chart-pedidos');
    var ctxPedidos = document.getElementById('chart-pedidos').getContext('2d');
    var gradientPedidosTodos = ctxPedidos.createLinearGradient(0, 0, canvas.outerWidth(), 0);
    gradientPedidosTodos.addColorStop(0, "rgb(255, 0, 68)");
    gradientPedidosTodos.addColorStop(0.45, "#fc9244");
    gradientPedidosTodos.addColorStop(1, "#ffba00");
    var gradientPedidosCancelados = ctxPedidos.createLinearGradient(0, 0, canvas.outerWidth(), 0);
    gradientPedidosCancelados.addColorStop(0, "rgb(30,235,163)");
    gradientPedidosCancelados.addColorStop(0.5, "rgb(23,175,130)");
    gradientPedidosCancelados.addColorStop(1, "rgb(17,103,210)");
    chartPedidosHorizontalBar = new Chart(ctxPedidos, {
        type: 'bar',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [{
                label: 'Pedidos (Todos)',
                data: [12200, 19110, 3666, 5321, 2678, 3901, 11109, 15000, 3211, 1564, 21039, 16023],
                borderWidth: 1,
                borderRadius: 5,
                borderColor: 'rgba(0,0,0,0)',
                backgroundColor: gradientPedidosTodos
            },
            {
                label: 'Pedidos Cancelados',
                data: [12200, 19110, 3666, 5321, 2678, 3901, 11109, 15000, 3211, 1564, 21039, 16023],
                borderWidth: 1,
                borderRadius: 5,
                borderColor: 'rgba(0,0,0,0)',
                backgroundColor: gradientPedidosCancelados
            }
            ]
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
    activePedidosGraphic = chartPedidosHorizontalBar;
    activePedidosGraphicFunction = pedidosHorizontalBar;
    return chartPedidosHorizontalBar;
}

// Pie Graphic - Produtos
var chartPedidosPie;
function pedidosPie() {
    var canvas = $('#chart-pedidos');
    var ctxPedidos = document.getElementById('chart-pedidos').getContext('2d');
    var gradientPedidosTodos = ctxPedidos.createRadialGradient(canvas.outerHeight(), canvas.outerHeight(), canvas.outerHeight(), canvas.outerHeight(), canvas.outerHeight(), canvas.outerHeight() / 2);
    gradientPedidosTodos.addColorStop(0, "#ffba00");
    gradientPedidosTodos.addColorStop(0.5, "#fc9244");
    gradientPedidosTodos.addColorStop(1, "rgb(255, 0, 68)");
    var gradientPedidosCancelados = ctxPedidos.createRadialGradient(canvas.outerHeight(), canvas.outerHeight(), canvas.outerHeight(), canvas.outerHeight(), canvas.outerHeight(), 0);
    gradientPedidosCancelados.addColorStop(0, "rgb(30,235,163)");
    gradientPedidosCancelados.addColorStop(0.5, "rgb(23,175,130)");
    gradientPedidosCancelados.addColorStop(1, "rgb(17,103,210)");
    chartPedidosPie = new Chart(ctxPedidos, {
        type: 'pie',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [{
                label: 'Pedidos (Todos)',
                data: [12200, 19110, 3666, 5321, 2678, 3901, 11109, 15000, 3211, 1564, 21039, 16023],
                borderWidth: 2,
                borderRadius: 10,
                borderColor: GraphBorderColor,
                backgroundColor: gradientPedidosTodos,
                hoverOffset: 4
            },
            {
                label: 'Pedidos Cancelados',
                data: [12200, 19110, 3666, 5321, 2678, 3901, 11109, 15000, 3211, 1564, 21039, 16023],
                borderWidth: 2,
                borderRadius: 10,
                borderColor: GraphBorderColor,
                backgroundColor: gradientPedidosCancelados,
                hoverOffset: 4
            }
            ]
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
                            return tooltipItem.dataset.label + ": " + tooltipItem.formattedValue;
                        }
                    }
                },
                legend: {
                    display: false
                }
            }
        }
    })
    activePedidosGraphic = chartPedidosPie;
    activePedidosGraphicFunction = pedidosPie;
    return chartPedidosPie;
}