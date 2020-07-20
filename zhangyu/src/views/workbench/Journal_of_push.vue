<template>
    <div>
        <div class="top_name">
            <span class="top_txt" @click='fh()'>杂志锁屏推送  /   推送内容管理</span>
            <div class="tit_name">
                <span>推送内容管理</span>
            </div>
            <div class="search_criteria">
                <div class="date">
                    <el-date-picker
                            v-model="date"
                            @change="getData()"
                            type="date"
                            format="yyyy年MM月dd日"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
                <div class="num" >
                    <span>数量:</span>
                    <span>{{this.total}}</span>
                    <span class="dated" v-if="new Date(this.date)<=new Date(new Date().getTime() - 24*60*60*1000)">(已过期)</span>
                   
                </div>
                <!-- <div  class="num" >
                    <span>渠道</span>
                    <select v-model="channel"  @change="getData()">
                        <option :value="item.channel" v-for="item in qdLists">{{item.channel}}</option>
                    </select>
                </div> -->
                <span class='qud'>{{this.$route.query.channel}}</span>
                <div class="action_btn">
                    <span class="manage" @click="jumps()" v-if="!(new Date(this.date)<new Date(new Date().getTime() - 24*60*60*1000))">管理</span>
                    <span class="select" @click="getWl()" v-if="!(new Date(this.date)<new Date(new Date().getTime() - 24*60*60*1000))" style="margin-right:20px">
                        <img src="../../../public/img/add.png" style="width: 16px;display: inline-block;position: relative;top:50%;transform: translateY(-90%);margin-right: 10px">
                        从物料库选择
                    </span>
                     <!-- <span class="select" @click='SetUser()' v-if="!(new Date(this.date)<new Date(new Date().getTime() - 24*60*60*1000))">
                       账号管理
                    </span> -->
                </div>
            </div>
        </div>
        <div class="box" v-if="dataList.length>0">
            <div class="box_img" v-for="(item,index) in this.dataList">
                <div class="left_img">
                    <img :src="item.mfinal.prev_uri"  preview="0" v-if="((item.mfinal.prev_uri).split('.'))[((item.mfinal.prev_uri).split('.')).length-1]!='mp4'"  />
                    <video :src="item.mfinal.prev_uri" v-if="((item.mfinal.prev_uri).split('.'))[((item.mfinal.prev_uri).split('.')).length-1]=='mp4'"></video>
                </div>
                <div class="right_txt">
                    <div>
                        <span class="right_txt_name">物料ID</span>
                        <span class="right_txt_content">{{item.mfid}}</span>
                    </div>
                    <div class="img_size">
                        <span class="right_txt_name">尺寸</span>
                        <span class="right_txt_content">{{item.mfinal.size}}</span>
                    </div>
                    <div>
                        <span class="right_txt_name">文件</span>
                        <span class="right_txt_content" v-if="(item.mfinal.attach.size/1024).toFixed(0)>=1&&(item.mfinal.attach.size/1024/1024).toFixed(0)<1">{{(item.mfinal.attach.size/1024).toFixed(0)}}kb</span>
                        <span class="right_txt_content" v-if="(item.mfinal.attach.size/1024/1024).toFixed(1)>=1&&(item.mfinal.attach.size/1024/1024/1024).toFixed(1)<1">{{(item.mfinal.attach.size/1024/1024).toFixed(1)}}MB</span>
                        <span class="right_txt_content" v-if="(item.mfinal.attach.size/1024/1024/1024).toFixed(2)>=1">{{(item.mfinal.attach.size/1024/1024/1024).toFixed(2)}}GB</span> 
                        <a :href="item.mfinal.attach.url">下载</a>
                    </div>
                    <div class="img_size">
                        <span class="right_txt_name">埋点状态</span>
                        <span class="right_txt_content">{{item.status_check==0?'暂未上线':"已上线"}}</span>
                    </div>
                    <div class="img_size">
                        <span class="right_txt_name">外部确认状态</span>
                        <span class="right_txt_content">{{item.status==0?"待审核":item.status==1?"审核通过":'审核不通过'}}</span>
                        <!-- <span class="right_txt_content  yy" @click='updateStatus(index)'>更新状态</span> -->
                    </div>
                     <div class="img_size">
                        <span class="right_txt_name">对接上线状态</span>
                        <span class="right_txt_content">{{item.status_online==0?'待确定':item.status_online==1?'已上线':'未上线'}}</span>
                    </div>
                     <div class="img_size" v-if="item.note">
                        <span class="right_txt_name">原因说明</span>
                        <!-- <span class="right_txt_content" style="max-width:120px;overflow: hidden;">{{item.note}}</span> -->
                        <div v-if="item.note!=undefined" style="display:inline-block;max-width:100px;overflow: hidden;height:15px">
                                <el-tooltip placement="top" class="tit_txt_2 logs tit_txts" >
                                    <div slot="content" class="text">{{item.note}}</div>
                                    <span  class="text" style="overflow: hidden;width: 100px;height: 24px;margin-left: 10px">{{item.note}}</span>
                                </el-tooltip>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="null_content" v-if="this.dataList.length==0">
            <img src="../../../public/img/null.png">
            <span class="prompt_message">无相关资源，若有疑问，请联系管理人员</span>
        </div>
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange1"
                    @current-change="handleCurrentChange1"
                    :current-page.sync="currentPage"
                    :page-size="pageSize"
                    layout="prev, pager, next,total, jumper"
                    :total="total">
            </el-pagination>
        </div>
        <ADDWL v-if="ADDwl" @listenToChildEvent="listenToChildEvent" :date="date" :channel='channel'></ADDWL>
        <div class="bg" v-if="tc">
            <div class='content'>
                <div class='con_tit'>
                    <span>更新状态</span>
                </div>
                <div class='sel'>
                    <select v-model="status">
                        <option value="1">已上线</option>
                        <option value="2">拒绝上线</option>
                    </select>
                    <div class='sel_1' v-if="status=='2'">
                        <el-checkbox-group v-model="checkList">
                            <el-checkbox label="测试不通过" class='aaa'></el-checkbox>
                            <el-checkbox label="内容差"  class='aaa'></el-checkbox>
                            <el-checkbox label="屏蔽竞品"  class='aaa'></el-checkbox>
                            <el-checkbox label="其他"  class='aaa bb'>
                                <template>
                                    <span style="margin-right:10px">其他</span>
                                    <textarea placeholder="最多20字" maxlength="20" v-model="yy"></textarea>
                                </template>
                            </el-checkbox>
                        </el-checkbox-group>
                        
                    </div>
                </div>
                <div class='sel_btn'>
                    <span class="sel_btn_qd" @click="pushLib()">确定</span>
                    <span @click='qx()'>取消</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ADDWL from './Jounrnal_select'
    export default {
        components:{ADDWL},
        name: "journal_of_push",
        data(){
            return{
                date:(new Date()).toLocaleDateString().split('/').join('-'),
                ADDwl:false,
                plid:'',
                dataList:[],
                total:0,
                pageSize:8,
                currentPage: 1,
                show:false,
                tc:false,
                status:"",
                checkList:[],
                qdLists:[],
                channel:this.$route.query.channel,
                yy:"",
                index:"",
            }
        },
        mounted(){
            this.getData();
             this. getChannel();
        },
       methods:{
            fh(){
                this.$router.go(-1)
            },
            jumps(){
                if(this.dataList.length==0){
                    return
                }
                this.$router.push({
                    path:"./journal_Administrator",
                    query:{
                        date:this.date,
                        id:this.dataList[0].plid
                    }
                })
            },
            SetUser(){
                  this.$router.push({
                    path:"./userControl",
                  
                })
            },
           handleSizeChange1(pageSize) { // 每页条数切换
               this.pageSize = pageSize;
               this.getData()
           },
           handleCurrentChange1(currentPage) {//页码切换
               this.currentPage = currentPage;
               this.getData()
           },
           updateStatus(index){
               this.tc=true;
               this.index=index;
           },
             getChannel(){
                this.api.pushlib_configs_channel().then((res)=>{
                    this.qdLists=res;
                })
            },
           qx(){
               this.tc=false;
               this.status='';
               this.checkList=[];
           },
           getWl(){
               if(!this.channel){
                    this.$message.error('渠道不能为空');
                    return
               }
                this.ADDwl = true;
           },
           heidWL(){
               this.ADDwl = false;
           },
           pushLib(){
             let formData= new FormData;
             formData.append('status',this.status),
             formData.append('plid',this.dataList[this.index].plid),
             formData.append('mfid',this.dataList[this.index].mfid),
             formData.append('note',this.checkList.join(',')+this.yy)   
                this.api.pushlib_external_audit(formData).then((res)=>{
                    if(res!=false){
                        this.qx();
                    }
                })
           },
           getData(){
               if(this.date==null){
                   return
               }
                let params = {p:this.pageSize,page:this.currentPage,tdate:this.date,channel:this.channel};
                this.api.pushlib_channel_binds({params}).then((res)=>{
                    this.dataList = res.data;
                    this.total=res.total;
                    this.$previewRefresh()
                   
                })
           },
           listenToChildEvent(id,date){
                let formData =new FormData;
                formData.append('channel',this.channel);
                formData.append('tdate',date);
                formData.append('bind_mfid',JSON.stringify(id));
                this.api.pushlib_add_mfinal(formData).then((res)=>{
                    this.heidWL();
                    this.getData()
                })
           },
        },
    }
</script>

<style scoped>
    a{
        display: inline-block;
        width:44px;
        height:20px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(51,119,255,1);
        line-height: 20px;
        text-align: center;
        cursor: pointer;
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,119,255,1);
        margin-left: 14px;
    }
    .top_txt{
        cursor: pointer;
    }
    .top_txt,.tit_name span{
        margin-left: 24px;

    }
    .top_name{
        height: 166px;
    }
    .tit_name span{
        display: inline-block;
        font-size:20px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(50,50,50,1);
    }
    .tit_name{
        margin-bottom: 24px;
    }
    .search_criteria {
        padding: 0 24px;
    }
    .search_criteria div{
        display: inline-block;
    }
    .date{
        margin-right: 12px;
    }
    .num{
        margin-right: 20px
    }
    .num span{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(50,50,50,1);
    }
    .num select{
        margin-left: 20px;
        width: 200px;
        height: 36px;
        border-radius: 5px;

    }
    .action_btn{
        float: right;
        margin-right: 250px;
    }
    .action_btn span{
        display: inline-block;
        height: 36px;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .manage{
        width:68px;
        background:rgba(51,119,255,1);
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        margin-right: 20px;
    }
    .select{
        width:144px;
        background:rgba(242,246,252,1);
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(61,73,102,1);
    }
    .box{
        margin-top: 244px;
    }
    .box_img{
        display: inline-block;
        width:380px;
        height:189px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        margin:0px 20px 24px 0;
        position: relative;
    }
    /*.box_img:nth-child(4n){*/
        /*margin-right: 0!important;*/
    /*}*/
    .left_img{
        display: inline-block;
        width:116px;
        height:149px;
        background:rgba(227,231,235,1);
        border-radius:2px;
        margin-left: 15px;
        position: absolute;
        top:50%;
        transform: translateY(-50%);
    }
    .left_img img ,.left_img video{
        max-width: 99px;
        max-height: 149px;
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .right_txt{
        display: inline-block;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        margin-left: 150px;
    }
    .right_txt div{
        height: 25px;
    }
    .right_txt_name{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(143,155,179,1);
    }
    .right_txt_content{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-left: 10px;
    }
    .null_content{
        text-align: center;
        position: relative;
        margin-top: 400px;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .prompt_message{
        display: block;
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(143,155,179,1);
        text-align: center;
    }
    .dated{
        display: inline-block;
        margin-left: 10px;
        color: red!important;
    }
    .yy{
        color: #3377ff!important;
        cursor: pointer;
    }

    .bg{
        position: fixed;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
    }
    .content{
        width: 400px;
        max-height:400px;
        position: absolute;
        top:30%;
        left: 50%;
        transform: translate(-50%,-50%);
        border-radius: 10px;
    }
    .con_tit{
        width: 100%;
        height: 40px;
        border-bottom: 1px solid #ddd;
    }
    .con_tit span{
        display: inline;
        margin-left: 24px;
        display: inline-block;
        line-height: 40px;
        font-size: 18px;
        font-weight: 500;
    }
    .sel{
        margin: 20px 0;
    }
    .sel select{
        width: 200px;
        height: 36px;
        margin-left: 24px;
        border-radius: 5px;
    }
    .sel_1{
        margin: 30px 0 0px 24px;
    }
    .aaa{
          display: block!important;
      margin: 0 0 15px 0 !important
    }
     .bb span{
        vertical-align: top;
    }
   .bb textarea{
       padding: 5px
   }
   .sel_btn{
       width: 100%;
       height: 50px;
       text-align: right;
   }
   .sel_btn span{
    margin-right: 24px;
    display: inline-block;
    width: 68px;
    height: 36px;
    background: rgba(255,255,255,1);
    border-radius: 4px;
    border: 1px solid rgba(211,219,235,1);
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(61,73,102,1);
    line-height: 36px;
    cursor: pointer;
    text-align: center;
    margin-top: 7px
   }
   .sel_btn_qd{
       border: 0!important;
    background: rgba(51,119,255,1)!important;
    color: rgba(255,255,255,1)!important;
   }
   .qud{
       display: inline-block;
       padding: 5px;
       border:1px solid  rgba(51,119,255,1);
       text-align: center;
       color: rgba(51,119,255,1);
       border-radius: 5px;
   }
</style>