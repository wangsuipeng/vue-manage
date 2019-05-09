<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> 组织信息管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="message"   @tab-click="tagChange">
                <el-tab-pane :label="`部门`" name="first">
                    <template>
                        <div class="handle-box">
                            <el-select v-model="searchDepKey" placeholder="筛选条件">
                                <el-option label="查找所有" value=""></el-option>
                                <el-option label="部门名称" value="name"></el-option>
                                <el-option label="创建人" value="createUsername"></el-option>
                            </el-select>
                            <el-input v-model="searchDepVelue" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                            <el-button type="primary" icon="search" @click="searchDep">搜索</el-button>
                            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleEdit">新增</el-button>
                        </div>
                        <el-table :data="department" stripe style="width: 100%" border  height="500">
                            <el-table-column prop="id" label="部门ID" width="180" fixed ></el-table-column>
                            <el-table-column prop="name" label="部门名称" width="180" fixed ></el-table-column>
                            <el-table-column prop="createUsername" label="创建人"  width="180"> </el-table-column>
                            <el-table-column prop="createTime" label="创建日期"> </el-table-column>
                            <el-table-column prop="desc" label="备注"> </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                                    <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                                    <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="pagination">
                            <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="total">
                            </el-pagination>
                        </div>

                    </template>
                </el-tab-pane>

                <el-tab-pane :label="`岗位`" name="second">
                    <template v-if="message === 'second'">
                        <div class="handle-box">
                            <el-select v-model="searchPostKey" placeholder="筛选条件">
                                <el-option label="查找所有" value=""></el-option>
                                <el-option label="岗位名称" value="name"></el-option>
                                <el-option label="创建人" value="createUsername"></el-option>
                            </el-select>
                            <el-input v-model="searchPostVelue" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                            <el-button type="primary" icon="search" @click="searchPost">搜索</el-button>
                            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleEdit">新增</el-button>
                        </div>
                        <el-table :data="posts" stripe style="width: 100%" border  height="500">
                            <el-table-column prop="id" label="岗位ID" width="180" fixed ></el-table-column>
                            <el-table-column prop="name" label="岗位名称" width="180" fixed ></el-table-column>
                            <el-table-column prop="createUsername" label="创建人"  width="180"> </el-table-column>
                            <el-table-column prop="createTime" label="创建日期"> </el-table-column>
                            <el-table-column prop="desc" label="备注"> </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                                    <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                                    <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="pagination">
                            <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="total">
                            </el-pagination>
                        </div>
                    </template>
                </el-tab-pane>

                <el-tab-pane :label="`用户`" name="third">
                    <template v-if="message === 'third'">
                        <div class="handle-box">
                            <el-select v-model="searchUserKey" placeholder="筛选条件">
                                <el-option label="查找所有" value=""></el-option>
                                <el-option label="用户名称" value="username"></el-option>
                                <el-option label="真实姓名" value="nickname"></el-option>
                                <el-option label="性别" value="sex"></el-option>
                                <el-option label="手机" value="phone"></el-option>
                                <el-option label="邮箱" value="email"></el-option>
                                <el-option label="创建人" value="createUsername"></el-option>
                            </el-select>
                            <el-input v-model="searchUserValue" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                            <el-button type="primary" icon="search" @click="searchUser">搜索</el-button>
                            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleEdit">新增</el-button>
                        </div>
                        <el-table :data="users" stripe style="width: 100%" border  height="500">
                            <el-table-column prop="id" label="用户ID" width="180" fixed ></el-table-column>
                            <el-table-column prop="username" label="用户名称"></el-table-column>
                            <el-table-column prop="nickname" label="真实姓名"></el-table-column>
                            <el-table-column  prop="sex" label="性别"></el-table-column>
                            <el-table-column prop="phone" label="手机"></el-table-column>
                            <el-table-column prop="email" label="邮箱"></el-table-column>
                            <el-table-column prop="createUsername" label="创建人"> </el-table-column>
                            <el-table-column prop="createTime" label="创建日期"> </el-table-column>
                            <el-table-column prop="desc" label="备注"> </el-table-column>
                             <el-table-column   label="角色"  >
                                <template slot-scope="scope">
                                    <el-button @click="bindUserRole(scope.row)" type="text" size="small">绑定角色</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column fixed="right" label="操作" width="180" >
                                <template slot-scope="scope">
                                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                                    <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                                    <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="pagination">
                            <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="total">
                            </el-pagination>
                        </div>
                    </template>
                </el-tab-pane>

                <el-tab-pane :label="`角色`" name="forth">
                    <template v-if="message === 'forth'">
                        <div class="handle-box">
                            <el-select v-model="searchRoleKey" placeholder="筛选条件">
                                <el-option label="查找所有" value=""></el-option>
                                <el-option label="角色名称" value="name"></el-option>
                                <el-option label="创建人" value="createUsername"></el-option>
                            </el-select>
                            <el-input v-model="searchRoleValue" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                            <el-button type="primary" icon="search" @click="searchRole" >搜索</el-button>
                            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleEdit">新增</el-button>
                        </div>
                        <el-table :data="roles" stripe style="width: 100%" border  height="500">
                            <el-table-column prop="id" label="角色ID" width="180" fixed ></el-table-column>
                            <el-table-column prop="name" label="角色名称"></el-table-column>
                            <el-table-column prop="createUsername" label="创建人"> </el-table-column>
                            <el-table-column prop="createTime" label="创建日期"> </el-table-column>
                            <el-table-column prop="desc" label="备注"> </el-table-column>
                            <el-table-column fixed="right" label="权限" width="180" >
                                <template slot-scope="scope">
                                    <el-button @click="bindRoleFunc(scope.row)" type="text" size="small">绑定权限</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column fixed="right" label="部门" width="180" >
                                <template slot-scope="scope">
                                    <el-button @click="bindRoleDep(scope.row)" type="text" size="small">绑定部门</el-button>
                                </template>
                            </el-table-column>
                           <el-table-column fixed="right" label="项目" width="180" >
                                <template slot-scope="scope">
                                    <el-button @click="bindRoleProj(scope.row)" type="text" size="small">绑定项目</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column fixed="right" label="操作" width="180" >
                                <template slot-scope="scope">
                                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                                    <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                                    <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="pagination">
                            <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="total">
                            </el-pagination>
                        </div>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>

        <el-dialog title="编辑部门信息" :visible.sync="editVisible" width="30%" >
            <el-form :model="form">
                <el-form-item label="公司名称">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>

                 <el-form-item label="上级部门">
                    <el-select v-model="form.pid" >
                        <el-option v-for="item in parentDeps" :key="item.id" :label="item.name" :value="item.id"></el-option>
                   </el-select>
                </el-form-item>

                <el-form-item label="备注">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="查看部门信息" :visible.sync="checkVisible">
            <el-form :model="form">
                <el-form-item label="部门名称">
                    <el-input v-model="form.name" autocomplete="off"  :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="创建人">
                    <el-input v-model="form.createUsername" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>

                <el-form-item label="创建日期">
                    <el-date-picker type="date"  :disabled="true" placeholder="选择日期" v-model="form.createTime" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="form.desc"  :disabled="true"></el-input>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog title="编辑岗位信息" :visible.sync="editVisibleP" width="30%" >
            <el-form :model="formP">
                <el-form-item label="岗位名称">
                    <el-input v-model="formP.name" autocomplete="off"></el-input>
                </el-form-item>

                 <el-form-item label="所属部门">
                    <el-select v-model="formP.departmentId" >
                        <el-option v-for="item in parentDepP" :key="item.id" :label="item.name" :value="item.id"></el-option>
                   </el-select>
                </el-form-item>

                <el-form-item label="备注">
                    <el-input type="textarea" v-model="formP.desc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisibleP = false">取 消</el-button>
                <el-button type="primary" @click="saveEditP">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="查看岗位信息" :visible.sync="checkVisibleP">
            <el-form :model="formP">
                <el-form-item label="岗位名称">
                    <el-input v-model="formP.name" autocomplete="off"  :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="创建人">
                    <el-input v-model="formP.createUsername" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>

                <el-form-item label="创建日期">
                    <el-date-picker type="date"  :disabled="true" placeholder="选择日期" v-model="formP.createTime" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="formP.desc"  :disabled="true"></el-input>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog title="编辑用户信息" :visible.sync="editVisibleU" width="30%" >
            <el-form :model="formU">
                <el-form-item label="用户名称">
                    <el-input v-model="formU.username" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="密码" v-if="passwordCan">
                    <el-input v-model="formU.password" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="真实姓名">
                    <el-input v-model="formU.nickname" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="性别">
                    <el-radio v-model="formU.sex" label="男">男</el-radio>
                    <el-radio v-model="formU.sex" label="女">女</el-radio>
                </el-form-item>

                <el-form-item label="手机">
                    <el-input v-model="formU.phone" autocomplete="off"  @keyup.native="proving" maxlength="11"></el-input>
                </el-form-item>

                <el-form-item label="邮箱">
                    <el-input v-model="formU.email" autocomplete="off"></el-input>
                </el-form-item>

                 <el-form-item label="所属部门">
                    <el-select v-model="formU.theirDepartmentId" @change="checkPosts">
                        <el-option v-for="item in parentDepP" :key="item.id" :label="item.name" :value="item.id"></el-option>
                   </el-select>
                </el-form-item>

                <el-form-item label="所属岗位">
                    <el-select v-model="formU.stationId" >
                        <el-option v-for="item in posts" :key="item.id" :label="item.name" :value="item.id"></el-option>
                   </el-select>
                </el-form-item>

                <el-form-item label="备注">
                    <el-input type="textarea" v-model="formU.desc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisibleU = false">取 消</el-button>
                <el-button type="primary" @click="saveEditU">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="查看用户信息" :visible.sync="checkVisibleU">
            <el-form :model="formU">
                <el-form-item label="用户名称">
                    <el-input v-model="formU.username" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>

                <el-form-item label="真实姓名">
                    <el-input v-model="formU.nickname" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>

                <el-form-item label="性别">
                    <el-radio v-model="formU.sex" label="男"  :disabled="true">男</el-radio>
                    <el-radio v-model="formU.sex" label="女"  :disabled="true">女</el-radio>
                </el-form-item>

                <el-form-item label="手机">
                    <el-input v-model="formU.phone" autocomplete="off"  @keyup.native="proving" maxlength="11"  :disabled="true"></el-input>
                </el-form-item>

                <el-form-item label="邮箱">
                    <el-input v-model="formU.email" autocomplete="off"  :disabled="true"></el-input>
                </el-form-item>

                 <el-form-item label="所属部门">
                    <el-select v-model="formU.theirDepartmentId" :on-change="checkPosts"  :disabled="true">
                        <el-option v-for="item in parentDepP" :key="item.id" :label="item.name" :value="item.id"></el-option>
                   </el-select>
                </el-form-item>

                <el-form-item label="所属岗位"  >
                    <el-select v-model="formU.stationId" :disabled="true">
                        <el-option v-for="item in posts" :key="item.id" :label="item.name" :value="item.id"></el-option>
                   </el-select>
                </el-form-item>

                <el-form-item label="创建人">
                    <el-input v-model="formU.createUsername" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>

                <el-form-item label="创建日期">
                    <el-date-picker type="date"  :disabled="true" placeholder="选择日期" v-model="formU.createTime" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>

                <el-form-item label="备注">
                    <el-input type="textarea" v-model="formU.desc" :disabled="true"></el-input>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog title="绑定角色" :visible.sync="bindU">
            <el-row>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <p>请选择角色所在的公司对角色进行查询：</p>
                    <el-tree :data="geTree" :props="defaultProps"  @node-click="handleNodeClick"> </el-tree>
                </div>
            </el-col>
            <el-col :span="12">
                <div >
                     <p v-if="chooseDepart">{{chooseDepart}}下的角色：</p>
                    <el-checkbox-group  v-for="item in chooseRoles" v-model="checkRoles">
                        <el-checkbox  :label="item.id" name="type">{{item.name}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </el-col>
            </el-row>
           <span slot="footer" class="dialog-footer">
                <el-button @click="bindU = false">取 消</el-button>
                <el-button type="primary" @click="saveBindU">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="绑定菜单" :visible.sync="bindF">
            <div class="grid-content bg-purple">
                <el-tree :data="geTreeFuncs" :props="defaultProps" show-checkbox node-key="id"  :default-checked-keys="chooseMenuIds" @check-change="handleCheckChangeM"> </el-tree>
            </div>
           <span slot="footer" class="dialog-footer">
                <el-button @click="bindF = false">取 消</el-button>
                <el-button type="primary" @click="saveBindM">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="绑定部门" :visible.sync="bindD">
            <el-tree :data="geTree" :props="defaultProps" show-checkbox node-key="id"  :default-checked-keys="chooseDeptIds" @check-change="handleCheckChangeD"> </el-tree>
           <span slot="footer" class="dialog-footer">
                <el-button @click="bindD = false">取 消</el-button>
                <el-button type="primary" @click="saveBindD">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="绑定项目" :visible.sync="bindP">
            <el-row>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <p>请选择角色所要绑定的项目：</p>
                    <el-tree :data="geTree" :props="defaultProps"  @node-click="handleNodeClickP"> </el-tree>
                </div>
            </el-col>
            <el-col :span="12">
                <div >
                    <p v-if="chooseDepart">{{chooseDepart}}下的项目：</p>
                    <el-checkbox-group  v-for="item in chooseProjects" v-model="checkProject">
                        <el-checkbox  :label="item.id" name="type">{{item.name}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </el-col>
            </el-row>
           <span slot="footer" class="dialog-footer">
                <el-button @click="bindP = false">取 消</el-button>
                <el-button type="primary" @click="saveBindP">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="编辑角色信息" :visible.sync="editVisibleR" width="30%" >
            <el-form :model="formU">
                <el-form-item label="角色名称">
                    <el-input v-model="formR.name" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="所属部门">
                    <el-select v-model="formR.theirDepartmentId" >
                        <el-option v-for="item in parentDepP" :key="item.id" :label="item.name" :value="item.id"></el-option>
                   </el-select>
                </el-form-item>

                <el-form-item label="备注">
                    <el-input type="textarea" v-model="formR.desc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisibleU = false">取 消</el-button>
                <el-button type="primary" @click="saveEditR">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="查看角色信息" :visible.sync="checkVisibleR">
            <el-form :model="formR">
                <el-form-item label="角色名称">
                    <el-input v-model="formR.name" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                 <el-form-item label="创建人">
                    <el-input v-model="formR.createUsername" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>

                <el-form-item label="创建日期">
                    <el-date-picker type="date"  :disabled="true" placeholder="选择日期" v-model="formR.createTime" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="formU.desc" :disabled="true"></el-input>
                </el-form-item>
            </el-form>
        </el-dialog>

         <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="强制删除提示" :visible.sync="yesdelVisible" width="50%" center>
            <div class="del-dialog-cnt" style="margin-bottom:20px">该角色下关联了以下用户，是否确定删除该角色？</div>
            <el-table :data="deleBindUsers" stripe style="width: 100%" border >
                <el-table-column prop="id" label="用户ID"></el-table-column>
                <el-table-column prop="username" label="用户名称"></el-table-column>
                <el-table-column prop="nickname" label="真实姓名"></el-table-column>
                <el-table-column  prop="sex" label="性别"></el-table-column>
                <el-table-column prop="phone" label="手机"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="yesdelVisible = false">取 消</el-button>
                <el-button type="primary" @click="yesdeleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'architecture',
        data() {
            return {
                message: 'first',
                showHeader: false,
                select_word: '',
                editVisible:false,//编辑弹窗是否打开-部门
                checkVisible:false,//查看弹窗是否打开-部门
                delVisible:false,//是否删除弹窗打开
                yesdelVisible:false,
                editVisibleP:false,//编辑弹窗是否打开-岗位
                checkVisibleP:false,//查看弹窗是否打开-岗位
                editVisibleU:false,//编辑弹窗是否打开-用户
                checkVisibleU:false,//查看弹窗是否打开-用户
                bindU:false,//用户绑定角色弹窗是否打开
                bindF:false,
                bindD:false,
                bindP:false,
                passwordCan:false,//设置用户密码输入框是否显示
                editVisibleR:false,//编辑弹窗是否打开-角色
                checkVisibleR:false,//查看弹窗是否打开-角色
                currPage: 0,
                pageSize:10,
                total:100,
                tab:'first',
                departmentList:[],
                department: [],
                checkPostsId:'',
                parentDeps:[{
                    name:"根目录",
                    id:-1
                }],
                parentDepP:[],
                posts:[],
                users:[],
                editUserBefore:{
                    username: "",
                    phone:"",
                    email:"",
                },
                roles:[],
                searchDepKey:'',//部门筛选条件字段
                searchDepVelue:'',//部门筛选条件模糊内容
                searchObj:{},//要筛选的集中
                form:{  //部门
                    id: "",
                    name: "",
                    desc: "",
                    pid: "",
                    theirDepartmentId: "",
                    createTime:"",
                    createUsername:""
                },
                searchPostKey:'',//岗位筛选条件字段
                searchPostVelue:'',//岗位筛选条件模糊内容
                searchObjP:{},//要筛选的集中
                formP:{//岗位
                    id: "",
                    name: "",
                    desc: "",
                    departmentId:"",
                    theirDepartmentId: "",
                    createTime:"",
                    createUsername:""
                },
                searchUserKey:'',//用户筛选条件字段
                searchUserValue:'',//用户筛选条件模糊内容
                searchObjU:{},//要筛选的集中
                formU:{//用户
                    id: "",
                    username: "",
                    password:"",
                    nickname:"",
                    sex:"",
                    phone:"",
                    email:"",
                    theirDepartmentId: "",
                    stationId:"",
                    createTime:"",
                    createUsername:"",
                    desc: "",
                },
                searchRoleKey:'',//角色筛选条件字段
                searchRoleValue:'',//角色筛选条件模糊内容
                searchObjR:{},//要筛选的集中
                formR:{//角色
                    id: "",
                    name: "",
                    theirDepartmentId:"",
                    createTime:"",
                    createUsername:"",
                    desc: "",
                },
                deleBindUsers:[],//强制解绑的角色关联的用户
                geTree:[],//获取公司组织架构得树形
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                chooseRoles:[],//用户绑定角色选中部门下的角色列表
                chooseDepart:'',//用户绑定角色选择角色所在的部门
                checkRoles:[],//用户绑定角色中被选中的角色id集合-展示用
                bindUserId:'',//绑定角色的当前用户的id
                bindRoles:[],//修改后的用户绑定角色信息-保存用
                geTreeFuncs:[],//获取所有菜单权限的树形
                chooseMenuIds:[],//已选择的所有菜单id的集合-展示用
                bindthisRoleId:'',//当前角色的id
                bindMenus:[],//角色绑定的菜单-保存用
                chooseDeptIds:[],//已选择的所有部门的id集合-展示用
                bindDeparts:[],//角色绑定的部门-保存用
                chooseProjects:[],//选中节点获取该部门下的所有项目
                checkProject:[],//选中的项目的id集合-展示用
                bindProjects:[]//角色绑定项目-保存用
            }
        },
        created() {
            this.getData();
        },
        computed: {

        },
        methods: {
            proving(){//手机号输入限制
                this.formU.phone=this.formU.phone.replace(/[^\.\d]/g,'');
                this.formU.phone=this.formU.phone.replace('.','');
            },
            tagChange(tab, event){//tab切换事件
                this.currPage=0;
                if(tab.name=="first"){
                    this.tab="first";
                }else if(tab.name=="second"){
                    this.getPost();
                    this.tab="second";
                }else if(tab.name=="third"){
                    this.getUsers();
                    this.getData();
                    this.tab="third";

                }else{
                    this.getRoles();
                    this.tab="forth";
                }
            },
            async getData(){//获取部门的数据
                this.geTree=[];
                this.parentDeps=[{name:"根目录",id:-1}]
                let res = await this.$axios({
                    url: 'bjupm/department/findAll?pageNumber='+this.currPage+'&pageSize='+this.pageSize,
                    method: 'post',
                    data: this.searchObj,
                }).then(res => {
                    var list=res.data.data.rows;
                    if(res.data.code == 200) {
                        var list=res.data.data.rows;
                        this.department = list;
                        this.parentDeps = this.parentDeps.concat(list);
                        this.parentDepP=list;
                        this.total = res.data.data.total;
                        for(var i=0;i<list.length;i++){
                            var obj={
                                id:list[i].id,
                                pid:list[i].pid,
                                label:list[i].name,
                                children:[]
                            };
                            this.geTree.push(obj);
                        }
                        this.filterArray(this.geTree,-1)

                    }
                })
            },
            searchDep(){//部门的模糊查询
                this.searchObj={}
                var key=this.searchDepKey;
                var obj=this.searchObj;
                obj[key]=this.searchDepVelue;
                this.getData();
            },
            filterArray(data, pid) {//递归，将数组变为树形结构
                var tree = [];
                var temp;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].pid == pid) {
                        var obj = data[i];
                        temp = this.filterArray(data, data[i].id);
                        if (temp.length > 0) {
                            obj.children = temp;
                        }
                        tree.push(obj);
                    }
                }
                this.geTree=tree;
                console.log(this.geTree)
                return tree;
            },
            getPost(){//获取岗位的数据
                this.$axios({
                    url: 'bjupm/post/findAll?pageNumber='+this.currPage+'&pageSize='+this.pageSize,
                    method: 'post',
                    data: this.searchObjP
                })
                .then(res => {
                    if(res.status === 200) {
                        this.posts = res.data.data.rows;
                        this.total = res.data.data.total
                    }
                })
            },
            searchPost(){//部门的模糊查询
                this.searchObjP={}
                var key=this.searchPostKey;
                var obj=this.searchObjP;
                obj[key]=this.searchPostVelue;
                this.getPost();
            },
            getUsers(){//获取用户的数据
                this.$axios({
                    url: 'bjupm/users/findAll?pageNumber='+this.currPage+'&pageSize='+this.pageSize,
                    method: 'post',
                    data: this.searchObjU
                })
                .then(res => {
                    if(res.data.code==200) {
                        this.users = res.data.data.rows;
                        this.total = res.data.data.total
                    }
                })

            },
            searchUser(){//人员的模糊查询
                this.searchObjU={}
                var key=this.searchUserKey;
                var obj=this.searchObjU;
                obj[key]=this.searchUserValue;
                this.getUsers();
            },
            checkPosts() { //根据部门筛选岗位
                this.formU.stationId='';
                this.$axios({
                    url: 'bjupm/post/findAll?pageNumber='+this.currPage+'&pageSize=1000',
                    method: 'post',
                    data:{
                        departmentId:this.formU.theirDepartmentId
                    }
                })
                .then(res => {
                    if(res.status === 200) {
                        this.posts = res.data.data.rows;
                    }
                })
            },
            getRoles(){//获取角色的数据
                this.$axios({
                    url: 'bjupm/role/findAll?pageNumber='+this.currPage+'&pageSize='+this.pageSize,
                    method: 'post',
                    data: this.searchObjR
                })
                .then(res => {
                    if(res.data.code==200) {
                        this.roles = res.data.data.rows;
                        this.total = res.data.data.total
                    }
                })

            },
            searchRole(){//人员的模糊查询
                this.searchObjR={}
                var key=this.searchRoleKey;
                var obj=this.searchObjR;
                obj[key]=this.searchRoleValue;
                this.getRoles();
            },

             // 分页导航
            handleCurrentChange(val) {
                this.currPage = val-1;
                if(this.tab=="first"){
                    this.getData();
                }else if(this.tab=="second"){
                    this.getPost();
                }else if(this.tab=="third"){
                    this.getUsers();
                }else{
                    this.getRoles();
                }
            },
            handleClick(row) {//查看单行
                if(this.tab=="first"){//-部门
                    this.form.id=row.id;
                    this.form.name=row.name;
                    this.form.desc=row.desc;
                    this.form.createTime=row.createTime;
                    this.form.createUsername=row.createUsername;
                    this.checkVisible = true;
                }else if(this.tab=="second"){//岗位
                    this.formP.id=row.id;
                    this.formP.name=row.name;
                    this.formP.desc=row.desc;
                    this.formP.createTime=row.createTime;
                    this.formP.createUsername=row.createUsername;
                    this.checkVisibleP = true;
                }else if(this.tab=="third"){
                    this.formU.id=row.id;
                    this.formU.username=row.username;
                    this.formU.nickname=row.nickname;
                    this.formU.sex=row.sex;
                    this.formU.phone=row.phone;
                    this.formU.email=row.email;
                    this.formU.theirDepartmentId=row.theirDepartmentId;
                    this.$axios({
                        url: 'bjupm/post/findAll?pageNumber='+this.currPage+'&pageSize=1000',
                        method: 'post',
                        data:{
                            departmentId:row.theirDepartmentId
                        }
                    })
                    .then(res => {
                        if(res.status === 200) {
                            this.posts = res.data.data.rows;
                        }
                    })
                    this.formU.stationId=row.stationId;
                    this.formU.desc=row.desc;
                    this.formU.createTime=row.createTime;
                    this.formU.createUsername=row.createUsername;
                    this.checkVisibleU = true;
                }else{
                    this.formR.id=row.id;
                    this.formR.name=row.name;
                    this.formR.desc=row.desc;
                    this.formR.createTime=row.createTime;
                    this.formR.createUsername=row.createUsername;
                    this.checkVisibleR = true;
                }

            },
            handleEdit(row) {//打开编辑弹窗
                if(this.tab=="first"){//-部门
                    if(!row.id){//新增
                        this.form.id='';
                        this.form.pid='';
                        this.form.theirDepartmentId='';
                        this.form.name='';
                        this.form.desc='';
                    }else{//编辑
                        this.form.id=row.id;
                        this.form.pid=row.pid;
                        this.form.theirDepartmentId=row.pid;
                        this.form.name=row.name;
                        this.form.desc=row.desc;
                    }
                    this.editVisible = true;
                }else if(this.tab=="second"){//岗位
                     if(!row.id){//新增
                        this.formP.id='';
                        this.formP.departmentId='';
                        this.formP.theirDepartmentId='';
                        this.formP.name='';
                        this.formP.desc='';
                    }else{//编辑
                        this.formP.id=row.id;
                        this.formP.departmentId=row.departmentId;
                        this.formP.theirDepartmentId=row.departmentId;
                        this.formP.name=row.name;
                        this.formP.desc=row.desc;
                    }
                    this.editVisibleP = true;
                }else if(this.tab=="third"){//用户
                    this.posts=[];
                     if(!row.id){//新增
                        this.passwordCan=true;
                        this.formU.id='';
                        this.formU.username='';
                        this.formU.password='123456';
                        this.formU.nickname='';
                        this.formU.sex='';
                        this.formU.phone='';
                        this.formU.email='';
                        this.formU.theirDepartmentId='';
                        this.formU.stationId='';
                        this.formU.desc='';
                    }else{//编辑
                        this.passwordCan=false;
                        this.formU.id=row.id;
                        this.formU.username=row.username;
                        this.editUserBefore.username=row.username;
                        this.formU.password=row.password;
                        this.formU.nickname=row.nickname;
                        this.formU.sex=row.sex;
                        this.formU.phone=row.phone;
                        this.editUserBefore.phone=row.phone;
                        this.formU.email=row.email;
                        this.editUserBefore.email=row.email;
                        this.formU.theirDepartmentId=row.theirDepartmentId;
                        this.$axios({
                            url: 'bjupm/post/findAll?pageNumber='+this.currPage+'&pageSize=1000',
                            method: 'post',
                            data:{
                                departmentId:row.theirDepartmentId
                            }
                        })
                        .then(res => {
                            if(res.status === 200) {
                                this.posts = res.data.data.rows;
                            }
                        })
                        this.formU.stationId=row.stationId;
                        this.formU.desc=row.desc;
                    }
                    this.editVisibleU = true;
                }else{
                    if(!row.id){//新增
                        this.formR.id="";
                        this.formR.name="";
                        this.formR.desc="";
                        this.formR.theirDepartmentId="";

                    }else{//修改
                        this.formR.id=row.id;
                        this.formR.name=row.name;
                        this.formR.desc=row.desc;
                        this.formR.theirDepartmentId=row.theirDepartmentId;
                    }
                    this.editVisibleR = true;
                }
            },
             // 保存编辑-部门
            saveEdit() {
                var editId=this.form.id;
                this.form.theirDepartmentId=this.form.pid;
                if(editId==null||editId==''){//新增
                    this.$axios({
                        url: 'bjupm/department/save',
                        method: 'post',
                        data: this.form
                    }).then(res => {
                        if(res.data.code == 200) {
                            this.$message.success(`操作成功`);
                        }else{
                            this.$message.error(`操作失败`);
                        }
                    })
                }else{//修改
                    this.$axios({
                        url: 'bjupm/department/update',
                        method: 'post',
                        data: this.form
                    }).then(res => {
                        if(res.data.code == 200) {
                            console.log(res.data)
                            this.$message.success(`操作成功`);
                        }else{
                            this.$message.error(`操作失败`);
                        }
                    })
                }
                this.editVisible = false;
                this.getData();
            },
            // 保存编辑-岗位
            saveEditP() {
                var editId=this.formP.id;
                this.formP.theirDepartmentId=this.formP.departmentId;
                if(editId==null||editId==''){//新增
                    this.$axios({
                        url: 'bjupm/post/save',
                        method: 'post',
                        data: this.formP
                    }).then(res => {
                        if(res.data.code == 200) {
                            this.$message.success(`操作成功`);
                            this.getPost();
                        }else{
                            this.$message.error(`操作失败`);
                        }
                    })
                }else{//修改
                    this.$axios({
                        url: 'bjupm/post/update',
                        method: 'post',
                        data: this.formP
                    }).then(res => {
                        if(res.data.code == 200) {
                            this.$message.success(`操作成功`);
                            this.getPost();
                        }else{
                            this.$message.error(`操作失败`);
                        }
                    })
                }
                this.editVisibleP = false;
                this.getPost();
            },
            addUser(){//新增用户
                if(this.formU.username==''||this.formU.username==null){
                    this.$message.warning(`用户名不能为空！`);
                }else{
                    this.$axios({
                        url: 'bjupm/checked/username?username='+this.formU.username,
                        method: 'post',
                        data: {}
                    }).then(res => {
                        if(res.status === 200) {
                            if(res.data==false){
                                this.$message.warning(`用户名已经被占用！`);
                                this.formU.username='';
                            }else{
                                if(this.formU.password==''||this.formU.password==null){
                                    this.$message.warning(`密码不能为空！`);
                                }else{
                                    if(this.formU.phone==''||this.formU.phone==null){
                                        this.$message.warning(`手机号码不能为空！`);
                                    }else{
                                        this.$axios({
                                            url: 'bjupm/checked/phone?phone='+this.formU.phone,
                                            method: 'post',
                                            data: {}
                                        }).then(res => {
                                            if(res.status === 200) {
                                                if(res.data==false){
                                                    this.$message.warning(`手机号已经被占用！`);
                                                    this.formU.phone='';
                                                }else{
                                                    if(this.formU.email==''||this.formU.email==null){
                                                        this.$message.warning(`邮箱不能为空！`);
                                                    }else{
                                                        this.$axios({
                                                            url: 'bjupm/checked/email?email='+this.formU.email,
                                                            method: 'post',
                                                            data: {}
                                                        }).then(res => {
                                                            if(res.status === 200) {
                                                                if(res.data==false){
                                                                    this.$message.warning(`邮箱已经被占用！`);
                                                                    this.formU.email='';
                                                                }else{
                                                                    this.$axios({
                                                                        url: 'bjupm/users/signup',
                                                                        method: 'post',
                                                                        data: this.formU
                                                                    }).then(res => {
                                                                        if(res.data.code == 200) {
                                                                            this.$message.success(`操作成功`);
                                                                            this.getUsers();
                                                                        }else{
                                                                            this.$message.error(`操作失败`);
                                                                        }
                                                                    })
                                                                    this.editVisibleU = false;
                                                                }
                                                            }
                                                        })
                                                    }
                                                }
                                            }
                                        })

                                    }
                                }
                            }
                        }
                    })
                }
            },
            editUserYse(){//确定修改接口
                this.$axios({
                    url: 'bjupm/users/updateUser',
                    method: 'post',
                    data: this.formU
                }).then(res => {
                    if(res.data.code == 200) {
                        this.$message.success(`操作成功`);
                        this.getUsers();
                    }else{
                        this.$message.error(`操作失败`);
                    }
                })
                this.editVisibleU = false;
            },
            checkEmail(){//邮箱检查
                if(this.formU.email==''||this.formU.email==null){
                    this.$message.warning(`邮箱不能为空！`);
                }else if(this.formU.email==this.editUserBefore.email){
                    this.editUserYse();
                }else{
                    this.$axios({
                        url: 'bjupm/checked/email?email='+this.formU.email,
                        method: 'post',
                        data: {}
                    }).then(res => {
                        if(res.status === 200) {
                            if(res.data==false){
                                this.$message.warning(`邮箱已经被占用！`);
                                this.formU.email='';
                            }else{
                                this.editUserYse();
                            }
                        }
                    })
                }
            },
            checkPhone(){//手机号检查
                if(this.formU.phone==''||this.formU.phone==null){
                    this.$message.warning(`手机号不能为空！`);
                }else if(this.formU.phone==this.editUserBefore.phone){
                   this.checkEmail()
                }else{
                    this.$axios({
                        url: 'bjupm/checked/phone?phone='+this.formU.phone,
                        method: 'post',
                        data: {}
                    }).then(res => {
                        if(res.status === 200) {
                            if(res.data==false){
                                this.$message.warning(`手机号已经被占用！`);
                                this.formU.phone='';
                            }else{
                                this.checkEmail()
                            }
                        }
                    })
                }
            },
            editUser(){//修改用户
                if(this.formU.username==''||this.formU.username==null){
                    this.$message.warning(`用户名不能为空！`);
                }else if(this.formU.username==this.editUserBefore.username){
                    this.checkPhone();
                }else{
                    this.$axios({
                        url: 'bjupm/checked/username?username='+this.formU.username,
                        method: 'post',
                        data: {}
                    }).then(res => {
                        if(res.status === 200) {
                            if(res.data==false){
                                this.$message.warning(`用户名已经被占用！`);
                                this.formU.username='';
                            }else{
                                this.checkPhone();
                            }
                        }
                    })
                }
            },
            bindUserRole(row){//打开用户绑定角色弹窗
                this.bindUserId=row.id;
                this.checkRoles=[];
                this.$axios({
                        url: 'bjupm/userRole/findAll',
                        method: 'post',
                        data: {
                            userId:row.id
                        }
                    }).then(res => {
                        if(res.data.code === 200) {
                            var list=res.data.data.rows;
                            for(var i=0;i<list.length;i++){
                                this.checkRoles.push(list[i].roleId)
                            }
                        }
                    })
                this.bindU=true;
            },
            saveBindU(){//确定用户绑定角色
               for(var i=0;i<this.checkRoles.length;i++){
                   var obj={
                       userId:this.bindUserId,
                       roleId:this.checkRoles[i]
                   }
                    this.bindRoles.push(obj)
               }

                this.$axios({
                    url: 'bjupm/userRole/saveAll',
                    method: 'post',
                    data:this.bindRoles
                }).then(res => {
                    if(res.data.code === 200) {
                        this.$message.success(`操作成功！`);
                        this.getUsers();
                    }else{
                        this.$message.error(`操作失败！`);
                    }
                })
                this.bindU=false;
            },
            handleNodeClick(indeterminate) {//点击组织架构节点获取当前节点的所有角色
                var checkId=indeterminate.id;
                this.chooseDepart=indeterminate.label;
                this.$axios({
                    url: 'bjupm/role/findAll?pageNumber='+this.currPage+'&pageSize=1000',
                    method: 'post',
                    data:{
                        theirDepartmentId:checkId
                    }
                })
                .then(res => {
                    if(res.data.code==200) {
                        this.chooseRoles = res.data.data.rows;
                    }
                })
            },
            // 保存编辑-用户
            saveEditU() {
                var editId=this.formU.id;
                if(editId==null||editId==''){//新增
                    this.addUser()
                }else{//修改
                    this.editUser()
                }
            },
            // 保存编辑-角色
            saveEditR() {
                var editId=this.formR.id;
                if(this.formR.name==''||this.formR.name==null){
                    this.$message.warning(`您必须输入角色名`);
                }else{
                    if(this.formR.theirDepartmentId==''||this.formR.theirDepartmentId==null){
                        this.$message.warning(`您必须选择所属部门`);
                    }else{
                        if(editId==null||editId==''){//新增
                            this.$axios({
                                url: 'bjupm/role/save',
                                method: 'post',
                                data: this.formR
                            }).then(res => {
                                if(res.data.code == 200) {
                                    this.$message.success(`操作成功`);
                                    this.getRoles();
                                }else{
                                    this.$message.error(`操作失败`);
                                }
                            })
                        }else{//修改
                            this.$axios({
                                url: 'bjupm/role/update',
                                method: 'post',
                                data: this.formR
                            }).then(res => {
                                if(res.data.code == 200) {
                                    this.$message.success(`操作成功`);
                                    this.getRoles();
                                }else{
                                    this.$message.error(`操作失败`);
                                }
                            })
                        }
                        this.editVisibleR = false;
                    }
                }


            },
            getMenus(){//获取所有的菜单
                this.geTreeFuncs=[];
                this.$axios({
                    url: 'bjupm/menu/findAll',
                    method: 'post',
                    data:{}
                })
                .then(res => {
                    if(res.data.code==200) {
                        var list=res.data.data.rows;
                        for(var i=0;i<list.length;i++){
                            var obj={
                                id:list[i].id,
                                pid:list[i].pid,
                                label:list[i].name,
                                children:[]
                        }
                            this.geTreeFuncs.push(obj);
                        }
                        this.filterArrayF(this.geTreeFuncs,-1)
                    }
                })
            },
            filterArrayF(data, pid) {//递归，将数组变为树形结构
                var tree = [];
                var temp;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].pid == pid) {
                        var obj = data[i];
                        temp = this.filterArrayF(data, data[i].id);
                        if (temp.length > 0) {
                            obj.children = temp;
                        }
                        tree.push(obj);
                    }
                }
                this.geTreeFuncs=tree;
                return tree;
            },
            handleCheckChangeM(data,checked){//获取当前被选择的菜单的id以及取消菜单选择
                var ids=[];
                var index=this.chooseMenuIds.indexOf(data.id);
                if(index!=-1){
                    this.chooseMenuIds.splice(index,1)
                }else{
                    this.chooseMenuIds.push(data.id)
                }
            },
            bindRoleFunc(row){//点击打开绑定权限弹窗
                this.bindthisRoleId=row.id;
                this.chooseMenuIds=[];
                this.$axios({//获取该角色下绑定的菜单
                    url: 'bjupm/roleMenu/findAll',
                    method: 'post',
                    data:{
                        roleId:row.id
                    }
                })
                .then(res => {
                    if(res.data.code==200) {
                        var list=res.data.data.rows;
                        for(var i=0;i<list.length;i++){
                            this.chooseMenuIds.push(list[i].id)
                        }
                    }
                })

                this.timeOut = setTimeout(() => {
                    this.getMenus();
                    this.bindF=true;
                }, 500);

            },
            saveBindM(){//保存角色绑定菜单
                for(var i=0;i<this.chooseMenuIds.length;i++){
                    var obj={
                        roleId: this.bindthisRoleId,
                        menuId:this.chooseMenuIds[i]
                    }
                        this.bindMenus.push(obj)
                }

                 this.$axios({
                    url: 'bjupm/roleMenu/saveAll',
                    method: 'post',
                    data:this.bindMenus
                }).then(res => {
                    if(res.data.code === 200) {
                        this.$message.success(`操作成功！`);
                        this.getRoles();
                    }else{
                        this.$message.error(`操作失败！`);
                    }
                })
               this.bindF=false;
            },
            bindRoleDep(row){//打开角色绑定部门的弹窗
                this.bindthisRoleId=row.id;
                this.chooseDeptIds=[];
                this.$axios({//获取该角色下绑定的菜单
                    url: 'bjupm/roleDepartment/findAll',
                    method: 'post',
                    data:{
                        roleId:row.id
                    }
                })
                .then(res => {
                    if(res.data.code==200) {
                        var list=res.data.data.rows;
                        for(var i=0;i<list.length;i++){
                            this.chooseDeptIds.push(list[i].id)
                        }
                    }
                })

                this.timeOut = setTimeout(() => {
                    this.bindD=true;
                }, 500);

            },
            handleCheckChangeD(data,checked){//选中部门节点
                var index=this.chooseDeptIds.indexOf(data.id);
                if(index!=-1){
                    this.chooseDeptIds.splice(index,1)
                }else{
                    this.chooseDeptIds.push(data.id)
                }
            },
            saveBindD(){//保存角色绑定部门
                for(var i=0;i<this.chooseDeptIds.length;i++){
                    var obj={
                        roleId:this.bindthisRoleId,
                        departmentId:this.chooseDeptIds[i]
                    }
                    this.bindDeparts.push(obj)
                }

                 this.$axios({
                    url: 'bjupm/roleDepartment/saveAll',
                    method: 'post',
                    data:this.bindDeparts
                }).then(res => {
                    if(res.data.code === 200) {
                        this.$message.success(`操作成功！`);
                        this.getRoles();
                    }else{
                        this.$message.error(`操作失败！`);
                    }
                })
                this.bindD=false;
            },
            bindRoleProj(row){//打开角色绑定项目弹窗
                this.bindthisRoleId=row.id;
                this.checkProject=[];
                 this.$axios({//获取该角色下绑定的菜单
                    url: 'bjupm/roleProject/findAll',
                    method: 'post',
                    data:{
                        roleId:row.id
                    }
                })
                .then(res => {
                    if(res.data.code==200) {
                        var list=res.data.data.rows;
                        for(var i=0;i<list.length;i++){
                            this.checkProject.push(list[i].id)
                        }
                    }
                })

                this.timeOut = setTimeout(() => {
                    this.bindP=true;
                }, 500);

            },
            handleNodeClickP(indeterminate) {//点击组织架构节点获取当前节点的所有角色
                var checkId=indeterminate.id;
                this.chooseDepart=indeterminate.label;
                this.$axios({
                    url: 'bjupm/project/findAll',
                    method: 'post',
                    data:{
                        theirDepartmentId:checkId
                    }
                })
                .then(res => {
                    if(res.data.code==200) {
                        this.chooseProjects = res.data.data.rows;
                    }
                })
            },
            saveBindP(){//保存角色绑定项目
                for(var i=0;i<this.checkProject.length;i++){
                    var obj={
                        roleId:this.bindthisRoleId,
                        projectId:this.checkProject[i]
                    }
                    this.bindProjects.push(obj)
                }

                 this.$axios({
                    url: 'bjupm/roleProject/saveAll',
                    method: 'post',
                    data: this.bindProjects
                }).then(res => {
                    if(res.data.code === 200) {
                        this.$message.success(`操作成功！`);
                        this.getRoles();
                    }else{
                        this.$message.error(`操作失败！`);
                    }
                })
                this.bindP=false;
            },
            handleDelete(row) {//打开删除对话框
                if(this.tab=="first"){
                    this.form.id=row.id;
                }else if(this.tab=="second"){
                    this.formP.id=row.id;
                }else if(this.tab=="third"){
                    this.formU.id=row.id;
                }else{
                    this.formR.id=row.id;
                }
                this.delVisible = true;
            },
            // 确定删除
            deleteRow(){
                var deleId=[];
                if(this.tab=="first"){
                    deleId.push(this.form.id);
                    this.$axios({
                        url: 'bjupm/department/delete',
                        method: 'post',
                        data: deleId
                    }).then(res => {
                        if(res.data.code == 200) {
                            this.$message.success(`删除成功`);
                            this.getData();
                        }else{
                            this.$message.error(`删除失败`);
                        }
                    })

                }else if(this.tab=="second"){
                    deleId.push(this.formP.id);
                    this.$axios({
                            url: 'bjupm/post/delete',
                            method: 'post',
                            data:deleId

                        }).then(res => {
                            if(res.data.code == 200) {
                                this.$message.success(`删除成功`);
                                this.getPost();
                            }else{
                                this.$message.error(`删除失败`);
                            }
                        })

                }else if(this.tab=="third"){
                    deleId.push(this.formU.id);
                    this.$axios({
                            url: 'bjupm/users/delete',
                            method: 'post',
                            data:deleId

                        }).then(res => {
                            if(res.data.code == 200) {
                                this.$message.success(`删除成功`);
                                this.getUsers();
                            }else{
                                this.$message.error(`删除失败`);
                            }
                        })

                }else{
                    deleId.push(this.formR.id);
                    this.$axios({
                        url: 'bjupm/role/delete',
                        method: 'post',
                        data:deleId

                    }).then(res => {
                        if(res.data.code == 200) {
                            this.$message.success(`删除成功`);
                            this.getRoles();
                        }else if(res.data.code == 500){
                            this.deleBindUsers=res.data.data;
                            this.yesdelVisible=true;
                        }
                    })
                }
                this.delVisible = false;
            },
            yesdeleteRow(){
                 this.$axios({
                        url: 'bjupm/role/forceDelete',
                        method: 'post',
                        data:deleId

                    }).then(res => {
                        if(res.data.code == 200) {
                            this.$message.success(`删除成功`);
                            this.getRoles();
                        }else {
                            this.$message.error(`删除失败`);

                        }
                    })
                    this.yesdelVisible=false;
            }
        },
    }

</script>

<style>
.message-title{
    cursor: pointer;
}
.handle-row{
    margin-top: 30px;
}
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.del-dialog-cnt{
    font-size: 16px;
    text-align: center
}
.table{
    width: 100%;
    font-size: 14px;
}
.red{
    color: #ff0000;
}
</style>

