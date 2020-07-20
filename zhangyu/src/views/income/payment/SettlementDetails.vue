<template>
    <div>
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="jump()">付款结算&nbsp;/</span>
                <span class="log_url" @click="jumps()">&nbsp;付款结算方管理&nbsp;/</span>
                <span class="new_url">&nbsp;结算方详情</span>
            </div>
            <div class="title_left">
                <span>结算方详情</span>
            </div>
        </div>
        <div class="tableBox">
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
                <span class="tableBox_name" style="vertical-align: top">相关合同</span>
                <div style="display: inline-block">
                    <div style="width: 714px;" class="contract">
                        <template>
                            <el-table
                                    :data="contracts"
                                    style="width: 100%"
                                    :header-cell-style="getRowClass"
                                    :cell-style="cell"
                            >
                                <el-table-column
                                        prop="date"
                                        show-overflow-tooltip
                                >
                                    <template slot-scope="scope">
                                        <div v-for="(item,key) in (contracts[scope.$index])">
                                            <span class="titTableName">文件归档号:</span>
                                            <span class="titTableCon">{{item.archive_id}}</span>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        show-overflow-tooltip
                                >
                                    <template slot-scope="scope">
                                        <div v-for="(item,key) in (contracts[scope.$index])">
                                            <span class="titTableName">合同编号:</span>
                                            <span class="titTableCon">{{item.contract_id}}</span>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="address"
                                        width="100"
                                >
                                    <template slot-scope="scope">
                                        <div v-for="(item,key) in (contracts[scope.$index])">
                                            <span v-if="item.status=='1'" style="color:#39BD65">{{item.status_text}}</span>
                                            <span v-if="item.status=='0'" style="color:#FFA033">{{item.status_text}}</span>
                                            <span v-if="item.status=='2'" style="color:#F05656">{{item.status_text}}</span>
                                            <span v-if="item.status=='3'" style="color:#1F2E4D">{{item.status_text}}</span>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column type="expand">
                                    <template slot-scope="scope">
                                        <div v-for="(data,key) in (contracts[scope.$index])">
                                            <div v-for="da in data.contract_files">
                                                <span style="display: inline-block;width: 50%">{{da.name}}</span>
                                                <a :href="da.url" target="_blank" style="display: inline-block;width: 50%;text-align: right">下载</a>
                                            </div>
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </div>
                </div>
            </div>
            <div>
                <span class="tableBox_name">已绑定数据来源主体</span>
                <div style="display: inline-block" v-for='(value,key) in list.advertisers'>
                    <span class="textName">{{value}}</span>
                </div>
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
        </div>
    </div>
</template>

<script>
    export default {
        name: "settlement-details",
        data(){
            return{
                list:{},
                contracts:[],
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
            getData(){
                let params={name:this.$route.query.name,is_receiver:0};
                this.api.settle_settlement_detail({params}).then((res)=>{
                    this.list=res;
                    console.log(this.list)
                    this.contracts=res.contracts;
                })
            },
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return ';color:rgba(31,46,77,1);text-align:center;font-size:14px;font-weight:500;font-family:PingFang-SC-Medium;height:0px;padding:0px'
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
        width:126px;
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
</style>