<template>
 <div>
     <div class="top_name">
            <span class="top_txt" @click='fh(-2)'>设计师线下结算&nbsp;/</span>
            <span class="top_txt" style="margin-left:auto" @click='fh(-1)'>&nbsp;操作记录&nbsp;/</span>
            <span class="top_txt" style="margin-left:auto">&nbsp;操作记录详情</span>
            <div class="title_left">
                <span>操作记录详情</span>
            </div>
        </div>
        <div class='details'>
             <div class='tit_box'>
                <span style="margin-right:16px">处理人</span>
                <span>{{listData2.updator}}</span>
                <span  style="margin-right:16px">更新时间</span>
                <span>{{listData2.updated_at}}</span>
                <span class='before'>变更前</span>
                <span class='after'>变更后</span>
            </div>
            <div class='details_left'>
                <div :class='{xg:listData.total_amount!=listData2.total_amount}'>
                    <span class='details_tit'>总结算金额:</span>
                    <span>{{listData.total_amount}}</span>
                </div>
                <div  :class='{xg:listData.tdate!=listData2.tdate}'>
                    <span class='details_tit'>结算周期:</span>
                    <span>{{listData.tdate}}</span>
                </div>
                <div :class='{xg:listData.remark!=listData2.remark}'>
                    <span class='details_tit'>备注:</span>
                    <span>{{listData.remark}}</span>
                </div>
                <div>
                    <span class='details_tit'>结算凭证:</span>
                    <span>{{listData.attach.name}}</span>
                    <a :href='listData.attach.url'>下载</a>
                </div>
                <div>
                    <span class="yw">结算业务详情</span>
                    <div>
                         <template>
                            <el-table
                                    :data="listData.businesses"
                                    header-align="center"
                                    border
                                    style="width: 100%;color:#000">
                                <el-table-column
                                        label="业务类型" prop="name"
                                    >
                                </el-table-column>
                                <el-table-column
                                        label="结算金额" prop="amount"
                                        >
                                </el-table-column>
                            
                            </el-table>
                        </template>
                    </div>
                </div>
            </div>
            <div class='details_right'>
                <div>
                    <span  class='details_tit'>总结算金额:</span>
                    <span>{{listData2.total_amount}}</span>
                </div>
                <div>
                    <span class='details_tit'>结算周期:</span>
                    <span>{{listData2.tdate}}</span>
                </div>
                <div>
                    <span class='details_tit'>备注:</span>
                    <span>{{listData2.remark}}</span>
                </div>
                <div>
                    <span class='details_tit'>结算凭证:</span>
                    <span>{{listData2.attch.name}}</span>
                    <a :href="listData2.attch.url">下载</a>
                </div>
                <div>
                    <span class='yw'>结算业务详情</span>
                    <div>
                         <template>
                            <el-table
                                    :data="listData2.businesses"
                                    header-align="center"
                                    border
                                    style="width: 100%;color:#000">
                                <el-table-column
                                        label="业务类型" prop="name"
                                    >
                                </el-table-column>
                                <el-table-column
                                        label="结算金额" prop="amount"
                                        >
                                </el-table-column>
                            
                            </el-table>
                        </template>
                    </div>
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
            listData:{},
            listData2:{}
     }
   },
   mounted(){
       this.getData()
   },
   methods:{
       getData(){
           let params={record_id:this.$route.query.record_id,log_id:this.$route.query.log_id}
           this.api.ds_offline_settlement_record_log_detail({params}).then((res)=>{
               this.listData=res[0];
               this.listData2=res[1]
           })
       },
       fh(index){
           this.$router.go(index)
       }
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
        text-align: right;
    }
     .top_txt{
        display: inline-block;
        margin-left: 24px;
        cursor: pointer;
    }
    .details{
        margin-top: 173px;
        padding: 24px;
        background: #fff;
    }
    .before,.after{
        padding: 3px 5px;
        border:1px solid #000;
        color:#000;
        font-weight: bold;
    }
    .before{
        background: #3377ff;
    }
    .after{
        background: red;
    }
    .details_left,.details_right{
        display: inline-block;
        width: 45%;
    }
    .details_left span,.details_right span{
        font-size: 14px;
    }
    .details_left{
        padding-right: 2.5%;
        border-right: 1px solid #ddd;
    }
    .details_right{
        padding-left: 2.5%;
    }
    .tit_box span{
        margin-right: 24px;
        font-size: 14px;
    }
    .tit_box{
        margin-bottom: 40px;
    }
    .details_tit{
        display: inline-block;
        width: 75px;
        text-align: right;
        font-size: 14px;
        margin-bottom: 24px;
        margin-right: 16px;
    }
    a{
        color:#3377ff;
        margin-left: 16px;
        cursor: pointer;
    }
    .yw{
        display: inline-block;
        margin-bottom: 16px;
        width: 100%;
        border-bottom: 1px solid #ddd;
    }
    .xg{background: #3377ff;}
</style>
