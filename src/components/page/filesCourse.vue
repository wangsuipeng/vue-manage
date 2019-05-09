
<template>
  <div class="breakNew">
    <el-row>
      <el-col class="outer">
        <div class="grid-content bg-purple">
          <div class="btnFiles">
            <el-upload class="upload-demo" action="" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
              <el-button type="primary" round>上传文件</el-button>
            </el-upload>
            <el-button type="primary" round @click="editFile()">修改名称</el-button>
          </div>
        </div>
        <ul>
          <div class="ipt">
            <input type="checkbox" id="checkbox" v-model="checked">
          </div>
          <li @click='open'>
            <img src="static/img/folder.png">
            <p title="测试">测试</p>
          </li>
        </ul>
      </el-col>
    </el-row>
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="20%">
      <!-- 表单 -->
      <el-form ref="addForm" :model="addForm" label-width="70px" status-icon>
        <el-form-item label="文件夹名" prop="filename">
          <el-input v-model="addForm.filename"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="newFile">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addDialogVisible: false,
      addForm: {
        filename: ''
      },
      checked: true
    }
  },
  methods: {
    open() {},
    async delFile() {
      try {
        // 警告框
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // 确定
        let res = await this.$axios.delete()
        let {
          meta: { status }
        } = res.data
        if (status === 200) {
          // 提示
          this.$message.success('删除文件成功')
          // 重新获取角色列表
          this.getRoleList()
        } else {
          this.$message.error('删除失败')
        }
      } catch (e) {
        this.$message.error('取消删除')
      }
    },
    showAddDialog() {
      this.addDialogVisible = true
    },
    async newFile() {
      let res = await this.$axios.post(``, this.addForm)
      let {
        meta: { status }
      } = res.data
      if (status === 201) {
        this.$message.success('添加文件成功')
        this.$refs.addForm.resetFields()
        this.addDialogVisible = false
      } else {
        this.$message.error('添加文件失败')
      }
    },
    chooseFile() {}
  }
}
</script>

<style scoped>
.bg-purple {
  background: #d3dce6;
}
.outer {
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 150px;
}
.grid-content {
  border-radius: 4px;
  min-height: 56px;
  line-height: 56px;
  border: 1px solid #ccc;
}
.btnFiles {
  float: right;
  margin-right: 10px;
}
.upload-demo {
  display: inline-block;
}

li {
  margin-left: 18px;
  list-style: none;
  float: left;
  width: 100px;
  font-size: 14px;
  position: relative;
}
li img {
  width: 45%;
}
li p {
  margin: 0 6px;
}

#checkbox {
  position: absolute;
  top: 70px;
  left: 57px;
}
</style>
