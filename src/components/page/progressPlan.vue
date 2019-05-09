<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <div class="crumbs">
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item><i class="el-icon-lx-emoji"></i>工程日志</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                    <div class="breadcrumbs">
                        <el-dropdown trigger="click" @command="findMppId">
                            <el-button type="primary">
                              选择版本<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for="item in mppFilData" :key="item.projectFileId" :command="item.projectFileId">{{ item.projectFileName }}</el-dropdown-item>
                                <el-dropdown-item @click.native="dialogFormVisible = true">全部计划进度</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-dropdown trigger="click" style="margin-left: 2px">
                            <el-button type="primary">
                              选择视图<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                              <el-dropdown-item>4D</el-dropdown-item>
                              <el-dropdown-item>甘特图</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-button type="danger" icon="el-icon-upload" @click="importData">导入</el-button>
                        <!-- 导入 -->
                        <el-dialog title="导入" :visible.sync="dialogImportVisible" width="40%" :modal-append-to-body="false" :close-on-click-modal="false" class="dialog-import">
                            <div @click="upload" class="avatar-uploader">
                                <img v-if="form.avatar" :src="form.avatar" class="avatar">
                                <i v-else class="icon iconfont icon-shangchuanupload94"></i>
                                <input type="file" id="fileInput" ref="inputer" accept=".mpp" @change="fileupload" style="display:none;">
                            </div>
                        </el-dialog>
                    </div>
                </div>
            </el-col>
        </el-row>
        <!-- <ganttChart></ganttChart>   -->
        <el-dialog title="全部进度计划" :visible.sync="dialogFormVisible" align="center" width="60%">
            <el-form :model="form">
                <el-row>
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="用途" :label-width="formLabelWidth">
                                <el-select v-model="searchDepKey" placeholder="全部">
                                  <el-option label="内控" value="内控"></el-option>
                                  <el-option label="参考" value="参考"></el-option>
                                  <el-option label="对外" value="对外"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="" :label-width="formLabelWidth" style="width:350px">
                                <el-input placeholder="搜索版本名称" v-model="searchDepVelue">
                                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
                                </el-input>
                            </el-form-item>                        
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-button type="primary" @click="searchFile">搜索</el-button>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-button type="danger" @click="handleAdd">新建计划进度</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-form>
            <el-table :data="mppFilData" border style="width: 100%">
                <el-table-column prop="projectFileName" label="版本名称" width="120" align="center"></el-table-column>
                <el-table-column prop="versionNumber" label="版本号" width="120" align="center"></el-table-column>
                <el-table-column prop="timeType" label="时间单位" width="120" align="center"></el-table-column>
                <el-table-column prop="application" label="用途" align="center"></el-table-column>
                <el-table-column prop="createUsername" label="创建人" width="120" align="center"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="120" align="center"></el-table-column>
                <el-table-column prop="editionDepictiondesc" label="版本描述" align="center"></el-table-column>
                <el-table-column prop="" label="操作" width="120" align="center">
                      <template slot-scope="scope">
                          <el-button type="primary" icon="el-icon-edit" circle @click="handleAdd(scope.row)"></el-button>
                          <el-button type="danger" icon="el-icon-delete" circle @click="tableDelete(scope.row)"></el-button>
                      </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog title="新建计划进度" :visible.sync="dialogTableVisible" align="center" width="30%">
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item label="版本名称" align="left">
                  <el-input v-model="formMppFil.projectFileName"></el-input>
                </el-form-item>
                <el-form-item label="时间单位" align="left">
                    <el-select v-model="formMppFil.timeType" placeholder="全部" style="width:535px">
                        <el-option label="全部" value="全部"></el-option>
                        <el-option label="年" value="年"></el-option>
                        <el-option label="季度" value="季度"></el-option>
                        <el-option label="月" value="月"></el-option>
                        <el-option label="周" value="周"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用途" align="left">
                    <el-select v-model="formMppFil.application" placeholder="全部" style="width:535px">
                        <el-option label="全部" value="全部"></el-option>
                        <el-option label="内控" value="内控"></el-option>
                        <el-option label="参考" value="参考"></el-option>
                        <el-option label="对外" value="对外"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="版本描述" prop="desc" align="left">
                    <el-input type="textarea" v-model="formMppFil.editionDepictiondesc"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addProjectFile">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    // import ganttChart from '../gantt/ganttChart.vue'
    export default {
        data: function(){
            return {
                dialogImportVisible: false,
                fileList: [],
                dialogFormVisible: false,
                dialogTableVisible: false,
                labelPosition: 'top',
                mppFilData: [],// 所有进度计划数据列表
                searchDepKey:'',//搜索条件字段
                searchDepVelue:'',//筛选条件模糊内容
                searchData: {},// 搜索的集合
                formLabelAlign: {
                  name: '',
                  region: '',
                  type: ''
                },
                formMppFil: {
                    application: '',
                    createTime: '',
                    createUsername: '',
                    editionDepictiondesc: '',
                    projectFileId: '',
                    projectFileName: '',
                    projectId: '',
                    projectMppbatchNum: '',
                    theirDepartmentId: '',
                    theirProjectId: '',
                    theirProjectName: '',
                    timeType: '',
                    updateTime: '',
                    updateUsername: '',
                    versionNumber: '',
                },
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                // 版本描述
                ruleForm: {
                  desc: ''
                },
                sizeForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '100px',
                importId: '',// 导入mpp文件时穿的id
            }
        },
        components: {
            // ganttChart
        },
        created () {
            this.getfindMppFil();
        },
        methods: {
            findMppId (command) {
                this.importId = command;
            },
            // 导入按钮
            importData () {
                if (this.importId == '' || this.importId == null) {
                    alert("请先创建工程进度！")
                } else {
                    this.dialogImportVisible = true;
                } 
            },
            upload(){
                var fileInput=document.getElementById("fileInput");
                fileInput.click();
            },
            async fileupload(){//上传文件
                console.log(this.importId)
                var inputDOM = this.$refs.inputer;
                // var url;
                // 通过DOM取文件数据
                this.file = inputDOM.files[0];
                var formdata = new FormData();
                formdata.append('multipartFile ',inputDOM.files[0]);
                formdata.append('projectFileId ',this.importId);
                this.$axios({
                    url: 'bjmpp/task/import',
                    method: 'post',
                    headers: {'Content-Type': 'multipart/form-data'},
                    data: formdata
                }).then((result) => {
                    if (result.status == 200) {
                        console.log(result)
                    }
                }).catch((err) => {
                    console.log(err);               
                });
            },
            // 查询所有进度计划
            getfindMppFil () {
                this.$axios({
                    url: 'bjmpp/task/findMppFil',
                    method: 'post',
                    data: this.searchData
                }).then((result) => {
                    if (result.status == 200) {
                        this.mppFilData = result.data;
                    }
                }).catch((err) => {
                    console.log(err)
                });
            },
            // 新增列表数据
            handleAdd (row) {
                if (!row.projectFileId) {
                    this.formMppFil.projectFileId = '';
                    this.formMppFil.application = '';
                    this.formMppFil.editionDepictiondesc = '';
                    this.formMppFil.projectFileName = '';
                    this.formMppFil.timeType = '';
                    this.formMppFil.versionNumber = row.versionNumber;
                } else {
                    this.formMppFil.projectFileId = row.projectFileId;
                    this.formMppFil.application = row.application;
                    this.formMppFil.editionDepictiondesc = row.editionDepictiondesc;
                    this.formMppFil.projectFileName = row.projectFileName;
                    this.formMppFil.timeType = row.timeType;
                    this.formMppFil.versionNumber = row.versionNumber;
                }
                this.dialogTableVisible = true;
            },
            // 新增计划进度
            addProjectFile (row) {
                var editId = this.formMppFil.projectFileId; 
                if (editId == '' || editId == null) {
                    // 新增
                    this.$axios({
                        url: 'bjmpp/task/addProjectPlanFile',
                        method: 'post',
                        data: this.formMppFil
                    }).then((result) => {  
                        if (result.status == 200) {
                            this.getfindMppFil();
                            this.$message.success(`操作成功`);
                        } else {
                            this.$message.error(`操作失败`);
                        } 
                    }).catch((err) => {
                        console.log(err)
                    });
                } else {
                    // 编辑
                    this.$axios({
                        url: 'bjmpp/task/updateProjectPlanFile',
                        method: 'post',
                        data: this.formMppFil
                    }).then((result) => {
                        if (result.status == 200) {
                            this.getfindMppFil();
                            this.$message.success(`操作成功`);
                        } else {
                            this.$message.error(`操作失败`);
                        } 
                    }).catch((err) => {
                        console.log(err)
                    });
                }
                
                this.dialogTableVisible = false;
            },
            // 删除功能
            tableDelete(row) {
                this.$confirm('您是否确定删除该项?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    this.deleteRow(row)
                })
            },    
            // 删除列表数据
            deleteRow (row) {
                console.log(row.projectFileId)
                this.$axios({
                    url: 'bjmpp/task/deleteProjectPlanFile?projectPlanFileId='+row.projectFileId,
                    method:'post',
                }).then((result) => {
                    if (result.status == 200) {
                        this.getfindMppFil();
                        this.$message.success(`删除成功`);
                    } else {
                        this.$message.error(`删除失败`);
                    }
                }).catch((err) => {
                    console.log(err)
                });
            },
            // 搜索查询
            searchFile () {
                var obj = {
                    application: this.searchDepKey,
                    projectFileName: this.searchDepVelue
                }
                this.searchData = obj;
                console.log(this.searchData)
                this.getfindMppFil();
            },
        }
    }
</script>

<style scoped>
    .el-row {
        margin-bottom: 20px;
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
    .el-dropdown {
        vertical-align: top;
    }
    .el-dropdown + .el-dropdown {
        margin-left: 15px;
    }
    .el-icon-arrow-down {
        font-size: 12px;
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
        float: right;
        margin-right: 10px;
        line-height: 46px;
    }
    .bg_color{
        background-color: #fff;
    }
    .avatar-uploader {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        width: 178px;
        height: 60px;
        line-height: 178px;
        text-align: center;
        cursor: pointer;
        position: relative;
        /* overflow: hidden; */
        margin-bottom: 20px;
        margin-top: -20px;
    }
    .avatar-uploader:hover {
        border-color: #409EFF;
    }
    .iconfont{
        position: absolute;
        top: -60px;
        left: 0px;
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 60px;
        text-align: center;
    }
    .avatar-uploader:hover .iconfont{
        color: #409EFF;
    }
    .avatar {
        width: 178px;
        height: 50px;
        display: block;
    }
</style>