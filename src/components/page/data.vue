<template>
    <div class="container">
        <el-table
          :data="tableData4"
          :span-method="objectSpanMethod"
          border
          style="width: 100%; margin-top: 20px">
          <el-table-column
            prop="id"
            label="ID"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="amount1"
            label="数值 1（元）">
          </el-table-column>
          <el-table-column
            prop="amount2"
            label="数值 2（元）">
          </el-table-column>
          <el-table-column
            prop="amount3"
            label="数值 3（元）">
          </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                spanArr:[],
                tableData4: [
                    {
                        id: "11",
                        name: "王小虎",
                        amount1: "234",
                        amount2: "3.2",
                        amount3: 10
                    },
                    {
                        id: "11",
                        name: "王小虎",
                        amount1: "165",
                        amount2: "4.43",
                        amount3: 12
                    },
                    {
                        id: "11",
                        name: "王小虎",
                        amount1: "324",
                        amount2: "1.9",
                        amount3: 9
                    },
                    {
                        id: "11",
                        name: "王小虎",
                        amount1: "621",
                        amount2: "2.2",
                        amount3: 17
                    },
                     {
                        id: "11",
                        name: "王小虎",
                        amount1: "621",
                        amount2: "2.2",
                        amount3: 17
                    },
                     {
                        id: "11",
                        name: "王小虎",
                        amount1: "621",
                        amount2: "2.2",
                        amount3: 17
                    },
                     {
                        id: "11",
                        name: "王小虎",
                        amount1: "621",
                        amount2: "2.2",
                        amount3: 17
                    },
                    {
                        id: "11",
                        name: "王小虎",
                        amount1: "539",
                        amount2: "4.1",
                        amount3: 15
                    },
                     {
                        id: "11",
                        name: "王小虎",
                        amount1: "539",
                        amount2: "4.1",
                        amount3: 15
                    }
                ],
                formLabelWidth: "90px"
            };
        },
        computed: {
           
        },
         mounted:function(){
            let contactDot = 0;
            this.tableData4.forEach((item,index) => {
                item.index = index;
                if(index === 0){
                    this.spanArr.push(1);
                }else{
                    if(item.id === this.tableData4[index - 1].id){
                        this.spanArr[contactDot] +=1;
                        this.spanArr.push(0);
                    }else{
                        this.spanArr.push(1);
                        contactDot = index;
                    }
                }
            });
        },
        methods: {
            // objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            //     if (columnIndex === 0) {
            //         if (rowIndex % 2 === 0) {
            //             return {
            //                 rowspan: 2,
            //                 colspan: 1
            //             };
            //         } else {
            //             return {
            //                 rowspan: 0,
            //                 colspan: 0
            //             };
            //         }
            //     }
            // }
            objectSpanMethod({ row, column, rowIndex, columnIndex }) {
                if(columnIndex === 0){
                  const _row = this.spanArr[rowIndex]
                  const _col = _row>0?1:0;
                  return{
                        rowspan:_row,
                        colspan:_col                  
                      }
              }
               if(columnIndex === 1){
                  const _row = this.spanArr[rowIndex]
                  const _col = _row>0?1:0;
                  return{
                        rowspan:_row,
                        colspan:_col                  
                      }
              }
            }
        }
    }
</script>

<style scoped>

</style>