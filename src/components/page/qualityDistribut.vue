<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <div class="crumbs">
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item><i class="el-icon-lx-emoji"></i>质量验收</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                    <div class="breadcrumbs">
                        <el-button type="primary" icon="el-icon-search" @click="dialogFormVisible = true">审核</el-button>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-dialog title="审批" :visible.sync="dialogFormVisible" width="30%" center>
          <el-form :model="form">
            <el-form-item label="创建审核人" :label-width="formLabelWidth">
              <el-select v-model="personTitle" placeholder="请选择审核人" class="w_300" @change="choicePerson">
                <el-option v-for="item in acceptancePerson" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="margin-left:40px">
                <div class="person">选择的审核人:</div>
                <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
                  {{tag}}
                </el-tag>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
        <el-table ref="multipleTable" border :data="acceptanceData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column label="编号" width="120" align="center">
            <template slot-scope="scope">{{ scope.row.number }}</template>
          </el-table-column>
          <el-table-column prop="uniqueNum" label="唯一编号" width="180" align="center"></el-table-column>
          <el-table-column prop="totalProject" label="工程总量" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="projectName" label="工程名称" align="center" width="200"></el-table-column>
          <el-table-column prop="workArea" label="工区名称" align="center" width="200"></el-table-column>
          <el-table-column prop="cumulant" label="累计完成量" align="center" width="200"></el-table-column>
          <el-table-column prop="workflowState" label="审批状态" align="center" width="180"></el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data () {
        return {
            multipleSelection: [],
            dialogTableVisible: false,
            dialogFormVisible: false,
            acceptanceData: [],// 质量验收数据
            acceptancePerson: [],// 所有审批人
            personTitle: '',// 选择的审核人
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
            formLabelWidth: '120px',
            dynamicTags: [],
            inputVisible: false,
            inputValue: '',
            formQuery: {
                formIds: '',
                fileIds: '',
                startDate: '',
                endDate: '',
            },
        }
    },
    created () {
        this.getPersonInfo();
        this.getQueryData(); 
        this. fun();
    },
    methods:{
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },
        // 选择审核人
        choicePerson () {
            var index = this.dynamicTags.indexOf(this.personTitle);
            if (index == -1) {
                this.dynamicTags.push(this.personTitle);
            } else {
                alert('此审批人已选择')
            }
            
        },
        // 审批
        fun () {
            this.$axios({
                url: 'bjactiviti/workflow/simpleWorkflow',
                method: 'post',
                data: {}
            }).then((result) => {
                console.log(result.data);
            }).catch((err) => {
                
            });
        },
        // 查询人员信息
        getPersonInfo () {
            this.$axios({
                url: 'bjpersonnelmgt/personInfo/getSpecialWorkPerson',
                method: 'post',
                data: {
                    isActivityUse: true
                }
            }).then((result) => {
                if (result.data.code == 200) {
                    this.acceptancePerson = result.data.data.rows;
                }
            }).catch((err) => {
                console.log(err)
            });
        },
        // 质量验收查询
        getQueryData () {
            this.$axios({
                url: 'bjqualitymgt/quality/receive/query',
                method: 'post',
            }).then((result) => {
                if (result.data.code == 200) {
                    this.acceptanceData = result.data.data.rows;
                    console.log(result.data.data.rows);
                    
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
    .w_300{
        width: 300px;
    }
    .el-tag + .el-tag {
      margin-left: 10px;
    }
    .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }
    .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
    }
    .person{
        color: tomato;
        font-weight: bold;
    }
</style>

