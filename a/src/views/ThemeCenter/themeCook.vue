<template>
        <div>
            <div class="top_name">
                <div>
                    <span class="theme_name">主题库</span>
                    <span class="top_txt">共</span>
                    <span class="top_txt">{{TotalNum}}</span>
                    <span class="top_txt">套/</span>
                    <span class="top_txt">{{valid_count}}</span>
                    <span class="top_txt">套已上架</span>
                    <span class="tit_right" @click="upTheme()">上传主题</span>
                </div>
            </div>
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


                    <img src="../../../public/img/ss.png" class="img"/>
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
                    <span class='cz' @click='reset()'>重置</span>
                   
                    <span class='screen' @click='unwind()'>更多筛选项
                        <img style="width: 10px;height: 6px" src="../../../public/img/xs.png" v-if="unfold==false"/>
                        <img style="width: 10px;height: 6px" src="../../../public/img/sq.png" v-if="unfold==true"/>
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
                    <span class="unfold" v-if="isType==0" @click="expansion">展开</span>
                    <img style="width: 10px;height: 6px" src="../../../public/img/xs.png" v-if="isType==0"/>
                    <span class="unfold" v-if="isType==1" @click="expansion">收起</span>
                    <img style="width: 10px;height: 6px" src="../../../public/img/sq.png" v-if="isType==1"/>
                </div>

                <div class="polling_tag" style="margin-top:0">
                    <span class="tag_name">运营标签</span>
                    <span class="labelName" @click="getListTags('')" :class="{active:listTagData.length==0}">全部</span>
                    <div class="tags" :class="{ALLtags:class1==true}">
                        <span v-for="(item,index) in self_tags" class="labelName" @click="getListTags(item.desc,index)" :class="{active:listTagData.indexOf(item.desc)!=-1}">{{item.desc}}</span>
                    </div>
                    <span class="unfold" v-if="isTypes==0" @click="expansionTag">展开</span>
                    <img style="width: 10px;height: 6px" src="../../../public/img/xs.png" v-if="isTypes==0"/>
                    <span class="unfold" v-if="isTypes==1" @click="expansionTag">收起</span>
                    <img style="width: 10px;height: 6px" src="../../../public/img/sq.png" v-if="isTypes==1"/>
                </div>

            </div>
            </div>    
            <div style="margin-right: -42px">
                <div class="phone" v-for="(item,index) in this.dataList">
                    <div style="width:100%;height:315px;background:#e3e7eb">
                        <img :src="main_preview[index]" style="max-height: 100%;max-width: 100%;position: relative;top:50%;left:50%;transform: translate(-50%,-50%)" @click="xq(themeChannel[index].channel,item.thid,index,themeChannel[index].channel_name)">
                        <div class="select_type">
                            <!--<span v-if="item.channel_themes.length==0">本地</span>-->
                            <span>{{themeChannel[index].channel_name}}</span>
                            <img src="../../../public/img/zk.png" style="width: 9px;height: 5px" />
                            <div class="select_con">
                                <el-radio-group v-model="radio[index]" class="radio" @change="getDataLists(index)">
                                    <el-radio :label="da.ch_thid" v-for="da in item.channel_themes">{{da.channel_name}}</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                    </div>
                    <div class="bottom_name">
                        <span>{{item.name}}</span>
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
        </div>
</template>

<script>
    export default {
        name: "theme-cook",
        data(){
            return{
                radio:[],
                value1:[],
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
                status:'',
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
                dataList:[],
                themeChannel:[],
                special:'',
                TotalNum:"",
                valid_count:"",
                main_preview:[],
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
                this.getTotal();
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
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
                this.getData()
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.getData()
            },
            reset(){
                this.channel='';
                this.ui_version='';
                this.status='';
                this.special='';
                this.type='';
                this.contemt='';
                this.account='';
                this.value1=[];
                this.result1=[];
                this.result2=[];
                this.result3=[];
                this.result4=[];
            },
            getTagsList(){
                let params = {preset:1,material:2,type:"theme",search:''};
                this.api.tags_search({params}).then((da)=>{
                    this.preset_tags = da.data.self_tags;
                })
            },
            getOperatorTag(){
                this.api.common_operate_tags().then((res)=>{
                    this.self_tags=res;
                })
            },
            getTotal(){
                this.api.themes_theme_count().then((res)=>{
                    this.TotalNum=res.total;
                    this.valid_count=res.valid_count
                })
            },
            getData(){
                if(this.value1){
                     var params={tags:this.listTag.join(','),op_tags:this.listTagData.join(','),channel:this.channel,ui_version:this.ui_version,account:this.account,
                    status:this.status,type:this.type,class:this.contemt,tstart:this.value1[0],tend:this.value1[1],search:this.search,p:this.p,page:this.page,special:this.special,feature_category:(this.result1.concat(this.result2).concat(this.result3).concat(this.result4)).join(',')};
                }else{
                     var params={tags:this.listTag.join(','),op_tags:this.listTagData.join(','),channel:this.channel,ui_version:this.ui_version,account:this.account,
                    status:this.status,type:this.type,class:this.contemt,tstart:'',tend:'',search:this.search,p:this.p,page:this.page,special:this.special,feature_category:(this.result1.concat(this.result2).concat(this.result3).concat(this.result4)).join(',')};
                }
               
                this.api.themes_theme_search({params}).then((res)=>{
                    this.dataList=res.data;
                    var arr={
                        channel_name:'',
                        channel:''
                    };
                    for(var i=0;i<res.data.length;i++){
                        for(var j =0;j<res.data[i].channel_themes.length;j++){
                            if(res.data[i].channel_themes[j].channel==res.data[i].channel){
                                arr.channel=res.data[i].channel_themes[j].channel;
                                arr.channel_name=res.data[i].channel_themes[j].channel_name;
                                this.radio.push(res.data[i].channel_themes[j].ch_thid);
                                this.themeChannel.push(arr);
                                this.main_preview[i]=res.data[i].channel_themes[j].main_preview
                            }
                        }
                    }
                    this.total=res.total;
                    this.getTagsList();
                    this.getOperatorTag();
                })
            },
            getDataLists(index){
                 if(this.value1){
                     var params={tags:this.listTag.join(','),op_tags:this.listTagData.join(','),channel:this.channel,ui_version:this.ui_version,account:this.account,
                    status:this.status,type:this.type,class:this.contemt,tstart:this.value1[0],tend:this.value1[1],search:this.search,p:this.p,page:this.page,special:this.special,feature_category:(this.result1.concat(this.result2).concat(this.result3).concat(this.result4)).join(',')};
                }else{
                     var params={tags:this.listTag.join(','),op_tags:this.listTagData.join(','),channel:this.channel,ui_version:this.ui_version,account:this.account,
                    status:this.status,type:this.type,class:this.contemt,tstart:'',tend:'',search:this.search,p:this.p,page:this.page,special:this.special,feature_category:(this.result1.concat(this.result2).concat(this.result3).concat(this.result4)).join(',')};
                }
                this.api.themes_theme_search({params}).then((res)=>{
                    this.dataList=res.data;
                    var arr={
                        channel_name:'',
                        channel:''
                    };
                    for(var i=0;i<res.data.length;i++){
                        for(var j =0;j<res.data[i].channel_themes.length;j++){
                            if(res.data[i].channel_themes[j].ch_thid==this.radio[index]){
                                arr.channel=res.data[i].channel_themes[j].channel;
                                arr.channel_name=res.data[i].channel_themes[j].channel_name;
                                this.themeChannel[index]=arr;
                                this.main_preview[i]=res.data[i].channel_themes[j].main_preview
                            }
                        }
                    }

                    this.total=res.total;
                    this.getTagsList();
                    this.getOperatorTag();
                })
            },
            getListTag(name){
                if(name==''){
                    this.listTag=[];
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
                this.getData();
            },
            getListTags(name){
                if(name==''){
                    this.listTagData=[];
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
                this.getData()
            },
            themeType(){
                this.api.themes_config_theme_type().then((res)=>{
                    this.theme_type=res;
                    this.content();
                    this.qd();
                })
            },
            getUI(){
                if(this.channel==''){
                    return;
                }
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
                    this.isType=1;
                    this.class0=true
                }else{
                    this.isType=0;
                    this.class0=false
                }

            },
            expansionTag(){
                if(this.isTypes==0){
                    this.isTypes=1;
                    this.class1=true
                }else{
                    this.isTypes=0;
                    this.class1=false
                }

            },
            upTheme(){
                this.$router.push({
                    path:'./themeUp'
                })
            },
            xq(channel,id,index,name){
                var query = {
                    thid:id,
                    channel: channel,
                    ch_thid:this.radio[index],
                    channel_name:name
                };
                if(channel=='local'){
                    this.$router.push({
                        path:'./themeDetails',
                        query:query,
                    })
                }else{
                    this.$router.push({
                        path:'./themeDetailsQd',
                        query:query,
                    })
                }

            },
        },
    }
</script>

<style scoped>
    .top_name{
        width: 100%!important;
        height: 61px!important;
    }
    .theme_name{
        display: inline-block;
        font-size:18px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin: 19px 9px 0 24px;
    }
    .polling{
        margin-top: 150px;
        background: #FFFFFF;
        margin-bottom: 24px;
        position: relative;
    }
    .polling_tag{
        margin:20px 22px 0 24px;
        min-height: 60px;
        border-top: 1px dashed #E6E9F0;
    }
    .tags{
        display: inline-block;
        max-width: 1090px;
        height: 45px;
        overflow: hidden;
        margin-top: 7px;
        margin-bottom: 5px;
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
        margin:22px 20px 32px 24px;
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
        margin-right: 44px;
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
    }
    .bottom_name{
        display: inline-block;
        width:100%;
        height:34px;
        background:rgba(255,255,255,1);
        opacity:1;
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
        position: absolute;
        bottom: 34px;
        left: 0;
        z-index: 7;
        width:100%;
        height:34px;
        background:rgba(10,10,10,1);
        opacity:0.81;
    }
    .phone{
        display: inline-block;
        margin-right: 38px;
        margin-bottom: 30px;
        width: 12%;
        position: relative;
    }
    .phone:nth-child(7n){
         margin-right:0px;
    }
    .phone:hover{
        box-shadow: 3px 3px 5px #e3e7ef;
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
        width:100%;
        min-height:45px;
        background:rgba(28,28,28,1);
        border-radius:0px;
        opacity: 0;
        position: absolute;
        left: 0;
        bottom: 34px;
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
    .cz{
        margin-left: 15px;
        display: inline-block;
        width:68px;
        height:36px;
        border:1px solid rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(51,119,255,1);
        line-height: 36px;
        text-align: center;
        cursor: pointer;
    }
    .more{
        position:absolute;
        top:90px;
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