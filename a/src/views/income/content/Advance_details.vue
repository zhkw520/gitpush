<template>
   <div>
        <div class="top_name">
             <span class="top_txt" @click='fh(-1)'>预付金管理&nbsp;/&nbsp;</span>
              <span class="top_txt" style="margin-left:auto">查看详情</span>
            <div class="title_left">
                <span>查看详情</span>
                <span class='time'>项目ID:{{this.$route.query.porject_id}}</span>
                <span class='time'>设计师ID：{{this.$route.query.open_id}}</span>
                <span class='time'>开户名：{{this.$route.query.account_name}}</span>
            </div>
        </div>
        <div class='content'>
            <div>
                <span class='tit_name'>初始预约金：{{this.$route.query.money}}</span>
                <span class='tit_name' style="margin-left:24px">当前预约金余额：{{this.$route.query.ye}}</span>
                <span  class='tit_name red' v-if="attach_id==0">汇款凭证待补充</span>
                <span class='up' @click=' updata()' v-if="attach_id==0">上传汇款凭证</span>
                 <span class='up'  v-if="attach_id==1"  @click='CK()'>查看汇款凭证</span>
            </div>
           <div>
                 <template>
                    <el-table
                            :data="tableData"
                            header-align="center"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            style="width: 100%;color:#000">
                        <el-table-column
                                label="消耗预约金" prop="advance_payment_income"
                               >
                        </el-table-column>
                        <!-- <el-table-column
                                label="预约金余额" prop="material_name"
                                >
                        </el-table-column>
                        <el-table-column
                                label="消耗原因" prop="account_name"
                                >
                        </el-table-column> -->
                        <el-table-column
                                sortable
                                label="更新时间" prop="updated_at"
                                >
                        </el-table-column>
                        
                    </el-table>
                </template>
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
        </div>
        <div class='bg' v-if='exe'>
            <div class='dr'>
                  <div class='dr_tit'>
                      <span>导入数据</span>
                  </div> 
                  <div class='file_ADD'>
                      <span class='fj'>附件：</span>
                      <el-upload
                        class="upload-demo"
                        action="1"
                        :on-preview="handlePreview"
                        :http-request="uploadFile"
                        multiple
                        >
                        <el-button size="small" type="primary">选择</el-button>
                        </el-upload> 
                  </div>
                  <div style="margin-top:16px">
                      <span class='fj'>附件名称：</span>
                      <span>{{this.file.name}}</span>
                      <img src="img/yc.png" alt="" class='del' v-if='this.file.name' @click='del()'>
                  </div>
                  <div class='btns'>
                        <span class='qr' @click='drData()'>确认</span>
                        <span @click='heid()'>取消</span>
                </div>
            </div>
        </div>
        <div class='bg' v-if='imgs' @click='gb()'>
            <img :src="url" alt="" class='img'>
        </div>
   </div>
</template>

<script>
export default {
            data(){
                return{
                    p:10,
                    page:1,
                    total:0,
                    tableData:[{time:2020}],
                    exe:false,
                    file:{},
                    attach_id:"",
                    url:"",
                    imgs:false
                }
            },
            mounted(){
                this.getDataList();
                this.listData();
            },
            methods:{
                fh(index){
                    this.$router.go(index)
                },
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
                handleSizeChange(p) { // 每页条数切换
                    this.p = p;
                    this.getDataList()
                },
                handleCurrentChange(page) {//页码切换
                    this.page = page;
                    this.getDataList()
                },
                CK(){this.imgs=true},
                gb(){this.imgs=false},
                 handlePictureCardPreview(file) {
                        this.dialogImageUrl = file.url;
                        this.dialogVisible = true;
                },
                listData(){
                    let params={open_id:this.$route.query.open_id,porject_id:this.$route.query.porject_id,account_name:this.$route.query.account_name,p:this.p,page:this.page};
                    this.api.ds_advance_payment_list({params}).then((res)=>{
                        this.attach_id=res.data[0].attach_id;
                        if(res.data[0].attach){
                            this.url=res.data[0].attach.url
                        }
                        
                    })
                },       
                handlePreview(file) {
                        console.log(file);
                },
                 uploadFile(file){
                    this.file=file.file;
                },
                 updata(){
                    this.exe=true;  
                },
                 heid(){
                    this.exe=false;
                    this.file={};
                },
                  del(){
                   this.file={}
                },
                 drData(){
                    if(!this.file.name){
                        this.$message.error('附件不能为空')
                        return
                    }
                    let formData =new FormData;
                    formData.append('porject_id',this.$route.query.porject_id);
                    formData.append('attach',JSON.stringify(this.file))
                    this.api.ds_advance_payment_upload_remittance(formData).then((res)=>{
                        if(res!=false){
                            this.heid();
                            this.getDataList();
                            this.listData();
                        }
                    })
                },
                getDataList(){
                    let params={open_id:this.$route.query.open_id,project_id:this.$route.query.porject_id,account_name:this.$route.query.account_name,p:this.p,page:this.page}
                    this.api.ds_advance_payment_detail({params}).then((res)=>{
                        this.total=res.total;
                        this.tableData=res.data;
                    })
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
    .content{
        margin-top: 199px;
    }  
    .times{
        display: inline-block;
        margin: 24px;
    }
    .times .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width:200px!important
    }
    
    .btn_right{
        display: inline-block;
        float:right;
        margin: 24px 24px 0 0;
    }
    .btn_right span{
        display: inline-block;
        cursor: pointer;
        width: 90px;
        height: 36px;
        border: 1px solid #ddd;
        border-radius: 3px;
        line-height: 36px;
        text-align: center;
        margin:0 0 24px 24px;

            
    }
    .cx{
        color: #fff!important;
        border:0!important;
        background: #3377ff!important;
    }
    .tit_name{
        display: inline-block;
        font-size: 14px;
        font-weight: bold;
        margin: 24px;
    }
    select{
        width: 200px;
        height: 36px;

    }
    input{
        width: 190px;
        height: 30px;
        padding-left: 10px;
    }
    .time{
        display: inline-block;
        padding: 3px 5px;
        background: #ddd;
        border-radius: 3px;
        margin: 0 16px;
        font-size: 14px!important;
        font-weight: 400!important;
        
    }
    .up{

        display: inline-block;
        width: 120px;
        height: 36px;
        line-height: 36px;
        border:1px solid #ddd;
        border-radius: 3px;
        float:right;
        margin-right: 24px;
        text-align:center;
        margin-top: 15px;
        cursor: pointer;
    }
    .red{color: red!important;}
     .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        z-index: 9;
        bottom: 0;
        right: 0;
       
    }
    .dr{
        width: 450px;
        min-height: 250px;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        border-radius: 3px;
        background: #fff;
        /* text-align: center */
    }
    .cx{
        color: #fff!important;
        border:0!important;
        background: #3377ff!important;
    }
    .fc_statuc{
        display: inline-block;
        margin-right: 15px;

    }
    input{
        width: 190px;
        height: 32px;
        padding-left: 10px;
        border-radius: 3px;
    }
    select{
        width: 200px;
        height: 34px;

    }
    .dr_tit{
        width:100%;
        height: 60px;
        text-align: center
    }
    .dr_tit span{
        display: inline-block;
        line-height:60px;
        font-size: 14px;
        font-weight: bold;
        
    }
    .upload-demo{
        display: inline-block;
    }
    .fj{
        font-size: 14px;
        margin-right: 16px; 
        display: inline-block;
        width: 100px;
        text-align: right;   
    }
    a{
        color:#3377ff;
        font-size: 14px;
        margin-left: 16px; 
    }
     .btns{
        margin-top: 24px;
        text-align: center
    }
    .btns span{
            width: 90px;
            height: 36px;
            display: inline-block;
            border:1px solid #ddd;
            text-align: center;
            line-height: 36px;
            border-radius: 3px;
            margin-right: 24px;
            cursor: pointer;
            margin-bottom: 24px;
    }
    .qr{
        background: #3377ff;
        border:0px!important;
        color:#fff;

    }
    .del{
        width: 16px;
        cursor: pointer;
        vertical-align: bottom;
        margin-left: 10px;
    }
    .img{
        max-width: 50%;
        max-height:50% ;
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
</style>