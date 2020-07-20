<template>
   <div>
        <div class="top_name">
             <span class="top_txt" @click='fh(-1)'>主题收款&nbsp;/&nbsp;分成管理</span>
            <div class="title_left">
                <span>分成管理</span>
            </div>
        </div>
        <div class='content'>
            <div>
                 <div class='times'>
                    <el-date-picker
                    class='time_length'
                        v-model="tdate"
                        type="month"
                        value-format="yyyy-MM"
                        range-separator="至"
                       >
                    </el-date-picker>
                </div>
                <span class='fc_statuc'>操作人员</span>
                <input type="text" v-model="updator">
                <div class="btn_right">
                    <span class='cx' @click='getDataList()'>查询</span>
                    <span @click='drText()'>导入</span>
                </div>      
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
                                label="变更时间" prop="date"
                               >
                        </el-table-column>
                        <el-table-column
                                label="导入文件" prop="name"
                                >
                        </el-table-column>
                        <el-table-column
                                sortable
                                label="处理人" prop="creator"
                                >
                        </el-table-column>
                        <el-table-column label="操作" width="150">
                            <template slot-scope="props">
                                <a :href="tableData[props.$index].url">下载</a>
                            </template>
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
                  <div  class='set'>
                      <!-- <span>文件类型：</span>
                      <select>
                          <option value="">请选择</option>
                          <option value="">月度结算数据</option>
                          <option value="">其他地区收益数据</option>
                      </select> -->
                      <span class='fj'>结算周期</span>
                       <el-date-picker
                    class='time_length'
                        v-model="time"
                        type="month"
                        value-format="yyyy-MM"
                       >
                    </el-date-picker>
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
                         <a href="text/主题收益数据导入模板.xlsx" v-if='this.$route.query.type=="1"'>下载模板</a> 
                        <a href="text/来电秀收益数据导入模板.xlsx" v-if='this.$route.query.type=="2"'>下载模板</a>
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
        <div class='bg' v-if='list'>
            <div class='table'>
                <div style="border-bottom:1px solid #ddd;margin-bottom:30px">
                    <span class='tit_name'>数据确认</span>
                    <span>表格共{{allTotal}}条数据，本次新增{{Create}}条数据，覆盖修改{{update_num}}条数据</span>
                </div>
                <div>
                
                    <span class='fc_statuc' style="margin-left:24px">渠道</span>
                      <select v-model='channel'>
                        <option value="">全部</option>
                        <option :value="item.channel" v-for="item in channels">{{item.channel_name}}</option>
                     </select>
                    <span class='fc_statuc' style="margin:24px">主题名</span>
                    <input type="text" placeholder="请输入" v-model='theme_name'>
                    <span class='fc_statuc' style="margin-left:24px">状态</span>
                    <select name="" id="" v-model="statu_msg">
                        <option value="1">新增</option>
                        <option value="2">无变化</option>
                        <option value="3">可覆盖</option>
                        <option value="4">与锁定数据有冲突</option>
                        <option value="5">数据异常</option>

                    </select>
                     <div class="btn_right">
                            <span class='cx' @click='getData()'>查询</span>
                            <span @click='reset()'>重置</span>
                    </div> 
                </div>
                <div>
                        <template>
                            <el-table
                                    :data="ListData"
                                    header-align="center"
                                    :header-cell-style="getRowClass"
                                    :cell-style="cell"
                                    style="width: 100%;color:#000">
                                <el-table-column
                                        label="结算周期" prop="tdate"
                                    >
                                </el-table-column>
                                <el-table-column label="渠道"
                                prop="channel"
                                >
                               
                                </el-table-column>
                                 <el-table-column
                                       v-if='this.$route.query.type==1'
                                        label="主题名称" prop="theme_name"
                                        :show-overflow-tooltip="true"
                                        >
                                </el-table-column>
                                <el-table-column
                                       v-if='this.$route.query.type==2'
                                        label="主题名称" prop="call_show_name"
                                        :show-overflow-tooltip="true"
                                        >
                                </el-table-column>
                                 <el-table-column
                                        sortable
                                        label="收益" prop="income"
                                        >
                                </el-table-column>
                                <el-table-column
                                        label="状态" prop="status_msg"
                                        >
                                         <template slot-scope="props">
                                            <span :class="{red:ListData[props.$index].status=='4'||ListData[props.$index].status=='5'}">{{ListData[props.$index].status_msg}}</span>
                                        </template>
                                </el-table-column>
                                 <el-table-column
                                        label="操作" 
                                        >
                                        <template slot-scope="scope">
                                                <el-button type="text" @click='change(ListData[scope.$index])'>编辑</el-button>
                                        </template>
                                </el-table-column>
                            </el-table>
                        </template>
                          <div class="btn_right" style="float:left;">
                                <span class='cx' @click='up()'>确定</span>
                                <span @click='qx()'>取消</span>
                            </div>   
                </div>
            </div>
        </div>
        <div class='bg' v-if='changed'>
            <div class='xg'>
                 <div class='ts'>
                    <span>编辑</span>
                </div>
                <div class='xg_tit'>
                    <span>结算周期</span>
                    <el-date-picker
                        class='time_length'
                        v-model="time_change"
                        type="month"
                        value-format="yyyy-MM"
                       >
                    </el-date-picker>
                </div>
                <div  class='xg_tit'>
                    <span>渠道</span>
                    <select v-model="channel_change">
                        <option value="">全部</option>
                        <option :value="item.channel" v-for="item in channels">{{item.channel_name}}</option>
                    </select>
                </div>
                <div  class='xg_tit'>
                    <span>主题名称</span>
                    <input type="text" v-model="theme_name_change">
                </div>
                <div  class='xg_tit'>
                    <span>收益金额</span>
                    <input type="number" v-model="cash">
                </div>
                 <div class="btn_right" style="float:left;">
                                <span class='cx' @click='edit()'>确定</span>
                                <span @click='HeidGb()'>取消</span>
                </div>   
            </div>
        </div>
        <div class='bg' v-if='tj'>
            <div class='con'>
                <div class='ts'>
                    <span>提示</span>
                </div>
                <div>
                    <span style="margin:0 24px" v-if='ct'>存在与结算数据冲突的数据，提交后存在冲突的数据不会更新</span>
                    <span style="margin:0 24px" v-if='ct==false'>提交后，将根据该数据更新对应的收益数据，是否确认？</span>
                </div>
                 <div class="btn_right" style="float:left;">
                                <span class='cx' @click='ADD()'>确定</span>
                                <span @click='gb()'>取消</span>
                </div>   
            </div>
        </div>
   </div>
</template>

<script>
export default {
            data(){
                return{
                    tdate:"",
                    p:10,
                    page:1,
                    total:0,
                    updator:"",
                    tableData:[{time:2020}],
                    is_confirmed:"",
                    exe:false,
                    list:false,
                    tj:false,
                    file:{},
                    time:"",
                    file_id:"",
                    channel:'',
                    channels:[],
                    theme_name:"",
                    statu_msg:"",
                    ListData:[],
                    allTotal:"",
                    Create:"",
                    update_num:"",
                    changed:false,
                    time_change:"",
                    theme_name_change:"",
                    channel_change:"",
                    cash:"",
                    id:''
                }
            },
            mounted(){
                this.getDataList()
            },
            methods:{
                fh(index){
                    this.$router.go(index)
                },
               reset(){
                   this.channel=''
                   this.theme_name=''
                   this.statu_msg=''
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
                getDataList(){
                    let params={type:this.$route.query.type,tdate:this.tdate,updator:this.updator,p:this.p,page:this.page}
                    this.api.sharing_data_file_list({params}).then((res)=>{
                        this.total=res.total;
                        this.tableData=res.data;
                    })
                },
                 handlePictureCardPreview(file) {
                        this.dialogImageUrl = file.url;
                        this.dialogVisible = true;
                },
                       
                handlePreview(file) {
                        console.log(file);
                },
               drText(){
                    this.exe=true
                },
                heid(){
                    this.exe=false;
                    this.file={};
                    this.time=''
                },
                del(){
                   this.file={}
               },
                 uploadFile(file){
                    this.file=file.file;
                },
                 drData(){
                    if(!this.file.name){
                        this.$message.error('附件不能为空')
                        return
                    }
                     if(!this.time){
                        this.$message.error('结算周期不能为空')
                        return
                    }
                    let formData=new FormData;
                    formData.append('file',this.file);
                    formData.append('type',this.$route.query.type);
                    formData.append('tdate',this.time)
                    this.api.sharing_data_import(formData).then((res)=>{
                        if(res!=false){
                            this.file_id=res;
                            this.time=''
                            this. heid();
                            this.list=true;
                            this.getData()
                        }
                    })
                   
                },
                 getData(){
                    let params={file_id:this.file_id,channel:this.channel,theme_name:this.theme_name,statu_msg:this.statu_msg}
                    this.api.sharing_data_list({params}).then((res)=>{
                        this.ListData=res.data.data;
                        this.allTotal=res.total;
                        this.Create=res.data.count.add_num;
                        this.update_num=res.data.count.update_num
                        this.qd();
                    })
                },
                qd(){
                    this.api.themes_config_channel().then((res)=>{
                        this.channels=res;
                    })
                },
                 qx(){
                    this.list=false;
                     this. heid();
                },
                 gb(){
                    this.tj=false;

                },
                change(data){
                    this.changed=true;
                    this.time_change=data.tdate
                    this.theme_name_change=data.theme_name
                    this.channel_change=data.channel
                    this.cash=data.income
                    this.id=data.id
                },
                HeidGb(){
                    this.changed=false
                },
                edit(){

                    if(!this.time_change){
                        this.$message.error('结算周期不能为空')
                        return
                    }
                    if(!this.channel_change){
                        this.$message.error('渠道不能为空')
                        return
                    }
                    if(!this.cash){
                        this.$message.error('收益金额不能为空');
                        return
                    }
                    if(this.cash<0){
                        this.$message.error('收益金额不能小于零');
                        return
                    }
                    if(this.$route.query.type==1){
                        if(!this.theme_name_change){
                            this.$message.error('主题名称不能为空');
                            return
                        }
                        var formData = new FormData;
                    formData.append('id',this.id);
                    formData.append('type',this.$route.query.type);
                    formData.append('theme_name',this.theme_name_change);
                    formData.append('tdate',this.time_change);
                    formData.append('channel',this.channel_change);
                    formData.append('income',this.cash)
                    }
                    if(this.$route.query.type==2){
                        if(!this.theme_name_change){
                            this.$message.error('来电秀名称不能为空');
                            return
                        }
                       formData = new FormData;
                    formData.append('id',this.id);
                    formData.append('type',this.$route.query.type);
                    formData.append('call_show_name',this.theme_name_change);
                    formData.append('tdate',this.time_change);
                    formData.append('channel',this.channel_change);
                    formData.append('income',this.cash)
                    }
                    this.api.sharing_data_import_edit(formData).then((res)=>{
                        if(res!=false){
                            this.HeidGb();
                            this.getData()
                        }
                    })
                },
                 ADD(){
                    let formData=new FormData;
                    formData.append('file_id',this.file_id);
                    formData.append('type',this.$route.query.type)
                    this.api.sharing_data_confirm(formData).then((res)=>{
                        if(res!=false){
                            this.gb();
                            this.qx()
                        }
                    })
                },
                up(){
                    this.tj=true;
                    for(var i =0; i<this.ListData.length;i++){
                        if(this.ListData[i].status=='4'||this.ListData[i].status=='5')
                        this.ct=true;
                    }
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
        margin-left: 24px;
         
            
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
    .set{
        margin-bottom: 24px ;
    }
    .set select{
        width: 200px;
        height: 36px;
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
    .table{
        width:85%;
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
        height: 90%;
        overflow-y: auto;
        background: #fff;
    }
    .tit_name{
        display: inline-block;
        line-height: 40px;
        margin: 0 24px;
        font-size: 14px;
        font-weight: bold;
    }
    .con{
        position: absolute;
        top:50%;
        left:50%;
        width:500px;
        height: 200px;
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
    .xg{
        width: 500px;
        height: 380px;
        border-radius: 5px;
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
        background: #fff;
    }
    .ts span{
        font-size: 14px;
        font-weight: bold;
        margin-left: 24px;
        display: inline-block;
        line-height: 50px;

    }
    .del{
        width: 16px;
        cursor: pointer;
        vertical-align: bottom;
        margin-left: 10px;
    }
    .red{
        color:red!important
    }
    .xg_tit>span{
        display: inline-block;
        width: 90px;
        text-align: right;
        margin-bottom: 24px;
        margin-right: 15px;
    }
    .xg_tit>input{
        width: 190px;
        padding-left: 10px;
        height: 32px;
    }
    .xg_tit>select{
        width: 200px;
        height: 36px;
    }
</style>