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
                        top: '3%',
                        textStyle: style
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    color:['#11BE5A', '#F63F45','#FFD018','#2CA4EF'],
                    legend: {
                        data:['合格','不合格','待复检','待处理']
                    },
                    toolbox: {
                       show : true,
                       feature: {
                            // mark : {show: true},
                            // dataView : {show: true, readOnly: false},
                            // magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                            // restore : {show: true},
                            // saveAsImage : {show: true}
                        }
                    },
                    grid: {
                        left: '5%',
                        right: '8%',
                        bottom: '2%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['第一周', '第二周', '第三周', '第四周', '第五周'],
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
                        type: 'value',
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
                        }
                    },
                    series: [
                        {
                            name:'合格',
                            type:'line',
                            // stack: '总量',  不设置此参数则显示为平铺,否则显示为堆叠
                            data:"合格"
                        },
                        {
                            name:'不合格',
                            type:'line',
                            // stack: '总量',
                            data: "不合格"
                        },
                        {
                            name:'待复检',
                            type:'line',
                            // stack: '总量',
                            data: "待复检"
                        },
                        {
                            name:'待处理',
                            type:'line',
                            // stack: '总量',
                            data: "待处理"
                        }

                    ]
                });
                this.$axios({
                   url: 'bjqualitymgt/quality/statistics/line',
                   method: 'GET', 
                }).then(res => {
                    var chartData = res.data.data;
                    var lineData = [];
                    var dataAxis = [];
                    // 合格
                    var a_data = [];
                    // 不合格
                    var b_data = [];
                    // 待复检
                    var c_data = [];
                    // 待处理
                    var d_data = [];
                    chartData.forEach(item => {
                        var valueKey = Object.keys(item);
                        var value = item[valueKey[0]];
                        value.forEach(items => {
                            var objJson = Object.keys(items);
                            var val = objJson[0];
                            var key = items[objJson[0]]
                            switch(val){
                                case '合格':
                                a_data.push(key);
                                break;
                                case '不合格':
                                b_data.push(key);
                                break;
                                case '待复检':
                                c_data.push(key);
                                break;
                                case '待处理':
                                d_data.push(key);
                                break;
                            }
                        })                   
                    });
                    lineData.push(a_data)
                    lineData.push(b_data)
                    lineData.push(c_data)
                    lineData.push(d_data)
                    myChart.setOption({
                        series: [
                            {
                                name:'合格',
                                type:'line',
                                // stack: '总量',  不设置此参数则显示为平铺,否则显示为堆叠
                                data: lineData[0]
                            },
                            {
                                name:'不合格',
                                type:'line',
                                // stack: '总量',
                                data: lineData[1]
                            },
                            {
                                name:'待复检',
                                type:'line',
                                // stack: '总量',
                                data: lineData[2]
                            },
                            {
                                name:'待处理',
                                type:'line',
                                // stack: '总量',
                                data: lineData[3]
                            }
                        ]
                    })
                }).catch(err => {
                    console.log(err)
                })
            },
            
            init() {
                const _this = this;//因为箭头函数会改变this指向，指向windows。所以先把this保存
                setTimeout(() => {
                    // window.onresize = function() {
                    //     _this.this.chart = echarts.init(_this.$refs.myChart);
                    //     _this.this.chart.resize();
                    // }
                    window.addEventListener('resize', function () {
                        _this.$refs.myChart.resize();
                    })
                },10)
            }
        }
    }
</script>

<style scoped>

</style>
