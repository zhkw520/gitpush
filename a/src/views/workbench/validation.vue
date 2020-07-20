<template>
    <div class="bg">
        <DS v-if="msg" :name="name" :type="type"></DS>
        <pro v-if='budget' :name='name' :tstart='time[0]' :tend='time[1]' :id='id' :is_receiver='this.is_receiver' :a='a' :fj='fj' :projects='bind_projects_name' :channels='bind_channel_name'></pro>
        <div class="tableBox">
            <div style="text-align: center;margin-bottom: 40px;max-width: 893px;border-bottom: 1px solid #ddd;position: relative;left: 50%;transform: translateX(-50%)">
                <div style="margin-right: 350px;text-align: center;display: inline-block;border-bottom: 1px solid #3377ff" v-if="userNames">
                    <div class="box boxs">1</div>
                    <span class="boxName">对账确认</span>
                </div>
                <div style="margin: 0 auto;text-align: center;display: inline-block;border-bottom: 1px solid #3377ff" v-if="isShow">
                    <span class="boxName">对账确认</span>
                </div>
                <div style="margin-right: 350px;text-align: center;display: inline-block" v-if="userNames">
                    <div class="box">2</div>
                    <span class="boxName">票据凭证</span>
                </div>
                <div style="text-align: center;display: inline-block" v-if="userNames">
                    <div class="box">3</div>
                    <span class="boxName">结算汇款</span>
                </div>

            </div>
            <div style="text-align: center" class="fill">
                <div>
                    <span class="fillName">结算单名称</span>
                    <div style="display: inline-block;width: 593px;text-align: left">
                        <input type="text" class="input" v-model="statement" disabled>
                    </div>

                </div>
                <div v-if="userNames&&heid">
                    <span class="fillName">结算方</span>
                    <div style="display: inline-block;width: 593px;text-align: left">
                        <select v-model="name" disabled>
                            <option v-for="item in list" :value="item.name">{{item.name}}</option>
                        </select>
                        <span class="click" @click="massgae()">查看结算方信息</span>
                    </div>
                </div>
                <div v-if="is_receiver==1">
                    <span class="fillName">项目</span>
                    <div style="display: inline-block;width: 593px;text-align: left">
                        <!-- <el-select v-model="projects" multiple placeholder="请选择" class="elSelect" >
                                <el-option
                                        disabled="disabled"
                                        v-for="(item,index) in JSlist"
                                        :key="item.project_id"
                                        :label="item.project_name"
                                        :value="item.project_id">
                                </el-option>
                            </el-select> -->
                            <input type="text" class="input" v-model="bind_projects_name" disabled>
                    </div>
                </div>
                 <div v-if="is_receiver==0">
                    <span class="fillName">渠道</span>
                    <div style="display: inline-block;width: 593px;text-align: left">
                       <!-- <el-select v-model="channels" multiple placeholder="请选择" class="elSelect" >
                                <el-option
                                        disabled="disabled"
                                        v-for="(item,index) in channelData"
                                        :key="item.channel"
                                        :label="item.channel"
                                        :value="item.channel">
                                </el-option>
                            </el-select> -->
                            <input type="text" class="input" v-model="bind_channel_name" disabled>
                    </div>
                </div>
                <div>
                    <span class="fillName">结算时间段</span>
                    <div style="display: inline-block;width: 593px;text-align: left">
                        <div class="fillTime">
                            <el-date-picker
                                    v-model="time"
                                    disabled="disabled"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd"
                            >
                            </el-date-picker>
                        </div>
                         <!-- <el-tooltip placement="top" class="tit_txt_2 logs tit_txts">
                                    <div slot="content" class="text">{{step>1?"aaa":'bb'}}</div>
                                    <img src='../../../public/img/TBC.png' v-if="step==1" style="margin-left: 6px;cursor: pointer;width:16px"/>
                                    <img src='../../../public/img/confirmed.png' v-if="step>1" style="margin-left: 6px;cursor: pointer;width:16px"/>
                        </el-tooltip> -->
                    </div>
                </div>
                <div  v-if='this.status>=2'>
                    <span class="fillName">预计结算金额</span>
                    <div style="display: inline-block;width: 593px;text-align: left" >
                        <input type="text" class="input" v-model="expect_amount" disabled>
                        <span class="click"  @click='detail()'>查看预计结算数据</span>
                    </div>
                </div>
                <div  v-if='this.status>2 &&  userNames'>
                    <span class="fillName">实际结算金额</span>
                    <div style="display: inline-block;width: 593px;text-align: left">
                        <input type="number" class="input" v-model="real_amount">
                    </div>
                </div>
                <div v-if='this.status>2 &&  userNames'>
                    <span class="fillName">备注说明</span>
                    <div style="display: inline-block;width: 593px;text-align: left">
                        <textarea v-model="note"></textarea>
                    </div>
                </div>
                <div v-if='this.status>2 &&  userNames'>
                    <div style="display: inline-block;width: 84px;margin-right: 20px">
                        <el-tooltip placement="top" class="tit_txt_2 logs tit_txts">
                            <div slot="content">请上传对账确认邮件截图，结算数据明细等凭证</div>
                            <img src="../../../public/img/wh.png" style="margin-right: 6px;cursor: pointer">
                        </el-tooltip>
                        <span class="fj">附件</span>
                    </div>
                    <div style="display: inline-block;width: 593px;text-align: left">
                        <div class="uplaod">
                            <el-upload
                                    class="upload-demo"
                                    :on-remove="handleRemove"
                                    :http-request="uploadFile"
                                    action="111"
                                    multiple
                            >
                                <el-button size="small" type="primary">上传文件</el-button>
                            </el-upload>
                            <el-progress :percentage="this.times" v-if="up"></el-progress>
                        </div>
                        <div style="margin: 14px 0 14px 0px" v-for="(item,index) in attachs">

                                <el-tooltip placement="top" class="tit_txt_2 logs tit_txts">
                                    <div slot="content" class="text">{{item.name}}</div>
                                    <span  class="text" style="overflow: hidden;width: 200px;height: 20px;line-height: 28px">{{item.name}}</span>
                                </el-tooltip>
                            <!--<div style="display: inline-block;max-width: 200px;height: 20px;overflow:hidden;font-size:14px;font-family:PingFangSC-Regular,PingFangSC;font-weight:400;color:rgba(31,46,77,1);text-align: left">{{item.name}}</div>-->
                            <!--<span class="content_ck">查看</span>-->
                            <a class="content_xz" :href="item.url">下载</a>
                            <span class="content_xz" @click="dels(index)">删除</span>
                        </div>
                    </div>

                </div>
                <div class="fillBtn">
                    <span class="tj" @click="setData()">确认提交</span>
                    <span @click="fh()" style="margin-right: 330px">取消</span>
                </div>
            </div>
        </div>
        <div class='bg' v-if="upList">
            <div class='upBox'>
                <div class="uplaod" style="width:50%;padding-left:24px">
                            <el-upload
                                    class="upDemo"
                                    :on-remove="handleRemove"
                                    :http-request="uploadf"
                                    action="111"
                                    multiple
                            >
                                <el-button size="small" type="primary">上传文件</el-button>
                            </el-upload>
                            <el-progress :percentage="this.times" v-if="up"></el-progress>
                </div>
                <div style="margin: 14px 0 14px 24px" v-for="(item,index) in attach">
                    <el-tooltip placement="top" class="tit_txt_2 logs tit_txts">
                    <div slot="content" class="text">{{item.name}}</div>
                        <span  class="text" style="overflow: hidden;width: 200px;height: 20px;line-height: 28px">{{item.name}}</span>
                        </el-tooltip>
                        <a class="content_xz" :href="item.url">下载</a>
                        <span class="content_xz" @click="del(index)">删除</span>
                </div> 
                 <div class="fillBtn" style="">
                    <span class="tj" @click="tjData()" style="margin:14px 24px 0 24px;">确认</span>
                    <span @click="fhs()" >取消</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DS from '../income/payment/DetailsSettlement'
import pro from '../income/projection'
    export default {
        components:{DS,pro},
        name: "establish",
        props:['skID','skType','status'],
        data(){
            return{
                msg:false,
                time:[],
                name:"",
                statement:"",
                is_receiver:"",
                expect_amount:"",
                real_amount:"",
                note:"",
                attachs:[],
                attach:[],
                list:[],
                times:"",
                fcounter:0,
                up:false,
                upList:false,
                type:'',
                budget:false,
                a:0,
                id:'',
                fj:{},
                purview:[],
                userNames:true,
                isShow: false,
                JSlist:[],
                projects:[],
                channelData:[],
                channels:[],
                bind_projects_name:"",
                bind_channel_name:"",
                functionality:[],
                heid:true
            }
        },
        mounted(){
            this.purview=JSON.parse(localStorage.getItem('letNav'));
            for(var i=0;i<(this.purview).length;i++){
                if(this.purview[i].title=='收益中心'){
                    var alt1 = this.purview[i].children;
                    if(alt1){
                         for(var k=0;k<alt1.length;k++){
                            if(alt1[k].title=='结算管理'){
                                var alt2=alt1[k].children; 
                                for(var t=0;t<alt2.length;t++){
                                    if(alt2[t].url=='/income/Payment_operation/Administration'){      
                                        this.userNames=false;
                                        this.isShow = true;
                                    }
                                }
                            }
                        }
                    }
                   
                }
            }
            this.functionality=JSON.parse(localStorage.getItem('control'));
            for(var j=0;j<this.functionality.length;j++){
                if(this.functionality[j].uri_key=='uri.settlement.opt.audit.add'){
                    this.heid=false
                }
            }
            this.id=this.skID;
            if(this.skType=='收款结算'){
                    this.is_receiver=1
                }else{
                    this.is_receiver=0
                }
            this.type=this.skType
            this.getData();
            this.getList();
        },
        methods:{
            jump(){
                this.$router.push({
                    path:"./Administration"
                })
            },

            fh(){
                this.$parent.heidVal();
            },
            detail(){
                this.budget=true;
            },
             heidDetail(){
                this.budget=false;
            },
            handleRemove(file, fileList) {
                this.file = '';
                this.initiate2 = false
            },
            scope(){
                var _this=this;
                _this.times=0;
                var timer = setInterval(function () {
                    if(_this.times<99){
                        _this.times++
                    }
                },100);
            },
            uploadFile(file){
                this.up=true;
                this.times=0;
                ++this.fcounter;
                this.scope();
                let formData = new FormData;
                formData.append('file',file.file);
                this.api.file_private_upload(formData).then((res)=>{
                    this.attachs.push(res);
                    this.times=100;
                    --this.fcounter;
                    this.up=false;
                })
            },
            dels(index){
                this.attachs.splice(index,1)
            },
            del(index){
                this.attach.splice(index,1)
            },
            uploadf(file){
                this.up=true;
                this.times=0;
                ++this.fcounter;
                this.scope();
                let formData = new FormData;
                formData.append('file',file.file);
                this.api.file_private_upload(formData).then((res)=>{
                    this.attach.push(res);
                    this.times=100;
                    --this.fcounter;
                    this.up=false;
                })
            },
           getsettle(){
               if(this.is_receiver==1){
                   var params={is_receiver:this.is_receiver,name:this.name,tstart:this.time[0],tend:this.time[1],projects:this.bind_projects_name};
               }
               if(this.is_receiver==0){
                    params={is_receiver:this.is_receiver,name:this.name,tstart:this.time[0],tend:this.time[1],channels:this.bind_channel_name};
               }
               this.api.settle_data_estimate_amount({params}).then((res)=>{
                   if(res.amount==0){
                        this.expect_amount='--'
                   }else{
                        this.expect_amount=res.amount;
                   }
               })
           },
            massgae(){this.msg=true},
            heidMassage(){
                this.msg=false
            },
            getData(){
             
                let params={is_receiver:this.is_receiver};
                this.api.settle_settlement({params}).then((res)=>{
                    this.list=res;
                })
            },
            getList(){
                let params={is_receiver:this.is_receiver,id:this.skID};
                this.api.settlemanage_detail({params}).then((res)=>{
                    this.statement=res.check.check1.statement;
                    this.name=res.check.check1.name;
                    this.fj=res.check.check2;
                    if(this.is_receiver==1){
                        this.bind_projects_name=res.check.check1.bind_projects_name
                        this.projects=[];
                        for(var i=0;i<res.check.check1.projects.length;i++){
                            this.projects.push((res.check.check1.projects)[i].project_id)
                        }
                    }
                    if(this.is_receiver==0){
                         this.bind_channel_name=res.check.check1.bind_channel_name
                    }
                    this.time=[res.check.check1.tstart,res.check.check1.tend];
                    this.getsettle();
                    
                    // if(this.status>1){
                    //      this.expect_amount=res.check.check2.expect_amount;
                    // }
                    
                })
            },
            setData(){
                if(this.status==2&&this.is_receiver==1){
                    this.upList=true;
                    return;
                }
                if(this.status==2&&this.is_receiver==0){
                    this.tjData();
                    return
                }
               if(this.fcounter != 0)
                {
                    this.$message.error('文件上传中');
                    return
                }
                
                if(this.status>2){
                     if(!this.real_amount){
                        this.$message.error('实际结算金额不能为空');
                        return
                    }
                    if(this.real_amount<0&&isNaN(this.real_amount)){
                        this.$message.error('实际结算金额为大于零的数字');
                        return
                    }
                    if(this.real_amount>999999999.99){
                        this.$message.error('实际结算金额大于999999999.99');
                        return
                    }
                    if(!this.note){
                        this.$message.error('备注不能为空');
                        return
                    }

                    if(this.attachs.length==0){
                        this.$message.error('附件不能为空');
                        return
                    }
                }
               
                let formData = new FormData;
                formData.append('id',this.skID);
                formData.append('expect_amount',this.expect_amount);
                formData.append('real_amount',this.real_amount);
                formData.append('note',this.note);
                formData.append('status',this.status);
                formData.append('attachs',JSON.stringify(this.attachs));
               
                this.api.demand_settle_audit(formData).then((res)=>{
                    if(res!=false){
                        this.upList=false;
                        this.fh();
                    }
                })
            },
            fhs(){
                this.upList=false;
                this.attach=[];
            },
            tjData(){
                if(this.fcounter != 0)
                {
                    this.$message.error('文件上传中');
                    return;
                }
                
                if(this.status < 2 )
                {
                    this.$message.error('审核状态异常');
                    return;
                }
                if(this.expect_amount<=0&&this.expect_amount!= '--'){
                    this.$message.error('预计结算金额不能为空');
                    return;
                }
                if(this.expect_amount>999999999.99){
                    this.$message.error('预计结算金额不能大于999999999.99');
                    return;
                }

                if(this.attach.length <= 0&&this.is_receiver==1){
                    this.$message.error('附件不能为空');
                    return;
                }
                if(this.is_receiver==1){
                     var formData = new FormData;
                    formData.append('id',this.skID);
                    formData.append('expect_amount',this.expect_amount);
                    formData.append('attachs',JSON.stringify(this.attach))
                    formData.append('status',this.status);
                }else{
                      formData = new FormData;
                    formData.append('id',this.skID);
                    formData.append('expect_amount',this.expect_amount);
                    formData.append('status',this.status);
                }
                this.api.demand_settle_audit(formData).then((res)=>{
                    if(res!=false){
                        this.upList=false;
                        this.fh();
                    }
                })
            },
            
        }
    }
</script>

<style scoped>
  .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        z-index: 999;
        bottom: 0;
        right: 0;
    }
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
        position: absolute;
        left: 50%;
        top: 40%;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        border-radius: 4px;
        text-align: center;
        background: rgba(0,0,0,0);
        background: #fff;
        padding-top:48px ;
        min-height: 600px;
        width: 1020px;
    }
    .upBox{
        position: absolute;
        left: 50%;
        top: 40%;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        border-radius: 4px;
        background: rgba(0,0,0,0);
        background: #fff;
        padding-top:24px ;
        min-height: 300px;
        width: 400px;
    }
    .box{
        width:32px;
        height:32px;
        border-radius: 50%;
        border:1px solid rgba(143,155,179,1);
        text-align: center;
        line-height: 32px;
        font-size:16px;
        font-family:HelveticaNeue;
        color:#8F9BB3;
        margin: 0 0 10px 15px;
    }
    .boxs{
        background:rgba(0,122,255,1)!important;
        color:rgba(255,255,255,1)!important;
        border: none!important;
        cursor: pointer;
    }

    .boxName{
        display: inline-block;
        font-size:16px;
        font-family:PingFangSC-Medium,PingFangSC;
        font-weight:500;
        margin-bottom: 5px;
        color:rgba(31,46,77,1);
        cursor: pointer;
    }
    .fill>div{
        margin-bottom: 20px;
    }
    .fillName{
        display: inline-block;
        width:100px;
        height:20px;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 21px;
        text-align: right!important;
    }
    input{
        width:457px;
        height:36px;
        padding-left: 10px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .fillTime{display: inline-block;
        width:467px
    }
    .fillTime .filtrate .timesDate .content_table .time .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width: 100%;
    }
    textarea{
        width:468px;
        height:88px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .uplaod{
        width:474px;
        display: inline-block;
        text-align: left!important;
    }
    .fj{display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
    }

    .fillBtn span{
        display: inline-block;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        width:68px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
    }
    .tj{
        color: #fff!important;
        background: #3377ff!important;
        border: none!important;
        margin-right: 20px;
        margin-bottom: 50px;
    }
     .content_ck, .content_xz{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(51,119,255,1);
        margin-left: 10px;
        cursor: pointer;
    }
     select,.el-select{
        width:467px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .click{
        display: inline-block;
        margin-left: 12px;
        font-size:14px;
        cursor: pointer;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(51,119,255,1);
    }
</style>