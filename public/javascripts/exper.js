//------------------------------------动态图表的内容-------------------------------------------------------------------->
$(function () {
    $(document).ready(function () {   //此行的目的在于防止文档在完全加载之前就运行jQuery
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });

        $('#containerT').highcharts({    //通过DOM调用下面id为contatiner,以函数的形式
            chart: {                      //指定图表的样式，图表的宽高是根据容器的大小设置的
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,           //右边距
                events: {              //触发的事件
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = Math.random();
                            series.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
            title: {
                text: null     //指定图标的标题
            },
            credits:{
        	    enabled:false
        },
            xAxis: {
                type: 'datetime',             //指定x轴的内容
                tickPixelInterval: 50        //刻度间隔
            },
            yAxis: {
                title: {              //y轴标题
                    text: 'Value'
                },
                plotLines: [{     //标示线
                    value: 0,    //定义在哪个值上的标示线
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {                //数据提示框
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>'+
                        Highcharts.numberFormat(this.y,2);
                }
            },
            legend: {       //图例
                enabled: false
            },
            exporting: {      //导出功能按钮
                enabled: true
            },
            series: [{                        //指定数据列
                name: 'Random data',           //数据列名，会显示在数据提示框和图例中
                data: (function () {           //数据
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()
                        });
                    }
                    return data;
                }())
            }]
        });
    });
});

//---------------------------------------以下为仪表的js文件--------------------------------------------------------------------------------->
$(function () {

    $('#container').highcharts({

        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        exporting: {      //导出功能按钮
                enabled: false
            },
        credits:{
        	enabled:false
        },
        title: {
            text: null
        },

        pane: {
            startAngle: -150,
            endAngle: 150,
            background: [{
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#FFF'],
                        [1, '#333']
                    ]
                },
                borderWidth: 0,
                outerRadius: '109%'
            }, {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#333'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 1,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#DDD',
                borderWidth: 0,
                outerRadius: '105%',
                innerRadius: '103%'
            }]
        },

        // the value axis
        yAxis: {
            min: 0,
            max: 200,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto'
            },
            title: {
                text: 'km/h'
            },
            plotBands: [{
                from: 0,
                to: 120,
                color: '#55BF3B' // green
            }, {
                from: 120,
                to: 160,
                color: '#DDDF0D' // yellow
            }, {
                from: 160,
                to: 200,
                color: '#DF5353' // red
            }]
        },

        series: [{      //指定数据列
            name: 'Speed',
            data: [80],
            tooltip: {
                valueSuffix: ' km/h'
            }
        }]

    },
    // Add some life
    function (chart) {
        if (!chart.renderer.forExport) {
            setInterval(function () {
                var point = chart.series[0].points[0],
                    newVal,
                    inc = Math.round((Math.random() - 0.5) * 20);

                newVal = point.y + inc;
                if (newVal < 0 || newVal > 200) {
                    newVal = point.y - inc;
                }
                point.update(newVal);

            }, 3000);
        }
    });
});