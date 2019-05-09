<template>
    <div id="myChart" ref="myChart" :style="{width: '500px', height: '300px'}"></div>
</template>

<script>
    import echarts from 'echarts'
    const style = {
        color: '#000000',
        //字体风格,'normal','italic','oblique'
        fontStyle: 'normal',
        //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
        fontWeight: 'normal',
        //字体系列
        fontFamily: 'PingFang',
        //字体大小
        fontSize: 18
    };
    var dataAxis = [];
    export default {
        name: "pieChart",
        mounted(){
            this.$nextTick( () => {
                this.drawPie();
            })
            // this.init();
        },
        methods: {
            drawPie(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(this.$refs.myChart)
                // 绘制图表
                myChart.setOption({
                    title: {
                        text: '',
                        subtext: '',
                        left: '6%',
                        top: '2%',
                        textStyle: style
                    },
                    color:['#11BE5A', '#F63F45','#FFD018','#2CA4EF'],
                    legend: {
                        data:['合格','不合格','待复检','待处理']
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '5%',
                        containLabel: true
                    },
                    xAxis: {
                        data: dataAxis,
                        axisLabel: {
                            inside: false,
                            textStyle: {
                                color: '#085DBA'
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            onZero: true,
                            lineStyle: {
                                color: '#085DBA',
                                width: 2,
                                type: 'solid'
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#085DBA',
                                width: 1,
                                type: 'solid'
                            }
                        },
                        z: 1
                    },
                    yAxis: {
                        // axisLine: {
                        //     show: false
                        // },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {}
                        },
                        axisLine: {
                            show: true,
                            onZero: true,
                            lineStyle: {
                                color: '#085DBA',
                                width: 2,
                                type: 'solid'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#085DBA',
                                width: 1,
                                type: 'solid'
                            }
                        }
                    },
                    series: [
                        {
                            name: '合格',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                  show: true,
                                  //position: 'insideRight'
                                }
                            },
                            data: '合格' //合格
                        },
                        {
                            name: '不合格',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                show: true,
                                //position: 'insideRight'
                                }
                            },
                            data: '不合格' //不合格
                        },
                        {
                            name: '待复检',
                            type: 'bar',
                            stack: '总量',
                            label: {
                            normal: {
                              show: true,
                              //position: 'insideRight'
                                }
                            },
                            data: '待复检' //待复检
                        },
                        {
                            name: '待处理',
                            type: 'bar',
                            stack: '总量',
                            label: {
                            normal: {
                                show: true,
                                //position: 'insideRight'
                                }
                            },
                            // data[3]
                            data: '待处理' //待处理
                        }
                    ]
                });
                this.$axios({
                    url: 'bjqualitymgt/quality/statistics/bar',
                    method: 'GET',
                }).then(res => {
                    var chartData = res.data.data;
                    var pieData = [];
                    var seriesData = [];
                    var jsonObj = chartData[0];
                    var personArray = chartData[1];
                    var dataAxis = [];
                    // 合格
                    var a_data = [];
                    // 不合格
                    var b_data = [];
                    // 待复检
                    var c_data = [];
                    // 待处理
                    var d_data = [];
                    for (var i = 0;i < personArray.length;i++){
                        for (var k in personArray[i]){
                            var key1 = k;
                            dataAxis.push(personArray[i][k])
                            var stat = [];
                            for (var j in jsonObj){
                                var key2 = j;
                                if (key1 == key2){
                                    stat = jsonObj[j]; 
                                }
                            }
                            // console.log(stat)
                            for (var l = 0;l < stat.length;l++){
                                for (var m in stat[l]){
                                    var value = stat[l][m]                                   
                                    switch (m){
                                        case "合格":
                                        a_data.push(value);
                                        break;
                                        case "不合格":
                                        b_data.push(value);
                                        break;
                                        case "待复检":
                                        c_data.push(value);
                                        break;
                                        case "待处理":
                                        d_data.push(value);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    pieData.push(a_data)
                    pieData.push(b_data)
                    pieData.push(c_data)
                    pieData.push(d_data)
                    myChart.setOption({
                        series: [
                            {
                                name: '合格',
                                type: 'bar',
                                stack: '总量',
                                label: {
                                    normal: {
                                      show: true,
                                      //position: 'insideRight'
                                    }
                                },
                                data: pieData[0] //合格
                            },
                            {
                                name: '不合格',
                                type: 'bar',
                                stack: '总量',
                                label: {
                                    normal: {
                                    show: true,
                                    //position: 'insideRight'
                                    }
                                },
                                data: pieData[1] //不合格
                            },
                            {
                                name: '待复检',
                                type: 'bar',
                                stack: '总量',
                                label: {
                                normal: {
                                  show: true,
                                  //position: 'insideRight'
                                    }
                                },
                                data: pieData[2] //待复检
                            },
                            {
                                name: '待处理',
                                type: 'bar',
                                stack: '总量',
                                label: {
                                normal: {
                                    show: true,
                                    //position: 'insideRight'
                                    }
                                },
                                // data[3]
                                data: pieData[3] //待处理
                            }
                        ]
                    })
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>

</style>
