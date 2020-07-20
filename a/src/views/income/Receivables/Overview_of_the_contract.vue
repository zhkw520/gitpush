<template>
    <div>
        <div class="top_name">
            <span class="top_txt" @click='fh(-1)'>广告收款结算 /  合同概览</span>
            <div class="title_left">
                <span>合同概览</span>
            </div>
            <div>
                <span style="margin:0 10px 0 24px">合同归档号</span>
                <input type="text" placeholder="搜索关键词" v-model="archive_id">
                <span>结算方</span>
                <input type="text" placeholder="搜索关键词" v-model="balance_name">
                <span>项目名称</span>
                <input type="text" placeholder="搜索关键词" v-model="project_name">
                <!-- <span>结算主体</span>
                <input type="text" placeholder="搜索关键词" v-model="search"> -->
                <span>状态：</span>
                <select v-model="status">
                    <option value="">全部</option>
                    <option value="0">待处理</option>
                    <option value="1">生效中</option>
                    <option value="2">已过期</option>
                    <option value="4">即将过期</option>
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
                                label="合同归档号" prop="archive_id"
                               >
                        </el-table-column>
                        <el-table-column
                                label="合同编号" prop="contract_id"
                                show-overflow-tooltip
                               >
                        </el-table-column>
                        <el-table-column
                                label="项目名称" prop="project_name"
                                show-overflow-tooltip
                                >
                        </el-table-column>
                        <el-table-column
                                label="结算主体" prop="balance_name"
                                show-overflow-tooltip
                                >
                        </el-table-column>
                        <el-table-column
                                label="合作公司" prop="company_name"
                                show-overflow-tooltip
                                >
                        </el-table-column>
                        <el-table-column
                                label="广告类型" prop="ad_type"
                                >
                        </el-table-column>
                        <el-table-column
                                label="商务模式" prop="balance_type"
                                show-overflow-tooltip
                                >
                        </el-table-column>
                        <el-table-column
                                label="状态" prop="status_text"
                                >
                                <template slot-scope="props">
                                    <el-button type="text" :class='{red:tableData[props.$index].status==2||tableData[props.$index].status==4}' >{{tableData[props.$index].status_text}}</el-button>
                                </template>
                        </el-table-column>
                        <el-table-column
                                label="合同截止日期" prop="contract_end_time"
                                >
                                <template slot-scope="props">
                                    <el-button type="text" >{{setTime(tableData[props.$index].contract_end_time)}}</el-button>
                                </template>
                        </el-table-column>
                        <el-table-column label="开票信息">
                            <template slot-scope="props">
                                <el-button type="text" @click='CK(tableData[props.$index].balance_name)' >查看</el-button>
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
        <div class='bg' v-if='details'>
            <div class='details'>
                 <div class='ts'>
                    <span>开票信息</span>
                    <img style="float:right;margin-right:24px;cursor: pointer;width:16px;margin-top:20px" src='img/gb.png' @click='heidCk()'>
                </div>
                <div>
                    <span class='titNames'>开户名</span>
                    <span>{{list.account_name}}</span>
                </div>
                 <div>
                    <span class='titNames'>银行账号</span>
                    <span>{{list.bank_card_id}}</span>
                </div>
                 <div>
                    <span class='titNames'>开户银行</span>
                    <span>{{list.bank_name}}</span>
                </div>
                 <div>
                    <span class='titNames'>信用代码</span>
                    <span>{{}}</span>

                </div>
                 <div>
                    <span class='titNames'>联系人</span>
                    <span>{{list.contact}}</span>
                </div>
                 <div>
                    <span class='titNames'>联系电话</span>
                    <span>{{list.phone}}</span>
                </div>
                 <div>
                    <span class='titNames'>相关合同编号</span>
                    <span>{{}}</span>
                </div>
                 <div>
                    <span class='titNames'>备注</span>
                    <span>{{list.note}}</span>
                </div>
                 <div>
                    <span class='titNames'>附件</span>
                    <div style="display: inline-block">
                        <div v-for="item in list.attachs">
                                <span class="textName">{{item.name}}</span>
                                <a style="color:#3377ff;cursor: pointe;margin-left:10px" :href="item.url">下载</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <loading v-if='load'></loading>
    </div>
</template>

<script>
 import loading from '../../../components/loading'
 export default {
       components:{loading},
   data () {
     return {
            tableData:[{updator:10}],
            p:10,
            page:1,
            total:0,
            status:"",
            search:"",
            details:false,
            load:true,
            list:{},
            archive_id:"",
            balance_name:'',
            project_name:"",


     }
   },
   mounted(){
       this.getDate()
   },
   methods:{
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
               this.getDate()
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.getDate()
            },
            cz(){
                this.status="",
                this.archive_id=""
                this.balance_name=''
                this.project_name=''
            },
            setTime(value){
                if (!value||value==0) {
                    return '';
                }else{
                     let date = new Date(value*1000);
                    let y = date.getFullYear();// 年
                    let MM = date.getMonth() + 1;// 月
                    MM = MM < 10 ? ('0' + MM) : MM;
                    let d = date.getDate();// 日
                    d = d < 10 ? ('0' + d) : d;
                    let h = date.getHours();// 时
                    h = h < 10 ? ('0' + h) : h;
                    return y + '-' + MM + '-' + d ;
                } 
                
            },
            getDate(){
                let params={is_receiver:1,p:this.p,page:this.page,status:this.status,archive_id:this.archive_id,balance_name:this.balance_name,project_name:this.project_name}
                this.api.settle_data_project_contracts({params}).then((res)=>{
                    this.total=res.total;
                    this.tableData=res.data
                    this.load=false
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
            CK(data){
                this.details=true;
                this.getContractDateils(data)
            },
            getContractDateils(data){
                let params={name:data,is_receiver:1};
                this.api.settle_settlement_detail({params}).then((res)=>{
                    this.list=res;
                })
            },
            heidCk(){
                this.details=false
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
        margin: 24px;
        width:180px;
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
        margin-right:15%;
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
     .details{
        position: absolute;
        top:50%;
        left:50%;
        width:550px;
        min-height: 200px;
        background: #fff;
        transform: translate(-50%,-50%);
        border-radius: 5px;
    }
    .ts{
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #ddd;
        margin-bottom: 20px;
    }
    .ts span{
        font-size: 14px;
        font-weight: bold;
        margin-left: 24px;
        display: inline-block;
        line-height: 50px;

    }
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        z-index: 9;
        bottom: 0;
        right: 0;
       
    }
    .titNames{
        display: inline-block;
        width:90px;
        text-align: right;
        font-size: 14px;
        margin-right: 10px;
        margin-bottom: 16px;
        margin-left: 24px;
    }
    .red{
        color: red;
    }
</style>
