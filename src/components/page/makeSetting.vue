<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-emoji"></i> 转换设置</el-breadcrumb-item>
                <a href="http://192.168.1.105:8824/"></a>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="title">转换服务器列表</div>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="date" label="编号" width="100" align="center"></el-table-column>
              <el-table-column prop="name" label="配置名称" width="280" align="center"></el-table-column>
              <el-table-column prop="address" label="主机名" width="230" align="center"></el-table-column>
              <el-table-column prop="name" label="IP" align="center"></el-table-column>
              <el-table-column prop="name" label="注册时间" width="200" align="center"></el-table-column>
              <el-table-column prop="name" label="优先级" width="150" align="center">
                <template slot-scope="scope">
                    <el-button icon="icon iconfont icon-shuangjiantoushang" circle></el-button>
                    <el-button icon="icon iconfont icon-shuangjiantouxia" circle></el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="info">配置信息</div>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="date" label="编号" width="100" align="center"></el-table-column>
              <el-table-column prop="name" label="配置名称" width="280" align="center"></el-table-column>
              <el-table-column prop="address" label="配置别名" width="230" align="center"></el-table-column>
              <el-table-column prop="name" label="配置说明" align="center"></el-table-column>
              <el-table-column prop="name" label="配置值" width="200" align="center"></el-table-column>
              <el-table-column prop="name" label="操作" width="150" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" circle></el-button>
                </template>
              </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                keyword: '',
                tableData: [{
                  date: '2016-05-02',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1518 弄'
                }, {
                  date: '2016-05-04',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1517 弄'
                }, {
                  date: '2016-05-01',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1519 弄'
                }, {
                  date: '2016-05-03',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1516 弄'
                }]
            }
        },
        computed: {
            list(){
                return this.iconList.filter((item) => {
                    return item.indexOf(this.keyword) !== -1;
                })
            }
        }
    }
</script>

<style scoped>
.example-p{
    height: 45px;
    display: flex;
    align-items: center;
}
.search-box{
    text-align: center;
    margin-top: 10px;
}
.search{
    width: 300px;
}
ul,li{
    list-style: none;
}
.icon-li{
    display: inline-block;
    padding: 10px;
    width: 120px;
    height: 120px;
}
.icon-li-content{
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.icon-li-content i{
    font-size: 36px;
    color: #606266;
}
.icon-li-content span{
    margin-top: 10px;
    color: #787878;
}
.title{
    font-size: 20px;
    font-weight: bold;
    color: yellowgreen;
    margin-bottom: 10px;
}
.info{
    margin-top: 30px;
    font-size: 20px;
    font-weight: bold;
    color: yellowgreen;
    margin-bottom: 10px;
}
</style>