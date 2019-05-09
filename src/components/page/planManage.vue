<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <div class="crumbs">
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item><i class="el-icon-lx-emoji"></i>进度管路</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                    <div class="breadcrumbs">
                        <el-dropdown trigger="click" @command="getProjectData">
                            <el-button type="primary">
                              选择版本<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for="item in fileList" :key="item.id" :command="item.projectFileId">{{item.versionNumber}}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="tableData.wbs" label="WBS" width="140" align="center"></el-table-column>
          <el-table-column prop="tableData.name" label="任务名称" width="140" align="center"></el-table-column>
          <el-table-column prop="tableData.start" label="计划开始时间" width="140" align="center"></el-table-column>
          <el-table-column prop="tableData.end" label="计划结束时间" width="140" align="center"></el-table-column>
          <el-table-column prop="tableData.name" label="计划工期" align="center"></el-table-column>
          <el-table-column prop="tableData.actualStar" label="实际开始时间" width="140" align="center"></el-table-column>
          <el-table-column prop="tableData.actualEnd" label="实际结束时间" width="140" align="center"></el-table-column>
          <el-table-column prop="tableData.date" label="实际工期" width="140" align="center"></el-table-column>
          <el-table-column prop="tableData.name" label="分部分项" width="140" align="center"></el-table-column>
          <el-table-column prop="tableData.actualCount" label="工程总量" width="140" align="center"></el-table-column>
          <!-- <el-table-column label="操作" width="140" align="center">
              <template slot-scope="scope">
                    <el-button type="danger" icon="el-icon-delete" circle @click="tableDelete(scope.row)"></el-button>
                </template>
          </el-table-column> -->
        </el-table>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                dialogImportVisible: false,
                fileList: [],
                tableData: [],
            }
        },
        mounted () {
            this.$nextTick(function () {
                this.getVersionNum();
            })
        },
        methods: {
            getProjectData (command) {
                this.$axios({
                    url: 'bjmpp/planM/findProjectMappBybatchNum?batchNum='+command,
                    method: 'post',
                }).then( res => {
                    if (res.status == 200) {
                        this.tableData = res.data.tasks;
                        console.log(res.data.tasks)
                    }
                }).catch((err) => {
                    console.log(err)
                });
            },
            getVersionNum () {
                this.$axios({
                    url: 'bjmpp/task/findMppFil',
                    method: 'post',
                    data: {}
                }).then((result) => {
                    if (result.status == 200) {
                        this.fileList = result.data;
                    }
                }).catch((err) => {
                    console.log(err)
                });
            }
        }
    }
</script>

<style scoped>
    .el-row {
        margin-bottom: 10px;
    }
    .el-row-col{
        margin-bottom: 0;
    }
    .el-row:last-child {
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
        background-color: #f9fafc;
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
    .journal{
        line-height: 46px;
    }
    .demo-input-size{
        display: inline-block;
        width: 218px;
    }
    .btn{
        float: right;
    }
</style>