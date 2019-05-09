import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '模型浏览' }
                },
                {
                    path: '/modelUp',
                    component: resolve => require(['../components/page/modelUp.vue'], resolve),
                    meta: { title: '上传模型' }
                },
                {
                    path: '/design',
                    component: resolve => require(['../components/page/design.vue'], resolve),
                    meta: { title: '设计管理' }
                },
                {
                    path: '/usersTable',
                    component: resolve => require(['../components/page/usersTable.vue'], resolve),
                    meta: { title: '成员管理' }
                },
                {
                    path: '/progressPlan',
                    component: resolve => require(['../components/page/progressPlan.vue'], resolve),
                    meta: { title: '工程进度' }
                },
                {
                    // 富文本编辑器组件
                    path: '/buliderDiary',
                    component: resolve => require(['../components/page/buliderDiary.vue'], resolve),
                    meta: { title: '工程日志' }
                },
                {
                    // markdown组件
                    path: '/planManage',
                    component: resolve => require(['../components/page/planManage.vue'], resolve),
                    meta: { title: '进度管理' }
                },
                {
                    // 图片上传组件
                    path: '/qualityStatistics',
                    component: resolve => require(['../components/page/qualityStatistics.vue'], resolve),
                    meta: { title: '质量统计' }
                },
                {
                    // vue-schart组件
                    path: '/qualityDis',
                    component: resolve => require(['../components/page/qualityDis.vue'], resolve),
                    meta: { title: '质量分布' }
                },
                {
                    // 拖拽列表组件
                    path: '/qualityTrack',
                    component: resolve => require(['../components/page/qualityTrack.vue'], resolve),
                    meta: { title: '质量跟踪' }
                },
                {
                    path: '/qualityDistribut',
                    component: resolve => require(['../components/page/qualityDistribut.vue'], resolve),
                    meta: { title: '质量发布' }
                },
                {
                    // 权限页面
                    path: '/danger',
                    component: resolve => require(['../components/page/danger.vue'], resolve),
                    meta: { title: '危险源管理'}
                },
                {
                    path: '/specialType',
                    component: resolve => require(['../components/page/specialType.vue'], resolve),
                    meta: { title: '特殊工种管理' }
                },
                {
                    path: '/safeTeach',
                    component: resolve => require(['../components/page/safeTeach.vue'], resolve),
                    meta: { title: '安全教育记录' }
                },
                {
                    path: '/safeWork',
                    component: resolve => require(['../components/page/safeWork.vue'], resolve),
                    meta: { title: '安全文明施工' }
                },
                {
                    path: '/safeTechnology',
                    component: resolve => require(['../components/page/safeTechnology.vue'], resolve),
                    meta: { title: '安全技术交底' }
                },
                {
                    path: '/device',
                    component: resolve => require(['../components/page/device.vue'], resolve),
                    meta: { title: '机械动力管理' }
                },
                {
                    path: '/safeQuestions',
                    component: resolve => require(['../components/page/safeQuestions.vue'], resolve),
                    meta: { title: '安全记录' }
                },
                {
                    path: '/contract',
                    component: resolve => require(['../components/page/contract.vue'], resolve),
                    meta: { title: '合同记录' }
                },
                {
                    // 富文本编辑器组件
                    path: '/filesCourse',
                    component: resolve => require(['../components/page/filesCourse.vue'], resolve),
                    meta: { title: '功能资料库' }
                },
                {
                    // markdown组件
                    path: '/filesCheck',
                    component: resolve => require(['../components/page/filesCheck.vue'], resolve),
                    meta: { title: '项目资料库' }
                },
                {
                    // 图片上传组件
                    path: '/filesDone',
                    component: resolve => require(['../components/page/filesDone.vue'], resolve),
                    meta: { title: '归档资料库' }
                },
                {
                    // vue-schart组件
                    path: '/breakNew',
                    component: resolve => require(['../components/page/breakNew.vue'], resolve),
                    meta: { title: '创优管理' }
                },
                {
                    // 拖拽列表组件
                    path: '/subSectionItem',
                    component: resolve => require(['../components/page/subSectionItem.vue'], resolve),
                    meta: { title: '工程信息管理' }
                },
                {
                    // 权限页面
                    path: '/material',
                    component: resolve => require(['../components/page/material.vue'], resolve),
                    meta: { title: '材料信息管理', permission: true }
                },
                {
                    path: '/architecture',
                    component: resolve => require(['../components/page/architecture.vue'], resolve),
                    meta: { title: '组织信息管理' }
                },
                {
                    path: '/manage',
                    component: resolve => require(['../components/page/manage.vue'], resolve),
                    meta: { title: '经验数据管理' }
                },
                {
                    path: '/organize',
                    component: resolve => require(['../components/page/organize.vue'], resolve),
                    meta: { title: '组织信息管理' }
                },
                {
                    path: '/data',
                    component: resolve => require(['../components/page/data.vue'], resolve),
                    meta: { title: '物资信息管理' }
                },
                {
                    path: '/makeSetting',
                    component: resolve => require(['../components/page/makeSetting.vue'], resolve),
                    meta: { title: '转换设置' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/checkProject',
            component: resolve => require(['../components/page/checkProject.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
