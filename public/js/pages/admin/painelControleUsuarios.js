$(".sidebar-link.painel-controle").addClass("active");
$(".sidebar-link.painel-controle-usuarios").addClass("active");

var GraphTicksColor = 'black';
var GraphBorderColor = 'rgba(255, 255, 255, .9)';
var radialBackgroundColorGraph = $("#card-usuarios").outerHeight();
var activeUsuariosGraphic;
var activeUsuariosGraphicFunction;
usuariosVerticalLine();

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
    reloadGraphic(activeUsuariosGraphic, activeUsuariosGraphicFunction);
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
    reloadGraphic(activeUsuariosGraphic, activeUsuariosGraphicFunction);
})

$("#btn-vertical-line-usuarios").on("click", function () {
    reloadGraphic(activeUsuariosGraphic, usuariosVerticalLine, "chart-usuarios", $(this));
})
$("#btn-horizontal-line-usuarios").on("click", function () {
    reloadGraphic(activeUsuariosGraphic, usuariosHorizontalLine, "chart-usuarios", $(this));
})
$("#btn-vertical-bar-usuarios").on("click", function () {
    reloadGraphic(activeUsuariosGraphic, usuariosVerticalBar, "chart-usuarios", $(this));
})
$("#btn-horizontal-bar-usuarios").on("click", function () {
    reloadGraphic(activeUsuariosGraphic, usuariosHorizontalBar, "chart-usuarios", $(this));
})
$("#btn-pie-usuarios").on("click", function () {
    reloadGraphic(activeUsuariosGraphic, usuariosPie, "chart-usuarios", $(this));
})
$("#btn-map-usuarios").on("click", function () {
    $("#chart-usuarios-map").css("display", "block");
    reloadGraphic(activeUsuariosGraphic, usuariosMap, "chart-usuarios-map", $(this), "card-usuarios");
    $("#chart-usuarios").css("display", "none");
    usuariosMap().reflow();
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

function reloadGraphic(activeGraphic, graphicFunction, idCanvasGraphic, button, idCard) {
    if (button) {
        if (button.attr("id") == "btn-map-usuarios") {
            if ($("#chart-usuarios").css("display", "block")) {
                $("#chart-usuarios").css("display", "none");
                $("#chart-usuarios-map").css("display", "block");
            }
        } else {
            if ($("#chart-usuarios-map").css("display", "block")) {
                $("#chart-usuarios-map").css("display", "none");
                $("#chart-usuarios").css("display", "block");
            }
        }
        $("#card-usuarios button").each(function () {
            if ($(this).hasClass("active"))
                $(this).removeClass("active")
        })
        button.addClass("active");
    }
    activeGraphic.destroy();
    if (idCanvasGraphic) {
        $("#" + idCanvasGraphic).css("opacity", "0");
        $("#" + idCanvasGraphic).animate({ opacity: "1" }, 300);
    }
    graphicFunction();
}
/******************************************* GRÁFICOS ********************************************************/

// ------------- PEDIDOS
// Vertical Line Graphic - Usuarios
var chartUsuariosVerticalLine;
function usuariosVerticalLine() {
    var canvas = $('#chart-usuarios');
    var ctx = document.getElementById('chart-usuarios').getContext('2d');
    var gradientLine = ctx.createLinearGradient(0, 0, 0, canvas.outerHeight());
    gradientLine.addColorStop(0, "#ffba00");
    gradientLine.addColorStop(0.5, "#fc9244");
    gradientLine.addColorStop(1, "rgb(255, 0, 68)");
    var gradientLineFill = ctx.createLinearGradient(0, 0, 0, canvas.outerHeight());
    gradientLineFill.addColorStop(0, "rgba(254,186,68,0.6)");
    gradientLineFill.addColorStop(0.5, "rgba(256,142,68,0.4)");
    gradientLineFill.addColorStop(0.85, "rgba(255, 0, 68, 0.1)");
    gradientLineFill.addColorStop(1, "transparent");
    chartUsuariosVerticalLine = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [{
                label: 'Usuários',
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
    activeUsuariosGraphic = chartUsuariosVerticalLine;
    activeUsuariosGraphicFunction = usuariosVerticalLine;
    return chartUsuariosVerticalLine;
}

// Vertical Line Graphic - Usuarios
var chartUsuariosHorizontalLine;
function usuariosHorizontalLine() {
    var canvas = $('#chart-usuarios');
    var ctx = document.getElementById('chart-usuarios').getContext('2d');
    var gradientLine = ctx.createLinearGradient(0, 0, canvas.outerWidth(), 0);
    gradientLine.addColorStop(0, "rgb(255, 0, 68)");
    gradientLine.addColorStop(0.5, "rgb(256,142,68)");
    gradientLine.addColorStop(1, "rgb(254,186,68)");
    var gradientLineFill = ctx.createLinearGradient(0, 0, canvas.outerWidth(), 0);
    gradientLineFill.addColorStop(0, "transparent");
    gradientLineFill.addColorStop(0.15, "rgba(255, 0, 68, 0.1)");
    gradientLineFill.addColorStop(0.5, "rgba(256,142,68,0.4)");
    gradientLineFill.addColorStop(1, "rgba(254,186,68,0.6)");
    chartUsuariosHorizontalLine = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [{
                axis: 'y',
                label: 'Usuários',
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
    activeUsuariosGraphic = chartUsuariosHorizontalLine;
    activeUsuariosGraphicFunction = usuariosHorizontalLine;
    return chartUsuariosHorizontalLine;
}

// Vertical Bar Graphic - Usuarios
var chartUsuariosVerticalBar;
function usuariosVerticalBar() {
    var canvas = $('#chart-usuarios');
    var ctxUsuarios = document.getElementById('chart-usuarios').getContext('2d');
    var gradientUsuarios = ctxUsuarios.createLinearGradient(0, 0, 0, canvas.outerHeight());
    gradientUsuarios.addColorStop(0, "#ffba00");
    gradientUsuarios.addColorStop(0.45, "#fc9244");
    gradientUsuarios.addColorStop(1, "rgb(255, 0, 68)");
    chartUsuariosVerticalBar = new Chart(ctxUsuarios, {
        type: 'bar',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [{
                label: 'Usuários',
                data: [12200, 19110, 3666, 5321, 2678, 3901, 11109, 15000, 3211, 1564, 21039, 16023],
                borderWidth: 1,
                borderRadius: 5,
                borderColor: 'rgba(0,0,0,0)',
                backgroundColor: gradientUsuarios
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
    activeUsuariosGraphic = chartUsuariosVerticalBar;
    activeUsuariosGraphicFunction = usuariosVerticalBar;
    return chartUsuariosVerticalBar;
}

// Horizontal Bar Graphic - Usuarios
var chartUsuariosHorizontalBar;
function usuariosHorizontalBar() {
    var canvas = $('#chart-usuarios');
    var ctxUsuarios = document.getElementById('chart-usuarios').getContext('2d');
    var gradientUsuarios = ctxUsuarios.createLinearGradient(0, 0, canvas.outerWidth(), 0);
    gradientUsuarios.addColorStop(0, "rgb(255, 0, 68)");
    gradientUsuarios.addColorStop(0.45, "#fc9244");
    gradientUsuarios.addColorStop(1, "#ffba00");
    chartUsuariosHorizontalBar = new Chart(ctxUsuarios, {
        type: 'bar',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [{
                label: 'Usuários',
                data: [12200, 19110, 3666, 5321, 2678, 3901, 11109, 15000, 3211, 1564, 21039, 16023],
                borderWidth: 1,
                borderRadius: 5,
                borderColor: 'rgba(0,0,0,0)',
                backgroundColor: gradientUsuarios
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
    activeUsuariosGraphic = chartUsuariosHorizontalBar;
    activeUsuariosGraphicFunction = usuariosHorizontalBar;
    return chartUsuariosHorizontalBar;
}

// Pie Graphic - Usuários
var chartUsuariosPie;
function usuariosPie() {
    var canvas = $('#chart-usuarios');
    var ctxUsuarios = document.getElementById('chart-usuarios').getContext('2d');
    var gradientUsuarios = ctxUsuarios.createRadialGradient(canvas.outerHeight(), canvas.outerHeight(), canvas.outerHeight(), canvas.outerHeight(), canvas.outerHeight(), canvas.outerHeight() / 2);
    gradientUsuarios.addColorStop(0, "#ffba00");
    gradientUsuarios.addColorStop(0.5, "#fc9244");
    gradientUsuarios.addColorStop(1, "rgb(255, 0, 68)");
    chartUsuariosPie = new Chart(ctxUsuarios, {
        type: 'pie',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [{
                label: 'Usuários',
                data: [12200, 19110, 3666, 5321, 2678, 3901, 11109, 15000, 3211, 1564, 21039, 16023],
                borderWidth: 2,
                borderRadius: 10,
                borderColor: GraphBorderColor,
                backgroundColor: gradientUsuarios,
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
                            return "Usuários: " + tooltipItem.formattedValue;
                        }
                    }
                },
                legend: {
                    display: false
                }
            }
        }
    })
    activeUsuariosGraphic = chartUsuariosPie;
    activeUsuariosGraphicFunction = usuariosPie;
    return chartUsuariosPie;
}

// Map Graphic - Usuários
var chartUsuariosMap;
function usuariosMap() {
    var data = [
        ['br-sp', 0],
        ['br-ma', 1],
        ['br-pa', 2],
        ['br-sc', 3],
        ['br-ba', 4],
        ['br-ap', 5],
        ['br-ms', 6],
        ['br-mg', 7],
        ['br-go', 8],
        ['br-rs', 9],
        ['br-to', 10],
        ['br-pi', 11],
        ['br-al', 12],
        ['br-pb', 13],
        ['br-ce', 14],
        ['br-se', 15],
        ['br-rr', 16],
        ['br-pe', 17],
        ['br-pr', 18],
        ['br-es', 19],
        ['br-rj', 20],
        ['br-rn', 21],
        ['br-am', 22],
        ['br-mt', 23],
        ['br-df', 24],
        ['br-ac', 25],
        ['br-ro', 26]
    ];

    // Create the chart
    chartUsuariosMap = Highcharts.mapChart('chart-usuarios-map', {
        chart: {
            map: 'countries/br/br-all',
            backgroundColor: GraphBorderColor,
            height: 100 + '%'
        },
        title: {
            display: false,
            text: ''
        },

        navigation: {
            buttonOptions: {
                enabled: false
            }
        },

        mapNavigation: {
            enabled: true,
            buttonOptions: {
                style: {
                    fill: "blue",
                    color: "blue",
                    backgroundColor: "blue",
                    stroke: "blue"
                }
            },
            buttons: {
                zoomIn: {
                    onclick: function () {
                        this.mapZoom(.7)
                    }
                }
            }
        },

        colorAxis: {
            min: 0,
            minColor: '#ffd768',
            maxColor: '#ff9100',
        },

        plotOptions: {
            map: {
                dataLabels: {
                    color: 'white'
                }
            }
        },

        credits: {
            enabled: false
        },

        tooltip: {
            style: {
                color: 'white'

            },
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderRadius: '10',
            borderWidth: '0'
        },

        series: [{
            data: data,
            name: 'Usuários',
            label: {
                style: {
                    fontWeight: 'bold'
                }
            },
            states: {
                hover: {
                    color: '#252d47'
                }
            },
            dataLabels: {
                enabled: true,
                format: '{point.properties.postal-code}',
                color: GraphTicksColor,
                style: {
                    color: 'black',
                    textOutline: 'none'
                }
            },
            borderColor: GraphBorderColor
        }]
    })
    activeUsuarioGraphic = chartUsuariosMap;
    activeUsuarioGraphicFunction = usuariosMap;
    activeUsuarioGraphicId = 'chart-usuarios-map';
    return chartUsuariosMap;
}