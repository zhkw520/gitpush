<template>
    <div>
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="fh()">{{this.$route.query.name+'打包件'}}&nbsp;/</span>
                <span class="new_url"> &nbsp;{{this.$route.query.name+'打包件详情'}}</span>
            </div>
            <div>
                <div class="name">
                    <span>{{this.$route.query.name+'打包件名称:'}}</span>
                    <span>{{tableData.name}}</span>
                    <div>
                        <span @click="bj()">编辑</span>
                        <a :href="tableData.attach.url" class="dowload">下载</a>
                    </div>
                </div>
                <div>
                    <!--<span class="titName">主题类型:</span>-->
                    <!--<span class="titCon"></span>-->
                    <span class="titName" style="width: 20px;margin-right: 10px">ID:</span>
                    <span class="titCon">{{tableData.pkgid}}</span>
                    <span class="titName" style="width: 60px;margin-right: 10px">创建时间:</span>
                    <span class="titCon" style="width: 150px">{{tableData.created_at}}</span>
                    <span class="titName" style="width: 33px;margin-right: 10px">标签:</span>
                    <div class="tag">
                        <span class="tagName" v-for="item in tags" v-if="item!=''">{{item}}</span>
                        <!--<span class="tagADD">-->
                        <!--<img>-->
                        <!--标签-->
                        <!--</span>-->
                    </div>
                </div>
                <div>
                    <span class="titName" style="width: 80px;margin-right: 10px">厂商UI版本:</span>
                    <span class="titCon">{{tableData.ui_version}}</span>
                </div>
                <div>
                    <span class="titName" style="width: 60px;margin-right: 10px">备注描述:</span>
                    <span class="titCon" style="width: 60%">{{tableData.note}}</span>
                </div>
                <div class="switcher">
                    <a href="#page1" :class="{click:isType==0}" @click="changeover('0')">预览图</a>
                    <a href="#page2" :class="{click:isType==1}" @click="changeover('1')">相关主题</a>
                    <a href="#page3" :class="{click:isType==2}" @click="changeover('2')">绑定主题素材</a>
                </div>
            </div>
        </div>

        <div style="margin-top: 346px">
            <div class="preview" id="page1">
                <div class="titID">
                    <span class="nameID">预览图</span>
                </div>
                <div class="imgID" v-for="item in tableData.previews" v-if="tableData.previews!=[]">
                    <img :src="item">
                </div>
                <div style="width: 100%;text-align: center" v-if="tableData.previews==[]">
                    <img src="../../../../public/img/null.png" style="width:48px;margin-top: 150px">
                    <div>
                        <span>暂无数据</span>
                    </div>

                </div>
            </div>
            <div  class="preview" id="page2">
                 <div class='line' style="height:24px;width:100%;background:rgba(239,244,248,1)"></div>
                <div class="titID">
                    <span class="nameID">相关主题</span>
                </div>
                <div class="imgID" v-for="item in theme" v-if="theme.length!=0">
                    <img :src="item.main_preview" v-if="item.main_preview">
                    <div class="See" @click="seeTheme(item.thid,item.channel,item.ch_thid)">
                        查看详情
                    </div>
                </div>
                <div style="width: 100%;text-align: center" v-if="theme.length==0">
                    <img src="../../../../public/img/null.png" style="width:48px;margin-top: 150px">
                    <div>
                        <span>暂无数据</span>
                    </div>

                </div>
            </div>
            <div class="preview" id="page3">
                 <div class='line' style="height:24px;width:100%;background:rgba(239,244,248,1)"></div>
                <div class="titID">
                    <span class="nameID">绑定主题素材</span>
                </div>
                <div>
                    <div class="imgID" v-for="item in sc" v-if="sc.length!=0">
                        <img :src="item.main_preview">
                        <div class="See" @click="see(item.thmid,item.name)">
                            查看详情
                        </div>
                    </div>
                    <div style="width: 100%;text-align: center" v-if="sc.length==0">
                        <img src="../../../../public/img/null.png" style="width:48px;margin-top: 150px">
                        <div>
                            <span>暂无数据</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "theme-details",
        data(){
            return{
                isType:0,
                isUPload:1,
                time:[],
                isTime:"w",
                tableData:{attach:{
                    url:''
                    }},
                sc:[],
                theme:[],
                type:this.$route.query.type,
                pkgid:this.$route.query.pkgid,
                name:this.$route.query.name,
                tags:[],
            }
        },
        mounted(){
            this.getData();
        },
        methods:{
            bj(){
                this.$router.push({
                    path:'./upPack',
                    query:{
                        type:this.type,
                        pkgid:this.pkgid,
                    }
                })
            },
            see(id,name){
                let Logistics= this.$router.resolve({
                    path:'.././themeSc_details',
                    query:{
                        name:name,
                        thmid:id,
                    },
                })
                window.open(Logistics.href);
            },
            seeTheme(id,name,qdid){
                if(name=='local'){
                    var path='.././themeDetails'
                }else{
                    path='.././themeDetailsQd'
                }
                let Logistics= this.$router.resolve({
                    path:path,
                    query:{
                        thid:id,
                        channel:name,
                        ch_thid:qdid,
                    },
                })
                window.open(Logistics.href);
            },
            fh(){
                this.$router.go(-1);
            },
            changeover(num){
                this.isType=num;
            },
            histogram(data){
                this.isUPload=data;
            },
            dateTime(time){
                this.isTime=time;
            },
            jump(){
                this.$router.push({
                    path:"../sheleRecord"
                })
            },
            getData(){
                let params = {pkgid:this.pkgid}
                this.api.themes_package_details({params}).then((res)=>{
                    if(res.length!=0){
                        this.tableData=res;
                        this.tags=res.tags.split(',');
                    }else {
                        return;
                    }
                    this.getsc();
                    this.getThmPkg()
                })
            },
            getsc(){
                let params={pkgid:this.pkgid};
                this.api.themes_package_materials({params}).then((res)=>{
                    if(res.length==0){
                        return
                    }else{
                        this.sc=res;
                    }
                })
            },
            getThmPkg(){
                let params={pkgid:this.pkgid};
                this.api.themes_package_themes({params}).then((res)=>{
                    if(res.length==0){
                        return
                    }else {
                        this.theme=res
                    }
                    console.log(this.theme)
                })
            },
        },
    }
</script>

<style scoped>
    .top{
        width: 100%;
        min-height: 62px;
        background: rgba(255,255,255,1);
        position: fixed;
        left: 256px;
        top: 64px;
        z-index: 8;
        box-shadow: 0 5px 5px #dfdfdf;
    }

    .tit_top_url{padding-left: 0!important;}
    .new_url{color: rgba(61,73,102,1)!important;}
    .content{
        padding: 24px 24px 0 24px;
        margin-top: 148px;
        width:100%;
        height:243px;
        background:rgba(255,255,255,1);
    }
    .name{
        margin:24px 0 14px 0 ;
    }
    .top>div{
        margin-left: 23px;
    }
    .name>span{
        font-size:18px;
        font-family:PingFang-SC;
        font-weight:bold;
        color:rgba(31,46,77,1);
    }
    .name>div{
        display: inline-block;
        float: right;
        margin-right: 280px;
    }
    .name>div>span,.name>div>a{
        display: inline-block;
        line-height: 36px;
        text-align: center;
        cursor: pointer;
        width:68px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
    }
    .dowload{
        color: #fff!important;
        background:rgba(51,119,255,1)!important;
        border: 0!important;
    }
    .titName{
        display: inline-block;
        width:100px;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
        margin-bottom: 18px;
    }
    .titCon{
        display: inline-block;
        width: 100px;
        font-size:14px;
        font-family:HelveticaNeue;
        color:rgba(31,46,77,0.65);
        margin-right:160px ;
    }
    .tag{
        display: inline-block;
    }
    .tagADD{
        display: inline-block;
        width:46px;
        height:24px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px dotted rgba(211,219,235,1);
        font-size:12px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,0.45);
        line-height: 24px;
        text-align: center;
    }
    .switcher{
        margin-bottom: 0!important;
    }
    .switcher a{

        display: inline-block;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,0.65);
        margin-right: 48px;
        padding-bottom: 10px;
        cursor: pointer;
        
    }
    .click{
        font-weight:500!important;
        color:rgba(51,119,255,1)!important;
        border-bottom: 2px solid #3377FF;
    }
    .preview{
        width: 100%;
        overflow-x: auto;
        overflow-y: hidden;
        white-space:nowrap;
        min-height:425px;
        background:rgba(255,255,255,1);
        border-radius:2px;
        margin-bottom: 24px
    }
    .titID{
        height: 55px;
        border-bottom: 1px solid #E6E9F0;
    }
    .nameID{
        display: inline-block;
        font-size:16px;
        font-family:PingFangSC;
        font-weight:500;
        color:rgba(31,46,77,1);
        line-height: 55px;
        margin-left: 24px;
    }
    .derivation{
        display: inline-block;
        margin-left: 18px;
        width:40px;
        height:24px;
        background:rgba(247,249,252,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        text-align: center;
        line-height: 24px;
        font-size:12px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,0.45);
    }
    .imgID{
        display: inline-block;
        margin:24px;
        width:189px;
        height:315px;
        vertical-align: top;
        background: #e3e7eb;
        position: relative;
    }
    .imgID img{
        max-width:189px;
        max-height:315px;
        position: relative;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .block{
        display: inline-block;
        width:272px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 40px;
        margin-bottom: 0!important;
        margin-top: 8px;
    }
    .block .el-range-editor.el-input__inner{
        width: 100% !important;
    }
    .right{display: inline-block;float: right;margin-right: 24px}
    .name_qd{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 28px;
    }
    .right select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 20px;
    }
    .cx{
        display: inline-block;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        width:68px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);
        margin-right: 20px;
    }
    .cxxq{
        width:96px!important;
        background:rgba(255,255,255,1)!important;
        border:1px solid rgba(211,219,235,1)!important;
        color:rgba(31,46,77,1)!important;
        margin-right: 0!important;
    }
    .left{margin-left: 24px;margin-top: 20px}
    .left>span{
        width:70px;
        height:36px;
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(121,130,148,1);
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        border-radius:4px 0px 0px 4px;
        border:1px solid rgba(211,219,235,1);
    }
    .xs{
        border-radius:0px 4px 4px 0px!important;
    }
    .earnings_img{
        background:rgba(255,255,255,1)!important;
        border:1px solid rgba(51,119,255,1)!important;
        color:rgba(51,119,255,1)!important;
    }
    .left_right{
        display: inline-block;
        float: right;
        margin-right: 24px;
    }
    .left_right>span{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(121,130,148,1);
        cursor: pointer;
        margin-right: 24px;
    }
    .block_right{
        margin-right: 0!important;
    }
    .date{
        color:rgba(51,119,255,1)!important;
    }
    .tendency span{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
        margin: 20px 0 20px 23px;
    }
    .addJl{
        display: inline-block;
        width:124px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height: 36px;
        text-align: center;
        cursor: pointer;
        float: right;
        margin: 10px 24px 0 0 ;
    }
    .tagName{
        display: inline-block;
        padding:0px 8px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        line-height: 24px;
        border:1px solid rgba(211,219,235,1);
        font-size:12px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,0.45);
        text-align: center;
        margin-right: 5px;
        vertical-align: bottom;
    }
    .See{
        width: 100%;
        height:45px;
        background:rgba(28,28,28,1);
        border-radius:0px;
        opacity: 0;
        position: absolute;
        left: 0;
        bottom: 0px;
        text-align: center;
        line-height: 45px;
        color: #fff;
        cursor: pointer;
    }
    .imgID:hover .See{
        opacity:0.8;

    }
    #page1,#page2,#page3{
    
        padding-top:300px;
        margin-top:-300px!important;
    }
   
</style>