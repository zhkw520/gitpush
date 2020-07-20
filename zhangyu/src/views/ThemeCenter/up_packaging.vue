<template>
    <div class="bg">
        <div class="themeUp">
            <div class="themeUpLeft">
                <div>
                    <span >打包件名称</span>
                    <input type="text" placeholder="起个名字" style=" margin-top: 26px;" v-model="name" maxlength="10">
                </div>
                <div style="margin-bottom: 0">
                    <span >资源包</span>
                    <div style="display: inline-block;position: relative">
                        <div class="upBag">
                            <img src="../../../public/img/upbag.png"/>
                        </div>
                        <el-upload
                                class="upload-demo"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-remove="handleRemove"
                                :http-request="upLoad"
                                :before-upload="beforeAvatarUploads"
                        >
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                        <div style="display: inline-block">
                            <div style="margin-bottom: 3px;margin-top:3px ">
                                <span style="font-size:14px;font-family:PingFangSC;font-weight:400;color:rgba(61,73,102,1);">上传资源包</span>
                            </div>
                            <div style="margin-bottom: 3px">
                                <span style="font-size:14px;font-family:PingFangSC;font-weight:400;color:rgba(143,155,179,1);">支持扩展名：.zip </span>
                            </div>
                            <div style="margin-bottom: 3px">
                                <span>{{attach.name}}</span>
                                <span class="content_xz" @click="dels()" v-if="this.attach.name!=undefined">删除</span>
                            </div>
                            <el-progress :percentage="this.times" v-if="up"></el-progress>
                        </div>
                    </div>
                </div>
                <div>
                    <span>备注描述</span>
                    <input type="text" placeholder="写个自我介绍，50字内" v-model="note"/>
                </div>
                <div>
                    <span>内容标签</span>
                    <div class="tag_box">
                        <input  type="text" placeholder="创建或搜索个性标签" v-model="tagsName"/>
                        <div class="tags_box">
                            <span class="CJ" v-if="tagsName!=''" @click="ADDtag()" >创建“{{tagsName}}”标签</span>
                            <div style="padding: 0 14px">
                                <template>
                                    <el-checkbox-group
                                            v-model="tags">
                                        <el-checkbox v-for="(item,index) in tag" :label="item.name">{{item.name}}</el-checkbox>
                                    </el-checkbox-group>
                                </template>

                            </div>

                        </div>
                    </div>
                </div>
                <!-- <div>
                    <span class="tit_name">渠道</span>
                    <select  v-model="channel" disabled="disabled">
                        <option :value="item.channel" v-for="item in channels">{{item.channel_name}}</option>
                    </select>
                </div>
                <div>
                    <span class="tit_name">厂商UI版本</span>
                    <select style="margin-right: 68px" v-model="ui_version" disabled="disabled">
                        <option value="" v-if="ui.length==0&&channel!=''">暂无</option>
                        <option v-for="item in ui" :value="item.version"  v-if="ui_version!=''">{{item.version}}</option>
                    </select>
                </div> -->
                <!-- <div>
                    <span>绑定主题素材</span>
                    <a @click="jump()">从主题素材库选择</a>
                    <div class="img_box">
                        <div class="img_box1" v-for="(item,index) in listSC">
                            <img :src="item.main_preview" class="img_box1_imgs">
                            <img class="del" src="../../../public/img/del.png" style="width: 17px;height: 16px" @click="Del(item.thmid)"/>
                        </div>
                    </div>
                </div> -->
                <div class="themeBtn">
                    <span class="qd" @click="addTheme()">提交</span>
                    <span @click="heid()">取消</span>
                </div>
            </div>
            <div class="themeUpRight">
                <div style="margin:0 0 20px 24px">
                    <span class="upName">上传界面预览图</span>
                    <span class="max_num">最多上传10张预览图</span>
                </div>
                <div class="imgBox">
                    <div class="upPreview">
                        <div class="icon">
                            <img src="../../../public/img/add_msg.png" style="width: 18px;height: 18px;margin-bottom: 10px">
                            <div>
                                <span style="display: inline-block;font-size:12px;font-family:PingFangSC;font-weight:400;color:rgba(31,46,77,0.45);">封面预览图</span>
                            </div>
                        </div>
                        <el-upload
                                class="upload"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :http-request="upYl"
                                multiple
                                :limit="10"
                                :on-exceed="handleExceed"
                        >
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </div>
                    <div class="imgCanvas" v-for="item in pic">
                        <img class="dels" src="../../../public/img/del.png" style="width: 16px" v-if="item!=main_preview" @click="Delete(item)">
                        <img src="../../../public/img/select.png" style="width: 48px;height: 48px;position: relative;left:95px;top:0px;z-index: 99" v-if="item==main_preview">
                        <img :src="item" class="sc">
                        <div class="sz" @click="fm(item)">
                            <span>设置为封面</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <!-- <div v-if="bg" class="bg">
            <div class="ts">
                <div class="ts_name">
                    <span>确认提示</span>
                </div>
                <div class="ts_con">
                    <span>
                        提交后主题名称、主题类型 及主题素材、主题之间的绑定关系将无法修改请仔细核对相关信息，是否无误？
                    </span>
                </div>
                <div class="btn">
                    <span class="qd" @click="addTheme()">确定</span>
                    <span @click="qx()">取消</span>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>

    export default {
        props:['types','ui_v','chan'],
        name: "theme_up",
        data(){
            return{

                pic:[],
                themeType:[],
                con:[],
                main_preview:'',
                tagsName:'',
                content:'',
                name:'',
                note:'',
                tags:[],
                tag:[],
                scID:[],
                listSC:[],
                IMGList:[],
                attach:{},
                ui:[],
                channel:this.chan,
                channels:[],
                ui_version:this.ui_v,
                up:false,
                times:0,
            }
        },
        mounted(){
            this.getThemeType();

        },
        methods:{
            fm(url){
                this.main_preview=url;
            },
            fh(){
                this.$router.go(-1)
            },
           
            heid(){
                this.$parent.heidPak();
            },
            linet(data){
                this.scID=data;
                this.getList();
            },
            Delete(data){
                for(var i=0;i<this.pic.length;i++){
                    if(this.pic[i]==data){
                        this.pic.splice(i,1);
                    }
                }
            },
            beforeAvatarUploads(file) {
                this.file = file;
                console.log(this.file)
                const isXzip = file.type === 'application/x-zip-compressed';
                const iszip = file.type === 'application/zip';
                if (!(isXzip||iszip)) {
                    this.$message.error('只支持ZIP格式!');
                }
                return isXzip||iszip;
            },
         
            addTheme(){
                if(!this.name){
                    this.$message.error('名称不能为空')
                    return
                }
                if(!this.attach){
                    this.$message.error('附件不能为空')
                    return
                }
                if(!this.note){
                    this.$message.error('备注不能为空')
                    return
                }
                if(!this.tags){
                    this.$message.error('标签不能为空')
                    return
                }
                if(!this.main_preview){
                    this.$message.error('预览图不能为空')
                    return
                }
                this.$emit('dataUp',this.name,JSON.stringify(this.attach),this.tags.join(','),this.note,this.main_preview,this.pic,this.types);
                this. heid()

            },
           
           
            getTagsList(){
                let params = {material:'2',type:'theme',search:this.tagsName,p:500,page:1};
                this.api.tags_search({params}).then((da)=>{
                    this.tag=da.data.self_tags;
                })
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择10个文件`);
            },
            // getCon(){
            //     let params={type:this.type};
            //     this.api.themes_config_theme_class({params}).then((res)=>{
            //         this.con=res;
            //     })
            // },
            getThemeType(){
                this.api.themes_config_theme_type().then((res)=>{
                    this.themeType=res;
                    this.getTagsList();
                })
            },
            dels(){
                this.attach={};
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
            upLoad(file){
                this.up=true;
                this.times=0;
                ++this.fcounter;
                this.scope();
                let formData = new FormData;
                formData.append('file',file.file);
                this.api.file_upload(formData).then((res)=>{
                    this.attach=res;
                    this.times=100;
                    --this.fcounter;
                    this.up=false;
                })
            },
            upYl(file){
                let formData = new FormData;
                formData.append('file',file.file);
                this.api.file_upload(formData).then((res)=>{
                    this.pic.push(res.url);
                })
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
        },
    }
</script>

<style scoped>

    .themeUp{
        position: relative;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .themeUpLeft{
        display: inline-block;
        width:883px;
        height:648px;
        background: #fff;
        margin-right: 24px;
        margin-left: 10%;
        overflow-y:auto ;
    }
    .themeUpLeft>div{margin-bottom: 20px;margin-left: 60px;}
    .themeUpLeft>div>span{
        text-align: right;
        margin-right: 24px;
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:500;
        color:rgba(31,46,77,1);
        width: 80px;
    }
    .themeUpLeft>div>input{
        padding-left: 14px;
        width:451px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .themeUpLeft>div>select{
        width:404px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .upBag{
        display: inline-block;
        position: relative;
        top:-19px;
        width:98px;
        height:98px;
        background:rgba(0,0,0,0.02);
        border-radius:4px;
        border:1px solid rgba(0,0,0,0.15);
        text-align: center;
        margin-right: 17px;
    }
    .upBag img{
        display: inline-block;
        width: 24px;
        height: 24px;
        position: relative;
        top:50%;
        transform: translateY(-50%);
    }
    .upload-demo{
        display: inline-block;
    }
    .upload-demo .el-button {
        width:98px;
        height:98px;
        position: absolute;
        top:0px;
        left:0px;
        opacity: 0;
    }
    .tag_box{
        display: inline-block;
        width:467px;
        height:200px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        overflow-y: auto;
    }
    .tag_box input{
        margin: 20px 0 18px 14px;
        padding-left: 14px;
        width:390px;
        height:28px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    a{
        display: inline-block;
        width:152px;
        height:36px;
        background:rgba(242,246,252,1);
        border-radius:4px;
        border:1px solid rgba(51,119,255,1);
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(51,119,255,1);
        text-align: center;
        line-height: 36px;
        cursor: pointer;
    }
    .img_box{
        margin-left: 85px;
        margin-top: 20px;
    }
    .img_box1{
        vertical-align: top;
        display: inline-block;
        margin-right: 25px;
        width:144px;
        height:240px;
        border:1px solid rgba(211,219,235,1);
        position: relative;
        margin-bottom: 20px;
    }
    .img_box1_imgs{
        max-width:144px;
        max-height:240px;
        position: relative;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
    .del{
        display: inline-block;
        cursor: pointer;
        position: absolute!important;
        top:-10px;
        right: -10px;
    }
    .themeBtn{
        margin-left: 145px!important;
    }
    .themeBtn span{
        display: inline-block;
        width:68px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        line-height: 36px;
        text-align: center!important;
        cursor: pointer;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
    }
    .tj{
        background:rgba(51,119,255,1)!important;
        color: #fff!important;
        margin-right: 20px;
    }
    .themeUpRight{
        vertical-align: top;
        display: inline-block;
        width:696px;
        min-height:648px;
        background:rgba(255,255,255,1);
    }
    .upName{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-top: 24px;
        margin-right: 9px;
    }
    .max_num{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(143,155,179,1);
    }
    .imgBox{
        margin-left: 24px;
    }
    .upPreview{
        position: relative;
        display: inline-block;
        vertical-align: top;
        width:144px;
        height:240px;
        margin-right: 20px;
        background:rgba(0,0,0,0.05);
        border:1px dashed rgba(0,0,0,0.15);
        text-align: center;
    }
    .icon{
        text-align: center;
        position:relative ;
        top: 50%;
        transform: translateY(-50%);
    }
    .upload{
        position: absolute;
        top: 0;
        opacity: 0;
    }
    .upload .el-button{
        width:144px;
        height:240px;
    }
    .imgCanvas{
        position: relative;
        display: inline-block;
        width:144px;
        height:240px;
        margin-right: 20px;
        vertical-align: top;
    }
    .sc{
        max-width:144px;
        max-height:240px;
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        bottom: 0;
        right: 0;
    }
    .ts{
        position: fixed;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        width:420px;
        height:166px;
        padding: 20px;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 6px 0px rgba(0,0,0,0.06);
        border-radius:4px;
    }
    .ts_name span{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:bold;
        color:rgba(31,46,77,1);
        margin-bottom: 13px;
    }
    .ts_con span{
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,0.65);
        margin-bottom: 44px;
    }
    .btn{
        text-align: right;
        width: 90%!important;
    }
    .btn span{
        text-align: center;
        cursor: pointer;
        line-height: 36px;
        width:80px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
    }
    .qd{
        background:rgba(51,119,255,1)!important;
        border: 0px!important;
        color: #fff!important;
        margin-right: 20px;
    }
    .imgCanvas{
        position: relative;
        display: inline-block;
        width:144px;
        height:240px;
        margin-right: 20px;
    }
    /*.imgCanvas img{*/
        /*max-width:144px;*/
        /*max-height:240px;*/
        /*position: absolute;*/
        /*left: 50%;*/
        /*top:50%;*/
        /*transform: translate(-50%,-50%);*/
    /*}*/
    .sz{
        width:144px;
        height:34px;
        background:rgba(0,0,0,1);
        position: absolute;
        bottom: 0px;
        text-align: center;
        opacity: 0;
    }
    .imgCanvas:hover .sz{
        opacity: 0.8;
    }
    .sz span{
        display: inline-block;
        cursor: pointer;
        line-height: 34px;
        font-size:12px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);
    }
    .CJ{
        display: inline-block;
        line-height: 26px;
        text-align: center;
        cursor: pointer;
        padding: 3px 5px ;
        background: #d7d7d7;
        font-size: 12px;
        border-radius: 5px;
        margin-bottom: 10px!important;
    }
    .dels{
        position: absolute;
        top:0;
        right: -6px;
        z-index: 9;
        opacity: 0;
    }
    .imgCanvas:hover .dels{
        opacity: 1;
    }
    .content_xz{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(51,119,255,1);
        margin-left: 10px;
        cursor: pointer;
    }
</style>