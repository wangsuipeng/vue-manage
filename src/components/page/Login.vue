<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="请输入用户名">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="submitForm">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
   import axios from 'axios';
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm() {
                this.$refs.ruleForm.validate(async valid => {
                    if (valid) {
                        // 发送ajax请求
                        let res = await this.$axios({
                            url: 'bjupm/login',
                            method: 'post',
                            data: this.ruleForm
                        })
                        if (res.status === 200) {
                            var token=res.headers.authorizatio;
                            // // 登录成功, 跳到首页
                            this.$message.success('登录成功')
                            // // 存储token
                            localStorage.setItem('token', res.headers.authorization)
                            localStorage.setItem('username', this.ruleForm.username)
                            this.$router.push('/checkProject')
                        } else {
                            this.$message.error('用户名或者密码错误')
                        }
                    }else {
                        return false
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position        : relative;
        width           : 100%;
        height          : 100%;
        background-image: url(../../assets/login-bg.jpg);
        background-size : 100%;
    }
    .ms-title{
        width        : 100%;
        line-height  : 50px;
        text-align   : center;
        font-size    : 20px;
        color        : #fff;
        border-bottom: 1px solid #ddd;
    }
    .ms-login{
        position     : absolute;
        left         : 50%;
        top          : 50%;
        width        : 350px;
        margin       : -190px 0 0 -175px;
        border-radius: 5px;
        background   : rgba(255,255,255, 0.3);
        overflow     : hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width        : 100%;
        height       : 36px;
        margin-bottom: 10px;
    }
    .login-tips{
        font-size  : 12px;
        line-height: 30px;
        color      : #fff;
    }
</style>
