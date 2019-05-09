<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <div class="crumbs">
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item><i class="el-icon-lx-emoji"></i> 质量跟踪</el-breadcrumb-item>
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
                            <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.label"></el-option>
                        </el-select>
                        <el-select v-model="searchPerson" placeholder="请选择检查人">
                            <el-option v-for="item in checkPersons" :key="item.personInfoId" :label="item.name" :value="item.name"></el-option>
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
        <el-dialog title="创建质量问题" :visible.sync="dialogFormVisible" center width="40%">
            <div style="overflow:scroll;width: 650px;height: 500px;">
                <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm" center>
                    <el-form-item label="标题">
                        <el-input v-model="ruleForm.title" class="w_400"></el-input>
                    </el-form-item>
                    <el-form-item label="编号">
                        <el-input v-model="ruleForm.serialNum" class="w_400"></el-input>
                    </el-form-item>
                    <el-form-item label="创建人">
                        <el-checkbox-group>
                            <el-checkbox-button label="admin"></el-checkbox-button>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="平台通知人">
                        <el-select v-model="ruleForm.checkPersonName" placeholder="请选择通知人" class="w_400">
                            <el-option v-for="item in checkPersons" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="短信通知人">
                        <el-select v-model="ruleForm.cellPlatformNames" placeholder="请选择通知人" class="w_400">
                            <el-option v-for="item in checkPersons" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="检查人">
                        <el-select v-model="ruleForm.cellMessageNames" placeholder="请选择检查人" class="w_400">
                            <el-option v-for="item in checkPersons" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="验收日期">
                        <el-col :span="11" class="w_400">
                            <el-form-item>
                                <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="ruleForm.checkAcceptDate" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="ruleForm.state" placeholder="选择状态" class="w_400">
                            <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.label">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="模型" v-model="ruleForm.remark">
                        <img src="../../../static/img/model.png" alt="" class="model">
                    </el-form-item>
                    <el-form-item label="类别">
                        <el-select v-model="ruleForm.cellMessageIds" placeholder="选择类别" class="w_400">
                            <el-option v-for="item in options1" :key="item.id" :label="item.label" :value="item.label"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="修改截止日期">
                        <el-col :span="11" class="w_400">
                            <el-form-item>
                                <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="ruleForm.endDate" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="检查情况">
                        <el-input type="textarea" v-model="ruleForm.checkPersonId" class="w_400"></el-input>
                    </el-form-item>
                    <el-form-item label="整改内容与要求">
                        <el-input type="textarea" v-model="ruleForm.checkResult" class="w_400"></el-input>
                    </el-form-item>
                    <el-form-item label="附件">
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
        <!-- .slice((currentPage - 1)*pageSize,currentPage*pageSize) -->
        <el-table :data="department" stripe border style="width: 100%">
            <el-table-column prop="serialNum" label="编号" width="100" align="center"></el-table-column>
            <el-table-column prop="title" label="标题" width="130" align="center"></el-table-column>
            <el-table-column prop="cellMessageIds" label="类别" width="112" align="center"></el-table-column>
            <el-table-column prop="a4" label="附件" width="110" align="center"> </el-table-column>
            <el-table-column prop="model" label="模型" width="110" align="center"> </el-table-column>
            <el-table-column prop="checkPersonId" label="检查情况" width="330" align="center"> </el-table-column>
            <el-table-column prop="state" label="状态" width="110" align="center"> </el-table-column>
            <el-table-column prop="cellMessageNames" label="检查人" width="110" align="center"> </el-table-column>
            <el-table-column prop="checkAcceptDate" label="验收日期" width="110" align="center"> </el-table-column>
            <el-table-column prop="checkPersonName" label="通知人" width="110" align="center"> </el-table-column>
            <el-table-column prop="endDate" label="整改截止日期" width="150" align="center"> </el-table-column>
            <el-table-column label="操作" width="150" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.row)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle @click="tableDelete(scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination style="text-align: center;margin-top: 10px;"
                       background
                       layout="prev, pager, next"
                       :total="total"
                       @current-change="current_change"
        >
        </el-pagination>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                dialogTableVisible: false,// 显示或隐藏编辑模态框
                dialogFormVisible: false,// 显示或隐藏新增模态框
                labelPosition: 'right',
                formLabelWidth: '120px',
                checkPersons: [],//所有人员类别的集合
                department: [], // 新增到列表的数据
                total: 100,// 分页
                pageSize: 10,// 每页展示条数
                currentPage: 0,// 当前页
                searchDate: '',// 搜索条件-时间
                searchStatus: '',// 搜索条件-检查情况
                searchPerson: '',//搜索条件-检查人
                searchDepVelue: '',//搜索条件模糊内容
                searchObj: {},//要搜索的集合
                form: {
                    name: '',
                    type: [],
                },
                sizeForm: {
                    type: [],
                },
                // 创建质量问题内容
                ruleForm: {
                    qualityId: '',
                    title: '',// 标题
                    serialNum: '',// 编号
                    checkPersonName: '',// 平台通知人
                    cellPlatformNames: '',// 短信通知人
                    cellMessageNames: '',// 检查人
                    checkAcceptDate: '',// 验收日期
                    state: '',// 状态
                    remark: '',// 模型
                    cellMessageIds: '',//类别
                    endDate: '',//修改截止日期
                    checkPersonId: '',//检查情况
                    checkResult: '',//整改内容与要求
                },
                options: [
                    {
                        value: '选项1',
                        label: '合格'
                    }, {
                        value: '选项2',
                        label: '不合格'
                    }, {
                        value: '选项3',
                        label: '待复检'
                    }, {
                        value: '选项4',
                        label: '待处理'
                    }
                ],
                options1: [
                     {
                        value: '选项1',
                        label: '分部分项'
                    }, 
                    {
                        value: '选项2',
                        label: '单项工程'
                    }, 
                    {
                        value: '选项3',
                        label: '单位工程'
                    }, 
                    {
                        value: '选项4',
                        label: '竣工'
                    }, 
                    {
                        value: '选项5',
                        label: '其他'
                    }
                ],
            }
        },
        mounted () {
            this.$nextTick(function () {
                this.findCheckPersons() 
            }) 
        },
        created(){
            this.getDate();
        },
        methods:{
            // 分页导航
            current_change(val){
                this.currentPage = val - 1;
                this.getDate();
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
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
            // 获取所有的检查人
            findCheckPersons () {
                this.$axios({
                    url: 'bjpersonnelmgt/personInfo/getPersonInfo',
                    method: 'post',
                    data: {}
                }).then(res => {
                    if (res.status == 200) {
                        this.checkPersons = res.data.data.rows; 
                        console.log(res.data)
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            // 获取列表数据
            // search:filed,
            // heckPersonId:checkPersonId,
			// tate:state,
            // tartDate:startDate,
            getDate (){
                var params = new URLSearchParams();
                params.append('pageNumber', this.currentPage);
                params.append('pageSize', this.pageSize);
                params.append('filed', this.searchDepVelue);
                params.append('checkPersonId', this.searchPerson);
                params.append('state', this.searchStatus);
                params.append('startDate', this.searchDate);
                this.$axios({
                    url: 'bjqualitymgt/quality/track/queryQualityInfo',
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        this.department = res.data.data.rows; 
                        this.total = res.data.data.total;
                    }
                })
            },
            // 搜索
            searchDep () {
                var filed = this.searchDepVelue;
             	var checkPersonId = this.searchPerson;
				var state = this.searchStatus;
             	var startDate = this.searchDate;
                this.getDate();
            },
            // 新增列表数据
            handleAdd () {  
                this.ruleForm.qualityId = '';                
                this.ruleForm.title = '';
                this.ruleForm.serialNum = '';
                this.ruleForm.checkPersonName = '';
                this.ruleForm.cellPlatformNames = '';
                this.ruleForm.cellMessageNames = '';
                this.ruleForm.checkAcceptDate = '';
                this.ruleForm.state = '';
                this.ruleForm.remark = '';
                this.ruleForm.cellMessageIds = '';
                this.ruleForm.endDate = '';
                this.ruleForm.checkPersonId = '';
                this.ruleForm.checkResult = '';
                // 模态框显示
                this.dialogFormVisible = true
            },
            // 将数据添加到列表
            saveEdit () {
                if (this.ruleForm.checkAcceptDate == '' || this.ruleForm.checkAcceptDate == null || this.ruleForm.checkAcceptDate == 'null') {
                    this.$message.success(`验收日期不能为空`);
                } else {
                    var editId = this.ruleForm.qualityId;
                    // 新增
                    if (editId == null || editId == '' ) {
                        this.$axios({
                            url: 'bjqualitymgt/quality/track/save',
                            method: 'post',
                            data: this.ruleForm
                        }).then(res => {
                            this.getDate()
                            if (res.data.code == 200) {
                                this.$message.success(`操作成功`);
                            } else {
                                this.$message.error(`操作失败`);
                            }                    
                        })
                    } else {
                        // 编辑
                        this.$axios({
                            url: 'bjqualitymgt/quality/track/update',
                            method: 'post',
                            data: this.ruleForm
                        }).then(res => {
                            this.getDate(); 
                            if (res.data.code == 200) {
                                this.$message.success(`操作成功`);
                            } else {
                                this.$message.error(`操作失败`);
                            }                    
                        })                               
                    }    
                    this.dialogFormVisible = false;                             
                }      
            },
            // 删除功能
            tableDelete(row) {
                this.$confirm('您是否确定删除该项?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    this.ruleForm.qualityId = row.id;
                    this.deleteRow()
                })
            },
            // 删除行
            deleteRow () {
                var deleId = this.ruleForm.qualityId;
                var params = new URLSearchParams();
                params.append('qualityId', deleId);
                this.$axios({
                    url: 'bjqualitymgt/quality/track/delQualityInfo',
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200){
                        this.getDate();
                        this.$message.success(`删除成功`);
                    }else {
                        this.$message.error(`删除失败`);
                    }
                })
            },
            // 打开编辑窗口 
            handleEdit (row) {
                // 新增
                if (!row.id){
                    this.ruleForm.qualityId = '';  
                    this.ruleForm.title = '';
                    this.ruleForm.serialNum = '';
                    this.ruleForm.checkPersonName = '';
                    this.ruleForm.cellPlatformNames = '';
                    this.ruleForm.cellMessageNames = '';
                    this.ruleForm.checkAcceptDate = '';
                    this.ruleForm.state = '';
                    this.ruleForm.remark = '';
                    this.ruleForm.cellMessageIds = '';
                    this.ruleForm.endDate = '';
                    this.ruleForm.checkPersonId = '';
                    this.ruleForm.checkResult = '';
                } else {
                    // 编辑
                    this.ruleForm.qualityId = row.id;  
                    this.ruleForm.title = row.title;
                    this.ruleForm.serialNum = row.serialNum;
                    this.ruleForm.checkPersonName = row.checkPersonName;
                    this.ruleForm.cellPlatformNames = row.cellPlatformNames;
                    this.ruleForm.cellMessageNames = row.cellMessageNames;
                    this.ruleForm.checkAcceptDate = row.checkAcceptDate;
                    this.ruleForm.state = row.state;
                    this.ruleForm.remark = row.remark;
                    this.ruleForm.cellMessageIds = row.cellMessageIds;
                    this.ruleForm.endDate = row.endDate;
                    this.ruleForm.checkPersonId = row.checkPersonId;
                    this.ruleForm.checkResult = row.checkResult;
                }
                this.dialogFormVisible = true;
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
    .model{
        cursor: pointer;
    }
</style>
