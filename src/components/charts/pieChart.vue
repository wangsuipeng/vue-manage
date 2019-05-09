<template>
    <div>
        <div id="myChart" ref="myChart" :style="{width: '500px', height: '300px'}"></div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        name: "pieChart",
        data(){
            return {
                goods: {},
                pageSize: 6,// 每页展示条数
                currentPage: 1,// 当前页
                tableData: [
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市'
                    }, {
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市'
                    }, {
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市'
                    }, {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市'
                    }
                ],
            }
        },
        mounted(){
            this.$nextTick( () => {
                this.drawPie();
            })            
        },
        created(){
            // this.$nextTick( () => {
            //     this.drawPie()
            // })          
        },
        methods: {
            // 根据数据画出扇形图
            drawPie () {
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(this.$refs.myChart)
                let seriesData = [];
                myChart.on("click",function (){
                    
                })
                // 绘制图表
                myChart.setOption({
                    title: {
                        text: '饼形图',
                        subtext: '',
                        x:'center'
                    },    //{text: '异步数据加载示例'},
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['合格','不合格','待复检','待处理']
                    },
                });
                this.$axios({
                    url: 'bjqualitymgt/quality/statistics/sector',
                    method: 'GET',
                }).then(res => {
                    let chartData = res.data.data;
                    let seriesData = [];
                    chartData.forEach(function (item){
                        let outObj = {};
                        let valueKey = Object.keys(item);
                        outObj.name = valueKey[0];
                        outObj.value = item[valueKey[0]];
                        seriesData.push(outObj);
                    });
                    myChart.setOption({
                        series: [
                            {
                                name: '访问来源',
                                type: 'pie',
                                radius : '55%',
                                center: ['50%', '60%'],
                                data: seriesData,
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
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
            },
             // 分页导航
            current_change(currentPage){
                this.currentPage = currentPage;
            },
        }
    }
</script>

<style scoped>

</style>
