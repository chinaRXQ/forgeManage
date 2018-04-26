/**
 * Created by jsw on 2017-08-03.
 */
function AddEchart(xad,sd,id)
{
    document.getElementById(id).innerHTML ="";
    this.generateEchart(xad,sd,id);
}

AddEchart.prototype.constructor = AddEchart;
AddEchart.prototype = {
    generateEchart: function(xad,sd,id)
    {
        var myChart = echarts.init(document.getElementById(id));

        // 指定图表的配置项和数据
        option = {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['数值'],
                textStyle: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    fontSize: 14,
                    color:"#fff"
                }
        },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xad,
                axisLine:{
                    lineStyle:{
                        color:'white',
                        width:2
                    }
                },
            },
            yAxis: {
                type: 'value',
                axisLine:{
                    lineStyle:{
                        color:'white',
                        width:2
                    }
                }
            },
            series: [
                {
                    name:'数值',
                    type:'line',
                    stack: '总量',
                    data:sd,
                    itemStyle : {
                        normal : {
                            lineStyle:{
                                color:'#ffff00'
                            }
                        }
                    },
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

    }
};