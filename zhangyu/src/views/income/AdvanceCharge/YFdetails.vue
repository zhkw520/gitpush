<template>
    <div>
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="jump()">预付款管理&nbsp;/</span>
                <span class="new_url">&nbsp;{{this.$route.query.is_receiver==1?'收款结算':'付款结算'}}预付款详情</span>
            </div>
            <div class="title_left">
                <span>{{this.$route.query.is_receiver==1?'收款结算':'付款结算'}}预付款详情</span>
            </div>
        </div>
        <div class="table">
            <div>
                <div class="fkName">
                    <span v-if="this.$route.query.is_receiver==1">收款结算-{{this.$route.query.name}}</span>
                    <span v-if="this.$route.query.is_receiver==0">付款结算-{{this.$route.query.name}}</span>
                </div>
                <div>
                    <span class="money">预付款剩余金额:{{this.num.toLocaleString("zh-Hans-CN",{style:'currency',currency:'CNY'})}}</span>
                    <span class="add" @click="ADD()">添加记录</span>
                </div>
            </div>
            <template>
                <el-table
                        :data="tableData"
                        :header-cell-style="getRowClass"
                        :cell-style="cell"
                >
                    <el-table-column
                            prop="name"
                            label='金额变化'>
                        <template slot-scope="scope">
                            <span>{{tableData[scope.$index].type==1?'-':'+'}}{{(tableData[scope.$index].amount).toLocaleString("zh-Hans-CN",{style:'currency',currency:'CNY'})}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="remain_amount"
                            label="预付款剩余金额">
                        <template slot-scope="scope">
                            <span>{{(tableData[scope.$index].remain_amount).toLocaleString("zh-Hans-CN",{style:'currency',currency:'CNY'})}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="updated_at"
                            label="更新时间">
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            <el-button  type="text" size="small" @click="ck(tableData[scope.$index].prid)">查看详情</el-button>
                            <el-button  type="text" size="small" @click="del(tableData[scope.$index].prid)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="page"
                    :page-size="p"
                    layout="prev, pager, next,total, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "y-fdetails",
        data(){
            return{
                p:10,
                page:1,
                total:0,
                tableData:[{type:"",amount:"",remain_amount:""}],
                num:"",
            }
        },
        mounted(){
            this.getData()
        },
        methods:{
            fh(){
                this.$router.go(-1)
            },
            jump(){
                this.$router.push({
                    path:"./Administration"
                })
            },
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
                this.getData()
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.getData()
            },
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:#f7f9fc;color:rgba(30,30,30,1);text-align:center;font-size:16px;font-weight:400;font-family:PingFang-SC-Regular;'
                } else {
                    return ''
                }
            },

            cell({row, column, rowIndex, columnIndex}){
                return 'text-align:center;color:#000;font-size:16px;font-weight:400;font-family:PingFang-SC-Regular;'
            },
            ck(id){
                this.$router.push({
                    path:"./change",
                    query:{
                        prid:id,
                        name:this.$route.query.name,
                        is_receiver:this.$route.query.is_receiver,
                    }
                })
            },
            getData(){
                let params = {search:this.$route.query.name,p:this.p,page:this.page,is_receiver:this.$route.query.is_receiver};
                this.api.settle_prepayment_search({params}).then((res)=>{
                    this.tableData=res.data;
                    this.total=res.total;
                    this.getSettlement()
                })
            },
            getSettlement(){
                let params={name:this.$route.query.name,is_receiver:this.$route.query.is_receiver}
                this.api.settle_settlement_detail({params}).then((res)=>{
                    this.num=res.remain_amount;
                })
            },
            del(id){
                let formData=new FormData;
                formData.append('prid',id);
                this.api.settle_prepayment_del(formData).then((res)=>{
                    this.getData()
                })
            },
            ADD(){
                this.$router.push({
                    path:"./ADD",
                    query:{
                        is_receiver:this.$route.query.is_receiver,
                        name:this.$route.query.name,
                    },
                })
            },
        },
    }
</script>

<style scoped>
    .top{
        width: 100%;
        height:98px;
        border-top: 1px solid #ededed;
        background: white;
        -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.04);
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.04);
        position: fixed;
        left: 256px;
        top: 63px;
        z-index: 99;
    }
    .new_url{color: rgba(61,73,102,1)!important;}
    .title_left span{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-top: 15px;
        cursor: pointer;
        margin-left: 24px;
    }
    .title_left img{
        width:12px;
        height:12px;
        margin-right: 9px;
        margin-left: 24px;
    }
    .table{
        background: #fff;
        margin-top: 182px;
    }
    .fkName span{
        display: inline-block;
        font-size:16px;
        font-family:PingFangSC-Medium,PingFangSC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin: 20px 0 10px 24px;
    }
    .money{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(143,155,179,1);
        margin:0 0 27px 24px;
    }
    .add{
        display: inline-block;
        width:96px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        float: right;
        margin-right: 24px;
    }
</style>