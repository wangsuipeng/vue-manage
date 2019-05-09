<template>
    <el-container>
        <el-header>

        </el-header>
        <el-main>
            <el-row>
                <el-col :span="4" v-for="item in department" >
                    <el-card >
                        <img src="static/img/img.jpg" class="image">
                        <div style="padding: 14px;">
                            <div class="title">
                                <span style="cursor:pointer" v-if="item.name">{{cutString(item.name,30)}}</span>
                                <span style="cursor:pointer" v-else>未知项目</span>
                                <a @click="edit(item)"><img src="static/img/edit.png"></a>
                                <a style="margin-right:10px" @click="openMap(item)"><img src="static/img/mapLogo.png"></a>
                            </div>
                            <p>创建时间：{{isEmpty(item.createTime)}}</p>
                            <p>编码：{{isEmpty(item.uniqueId)}}</p>
                            <p :title="item.desc">概述：{{cutString(isEmpty(item.desc),30)}}</p>
                            <time class="time"></time>
                                <el-button type="text" class="button" @click="enter(item.id)">进入项目</el-button>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </el-main>

        <el-dialog title="编辑" :visible.sync="editVisible" width="30%" >
            <el-form :model="form">
                <el-form-item label="项目名称">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                
                <el-form-item label="项目编码">
                    <el-input v-model="form.uniqueId" autocomplete="off"></el-input>
                </el-form-item>
                
                <el-form-item label="概述">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" multiple>
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="位置" :visible.sync="mapVisible" width="30%" >
            
           
        </el-dialog>
    </el-container>
</template>

<script>
   import axios from 'axios';
    export default {
        data: function(){
            return {
                editVisible:false,
                mapVisible:false,
                currPage: 1,
                pageSize:10,
                department:[],
                form:{
                    id: "",
                    name: "",
                    desc: "",
                    uniqueId: "",
                }
            }
        },
        created(){
            this.getData();
            
        },
        computed:{
        },
        methods: {
            getData(){
                this.$axios({
                        url: 'bjupm/project/findAll',
                        method: 'post',
                        data:{
                            pageNumber:this.currPage,
                            pageSize:10
                        }
                    }).then(res => {
                        if(res.status === 200) {
                            this.department = res.data.data.rows;
                            this.total = res.data.data.total;
                        }
                    })
                
            },
            edit(row){
                console.log(row)
                if(!row.length){//新增
                    this.form.id='';
                    this.form.pid='';
                    this.form.theirDepartmentId='';
                    this.form.name='';
                    this.form.desc='';
                }else{
                    this.form.id=row.id;
                    this.form.name=row.name;
                    this.form.desc=row.desc;
                    this.form.uniqueId=row.uniqueId;
                }
                this.editVisible=true;


            },
            openMap(row){
                this.mapVisible=true;
            },
            saveEdit(row){
                
            },
            handlePreview(){
                 console.log(file);
            },
            enter(id){
                this.$axios({
                        url: 'bjupm/project/selectProject?projectId='+id,
                            method: 'post',
                    }).then(res => {
                        if(res.data.code == 200) {
                            var list=res.data.data;
                            localStorage.setItem('currentProject',"lll")  
                            localStorage.setItem('currentProjectId', list.id)  
                             
                            this.$router.push('/dashboard')
                        }
                    })
            }
        }
    }
</script>

<style scoped>
    .image {
        width: 100%;
        height: 200px;
        display: block;
  }
  .title{

			margin-bottom:10px;
		}
		.title span{
			font-size:14px;
			font-weight: bold;
			color:#3475bb;
			line-height: 20px;
		}
		.title a{
			display: block;
			float: right;
			height: 20px;
		}
		.title a img{
			height: 20px;
		}
</style>