<template>
    <div>
        <div class="top_name">
            <span class="top_txt">个人中心/账户管理</span>
            <div class="title_left">
                <span>账户管理</span>
            </div>
        </div>
        <div class="centNavBox">
            <div class="cx">
                <input type="text" placeholder="输入用户名或邮箱快速查询" v-model="search"/>
                <span @click="getAccountList()">查询</span>
                <span class="right_btn" @click="addUser"><img src="../../../public/img/add_msg.png" style="width: 12px;margin-right: 14px">添加账号</span>
            </div>
            <template>
                <el-table
                        :data="tableData"
                        :header-cell-style="getRowClass"
                        :cell-style="cell"
                        style="width: 100%"
                        border
                        :default-sort = "{prop: 'date', order: 'descending'}"
                >
                    <el-table-column
                            prop="user_name"
                            label="用户名"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="email"
                            label="用户账号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="created_at"
                            label="注册时间"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="updated_at"
                            label="最近记录"
                    >
                    </el-table-column>
                    <el-table-column
                            label="是否启用"
                            prop="status"
                    >
                        <template slot-scope="scope">
                            <el-switch
                                    :active-value="1"
                                    :inactive-value="0"
                                    active-color="#3377ff"
                                    inactive-color="#e6e9f0"
                                    v-model="scope.row.status"
                                    @change='change(scope.$index,scope.row.status)'>
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="getUSERdATA(scope.$index)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange1"
                            @current-change="handleCurrentChange1"
                            :current-page.sync="currentPage"
                            :page-size="pageSize"
                            layout="prev, pager, next,total, jumper"
                            :total="total">
                    </el-pagination>
                </div>
            </template>
            <ADD v-if="management" :userMessage="userMessage"></ADD>
            <set v-if="User" :userMessage="userMessage"></set>
        </div>
    </div>

</template>

<script>
    import ADD from './ADDuser'
    import set from './setUser'
    export default {
        components:{ADD,set},
        name: "accoun-audit",
        data(){
            return {
                tableData:[],
                currentPage: 1,
                pageSize: 10,
                total: 0,
                management:false,
                userMessage:{},
                search:'',
                User:false,
            }
        },
        mounted(){
            this.getAccountList()
        },
        methods:{
            getAccountList(){
                let params ={p:this.pageSize,page:this.currentPage,search:this.search};
                this.api.account_all({params}).then((res)=>{
                    this.tableData = res.data;
                    this.total= res.total;
                })
            },
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:#f7f9fc;color:#8F9BB3;text-align:center;font-size:14px;font-weight:Medium;height:48px;font-family:PingFang-SC-Regular;'
                } else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'text-align:center;color:#3d4966;font-size:14px;font-weight:400;font-family:PingFang-SC-Regular;'
            },
            getUSERdATA(a){
                this.User= true;
                this.userMessage=this.tableData[a];
                this.stop()
            },
            addUser(){
                this.management=true;
                this.stop()
            },
            qx(){
                this.management=false;
                this.User=false;
                this.move()
            },
            change(a,b){
                this.api.edit_account_status({email:this.tableData[a].email,status:b}).then((res)=>{
                })
            },
            stop(){
                document.body.style.overflow='hidden';
                document.body.style.position='fixed';
                document.body.style.width='100%';
            },
            move(){
                document.body.style.overflow='';//出现滚动条
                document.body.style.position='initial';
                document.body.style.height='1006px';
            },
            handleSizeChange1(pageSize) { // 每页条数切换
                this.pageSize = pageSize;
                console.log(this.pagesize);
                this.getAccountList();
            },
            handleCurrentChange1(currentPage) {//页码切换
                console.log(currentPage);
                this.currentPage = currentPage;
                this.getAccountList();
            },
        },
    }
</script>

<style scoped>
    .top_name{
        height: 109px;
        z-index: 9999;
    }
    .top_txt{
        display: inline-block;
        margin-left: 24px;
    }
    .title_left>span{
        display: inline-block;
        margin-left: 24px;
        font-size:20px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(50,50,50,1);
    }
.centNavBox{
    width: 100%;
    padding:24px ;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: #FFF;
    margin-top:194px;
}
.Aud_title{
    text-align: center;
}
.cx{margin-bottom: 28px}
.cx>input{
    width:394px;
    padding-left: 10px;
    height:36px;
    background:rgba(255,255,255,1);
    border-radius:4px 0px 0px 4px;
    border:1px solid rgba(211,219,235,1);
}
.cx>span{
    display: inline-block;
    width:68px;
    height:36px;
    background:rgba(51,119,255,1);
    border:1px solid rgba(51,119,255,1);
    border-radius:0px 4px 4px 0px;
    line-height: 36px;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    text-align: center;
    cursor: pointer;
}
.right_btn{
    float: right;
    width:112px!important;
    height:36px!important;
    background:rgba(242,246,252,1)!important;
    border-radius:4px!important;
    border:1px solid rgba(211,219,235,1);
    font-size:14px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    border:1px solid rgba(211,219,235,1)!important;
    text-align: center;
    color:rgba(61,73,102,1)!important;
}
.block{text-align: right}
</style>