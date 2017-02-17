var chartWeight;
var chartVortex;
$(function() {
    chartWeight = new Highcharts.Chart({
        credits:
        {
            enabled:false
        },

        title: {
            text: '容器质量曲线'
        },
        xAxis: {
            type: 'datetime',
            gridLineWidth: 1,

            dateTimeLabelFormats : {
                second: '%M:%S',
                minute: '%M:%S',
                hour: '%M:%S',
                day: '%M:%S',
                week: '%M:%S',
                month: '%M:%S',
                year: '%M:%S'
            },
            title: {
                text: '时间'
            }
        },
        yAxis: {
            min:0,
            max:30,
            title: {
                text: '质量/kg'
            }
        },
        tooltip: {
            shared: true,
            xDateFormat: '%M:%S',
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                lineWidth: 1,
                marker: {
                    enabled: false
                },
                shadow: false,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },

        chart: {
            zoomType: 'x',
            spacingRight: 20,
            marginBottom: 20,
            renderTo: 'divChartWeight',
            events:{}

        },

        series: [createEmptySeries()]
    });
});

$(function() {
    chartVortex = new Highcharts.Chart({
        credits:
        {
            enabled:false
        },

        title: {
            text: '涡街流量计流量曲线'
        },
        xAxis: {
            type: 'datetime',
            gridLineWidth: 1,

            dateTimeLabelFormats : {
                second: '%M:%S',
                minute: '%M:%S',
                hour: '%M:%S',
                day: '%M:%S',
                week: '%M:%S',
                month: '%M:%S',
                year: '%M:%S'
            },
            title: {
                text: '时间'
            }
        },
        yAxis: {
            min:0,
            max:3,
            title: {
                text: '流量(m^3/h)'
            }
        },
        tooltip: {
            shared: true,
            xDateFormat: '%M:%S',
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                lineWidth: 1,
                marker: {
                    enabled: false
                },
                shadow: false,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },

        chart: {
            zoomType: 'x',
            spacingRight: 20,
            marginBottom: 20,
            renderTo: 'divChartVortex',
            events:{}

        },

        series: [createEmptySeries()]
    });

});

function createEmptySeries() {
    var series = new Array();
    series.pointInterval = 1000;
    series.pointStart = 0;
    series.data = [];
    series.color = '#5555aa';
    for (i = 0; i <= 100; i += 1) {
        series.data.push({
            x: 0,
            y: 0
        });
    }
    return series;
};