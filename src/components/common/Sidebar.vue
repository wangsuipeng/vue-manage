<template>
    <div class="sidebar">
        <div class="logo">
            <img src="../../assets/logo.a.png" alt>
        </div>
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from "../common/bus";
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: "el-icon-view",
                    index: "dashboard",
                    title: "模型管理",
                    subs: [
                        {
                            index: "dashboard",
                            title: "模型浏览"
                        },
                        {
                            index: "modelUp",
                            title: "上传模型"
                        }
                    ]
                },
                {
                    icon: "el-icon-lx-skin",
                    index: "design",
                    title: "设计管理",
                    subs: [
                        {
                            index: "design",
                            title: "设计管理"
                        }
                    ]
                },
                {
                    icon: "el-icon-lx-people",
                    index: "usersTable",
                    title: "成员管理",
                    subs: [
                        {
                            index: "usersTable",
                            title: "成员管理"
                        }
                    ]
                },
                {
                    icon: "el-icon-lx-calendar",
                    index: "progressPlan",
                    title: "进度管理",
                    subs: [
                        {
                            index: "progressPlan",
                            title: "工程进度"
                        },
                        {
                            index: "buliderDiary",
                            title: "工程日志"
                        },
                        {
                            index: "planManage",
                            title: "进度管理"
                        }
                    ]
                },
                {
                    icon: "el-icon-lx-favor",
                    index: "qualityStatistics",
                    title: "质量管理",
                    subs: [
                        {
                            index: "qualityStatistics",
                            title: "质量统计"
                        },
                        {
                            index: "qualityDis",
                            title: "质量分布"
                        },
                        {
                            index: "qualityTrack",
                            title: "质量跟踪"
                        },
                        {
                            index: "qualityDistribut",
                            title: "质量验收"
                        }
                    ]
                },
                {
                    icon: "el-icon-lx-notice",
                    index: "danger",
                    title: "安全管理",
                    subs: [
                        {
                            index: "danger",
                            title: "危险源管理"
                        },
                        {
                            index: "specialType",
                            title: "特殊工种管理"
                        },
                        {
                            index: "safeTeach",
                            title: "安全教育记录"
                        },
                        {
                            index: "safeWork",
                            title: "安全文明施工"
                        },
                        {
                            index: "safeTechnology",
                            title: "安全技术交底"
                        },
                        {
                            index: "device",
                            title: "机械动力管理"
                        },
                        {
                            index: "safeQuestions",
                            title: "安全记录"
                        }
                    ]
                },
                {
                    icon: "el-icon-lx-copy",
                    index: "contract",
                    title: "合同管理",
                    subs: [
                        {
                            index: "contract",
                            title: "合同记录"
                        }
                    ]
                },
                {
                    icon: "el-icon-lx-file",
                    index: "filesCourse",
                    title: "文档管理",
                    subs: [
                        {
                            index: "filesCourse",
                            title: "功能资料库"
                        },
                        {
                            index: "filesCheck",
                            title: "项目资料库"
                        },
                        {
                            index: "filesDone",
                            title: "归档资料库"
                        }
                    ]
                },
                {
                    icon: "el-icon-lx-likefill",
                    index: "breakNew",
                    title: "创新创优",
                    subs: [
                        {
                            index: "breakNew",
                            title: "创优管理"
                        }
                    ]
                },
                {
                    icon: "el-icon-lx-settings",
                    index: "subSectionItem",
                    title: "管理中心",
                    subs: [
                        {
                            index: "subSectionItem",
                            title: "工程信息管理"
                        },
                        {
                            index: "material",
                            title: "材料信息管理"
                        },
                        {
                            index: "architecture",
                            title: "组织信息管理"
                        }
                    ]
                },
                {
                    icon: "el-icon-lx-home",
                    index: "manage",
                    title: "企业数据库",
                    subs: [
                        {
                            index: "manage",
                            title: "经验数据管理"
                        },
                        {
                            index: "organize",
                            title: "组织信息管理"
                        },
                        {
                            index: "data",
                            title: "物资信息管理"
                        }
                    ]
                },
                {
                    icon: "el-icon-lx-home",
                    index: "makeSetting",
                    title: "系统设置",
                    subs: [
                        {
                            index: "makeSetting",
                            title: "转换设置"
                        }
                    ]
                }
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace("/", "");
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on("collapse", msg => {
            this.collapse = msg;
        });
    },
    methods: {}
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar .logo {
    cursor: pointer;
    background-color: rgb(50, 65, 87);
    width: 250px;
    height: 70px;
}
.sidebar .logo img {
    display: inline-block;
    width: 100%;
    height: auto;
    margin-top: 12px;
    margin-left: -18px;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
