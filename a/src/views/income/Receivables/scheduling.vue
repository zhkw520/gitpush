<template>
    <div>
         <div class="top_name">
            <span class="top_txt" @click='fh(-1)'>广告收款结算 /  结算进度查询</span>
            <div class="title_left">
                <span>结算进度查询</span>
            </div>
            <div>
                <span class='tit' style="margin-left:24px">选择日期</span>
                <el-date-picker
                    v-model="tdate"
                    type="month"
                    format="yyyy-MM"
                    value-format="yyyy-MM"
                    placeholder="选择月">
                </el-date-picker>
                <span  class='tit' style="margin-left:24px">结算方</span>
                <input type="text" v-model='name'>
                <span  class='tit'>项目</span>
                <input type="text" v-model='project_name'>
                <span class='tit'>状态：</span>
                <select v-model="status">
                    <option value="">全部</option>
                    <option value="0">待处理</option>
                    <option value="1">生效中</option>
                    <option value="2">已过期</option>
                    <option value="3">即将过期</option>
                </select>
                <div class='btn_box'>
                    <span class="cx" @click='getDate()'>查询</span>
                    <span @click='cz()'>重置</span>
                </div>
            </div>
        </div>
        <div class="title">
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
                               >
                        </el-table-column>
                        <el-table-column
                                label="项目" prop="project_name"
                                >
                        </el-table-column>
                        <el-table-column
                                label="应收金额" prop="contributor_type"
                                >
                        </el-table-column>
                        <el-table-column
                                label="实收金额" prop="updated_at"
                                >
                        </el-table-column>
                        <el-table-column
                                label="状态" prop="updator"
                                >
                        </el-table-column>
                        <el-table-column
                                label="收款日期" prop="updator"
                                >
                        </el-table-column>
                        <el-table-column label="票据凭证">
                            <template slot-scope="props">
                                <el-button type="text"  >查看</el-button>
                            </template>
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
</template>

<script>
 export default {
   data () {
     return {
            tdate:"",
            status:"",
            p:10,
            page:1,
            total:0,
            tableData:[],
            name:'',
            project_name:"",

     }
   },
   mounted(){
       this.getDate()
   },
   methods:{
            cz(){
                this.name=''
                this.project_name=''
                this.tdate=''
                this.status=''
            },
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
                this.getDate()
               
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.getDate()
            },
            getDate(){
                let params={is_receiver:1,name:this.name,project_name:this.project_name,status:this.status,p:this.p,page:this.page,tdate:this.tdate}
                this.api.settle_data_process({params}).then((res)=>{
                    this.total=res.total;
                    this.tableData=res.data
                })
            },
            fh(index){
                this.$router.go(index)
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
        height:160px!important;
        background:rgba(255,255,255,1);
    }
    .title_left span{
        display: inline-block;
        font-size:20px;
        font-family:PingFang-SC-Medium;
        font-weight:bold;
        color:rgba(50,50,50,1);
        margin-left: 24px;
        text-align: right;
    }
    .top_txt{
        display: inline-block;
        margin-left: 24px;
        cursor: pointer;
    }
    input{
        margin: 24px 24px 0 0;
        width:220px;
        padding-left: 5px;
        border-radius: 3px;
        height: 32px;
    }
    select{
        height: 36px;
        width: 160px;
        border-radius: 3px;
    }
    .btn_box{
        display: inline-block;
        float:right;
        margin-right: 20%;
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
    .title{
        margin-top: 245px;
        background: #fff;
        padding:24px
    }
    .tit{
        display: inline-block;
        margin:0 10px 0 0;
    }
</style>

