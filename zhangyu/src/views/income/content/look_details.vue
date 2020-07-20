<template>
 <div>
      <div class="top_name">
            <span class="top_txt" @click='fh(-1)'>设计师线下结算&nbsp;/&nbsp;</span>
            <span class="top_txt" style="margin-left:auto">查看详情</span>
            <div class="title_left">
                <span>查看详情</span>
                <span  class='jl' @click='jump()'>操作记录</span>
                <span class='bj' @click='BJ()'>编辑</span>
            </div>
        </div>
        <div class='boxText'>
            <div>
                <span  class='boxText1' style="margin-top:24px">总结算金额：</span>
                <span >{{data.total_amount}}</span>
            </div>
             <div>
                <span class='boxText1'>结算周期：</span>
                <span>{{data.tdate}}</span>
            </div>
             <div>
                <span  class='boxText1' style=" vertical-align: top;">备注(选填)：</span>
                <div class='cont'>{{data.remark}}</div>
            </div>
             <div>
               <span  class='boxText1'>结算凭证：</span>
               <span v-if="data.attach_id">{{data.attach.name}}</span>
               <a :href='data.attach.url'  v-if="data.attach_id" style="color:#3377ff;margin-left:15px">下载</a>
            </div>
            <div>
                <span class='boxText1'>结算业务详情</span>
            </div>
            <div style="width:500px;margin-left:24px">
                 <template>
                    <el-table
                            :data="data.businesses"
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
</template>

<script>
 export default {
   data () {
     return {
            tableData:[],
            data:{},
     }
   },
   mounted(){
       this.getData()
   },
   methods:{
       BJ(){
           this.$router.push({
               path:"./Designer_ADD",
                query:{
                    data:this.data
                }
           })
       },
       getData(){
           let params={record_id:this.$route.query.record_id}
           this.api.ds_offline_settlement_record_detail({params}).then((res)=>{
               this.data=res
           })
       },
       jump(){
            this.$router.push({
                path:"./Designer_record",
                query:{
                    record_id:this.$route.query.data.record_id
                }
            })
        },
       fh(index){
           this.$router.go(index)
       },
   },
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
    .boxText{
        margin-top: 199px;
        background: #fff;
    }
    .bj,.jl{
        display: inline-block;
        width: 90px;
        height: 36px;
        border-radius: 3px;
        border:1px solid #ddd;
        cursor: pointer;
        font-size: 14px!important;
        font-weight: 500!important;
        line-height: 36px;
        text-align: center!important;
        float:right;
        margin-right: 16px;
    }
    .jl{
        margin-right: 20%!important;
    }
    .boxText1{
        display: inline-block;
        margin: 0 0 24px 0;
        font-size: 14px;
        width:120px;
        text-align: right;
    }
    .cont{
        width: 350px;
        height: 90px;
        display: inline-block;
    }
</style>

