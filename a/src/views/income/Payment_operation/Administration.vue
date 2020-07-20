<template>
    <div>
        <div class="top">
            <div class="top_tit">
                <span>付款结算</span>
            </div>
            <div>
                <div class="AD_time">
                    <el-date-picker
                            v-model="value"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
                <div class="seach">
                    <img src="../../../../public/img/ss.png">
                    <input type="text" placeholder="搜索结算方名称" v-model="search">
                </div>
                <span class="cx" @click="getDataList()">查询</span>
                <div style="display: inline-block;float: right;margin-right: 15%">
                    <!-- <span class="clear" @click="establish" :class="{Jurisdiction:this.controlBtns}">新建结算</span> -->
                    <!-- <span class="sf" @click="jump()" :class="{Jurisdiction:this.controlBtn}">付款结算方管理</span> -->
                </div>

            </div>
        </div>
        <div class="table">
            <div>
                 <template>
                    <el-table
                            :data="tableData"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            >
                        <el-table-column
                                prop="id"
                                label="结算单ID">
                        </el-table-column>
                        <el-table-column
                                prop="creator"
                                :show-overflow-tooltip="true"
                                label="结算单名称">
                            <template slot-scope="scope">
                                <span>{{tableData[scope.$index].check.check1.statement}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="status_name"
                                label="状态">

                        </el-table-column>
                        <el-table-column
                                prop="status"
                                :show-overflow-tooltip="true"
                                label="结算时间段">
                                <template slot-scope="scope">
                                    <span>{{(tableData[scope.$index].check.check1.tstart).split('-').join('/')}}至</span>
                                    <span>{{(tableData[scope.$index].check.check1.tend).split('-').join('/')}}</span>
                                </template>
                        </el-table-column>
                        <el-table-column
                                prop="check.expect_amount"
                                label="预计结算金额">
                            <template slot-scope="scope">
                                <span v-if="tableData[scope.$index].check.check2">{{(tableData[scope.$index].check.check2.expect_amount).toLocaleString("zh-Hans-CN",{style:'currency',currency:'CNY'})}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="check.real_amount"
                                label="实际结算金额">
                            <template slot-scope="scope">
                                <span v-if="tableData[scope.$index].check.check3">{{(tableData[scope.$index].check.check3.real_amount).toLocaleString("zh-Hans-CN",{style:'currency',currency:'CNY'})}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="remit.receive_amount"
                                label="实际到账金额">
                            <template slot-scope="scope" v-if="tableData[scope.$index].remit!=null">
                                <span :class="{red:tableData[scope.$index].remit.receive_amount!=tableData[scope.$index].check.check2.real_amount}">{{(tableData[scope.$index].remit.receive_amount).toLocaleString("zh-Hans-CN",{style:'currency',currency:'CNY'})}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="操作">
                            <template slot-scope="scope">
                                <el-button  type="text" size="small" @click="details(tableData[scope.$index].id)" v-if="tableData[scope.$index].status>2">查看详情</el-button>
                                <el-button  type="text" size="small" @click="zfXQ(tableData[scope.$index].id,tableData[scope.$index].status)" v-if="tableData[scope.$index].isfinish==2">查看作废原因</el-button>
                                
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
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
        <abs v-if="ab" :skID="skID" :status="status"></abs>
    </div>
</template>

<script>
    
    export default {

        name: "administration",
        data(){
            return{
                value:[],
                page:1,
                p:10,
                total:0,
                search:'',
                tableData:[],
                control:[],
                controlBtn:false,
                controlBtns:false,
                skID:"",
                status:"",
                ab:false,
            }
        },
        created(){
            // let date = new Date();
            // date.setMonth(date.getMonth()-3);
            // this.myformatter(date);
            this.getDataList()
        },
        mounted(){
            this.control=JSON.parse(localStorage.getItem('control'));
            if(this.control.length==0){
                this.controlBtn=true;
                this.controlBtns=true;
            }else {
                for (var i = 0; i < this.control.length; i++) {
                    if (this.control[i].uri_key == 'uri.settlement.settle.add') {
                        this.controlBtn=false;
                        return
                    }else{
                        this.controlBtn=true;
                    }
                }
                for (var i = 0; i < this.control.length; i++) {
                    if(this.control[i].uri_key == 'uri.settlement.check.add') {
                        this.controlBtns = false;
                        return
                    }else{
                        this.controlBtns = true;
                    }
                }
            }

        },
        methods:{
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
                this.getDataList()
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.getDataList()
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
            jump(){
                this.$router.push({
                    path:"./ReceiverManagement"
                })
            },
            establish(){
                this.$router.push({
                    path:"./establish",
                     query:{
                        step:1,
                    }
                })
            },
            details(id){
                this.$router.push({
                    path:"./details",
                    query:{
                        id:id
                    },
                })
            },
            myformatter(date){
               
                var strDate = date.getFullYear()+"-";

                if(date.getMonth()<10){

                    var s = date.getMonth()+1+"-";

                    strDate += "0"+s;

                }else{

                    strDate += date.getMonth()+1+"-";

                }

                if(date.getDate()<10){

                    strDate += "0"+date.getDate();

                }else{

                    strDate += date.getDate();

                }
                this.value=[strDate,(new Date()).toLocaleDateString().split('/').join('-')];
                this.getDataList();
            },
            getDataList(){
                let params={search:this.search,is_receiver:'0',tstart:this.value[0],tend:this.value[1],p:this.p,page:this.page};
                this.api.settlemanage_search({params}).then((res)=>{
                    this.tableData=res.data;
                    console.log(res);
                    this.total=res.total;
                })
            },
            zfXQ(id,status){
                this.ab=true;
                this.skID=id;
                this.status=status;
            },
            zf(id,status){
                this.ab=true;
                this.skID=id;
                this.status=status;
            },
            heidAbolish(){
                this.ab=false;
            }
        },
    }
</script>

<style scoped>
    .top{
        width: 100%;
        height:120px;
        border-top: 1px solid #ededed;
        background: white;
        -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.04);
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.04);
        position: fixed;
        left: 256px;
        top: 63px;
        z-index: 99;
    }
    .top_tit span{
        display: inline-block;
        font-size:18px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin:19px 0 20px 24px;
    }
    .AD_time{
        display: inline-block;
        margin: 0 24px 0 24px;
    }
    .AD_time .filtrate .timesDate .content_table .time .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width:272px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .seach{
        display: inline-block;
        margin-right: 24px;
        position:relative;
    }
    .seach img{
        width: 24px;
        height: 24px;
        position: absolute;
        left: 3px;
        top:5px;
    }
    .seach input{
        width:170px;
        height:32px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        padding-left: 30px;
        border:1px solid rgba(211,219,235,1);
    }
    .cx,.clear,.sf{
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
    .clear{
        width:96px!important;
    }
    .sf{
        width:138px!important;
    }
    .table{
        margin-top: 204px;
        background: #fff;
    }
    .Jurisdiction{
        display: none!important;
    }
    .red{
        color: red;
    }
</style>