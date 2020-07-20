<template>
    <div>
   
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="jump()">收款结算&nbsp;/</span>
                <span class="log_url" @click="jumps()">&nbsp;收款结算方管理&nbsp;/</span>
                <span class="new_url">&nbsp;结算方详情</span>
            </div>
            <div class="title_left">
                <span>结算方详情</span>
            </div>
        </div>
        <div class="tableBox">
             <!-- <transition name="fade"> -->
                <loading v-if="isLoading"></loading>
            <!-- </transition> -->
            <div>
                <span class="tableBox_name">结算方名称</span>
                <span class="tableBox_Obtain">{{list.name}}</span>
            </div>
            <!--<div>-->
                <!--<span class="tableBox_name">生成对账时间</span>-->
                <!--<span class="tableBox_Obtain" v-if="list.tdate!=0">每月{{list.tdate}}号</span>-->
                <!--<span class="tableBox_Obtain" v-if="list.tdate==0">不自动生成</span>-->
            <!--</div>-->
            <div>
                <span class="tableBox_name">开户名</span>
                <span class="tableBox_Obtain">{{list.account_name}}</span>
            </div>
            <div>
                <span class="tableBox_name">银行账号</span>
                <span class="tableBox_Obtain">{{list.bank_card_id}}</span>
            </div>
            <div>
                <span class="tableBox_name">开户银行</span>
                <span class="tableBox_Obtain">{{list.bank_name}}</span>
            </div>
            <div>
                <span class="tableBox_name">税号</span>
                <span class="tableBox_Obtain">{{list.tax_id}}</span>
            </div>
            <div>
                <span class="tableBox_name">联系人</span>
                <span class="tableBox_Obtain">{{list.contact}}</span>
            </div>
            <div>
                <span class="tableBox_name">对账邮箱</span>
                <span class="tableBox_Obtain">{{list.email}}</span>
            </div>
            <div>
                <span class="tableBox_name">备注</span>
                <span class="tableBox_Obtain">{{list.note}}</span>
            </div>
            <div>
                <span class="tableBox_name">附件</span>
                <div style="display: inline-block">
                    <div v-for="item in list.attachs">
                            <span class="textName">{{item.name}}</span>
                            <!--<span class="ck">查看</span>-->
                            <a class="xz" :href="item.url">下载</a>
                    </div>
                </div>
            </div>
             <div>
                <span class="tableBox_name" style="vertical-align: top">项目合同信息及绑定数据来源</span>
                <div style="padding:0 24px">
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
                              
                        </el-table-column>
                        <el-table-column
                                label="合同截止日期" prop="contract_end_time"
                                >
                                <template slot-scope="props">
                                    <el-button type="text" >{{setTime(tableData[props.$index].contract_end_time)}}</el-button>
                                </template>
                        </el-table-column>
                        <el-table-column label="合同信息">
                            <template slot-scope="props">
                                <el-button type="text"  @click='CK(tableData[props.$index].archive_id)'>查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
                </div>
                 
            </div>
        </div>

        <div class="bg" v-if="ht">
            <div class="content">
                <div class="content_tit">
                    <span>添加合同</span>
                    <img src="img/gb.png" alt="" class='imgGB' @click='heidCK()'>
                </div>
                <div style="margin: 14px 20px" v-for="item in listData">
                    <div>
                        <span class="ContractID">合同编号：</span>
                        <span style="display: inline-block;width: 200px;height: 20px" class="ContractID">{{item.contract_id}}</span>
                        <span v-if="item.status=='1'" class="statusColor" style="color:#39BD65;float: right">{{item.status_text}}</span>
                        <span v-if="item.status=='0'" class="statusColor" style="color:#FFA033;float: right">{{item.status_text}}</span>
                        <span v-if="item.status=='2'" class="statusColor" style="color:#F05656;float: right">{{item.status_text}}</span>
                        <span v-if="item.status=='3'" class="statusColor" style="color:#1F2E4D;float: right">{{item.status_text}}</span>
                        <div>
                            <span  class="ContractID">归档文件：</span>
                            <div v-for="da in item.contract_files" style="display: inline-block">
                                <div>
                                    <span class="imgName">{{da.name}}</span>
                                    <a class="content_xz" target="_blank" :href="da.url" >下载</a>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
import Loading from '@/components/loading'
    export default {
         components:{ Loading  },
        name: "settlement-details",
        data(){
            return{
                list:{},
                // contracts:[],
                isLoading: true,
                tableData:[],
                ht:false,
                listData:[]
            }
        },
        mounted(){
            this.getData()
        },
        methods:{
            jump(){
                this.$router.push({
                    path:"./Administration"
                })
            },
            jumps(){
                this.$router.push({
                    path:"./ReceiverManagement"
                })
            },
            fh(num){
                this.$router.go(num)
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
            getData(){
                let params={name:this.$route.query.name,is_receiver:1};
                this.api.settle_settlement_detail({params}).then((res)=>{
                    this.list=res;
                    // this.contracts=res.contracts;
                    this.isLoading = false;
                    this.getContract()
                })
            },
             getContract(){
                let params={is_receiver:1,balance_name:this.list.name}
                this.api.settle_data_project_contracts({params}).then((res)=>{
                    this.tableData=res.data
                })
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
            CK(id){
                this.ht=true;
                this.getHT(id)
            },
            heidCK(){
                this.ht=false
            },
            getHT(id){
                let params={contract_id:id};
                this.api.common_contract({params}).then((res)=>{
                    this.listData=res;
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
        margin-left: 24px;
        margin-top: 15px;
        cursor: pointer;
    }
    .tableBox{
        margin-top: 182px;
        background: #fff;
        padding-top:32px ;
    }
    .tableBox_name{
        display: inline-block;
        width:185px;
        height:20px;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        text-align: right;
        margin:0 22px 24px 25px;
    }
    .tableBox_Obtain{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(109,119,139,1);
    }
    .xz,.ck{
        display: inline-block;
        margin-left: 12px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(51,119,255,1);
        cursor: pointer;
    }
    .textName{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
    }
    .titTableName{
        font-size:14px;
        font-family:PingFang-SC-Regular,PingFang-SC;
        font-weight:400;
        color:rgba(31,46,77,0.65);
    }
    .titTableCon{
        font-size:14px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:#1F2E4D;
    }
    .contract{
        max-height: 368px;
        overflow-y:auto;
    }
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        z-index: 9;
        bottom: 0;
        right: 0
    }
    .content{
        position: relative;
        left: 50%;
        top: 30%;
        transform: translate(-50%,-50%);
        width:460px;
        height:312px;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 6px 0px rgba(0,0,0,0.06);
        border-radius:4px;
    }
     .ContractID{
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(31,46,77,1);
        vertical-align: top;
    }
     .statusColor{
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;

    }
     .imgName{
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(31,46,77,0.65);
    }
    .content_xz{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(51,119,255,1);
        margin-left: 10px;
        cursor: pointer;
    }
    .content_tit{
        border-bottom: 1px solid #ddd;
    }
     .content_tit span{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Medium,PingFangSC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin: 21px 0 24px 20px;
    }
    .imgGB{
        width: 16PX;
        float:right;
        margin-right: 24px;
        cursor: pointer;
        margin-top:24px
    }
</style>