<template>
    <el-table :data="formatData"  :row-style="showRow" v-bind="$attrs"> <!-- @row-click="loadNode1"-->
        <el-table-column v-if="columns.length===0" width="150">
            <template slot-scope="scope">
                <span v-for="space in scope.row._level" :key="space" class="ms-tree-space"></span>
                <span
                    v-if="iconShow(0,scope.row)"
                    class="tree-ctrl">
                    <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
                    <i v-else class="el-icon-minus"></i>
                </span>
                {{ scope.$index }}
            </template>
        </el-table-column>
        <el-table-column
            v-for="(column, index) in columns"
            v-else
            :key="column.value"
            :label="column.text"
            :width="column.width"
        >
            <template slot-scope="scope">
                <!-- Todo -->
                <!-- eslint-disable-next-line vue/no-confusing-v-for-v-if -->
                <span
                    v-for="space in scope.row._level"
                    v-if="index === 0"
                    :key="space"
                    class="ms-tree-space"
                >
                </span>
                <span
                    v-if="iconShow(index,scope.row)"
                    class="tree-ctrl"
                    @click="toggleExpanded(scope.$index)"
                >
                    <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
                    <i v-else class="el-icon-minus"></i>
                </span>
                {{ scope.row[column.value] }}
            </template>
        </el-table-column>
        <slot/>
    </el-table>
</template>

<script>
    /**
     Auth: Lei.j1ang
     Created: 2018/1/19-13:59
     */
    import treeToArray from "./eval";

    export default {
        name: "TreeTable",
        data() {
            return {
                columns: [
                    {
                        text: "节点名称",
                        value: "labelName",
                        width: 400
                    },
                    {
                        text: "ID",
                        value: "id"
                    }
                ],
                data: [],
                finalNum: 0,
            };
        },
        computed: {
            // 格式化数据源
            formatData: function () {
                let tmp;
                if (!Array.isArray(this.data)) {
                    tmp = [this.data];
                } else {
                    tmp = this.data;
                }
                const func = this.evalFunc || treeToArray;
                const args = this.evalArgs
                    ? Array.concat([tmp, this.expandAll], this.evalArgs)
                    : [tmp, this.expandAll];
                return func.apply(null, args);
            }
        },
        mounted: function () {
            //加载根节点
            let params = new URLSearchParams();
            params.append('parentId', this.finalNum);

            this.$axios({
                method: 'post',
                url: 'http://192.168.1.65:9902/bjbasicdata/subSectionItem/query',
                data: params,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then((response) => {
                let array = response.data.data;
                for (let i = 0; i < array.length; i++) {
                    let obj = {};
                    obj.labelName = array[i].projectName;
                    //obj.leaf = true;
                    obj.id = array[i].subSectionItemId;
                    obj.pid = array[i].parentId;
                    obj.children = [];

                    this.data.push(obj);
                    //再预加子节点
                    this.loadNode1(obj);
                }
                // [{"createTime":null,"createUsername":null,"updateTime":null,"updateUsername":null,"theirDepartmentId":null,"theirProjectId":null,"theirProjectName":null,"subSectionItemId":1,"projectId":1,"number":"KYL-01","uniqueNum":"KYL-01","tier":"一级","totalProject":"40","unit":"测试","projectName":"塔及辅助、过渡墩（K4+915.00~K5+455.000）","workArea":"北区","isDelete":"0","parentId":0,"typeFlag":"0","excelFileId":null,"finalIdentify":"d01","other1":null,"other2":null,"other3":null,"other4":null,"other5":null,"other6":null,"other7":null,"other8":null,"other9":null,"other10":null,"other11":null,"other12":null,"other13":null,"other14":null,"other15":null,"id":1,"lastOneOrPenult":true}]
            }).catch((error) => {
                console.log("错误" + error);
            });
        },
        methods: {
            loadNode1: function (row) {
                let params = new URLSearchParams();
                params.append('parentId', row.id);
                this.$axios({
                    method: 'post',
                    url: 'http://192.168.1.65:9902/bjbasicdata/subSectionItem/query',
                    data: params,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }).then((response) => {
                    //清除原有数据
                    row.children = [];
                    let array = response.data.data;
                    if (array != null && array.toString() !== "undefined") {
                        for (let i = 0; i < array.length; i++) {
                            let obj = {};
                            obj.labelName = array[i].projectName;
                            //obj.leaf = true;
                            obj.id = array[i].subSectionItemId;
                            obj.pid = array[i].parentId;
                            obj.children = [];

                            row.children.push(obj);
                            this.loadNode1(obj);
                        }
                    }
                }).catch((error) => {
                    console.log("错误" + error);
                })
            },
            showRow: function (row) {
                const show = row.row.parent
                    ? row.row.parent._expanded && row.row.parent._show
                    : true;
                row.row._show = show;
                return show
                    ? "animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;"
                    : "display:none;";
            },
            // 切换下级是否展开
            toggleExpanded: function (trIndex) {
                const record = this.formatData[trIndex];
                record._expanded = !record._expanded;
            },
            // 图标显示
            iconShow(index, record) {
                return index === 0 && record.children && record.children.length > 0;
            }
        }
    };
</script>
<style rel="stylesheet/css">
    @keyframes treeTableShow {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @-webkit-keyframes treeTableShow {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>

<style lang="scss" rel="stylesheet/scss" scoped>
    $color-blue: #2196f3;
    $space-width: 18px;
    .ms-tree-space {
        position: relative;
        top: 1px;
        display: inline-block;
        font-style: normal;
        font-weight: 400;
        line-height: 1;
        width: $space-width;
        height: 14px;
        &::before {
            content: "";
        }
    }
    .processContainer {
        width: 100%;
        height: 100%;
    }

    table td {
        line-height: 26px;
    }

    .tree-ctrl {
        position: relative;
        cursor: pointer;
        color: $color-blue;
        margin-left: -$space-width;
    }
</style>
