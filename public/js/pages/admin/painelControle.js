$(".sidebar-link.painel-controle").addClass("active").addClass("only");
$(".sidebar-link.painel-controle-home").addClass("active");

var GraphTicksColor = 'black';
var GraphBorderColor = 'rgba(255, 255, 255, .9)';

var activeReceitaVendasGraphic;
var activeReceitaVendasGraphicFunction;
var activeQuantidadeVendasGraphic;
var activeQuantidadeVendasGraphicFunction;
var activeUsersLocationGraphic;
var activeUsersLocationGraphicFunction;
var activeUsersLocationGraphicId;

receitaVendasVerticalBar();
quantidadeVendasVerticalBar();
usersLocationMap();

$(window).on("load", function () {
    setTimeout(() => {
        usersLocationMap().reflow();
    }, 100);
    $(".content-to-minimize").each(function () {
        $(this).css("height", $(this).outerHeight() + "px");
    })
})

$(window).on("resize", function () {
    setTimeout(() => {
        usersLocationMap().reflow();
    }, 300);
    reloadGraphic(activeReceitaVendasGraphic, activeReceitaVendasGraphicFunction, "receita-vendas");
    reloadGraphic(activeQuantidadeVendasGraphic, activeQuantidadeVendasGraphicFunction, "quantidade-vendas");
    $(".content-to-minimize").each(function () {
        $(this).css("height", $(this).outerHeight() + "px");
    })
})

$("#cp-dark-content").on("click", function () {
    if ($(this).prop("checked")) {
        GraphTicksColor = "rgba(255, 255, 255, .9)";
        GraphBorderColor = "#1a1a1a";
    } else {
        GraphTicksColor = "black";
        GraphBorderColor = "rgba(255, 255, 255, .9)"
    }
    reloadGraphic(activeReceitaVendasGraphic, activeReceitaVendasGraphicFunction, "receita-vendas");
    reloadGraphic(activeQuantidadeVendasGraphic, activeQuantidadeVendasGraphicFunction, "quantidade-vendas");
    reloadGraphic(activeUsersLocationGraphic, activeUsersLocationGraphicFunction, activeUsersLocationGraphicId, false, "users-location-graph");
})

// Botões Gráficos Receita Vendas
$("#btn-vertical-bar-receita-vendas").on("click", function () {
    reloadGraphic(activeReceitaVendasGraphic, receitaVendasVerticalBar, "receita-vendas", $(this));
})
$("#btn-horizontal-bar-receita-vendas").on("click", function () {
    reloadGraphic(activeReceitaVendasGraphic, receitaVendasHorizontalBar, "receita-vendas", $(this));
})
$("#btn-pie-receita-vendas").on("click", function () {
    reloadGraphic(activeReceitaVendasGraphic, receitaVendasPie, "receita-vendas", $(this));
})

// Botões Gráficos Quantidade Vendas
$("#btn-vertical-bar-quantidade-vendas").on("click", function () {
    reloadGraphic(activeQuantidadeVendasGraphic, quantidadeVendasVerticalBar, "quantidade-vendas", $(this));
})
$("#btn-horizontal-bar-quantidade-vendas").on("click", function () {
    reloadGraphic(activeQuantidadeVendasGraphic, quantidadeVendasHorizontalBar, "quantidade-vendas", $(this));
})
$("#btn-pie-quantidade-vendas").on("click", function () {
    reloadGraphic(activeQuantidadeVendasGraphic, quantidadeVendasPie, "quantidade-vendas", $(this));
})

// Botões Gráficos Usuários por Estado
$("#btn-map-users-location").on("click", function () {
    $(".content-to-minimize").each(function () {
        $(this).css("height", $(this).outerHeight() + "px");
    })
    $("#users-location-map").css("display", "block");
    reloadGraphic(activeUsersLocationGraphic, usersLocationMap, "users-location-map", $(this), "users-location");
    $("#users-location-canvas").css("display", "none");
    usersLocationMap().reflow();
})
$("#btn-pie-users-location").on("click", function () {
    $(".content-to-minimize").each(function () {
        $(this).css("height", $(this).outerHeight() + "px");
    })
    $("#users-location-map").css("display", "none");
    $("#users-location-canvas").css("display", "block");
    reloadGraphic(activeUsersLocationGraphic, usersLocationPie, "users-location-canvas", $(this), "users-location");
})

// Preço do produto do card "Produtos recém adicionados"
$(".recently-products").css("height", $(".recently-products").outerHeight());

/******************************************* FUNÇÕES ********************************************************/
// Recarregar o Gráfico
function reloadGraphic(activeGraphic, graphicFunction, idCanvasGraphic, button, idCard) {
    if (button) {
        $("#card-" + (idCard ? idCard : idCanvasGraphic) + " button").each(function () {
            if ($(this).hasClass("active"))
                $(this).removeClass("active")
        })
        button.addClass("active");
    }
    activeGraphic.destroy();
    $("#" + idCanvasGraphic).css("opacity", "0");
    $("#" + idCanvasGraphic).animate({ opacity: "1" }, 300);
    graphicFunction();
}

/******************************************* GRÁFICOS ********************************************************/

// ------------- RECEITA DE VENDAS
// Vertical Bar Graphic - Receita de Vendas
var chartReceitaVendasVerticalBar;
function receitaVendasVerticalBar() {
    var canvas = $('#receita-vendas');
    var ctxReceitaVendas = document.getElementById('receita-vendas').getContext('2d');
    var gradientReceitaVendas = ctxReceitaVendas.createLinearGradient(0, 0, 0, canvas.outerHeight());
    gradientReceitaVendas.addColorStop(0, "#ffba00");
    gradientReceitaVendas.addColorStop(0.45, "#fc9244");
    gradientReceitaVendas.addColorStop(1, "rgb(255, 0, 68)");
    chartReceitaVendasVerticalBar = new Chart(ctxReceitaVendas, {
        type: 'bar',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [{
                label: 'Receita',
                data: [12200, 19110, 3666, 5321, 2678, 3901, 11109, 15000, 3211, 1564, 21039, 16023],
                borderWidth: 1,
                borderRadius: 5,
                borderColor: 'rgba(0,0,0,0)',
                backgroundColor: gradientReceitaVendas
            },
            ]
        },
        options: {
            indexAxis: 'x',
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: 10,
                    ticks: {
                        callback: function (value, index, values) {
                            return 'R$ ' + value;
                        },
                        color: GraphTicksColor
                    },
                },
                x: {
                    ticks: {
                        color: GraphTicksColor,
                        autoSkip: false
                    }
                }
            },
            plugins: {
                filler: {
                    propagate: true
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return "Receita: R$ " + tooltipItem.formattedValue;
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

// Horizontal Bar Graphic - Receita de Vendas
var chartReceitaVendasHorizontalBar;
function receitaVendasHorizontalBar() {
    var canvas = $('#receita-vendas');
    var ctxReceitaVendas = document.getElementById('receita-vendas').getContext('2d');
    var gradientReceitaVendas = ctxReceitaVendas.createLinearGradient(0, 0, canvas.outerWidth(), 0);
    gradientReceitaVendas.addColorStop(0, "rgb(255, 0, 68)");
    gradientReceitaVendas.addColorStop(0.5, "#fc9244");
    gradientReceitaVendas.addColorStop(1, "#ffba00");
    chartReceitaVendasHorizontalBar = new Chart(ctxReceitaVendas, {
        type: 'bar',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [{
                label: 'Receita',
                data: [12200, 19110, 3666, 5321, 2678, 3901, 11109, 15000, 3211, 1564, 21039, 16023],
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: gradientReceitaVendas
            },
            ]
        },
        options: {
            indexAxis: 'y',
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: 10,
                    ticks: {
                        color: GraphTicksColor
                    }
                },
                x: {
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
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return "Receita: R$ " + tooltipItem.formattedValue;
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

// Pie Graphic - Receita de Vendas
var chartReceitaVendasPie;
function receitaVendasPie() {
    var canvas = $('#receita-vendas');
    var ctxReceitaVendas = document.getElementById('receita-vendas').getContext('2d');
    var gradientReceitaVendas = ctxReceitaVendas.createRadialGradient(canvas.outerHeight(), canvas.outerHeight(), canvas.outerHeight(), canvas.outerHeight(), canvas.outerHeight(), 0);
    gradientReceitaVendas.addColorStop(0, "rgb(255, 0, 68)");
    gradientReceitaVendas.addColorStop(0.5, "#fc9244");
    gradientReceitaVendas.addColorStop(1, "#ffba00");
    chartReceitaVendasPie = new Chart(ctxReceitaVendas, {
        type: 'pie',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [{
                label: 'Receita',
                data: [12200, 19110, 3666, 5321, 2678, 3901, 11109, 15000, 3211, 1564, 21039, 16023],
                borderWidth: 2,
                borderRadius: 10,
                borderColor: GraphBorderColor,
                backgroundColor: gradientReceitaVendas,
                hoverOffset: 4
            },
            ]
        },
        options: {
            y: {
                ticks: {
                    callback: function (value, index, values) {
                        return 'R$ ' + value;
                    }
                }
            },
            plugins: {
                filler: {
                    propagate: true
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        title: function (tooltipItem) {
                            return tooltipItem[0].label;
                        },
                        label: function (tooltipItem) {
                            return "Receita: R$ " + tooltipItem.formattedValue;
                        }
                    }
                }
            }
        }
    })
    activeReceitaVendasGraphic = chartReceitaVendasPie;
    activeReceitaVendasGraphicFunction = receitaVendasPie;
    return chartReceitaVendasPie;
}


// ------------- QUANTIDADE DE VENDAS
// Vertical Bar Graphic - Quantidade de Vendas
var chartQuantidadeVendasVerticalBar;
function quantidadeVendasVerticalBar() {
    var canvas = $('#quantidade-vendas');
    var ctxQuantidadeVendas = document.getElementById('quantidade-vendas').getContext('2d');
    var gradientQuantidadeVendas = ctxQuantidadeVendas.createLinearGradient(0, 0, 0, canvas.outerHeight());
    gradientQuantidadeVendas.addColorStop(0, "#ffba00");
    gradientQuantidadeVendas.addColorStop(0.45, "#fc9244");
    gradientQuantidadeVendas.addColorStop(1, "rgb(255, 0, 68)");
    chartQuantidadeVendasVerticalBar = new Chart(ctxQuantidadeVendas, {
        type: 'bar',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [{
                label: 'Quantidade',
                data: [61, 140, 39, 89, 220, 221, 54, 105, 230, 198, 109, 99],
                borderWidth: 1,
                borderRadius: 5,
                borderColor: 'rgba(0,0,0,0)',
                backgroundColor: gradientQuantidadeVendas
            },
            ]
        },
        options: {
            indexAxis: 'x',
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: 10,
                    ticks: {
                        color: GraphTicksColor
                    }
                },
                x: {
                    ticks: {
                        color: GraphTicksColor,
                        autoSkip: false
                    }
                }
            },
            plugins: {
                filler: {
                    propagate: true
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return "Quantidade: " + tooltipItem.formattedValue;
                        }
                    }
                }
            }
        }
    })
    activeQuantidadeVendasGraphic = chartQuantidadeVendasVerticalBar;
    activeQuantidadeVendasGraphicFunction = quantidadeVendasVerticalBar;
    return chartQuantidadeVendasVerticalBar;
}

// Horizontal Bar Graphic - Quantidade de Vendas
var chartQuantidadeVendasHorizontalBar;
function quantidadeVendasHorizontalBar() {
    var canvas = $('#quantidade-vendas');
    var ctxQuantidadeVendas = document.getElementById('quantidade-vendas').getContext('2d');
    var gradientQuantidadeVendas = ctxQuantidadeVendas.createLinearGradient(0, 0, canvas.outerWidth(), 0);
    gradientQuantidadeVendas.addColorStop(0, "rgb(255, 0, 68)");
    gradientQuantidadeVendas.addColorStop(0.5, "#fc9244");
    gradientQuantidadeVendas.addColorStop(1, "#ffba00");
    chartQuantidadeVendasHorizontalBar = new Chart(ctxQuantidadeVendas, {
        type: 'bar',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [{
                label: 'Quantidade',
                data: [61, 140, 39, 89, 220, 221, 54, 105, 230, 198, 109, 99],
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: gradientQuantidadeVendas
            },
            ]
        },
        options: {
            indexAxis: 'y',
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: 10,
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
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return "Quantidade: " + tooltipItem.formattedValue;
                        }
                    }
                }
            }
        }
    })
    activeQuantidadeVendasGraphic = chartQuantidadeVendasHorizontalBar;
    activeQuantidadeVendasGraphicFunction = quantidadeVendasHorizontalBar;
    return chartQuantidadeVendasHorizontalBar;
}

// Pie Graphic - Quantidade de Vendas
var chartQuantidadeVendasPie;
function quantidadeVendasPie() {
    var canvas = $("#quantidade-vendas");
    var ctxQuantidadeVendas = document.getElementById('quantidade-vendas').getContext('2d');
    var gradientQuantidadeVendas = ctxQuantidadeVendas.createRadialGradient(canvas.outerHeight(), canvas.outerHeight(), canvas.outerHeight(), canvas.outerHeight(), canvas.outerHeight(), 0);
    gradientQuantidadeVendas.addColorStop(0, "rgb(255, 0, 68)");
    gradientQuantidadeVendas.addColorStop(0.5, "#fc9244");
    gradientQuantidadeVendas.addColorStop(1, "#ffba00");
    chartQuantidadeVendasPie = new Chart(ctxQuantidadeVendas, {
        type: 'pie',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [{
                label: 'Quantidade',
                data: [61, 140, 39, 89, 220, 221, 54, 105, 230, 198, 109, 99],
                borderWidth: 2,
                borderRadius: 10,
                borderColor: GraphBorderColor,
                backgroundColor: gradientQuantidadeVendas
            },
            ]
        },
        options: {
            plugins: {
                filler: {
                    propagate: true
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        title: function (tooltipItem) {
                            return tooltipItem[0].label;
                        },
                        label: function (tooltipItem) {
                            return "Quantidade: " + tooltipItem.formattedValue;
                        }
                    }
                },

            }
        }
    })
    activeQuantidadeVendasGraphic = chartQuantidadeVendasPie;
    activeQuantidadeVendasGraphicFunction = quantidadeVendasPie;
    return chartQuantidadeVendasPie;
}

// ------------- USUÁRIOS POR ESTADO

var chartUsersLocationMap;
function usersLocationMap() {

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
    chartUsersLocationMap = Highcharts.mapChart('users-location-map', {
        chart: {
            map: 'countries/br/br-all',
            backgroundColor: GraphBorderColor
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
                    color: GraphTicksColor
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
    activeUsersLocationGraphic = chartUsersLocationMap;
    activeUsersLocationGraphicFunction = usersLocationMap;
    activeUsersLocationGraphicId = 'users-location-map';
    return chartUsersLocationMap;
}

// Pie Graphic - Usuários por estado
var chartUsersLocationPie;
function usersLocationPie() {
    var canvas = $("#users-location-canvas");
    var ctxUsersLocation = document.getElementById('users-location-canvas').getContext('2d');
    var gradientUsersLocation = ctxUsersLocation.createRadialGradient(canvas.outerHeight(), canvas.outerHeight(), canvas.outerHeight(), canvas.outerHeight(), canvas.outerHeight(), 0);
    gradientUsersLocation.addColorStop(0, "rgb(255, 0, 68)");
    gradientUsersLocation.addColorStop(0.5, "#fc9244");
    gradientUsersLocation.addColorStop(1, "#ffba00");
    chartUsersLocationPie = new Chart(ctxUsersLocation, {
        type: 'pie',
        data: {
            labels: ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'],
            datasets: [{
                label: 'Usuários',
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
                borderWidth: 2,
                borderRadius: 10,
                borderColor: GraphBorderColor,
                backgroundColor: gradientUsersLocation
            },
            ]
        },
        options: {
            plugins: {
                filler: {
                    propagate: true
                },
                legend: {
                    display: false
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

            }
        }
    })
    activeUsersLocationGraphic = chartUsersLocationPie;
    activeUsersLocationGraphicFunction = usersLocationPie;
    activeUsersLocationGraphicId = 'users-location-pie';
    return chartUsersLocationPie;
}