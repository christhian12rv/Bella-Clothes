$(".sidebar-link.painel-controle").addClass("active");
$(".sidebar-link.painel-controle-receita-vendas").addClass("active");

var GraphTicksColor = 'black';
var GraphBorderColor = 'rgba(255, 255, 255, .9)';
var radialBackgroundColorGraph = $("#card-receita-vendas").outerHeight();
var activeReceitaVendasGraphic;
var activeReceitaVendasGraphicFunction;
receitaVendasVerticalLine();

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
    reloadGraphic(activeReceitaVendasGraphic, activeReceitaVendasGraphicFunction);
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
    reloadGraphic(activeReceitaVendasGraphic, activeReceitaVendasGraphicFunction);
})

$("#btn-vertical-line-receita-vendas").on("click", function () {
    reloadGraphic(activeReceitaVendasGraphic, receitaVendasVerticalLine, $(this));
})
$("#btn-horizontal-line-receita-vendas").on("click", function () {
    reloadGraphic(activeReceitaVendasGraphic, receitaVendasHorizontalLine, $(this));
})
$("#btn-vertical-bar-receita-vendas").on("click", function () {
    reloadGraphic(activeReceitaVendasGraphic, receitaVendasVerticalBar, $(this));
})
$("#btn-horizontal-bar-receita-vendas").on("click", function () {
    reloadGraphic(activeReceitaVendasGraphic, receitaVendasHorizontalBar, $(this));
})
$("#btn-pie-receita-vendas").on("click", function () {
    reloadGraphic(activeReceitaVendasGraphic, receitaVendasPie, $(this));
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
        $("#card-receita-vendas button").each(function () {
            if ($(this).hasClass("active"))
                $(this).removeClass("active")
        })
        button.addClass("active");
    }
    activeGraphic.destroy();
    $("#chart-receita-vendas").css("opacity", "0");
    $("#chart-receita-vendas").animate({ opacity: "1" }, 300);
    graphicFunction();
}
/******************************************* GRÁFICOS ********************************************************/

// ------------- PEDIDOS
// Vertical Line Graphic - ReceitaVendas
var chartReceitaVendasVerticalLine;
function receitaVendasVerticalLine() {
    var canvas = $('#chart-receita-vendas');
    var ctx = document.getElementById('chart-receita-vendas').getContext('2d');
    var gradientLine = ctx.createLinearGradient(0, 0, 0, canvas.outerHeight());
    gradientLine.addColorStop(0, "#ffba00");
    gradientLine.addColorStop(0.5, "#fc9244");
    gradientLine.addColorStop(1, "rgb(255, 0, 68)");
    var gradientLineFill = ctx.createLinearGradient(0, 0, 0, canvas.outerHeight());
    gradientLineFill.addColorStop(0, "rgba(254,186,68,0.6)");
    gradientLineFill.addColorStop(0.5, "rgba(256,142,68,0.4)");
    gradientLineFill.addColorStop(0.85, "rgba(255, 0, 68, 0.1)");
    gradientLineFill.addColorStop(1, "transparent");
    chartReceitaVendasVerticalLine = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [{
                label: 'Receita de Vendas',
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
                        callback: function (value, index, values) {
                            return 'R$ ' + value;
                        },
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
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return "Receita de Vendas: R$ " + tooltipItem.formattedValue;
                        }
                    }
                }
            },
            legend: {
                borderColor: "blue",
                lineWidth: 20
            }
        }
    })
    activeReceitaVendasGraphic = chartReceitaVendasVerticalLine;
    activeReceitaVendasGraphicFunction = receitaVendasVerticalLine;
    return chartReceitaVendasVerticalLine;
}

// Vertical Line Graphic - ReceitaVendas
var chartReceitaVendasHorizontalLine;
function receitaVendasHorizontalLine() {
    var canvas = $('#chart-receita-vendas');
    var ctx = document.getElementById('chart-receita-vendas').getContext('2d');
    var gradientLine = ctx.createLinearGradient(0, 0, canvas.outerWidth(), 0);
    gradientLine.addColorStop(0, "rgb(255, 0, 68)");
    gradientLine.addColorStop(0.5, "rgb(256,142,68)");
    gradientLine.addColorStop(1, "rgb(254,186,68)");
    var gradientLineFill = ctx.createLinearGradient(0, 0, canvas.outerWidth(), 0);
    gradientLineFill.addColorStop(0, "transparent");
    gradientLineFill.addColorStop(0.15, "rgba(255, 0, 68, 0.1)");
    gradientLineFill.addColorStop(0.5, "rgba(256,142,68,0.4)");
    gradientLineFill.addColorStop(1, "rgba(254,186,68,0.6)");
    chartReceitaVendasHorizontalLine = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [{
                axis: 'y',
                label: 'Receita de Vendas',
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
                        callback: function (value, index, values) {
                            return 'R$ ' + value;
                        },
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
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return "Receita de Vendas: R$ " + tooltipItem.formattedValue;
                        }
                    }
                }
            },
            legend: {
                borderColor: "blue",
                lineWidth: 20
            }
        }
    })
    activeReceitaVendasGraphic = chartReceitaVendasHorizontalLine;
    activeReceitaVendasGraphicFunction = receitaVendasHorizontalLine;
    return chartReceitaVendasHorizontalLine;
}

// Vertical Bar Graphic - ReceitaVendas
var chartReceitaVendasVerticalBar;
function receitaVendasVerticalBar() {
    var canvas = $('#chart-receita-vendas');
    var ctxReceitaVendas = document.getElementById('chart-receita-vendas').getContext('2d');
    var gradientReceitaVendas = ctxReceitaVendas.createLinearGradient(0, 0, 0, canvas.outerHeight());
    gradientReceitaVendas.addColorStop(0, "#ffba00");
    gradientReceitaVendas.addColorStop(0.45, "#fc9244");
    gradientReceitaVendas.addColorStop(1, "rgb(255, 0, 68)");
    chartReceitaVendasVerticalBar = new Chart(ctxReceitaVendas, {
        type: 'bar',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [{
                label: 'Receita de Vendas',
                data: [12200, 19110, 3666, 5321, 2678, 3901, 11109, 15000, 3211, 1564, 21039, 16023],
                borderWidth: 1,
                borderRadius: 5,
                borderColor: 'rgba(0,0,0,0)',
                backgroundColor: gradientReceitaVendas
            }]
        },
        options: {
            indexAxis: 'x',
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function (value, index, values) {
                            return 'R$ ' + value;
                        },
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
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return "Receita de Vendas: R$ " + tooltipItem.formattedValue;
                        }
                    }
                }
            }
        }
    })
    activeReceitaVendasGraphic = chartReceitaVendasVerticalBar;
    activeReceitaVendasGraphicFunction = receitaVendasVerticalBar;
    return chartReceitaVendasVerticalBar;
}

// Horizontal Bar Graphic - ReceitaVendas
var chartReceitaVendasHorizontalBar;
function receitaVendasHorizontalBar() {
    var canvas = $('#chart-receita-vendas');
    var ctxReceitaVendas = document.getElementById('chart-receita-vendas').getContext('2d');
    var gradientReceitaVendas = ctxReceitaVendas.createLinearGradient(0, 0, canvas.outerWidth(), 0);
    gradientReceitaVendas.addColorStop(0, "rgb(255, 0, 68)");
    gradientReceitaVendas.addColorStop(0.45, "#fc9244");
    gradientReceitaVendas.addColorStop(1, "#ffba00");
    chartReceitaVendasHorizontalBar = new Chart(ctxReceitaVendas, {
        type: 'bar',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [{
                label: 'Receita de Vendas',
                data: [12200, 19110, 3666, 5321, 2678, 3901, 11109, 15000, 3211, 1564, 21039, 16023],
                borderWidth: 1,
                borderRadius: 5,
                borderColor: 'rgba(0,0,0,0)',
                backgroundColor: gradientReceitaVendas
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
                        callback: function (value, index, values) {
                            return 'R$ ' + value;
                        },
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
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return "Receita de Vendas: R$ " + tooltipItem.formattedValue;
                        }
                    }
                }
            }
        }
    })
    activeReceitaVendasGraphic = chartReceitaVendasHorizontalBar;
    activeReceitaVendasGraphicFunction = receitaVendasHorizontalBar;
    return chartReceitaVendasHorizontalBar;
}

// Pie Graphic - Produtos
var chartReceitaVendasPie;
function receitaVendasPie() {
    var canvas = $('#chart-receita-vendas');
    var ctxReceitaVendas = document.getElementById('chart-receita-vendas').getContext('2d');
    var gradientReceitaVendas = ctxReceitaVendas.createRadialGradient(canvas.outerHeight(), canvas.outerHeight(), canvas.outerHeight(), canvas.outerHeight(), canvas.outerHeight(), canvas.outerHeight() / 2);
    gradientReceitaVendas.addColorStop(0, "#ffba00");
    gradientReceitaVendas.addColorStop(0.5, "#fc9244");
    gradientReceitaVendas.addColorStop(1, "rgb(255, 0, 68)");
    chartReceitaVendasPie = new Chart(ctxReceitaVendas, {
        type: 'pie',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [{
                label: 'Receita de Vendas',
                data: [12200, 19110, 3666, 5321, 2678, 3901, 11109, 15000, 3211, 1564, 21039, 16023],
                borderWidth: 2,
                borderRadius: 10,
                borderColor: GraphBorderColor,
                backgroundColor: gradientReceitaVendas,
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
                            return "Receita de Vendas: R$ " + tooltipItem.formattedValue;
                        }
                    }
                },
                legend: {
                    display: false
                }
            }
        }
    })
    activeReceitaVendasGraphic = chartReceitaVendasPie;
    activeReceitaVendasGraphicFunction = receitaVendasPie;
    return chartReceitaVendasPie;
}