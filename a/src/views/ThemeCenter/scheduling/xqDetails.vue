<template>
    <div>
        <thmSelect v-if="thm" @listData="listData" :num='num'></thmSelect>
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="fhs">排期管理&nbsp;/&nbsp;</span>
                <span class="log_url" @click="fh">排期详情&nbsp;/&nbsp;</span>
                <span class="new_url" v-if="this.$route.query.record==undefined">需求详情</span>
                <span class="new_url" v-if="this.$route.query.record!=undefined">变更记录</span>
            </div>
            <div>
                <span class="topName" v-if="this.$route.query.record==undefined">需求详情</span>
                <span class="topName" v-if="this.$route.query.record!=undefined">变更记录</span>
            </div>
        </div>
        <div class="seach">
           <div class="box1">
               <div class="box1_name">
                   <span>待制作</span>
               </div>
               <div class="box1_img">
                   <span class="box1_qd">{{this.channelName=='local'?'本地':channelName==''?'本地':this.channelName}}</span>
                   <img :src="this.url">
                   <div class="box1_BTN">
                       <span @click="zt('1')" v-if="this.$route.query.record==undefined">重新选择</span>
                       <span @click="CK(thid,ch_thid,channel)">查看详情</span>
                   </div>
               </div>
               <div class="name">
                   <span>{{this.imgname}}</span>
               </div>

               <div class="box1_name">
                   <span>完成品</span>
               </div>
               <div class="box1_img">
                   <span class="box1_qd">{{this.qDname}}</span>
                   <img :src="this.qDurl">
                   <div class="box1_BTN">
                       <span @click="zt('2')" v-if="this.$route.query.record==undefined">重新上传</span>
                       <span @click="CK(f_thid,f_ch_thid,qds)">查看详情</span>
                   </div>
               </div>
               <div class="name">
                   <span>{{this.mz}}</span>
               </div>
           </div>
            <div class="box2">
                <div>
                    <span class="box2_name">名称</span>
                    <input type="text" class="input1" v-model="name" :disabled="this.$route.query.record!=undefined">
                </div>
                <div>
                    <span class="box2_name">类型</span>
                    <select v-model="type" :disabled="this.$route.query.record!=undefined">
                        <option value="">请选择</option>
                        <option value="全局" >全局</option>
                        <option value="桌面" >桌面</option>
                        <option value="翻新" >翻新</option>
                        <option value="锁屏" >锁屏</option>
                        <option value="问题修改" >问题修改</option>
                        <option value="精品全局" >精品全局</option>
                    </select>
                </div>
                <div>
                    <span class="box2_name">待制作渠道</span>
                    <select  v-model="channel" :disabled="this.$route.query.record!=undefined">
                        <option value="">全部</option>
                        <option :value="item.channel" v-for="item in channels">{{item.channel_name}}</option>
                    </select>
                </div>
                <div>
                    <span class="box2_name">上架账号</span>
                    <select v-model="account" :disabled="this.$route.query.record!=undefined">
                        <option value="">请选择</option>
                        <option :value="item.account" v-for="item in range">{{item.account}}</option>
                    </select>
                </div>
                <div>
                    <span class="box2_name">需求说明</span>
                    <textarea v-model="note" :disabled="this.$route.query.record!=undefined"></textarea>
                </div>
                <div>
                    <span class="box2_name">责任人</span>
                    <input type="text" class="input" v-model="person" :disabled="this.$route.query.record!=undefined">
                </div>
                <div>
                    <span class="box2_name">状态</span>
                    <select v-model="status" :disabled="this.$route.query.record!=undefined">
                        <option disabled="disabled">请选择</option>
                        <option value="1">已上架</option>
                        <option value="0">待打包</option>
                    </select>
                </div>
                <div>
                    <span class="box2_name">绑定主题</span>
                    <input type="text" class="input2" v-model="f_thid" disabled>
                    <span class="sel" @click="zt('2')" v-if="this.$route.query.record==undefined" >从主题库选择</span>
                    <span class="sel"  v-if="this.$route.query.record!=undefined">从主题库选择</span>
                </div>
                <div class="box2_btn">
                    <span class="gx" @click="setData" v-if="this.$route.query.record==undefined">更新</span>
                    <span @click="fh()" :class="{right:this.$route.query.record!=undefined}">取消</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import thmSelect from '../select'
    export default {
        components:{thmSelect},
        name: "xq-details",
        data(){
            return{
                name:this.$route.query.data.name,
                status:this.$route.query.data.status,
                type:this.$route.query.data.type,
                channel:this.$route.query.data.channel,
                account:this.$route.query.data.account,
                note:this.$route.query.data.note,
                person:this.$route.query.data.person,
                thid:this.$route.query.data.thid,
                cycle_id:this.$route.query.data.cycle_id,
                channels:[],
                range:[],
                channel_name:this.$route.query.data.channel_name,
                demand_id:this.$route.query.data.demand_id,
                ch_thid:this.$route.query.data.ch_thid,
                schedule_id:this.$route.query.schedule_id,
                thm:false,
                qdName:[],
                url:'',
                num:'',
                f_thid:this.$route.query.data.f_thid,
                f_ch_thid:this.$route.query.data.f_ch_thid,
                qDname:'',
                qDurl:'',
                mz:"",
                qds:this.$route.query.data.channel,
                imgname:'',
                channelName:'',
            }
        },
        mounted(){
            this.qd();  
            this.channel=this.$route.query.data.channel
            this.ch_thid=this.$route.query.data.ch_thid
            this.f_ch_thid=this.$route.query.data.f_ch_thid
        },

        methods:{
           fh(){
               this.$router.go(-1)
           },
            fhs(){
                this.$router.go(-2)
            },
            zt(num){
                this.thm=true;
                this.num=num;
            },
            heidThm(){
                this.thm=false;
            },
            CK(id,qdID,qd){
                if(this.channel=='local'){
                    let Logistics= this.$router.resolve({
                        path:'../themeDetails',
                        query:{
                            thid:id,
                            channel:qd,
                            ch_thid:qdID,
                        }
                    })
                    window.open(Logistics.href);
                }else{
                    let Logistics= this.$router.resolve({
                        path:'../themeDetailsQd',
                        query:{
                            thid:id,
                            channel:qd,
                            ch_thid:qdID,
                        }
                    })
                    window.open(Logistics.href);
                }

            },
            listData(data,id,name,url,mz,qd){
               if(this.num==1){
                   this.thid=data;
                    this.ch_thid=id;
                   this.channel_name=name;
                   this.url=url;
                   this.imgname=mz;
                   
                       this.channel=qd;
               }else{
                   this.f_thid=data;
                    this.f_ch_thid=id;
                   this.qDname=name;
                   this.qDurl=url;
                   this.mz=mz;
                   if(qd==''){
                       this.qds='local'
                   }else{
                       this.qds=qd;
                   }
               }

            },
           setData(){
               if(!this.name){
                   this.$message.error('名称不能为空');
                   return
               }
               if(!this.type){
                   this.$message.error('类型不能为空');
                   return
               }
               if(!this.channel){
                   this.$message.error('渠道不能为空');
                   return
               }
               if(!this.account){
                   this.$message.error('上架账号不能为空');
                   return
               }
               if(!this.person){
                   this.$message.error('责任人不能为空');
                   return
               }
               if(!this.note){
                   this.$message.error('备注说明不能为空');
                   return
               }
               let formData = new FormData;
               formData.append('demand_id',this.demand_id);
               formData.append('schedule_id',this.schedule_id);
               formData.append('cycle_id',this.cycle_id);
               formData.append('name',this.name);
               formData.append('status',this.status);
               formData.append('type',this.type);
               formData.append('person',this.person);
               formData.append('account',this.account);
               formData.append('channel',this.channel);
               formData.append('note',this.note);
               formData.append('thid',this.thid);
               formData.append('ch_thid',this.ch_thid);
               formData.append('f_thid',this.f_thid);
               formData.append('f_ch_thid',this.f_ch_thid);
                this.api.themes_schedule_demand_edit(formData).then((res)=>{
                    if(res!=false){
                        this.$router.go(-1)
                    }
                })
            },
            qd(){
                this.api.themes_config_channel().then((res)=>{
                    this.channels=res;
                    this.Range();
                    if(this.f_thid){
                         this.getData();
                    }
                    this.getDataPending()
                })
            },
            Range(){
                this.api.themes_config_account().then((res)=>{
                    this.range=res;

                })
            },
            getData(){
                let params={thid:this.f_thid,channel:this.qds,ch_thid:this.f_ch_thid};
                this.api.themes_theme_details({params}).then((res)=>{
                    this.qDurl=res.main_preview;
                    this.mz=res.name;
                })
            },
            getDataPending(){
                let params={thid:this.thid,channel:'',ch_thid:this.ch_thid};
                this.api.themes_theme_details({params}).then((res)=>{
                    this.url=res.main_preview;
                    this.imgname=res.name;
                    this.channelName=res.channel
                })
            },
        },
    }
</script>

<style scoped>
    .top{
        width: 100%;
        height:100px;
        background: rgba(255,255,255,1);
        position: fixed;
        left: 256px;
        top: 64px;
        z-index: 99;
    }
    .topName{
        display: inline-block;
        font-size:18px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-left: 24px;
        margin-right: 10px;
        line-height: 45px;
    }
    .new_url{
        color: rgba(61,73,102,1)!important;
    }
    .seach{
        background: #fff;
        border-radius:4px;
        margin-top: 182px;
        margin-bottom: 24px;
    }
    .box1{
        display: inline-block;
        width:257px;
        height:923px;
        background:rgba(255,255,255,1);
    }
    .box1_name span{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,0.65);
        margin: 24px 0 20px 24px;
    }
    .box1_img{
        width:189px;
        height:315px;
        background: #e3e7eb;
        position: relative;
        margin-left: 24px;
    }
    .box1_img img{
        max-width:189px;
        max-height:315px;
        position: relative;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
    .box1_qd{
        position: absolute;
        left: 0;
        top:0;
        z-index:8;
        display: inline-block;
        height:24px;
        background:rgba(10,10,10,1);
        opacity:0.81;
        font-size:12px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(230,233,240,1);
    }
    .box1_BTN span{
        display: block;
        font-size:12px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(230,233,240,1);
        height: 34px;
        line-height: 34px;
        cursor: pointer;
    }
    .box1_img:hover .box1_BTN{
        opacity: 0.8;
    }
    .box1_BTN{
        position: absolute;
        bottom: 0;
        width:189px;
        background:rgba(10,10,10,1);
        opacity:0;
        text-align: center;
    }
    .name span{
        display: inline-block;
        font-size:12px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
        margin:9px 0 58px 34px ;
    }
    .box2{
        display: inline-block;
        vertical-align: top;
    }
    .box2>div{
        margin-bottom: 20px;
    }
    .box2_name{
        display: inline-block;
        width: 100px;
        text-align: right;
        height:20px;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 20px;
    }
    input{
        width:190px!important;
    }
    .input1,.input{
        width:457px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        padding-left: 10px;
        margin-top: 20px;
    }
    .input2{
        width:347px;
        height:36px;
        padding-left: 10px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    textarea{
        width:452px;
        height:126px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        padding: 5px;
    }
    .sel{
        width:124px;
        height:36px;
        background:rgba(242,246,252,1);
        border-radius:4px;
        border:1px solid rgba(51,119,255,1);
        margin-left: 20px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(51,119,255,1);
        cursor: pointer;
        text-align: center;
        line-height: 36px;
        display: inline-block;
    }
    .box2_btn span{
        display: inline-block;
        width:68px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        line-height: 36px;
        text-align: center;
        cursor: pointer;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .gx{
        border: none!important;
        color: #fff!important;
        background:rgba(51,119,255,1)!important;
        margin-left: 125px;
        margin-right: 20px;
    }
    .right{
        margin-left:120px ;
    }
</style>