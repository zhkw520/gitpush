<template>
    <div>
        <div>
            <div class="top_name">
                <span class="top_txt" @click='fh(-1)'>待处理&nbsp;/&nbsp;入库确认</span>
                <div class="title_left">
                    <img src="img/fh.png" alt=""  @click='fh(-1)'>
                    <span>入库确认</span>
                </div>
                <div class='right_btn'>
                    <span class='tj' @click='pops()' v-if='this.$route.query.status==4&&status'>提交</span>
                </div>
            </div>
        </div>
        <div class="content_right">
           
                <template>
                    <el-table
                            :data="tableData"
                            style="width: 100%"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            >
                        <el-table-column
                                prop="file_name"
                                label="文件名">
                        </el-table-column>
                        <el-table-column
                                prop="put_type"
                                label="入库类型">
                                <template slot-scope="scope">
                                        <span>{{tableData[scope.$index].put_type==0?'需整理后入库':"可直接入库"}}</span>
                                </template>
                        </el-table-column>
                        <el-table-column
                                prop="local_status"
                                label="状态">
                                <template slot-scope="scope">
                                        <span>{{tableData[scope.$index].local_status==0?'待处理':"已处理"}}</span>
                                </template>
                        </el-table-column>
                        <el-table-column
                                prop="audior_time"
                                sortable
                                label="操作时间">
                                 <template slot-scope="scope">
                                    <span>{{tableData[scope.$index].audior_time}}</span>
                                    <!-- <span v-if='this.time==4'>{{tableData[scope.$index].handler_at}}</span> -->
                                </template>
                        </el-table-column>
                        <el-table-column
                                prop=""
                                label="操作">
                                <template slot-scope="scope">
                                        <span @click='jump(tableData[scope.$index].pro_id)' style="color: #3377ff;font-size:14px;cursor: pointer;">查看详情</span>
                                </template>
                        </el-table-column>
                    </el-table>
                </template>

        </div>
        <div class='btns'>
            
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
        <div class='bg' v-if='show'>
            <div class='tsBox'>
                    <div class='tsBox_tit'>
                        <span v-if='this.yc==false'>是否确认提交？</span>
                         <span class='tsBox_tit2' v-if="this.yc">入库异常说明</span>
                        <div>
                            <textarea name="" id="" v-if="this.yc"  v-model='note' placeholder="请输入入库异常原因(最多20字)" maxlength="20"></textarea>
                        </div>
                    </div>
                    <div class='tsBox_btn'>
                        <span class='tsBox_btn_qd' @click='sh()'>确定</span>
                        <span @click='heid()'>取消</span>
                    </div>
            </div>
        </div>
    </div>

</template>

<script>
   
    export default {
        name: "replace",
        data(){
            return{
               tableData:[],
               show:false,
               note:"",
               yc:false,
               p:10,
               page:1,
               total:0,
               status:false
            }
        },
        mounted(){
                this.getData()
        },

        methods:{
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:#f7f9fc;color:#1F2E4D;text-align:center;font-size:14px;font-weight:bold;height:48px;font-family:PingFang-SC-Regular;'
                } else {
                    return ''
                }
            },

            cell({row, column, rowIndex, columnIndex}){
                return 'text-align:center;color:#000;font-size:16px;font-weight:400;font-family:PingFang-SC-Regular;'
            },
             getData(){
                let params={did:this.$route.query.did,is_put:'1',p:this.p,page:this.page}
                this.api.demand_design_project({params}).then((res)=>{
                    this.tableData=res.project.data;
                    this.total=res.project.total;
                    for(var i=0;i<this.tableData.length;i++){
                        if(this.tableData[i].local_status==1){
                            this.status=true
                        }
                    }
                })
           },
           fh(){
               this.$router.go(-1)
           },
           pops(){
               this.show=true;
                for(var i=0;i<this.tableData.length;i++){
                    if(this.tableData[i].local_status=='0'){
                        this.yc=true;
                    }
                }
           },
           heid(){
               this.show=false;
           },
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
                this.getData()
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.getData()
            },
            sh(){
                if(this.yc==true&&this.note==''){
                    this.$message.error('入库异常说明不能为空');
                    return
                    
                }
                let formData = new FormData;
                    formData.append('id',this.$route.query.did);
                    formData.append('status',this.$route.query.status);
                    formData.append('note',this.note)
                    this.api.demand_audit(formData).then((res)=>{
                        if(res!=false){
                            this.fh(-1);
                        }
                    })
           },
           jump(id){
               if(!id){
                   return
               }
               this.$router.push({
                   path:"./projectStorage_xq",
                   query:{
                       id:id,

                   }
               })
           },
        },
    }
</script>

<style scoped>
 .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.2);
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 999;
    }
    #myChart{
        border-radius: 5px;
        color:transparent;
        width:800px ;
        height:400px ;
        position: relative;
        left: 50%;
        top:50%;transform: translate(-50%,-50%);
        background: #fff;
    }
    input,select{
        margin-left: 20px;
        width: 200px;
        height: 36px;
        padding-left: 10px;
    }
    input{
        height: 30px!important;
        font-size: 10px;
    }
    .content_right{
        width: 100%;
        padding: 24px 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background: #fff;
        margin-top: 200px;
    }

    .box_content div{
        margin-top: 20px;
    }
    .box_content span{
        display: inline-block;
        width: 150px;
        text-align: right;
        font-size: 16px;
        margin-right: 15px;
        line-height: 36px;
    }
    .box_content input{
        width: 200px;
        height: 36px;
        padding-left: 10px;
    }
    .cx,.educe,.reset{
        display: inline-block;
        height: 36px;
        line-height: 36px;
        width: 90px;
        cursor: pointer;
        border-radius: 5px;
        color: #f5f6fa;
        background: #3377ff;
        border: 0;
        text-align: center;
        margin:20px 0 20px 24px ;
    }
    .batch_upload{
        display: inline-block;
        height: 36px;
        line-height: 36px;
        width: 90px;
        cursor: pointer;
        border-radius: 5px;
        color: #f5f6fa;
        background: #3377ff ;
        border: 0;
        text-align: center;
        margin:20px 0 20px 24px ;
    }
    .blocks{
        margin-top: 30px;
        float: right;
    }
    .tit_text{
        display: inline-block;
        font-size: 14px;
        font-weight: 400;
        font-family: "Microsoft YaHei";
        margin-left: 20px;
    }
    .select_check{
        display: inline-block;
        margin-left: 20px;
        margin-bottom: 20px;
    }
    .educe,.reset{
        color: #3d3d3d!important;
        border: 1px solid #ddd!important;
        background: transparent!important;
    }
    .load{
        border-radius: 10px;
        width: 800px;
        min-height: 270px;
        max-height: 500px;
        position: relative;
        background: #fff;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
        overflow-y: auto;
    }
    .load_tit{border-bottom: 1px solid #ddd}
    .load_tit span{
        display: inline-block;
        height: 36px;
        line-height: 36px;
        margin:10px 0 10px 0;
        font-size: 18px;
        font-weight: bold;
    }
    .load_upload ,.load_tit{
        margin:15px 24px 0 24px
    }
    .right_btn{
        display: inline-block;
        float: right;
        margin-right: 20%;
        margin-top:-30px
    }
    .right_btn span{
        display: inline-block;
        border-radius: 8px;
        width: 80px!important;
        height: 36px;
        line-height: 36px;
        cursor: pointer;
        border: 1px solid #c3c3c3;
        color: #9c9c9c;
        margin-right: 30px;
        margin-left: 24px;
        text-align: center;
        
    }
    .table_load{
        padding: 24px;
    }
    .win{
        color: #55a532;
    }
    .loss{
        color: red;
    }
    .content_right .block{
        margin-bottom: 0!important;
    }
    .top_name{height: 112px}
    .top_txt,.title_left {
        margin-left: 24px;
    }
    .title_left span{
        margin-left: 10px;
        cursor: pointer;
    }
    .top_txt{
        cursor: pointer;
    }
    .btns{
        height: 50px;
        width: 100%;
        background: #fff;
        margin-top: 24px;
        text-align: right;
        line-height: 40px
    }
    .btns span{
        width: 90px;
        height: 36px;
        line-height: 36px;
        display: inline-block;
        border:1px solid #ddd;
        text-align: center;
        border-radius: 3px;
        margin-right: 24px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        margin-top: 5px;
        color:rgba(107,119,140,1);
        margin-left: 0 auto!important;
        cursor: pointer;
    }
    .tj{
        background:rgba(0,82,204,1)!important;
        color:rgba(255,255,255,1)!important;
        border:0!important;
        margin-right: 16px!important
    }
    .tsBox{
        width:416px;
        min-height:134px;
        background:rgba(255,255,255,1);
        box-shadow:0px 4px 12px 0px rgba(0,0,0,0.2);
        border-radius:4px;
        position: absolute;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%)
    }
    .tsBox_tit{
        margin: 30px 0 32px 0;
    }
    .tsBox_tit span{
        font-size:16px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(50,50,51,1);
        margin-left: 60px
    }
    .tsBox_btn{
        text-align: right;
    }
    .tsBox_btn span{
        text-align: center;
        border-radius: 3px;
        display: inline-block;
        width:60px;
        height:32px;
        border:1px solid rgba(165,173,186,1);
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(107,119,140,1);
        line-height:32px;
        margin-right: 16px;
        cursor: pointer;
    }
    .tsBox_btn_qd{
        background:rgba(0,82,204,1)!important;
        color: #fff!important;
        border: 0!important;
    }
    .tsBox_tit2{
        font-weight: bold
    }
    textarea{
        margin: 28px 0px 0 60px;
        min-width: 260px;
        padding:10px;
    }
</style>