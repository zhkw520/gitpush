<template>
    <div>
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="fhs">排期管理 &nbsp;/&nbsp;</span>
                <span class="log_url" @click="fh">主题排期详情 &nbsp;/&nbsp;</span>
                <span class="new_url">添加需求卡片 &nbsp;</span>
            </div>
            <div>
                <span class="topName">添加需求卡片</span>
            </div>
            <div style="margin:12px 0 0 24px">
                <div class="scope1">1</div>
                <div  class="scope2">2</div>
                <span class="selectName">从主题库选择</span>
                <span class="name">制作渠道</span>
                <select  v-model="Makechannel" @change="getData()">
                    <option value="">全部</option>
                    <option :value="item.channel" v-for="item in channels">{{item.channel_name}}</option>
                </select>
                <span class="name">上架账号</span>
                <select v-model="zh">
                    <option value="">请选择</option>
                    <option :value="item.account" v-for="item in range">{{item.account}}</option>
                </select>
                <span class="name">制作类型</span>
                <select v-model="zzType">
                    <option value="">请选择</option>
                    <option value="全局" >全局</option>
                    <option value="桌面" >桌面</option>
                    <option value="翻新" >翻新</option>
                    <option value="锁屏" >锁屏</option>
                    <option value="问题修改" >问题修改</option>
                    <option value="精品全局" >精品全局</option>
                </select>
            </div>
        </div>
        <!-- <div class="polling">
            <div class="polling_tag">
                <span class="tag_name">内容标签</span>
                <span class="labelName"  @click="getListTag()" :class="{active:listTag.length==0}">全部</span>
                <div class="tags" :class="{ALLtags:this.class==true}">
                    <span v-for="(item,index) in preset_tags" class="labelName" @click="getListTag(item.name,index)" :class="{active:listTag.indexOf(item.name)!=-1}">{{item.name}}</span>
                </div>
                <span class="unfold" v-if="isType==0" @click="expansion">展开</span>
                <img style="width: 10px;height: 6px" src="../../../../public/img/xs.png" v-if="isType==0"/>
                <span class="unfold" v-if="isType==1" @click="expansion">收起</span>
                <img style="width: 10px;height: 6px" src="../../../../public/img/sq.png" v-if="isType==1"/>
            </div>
            <div class="polling_tag">
                <span class="tag_name">运营标签</span>
                <span class="labelName" @click="getListTags()" :class="{active:listTagData.length==0}">全部</span>
                <div class="tags" :class="{ALLtags:this.class1==true}">
                    <span v-for="(item,index) in self_tags" class="labelName" @click="getListTags(item.desc,index)" :class="{active:listTagData.indexOf(item.desc)!=-1}">{{item.desc}}</span>
                </div>
                <span class="unfold" v-if="isTypes==0" @click="expansionTag">展开</span>
                <img style="width: 10px;height: 6px" src="../../../../public/img/xs.png" v-if="isTypes==0"/>
                <span class="unfold" v-if="isTypes==1" @click="expansionTag">收起</span>
                <img style="width: 10px;height: 6px" src="../../../../public/img/sq.png" v-if="isTypes==1"/>
            </div>
            <div>
                <el-date-picker
                        class="time"
                        v-model="value1"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                >
                </el-date-picker>
                <span class="tit_name">渠道</span>
                <select style="margin-right: 40px" @change="getUI()" v-model="channel">
                    <option value="">全部</option>
                    <option :value="item.channel" v-for="item in channels">{{item.channel_name}}</option>
                </select>
                <span class="tit_name">厂商UI版本</span>
                <select style="margin-right: 68px" v-model="ui_version">
                    <option value="">全部</option>
                    <option v-for="item in ui" :value="item.version">{{item.version}}</option>
                </select>
                <span class="tit_name">状态</span>
                <select v-model="status">
                    <option>全部</option>
                    <option value="1">已使用</option>
                    <option value="0">未使用</option>
                </select>
            </div>
            <div>
                <img src="../../../../public/img/ss.png" class="img"/>
                <input type="text" placeholder="搜索主题库" v-model="search"/>
                <span class="tit_name">主题类型</span>
                <select style="margin-right: 54px" v-model="type" @change="content()">
                    <option :value="item.type" v-for="item in theme_type">{{item.type}}</option>
                </select>
                <span class="tit_name">内容分类</span>
                <select style="margin-right: 40px" v-model="contemt">
                    <option :value="item.class" v-for="item in cont">{{item.class}}</option>
                </select>
                <span class="tit_name">适用范围</span>
                <select style="margin-right: 24px" v-model="account">
                    <option :value="item.range" v-for="item in range">{{item.range}}</option>
                </select>
                <span class="cx" @click="getData()">查询</span>
            </div>
        </div> -->
            <div class="polling">
                <div>
                     <el-date-picker
                            class="time"
                            v-model="value1"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>


                    <img src="../../../../public/img/ss.png" class="img"/>
                    <input type="text" placeholder="搜索主题库" v-model="search"/>

                    <span class="tit_name" style="width:30px">渠道</span>
                    <select style="margin-right: 44px" @change="getUI()" v-model="channel">
                        <option value="">全部</option>
                        <option :value="item.channel" v-for="item in channels">{{item.channel_name}}</option>
                    </select>
                    <span class="tit_name">定投类型</span>
                    <select v-model="special" style="margin-right: 44px">
                        <option value="2">全部</option>
                        <option value="1">可定投</option>
                        <option value="0">不可定投</option>
                    </select>
                    <span class="cx" @click="getData()">查询</span>
                    <!-- <span class='cz' @click='reset()'>重置</span> -->
                   
                    <span class='screen' @click='unwind()'>更多筛选项
                        <img style="width: 10px;height: 6px" src="../../../../public/img/xs.png" v-if="unfold==false"/>
                        <img style="width: 10px;height: 6px" src="../../../../public/img/sq.png" v-if="unfold==true"/>
                    </span>
                </div>

            </div>
            <div class='more' v-if="unfold">
                 <div>
                    <div style="margin-bottom:16px">
                        <!-- <span class="tit_name">厂商UI版本</span>
                        <select  v-model="ui_version">
                            <option value="">全部</option>
                            <option v-for="item in ui" :value="item.version">{{item.version}}</option>
                        </select> -->
                        <span class="tit_name" style="margin-left:24px">使用范围</span>
                        <select  v-model="account">
                            <option value='all'>不限</option>
                            <option :value="item.account" v-for="item in range">{{item.account}}</option>
                        </select>
                        <span class="tit_name">状态</span>
                        <select v-model="status">
                            <option>全部</option>
                            <option value="1">已使用</option>
                            <option value="0">未使用</option>
                        </select>
                        <span class="tit_name">主题类型</span>
                        <select  v-model="type" @change="content()">
                            <option :value="item.type" v-for="item in theme_type">{{item.type}}</option>
                        </select>
                        <span class="tit_name">内容分类</span>
                        <select v-model="contemt">
                            <option :value="item.class" v-for="item in cont">{{item.class}}</option>
                        </select>
                    </div>
                <div class='tx'>
                    <span class="tit_name" style="margin-left:24px">色彩</span>
                    <template>
                        <el-select v-model="result1" multiple placeholder="请选择">
                            <el-option
                            v-for="item in color"
                            :key="item.category"
                            :label="item.category"
                            :value="item.category">
                            </el-option>
                        </el-select>
                    </template>
                     <span class="tit_name">功能特效</span>
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
                     <span class="tit_name">风格</span>
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
                     <span class="tit_name">内容</span>
                    <template>
                        <el-select v-model="result4" multiple placeholder="请选择">
                            <el-option
                            v-for="item in contents"
                            :key="item.category"
                            :label="item.category"
                            :value="item.category">
                            </el-option>
                        </el-select>
                    </template>
                </div>

                <div class="polling_tag">
                    <span class="tag_name">内容标签</span>
                    <span class="labelName"  @click="getListTag('')" :class="{active:listTag.length==0}">全部</span>
                    <div class="tags" :class="{ALLtags:class0==true}">
                        <span v-for="(item,index) in preset_tags" class="labelName" @click="getListTag(item.name,index)" :class="{active:listTag.indexOf(item.name)!=-1}">{{item.name}}</span>
                    </div>
                    <span class="unfold" v-if="isType==0" @click="expansion()">展开</span>
                    <img style="width: 10px;height: 6px" src="../../../../public/img/xs.png" v-if="isType==0"/>
                    <span class="unfold" v-if="isType==1" @click="expansion()">收起</span>
                    <img style="width: 10px;height: 6px" src="../../../../public/img/sq.png" v-if="isType==1"/>
                </div>

                <div class="polling_tag" style="margin-top:0">
                    <span class="tag_name">运营标签</span>
                    <span class="labelName" @click="getListTags('')" :class="{active:listTagData.length==0}">全部</span>
                    <div class="tags" :class="{ALLtags:class1==true}">
                        <span v-for="(item,index) in self_tags" class="labelName" @click="getListTags(item.desc,index)" :class="{active:listTagData.indexOf(item.desc)!=-1}">{{item.desc}}</span>
                    </div>
                    <span class="unfold" v-if="isTypes==0" @click="expansionTag()">展开</span>
                    <img style="width: 10px;height: 6px" src="../../../../public/img/xs.png" v-if="isTypes==0"/>
                    <span class="unfold" v-if="isTypes==1" @click="expansionTag()">收起</span>
                    <img style="width: 10px;height: 6px" src="../../../../public/img/sq.png" v-if="isTypes==1"/>
                </div>

                </div>
            </div> 
        <div>
            <div class="box">
                <div class="box_img"  v-for="(item,index) in IMGList" @click="clicks(index)">
                    <div class="box_top">
                        <img src="../../../../public/img/select2.png" style="width: 48px;height: 48px;position: relative;right: -141px;z-index: 7" v-if="ind.indexOf(IMGList[index].thid)==-1">
                        <img src="../../../../public/img/select.png" style="width: 48px;height: 48px;position: relative;right: -141px;z-index: 7" v-if="ind.indexOf(IMGList[index].thid)!=-1">
                        <img :src="picture[index]" class="box_top_img">
                    </div>
                    <div class="box_name">
                        <span>{{item.name}}</span>
                    </div>
                </div>
            </div>
        </div>
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
        <div class="NextScope">
           <span class="next" @click="scopeTwo">下一步({{this.ind.length}})</span>
            <span @click="fhs">取消</span>
        </div>
        <div class="bg" v-if="ADDqd">
            <div class="selectQD">
                <div class="Names">
                    <span>选择</span>
                </div>
                <div class="select_cons">
                    <div >
                        <span>渠道</span>
                        <select v-model="ADDchannel" @change="qdName()">
                            <option :value="item.channel" v-for="(item,index) in channelDataList">{{item.channel_name}}</option>
                        </select>
                    </div>
                    <div v-if="ADDchannel!='local'">
                        <span>厂商UI版本</span>
                         <select v-model="ADDui" @change="Ver()">
                            <option v-for="item in channelData" :value="item">{{item}}</option>
                        </select>
                    </div>
                    <div v-if="ADDchannel!='local'">
                        <span>资源版本</span>
                        <select v-model="zyBb">
                            <option v-for="item in uiLIST" :value="item.version">{{item.version}}</option>
                        </select>
                    </div>
                </div>
                <div class="selectBox">
                    <span class="selectBox_qd" @click="setID">确定</span>
                    <span @click="heidTC()">取消</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "theme-cook",
        data(){
            return{
                radio:'',
                value1:[(new Date((new Date()).getTime() - 30*24*60*60*1000)).toLocaleDateString().split('/').join('-'),(new Date()).toLocaleDateString().split('/').join('-')],
                isType:0,
                isTypes:0,
                theme_type:[],
                cont:[],
                range:[],
                channel:'',
                channels:[],
                ui:[],
                ui_version:'',
                account:'',
                contemt:'',
                type:"",
                zh:'',
                Makechannel:'',
                status:'',
                ind:[],
                zzType:'',
                ADDqd:false,
                p:14,
                page:1,
                total:0,
                search:'',
                preset_tags:[],
                self_tags:[],
                listTag:[],
                listTagData:[],
                class0:false,
                class1:false,
                themeChannel:{
                    channel_name:'',
                    channel:''
                },
                IMGList:[],
                ADDchannel:'',
                TCchannel:[],
                zyBb:'',
                ADDui:"",
                index:'',
                ch_thids:[],
                qdList:[],
                channelData:[],
                uiLIST:[],
                picture:[],
                channelDataList:[],
                uiLIST:[],
                channelData:[],

                special:"",
                unfold:false,
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
        mounted(){this.themeType();
            this.getData();
            this.speciality()
        },
        methods:{
             unwind(){
                if(this.unfold==false){
                    this.unfold=true;
                }else{
                    this.unfold=false;
                }
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
                })
            },
            fh(){
                this.$router.go(-1)
            },
            fhs(){
                this.$router.go(-2)
            },
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
                this.getData()
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.getData()
            },
            getTagsList(){
                let params = {preset:1,material:2,type:this.type,search:''};
                this.api.tags_search({params}).then((da)=>{
                    this.preset_tags = da.data.tags;
                })
            },
            getOperatorTag(){
                this.api.common_operate_tags().then((res)=>{
                    this.self_tags=res;
                })
            },
            // qdDataList(){
            //     this.channelData=[];
            //     this.uiLIST=[];
            //     this.ADDui='';
            //     this.zyBb='';
            //     for(var i=0;i<this.TCchannel.length;i++){
            //         if((this.TCchannel[i].channel==this.ADDchannel)&&(this.channelData.indexOf(this.TCchannel[i].ui_version)==-1)){
            //             this.channelData.push(this.TCchannel[i].ui_version);
            //         }
            //     }
            //     for(var i=0;i<this.TCchannel.length;i++){
            //         if((this.TCchannel[i].channel==this.ADDchannel)&&(this.uiLIST.indexOf(this.TCchannel[i].version)==-1)){
            //             this.uiLIST.push(this.TCchannel[i].version);
            //         }
            //     }
            // },
            setID(){
                for(var i=0 ;i<this.TCchannel.length;i++){
                    if(this.TCchannel[i].channel==this.ADDchannel){
                        this.ch_thids.push(this.TCchannel[i].ch_thid);
                        this.qdList.push(this.TCchannel[i].channel_name)
                    }
                }
                if(this.ADDchannel!='local'){
                     for(var j=0;j<this.uiLIST.length;j++){
                        if(this.zyBb==this.uiLIST[j].version){
                            this.picture[this.index]=this.uiLIST[j].main_preview
                        }
                    }
                }else{
                    for(var k=0;k<this.TCchannel.length;k++){
                        if(this.ADDchannel==this.TCchannel[k].channel){
                            this.picture[this.index]=this.TCchannel[k].main_preview
                        }
                    }    
                }
                this.ADDchannel='';
                this.ADDui='';
                this.zyBb='';
                this.channelDataList=[];
                this.channelData=[];
                this.uiLIST=[];
                this.ADDqd=false;
            },
            heidTC(){
                this.ADDqd=false;
                this.ADDchannel='';
                this.ADDui='';
                this.zyBb='';
                for(var i = 0;i<this.ind.length;i++){
                    if(this.ind[i]==this.IMGList[this.index].thid){
                        this.ind.splice(i,1);
                    }
                }
            },
              qdName(){
                this.channelData=[];
                this.ADDui='';
                this.zyBb='';
                for(var i=0;i<this.TCchannel.length;i++){
                    if((this.TCchannel[i].channel==this.ADDchannel)&&(this.channelData.indexOf(this.TCchannel[i].ui_version)==-1)){
                        this.channelData.push(this.TCchannel[i].ui_version);
                    }
                }

            },
            Ver(){
                this.uiLIST=[];
                var uiData=[];
                 for(var i=0;i<this.TCchannel.length;i++){
                    if((this.TCchannel[i].channel==this.ADDchannel)&&(this.TCchannel[i].ui_version==this.ADDui)){
                        if(uiData.indexOf(this.TCchannel[i].version)==-1){
                            uiData.push(this.TCchannel[i].version);
                            this.uiLIST.push(this.TCchannel[i]);
                        }
                        
                    }
                }
            },
            clicks(index){
                 this.channelDataList=[];
                if(this.ind.indexOf(this.IMGList[index].thid)==-1){
                    this.index=index;
                    this.ADDqd=true;
                    this.TCchannel=this.IMGList[index].channel_themes;
                    var channel_number=[];
                    for(var i=0;i<this.TCchannel.length;i++){
                        if(channel_number.indexOf(this.TCchannel[i].channel)==-1){
                            this.channelDataList.push(this.TCchannel[i]);
                            channel_number.push(this.TCchannel[i].channel);
                        }
                    }
                    this.name=this.IMGList[index].name;
                    this.ind.push(this.IMGList[index].thid);

                }else{
                    for(var i = 0;i<this.ind.length;i++){
                        if(this.ind[i]==this.IMGList[index].thid){
                            this.ind.splice(i,1);
                            this.ch_thids.splice(i,1);
                            this.qdList.splice(i,1);
                        }
                    }
                }

            },
            getData(){
                let params ={p:this.p,page:this.page,type:this.type,search:this.search,
                    op_tags:(this.listTagData).join(','),tags:(this.listTag).join(','),status:this.status,
                    class:this.contemt,ui_version:this.ui_version,channel:this.channel,account:this.account,tstart:this.value1[0],tend:this.value1[1],group_channel:1};
                this.api.themes_theme_search({params}).then((res)=>{
                    this.IMGList=res.data;
                    this.picture=[];
                   for(var i=0;i<(res.data).length;i++){
                       this.picture.push(res.data[i].main_preview);
                   }
                    this.total=res.total;
                    this.getTagsList();
                    this.getOperatorTag();
                })
            },
            getListTag(name){
                if(!name){
                    this.listTag=[]
                }else{
                    if(this.listTag.indexOf(name)==-1){
                        this.listTag.push(name);

                    }else{
                        for(var i=0;i<this.listTag.length;i++ ){
                            if(this.listTag[i]==name){
                                this.listTag.splice(i,1);

                            }
                        }
                    }
                }
                this.getList()
            },
            getListTags(name){
                if(!name){
                    this.listTagData=[]
                }
                else{
                    if(this.listTagData.indexOf(name)==-1){
                        this.listTagData.push(name)

                    }else{
                        for(var i=0;i<this.listTagData.length;i++ ){
                            if(this.listTagData[i]==name){
                                this.listTagData.splice(i,1);

                            }
                        }
                    }
                }
                this.getList()
            },
            themeType(){
                this.api.themes_config_theme_type().then((res)=>{
                    this.theme_type=res;
                    this.content();
                    this.qd();
                })
            },
            getThemeType(){
                let params={channel:this.ADDchannel,ui_version:this.ADDui};
                this.api.themes_config_version({params}).then((res)=>{
                    this.zyBb=res;
                })
            },
            getUIs(){
                let params={channel:this.ADDchannel};
                this.api.themes_config_channelui({params}).then((res)=>{
                    this.ui=res;
                })
            },
            getUI(){
                let params={channel:this.channel};
                this.api.themes_config_channelui({params}).then((res)=>{
                    this.ui=res
                })
            },
            qd(){
                this.api.themes_config_channel().then((res)=>{
                    this.channels=res;
                    this.Range()
                })
            },
            content(){
                let params={type:this.type};
                this.api.themes_config_theme_class({params}).then((res)=>{
                    this.cont=res;
                })
            },
            Range(){
                this.api.themes_config_account().then((res)=>{
                    this.range=res;

                })
            },
            expansion(){
                if(this.isType==0){
                    this.isType=1
                    this.class0==true
                }else{
                    this.isType=0
                    this.class0==false
                }

            },
            expansionTag(){
                if(this.isTypes==0){
                    this.isTypes=1
                    this.class1==true
                }else{
                    this.isTypes=0
                    this.class1==false
                }
            },

            scopeTwo(){
                if(!this.Makechannel){
                    this.$message.error('制作渠道不能为空')
                    return
                }
                if(!this.zh){
                    this.$message.error('上架账号不能为空')
                    return
                }
                if(!this.zzType){
                    this.$message.error('制作类型不能为空')
                    return
                }
                if(this.ind==[]){
                    this.$message.error('请选择至少一个主题')
                    return
                }
                    this.$router.push({
                        path:'./select_theme_two',
                        query:{
                            schedule_id:this.$route.query.schedule_id,
                            cycle_id:this.$route.query.cycle_id,
                            Makechannel:this.Makechannel,
                            zh:this.zh,
                            zzType:this.zzType,
                            ind:this.ind,
                            ch_thids:this.ch_thids,
                            qdList:this.qdList,
                            tstart:this.$route.query.tstart,
                            tend:this.$route.query.tend,
                        },
                    })

            },
        },
    }
</script>

<style scoped>
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        z-index: 9;
        bottom: 0;
        right: 0;
    }
    .selectQD{
        width:460px;
        height:312px;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 6px 0px rgba(0,0,0,0.06);
        border-radius:4px;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
        position: absolute;
    }
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
        margin-right: 14px;
    }
    .selectName{
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,0.65);
        margin-left: 14px;
        margin-right: 43px;
    }
    .name{
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(0 0 0 1);
        margin-right: 14px;
    }
   .top select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 24px;
    }
    .polling{
        margin-top: 232px;
        background: #FFFFFF;
    }
    .polling_tag{
        margin-left: 24px;
        height: 60px;
        margin-right: 22px;
        border-bottom: 1px dashed #E6E9F0;
    }
    .tags{
        display: inline-block;
        max-width: 1090px;
        height: 45px;
        overflow: hidden;
        margin-top: 7px;
    }
    .ALLtags{
        height: 100%!important;
    }
    .tag_name{
        display: inline-block;
        line-height: 60px;
        font-size:12px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(143,155,179,1);
        margin-right: 32px;
    }
    .labelName{
        padding: 0 10px;
    }
    .unfold{
        display: inline-block;
        font-size:12px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(121,130,148,1);
        cursor: pointer;
        margin-right: 5px;
    }
    .time{
        margin:16px 40px 16px 24px;
        width:272px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .tit_name{
        display: inline-block;
        margin-right: 14px;
        width:56px;
        height:20px;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        text-align: right;
    }
   
     select,.el-select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 68px;
    }
    .el-select{
         border:0px !important;
    }
    .el-select .el-input__inner{
        border:1px solid rgba(211,219,235,1)!important;
    }
    input{
        margin-left: -5px;
        padding-left: 35px;
        margin-right: 12px;
        width:235px;
        height:32px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .img{
        position: relative;
        left: 35px;
        top: 10px;
    }
    .cx{
        display: inline-block;
        cursor: pointer;
        width:68px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height: 36px;
        text-align: center;
        margin-bottom: 23px;
    }
    .bottom_name{
        display: inline-block;
        width:189px;
        height:34px;
        background:rgba(255,255,255,1);
        opacity:0.8;
    }
    .bottom_name span{
        display: inline-block;
        font-size:12px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
        margin: 9px 0 0 10px;
    }
    .select_type{
        display: inline-block;
        position: relative;
        bottom: 38px;
        left: 0;
        z-index: 999;
        width:189px;
        height:34px;
        background:rgba(10,10,10,1);
        opacity:0.81;
    }
    .phone{
        display: inline-block;
        margin-right: 40px;
    }
   
    .select_type span{
        display: inline-block;
        font-size:12px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(230,233,240,1);
        margin: 9px 8px 0 14px;
    }
    .select_type:hover .select_con{
        opacity: 1;
    }
    .select_con{
        width:189px;
        height:207px;
        background:rgba(28,28,28,1);
        border-radius:4px;
        opacity: 0;
        position: relative;
        left: 0;
        bottom: 233px;
    }
    .select_con input{
        width: 16px;
        height: 16px;
    }
    .radio{margin: 0px 9px}
    .radio .el-radio{
        margin: 16px 3px 0 3px;
    }
    .radio .el-radio__label{
        color: #fff!important;
    }
    .tit_right{
        display: inline-block;
        float: right;
        line-height: 36px;
        text-align: center;
        width:96px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        margin-right: 15%;
        cursor: pointer;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);
        margin-top: 13px;
    }
    .active{
        background:#3377ff!important;
        color: #fff!important;
        border:0!important;
    }
    .box{
        width: 100%;
        overflow-y:auto ;
        height: 452px;
        background: #F5F5F5;
    }
      .box_img:nth-child(7n){
         margin-right:0px;
    }
    .box_img{
        display: inline-block;
        width: 12%;
        height: 349px;
        margin-right: 40px;
        margin-bottom: 20px;
        background: #e3e7ef;
    }
    .box_top{
        width: 189px;
        height: 315px;
    }
    .box_top span{
        display: inline-block;
        width:50px;
        height:24px;
        background:rgba(10,10,10,1);
        opacity:0.81;
        font-size:12px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(230,233,240,1);
        text-align: center;
        line-height: 24px;
        position: relative;
        top:-31px
    }
    .box_top_img{
        max-width: 189px;
        max-height: 315px;
        position: relative;
        top: 36%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .box_name{
        width:189px;
        height:34px;
        background:rgba(255,255,255,1);
        opacity:0.8;
    }
    .box_name span{
        display: inline-block;
        text-align: center;
        line-height: 34px;
        margin-left: 10px;
        font-size:12px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
    }
    .NextScope{
        width:100%;
        height:72px;
        background:rgba(255,255,255,1);
        margin-top: 24px;
    }
    .NextScope span{
        display: inline-block;
        width:68px;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
    }
    .next{
        width:100px!important;
        background:rgba(51,119,255,1)!important;
        border: none!important;
        color:rgba(255,255,255,1)!important;
        margin:15px 14px 0 24px;
    }
    .Names{
        margin: 21px 0 28px 20px;
        font-size:14px;
        font-family:PingFangSC-Medium,PingFangSC;
        font-weight:500;
        color:rgba(31,46,77,1);
    }

    .select_cons  span{
        display: inline-block;
        text-align: right;
        width: 80px;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 14px;
        margin-left: 30px;
    }
    .select_cons select{
        width:272px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-bottom: 20px;
    }
    .selectBox{
        text-align: center;
    }
    .selectBox span{
        display: inline-block;
        cursor: pointer;
        line-height: 36px;
        text-align: center;
        width:80px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
    }
    .selectBox_qd{
        background:rgba(51,119,255,1)!important;
        color: #fff!important;
        border: none!important;
        margin-right: 20px;
    }


     .more{
        position:absolute;
        top:75px;
        background:rgba(255,255,255,1);
        z-index: 8;
        width: 100%;
    }
    .screen{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(51,119,255,1);
        margin-left: 44px;
        cursor: pointer;
    }
</style>