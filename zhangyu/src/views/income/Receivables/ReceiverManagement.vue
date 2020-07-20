<template>
    <div>
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="sk()">收款结算&nbsp;/</span>
                <span class="new_url">&nbsp;收款结算方管理</span>
            </div>
            <div class="title_left">
                <span>收款结算方管理</span>
            </div>
            <div style="margin-top: 20px">
                <div class="seach">
                    <img src="../../../../public/img/ss.png">
                    <input type="text" placeholder="搜索结算方名称" v-model="search">
                </div>
                <span class="cx" @click="dataList()">查询</span>
                <span class="add" @click="add">添加</span>
            </div>
        </div>
        <div class="table">
            <template>
                <el-table
                        :data="tableData"
                        :header-cell-style="getRowClass"
                        :cell-style="cell"
                >
                    <el-table-column
                            prop="name"
                            label="结算方名称">
                    </el-table-column>
                    <el-table-column
                            prop="account_name"
                            label="开户名">
                    </el-table-column>
                    <el-table-column
                            prop="ratio"
                            label="启用状态">
                        <template slot-scope="scope">
                            <el-switch
                                    :active-value="1"
                                    :inactive-value="0"
                                    active-color="#3377ff"
                                    inactive-color="#e6e9f0"
                                    v-model="scope.row.status"
                                    @change=change(tableData[scope.$index].name,scope.row.status)>
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="updated_at"
                            label="更新时间">

                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            <el-button  type="text" size="small" @click="jump(tableData[scope.$index].name)">查看</el-button>
                            <el-button  type="text" size="small" @click="edit(tableData[scope.$index].name)">编辑</el-button>
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
        name: "receiver-management",
        data(){
            return{
                page:1,
                p:10,
                total:0,
                tableData:[{pv:0}],
                search:'',
                status:0,
            }
        },
        mounted(){
            this.dataList();
        },
        methods:{
            sk(){
                this.$router.push({
                    path:"./Administration"
                })
            },

            fh(num){
                this.$router.go(num)
            },
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
                this.dataList();
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.dataList();
            },
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:rgba(247,249,252,1);color:rgba(31,46,77,1);text-align:center;font-size:14px;font-weight:500;font-family:PingFang-SC-Medium;height:56px'
                } else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'text-align:center;color:rgba(61,73,102,1);font-size:14px;font-weight:400;font-family:PingFangSC-Regula;'
            },
            add(){
                this.$router.push({
                    path:"./ADDSettlement"
                })
            },
            jump(name){
                this.$router.push({
                    path:"./SettlementDetails",
                    query:{
                        name:name,
                    },
                })
            },
            edit(name){
                this.$router.push({
                    path:"./ADDSettlement",
                    query:{
                        name:name,
                    },
                })
            },
            dataList(){
                let params={p:this.p,page:this.page,is_receiver:1,search:this.search};
                this.api.settle_settlement_search({params}).then((res)=>{
                    this.tableData=res.data;
                    console.log(res.data);
                    this.total=res.total;
                })
            },
            change(name,status){
                let formData=new FormData;
                formData.append('name',name);
                formData.append('is_receiver',1);
                formData.append('status',status);
                this.api.settle_settlement_status(formData).then((res)=>{

                })
            },
        }
    }
</script>


<style scoped>
    .top{
        width: 100%;
        height:152px;
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
    .title_left img{
        width:12px;
        height:12px;
        margin-left: 24px;
        cursor: pointer;
    }
    .title_left span{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:bold;
        color:rgba(31,46,77,1);
        margin-left: 24px;
        margin-top: 15px;
        cursor: pointer;
    }
    .seach{
        display: inline-block;
        margin:0px 24px;
        position:relative;
    }
    .seach img{
        width: 24px;
        height: 24px;
        position: absolute;
        left: 3px;
        top:8px;
    }
    .seach input{
        width:170px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        padding-left: 30px;
        border:1px solid rgba(211,219,235,1);
    }
    .cx,.add{
        display: inline-block;
        line-height: 36px;
        text-align: center;
        cursor: pointer;
        width:68px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);
        margin-right: 24px;
    }
    .table{
        margin-top: 238px;
        background: #fff;
    }
    .table .el-switch__core{
        margin-left: 0!important;
    }
</style>