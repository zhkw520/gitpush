<template>
 <div>
      <div class="top_name">
            <span class="top_txt" @click='fh(-1)'>设计师线下结算&nbsp;/</span>
            <span class="top_txt" style="margin-left:auto" v-if="this.$route.query.record_id==undefined">新建</span>
            <span class="top_txt" style="margin-left:auto" v-if="this.$route.query.record_id!=undefined">编辑</span>
            <div class="title_left">
                <span v-if="this.$route.query.record_id==undefined">新建</span>
                <span v-if="this.$route.query.record_id!=undefined">编辑</span>
            </div>
        </div>
        <div class='New'>
            <div class='tit1'> 
                <span>总结算金额：</span>
                <input type="number" placeholder="请输入" v-model="total_amount">
            </div>
            <div  class='tit2'>
                <span >结算周期：</span>
                <el-date-picker
                        v-model="tdate"
                        type="month"
                        format="yyyy-MM"
                        value-format="yyyy-MM"
                        placeholder="选择月">
                </el-date-picker>
            </div>
            <div  class='tit3'>
                <span style=" vertical-align: top;">备注(选填)：</span>
                <textarea v-model="remark" style="margin-bottom:24px"></textarea>
            </div>
            <div class='tit4'>
                <span style=" vertical-align: top;">结算凭证：</span>
                <div>
                    <el-upload
                        class="upload-demo"
                        action="000"
                        multiple
                        :http-request="updata"
                        >
                        <el-button size="small" type="primary">上传</el-button>
                    </el-upload>
                    <span v-if="attach.name" style="width:auto;text-align:left">{{attach.name}}</span>
                    <a :href="attach.url" v-if='attach.url'>下载</a>
                    <a v-if='attach.name' @click='delAttach()'>删除</a>
                </div>
            </div>
            <div class='tit5'>
                <span>结算业务详情</span>
            </div>
            <div class='tit7'>
                
                 <template>
                    <el-table
                            :data="tableData"
                            header-align="center"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            style="width: 100%;color:#000">
                        <el-table-column
                                label="业务类型" prop="tdate"
                               >
                                <template slot-scope="props" >
                                    <select v-model="tableData[props.$index].name">
                                        <option value="">请选择</option>
                                        <option value="个性化主题">个性化主题</option>
                                        <option value="商业化主题">商业化主题</option>
                                        <option value="其他">其他</option>
                                    </select>
                                </template>
                        </el-table-column>
                        <el-table-column
                                label="结算金额" prop="amount"
                                >
                                <template slot-scope="props" >
                                   <input type="number" v-model="tableData[props.$index].amount">
                                </template>
                        </el-table-column>
                        <el-table-column label="操作" width="150">
                            <template slot-scope="props" >
                                <el-button type="text" @click='del(props.$index)'>删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
                <div class='tj' @click='ADD()'>
                    <span>+添加</span>
                </div>
                <div class='tit6'>
                    <span class='bc' @click="setDate()">保存</span>
                    <span @click='qx()'>取消</span>
                </div>
            </div>
        </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {
         tdate:'',
         tableData:[],
         total_amount:"",
         remark:"",
         attach:{},
         businesses:[],
         
     }
   },
   mounted(){
       if(this.$route.query.type!=undefined){
           this.tdate=this.$route.query.data.tdate;
           this.total_amount=this.$route.query.data.total_amount;
           this.remark=this.$route.query.data.remark;
           this.tableData=this.$route.query.data.businesses;
           this.attach=this.$route.query.data.attach
       }
   },
   methods:{
        getRowClass({row, column, rowIndex}) {
                    if (rowIndex === 0) {
                        return 'background:#f7f9fc;color:#1F2E4D;font-size:14px;font-weight:bold;height:48px;font-family:PingFang-SC-Regular;padding:20px 0px 20px 14px'
                    } else {
                        return ''
                    }
        },
        cell({row, column, rowIndex, columnIndex}){
                    return 'padding:15px 14px;color:#3d4966;font-size:14px;font-weight:400;font-family:PingFang-SC-Regular;'
        },
        del(index){
            this.tableData.splice(index,1);
        },
        ADD(){
            this.tableData.push({amount:"",name:""});
        },
        fh(index){
           this.$router.go(index)
       },
       qx(){
           this.$router.go(-1)
       },
       setDate(){
           if(this.$route.query.record_id!=undefined){
               this.eitd()
               return
           }
           if(!this.tdate){
               this.$message.error('结算周期不能为空')
               return
           }
           if(!this.total_amount){
               this.$message.error('总结算金额不能为空')
               return
           }
           if(this.total_amount<0){
               this.$message.error('总结算金额不能小于零')
               return
           }
           if(this.tableData.length<=0){
               this.$message.error('结算业务详情不能为空')
               return
           }
           let formData = new FormData;
           formData.append('tdate',this.tdate);
           formData.append('total_amount',this.total_amount);
           formData.append('remark',this.remark);
           formData.append('attach',JSON.stringify(this.attach));
           formData.append('businesses',JSON.stringify(this.tableData))
           this.api.ds_offline_settlement_record_add(formData).then((res)=>{
               if(res!=false){
                   this.qx()
               }
           })
       },
       eitd(){
            if(!this.tdate){
               this.$message.error('结算周期不能为空')
               return
           }
           if(!this.total_amount){
               this.$message.error('总结算金额不能为空')
               return
           }
           if(this.total_amount<0){
               this.$message.error('总结算金额不能小于零')
               return
           }
           if(this.tableData.length<=0){
               this.$message.error('结算业务详情不能为空')
               return
           }
           let formData = new FormData;
           formData.append('record_id',this.$route.query.record_id)
           formData.append('tdate',this.tdate);
           formData.append('total_amount',this.total_amount);
           formData.append('remark',this.remark);
           formData.append('attach',JSON.stringify(this.attach));
           formData.append('businesses',JSON.stringify(this.tableData))
           this.api.ds_offline_settlement_record_edit().then((res)=>{
                if(res!=false){
                   this.qx()
               }
           })
       },
       updata(file){
           let formData = new FormData;
           formData.append('file',file.file)
           this.api.file_private_upload(formData).then((res)=>{
               if(res!=false){
                   this.attach=res
               }
           })
       },
       delAttach(){this.attach={}},
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
        font-weight:500;
        color:rgba(50,50,50,1);
        margin-left: 24px;
        text-align: right;
    }
    .top_txt{
        display: inline-block;
        margin-left: 24px;
        cursor: pointer;
    }
    .New{
        margin-top: 199px;
        background: #fff;
    }
    .tit1 span{
        display: inline-block;
        margin: 24px 0 24px 0;
        font-size: 14px;
        width:120px;
        text-align: right;
    }
    .tit1 input{
        width: 190px;
        padding-left: 10px;
        height: 32px;
        border-radius: 3px;
    }
    .tit2 span,.tit3 span,.tit4 span{
         display: inline-block;
        margin: 0 0 24px 0;
        font-size: 14px;
        width:120px;
        text-align: right;
    }
    .tit2 .el-date-editor{
        width: 200px;
    }
    .tit3 textarea{
        width: 500px;
        height: 90px;
    }
    .tit4 div{
        display: inline-block;
    }
    .tit5 span{
        display: inline-block;
        font-size: 16px;
        font-weight: bold;
        width: 120px;
        text-align: right;
        margin: 0 0 24px 24px;
    }
    .tj{
        height: 50px;
        text-align: center;
        width: 100%;
        border:1px dotted #3377ff;
        cursor: pointer;
    }
    .tj span{
        color: #3377ff;
        font-size: 16px;
        margin-top: 15px;
        display: inline-block;
    }
    .tit6{
        margin-top: 24px;
    }
    .tit6 span{
        display: inline-block;
        width: 90px;
        height: 36px;
        border:1px solid #ddd;
        cursor: pointer;
        text-align: center;
        line-height: 36px;
        border-radius: 3px;
        margin-right:24px ;

    }
    .bc{
        background: #3377ff;
        color:#fff;
        border:0!important;
        font-size: 14px;
        margin-left: 14px;
        margin-bottom: 30px;
    }
    .tit7{
        padding: 0 24px;
    }
    .upload-demo{
        display: block!important;
        margin-bottom: 10px;
    }
    a{color: #3377ff;
        margin-left: 15px;
    }
    select{
         width: 200px;
        height: 36px;
        border-radius: 3px;
    }
    input{
         width: 190px;
        padding-left: 10px;
        height: 32px;
        border-radius: 3px;
    }
</style>
