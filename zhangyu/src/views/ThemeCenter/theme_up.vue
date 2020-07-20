<template>
    <div>
        <sel v-if="sel" @linet="linet"></sel>
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="fh()">主题库&nbsp;/</span>
                <span class="new_url" v-if="this.$route.query.thid==undefined">&nbsp;上传本地主题</span>
                <span class="new_url" v-if="this.$route.query.thid!=undefined">&nbsp;编辑本地主题</span>
            </div>
            <div class="tit_top_con">
                <span class="tit_name" v-if="this.$route.query.thid==undefined">上传本地主题</span>
                <span class="tit_name" v-if="this.$route.query.thid!=undefined">编辑本地主题</span>
            </div>
        </div>
        <div class="themeUp">
            <div class="themeUpLeft">
                <div>
                    <span >主题名称</span>
                    <input type="text" placeholder="给主题起个名字" style=" margin-top: 26px;" v-model="name" maxlength="10" v-if="this.$route.query.thid==undefined">
                    <input type="text" placeholder="给主题起个名字" style=" margin-top: 26px;" disabled="disabled" v-model="name" maxlength="10" v-if="this.$route.query.thid!=undefined">
                </div>
                <div style="margin-bottom: 0">
                    <span >主题包</span>
                    <div style="display: inline-block;vertical-align: top">
                        <div class="upBag">
                            <img src="../../../public/img/upbag.png"/>
                        </div>
                        <el-upload
                                class="upload-demo"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-remove="handleRemove"
                                :http-request="upLoad"
                                multiple
                                :before-upload="beforeAvatarUploads"
                                >
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                        <div style="display: inline-block">
                            <div style="margin-bottom: 3px;margin-top:3px ">
                                <span style="font-size:14px;font-family:PingFangSC;font-weight:400;color:rgba(61,73,102,1);">上传主题包</span>
                            </div>
                            <div style="margin-bottom: 3px">
                                <span style="font-size:14px;font-family:PingFangSC;font-weight:400;color:rgba(143,155,179,1);">支持扩展名：zip</span>
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
                    <span style=" vertical-align: top">主题描述</span>
                    <textarea  placeholder="给主题写个自我介绍，50字内" v-model="note" maxlength="50"></textarea>
                </div>
                <div>
                    <span>主题类型</span>
                    <select v-model="type" @change="getCon()" v-if='this.$route.query.thid==undefined'>
                        <option :value="item.id" v-for="item in themeType">{{item.type}}</option>
                    </select>
                      <select v-model="type" @change="getCon()" v-if='this.$route.query.thid!=undefined' disabled>
                        <option :value="item.id" v-for="item in themeType">{{item.type}}</option>
                    </select>
                    <span v-if='type'>内容分类</span>
                    <select v-model="content"  v-if='this.$route.query.thid==undefined&&type'>
                        <option :value="item.id" v-for="item in con">{{item.class}}</option>
                    </select>
                     <select v-model="content"  v-if='this.$route.query.thid!=undefined' disabled>
                        <option :value="item.id" v-for="item in con">{{item.class}}</option>
                    </select>
                </div>
                <div class='colour'>
                    <span>色彩</span>
                    <template>
                        <el-select v-model="result1" multiple placeholder="请选择">
                            <el-option
                            v-for="(item,index) in color"
                            :key="index"
                            :label="item.category"
                            :value="item.category">
                            </el-option>
                        </el-select>
                    </template>
                </div>
                <div class='colour'>
                    <span>功能特效</span>
                    <template>
                        <el-select v-model="result2" multiple placeholder="请选择">
                            <el-option
                            v-for="item in functional"
                            :key="item.category"
                            :label="item.category"
                            :value="item.category">
                            </el-option>
                        </el-select>
                    </template>
                </div>
                 <div class='colour'>
                    <span>风格</span>
                    <template>
                        <el-select v-model="result3" multiple placeholder="请选择">
                            <el-option
                            v-for="item in stylize"
                            :key="item.category"
                            :label="item.category"
                            :value="item.category">
                            </el-option>
                        </el-select>
                    </template>
                </div>
                <div class='colour'>
                    <span>内容</span>
                    <template>
                        <el-select v-model="result4" multiple placeholder="请选择">
                            <el-option
                            v-for="(item,index) in contents"
                            :key="index"
                            :label="item.category"
                            :value="item.category">
                            </el-option>
                        </el-select>
                    </template>
                </div>
                <div>
                    <span style=" vertical-align: top">内容标签</span>
                    <div class="tag_box">
                        <input  type="text" placeholder="创建或搜索个性标签" maxlength="32" v-model="tagsName"/>
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
                <div>
                    <span>绑定主题素材</span>
                    <a @click="jump()" v-if="this.$route.query.thid==undefined">从主题素材库选择</a>
                    <a  v-if="this.$route.query.thid!=undefined" class='disab'>从主题素材库选择</a>
                    <div class="img_box">
                        <div class="img_box1" v-for="(item,index) in listSC">
                            <img :src="item.main_preview" class="img_box1_imgs">
                            <img class="del" src="../../../public/img/del.png" style="width: 17px;height: 16px" @click="Del(index)" v-if="themeID==undefined"/>
                        </div>
                    </div>
                </div>
                <div class="themeBtn">
                    <span class="tj" @click="ADD()">提交</span>
                    <span @click="fh">取消</span>
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
                        <img src="../../../public/img/select.png" style="width: 48px;height: 48px;position: relative;left:96px;top:0px;z-index: 7" v-if="item==main_preview">
                        <img :src="item" class="sc">
                        <div class="sz" @click="fm(item)">
                            <span>设置为封面</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div v-if="bg" class="bg">
            <div class="ts">
                <div class="ts_name">
                    <span>确认提示</span>
                </div>
                <div class="ts_con">
                    <span>
                        提交后<span class="Tips">主题名称</span>、<span  class="Tips">主题类型</span> 及主题素材、主题之间的<span  class="Tips">绑定关系</span>将无法修改请仔细核对相关信息，是否无误？
                    </span>
                </div>
                <div class="btn">
                    <span class="qd" @click="addTheme()">确定</span>
                    <span @click="qx()">取消</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import sel from './select_material'
    export default {
        components:{sel},
        name: "theme_up",
        data(){
            return{
                bg:false,
                pic:[],
                sel:false,
                themeType:[],
                con:[],
                main_preview:'',
                tagsName:'',
                content:'',
                name:'',
                type:'',
                type_name:'',
                note:'',
                tags:[],
                tag:[],
                scID:[],
                listSC:[],
                IMGList:[],
                attach:{},
                tableData:{},
                up:false,
                times:0,
                themeID:this.$route.query.thid,
                value1:[],
                color:[],
                functional:[],
                stylize:[],
                contents:[],
                result1:[],
                result2:[],
                result3:[],
                result4:[],
                feature_category:''
            }
        },

        mounted(){
            this.getThemeType();
        },
        methods:{
            getData(){
                let params={thid:this.$route.query.thid,ch_thid:this.$route.query.ch_thid,channel:this.$route.query.channel};
                this.api.themes_theme_details({params}).then((res)=>{
                    this.attach=res.attach;
                    this.name=res.name;
                    this.note=res.note;
                    this.type=res.type;
                    this.type_name=res.type_name;
                    var arr=[];
                    for(var j=0;j<(res.tags.split(',')).length;j++){
                        for(var i=0;i<this.tag.length;i++){
                            if(this.tag[i].name==(res.tags.split(','))[j]){
                                arr.push((res.tags.split(','))[j])
                            }
                        }
                    }
                    this.tags=arr;
                    this.content=res.class;
                    this.main_preview=res.main_preview;
                    this.pic=res.previews;
                    var tx=[];
                    tx=res.feature_category.split(',');
                    for(var i=0;i<tx.length;i++){
                        for(var j=0;j<this.color.length;j++){
                            if((this.color[j].category)==tx[i]){
                                this.result1.push(tx[i]);
                            }
                        }
                        for(var k=0;k<this.functional.length;k++){
                            if((this.functional[k].category)==tx[i]){
                                this.result2.push(tx[i]);
                            }
                        }
                        for(var w=0;w<this.stylize.length;w++){
                            if((this.stylize[w].category)==tx[i]){
                                this.result3.push(tx[i]);
                            }
                        }
                        for(var e=0;e<this.contents.length;e++){
                            if((this.contents[e].category)==tx[i]){
                                this.result4.push(tx[i]);
                            }
                        }
                        
                    }
                    this.getsc();
                    this.getCon();
                })
            },
            speciality(){
                this.api.themes_config_feature_category().then((res)=>{
                    for(var i=0;i<res.length;i++){
                        if(res[i].feature=='色彩'){
                            this.color=res[i].categories
                        }
                        if(res[i].feature=='功能特效'){
                            this.functional=res[i].categories
                        }
                        if(res[i].feature=='风格'){
                            this.stylize=res[i].categories
                        }
                        if(res[i].feature=='内容'){
                            this.contents=res[i].categories
                        }
                    }
                     if(this.$route.query.thid!=undefined){
                        this.getData();
                    }
                })
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
            ADDtag(){
                let formData =new FormData;
                formData.append('name',this.tagsName);
                formData.append('preset',"0");
                formData.append('material','2');
                formData.append('type','theme');
                this.api.tags_add(formData).then((res)=>{
                    this.tagsName='';
                    this.getTagsList();
                })
            },
            getsc(){
                let params={thid:this.$route.query.thid,ch_thid:this.$route.query.ch_thid,channel:this.$route.query.channel}
                this.api.themes_theme_materials({params}).then((res)=>{
                    this.listSC=res;
                })
            },
            Delete(data){
                for(var i=0;i<this.pic.length;i++){
                    if(this.pic[i]==data){
                        this.pic.splice(i,1);
                    }
                }
            },
            fm(url){
                this.main_preview=url;
            },
            fh(){
                this.$router.go(-1)
            },
            jump(){
                this.sel=true;
            },
            setJump(){
                this.sel=false;
            },
            ADD(){
                this.bg=true;
            },
            qx(){
                this.bg=false;
            },
            linet(data){
                if(!this.scID){
                    this.scID=data;
                }else{
                    for(var i=0;i<data.length;i++){
                            if(this.scID.indexOf(data[i])==-1){
                                this.scID.push(data[i])
                            }
                    }

                }
               
                this.getList();
            },

            setTheme(){
                if(!this.name){
                    this.$message.error('主题名不能为空')
                    return
                }
                 if(!this.type){
                    this.$message.error('主题类型不能为空')
                    return
                }
                if(!this.content){
                    this.$message.error('内容分类不能为空')
                    return
                }
                if(!this.main_preview){
                    this.$message.error('封面图不能为空')
                    return
                }
                if(!this.pic){
                    this.$message.error('预览图不能为空')
                    return
                }
                if(!this.attach.url){
                    this.$message.error('未上传主题包')
                    return
                }
                 if(this.result1.length==0){
                    this.$message.error('色彩不能为空')
                    return
                }
                if(this.result2.length==0){
                    this.$message.error('功能特效不能为空')
                    return
                }
                if(this.result3.length==0){
                    this.$message.error('风格不能为空')
                    return
                }
                if(this.result4.length==0){
                    this.$message.error('内容不能为空')
                    return
                }
                // let special1=[];
                // let special2=[];
                // let special3=[];
                // let special4=[];
                // for(var i=0;i<this.result1.length;i++){
                //     special1.push(this.result1[i].category);
                // }
                // for(var s=0;s<this.result2.length;s++){
                //     special2.push(this.result2[s].category);
                // }
                // for(var d=0;d<this.result3.length;d++){
                //     special3.push(this.result3[d].category);
                // }
                // for(var w=0;w<this.result4.length;w++){
                //     special4.push(this.result4[w].category);
                // }
                console.log(this.result1)
                let formData =new FormData;
                formData.append('thid',this.$route.query.thid);
                formData.append('type',this.type);
                formData.append('class',this.content);
                formData.append('main_preview',this.main_preview);
                formData.append('previews',JSON.stringify(this.pic));
                formData.append('attach',JSON.stringify(this.attach));
                formData.append('note',this.note);
                formData.append('tags',this.tags.join(','));
                formData.append('feature_category',(this.result1.concat(this.result2).concat(this.result3).concat(this.result4)).join(','));
                this.api.themes_theme_local_edit(formData).then((res)=>{
                    this.qx();
                    if(res!=false){
                        this.$router.go(-1)
                    }
                })
            },
            addTheme(){
                if(this.$route.query.thid!=undefined){
                    this.setTheme();
                    return
                }
                var arrType=[];
                var strRange= '';
                if(this.listSC.length<2){
                    this.$message.error('相关素材必须有锁屏/图标2种素材类型');
                    return
                }
            
                for(var i=0;i<this.listSC.length;i++){
                    arrType.push(this.listSC[i].type)
                    if(this.listSC[i].type!='th_advertise'){
                        continue;
                    }
                    if(this.listSC[i].range == 'all'){
                        continue;
                    }
                    if(!strRange){
                        strRange = this.listSC[i].range;
                        continue;
                    }
                    if(strRange != this.listSC[i].range){
                        this.$message.error('同一主题不可绑定使用范围不同的素材');
                        return 
                    }
                }

                if(arrType.indexOf('th_icon')==-1){
                    this.$message.error('相关素材必须有锁屏/图标2种素材类型');
                    return
                }
                if(arrType.indexOf('th_lock_screen')==-1){
                    this.$message.error('相关素材必须有锁屏/图标2种素材类型');
                    return
                }
                // if(arrType.indexOf('th_second_page')==-1){
                //     this.$message.error('相关素材必须有锁屏/图标/二级页3种素材类型');
                //     return
                // }
                if(!this.name){
                    this.$message.error('主题名不能为空');
                    return
                }
                if(!this.type){
                    this.$message.error('主题类型不能为空')
                    return
                }
                if(!this.content){
                    this.$message.error('内容分类不能为空')
                    return
                }
                 if(this.result1.length==0){
                    this.$message.error('色彩不能为空')
                    return
                }
                if(this.result2.length==0){
                    this.$message.error('功能特效不能为空')
                    return
                }
                if(this.result3.length==0){
                    this.$message.error('风格不能为空')
                    return
                }
                if(this.result4.length==0){
                    this.$message.error('内容不能为空')
                    return
                }
                if(this.scID.length==0){
                    this.$message.error('相关素材不能为空');
                    return
                }
                if(!this.main_preview){
                    this.$message.error('封面图不能为空')
                    return
                }
                if(!this.pic){
                    this.$message.error('预览图不能为空')
                    return
                }
                if(!this.attach.name){
                    this.$message.error('未上传主题包');
                    return
                }
                let formData =new FormData;
                formData.append('name',this.name);
                formData.append('type',this.type);
                formData.append('class',this.content);
                formData.append('note',this.note);
                formData.append('tags',this.tags.join(','));
                formData.append('materials',JSON.stringify(this.scID));
                formData.append('main_preview',this.main_preview);
                formData.append('previews',JSON.stringify(this.pic));
                formData.append('attach',JSON.stringify(this.attach));
                formData.append('feature_category',(this.result1.concat(this.result2).concat(this.result3).concat(this.result4)).join(','));
                this.api.themes_theme_local_add(formData).then((res)=>{
                    this.qx();
                    if(res!=false){
                        this.$router.go(-1)
                    }
                })
            },
            getList(){
                this.listSC=[];
                for(var i=0;i<this.scID.length;i++){
                    var params={thmid:this.scID[i]};
                     this.api.themes_material_details({params}).then((res)=>{
                        this.listSC.push(res);
                })
                }
                // this.api.themes_material_details({params}).then((res)=>{
                //     this.IMGList=res.data;
                //     var list=[];
                //     for(var i=0;i<this.IMGList.length;i++ ){
                //         for(var j =0;j<this.scID.length;j++){
                //             if(this.IMGList[i].thmid==this.scID[j]){
                //                 list.push(this.IMGList[i]);
                //             }
                //         }
                //     }
                //     this.listSC=list;
                // })
            },

            Del(index){
                    this.scID.splice(index,1);
                    this.listSC.splice(index,1)
            },
            getTagsList(){
                let params = {material:'2',type:"theme",search:this.tagsName,p:500,page:1};
                this.api.tags_search({params}).then((da)=>{
                    this.tag=da.data.self_tags;
                })
            },
            handleExceed(files, fileList) {
                this.$message.error(`当前限制选择10个文件`);
            },
            getCon(){
                for(var i =0 ;i<this.themeType.length;i++){
                        if(this.type==this.themeType[i].id){
                            this.type_name=this.themeType[i].type
                    }
                }
               

                let params={type:this.type_name};
                this.api.themes_config_theme_class({params}).then((res)=>{
                    this.con=res;
                })
            },
            getThemeType(){
                this.api.themes_config_theme_type().then((res)=>{
                    this.themeType=res;
                    this.getTagsList();
                    this.speciality();
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
                this.attach={};
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
                    this.pic.unshift(res.url);
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

    .top{
        width: 100%;
        height: 98px;
        background: rgba(255,255,255,1);
        position: fixed;
        left: 256px;
        top: 64px;
        z-index: 8;
    }
    .new_url{color: rgba(61,73,102,1)!important;}
    .themeUp{
        margin-top: 187px;
    }
    .themeUpLeft{
        display: inline-block;
        width:55%;
        min-height:852px;
        background: #fff;
        margin-right: 24px;
    }
    .themeUpLeft>div{margin-bottom: 20px}
    .themeUpLeft>div>span{
        text-align: right;
        margin-right: 24px;
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:500;
        color:rgba(31,46,77,1);
        width: 100px;
    }
    .themeUpLeft>div>input{
        padding-left: 14px;
        width:451px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    textarea{
        width:431px;
        height:36px;
        padding: 10px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .themeUpLeft>div>select{
        width:118px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 50px;
    }
    .upBag{
        display: inline-block;
        position: relative;
        top:-24px;
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
        top:87px;
        left: 125px;
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
        margin-left: 123px;
        margin-top: 20px;

    }
    .img_box1{
        display: inline-block;
        margin-right: 25px;
        width:144px;
        height:240px;
        border:1px solid rgba(211,219,235,1);
        position: relative;
        vertical-align: top;
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
        width:43%;
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
        margin-bottom: 20px;
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
        margin-bottom: 20px;
        vertical-align: top;
        background: #e3e7eb;
    }
    .sc{
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
    .sc{
        max-width:144px;
        max-height:240px;
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
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
    .upPreview .el-upload{
        position: absolute;
        left: 0;
        top:0;
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
    .Tips{color: #ff240e!important;}
     .disab{
        border: 1px solid #e6e9f0;
        color:#e6e9f0
    }
    .colour .el-select{
        width: 412px;
    }
</style>