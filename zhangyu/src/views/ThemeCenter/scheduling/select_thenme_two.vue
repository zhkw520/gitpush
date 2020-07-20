<template>
    <div>
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="fhs">排期管理&nbsp;/&nbsp;</span>
                <span class="log_url"  @click="fh">主题排期详情&nbsp;/&nbsp;</span>
                <span class="new_url">添加需求卡片&nbsp;</span>
            </div>
            <div>
                <span class="topName">添加需求卡片</span>
            </div>
            <div style="margin:12px 0 0 24px">
                <div class="scope2">1</div>
                <div  class="scope1">2</div>
                <span class="selectName">补充需求详情</span>
            </div>
        </div>
        <div class="seach">
            <div style="margin-bottom: 10px;background: #fff" v-for="(item,index) in listThm">
                <div class="box1">
                    <div class="box1_name">
                        <span>待制作</span>
                    </div>
                    <div class="box1_img">
                        <span class="box1_qd">{{qdName[index]}}</span>
                        <img :src="item.main_preview">
                        <div class="box1_BTN">
                            <span @click="age()">重新选择</span>
                            <span @click="CK(index)">查看详情</span>
                        </div>
                    </div>
                    <div class="name">
                        <span>{{item.name}}</span>
                    </div>
                </div>
                <div class="box2">
                    <div>
                        <span class="box2_name">名称</span>
                        <input type="text" class="input1" v-model="name[index]">
                    </div>
                    <div>
                        <span class="box2_name">类型</span>
                        <select v-model="zzType[index]">
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
                        <select  v-model="Makechannel[index]">
                            <option value="">全部</option>
                            <option :value="item.channel" v-for="item in channels">{{item.channel_name}}</option>
                        </select>
                    </div>
                    <div>
                        <span class="box2_name">上架账号</span>
                        <select v-model="zh[index]">
                            <option value="">请选择</option>
                            <option :value="item.account" v-for="item in range">{{item.account}}</option>
                        </select>
                    </div>
                    <div>
                        <span class="box2_name">责任人</span>
                        <input v-model="person[index]" />
                    </div>
                    <div>
                        <span class="box2_name">需求说明</span>
                        <textarea v-model="note[index]"></textarea>
                    </div>

                </div>
            </div>

        </div>
        <div class="two_btm">
            <span class="pv" @click="fh()">上一步</span>
            <span @click="addData()">提交(2)</span>
            <span class="qx" @click="fhs">取消</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "select_thenme_two",
        data(){
            return{
                name:[],
                imgs:[],
                IMGList:[],
                listThm:[],
                qdName:[],
                zzType:[],
                Makechannel:[],
                channels:[],
                range:[],
                zh:[],
                status:'',
                note:[],
                person:[],
                ch_thids:this.$route.query.ch_thids,
                ind:this.$route.query.ind
            }
        },
        mounted(){
            this.imgs=this.$route.query.ind;
            for(var i=0;i<this.imgs.length;i++){
                this.zzType[i]=this.$route.query.zzType;
                this.Makechannel[i]=this.$route.query.Makechannel;
                this.zh[i]=this.$route.query.zh;
            }
            this.qdName=this.$route.query.qdList;
            this.getTheme();

        },
        methods:{
            fh(){
                this.$router.go(-1)
            },
            fhs(){
                this.$router.push({
                    path:"./details",
                    query:{
                        schedule_id:  this.$route.query.schedule_id,
                        tstart:this.$route.query.tstart,
                        tend:this.$route.query.tend,
                    },
                })
            },
            age(){
                this.$router.push({
                    path:"./select_theme",
                    query:{
                        schedule_id:this.$route.query.schedule_id,
                        cycle_id:this.$route.query.id,
                    },
                })
            },
            CK(index){
                var query = {
                    thid:this.$route.query.ind[index],
                    channel: this.$route.query.qdList[index],
                    ch_thid:this.$route.query.ch_thids[index],
                };
               if(this.$route.query.qdList[index]=='channel'){
                   this.$router.push({
                       path:'../themeDetails',
                       query:query
                   })
               }else{
                   this.$router.push({
                       path:'../themeDetailsQd',
                       query:query
                   })
               }

            },
            qd(){
                this.api.themes_config_channel().then((res)=>{
                    this.channels=res;
                    this.Range();
                })
            },
            Range(){
                this.api.themes_config_account().then((res)=>{
                    this.range=res;

                })
            },
            getTheme(){
                let params={tags:'',channel:'',ui_version:'',account:'',
                    status:'',type:'',class:'',tstart:"2019-09-29",tend:(new Date()).toLocaleDateString().split('/').join('-'),search:'',p:1000000,page:1};
                this.api.themes_theme_search({params}).then((res)=>{
                    this.IMGList=res.data;
                    var list=[];
                    for(var i=0;i<this.IMGList.length;i++ ){
                        for(var j =0;j<this.imgs.length;j++){
                            if(this.IMGList[i].thid==this.imgs[j]){
                                list.push(this.IMGList[i]);
                            }
                        }
                    }
                    this.listThm=list;
                   this. qd();
                })
            },
            addData(){
                for(var i=0;i<this.imgs.length;i++){
                    if(this.name[i]==undefined){
                        this.$message.error('名称不能为空');
                        return
                    }
                    if(this.zzType[i]==undefined){
                        this.$message.error('类型不能为空');
                        return
                    }
                    if(this.Makechannel[i]==undefined){
                        this.$message.error('渠道不能为空');
                        return
                    }
                    if(this.zh[i]==undefined){
                        this.$message.error('上架账号不能为空');
                        return
                    }
                    if(this.person[i]==undefined){
                        this.$message.error('责任人不能为空');
                        return
                    }
                    if(this.note[i]==undefined){
                        this.$message.error('备注说明不能为空');
                        return
                    }
                    let formData=new FormData;
                    formData.append('name',this.name[i]);
                    formData.append('schedule_id',this.$route.query.schedule_id);
                    formData.append('cycle_id',this.$route.query.cycle_id);
                    formData.append('status',this.status);
                    formData.append('type',this.zzType[i]);
                    formData.append('channel',this.Makechannel[i]);
                    formData.append('account',this.zh[i]);
                    formData.append('note',this.note[i]);
                    formData.append('person',this.person[i]);
                    formData.append('thid',this.$route.query.ind[i]);
                    formData.append('ch_thid',this.$route.query.ch_thids[i]);
                    this.api.themes_schedule_demand_add(formData).then((res)=>{
                        if(res!=false){
                            this.$router.push({
                                path:"./details",
                                query:{
                                    schedule_id:  this.$route.query.schedule_id,
                                    tstart:this.$route.query.tstart,
                                    tend:this.$route.query.tend,
                                },
                            })
                        }
                    })
                }

            },
        }
    }
</script>

<style scoped>
    .top{
        width: 100%;
        height:147px;
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
    .scope1,.scope2{
        display: inline-block;
        width:20px;
        height:20px;
        border-radius:10px;
        border:1px solid rgba(204,204,204,1);
        font-size:12px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(204,204,204,1);
        text-align: center;
        line-height: 20px;
    }
    .scope1{
        color:rgba(255,255,255,1)!important;
        background:rgba(51,119,255,1)!important;
        border: none!important;
        margin-left: 14px;
    }
    .selectName{
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,0.65);
        margin-left: 14px;
        margin-right: 43px;
    }


    .seach{
        border-radius:4px;
        margin-top: 230px;
    }
    .box1{
        display: inline-block;
        width:257px;
        height:454px;
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
        background: #e3e7ef;
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
        padding:0 5px ;
        display: inline-block;
        height:24px;
        line-height: 24px;
        background:rgba(10,10,10,1);
        opacity:0.81;
        font-size:12px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(230,233,240,1);
        z-index: 9;
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
    .box1_BTN{
        position: absolute;
        bottom: 0;
        width:189px;
        height:68px;
        background:rgba(10,10,10,1);
        opacity:0.81;
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
        height:454px;
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
    .input1{
        width:457px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        padding-left: 10px;
        margin-top: 20px;
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
   .two_btm{
       background: #fff;
       height:72px
   }
    .two_btm span{
        display: inline-block;
        line-height: 36px;
        text-align: center;
        width:86px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);
        cursor: pointer;
        margin-right: 20px;
        margin-top: 18px;
    }
    .pv{margin-left: 24px}
    .qx{
        border:1px solid rgba(211,219,235,1);
        color:rgba(31,46,77,1)!important;
        background: transparent!important;
    }
    input{
        width:190px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        padding-left: 10px;
    }
</style>