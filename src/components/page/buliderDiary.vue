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
                        <el-select v-model="searchState" placeholder="请选择搜索条件">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <div class="demo-input-size">
                            <el-input size="small" placeholder="Search..." prefix-icon="el-icon-search" v-model="searchVelue"></el-input>
                        </div>
                        <el-button type="primary" icon="el-icon-search" @click="searchDep">搜索</el-button>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row class="btn">
          <el-button type="primary" round @click="handleAdd">新增</el-button>
        </el-row>
        <!-- 新增工程日志 -->
        <el-dialog title="新增/编辑工程日志" :visible.sync="dialogFormVisible" center width="70%" top="100px">
            <el-form :model="form" style="overflow: scroll;height:600px">
                <el-row class="el-row-col">
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="日志编号" :label-width="formLabelWidth">
                              <el-input v-model="form.diaryNumbetr" autocomplete="off" class="w_220"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="日志标题" :label-width="formLabelWidth">
                                <el-input v-model="form.diaryTitle" autocomplete="off" class="w_220"></el-input>
                            </el-form-item>
                        </div>     
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="日志类型" :label-width="formLabelWidth">
                                <el-select v-model="form.dairyType" placeholder="请选择日志类型" class="w_220">
                                    <el-option label="正常" value="正常"></el-option>
                                    <el-option label="停工" value="停工"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="平台通知人" :label-width="formLabelWidth">
                               <el-select v-model="platformPerson" placeholder="请选择" class="w_220">
                                    <el-option v-for="items in personsData" :key="items.id" :label="items.nickname" :value="items.nickname"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="el-row-col">
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="短信通知人" :label-width="formLabelWidth">
                                <el-select v-model="dairyMsguser" placeholder="请选择" class="w_220">
                                    <el-option v-for="items in personsData" :key="items.id" :label="items.nickname" :value="items.nickname"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="质量通知人" :label-width="formLabelWidth">
                                <el-select v-model="qualityPerson" placeholder="请选择" class="w_220">
                                    <el-option v-for="items in personsData" :key="items.id" :label="items.nickname" :value="items.nickname"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>     
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="安全通知人" :label-width="formLabelWidth">
                                <el-select v-model="safetyPerson" placeholder="请选择" class="w_220">
                                    <el-option v-for="items in personsData" :key="items.id" :label="items.nickname" :value="items.nickname"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="检查人" :label-width="formLabelWidth">
                                <el-select v-model="statePerson" placeholder="请选择" class="w_220">
                                    <el-option v-for="items in personsData" :key="items.id" :label="items.nickname" :value="items.nickname"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <div class="weather">天气情况</div>
                <el-row class="el-row-col">
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="天气" :label-width="formLabelWidth">
                                <el-input v-model="todayWeatherData.todayWeather" autocomplete="off" class="w_220"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="最低温度" :label-width="formLabelWidth">
                                <el-input v-model="todayWeatherData.todayTallTemperature" autocomplete="off" class="w_220"></el-input>
                            </el-form-item>
                        </div>     
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="最高温度" :label-width="formLabelWidth">
                                <el-input v-model="todayWeatherData.todayLowTemperature" autocomplete="off" class="w_220"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="风向" :label-width="formLabelWidth">
                                <el-input v-model="todayWeatherData.todayWindDirection" autocomplete="off" class="w_220"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="el-row-col">
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="风力" :label-width="formLabelWidth">
                                <el-input v-model="todayWeatherData.todayWindPower" autocomplete="off" class="w_220"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="PM2.5" :label-width="formLabelWidth">
                                <el-input v-model="todayWeatherData.todayPM" autocomplete="off" class="w_220"></el-input>
                            </el-form-item>
                        </div>     
                    </el-col>
                </el-row>
                <div class="weather">情况描述</div>
                <el-form-item label="施工情况概述">
                    <el-input type="textarea" v-model="form.constructionSituation" class="w_300"></el-input>
                </el-form-item>
                <div class="weather">附件</div>
                <el-form-item label="上传附件">
                    <el-upload
                      class="upload-demo"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-change="handleChange"
                      >
                      <el-button size="small" type="primary">点击上传</el-button>
                      <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 编辑工程日志 -->
        <el-dialog title="新增/编辑工程日志" :visible.sync="dialogFormVisibleEdit" center width="70%" top="100px">
            <el-form :model="form" style="overflow: scroll;height:600px">
                <el-row class="el-row-col">
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="日志编号" :label-width="formLabelWidth">
                              <el-input v-model="form.diaryNumbetr" autocomplete="off" class="w_220"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="日志标题" :label-width="formLabelWidth">
                                <el-input v-model="form.diaryTitle" autocomplete="off" class="w_220"></el-input>
                            </el-form-item>
                        </div>     
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="日志类型" :label-width="formLabelWidth">
                                <el-select v-model="form.dairyType" placeholder="请选择日志类型" class="w_220">
                                    <el-option label="正常" value="正常"></el-option>
                                    <el-option label="停工" value="停工"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="平台通知人" :label-width="formLabelWidth">
                               <el-select v-model="platformPerson" placeholder="请选择" class="w_220">
                                    <el-option v-for="items in personsData" :key="items.id" :label="items.nickname" :value="items.nickname"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="el-row-col">
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="短信通知人" :label-width="formLabelWidth">
                                <el-select v-model="dairyMsguser" placeholder="请选择" class="w_220">
                                    <el-option v-for="items in personsData" :key="items.id" :label="items.nickname" :value="items.nickname"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="质量通知人" :label-width="formLabelWidth">
                                <el-select v-model="qualityPerson" placeholder="请选择" class="w_220">
                                    <el-option v-for="items in personsData" :key="items.id" :label="items.nickname" :value="items.nickname"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>     
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="安全通知人" :label-width="formLabelWidth">
                                <el-select v-model="safetyPerson" placeholder="请选择" class="w_220">
                                    <el-option v-for="items in personsData" :key="items.id" :label="items.nickname" :value="items.nickname"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="检查人" :label-width="formLabelWidth">
                                <el-select v-model="statePerson" placeholder="请选择" class="w_220">
                                    <el-option v-for="items in personsData" :key="items.id" :label="items.nickname" :value="items.nickname"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <div class="weather">天气情况</div>
                <el-row class="el-row-col">
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="天气" :label-width="formLabelWidth">
                                <el-input v-model="todayWeatherData.todayWeather" autocomplete="off" class="w_220"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="最低温度" :label-width="formLabelWidth">
                                <el-input v-model="todayWeatherData.todayTallTemperature" autocomplete="off" class="w_220"></el-input>
                            </el-form-item>
                        </div>     
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="最高温度" :label-width="formLabelWidth">
                                <el-input v-model="todayWeatherData.todayLowTemperature" autocomplete="off" class="w_220"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="风向" :label-width="formLabelWidth">
                                <el-input v-model="todayWeatherData.todayWindDirection" autocomplete="off" class="w_220"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="el-row-col">
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="风力" :label-width="formLabelWidth">
                                <el-input v-model="todayWeatherData.todayWindPower" autocomplete="off" class="w_220"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="PM2.5" :label-width="formLabelWidth">
                                <el-input v-model="todayWeatherData.todayPM" autocomplete="off" class="w_220"></el-input>
                            </el-form-item>
                        </div>     
                    </el-col>
                </el-row>
                <div class="weather">情况描述</div>
                <el-form-item label="施工情况概述">
                    <el-input type="textarea" v-model="form.constructionSituation" class="w_300"></el-input>
                </el-form-item>
                <div class="weather">附件</div>
                <el-form-item label="上传附件">
                    <el-upload
                      class="upload-demo"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-change="handleChange"
                      >
                      <el-button size="small" type="primary">点击上传</el-button>
                      <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                    </el-upload>
                </el-form-item>
                <div class="weather">今日工作量</div>
                <el-row style="float:right">
                  <el-button type="primary" round @click="getSubSections">选择分部分项</el-button>
                  <el-button type="danger" round @click="dialogTaskVisible = true">选择任务</el-button>
                </el-row>
                <el-table :data="subSectionData" border style="width: 100%">
                  <el-table-column prop="noSubSection" label="编号" width="140" align="center"></el-table-column>
                  <el-table-column prop="titalSubSection" label="标题" width="140" align="center"></el-table-column>
                  <el-table-column prop="principalName" label="负责人" width="140" align="center"></el-table-column>
                  <el-table-column prop="unitName" label="计量单位" width="140" align="center"></el-table-column>
                  <el-table-column prop="projectTotal" label="工程总量" width="140" align="center"></el-table-column>
                  <el-table-column prop="unitName" label="累计完成量" width="140" align="center"></el-table-column>
                  <el-table-column prop="projectToday" label="今日完成量" width="140" align="center"></el-table-column>
                  <el-table-column prop="currentProgress" label="当前进度" align="center"></el-table-column>
                  <el-table-column label="操作" width="140" align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-edit" circle @click="btnSubitemEdit(scope.row)"></el-button>
                            <el-button type="danger" icon="el-icon-delete" circle @click="tableDelete(scope.row)"></el-button>
                        </template>  
                  </el-table-column>
                </el-table>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
                <el-button type="primary" @click="examineTo">审核通过</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 点击选择任务打开模态框 -->
        <el-dialog title="选择版本" :visible.sync="dialogTaskVisible" center width="60%">
          <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column label="版本名称" width="120" align="center">
                <template slot-scope="scope">{{ scope.row.date }}</template>
              </el-table-column>
              <el-table-column prop="name" label="版本号" width="120" align="center"></el-table-column>
              <el-table-column prop="address" label="时间单位" width="120" show-overflow-tooltip align="center"></el-table-column>
              <el-table-column prop="address" label="用途" width="180" show-overflow-tooltip align="center"></el-table-column>
              <el-table-column prop="address" label="创建人" width="120" show-overflow-tooltip align="center"></el-table-column>
              <el-table-column prop="address" label="创建日期" width="120" show-overflow-tooltip align="center"></el-table-column>
              <el-table-column prop="address" label="版本描述" show-overflow-tooltip align="center"></el-table-column>
            </el-table>
            <div style="margin-top: 20px">
              <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
              <el-button @click="toggleSelection()">取消选择</el-button>
            </div>
            <div class="btn-close">
                <el-button type="primary">下一步</el-button>
                <el-button type="success">关闭</el-button>
            </div>
        </el-dialog>
        <!-- 点击选择分部分项弹出模态框 -->
        <el-dialog title="关联分部分项" :visible.sync="dialogSubitemVisible" center width="60%">
            <el-select v-model="value" placeholder="选择版本" style="margin-bootom: 10px">
                <el-option v-for="item in selectData" :key="item.id" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-tree style="margin:10px" :data="treeData" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]" :props="defaultProps" @node-click="clickGetSubSectionItem"></el-tree>
            <div class="btn-close" style="margin-top: 20px">
                <el-button type="primary" @click="dialogSubitemVisible = false">关闭</el-button>
                <el-button type="success" @click="savaSubSectionItem">提交更改</el-button>
            </div>
        </el-dialog>
        <!-- 点击分部分项下面的编辑按钮弹出模态框 -->
        <el-dialog title="编辑分部分项" :visible.sync="dialogSubiemVisible" width="70%" center>
            <el-form>
              <el-row class="el-row-col">
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="编号" :label-width="formLabelWidth">
                                <el-input v-model="editSubitemDatas.noSubSection" autocomplete="off" class="w_220" :disabled="true"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="标题" :label-width="formLabelWidth">
                                <el-input v-model="editSubitemDatas.titalSubSection" autocomplete="off" class="w_220" :disabled="true"></el-input>
                            </el-form-item>
                        </div>     
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="负责人" :label-width="formLabelWidth">
                                <el-select v-model="editSubitemDatas.principalName" placeholder="请选择" class="w_220">
                                    <el-option v-for="items in personsData" :key="items.id" :label="items.nickname" :value="items.nickname"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="计量单位" :label-width="formLabelWidth">
                                <el-input v-model="editSubitemDatas.unitName" autocomplete="off" class="w_220" :disabled="true"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                     <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="工程总量" :label-width="formLabelWidth">
                                <el-input v-model="editSubitemDatas.projectTotal" autocomplete="off" class="w_220" :disabled="true"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="累计完成量" :label-width="formLabelWidth">
                                <el-input v-model="editSubitemDatas.unitName" autocomplete="off" class="w_220" :disabled="true"></el-input>
                            </el-form-item>
                        </div>     
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="今日完成量" :label-width="formLabelWidth">
                                <el-input v-model="editSubitemDatas.projectToday" autocomplete="off" class="w_220"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="当前进度" :label-width="formLabelWidth">
                                <el-input v-model="editSubitemDatas.currentProgress" autocomplete="off" class="w_220" :disabled="true"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogSubiemVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveSubitemEdit()">确 定</el-button>
            </div>
        </el-dialog>
        <el-table :data="findAllData" border style="width: 100%" @expand-change="clickFind">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-table :data="tableData.slice((currentPage - 1)*pageSize,currentPage*pageSize)" border style="width: 100%">
                            <el-table-column label="日志编号" width="180" align="center">
                                <template scope="scope">
                                    <div :class="{'active':isActive,'error':isError}" @click="clickNum(scope.row)">{{scope.row.diaryNumbetr}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="dairyType" label="日志类型" width="180" align="center"></el-table-column>
                            <el-table-column prop="diaryTitle" label="日志标题" width="180" align="center"></el-table-column>
                            <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
                            <el-table-column prop="updateTime" label="审核时间" width="180" align="center"></el-table-column>
                            <el-table-column prop="updateUsername" label="审核人" width="180" align="center"></el-table-column>
                            <el-table-column prop="createUsername" label="填写人" width="180" align="center"></el-table-column>
                            <el-table-column label="操作" width="180" align="center">               
                                <template slot-scope="scope">
                                    <el-button type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.row)"></el-button>
                                    <el-button type="danger" icon="el-icon-download" circle @click="downloadPDF(scope.row)"></el-button>
                                </template>       
                            </el-table-column>
                        </el-table>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="日志编号" prop="createUsername" align="center"></el-table-column>
        </el-table>
        <el-pagination style="text-align:center;margin-top: 10px;"
          background
          layout="prev, pager, next"
          :total="100"
          @current-change="current_change"
          >
        </el-pagination>
        <!-- 点击日志编号查看 -->
        <el-dialog title="工程日志" :visible.sync="dialogFormVisible1" center width="70%" top="100px">
            <el-form :model="form">
                <el-row class="el-row-col">
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="日志编号" :label-width="formLabelWidth">
                              <el-input v-model="form.diaryNumbetr" autocomplete="off" class="w_220" :disabled="true"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="日志标题" :label-width="formLabelWidth">
                                <el-input v-model="form.diaryTitle" autocomplete="off" class="w_220" :disabled="true"></el-input>
                            </el-form-item>
                        </div>     
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="日志类型" :label-width="formLabelWidth">
                                <el-input v-model="form.dairyType" autocomplete="off" class="w_220" :disabled="true"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="平台通知人" :label-width="formLabelWidth">
                                <el-input v-model="form.platformPerson" autocomplete="off" class="w_220" :disabled="true"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="el-row-col">
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="停工开始时间" :label-width="formLabelWidth">
                                <el-input v-model="form.todayTallTemperature" autocomplete="off" class="w_220" :disabled="true"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="停工结束时间" :label-width="formLabelWidth">
                                <el-input v-model="form.todayLowTemperature" autocomplete="off" class="w_220" :disabled="true"></el-input>
                            </el-form-item>
                        </div>     
                    </el-col>
                </el-row>
                <div class="weather">天气情况</div>
                <el-row class="el-row-col">
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="风力" :label-width="formLabelWidth">
                                <el-input v-model="form.todayWeather" autocomplete="off" class="w_220" :disabled="true"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-form-item label="PM2.5" :label-width="formLabelWidth">
                                <el-input v-model="form.todayPM" autocomplete="off" class="w_220" :disabled="true"></el-input>
                            </el-form-item>
                        </div>     
                    </el-col>
                </el-row>
                <div class="weather">情况描述</div>
                <el-form-item label="停工情况概述">
                    <el-input type="textarea" v-model="form.constructionSituation" class="w_300" :disabled="true"></el-input>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                findAllData: [],// 日志组数据
                tableData5: [{
                    createTime: '33',
                    reateUsername: '222',
                    groupNumber: '555',
                    id: '1',
                    sOverdue: '77',
                    heirDepartmentId: '88',
                    heirProjectId: '99',
                    heirProjectName: '000',
                    pdateTime: '789',
                    pdateUsername: '456',
                }],
                // 树形结构
                pageSize: 6,// 每页展示条数
                currentPage: 1,// 当前页
                dialogSubiemVisible: false,// 点击分部分项下面的编辑弹出模态框
                dialogFormVisibleEdit: false,
                // 新增弹出对话框  
                dialogFormVisible1: false,
                dialogTableVisible: false,
                dialogFormVisible: false,
                dialogTaskVisible: false, // 点击选择任务打开模态框
                dialogSubitemVisible: false,// 点击分部分项打开模态框
                classA: 'green',// 日志编号颜色
                isActive: true,
                isError: false,
                searchState: '',// 搜索条件
                searchVelue: '',// 搜索模糊条件
                searchObj: {
                    logGroupId: '',
                },// 要筛选的集合
                builderDiaryId: '',
                oldData: [], // 保存已经加载的子节点内容的父id
                treeData: [], // 获取分布分项树形结构的数据
                defaultProps: {
                    children: 'children',
                    label: 'labelName',
                },
                subitemData: [],// 渲染分部分项表格数据的集合
                todayWeatherData: [],// 天气数据集合
                personsData: [],// 获取所有人的集合
                personInfo: [], // 人员信息
                platformPerson: '',// 通知人
                statePerson: '',// 检查人
                dairyMsguser: '',//短信通知人
                qualityPerson: '',// 质量通知人
                safetyPerson: '',// 安全通知人
                subSectionData: [],// 渲染分部分项施工日志的数据集合
                subSectionDatas: { // 编辑分部分项施工日志工作量
                    noSubSection: '',// 编号
                    pid: '', // 分部分项pid
                    principalName: '', // 负责人姓名
                    projectToday: '',// 当日完成量
                    projectTotal: '', // 工程总量
                    diarySubSectionId: '',// 分部分项id
                    titalSubSection: '', // 标题
                    unitName: '', // 计量单位
                    currentProgress: '',// 当前进度
                    diaryId: ''
                },
                editSubitemDatas: {
                    principalName: '', // 负责人姓名
                    projectToday: '',// 当日完成量
                },
                editSubData: [], // 分部分项施工日志编辑的内容
                editSubitemData: [],// 编辑分部分项施工日志工作量
                subitemDataId: '',
                subiemDatas: [], // 保存分部分项的数据
                // 下拉框
                options: [
                    {
                        value: 'diaryNumbetr',
                        label: '日志编号'
                    }, 
                    {
                        value: 'dairyType',
                        label: '日志类型'
                    }, 
                    {
                        value: 'diaryTitle',
                        label: '日志标题'
                    }
                ],
                value: '',
                // 上传附件
                fileList3: [{
                  name: 'food.jpeg',
                  url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }, {
                  name: 'food2.jpeg',
                  url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }],
                tableData: [],
                form: {
                    builderDiaryId: '',
                    diaryNumbetr: '', // 日志编号
                    diaryTitle: '', // 日志标题
                    dairyType: '',// 日志类型
                    dairyTypeId: '',// 平台通知人
                    dairyMsguser: '',// 短信通知人
                    dairyQualityuser: '',// 质量通知人
                    dairySafeuser: '',// 安全通知人
                    dairyCheckuser: '', // 检查人
                    createTime: '', // 创建时间
                    updateTime: '', // 审核时间
                    updateUsername: '',// 审核人
                    createUsername: '',// 填写人
                    logGroupId: '',
                    constructionSituation: '',// 施工情况概述
                    accessory: '', // 附件
                    todayWeather: '',// 天气
                    todayTallTemperature: '',// 最低气温
                    todayLowTemperature: '',// 最高气温
                    todayWindDirection: '',// 风向
                    todayWindPower: '',// 风力
                    todayPM: '',// PM
                },
                tableData3: [{
                  date: '2016-05-03',
                  name: '王小虎',
                  address: '上海市'
                }, {
                  date: '2016-05-02',
                  name: '王小虎',
                  address: '上海市'
                }, {
                  date: '2016-05-04',
                  name: '王小虎',
                  address: '上海市'
                }, {
                  date: '2016-05-01',
                  name: '王小虎',
                  address: '上海市'
                }, {
                  date: '2016-05-08',
                  name: '王小虎',
                  address: '上海市'
                }, {
                  date: '2016-05-06',
                  name: '王小虎',
                  address: '上海市'
                }, {
                  date: '2016-05-07',
                  name: '王小虎',
                  address: '上海市'
                }],
                multipleSelection: [],
                selectData: [],// 分部分项下拉列表数据
                formLabelWidth: '100px',
                // 树形结构数据
                subSectionIds: [],
                uniqueNums: [],
                projectNames: [],
                parentIds: []
            }
        },
        mounted () {
            this.$nextTick(function (){

            })  
        },
        created () {
            this.queryExcelFiles();
            this.getPersons();
            this.getFindAllId();
            // this.getPersonsInfo();
        },
        methods: {
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
            // 上传附件
            handleChange(file, fileList) {
              this.fileList3 = fileList.slice(-3);
            },
            // 分页导航
            current_change(currentPage){
                this.currentPage = currentPage;
            },
            // 获取所有的人员信息
            getPersonsInfo () {
                this.$axios({
                    url: 'bjpersonnelmgt/personInfo/getPersonInfo',
                    method: 'post',
                }).then((result) => {
                    if (result.data.code == 200) {
                        console.log(result.data)
                    }
                }).catch((err) => {
                    
                });
            },
            // 点击日志编号单元格号弹出模态框
            clickNum (row) {
                this.form.diaryNumbetr = row.diaryNumbetr;
                this.form.diaryTitle = row.diaryTitle;
                this.form.dairyType = row.dairyType;
                this.form.todayWeather = row.todayWeather;
                this.form.todayTallTemperature = row.todayTallTemperature;
                this.form.todayLowTemperature = row.todayLowTemperature;
                this.form.todayWindDirection = row.todayWindDirection;
                this.form.todayWindPower = row.todayWindPower;
                this.form.todayPM = row.todayPM;
                this.form.constructionSituation = row.constructionSituation;
                if (row.isOverdue == 1) {
                    this.isError = true;  
                    this.isActive = false;
                } else {
                    this.isError = false;
                    this.isActive = true;
                }
                this.dialogFormVisible1 = true;
            },
            // 下载pdf文件
            downloadPDF (row) {
                // console.log(row.builderDiaryId)
                this.$axios({
                    url: '/bjmpp/builderDiary/exportPDF?builderDiaryId='+row.builderDiaryId,
                    method: 'post',
                    responseType: 'blob'
                }).then((result) => {
                    if (result.status == 200){
                        let blob = new Blob([result.data],{ type: 'application/pdf;charset=utf-8' });
                        let objectUrl = URL.createObjectURL(blob);// 创建下载的链接
                        let downloadElement = document.createElement('a');
                        let fname = 'temp';
                        downloadElement.href = objectUrl;
                        downloadElement.setAttribute("download", fname);
                        document.body.appendChild(downloadElement);
                        downloadElement.click();// 点击下载
                        document.body.removeChild(downloadElement);// 下载完移除元素
                        window.URL.revokeObjectURL(href);// 释放掉bobl对象
                    }
                }).catch((err) => {
                    console.log(err)
                });
            },
            // 获取日志组ID
            getFindAllId () {
                this.$axios({
                    url: 'bjmpp/builderDiaryGroup/findAll',
                    method: 'post',
                    data: {}
                }).then((result) => {
                    if (result.status == 200) {
                        this.findAllData = result.data.data.rows;
                    }
                }).catch((err) => {
                    console.log(err)
                });
            },
            // 点击日志组
            clickFind () {
                for (var i = 0;i < this.findAllData.length;i++) {
                    var logGroupId = this.findAllData[i].id;
                }
                this.getAddData(logGroupId)
            },
            // 获取新增数据
            getAddData (id) {
                this.searchObj.logGroupId = id;
                this.$axios({
                    url: 'bjmpp/builderDiary/queryBuilderDiary',
                    method: 'post',
                    data: this.searchObj
                }).then((result) => {
                    if (result.status == 200) {
                        this.tableData = result.data.data.rows; 
                        var list = result.data.data.rows; 
                        for (var i = 0;i < list.length;i++) {
                            var rowId = list[i].builderDiaryId;
                        }     
                    }
                }).catch((err) => {
                    console.log(err)
                });
            },
             // 搜索
            searchDep () {
                this.searchObj = {};
                const key = this.searchState;
                const value = this.searchObj;
                value[key] = this.searchVelue;
                this.getAddData();
            },
            // 新增列表数据
            handleAdd (row) {
                this.form.todayWeather = row.todayWeather;
                this.form.todayTallTemperature = row.todayTallTemperature;
                this.form.todayLowTemperature = row.todayLowTemperature;
                this.form.todayWindDirection = row.todayWindDirection;
                this.form.todayWindPower = row.todayWindPower;
                this.form.todayPM = row.todayPM;
                this.form.builderDiaryId = '';
                this.form.diaryNumbetr = '';
                this.form.diaryTitle = '';
                this.form.dairyType = '';
                this.form.logGroupId = '';
                this.form.dairyTypeId = '';
                this.form.dairyMsguser = '';
                this.form.dairyQualityuser = '';
                this.form.dairySafeuser = '';
                this.form.dairyCheckuser = '';
                this.form.createTime = '';
                this.form.updateTime = '';
                this.form.updateUsername = '';
                this.form.createUsername = '';
                this.form.constructionSituation = '';
                this.form.accessory = '';
                this.dialogFormVisible = true;
                this.getTodayWeather();        
            },
            // 点击编辑列表数据
            handleEdit (row) {
                this.form.todayWeather = row.todayWeather;
                this.form.todayTallTemperature = row.todayTallTemperature;
                this.form.todayLowTemperature = row.todayLowTemperature;
                this.form.todayWindDirection = row.todayWindDirection;
                this.form.todayWindPower = row.todayWindPower;
                this.form.todayPM = row.todayPM;
                this.form.builderDiaryId = row.id;
                this.form.diaryNumbetr = row.diaryNumbetr;
                this.form.diaryTitle = row.diaryTitle;
                this.form.dairyType = row.dairyType;
                this.form.dairyTypeId = row.dairyTypeId;
                this.form.dairyMsguser = row.dairyMsguser;
                this.form.dairyQualityuser = row.dairyQualityuser;
                this.form.dairySafeuser = row.dairySafeuser;
                this.form.dairyCheckuser = row.dairyCheckuser;
                this.form.createTime = row.createTime;
                this.form.updateTime = row.updateTime;
                this.form.updateUsername = row.updateUsername;
                this.form.createUsername = row.createUsername;
                this.form.constructionSituation = row.constructionSituation;
                this.form.accessory = row.accessory;
                this.form.todayWeather = row.todayWeather;
                this.form.todayTallTemperature = row.todayTallTemperature;
                this.form.todayLowTemperature = row.todayLowTemperature;
                this.form.todayWindDirection = row.todayWindDirection;
                this.form.todayWindPower = row.todayWindPower;
                this.form.todayPM = row.todayPM;  
                this.dialogFormVisibleEdit = true;
                this.getTodayWeather();            
            },

            // 将数据添加到列表
            saveAdd () {
                for (var i = 0;i < this.findAllData.length;i++) {
                    var logGroupId = this.findAllData[i].id;
                }
                var editId = this.form.builderDiaryId;
                this.form.logGroupId = logGroupId;
                console.log(this.form.logGroupId)
                if (editId == '' || editId == null) {
                    // 新增
                    this.$axios({
                        url: 'bjmpp/builderDiary/addBuilderDiary',
                        method: 'post',
                        data: this.form
                    }).then((result) => {
                        this.getAddData(logGroupId);
                        if (result.status == 200) { 
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
            // 编辑数据列表
            saveEdit () {
                this.$axios({
                    url: '/bjmpp/builderDiary/update',
                    method: 'post',
                    data: this.form
                }).then((result) => {
                    this.getAddData();
                    this.$message.success(`操作成功`);
                }).catch((err) => {
                    this.$message.error(`操作失败`);
                });    
                this.dialogFormVisibleEdit = false;
            },
            // 审核施工日志工作量
            examineTo () {
                var editId = this.form.builderDiaryId;
                this.$axios({
                    url: 'bjmpp/builderDiary/auditDiarySubSection?BuilderDiaryId='+editId,
                    method: 'post',
                }).then((result) => {
                    if (result.status == 200) {
                        console.log(result.data)
                    }
                }).catch((err) => {
                    console.log(err)
                });
                this.dialogFormVisible = false;
            },
            // 获取所有的人的列表数据
            getPersons () {
                this.$axios({
                    url: 'bjupm/users/findAll',
                    method: 'post',
                    data: {}
                }).then((result) => {
                    if (result.data.code == 200) {
                        this.personsData = result.data.data.rows;
                    }                  
                }).catch((err) => {
                    console.log(err)
                });
            },
            // 获取天气状况的数据
            getTodayWeather () {
                this.$axios({
                    url: 'bjmpp/weather/today?city='+'上海',
                    method: 'post',
                }).then((result) => {
                    if (result.status == 200) {
                        this.todayWeatherData = result.data.data;
                    }
                }).catch((err) => {
                    
                });
            },
            // 显示分部分项模态框
            getSubSections () {
                this.getSubSectionItem(0);
                this.dialogSubitemVisible = true;
            },
            // 点击树形同时查询分部分项
            clickGetSubSectionItem (indeterminate) {
                const checkId = indeterminate.id;
                this.getSubSectionItem (checkId)
            },
            // 查询分部分项
            getSubSectionItem (parentId) {
                var bool = true;
                var oldDatas = this.oldData;
                for (var i = 0;i < oldDatas.length;i++) {
                    if (oldDatas[i] == parentId) {
                        bool = false;
                    }
                }
                if (bool) {
                    oldDatas.push(parentId);
                    this.$axios({
                        url: 'bjbasicdata/subSectionItem/query?parentId='+parentId,
                        method: 'post',
                    }).then((result) => {
                        if (result.data.code == 200) {
                            const treeDataList = result.data.data;
                            this.subitemData = result.data.data;
                            for (var i = 0;i < treeDataList.length;i++) {
                                const tree = {
                                    id: treeDataList[i].id,
                                    parentId: treeDataList[i].parentId,
                                    labelName: treeDataList[i].projectName,
                                    children: []
                                }
                                this.subSectionIds = treeDataList[i].subSectionItemId;
                                this.uniqueNums = treeDataList[i].uniqueNum;
                                this.projectNames = treeDataList[i].projectName;
                                this.parentIds = treeDataList[i].parentId;
                                this.treeData.push(tree);
                            }
                            this.buildTree(this.treeData,0)      
                        }
                    }).catch((err) => {
                        console.log(err)
                    });
                }
            },  
            // 将数组转换为树形结构
            buildTree (data,pid) {
                var tre = [];
                var temp;
                for (var i = 0;i < data.length;i++) {
                    if (data[i].parentId == pid) {
                        const obj = data[i];
                        temp = this.buildTree(data,data[i].id)
                        if (temp.length >  0) {
                            obj.children = temp;
                        }
                        tre.push(obj)
                    }
                }
                this.treeData = tre;
                return tre;
            },
            // 保存分部分项的数据
            savaSubSectionItem () {
                for (var i in this.subitemData) {
                    var obj = {
                        noSubSection: this.subitemData[i].uniqueNum,// 编号
                        pid: this.subitemData[i].parentId, // 分部分项pid
                        principalName: this.subitemData[i].principalName, // 负责人姓名
                        projectToday: this.subitemData[i].projectToday,// 当日完成量
                        projectTotal: this.subitemData[i].totalProject, // 工程总量
                        diarySubSectionId: this.subitemData[i].subSectionItemId,// 分部分项id
                        titalSubSection: this.subitemData[i].projectName, // 标题
                        unitName: this.subitemData[i].unit, // 计量单位
                        currentProgress: '',// 当前进度
                        diaryId: this.subitemData[i].projectId
                    }
                    this.subiemDatas.push(obj);
                    // this.subSectionDatas = obj;            
                }
                this.$axios({
                    url: 'bjmpp/builderDiary/addDiarySubSection',
                    method: 'post',
                    data: this.subiemDatas
                }).then((result) => {                   
                    if (result.status == 200) {
                        this.updateSubSectionItem();
                    }
                }).catch((err) => {
                    console.log(err)
                });
                this.dialogSubitemVisible = false;
            },
            // 获取到分部分项的数据然后渲染到表格
            updateSubSectionItem () {
                for (var i = 0;i < this.subitemData.length;i++) {
                    this.subitemDataId = this.subitemData[i].parentId;
                }
                this.$axios({
                    url: 'bjmpp/builderDiary/queryDiarySubSection?builderDiaryID='+this.subitemDataId,
                    method: 'post',
                }).then((result) => {
                    if (result.status == 200) {
                        this.subSectionData = result.data;
                    }
                }).catch((err) => {
                    console.log(err)
                });
            },
            // 点击编辑分部分项按钮
            btnSubitemEdit (row) {
                var editId = row.diarySubSectionId;
                if (row.id) {
                    this.editSubitemDatas.principalName = row.principalName;
                    this.editSubitemDatas.projectToday = row.projectToday;
                    this.editSubitemDatas.projectTotal = row.projectToday; // 工程总量
                    this.editSubitemDatas.diarySubSectionId = row.diarySubSectionId;
                    this.editSubitemDatas.noSubSection = row.noSubSection;// 编号
                    this.editSubitemDatas.pid = row.pid; // 分部分项pid
                    this.editSubitemDatas.titalSubSection = row.titalSubSection; // 标题
                    this.editSubitemDatas.unitName = row.unitName; // 计量单位
                    this.editSubitemDatas.currentProgress = row.currentProgress;// 当前进度
                    this.editSubitemDatas.diaryId = row.diaryId;
                    this.editSubData.push(this.editSubitemDatas)
                }
                this.dialogSubiemVisible = true;
            },
            // 编辑分部分项施工日志工作量
            saveSubitemEdit () { 
                this.$axios({
                    url: 'bjmpp/builderDiary/updateDiarySubSection',
                    method: 'post',
                    data: this.editSubData
                }).then((result) => {
                    if (result.status == 200) {
                        this.updateSubSectionItem();
                        console.log(result.data)
                        this.$message.success(`操作成功`);
                    } else {
                        this.$message.error(`操作失败`);
                    }
                }).catch((err) => {
                    console.log(err)
                });
                this.dialogSubiemVisible = false;
            },
            // 删除功能
            tableDelete(row) {
                this.$confirm('您是否确定删除该项?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    this.deleteRow(row.diarySubSectionId)
                })
            },
            // 删除分部分项施工日志工作量的行
            deleteRow (id) {
                this.$axios({
                    url: 'bjmpp/builderDiary/deleteDiarySubSection?diarySubSectionId='+id,
                    method: 'post',
                }).then((result) => {
                     if (result.status == 200){
                        this.updateSubSectionItem();
                        this.$message.success(`删除成功`);
                    }else {
                        this.$message.error(`删除失败`);
                    }
                }).catch((err) => {
                    console.log(err)
                });
            },
            // 查询excel文件
            queryExcelFiles () {
                this.$axios({
                    url: 'bjbasicdata/subSectionItem/queryExcelFiles',
                    method: 'post'
                }).then((result) => {
                    if (result.data.code == 200) {
                        this.selectData = result.data.data;
                    }
                }).catch((err) => {
                    console.log(err)
                });
            }
        }
    }
</script>

<style scoped>
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
    .btn-close{
        text-align: center;
    }
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
    .w_220{
        width: 220px;
    }
    .weather{
        margin-bottom: 20px;
        margin-left: 20px;
        color: orange;
        font-weight: bold;
    }
    .w_300{
        width: 500px;
    }
    .demo-table-expand {
        font-size: 0;
        margin-top: -8px;
        margin-bottom: -20px;
        margin-right: -50px;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>