<template>
    <div>
        <div class="top_name">
            <div class="title_left">
                <span>项目收益</span>
            </div>
        </div>
        <div class='title'>
            <div>
                <span class='titNames'>日期：</span>
                 <el-date-picker
                    v-model="tdate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    end-placeholder="结束日期">
                </el-date-picker>
                <span class='titNames' style="margin-left:24px">结算方:</span>
                <input type="text">
                <span class='titNames' style="margin-left:24px">项目:</span>
                <input type="text">
                <div class='btn_box'>
                    <span class="cx">查询</span>
                    <span @click='cz()'>重置</span>
                </div>
            </div>
            <div>
                <div>
                <template>
                    <el-table
                            :data="tableData"
                            header-align="center"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            style="width: 100%;color:#000">
                        <el-table-column
                                label="结算主体" prop="project_id"
                                fixed
                                width="150"
                               >
                        </el-table-column>
                        <el-table-column
                                label="合作公司" prop="project_name"
                                 fixed
                                width="150"
                                >
                        </el-table-column>
                        <el-table-column
                                label="广告类型" prop="contributor_type"
                                 fixed
                                width="150"
                                >
                        </el-table-column>
                        <el-table-column
                                label="项目" prop="updated_at"
                                 fixed
                                width="150"
                                >
                        </el-table-column>
                        <el-table-column
                                label="请求量" prop="updator"
                                sortable
                                width="150"
                                >
                        </el-table-column>
                        <el-table-column
                                label="填充量" prop="updator"
                                sortable
                                width="150"
                                >
                        </el-table-column>
                        <el-table-column
                                label="填充率" prop="updator"
                                sortable
                                width="150"
                                >
                        </el-table-column>
                         <el-table-column
                                label="占总展示比" prop="updator"
                                sortable
                                width="150"
                                >
                        </el-table-column>
                         <el-table-column
                                label="展示量" prop="updator"
                                sortable
                                width="150"
                                >
                        </el-table-column>
                         <el-table-column
                                label="点击量" prop="updator"
                                sortable
                                width="150"
                                >
                        </el-table-column>
                         <el-table-column
                                label="点击率" prop="updator"
                                sortable
                                width="150"
                                >
                        </el-table-column>
                         <el-table-column
                                label="已出流水" prop="updator"
                                sortable
                                width="150"
                                >
                        </el-table-column>
                         <el-table-column
                                label="ecpm" prop="updator"
                                sortable
                                width="150"
                                >
                        </el-table-column>
                         <el-table-column
                                label="ecpc" prop="updator"
                                sortable
                                width="150"
                                >
                        </el-table-column>
                    </el-table>
                </template>
            </div>
             <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="p"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
            </div>
        </div>    
    </div>
</template>

<script>
 export default {
   data () {
     return {
            tableData:[],
            p:10,
            page:1,
            total:0,
            tdate:''

     }
   },
  methods:{
             handleSizeChange(p) { // 每页条数切换
                this.p = p;
               
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                
            },
            cz(){
                this.status="",
                this.search=""
            },
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:rgba(247,249,252,1);color:rgba(31,46,77,1);text-align:center;font-size:14px;font-weight:blod;font-family:PingFang-SC-Medium;height:56px'
                } else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'text-align:center;color:rgba(61,73,102,1);font-size:14px;font-weight:400;font-family:PingFangSC-Regula;'
            },
  },
 }
</script>

<style scoped>
    .top_name{
        height:90px!important;
        background:rgba(255,255,255,1);
    }
    .title_left span{
        display: inline-block;
        font-size:20px;
        font-family:PingFang-SC-Medium;
        font-weight:bold;
        color:rgba(50,50,50,1);
        margin-left: 24px;
        line-height: 90px;
        text-align: right;
    }
    .title{
        margin-top: 175px;
        background: #fff;
        padding:24px
    }
    .btn_box{
        display: inline-block;
        float:right;
        margin-top: -24px;
    }
    .btn_box span{
        width: 90px!important;
        height: 36px;
        display: inline-block;
        border:1px solid #ddd;
        text-align: center!important;
        line-height: 36px;
        cursor: pointer;
        margin-left: 24px;
        border-radius: 3px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        margin-top: 24px;
    }
     .cx{
        background:rgba(51,119,255,1)!important;
        color:rgba(255,255,255,1)!important;
        border:0!important
    }
     input{
        margin: 24px;
        width:220px;
        padding-left: 5px;
        border-radius: 3px;
        margin: 0 10px 24px 24px ;
        height: 32px;
    }
     .titNames{
        display: inline-block;
        font-size: 14px;
    }
</style>
