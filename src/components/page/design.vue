<template>
    <div class="table">
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <div class="crumbs">
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item><i class="el-icon-lx-emoji"></i> 质量跟踪</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                    <div class="breadcrumbs">
                        <el-select v-model="problemType" placeholder="请选择问题类型">
                            <!-- <el-option label="请选择问题类型" value=""></el-option> -->
                            <el-option label="方案调整" value="方案调整"></el-option>
                            <el-option label="维保空间" value="维保空间"></el-option>
                            <el-option label="预留孔洞" value="预留孔洞"></el-option>
                            <el-option label="施工不便" value="施工不便"></el-option>
                            <el-option label="管井空间" value="管井空间"></el-option>
                            <el-option label="净高控制" value="净高控制"></el-option>
                            <el-option label="设计不清" value="设计不清"></el-option>
                            <el-option label="设计碰撞" value="设计碰撞"></el-option>
                            <el-option label="设计遗漏" value="设计遗漏"></el-option>
                            <el-option label="规范涉及" value="规范涉及"></el-option>
                        </el-select>
                        <el-select v-model="submitCompanyName" placeholder="请选择提交单位">
                            <el-option v-for="item in companys" :key="item.personInfoId" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                        <el-select v-model="projectStage" placeholder="请选择项目阶段">
                            <!-- <el-option label="请选择项目阶段" value=""></el-option> -->
                            <el-option label="设计阶段" value="设计阶段"></el-option>
                            <el-option label="实施阶段" value="实施阶段"></el-option>
                        </el-select>
                        <el-select v-model="major" placeholder="请选择专业">
                            <!-- <el-option label="请选择专业" value=""></el-option> -->
                            <el-option label="建筑" value="建筑"></el-option>
                            <el-option label="结构" value="结构"></el-option>
                            <el-option label="暖通" value="暖通"></el-option>
                            <el-option label="给排水" value="给排水"></el-option>
                            <el-option label="电气" value="电气"></el-option>
                            <el-option label="幕墙" value="幕墙"></el-option>
                            <el-option label="景观" value="景观"></el-option>
                        </el-select>
                        <el-select v-model="createUsername" placeholder="请选择创建人">
                            <el-option v-for="item in personInfo" :key="item.personInfoId" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                        <el-button type="primary" icon="el-icon-search" @click="searchDep">搜索</el-button>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row class="btn">
            <el-button type="primary" round @click="handleAdd">新增</el-button>
        </el-row>
        <!-- 新增创建质量问题列表 -->
        <el-dialog title="设计详情" :visible.sync="dialogFormVisible" center width="40%">
            <div style="overflow:scroll;width: 650px;height: 500px;">
               <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm" center>
                    <el-form-item label="编号">
                        <el-input v-model="ruleForm.designManagerNumbetr" class="w_400"></el-input>
                    </el-form-item>
                    <el-form-item label="提交单位">
                        <el-select v-model="ruleForm.submitCompanyName" placeholder="选择提交单位" class="w_400">
                            <el-option v-for="item in companys" :key="item.id" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-checkbox-group>
                            <el-checkbox-button v-model="ruleForm.audit" label="待审核"></el-checkbox-button>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="问题类型">
                        <el-checkbox-group v-model="questionState">
                          <el-checkbox v-for="city in questionType" :label="city" :key="city" class="checkbox">{{city}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="参与人">
                        <el-select v-model="ruleForm.participateUsers" placeholder="选择参与人" class="w_400">
                            <el-option v-for="item in personInfo" :key="item.id" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="责任人">
                        <el-select v-model="ruleForm.dutyUserName" placeholder="选择责任人" class="w_400">
                            <el-option v-for="item in personInfo" :key="item.id" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="项目阶段">
                        <el-select v-model="ruleForm.projectStage" placeholder="选择项目阶段" class="w_400">
                            <el-option label="设计阶段" value="设计阶段"></el-option>
                            <el-option label="实施阶段" value="实施阶段"></el-option>
                            <!-- <el-option v-for="item in personInfo" :key="item.id" :label="item.name" :value="item.id"></el-option> -->
                        </el-select>
                    </el-form-item>
                    <el-form-item label="专业">
                        <el-checkbox-group v-model="majorState">
                          <el-checkbox v-for="item in majorFrom" :label="item" :key="item" class="checkbox">{{item}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="模型">
                        <img src="../../../static/img/model.png" alt="" class="model">
                    </el-form-item>
                    <el-form-item label="计划解决时间">
                        <el-col :span="11" class="w_400">
                            <el-form-item>
                                <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="ruleForm.planTime" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="问题描述">
                        <el-input type="textarea" class="w_400" v-model="ruleForm.questionDescribe"></el-input>
                    </el-form-item>
                    <el-form-item label="上传附件">
                        <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            multiple
                            :limit="3"
                            :on-exceed="handleExceed"
                            >
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </div>
        </el-dialog>
        <el-table :data="department" border style="width: 100%">
            <el-table-column label="日志编号" width="130" align="center">
                <template scope="scope">
                    <div :class="{'active':isActive,'error':isError}" @click="clickNum(scope.row)">{{scope.row.designManagerNumbetr}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="submitCompanyName" label="提交单位" width="180" align="center"></el-table-column>
            <el-table-column prop="questionDescribe" label="问题描述" width="180" align="center"></el-table-column>
            <el-table-column prop="major" label="专业" width="120" align="center"></el-table-column>
            <el-table-column prop="date" label="模型" width="100" align="center"></el-table-column>
            <el-table-column prop="problemType" label="问题类型" width="170" align="center"></el-table-column>
            <el-table-column prop="projectStage" label="项目阶段" width="110" align="center"></el-table-column>
            <el-table-column prop="audit" label="状态" width="100" align="center"></el-table-column>
            <el-table-column prop="planTime" label="计划解决时间" width="110" align="center"></el-table-column>
            <el-table-column prop="actualTime" label="实际解决时间" width="110" align="center"></el-table-column>
            <el-table-column prop="dutyUserName" label="责任人" width="100" align="center"></el-table-column>        
            <el-table-column prop="createUsername" label="创建者" width="100" align="center"></el-table-column>
            <el-table-column label="操作" width="120" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" circle @click="handleAdd(scope.row)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle @click="tableDelete(scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 点击编号显示此行内容 -->
        <el-dialog title="设计详情" :visible.sync="dialogLogNumberVisible" center width="35%">
            <el-form :model="ruleForm">
                <el-form-item label="编号" :label-width="formLabelWidth">
                  <el-input v-model="ruleForm.designManagerNumbetr" autocomplete="off" :disabled="true" class="w_300"></el-input>
                </el-form-item>
                <el-form-item label="提交单位" :label-width="formLabelWidth">
                  <el-input v-model="ruleForm.submitCompanyName" autocomplete="off" disabled class="w_300"></el-input>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth">
                  <el-input v-model="ruleForm.audit" autocomplete="off" disabled class="w_300"></el-input>
                </el-form-item>
                <el-form-item label="问题类型" :label-width="formLabelWidth">
                  <el-input v-model="ruleForm.problemType" autocomplete="off" disabled class="w_300"></el-input>
                </el-form-item>
                <el-form-item label="参与人" :label-width="formLabelWidth">
                  <el-input v-model="ruleForm.createUsername" autocomplete="off" disabled class="w_300"></el-input>
                </el-form-item>
                <el-form-item label="责任人" :label-width="formLabelWidth">
                  <el-input v-model="ruleForm.dutyUserName" autocomplete="off" disabled class="w_300"></el-input>
                </el-form-item>
                <el-form-item label="项目阶段" :label-width="formLabelWidth">
                  <el-input v-model="ruleForm.projectStage" autocomplete="off" disabled class="w_300"></el-input>
                </el-form-item>
                <el-form-item label="专业" :label-width="formLabelWidth">
                  <el-input v-model="ruleForm.major" autocomplete="off" disabled class="w_300"></el-input>
                </el-form-item>
                <el-form-item label="模型" :label-width="formLabelWidth">
                  <el-input v-model="ruleForm.name" autocomplete="off" disabled class="w_300"></el-input>
                </el-form-item>
                <el-form-item label="计划解决时间" :label-width="formLabelWidth">
                  <el-input v-model="ruleForm.planTime" autocomplete="off" disabled class="w_300"></el-input>
                </el-form-item>
                <el-form-item label="问题描述" :label-width="formLabelWidth">
                  <el-input type="textarea" v-model="ruleForm.questionDescribe" class="w_300" disabled></el-input>
                </el-form-item>
            </el-form>
            <!-- <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div> -->
        </el-dialog>
        <el-pagination background style="text-align: center;margin-top: 10px;" 
            layout="prev, pager, next" 
            :total="1000"
            @current-change="current_change"
            >
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                formLabelWidth: '120px',
                companys: [],// 所有单位名称的集合
                personInfo: [],// 所有选择人的集合
                major: '',// 筛选专业条件字段
                problemType: '',// 筛选问题类型字段
                submitCompanyName: '',// 筛选单位字段
                projectStage: '',// 筛选项目阶段字段
                createUsername: '',// 筛选创建人字段
                searchFrom: {},// 搜索的集合
                department: [],// 新增到列表的数据
                // 分页
                currentPage: 0,// 当前页
                pageSize: 6,
                total:100,
                isActive: true,
                isError: false,
                // 问题类型
                questionState: [],
                questionType:[
                    '方案调整',
                    '维保空间',
                    '预留孔洞',
                    '施工不便',
                    '管井空间',
                    '净高控制',
                    '设计不清',
                    '设计碰撞',
                    '设计遗漏',
                    '规范涉及'
                ],
                // 专业
                majorState: [],
                majorFrom: [
                    "建筑", 
                    "结构", 
                    "暖通", 
                    "给排水",
                    "电气",
                    "幕墙",
                    "景观",
                ],
                // 创建设计详情
                ruleForm: {
                    accessory: '',
                    actualTime: '',
                    audit: '',
                    createTime: '',
                    createUserId: '',
                    createUsername: '',
                    designManagerDiaryId: '',
                    designManagerNumbetr: '',
                    dimg: '',
                    dparameter: '',
                    dutyUserId: '',
                    dutyUserName: '',
                    major: '',
                    msg: '',
                    participateUsers: '',
                    planTime: '',
                    problemType: '',
                    process: '',
                    projectId: '',
                    projectName: '',
                    projectStage: '',
                    questionDescribe: '',
                    submitCompanyId: '',
                    submitCompanyName: '',
                    updateTime: '',
                    updateUserId: '',
                    updateUsername: ''
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
                dialogFormVisible: false,// 显示隐藏新增模态框
                dialogLogNumberVisible: false,// 点击日志编号显示内容
                searchStatus: '',
                searchPerson: '',
                options: {},
                checkPersons: {},  
            }
        },
        created() {
           this.getListData();
           this.getCompanys();
           this.getPersonInfo()
        },
        computed: {
           
        },
        methods: {
            // 获取所有的单位名称
            getCompanys () {
                this.$axios({
                    url: 'bjupm/department/findAll',
                    method: 'post',
                    data: {}
                }).then((result) => {
                    if (result.status == 200) {
                        this.companys = result.data.data.rows;
                    }
                }).catch((err) => {
                    console.log(err)
                });
            },
            // 获取所有人员信息
            getPersonInfo () {
                this.$axios({
                    url: 'bjpersonnelmgt/personInfo/getPersonInfo',
                    method: 'post',
                    data: {}
                }).then((result) => {
                    if (result.status == 200) {
                        this.personInfo = result.data.data.rows;
                    }
                }).catch((err) => {
                    console.log(err)
                });
            },
            // 获取列表数据
            getListData () {
                if (this.major == '' || this.problemType == '' || this.submitCompanyName == '' || this.projectStage == '' || this.createUsername == '') {
                    this.major = null;
                    this.problemType = null;
                    this.submitCompanyName = null;
                    this.projectStage = null;
                    this.createUsername = null;
                }
                this.$axios({
                    url: 'bjdesign/design/find?pageNumber='+this.currentPage+'&pageSize='+this.pageSize,
                    method: 'post',
                    data: this.searchFrom
                }).then((result) => {
                    if (result.status == 200) {
                        console.log(result.data.data)
                        this.department = result.data.data;
                    }
                }).catch((err) => {
                    console.log(err)
                });
            },
            // 新增数据列表
            handleAdd (row) {
                if (!row.designManagerDiaryId) {
                    this.questionState = [];
                    this.majorState = [];
                    this.ruleForm.accessory = '';
                    this.ruleForm.actualTime = '';
                    this.ruleForm.audit = '';
                    this.ruleForm.createTime = '';
                    this.ruleForm.createUserId = '';
                    this.ruleForm.createUsername = '';
                    this.ruleForm.designManagerDiaryId = '';
                    this.ruleForm.designManagerNumbetr = '';
                    this.ruleForm.dimg = '';
                    this.ruleForm.dparameter = '';
                    this.ruleForm.dutyUserId = '';
                    this.ruleForm.dutyUserName = '';
                    this.ruleForm.major = '';
                    this.ruleForm.msg = '';
                    this.ruleForm.participateUsers = '';
                    this.ruleForm.planTime = '';
                    this.ruleForm.problemType = '';
                    this.ruleForm.process = '';
                    this.ruleForm.projectId = '';
                    this.ruleForm.projectName = '';
                    this.ruleForm.projectStage = '';
                    this.ruleForm.questionDescribe = '';
                    this.ruleForm.submitCompanyId = '';
                    this.ruleForm.submitCompanyName = '';
                    this.ruleForm.updateTime = '';
                    this.ruleForm.updateUserId = '';
                    this.ruleForm.updateUsername = '';
                } else {
                    var arrMajor = row.major.split(',');
                    var arrProblem = row.problemType.split(',');
                    this.questionState = arrProblem;
                    this.majorState = arrMajor;
                    console.log(arrMajor)
                    this.ruleForm.accessory = row.accessory;
                    this.ruleForm.actualTime = row.actualTime;
                    this.ruleForm.audit = row.audit;
                    this.ruleForm.createTime = row.createTime;
                    this.ruleForm.createUserId = row.createUserId;
                    this.ruleForm.createUsername = row.createUsername;
                    this.ruleForm.designManagerDiaryId = row.designManagerDiaryId;
                    this.ruleForm.designManagerNumbetr = row.designManagerNumbetr;
                    this.ruleForm.dimg = row.dimg;
                    this.ruleForm.dparameter = row.dparameter;
                    this.ruleForm.dutyUserId = row.dutyUserId;
                    this.ruleForm.dutyUserName = row.dutyUserName;
                    this.ruleForm.major = row.major;
                    this.ruleForm.msg = row.msg;
                    this.ruleForm.participateUsers = row.participateUsers;
                    this.ruleForm.planTime = row.planTime;
                    this.ruleForm.problemType = row.problemType;
                    this.ruleForm.process = row.process;
                    this.ruleForm.projectId = row.projectId;
                    this.ruleForm.projectName = row.projectName;
                    this.ruleForm.projectStage = row.projectStage;
                    this.ruleForm.questionDescribe = row.questionDescribe;
                    this.ruleForm.submitCompanyId = row.submitCompanyId;
                    this.ruleForm.submitCompanyName = row.submitCompanyName;
                    this.ruleForm.updateTime = row.updateTime;
                    this.ruleForm.updateUserId = row.updateUserId;
                    this.ruleForm.updateUsername = row.updateUsername;
                }
                // 模态框显示
                this.dialogFormVisible = true;
            },
            // 将新增数据添加到列表
            saveEdit () {
                const editId = this.ruleForm.designManagerDiaryId;
                // 新增
                if (editId == null || editId == '') {
                    
                    var questionData = this.questionState.join(',');
                    var major = this.majorState.join(',');
                    this.ruleForm.problemType = questionData;
                    this.ruleForm.major = major;
                    this.$axios({
                        url: 'bjdesign/design/add',
                        method: 'post',
                        data: this.ruleForm
                    }).then((result) => {
                        if (result.status == 200) {
                            this.getListData();
                            this.$message.success(`操作成功`);
                        } else {
                            this.$message.error(`操作失败`);
                        }
                    }).catch((err) => {
                        console.log(err)
                    });
                // 编辑
                } else {
                    var questionData = this.questionState.join(',');
                    var major = this.majorState.join(',');
                    this.ruleForm.problemType = questionData;
                    this.ruleForm.major = major;                   
                    this.$axios({
                        url: 'bjdesign/design/update',
                        method: 'post',
                        data: this.ruleForm
                    }).then((result) => {
                        if (result.status == 200) {
                            this.getListData();
                            this.$message.success(`操作成功`);
                        } else {
                            this.$message.error(`操作失败`);
                        }
                    }).catch((err) => {
                        console.log(err)
                    });
                }
                this.dialogFormVisible = false;
            },
             // 删除功能
            tableDelete(row) {
                this.$confirm('您是否确定删除该项?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    // this.ruleForm.qualityId = row.id;
                    
                    this.deleteRow(row.designManagerDiaryId)
                })
            },
            // 删除行
            deleteRow (id) {
                this.$axios({
                    url: 'bjdesign/design/delete?designManagerDiaryId='+id,
                    method: 'post',
                }).then((result) => {
                    if (result.status == 200) {
                        this.getListData();
                        this.$message.success(`删除成功`);
                    } else {
                        this.$message.error(`删除失败`);
                    }
                }).catch((err) => {
                    console.log(err)
                });
            },
            // 点击日志编号显示内容 
            clickNum (row) {
                this.ruleForm.designManagerNumbetr = row.designManagerNumbetr;
                this.ruleForm.submitCompanyName = row.submitCompanyName;
                this.ruleForm.audit = row.audit;
                this.ruleForm.problemType = row.problemType;
                this.ruleForm.createUsername = row.createUsername;
                this.ruleForm.dutyUserName = row.dutyUserName;
                this.ruleForm.projectStage = row.projectStage;
                this.ruleForm.major = row.major;
                this.ruleForm.name = row.name;
                this.ruleForm.planTime = row.planTime;
                this.ruleForm.questionDescribe = row.questionDescribe;
                this.dialogLogNumberVisible = true;
            },
            // 附件
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            // 附件
            handlePreview(file) {
                console.log(file);
            },
            // 附件
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            // 附件
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            // 分页
            current_change (val) {
                this.currentPage = val - 1;
                this.getListData();
            },
            // 搜索
            searchDep () {
                this.searchFrom = {};
                var obj = {
                    major: this.major,
                    problemType: this.problemType,
                    submitCompanyName: this.submitCompanyName,
                    projectStage: this.projectStage,
                    createUsername: this.createUsername  
                }
                this.searchFrom = obj;
                this.getListData();
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
    .demo-input-size{
        display: inline-block;
        width: 218px;
    }
    .btn{
        float: right;
    }
    .w_400{
        width: 400px;
    }
    .w_300{
        width: 300px;
    }
    .model{
        cursor: pointer;
    }
    .checkbox{
        margin-left: 6px;
    }
    .active{
        color: green;
        cursor:pointer;
    }
    .error{
        color: red;
        cursor:pointer;
    }
    .active:hover{
        text-decoration:underline;
    }
    .error:hover{
        text-decoration:underline;
    }
</style>
