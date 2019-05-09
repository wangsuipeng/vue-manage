<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="20">
                <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <div class="attr-data">属性数据</div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {

            }
        },
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
        min-height: 836px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    .attr-data{
        height: 39px;
        line-height: 39px;
        border-top-right-radius: 4px;
        border-top-left-radius: 4px;
        background-color: #5090C1;
        padding-left: 15px;
        color: #fff;
    }
</style>
