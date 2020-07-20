<template>
    <div>
        <div class="top_name">
            <span class="top_txt" @click='fh(-1)'>广告收款结算 /  项目管理</span>
            <div class="title_left">
                <span>项目管理</span>
            </div>
        </div>
        <div class="content">
            <div class="sum">
                <input type="text" placeholder="搜索关键词" v-model='search '  @click="setPage()">
                <span>状态</span>
                <select v-model="status" @click="setPage()">
                    <option value="">全部</option>
                    <option value="2">信息正常</option>
                    <option value="0">信息异常</option>
                    <option value="1">信息待补充</option>
                </select>
                <div class='btn_box'>
                    <span class="cx" @click="getDataList()">查询</span>
                    <span @click='cz()'>重置</span>
                    <!-- <span>监控邮箱</span> -->
                </div>
            </div>
            <div>
                <template>
                    <el-table
                            :data="tableData"
                            header-align="center"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            style="width: 100%;color:#000">
                        <el-table-column
                                label="项目ID" prop="project_id"
                               >
                        </el-table-column>
                        <el-table-column
                                label="项目名称" prop="project_name"
                                >
                        </el-table-column>
                        <el-table-column
                                label="内容状态" prop="contributor_type"
                                >
                            <template slot-scope="scope">
                                <span :class="{red:tableData[scope.$index].status!=2}">{{tableData[scope.$index].status==0?'信息异常':tableData[scope.$index].status==1?"信息待补充":"信息正常"}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="更新时间" prop="updated_at"
                                >
                        </el-table-column>
                        <el-table-column
                                label="操作人员" prop="updator"
                                >
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="props">
                                <el-button type="text" @click='ck(tableData[props.$index].project_id)'>查看</el-button>
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
         <loading v-if='load'></loading>
    </div>
</template>

<script>
import loading from '../../../components/loading'
    export default {
        components:{loading},
        name: "settlement",
        data(){
            return{
                tableData:[{toax_mney:1000}],
                total:0,
                page:1,
                p:10,
                status:'',
                search:"",
                load:true,
            }
        },
        mounted(){
            this.getDataList()
        },
        methods:{
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
            setPage(){
                this.page=1
            },
            fh(index){
                this.$router.go(index);
            },
            cz(){
                this.search=''
                this.status=''
            },
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
                this.getDataList()
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.getDataList()
            },
            getDataList(){
                let params={p:this.p,page:this.page,search:this.search,status:this.status}
                this.api.adproject_listpage({params}).then((res)=>{
                    this.total=res.total;
                    this.tableData=res.data;
                    this.load=false
                })
            },
            jump(data){
                this.$router.push({
                    query:{
                        data:data,
                    },
                    path:"/income/money_details"
                })
            },
            ck(id){
                this.$router.push({
                    path:"./PM_details",
                    query:{
                        project_id:id
                    }
                })
            },
            
        }
    }
</script>

<style scoped>
    .top_name{
        height:112px!important;
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
    .red{color:red}
    .content{
        margin-top: 199px!important;
    }
    .timesDate{
        display: inline-block;
        margin:24px 0 28px 24px!important;
    }
    .filtrate div{
        display: inline-block;
        margin-right: 44px;
    }
    .time_tit{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 24px;
        line-height: 36px;
    }
    .filtrate input{
        width:190px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        padding-left: 10px;
    }

    .dc{
        display: inline-block;
        width:96px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        float: right;
        margin: 24px 24px 0 0;
    }
    .sum{margin:0 24px 24px 24px}
    .btn_box{
        display: inline-block;
        float:right;
        margin-right: 24px;
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
    .sum input{
        width:200px;
        height:36px;
        padding-left: 8px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-top: 24px;
    }
    .sum>span{
        width: 56px;
        display: inline-block;
        line-height: 36px;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 24px;
        text-align: right;
    }
    .sum select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        padding-left: 10px;
        border:1px solid rgba(211,219,235,1);
    }
    .or{
        width: 34px!important;
        text-align: center!important;
        margin-right: 0!important;
    }
    .zh{
         margin-left: 30px;
    }
    .cx{
       
        background:rgba(51,119,255,1)!important;
        color:rgba(255,255,255,1)!important;
        border:0!important
    }
   .timesDate .el-input__inner{
       line-height:normal!important;
   }
</style>