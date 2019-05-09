<template>
    <div class="chart">
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <div class="crumbs">
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item><i class="el-icon-lx-emoji"></i>质量统计</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                    <div class="breadcrumbs">
                        <div class="data-tit">
                            <p>请选择验收日期:</p>
                        </div>
                        <div class="block">
                            <el-date-picker v-model="searchDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                        </div>
                        <div class="demo-input-size">
                            <el-input size="small" placeholder="请输入标题或者检查情况" prefix-icon="el-icon-search" v-model="searchDepVelue"></el-input>
                        </div>
                        <el-select v-model="searchStatus" placeholder="检查情况">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-model="searchPerson" placeholder="请选择检查人">
                            <el-option v-for="item in checkPersons" :key="item.value" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                        <el-button type="primary" icon="el-icon-search" @click="searchDep">搜索</el-button>
                    </div>
                </div>               
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="8">
                <el-card shadow="hover">
                    <div id="pieChart" ref="pieChart" :style="{width: '500px', height: '300px'}"></div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover">
                    <div id="columnChart" ref="columnChart" :style="{width: '500px', height: '300px'}"></div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover">
                    <div id="lineChart" ref="lineChart" :style="{width: '500px', height: '300px'}"></div>
                </el-card>
            </el-col>
        </el-row> 
        <el-table :data="chartData.slice((currentPage - 1)*pageSize,currentPage*pageSize)" stripe border style="width: 100%" class="table">
            <el-table-column prop="serialNum" label="编号" width="100" align="center"></el-table-column>
            <el-table-column prop="title" label="标题" width="110" align="center"></el-table-column>
            <el-table-column prop="cellMessageIds" label="类别" width="150" align="center"></el-table-column>
            <el-table-column prop="date" label="附件" width="130" align="center"></el-table-column>
            <el-table-column prop="remark" label="模型" width="130" align="center"></el-table-column>
            <el-table-column prop="checkPersonId" label="检查情况" align="center"></el-table-column>
            <el-table-column prop="state" label="状态" width="130" align="center"></el-table-column>
            <el-table-column prop="cellMessageNames" label="检查人" width="130" align="center"></el-table-column>
            <el-table-column prop="checkAcceptDate" label="验收日期" width="140" align="center"></el-table-column>
            <el-table-column prop="cellPlatformNames" label="通知人" width="140" align="center"></el-table-column>
            <el-table-column prop="endDate" label="整改截止日期" width="150" align="center"></el-table-column>
        </el-table>
        <el-pagination style="text-align: center;margin-top: 10px;"
            background
            @size-change = "handleSizeChange"
            :current-page.sync ="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next"
            :total = "total"
            @current-change = "current_change">
        </el-pagination>      
    </div>
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
    // var statisticsType = null;
    var statisticsState = null;
    var statisticsCheckPersonId = null;
    var statisticsWeekNum = null;
    var url = "bjqualitymgt/quality/track/queryQualityInfo";
    var counts;
    // var currentP=0;//当前页
    // var size=5;
    export default {
        name: "pieChart",
        data(){
            return {
                url: '',
                statisticsType: null,
                personArray: [],
                goods: {},
                pageSize: 6,// 每页展示条数
                currentPage: 1,// 当前页
                chartData: [],
                tableData: [],
                total: 100,
                checkPersons: [],//所有人员类别的集合
                searchDate: '',// 搜索条件-时间
                searchStatus: '',// 搜索条件-检查情况
                searchPerson: '',//搜索条件-检查人
                searchDepVelue: '',//搜索条件模糊内容
                searchObj: {},//要搜索的集合
                options: [
                    {
                        value: '选项1',
                        label: '检查情况'
                    },
                    {
                        value: '选项2',
                        label: '合格'
                    }, {
                        value: '选项3',
                        label: '不合格'
                    }, {
                        value: '选项4',
                        label: '待复检'
                    }, {
                        value: '选项5',
                        label: '待处理'
                    }
                ],
                data: [
                    {
                        name:'合格',
                        value:1200
                    },
                    {
                        name:'不合格',
                        value:1222
                    },
                    {
                        name:'待检查',
                        value:1283
                    },
                    {
                        name:'待处理',
                        value:1314
                    },
                ],
            }
        },
        mounted(){
            this.$nextTick( () => {
                this.drawPie();
                this.drawColumn();
                this.drawLine();
                this.findCheckPersons()
            })            
        },
        created(){
            // this.$nextTick( () => {
            //     this.drawPie()
            // })          
        },
        methods: {
            handleSizeChange(val) {
                this.pagesize = val;
            },
            // 分页导航
            current_change (val) {
                this.currentPage = val;
                // this.getMessage();
            },
            // 根据数据画出扇形图
            drawPie () {
                var _this = this;
                // 基于准备好的dom，初始化echarts实例
                let pieChart = echarts.init(this.$refs.pieChart)
                let seriesData = [];
                // 点击扇形图
                pieChart.on("click",function (params){
                    // 保存点击后的统计类型
                    _this.statisticsType = params.componentSubType;
                    var type = params.name;
                    var state = '';
                    // 状态转化
                    switch (type){
                        case "合格":
                            state = "0";
                            break;
                        case "不合格":
                            state = "1";
                            break;
                        case "待复检":
                            state = "2";
                            break;
                        case "待处理":
                            state = "3";
                            break;
                    }
                    //用于分页时传参使用
                    statisticsState = state;
                    statisticsCheckPersonId = null;
                    statisticsWeekNum = null;
                    _this.getMessage(state,null,null,null,null);
                })
                // 绘制图表
                pieChart.setOption({
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
                    pieChart.setOption({
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
            // 柱形图
            drawColumn(){
                var _this = this;
                // 基于准备好的dom，初始化echarts实例
                let columnChart = echarts.init(this.$refs.columnChart)
                // 绘制图表
                columnChart.setOption({
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
                    this.personArray = chartData[1];
                    var dataAxis = [];
                    // 合格
                    var a_data = [];
                    // 不合格
                    var b_data = [];
                    // 待复检
                    var c_data = [];
                    // 待处理
                    var d_data = [];
                    for (var i = 0;i < this.personArray.length;i++){
                        for (var k in this.personArray[i]){
                            var key1 = k;
                            dataAxis.push(this.personArray[i][k])
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
                    columnChart.setOption({
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
                });
                // 柱形图的点击事件
                columnChart.on('click',function (params) {
                    //保存点击后的统计类型
                    _this.statisticsType = params.componentSubType;
                    var type = params.seriesName;
                    var state = "";
                    //状态转化
                    switch (type){
                        case "合格":
                            state = "0";
                            break;
                        case "不合格":
                            state = "1";
                            break;
                        case "待复检":
                            state = "2";
                            break;
                        case "待处理":
                            state = "3";
                            break;
                    }
                    var checkPersonId = 0;
                    for(var i = 0;i < _this.personArray.length;i++){
                        for (var k in _this.personArray[i]) {
                            if (_this.personArray[i][k] == params.name) {
                                checkPersonId = k;
                                return false;
                            }
                        }
                    }
                    //用于分页时传参使用
                    statisticsState = state;
                    statisticsCheckPersonId = checkPersonId;
                    statisticsWeekNum = null;
                    _this.getMessage(state,checkPersonId,null,null,null)
                })
            },
            // 线形图
            drawLine(){
                var _this = this;
                // 基于准备好的dom，初始化echarts实例
                let lineChart = echarts.init(this.$refs.lineChart)
                // 绘制图表
                lineChart.setOption({
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
                    lineChart.setOption({
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
                // 点击线形图
                lineChart.on('click',function (params) {
                    //保存点击后的统计类型
                    _this.statisticsType = params.componentSubType;
                    var week = params.name;
                    var weekNum = "";
                    switch (week){
                        case "第一周":
                            weekNum = "1";
                            break;
                        case "第二周":
                            weekNum = "2";
                            break;
                        case "第三周":
                            weekNum = "3";
                            break;
                        case "第四周":
                            weekNum = "4";
                            break;
                        case "第五周":
                            weekNum = "5";
                            break;
                    }
                    var type = params.seriesName;
                    var state = "";
                    //状态转化
                    switch (type){
                        case "合格":
                            state = "0";
                            break;
                        case "不合格":
                            state = "1";
                            break;
                        case "待复检":
                            state = "2";
                            break;
                        case "待处理":
                            state = "3";
                            break;
                    }
                    //用于分页时传参使用
                    statisticsState = state;
                    statisticsCheckPersonId = null;
                    statisticsWeekNum = weekNum;
                    _this.getMessage(0,5,state,null,weekNum,null,null);
                })
            },
            getMessage (state,checkPersonId,weekNum,startDate,endDate) {
                var data = {};
                var params = new URLSearchParams();
                params.append('filed', this.searchDepVelue);
                params.append('checkPersonId', this.searchPerson);
                params.append('state', this.searchStatus);
                params.append('startDate', this.searchDate);
                switch (this.statisticsType) {
                    case 'pie':
                        this.url = 'bjqualitymgt/quality/statistics/sector/' + state;
                        break;
                    case 'bar':
                        this.url = 'bjqualitymgt/quality/statistics/columnar';
                        //下面参数换成动态的的  checkPersonId 和 state 必传
                        data.checkPersonId = checkPersonId;
                        data.state = state;
                        break;
                    case 'line':
                        this.url = 'bjqualitymgt/quality/statistics/line/'+ weekNum;
                        data.state = state;
                        break;
                }
                this.$axios({
                    url: this.url,
                    method: 'post',
                    data: params
                }).then(res => {
                    console.log(res.data)
                    var tableDate = res.data.data.rows;
                    this.chartData = res.data.data.rows;
                    for (var i = 0;i < tableDate.length;i++) {
                        var state;
                        //状态转化
                        switch (tableDate[i].state){
                            case "0":
                                state = "合格";
                                break;
                            case "1":
                                state = "不合格";
                                break;
                            case "2":
                                state = "待复检";
                                break;
                            case "3":
                                state = "待处理";
                                break;
                        }
                    }
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
                        _this.$refs.pieChart.resize();
                    })
                },10)
            },  
            // 获取所有的检查人
            findCheckPersons () {
                this.$axios({
                    url: 'bjpersonnelmgt/personInfo/getPersonInfo',
                    method: 'post',
                    data: {}
                }).then(res => {
                    if (res.data.code == 200) {
                        this.checkPersons = res.data.data.rows; 
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            // 搜索
            searchDep () {
                var filed = this.searchDepVelue;
             	var checkPersonId = this.searchPerson;
				var state = this.searchStatus;
             	var startDate = this.searchDate;
                this.getMessage(filed,checkPersonId,state,startDate,null);
            }, 
        }
    }
</script>

<style scoped>
    .el-row {
        margin-bottom: 20px;
    }
    .el-row:last-child{
        margin-bottom: 0;
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 46px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #F5F5F5;
    }
    .data-tit{
        display: inline-block;
        font-size: 14px;
        font-weight: 400;
    }
    .block{
        display: inline-block;
    }
    .breadcrumbs{
        line-height: 46px;
        float: right;
        margin-right: 10px;
    }
    .demo-input-size{
        display: inline-block;
        width: 218px;
    }
    .schart {
        width: 100%;
        height: 300px;
    }
    .crumbs{
        float: left;
        margin-top: 15px;
        margin-left: 10px;
    }
    .breadcrumbs{
        line-height: 46px;
        float: right;
        margin-right: 10px;
    }
    .table{
        margin-top: 10px;
    }
</style>
