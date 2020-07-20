<template>
    <div class="dw">
        <pak v-if="pak" :types="types" @dataUp="dataUp" :chan="channel" :ui_v="ui_version"></pak>
        <sel v-if="sel" @linet="linet"></sel>
        <div class="top" v-if="this.cons==undefined">
            <div class="tit_top_url">
                <span class="log_url" @click="fh()">主题库&nbsp;/</span>
                <span class="log_url" @click="fhs()">&nbsp;主题库详情&nbsp;/</span>
                <span class="new_url">&nbsp;编辑渠道详情</span>
            </div>
            <div class="tit_top_con">
                <span class="tit_name">编辑渠道详情</span>
            </div>
        </div>
        <div class="top" v-if="this.cons!=undefined">
            <div class="tit_top_url">
                <span class="log_url" @click="fh()">主题库&nbsp;/</span>
                <span class="log_url" @click="fhs()">&nbsp;主题库详情&nbsp;/</span>
                <span class="new_url"> &nbsp;添加上架记录</span>
            </div>
            <div class="tit_top_con">
                <span class="tit_name">添加上架记录</span>
            </div>
        </div>
        <div class="themeUp">
            <div class="themeUpLeft">
                <div style="margin-top: 24px">
                    <span class="tit_name">渠道</span>
                    <select  @change="getUI()" v-model="channel" :disabled="this.cons==undefined">
                        <option :value="item.channel" v-for="item in channels">{{item.channel_name}}</option>
                    </select>
                </div>
                <div>
                    <span class="tit_name">厂商UI版本</span>
                    <select style="margin-right: 68px" v-model="ui_version" @change="getThemeType()" :disabled="this.cons==undefined">
                        <option v-for="item in ui" :value="item.version" v-if="ui.length!=0">{{item.version}}</option>
                        <option value="" v-if="ui.length==0&&channel!=''">暂无</option>
                    </select>
                </div>
                <div style="margin-bottom: 0">
                    <span >主题包</span>
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
                                <span style="font-size:14px;font-family:PingFangSC;font-weight:400;color:rgba(61,73,102,1);">上传主题包</span>
                            </div>
                            <div style="margin-bottom: 3px">
                                <span style="font-size:14px;font-family:PingFangSC;font-weight:400;color:rgba(143,155,179,1);">支持扩展名：.zip、.theme .gnz .zmtp、.hwt</span>
                            </div>
                            <div style="margin-bottom: 3px">
                                <span>{{attach.name}}</span>
                                <span class="content_xz" @click="dels()" v-if="(this.attach.name!=undefined)">删除</span>
                            </div>
                            <el-progress :percentage="this.times" v-if="up"></el-progress>
                        </div>
                    </div>
                </div>
                <div>
                    <span>资源版本号</span>
                    <input type="text" v-model="version" placeholder="请输入上架资源版本号" :disabled="this.cons==undefined">
                </div>
                <div>
                    <span>上架账号</span>
                    <select style="margin-right: 24px" v-model="account" :disabled="this.cons==undefined">
                        <option value="" disabled="disabled">请选择上架该主题的账号信息</option>
                        <option :value="item.account" v-for="item in range">{{item.account}}</option>
                    </select>
                </div>
                <div>
                    <span>上架名称</span>
                    <input type="text" placeholder="请输入上架该渠道的主题名称" v-model="channel_theme_name" maxlength="10" :disabled="this.cons==undefined">
                </div>
                <div>
                    <span>上架单价</span>
                    <input type="number" placeholder="请输入上架价格" v-model="price" :disabled="this.cons==undefined">
                </div>
                <div>
                    <span>上架时间</span>
                    <el-date-picker
                            v-model="tdate"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
                <div>
                    <span style=" vertical-align: top">上架备注</span>
                    <textarea placeholder="给主题写个自我介绍，50字内" v-model="note" maxlength="50"></textarea>
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
                        <span style="vertical-align: top">从主题素材库选择</span>
                        <div  style=" display: inline-block;min-height:38px">
                            <a @click="jump()" v-if="this.cons!=undefined">从主题素材库选择</a>
                            <a  v-if="this.cons==undefined" class='disab'>从主题素材库选择</a>
                            <div class="img_box">
                                <div class="img_box1" v-for="(item,index) in SC">
                                    <img :src="item.main_preview" class="img_box1_imgs">
                                    <img class="del" src="../../../public/img/del.png" style="width: 17px;height: 16px" @click="Del(index)" v-if="cons!=undefined"/>
                                </div>
                            </div>
                        </div>
                </div>
                <div>
                    <span style="vertical-align: top">绑定打包件(选填)</span>
                    <div style="display: inline-block" >
                        <div style="display: inline-block" >
                            <div class="db"  :class="{boxShow:num==0}"  @click="getPak('th_lock_screen')">
                                <div class="icon">
                                    <img src="../../../public/img/add_msg.png" style="width: 18px;height: 18px;margin-bottom: 10px" >
                                    <div>锁屏打包件</div>
                                </div>
                                <img :src="this.lockYl" style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);" />
                                <div v-if="this.lockYl!=''&&this.cons!=undefined" style="position: absolute;bottom: 0;width:189px;height:34px;background:rgba(0,0,0,1);opacity:0.8;text-align: center" @click="getUP('th_lock_screen')">
                                    <span style="display: inline-block;font-size:12px;font-family:PingFangSC-Regular,PingFangSC;font-weight:400;color:rgba(255,255,255,1);line-height: 33px">重新上传</span>
                                </div>
                            </div>
                        </div>
                        <div style="display: inline-block">
                            <div class="db" :class="{boxShow:num==1}" @click="getPak('th_icon')">
                                <div class="icon">
                                    <img src="../../../public/img/add_msg.png" style="width: 18px;height: 18px;margin-bottom: 10px" >
                                     <div>图标打包件</div>
                                </div>
                                <img :src="this.iconYl" style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);"/>
                                <div v-if="this.iconYl!=''&&this.cons!=undefined" style="position: absolute;bottom: 0;width:189px;height:34px;background:rgba(0,0,0,1);opacity:0.8;text-align: center" @click="getUP('th_icon')">
                                    <span style="display: inline-block;font-size:12px;font-family:PingFangSC-Regular,PingFangSC;font-weight:400;color:rgba(255,255,255,1);line-height: 33px">重新上传</span>
                                </div>
                            </div>
                        </div>
                        <div style="display: inline-block">
                            <div class="db" :class="{boxShow:num==2}" @click="getPak('th_second_page')">
                                <div class="icon">
                                    <img src="../../../public/img/add_msg.png" style="width: 18px;height: 18px;margin-bottom: 10px" >
                                     <div>二级页打包件</div>
                                </div>
                                <img :src="this.twoYl" style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);"/>
                                <div v-if="this.twoYl!=''&&this.cons!=undefined" style="position: absolute;bottom: 0;width:189px;height:34px;background:rgba(0,0,0,1);opacity:0.8;text-align: center" @click="getUP('th_second_page')">
                                    <span style="display: inline-block;font-size:12px;font-family:PingFangSC-Regular,PingFangSC;font-weight:400;color:rgba(255,255,255,1);line-height: 33px">重新上传</span>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div class="themeBtn">
                    <span class="tj" @click="ADD()">提交</span>
                    <span @click="fhs()">取消</span>
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
                        <img src="../../../public/img/select.png" style="width: 48px;height: 48px;position: relative;left:96px;top:0px;z-index: 99" v-if="item==main_preview">
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
                        提交后<span class="Tips">上架渠道</span>、<span class="Tips">厂商UI版本</span>、<span class="Tips">资源版本号</span>、<span class="Tips">上架名称</span>、<span class="Tips">上架单价</span>、<span class="Tips">主题类型</span> 及主题素材、打包件、主题之间的<span class="Tips">绑定关系</span>将无法修改请仔细核对相关信息，是否无误？
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
    import pak from './up_packaging'
    export default {
        components:{sel,pak},
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
                types:'',
                note:'',
                tags:[],
                tag:[],
                scID:[],
                listSC:[],
                IMGList:[],
                attach:{},
                channel:'',
                channels:[],
                ui:[],
                ui_version:'',
                value1:'',
                pak:false,
                lockYl:'',
                lockSC:[],
                iconYl:'',
                iconSC:[],
                twoYl:'',
                twoSC:[],
                SC:[],
                num:0,
                titName:'',
                tdate:'',
                channel_theme_name:"",
                zyBb:[],
                version:'',
                account:"",
                price:'',
                range:[],
                thid:this.$route.query.thid,
                ch_thid:this.$route.query.ch_thid,
                lockID:"",
                iconID:'',
                twoID:'',
                wpid:'',
                packages:[],
                up:false,
                times:0,
                is_package:false,
                id:"",
                cons:this.$route.query.con,
            }
        },
        mounted(){
            this.getThemeType();
             window.scroll(0, 0);
        },
       
        methods:{
            fh(){
                this.$router.push({
                    path:"./themeCook"
                });
            },
             fhs(){
                this.$router.push({
                    path:"./themeDetails",
                    query:{
                        thid:this.thid,
                        channel:'local',
                        ch_thid:"",
                    },
                });
            },
            getDataDetails(){
                let params={thid:this.$route.query.thid,ch_thid:this.$route.query.ch_thid,channel:this.$route.query.channel};
                this.api.themes_theme_details({params}).then((res)=>{
                    this.attach=res.attach;
                    this.wpid=res.wpid;
                    this.name=res.name;
                    this.note=res.note;
                    this.type=res.type;
                    var arr=[];
                    for(var j=0;j<(res.tags.split(',')).length;j++){
                        for(var i=0;i<this.tag.length;i++){
                            if(this.tag[i].name==(res.tags.split(','))[j]){
                                arr.push((res.tags.split(','))[j])
                                console.log(arr);
                            }
                        }
                    }
                    this.tags=arr;
                    this.content=res.class;
                    this.main_preview=res.main_preview;
                    this.pic=res.previews;
                    this.channel=res.channel;
                    this.version=res.version;
                    this.account=res.account;
                    this.channel_theme_name=res.channel_theme_name;
                    this.price=res.price;
                    this.tdate=res.tdate;
                    this.is_package=res.is_package;
                    this.getsc();
                    this.getUI(res.ui_version);
                    this.getPack();
                })
            },
            getPack(){
                let params={thid:this.$route.query.thid,ch_thid:this.$route.query.ch_thid,channel:this.$route.query.channel};
                this.api.themes_theme_packeges({params}).then((res)=>{
                    for(var i=0;i<res.length;i++){
                        if(res[i].type=='th_lock_screen'){
                            this.lockYl=res[i].main_preview;
                            this.lockSC=res[i].previews;
                            this.SC=res[i].previews;
                            if(this.num==0){
                                this.id=res[i].pkgid
                            }
                        }
                        if(res[i].type=='th_icon'){
                            this.iconYl=res[i].main_preview;
                            this.iconSC=res[i].previews;
                            this.SC=res[i].previews;
                            if(this.num==1){
                                this.id=res[i].pkgid
                            }
                        }
                        if(res[i].type=='th_second_page'){
                            this.twoYl=res[i].main_preview;
                            this.twoSC=res[i].previews;
                            this.SC=res[i].previews;
                            if(this.num==2){
                                this.id=res[i].pkgid
                            }
                        }
                    }
                    // if(this.id!=''){
                    //     this.getDataList();
                    // }

                })
            },
            beforeAvatarUploads(file) {
                this.file = file;
                const isXzip = file.type === 'application/x-zip-compressed';
                const iszip = file.type === 'application/zip';
                const isTheme=((file.name).split('.'))[(file.name).split('.').length-1]==='theme';
                const isGnz=((file.name).split('.'))[(file.name).split('.').length-1]==='gnz';
                const isZmtp=((file.name).split('.'))[(file.name).split('.').length-1]==='zmtp';
                const isHwt=((file.name).split('.'))[(file.name).split('.').length-1]==='hwt';
                if (!(isXzip||iszip||isTheme||isGnz||isZmtp||isHwt)) {
                    this.$message.error('只支持.zip、.theme 、.gnz、 .zmtp、.hwt格式!');
                }
                return isXzip||iszip||isTheme||isGnz||isZmtp||isHwt;
            },
            // getDataList(){
            //     let params={pkgid:this.id};
            //     this.api.themes_package_materials({params}).then((res)=>{
            //         this.SC=res;
            //     })
            // },
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
                let params={thid:this.$route.query.thid,ch_thid:this.$route.query.ch_thid,channel:this.$route.query.channel};
                this.api.themes_theme_materials({params}).then((res)=>{
                    this.SC=res;
                })
            },
            getThemeType(){
                let params={channel:this.channel,ui_version:this.ui_version};
                this.api.themes_config_version({params}).then((res)=>{
                    this.zyBb=res;
                    this.getTagsList()
                })
            },
            dataUp(da1,da2,da3,da4,da5,da6,da7){
            var obj={
                name:da1,
                type:da7,
                attach:da2,
                tags:da3,
                note:da4,
                main_preview:da5,
                previews:da6
            }
            this.packages.push(obj);
            for(var i=0;i<this.packages.length;i++){
                if(this.packages[i].type==da7){
                    this.packages[i]=obj;
                }
            }
                if(da7=='th_lock_screen'){
                        this.lockYl=da5;
                        
                    }
                if(da7=='th_icon'){
                    this.iconYl=da5;
                   
                }
                if(da7=='th_second_page'){
                    this.twoYl=da5;
                   
                }
                
            },
    
            getPak(type){
                if(!this.cons){
                    return
                }
                if((type=='th_lock_screen')&&(this.lockYl!='')){
                    return
                }
                else if(type=='th_lock_screen'){
                    if(!this.channel){
                        this.$message.error('渠道不能为空');
                        return
                    }
                    this.types=type;
                    this.pak=true;
                }
                if((type=='th_icon')&&(this.iconYl!='')){
                    return
                }
                else if(type=='th_icon'){
                    if(!this.channel){
                        this.$message.error('渠道不能为空');
                        return
                    }
                    this.types=type;
                    this.pak=true;
                }
                if((type=='th_second_page')&&(this.twoYl!='')){
                    return
                }
                else if(type=='th_second_page'){
                    if(!this.channel){
                        this.$message.error('渠道不能为空');
                        return
                    }
                    this.types=type;
                    this.pak=true;
                }
            },
            getUP(data){
                this.types=data;
                this.pak=true;
            },
            heidPak(){
                this.pak=false
            },
            getUI(da){
                let params={channel:this.channel};
                this.api.themes_config_channelui({params}).then((res)=>{
                    this.ui=res;
                    if(da!=undefined){
                        this.ui_version=da;
                    }
                })
            },
            Range(){
                this.api.themes_config_account().then((res)=>{
                    this.range=res;

                })
            },
            qd(){
                this.api.themes_config_channel().then((res)=>{
                    this.channels=res;
                    this.Range();
                })
            },
            fm(url){
                this.main_preview=url;
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
            setData(){
                if(!this.channel){
                    this.$message.error('渠道不能为空')
                    return
                }
                if(!this.attach.name){
                    this.$message.error('未上传主题包');
                    return
                }

                if(!this.account){
                    this.$message.error('上架账号不能为空')
                    return
                }
                if(!this.channel_theme_name){
                    this.$message.error('上架名称不能为空')
                    return
                }
                if(!this.tdate){
                    this.$message.error('上架时间不能为空')
                    return
                }
                if(new Date(this.tdate)>new Date()){
                    this.$message.error('上架时间不能大于当前时间');
                    return
                }
                if(!this.note){
                    this.$message.error('备注不能为空')
                    return
                }
                if(!this.main_preview){
                    this.$message.error('封面图不能为空')
                    return
                }
                if(this.price===''){
                    this.$message.error('单价不能为空');
                    return
                }
                if(this.price>99.9){
                    this.$message.error('单价最大为99.9');
                    return
                }
                if(this.price<0){
                    this.$message.error('单价为不小于零的正数');
                    return
                }
                
                    var formData =new FormData;
                    formData.append('thid',this.thid);
                    formData.append('wpid',this.wpid);
                    formData.append('ch_thid',this.ch_thid);
                    formData.append('account',this.account);
                    formData.append('channel',this.channel);
                    formData.append('ui_version',this.ui_version);
                    formData.append('version',this.version);
                    formData.append('price',this.price);
                    formData.append('tdate',this.tdate);
                    formData.append('note',this.note);
                    formData.append('channel_theme_name',this.channel_theme_name);
                    formData.append('tags',this.tags.join(','))
                    formData.append('main_preview',this.main_preview);
                    formData.append('previews',JSON.stringify(this.pic));
                    formData.append('attach',JSON.stringify(this.attach));
                this.api.themes_theme_channel_edit(formData).then((res)=>{
                    this.qx();
                    if(res!=false){
                        this.$router.push({
                            path:'./themeDetailsQd',
                            query:{
                                thid:this.thid,
                                ch_thid:this.ch_thid,
                                channel:this.channel,
                            },
                        })
                    }
                })
            },
            addTheme(){
                if(this.$route.query.con==undefined){
                    this.setData();
                    return
                }
                var arrType=[];
                var strRange= '';
                 if(this.SC.length<2){
                    this.$message.error('相关素材必须有锁屏/图标2种素材类型');
                    return
                }
            
                for(var i=0;i<this.SC.length;i++){
                    arrType.push(this.SC[i].type)
                    if(this.SC[i].type!='th_advertise'){
                        continue;
                    }
                    if(this.SC[i].range == 'all'){
                        continue;
                    }
                    if(!strRange){
                        strRange = this.SC[i].range;
                         continue;
                    }
                    if(strRange != this.SC[i].range){
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
                if(!this.channel){
                    this.$message.error('渠道不能为空')
                    return
                }
                if(!this.ui_version){
                    this.$message.error('渠道版本不能为空')
                    return
                } 
                if(!this.version){
                    this.$message.error('资源版本不能为空')
                    return
                }
                if(!this.account){
                    this.$message.error('上架账号不能为空')
                    return
                }
                if(!this.channel_theme_name){
                    this.$message.error('上架名称不能为空')
                    return
                }
                if(!this.tdate){
                    this.$message.error('上架时间不能为空')
                    return
                }
                if(new Date(this.tdate)>new Date()){
                    this.$message.error('上架时间不能大于当前时间');
                    return
                }
                if(!this.note){
                    this.$message.error('备注不能为空')
                    return
                }
                if(!this.main_preview){
                    this.$message.error('封面图不能为空')
                    return
                }
                if(!this.attach.name){
                    this.$message.error('未上传主题包');
                    return
                }
                if(this.price===''){
                    this.$message.error('单价不能为空');
                    return
                }
                if(this.price>99.9){
                    this.$message.error('单价最大为99.9');
                    return
                }
                if(this.price<0){
                    this.$message.error('单价为不小于零的正数');
                    return
                }
               
                    var formData =new FormData;
                    formData.append('thid',this.thid);
                    formData.append('wpid',this.wpid);
                    formData.append('account',this.account);
                    formData.append('channel',this.channel);
                    formData.append('ui_version',this.ui_version);
                    formData.append('version',this.version);
                    formData.append('price',this.price);
                    formData.append('tdate',this.tdate);
                    formData.append('note',this.note);
                    formData.append('materials',JSON.stringify(this.scID));
                    formData.append('channel_theme_name',this.channel_theme_name);
                    formData.append('is_package','1');
                    formData.append('tags',this.tags.join(','));
                    formData.append('main_preview',this.main_preview);
                    formData.append('previews',JSON.stringify(this.pic));
                    formData.append('attach',JSON.stringify(this.attach));
                    formData.append('packages',JSON.stringify(this.packages));
                this.api.themes_theme_channel_add2(formData).then((res)=>{
                    this.qx();
                    if(res!=false){
                        this.$router.push({
                            path:"./themeDetails",
                            query:{
                                thid:this.thid,
                                channel:'local',
                                ch_thid:"",
                            },
                        })
                    }
                })
            },
            getList(){
                this.SC=[];
                for(var i=0;i<this.scID.length;i++){
                    var params ={thmid:this.scID[i]};
                     this.api.themes_material_details({params}).then((res)=>{
                     this.SC.push(res);
                })
                }
                
               
            },
            Del(index){
                this.scID.splice(index,1);
                this.SC.splice(index,1);
            },
            getTagsList(){
                let params = {material:'2',type:this.$route.query.type,search:this.tagsName,p:500,page:1};
                this.api.tags_search({params}).then((da)=>{
                    this.tag=da.data.self_tags;
                    if(this.$route.query.con==undefined){
                        this.getDataDetails();
                    }
                })
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            getCon(){
                let params={type:this.type};
                this.api.themes_config_theme_class({params}).then((res)=>{
                    this.con=res;
                })
            },
            getThemeType(){
                this.api.themes_config_theme_type().then((res)=>{
                    this.themeType=res;
                    this.getTagsList();
                    this.qd()
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
                if(!this.channel){
                    this.$message.error('渠道不能为空');
                    return
                }
                this.attach={};
                this.up=true;
                this.times=0;
                ++this.fcounter;
                this.scope();
                let formData = new FormData;
                formData.append('file',file.file);
                formData.append('channel',this.channel);
                this.api.themes_theme_upload(formData).then((res)=>{
                    this.attach=res;
                    this.wpid=res.wpid;
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
            Delete(data){
                for(var i=0;i<this.pic.length;i++){
                    if(this.pic[i]==data){
                        this.pic.splice(i,1);
                    }
                }
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
        z-index: 99;
    }
    .new_url{color: rgba(61,73,102,1)!important;}
    .themeUp{
        margin-top: 187px;
    }
    .themeUpLeft{
        display: inline-block;
        width:55%;
        height:1644px;
        background: #fff;
        margin-right: 24px;
    }
    .themeUpLeft>div{margin-bottom: 20px;margin-left: 20px;}
    .themeUpLeft>div>span{
        text-align: right;
        margin-right: 24px;
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:500;
        color:rgba(31,46,77,1);
        width: 120px;
    }
    textarea{
        padding: 10px;
        width:448px;
        height:68px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .themeUpLeft>div>input{
        padding-left: 14px;
        width:390px;
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
        left: 0px;
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
        margin-top: 20px;
        max-width: 650px;
    }
    .img_box1{
        display: inline-block;
        margin-right: 25px;
        width:98px;
        height:98px;
        border:1px solid rgba(211,219,235,1);
        position: relative;
        vertical-align: top;
    }
    .img_box1_imgs{
        max-width:98px;
        max-height:98px;
        position: relative;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
        margin-bottom: 15px
    }
    .del{
        display: inline-block;
        cursor: pointer;
        position: absolute!important;
        top:-10px;
        right: -10px;
    }
    .themeBtn{
        margin-left: 162px!important;
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
    .db{
        display: inline-block;
        position: relative;
        width:189px;
        height:315px;
        margin-right: 20px;
        background:rgba(0,0,0,0.02);
        border:1px dashed rgba(0,0,0,0.15);
    }
    .db>img{
        max-width:189px;
        max-height:315px;}
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

    .left_margin{
        margin-left: 102px;
        margin-top: 24px;
        box-shadow:0px 0px 0px #afafaf!important;
        padding: 0 auto!important;
    }
    .boxShow{
        box-shadow:0px -1px 5px rgb(222, 218, 216);
        border-bottom:transparent!important; ;
    }
    .Tips{color: #ff240e!important;}
     .disab{
        border: 1px solid #e6e9f0;
        color:#e6e9f0
    }
</style>