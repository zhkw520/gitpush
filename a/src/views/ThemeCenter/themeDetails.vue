<template>
    <div>
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="fh()">主题库&nbsp;/</span>
                <span class="new_url"> &nbsp;主题详情</span>
            </div>
            <div class="name">
                <span>主题名称:</span>
                <span>{{tableData.name}}</span>
                <div>
                    <span @click="bj()">编辑</span>
                    <a :href="this.tableData.attach.url" class="dowload">下载</a>
                </div>
            </div>
            <div>
                <span class="titName">主题类型:</span>
                <span class="titCon">{{tableData.type_name}}</span>
                <span class="titName" style="width: 20px;margin-right: 15px">ID:</span>
                <span class="titCon">{{tableData.thid}}</span>
                <span class="titName">创建时间:</span>
                <span class="titCon" style="width: 150px;margin-right:0">{{tableData.created_at}}</span>
            </div>
            <div>
                <span class="titName">内容分类:</span>
                <span class="titCon">{{tableData.class_name}}</span>
                <!--<span class="titName">资源版本:</span>-->
                <!--<span class="titCon">{{tableData.ui_version}}</span>-->
                <span class="titName" style="width: 30px;margin-right: 15px">标签</span>
                <div class="tag">
                    <span v-for="item in tags" class="tagName" v-if="item!=''">{{item}}</span>
                    <!--<span class="tagADD">-->
                        <!--<img>-->
                        <!--标签-->
                    <!--</span>-->
                </div>
            </div>
            <div>
                <span class="titName">内容特征:</span>
                <div class='tag'>
                    <span v-for="item in feature_category" class="tagName" v-if="item!=''">{{item}}</span>
                </div>
                <!-- <el-tooltip class="item" effect="dark" placement="right-start">
                    <div slot="content" class="text">
                        <div>
                            <span class='specialName' style="margin-top:21px">色彩</span>
                            <span class='special'>黑色</span>
                            <span class='special'>彩色</span>
                            <span class='special'>蓝色</span>
                            <span class='special'>粉色</span>
                            <span class='special'>紫色</span>
                            <span class='special'>白色</span>
                            <span class='special'>绿色</span>
                            <span class='special'>黄色</span>
                            <span class='special'>红色</span>
                        </div>
                        <div>
                            <span class='specialName'>功能特效</span>
                            <span class='special'>多壁纸</span>
                            <span class='special'>充电特效</span>
                            <span class='special'>动态</span>
                            <span class='special'>跟手动效</span>
                            <span class='special'>锁屏游戏</span>
                            <span class='special'>百变锁屏</span>
                            <span class='special'>声音特效</span>
                            <span class='special'>全景长轴</span>
                            <span class='special'>自定义</span>
                            <span class='special'>重力感应</span>
                        </div>
                        <div>
                            <span class='specialName'>风格</span>
                            <span class='special'>文艺清新</span>
                            <span class='special'>时尚简约</span>
                            <span class='special'>超然个性</span>
                            <span class='special'>质感黑金</span>
                            <span class='special'>古韵金典</span>
                            <span class='special'>热点话题</span>
                            <span class='special'>贱萌可爱</span>
                            <span class='special'>情感</span>
                            <span class='special'>IP形象</span>
                        </div>
                         <div>
                            <span class='specialName'>内容</span>
                            <span class='special'>明星</span>
                            <span class='special'>动物萌宠</span>
                            <span class='special'>卡通动漫</span>
                            <span class='special'>节日</span>
                            <span class='special'>诗与远方</span>
                            <span class='special'>俊男美女</span>
                            <span class='special'>天气</span>
                            <span class='special'>体育运动</span>
                            <span class='special'>花本植物</span>
                            <span class='special'>城市建筑</span>
                            <span class='special'>自然风景</span>
                        </div>
                    </div>
                    <span style="color:#3377FF;cursor: pointer;margin-left:17px;display:inline-block; vertical-align: top;margin-top: 3px;">更多</span>
                </el-tooltip> -->
            </div>
            <div>
                <span class="titName">适用范围:</span>
                <span class="titCon">{{tableData.range}}</span>
            </div>
            <div style="margin-bottom: 24px">
                <span class="titName">主题描述:</span>
                <span class="titCon" style="width: 70%">{{tableData.note}}</span>
            </div>
            <div class="switcher">
                <a href="#tabs0" :class="{click:isType==0}" @click="changeover('0')">预览图</a>
                <a href="#tabs1" :class="{click:isType==1}" @click="changeover('1')">相关主题素材</a>
                <a href="#tabs2" :class="{click:isType==2}" @click="changeover('2')">收益数据</a>
                <a href="#tabs3" :class="{click:isType==3}" @click="changeover('3')">上架记录</a>
                <a href="#tabs4" :class="{click:isType==4}" @click="changeover('4')">相关合同</a>
            </div>
        </div>
        <div style="margin-top: 360px">
            <div class="preview" id="tabs0">
                <div class="titID">
                    <span class="nameID">预览图</span>
                    <span class="derivation">本地</span>
                </div>
                <div class="imgID" v-for="item in tableData.previews" v-if="tableData.previews!=[]">
                    <img :src="item">
                </div>
                <div style="width: 100%;text-align: center" v-if="(tableData.previews)==[]">
                    <img src="../../../public/img/null.png" style="width:48px;margin-top: 150px">
                    <div>
                        <span>暂无数据</span>
                    </div>

                </div>
            </div>
            <div  class="preview" id="tabs1">
                 <div class='line' style="height:24px;width:100%;background:rgba(239,244,248,1)"></div>
                <div class="titID">
                    <span class="nameID">相关主题素材</span>
                    <span class="derivation">本地</span>
                </div>
                <div class="imgID" v-for="item in sc" v-if="sc!=[]">
                    <img :src="item.main_preview">
                    <div class="See" @click="see(item.thmid,item.name)">
                        查看详情
                    </div>
                </div>
               <div style="width: 100%;text-align: center" v-if="sc.length==0">
                   <img src="../../../public/img/null.png" style="width:48px;margin-top: 150px">
                   <div>
                       <span>暂无数据</span>
                   </div>

               </div>
            </div>
            <div class="preview" id="tabs2">
                 <div class='line' style="height:24px;width:100%;background:rgba(239,244,248,1)"></div>
                <div class="titID">
                    <span class="nameID">收益数据</span>
                    <span class="derivation">本地</span>
                    <div class="right">
                        <div class="block">
                            <el-date-picker
                                    v-model="time"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </div>
                        <span class="name_qd">渠道</span>
                        <select>
                            <option value="">全部</option>
                        </select>
                        <span class="cx">查询</span>
                        <span class="cx cxxq">查看详情</span>
                    </div>
                </div>
                <div>
                    <div class="left">
                        <span :class="{earnings_img:isUPload==1}" @click="histogram('1')">下载量</span>
                        <span class="xs" :class="{earnings_img:isUPload==2}" @click="histogram('2')">销售额</span>
                        <div class="left_right">
                            <span :class="{date:isTime=='d'}" @click="dateTime('d')">今天</span>
                            <span  :class="{date:isTime=='w'}" @click="dateTime('w')">本周</span>
                            <span  :class="{date:isTime=='m'}" @click="dateTime('m')">本月</span>
                            <span  :class="{date:isTime=='n'}" @click="dateTime('n')">全年</span>
                            <div class="block block_right">
                                <el-date-picker
                                        v-model="time"
                                        type="daterange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                </el-date-picker>
                            </div>
                        </div>
                    </div>
                    <div class="tendency">
                        <span>下载量趋势</span>
                    </div>
                    <div  >

                    </div>
                </div>
            </div>
            <div  class="preview" id="tabs3">
                 <div class='line' style="height:24px;width:100%;background:rgba(239,244,248,1)"></div>
                <div class="titID">
                    <span class="nameID">上架记录</span>
                    <span class="addJl" @click="jump">添加上架记录</span>
                </div>
                <div>
                    <template>
                        <el-table
                                :data="upList"
                                style="width: 100%">
                            <el-table-column
                                    prop="channel"
                                   >
                                <template slot-scope="scope">
                                    <span>渠道:{{upList[scope.$index].channel_name}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    >
                                <template slot-scope="scope">
                                    <span>上架记录:{{upList[scope.$index].count}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    >
                                <template slot-scope="scope">
                                    <span>最近更新时间:{{upList[scope.$index].updated_at}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                            >
                                <template slot-scope="scope">
                                    <span style="display: inline-block;width: 100%;text-align:right;cursor: pointer" @click="channelDetails(scope.$index)">></span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                    <!--<div style="display: inline-block" v-for="item in upList" >-->
                        <!--<div style="display: inline-block"  class="imgID" v-for="key in item.themes">-->
                            <!--<img :src="key.main_preview">-->
                        <!--</div>-->
                    <!--</div>-->

                </div>

            </div>
            <div  class="preview" id="tabs4">
                 <div class='line' style="height:24px;width:100%;background:rgba(239,244,248,1)"></div>
                <div class="titID">
                    <span class="nameID">相关合同</span>
                    <span class="derivation">本地</span>
                </div>
                <div style="border-bottom: 1px solid #E6E9F0" v-for="item in Contract" v-if="Contract!=[]">
                    <div>
                        <span class="Contract_name">合同名称({{item.contract_id}})</span>
                        <div style="display: inline-block;width: 10px;height: 10px;border-radius: 50%;background: #39BD65" v-if="new Date(item.contract_end_time)>new Date()"></div>
                        <span class="Contract_status"  v-if="new Date(item.contract_end_time)>new Date()">生效中</span>
                        <div style="display: inline-block;width: 10px;height: 10px;border-radius: 50%;background: #F05656"  v-if="new Date(item.contract_end_time)<new Date()"></div>
                        <span class="Contract_status"  v-if="new Date(item.contract_end_time)<new Date()">已过期</span>
                    </div>
                    <div >
                        <span class="Contract_tit">甲方：</span>
                        <span class="Contract_con">{{((item.signatories).split(','))[0]}}</span>
                        <span class="Contract_tit">生效时间：</span>
                        <span class="Contract_con">{{item.contract_start_time}}</span>
                        <span class="Contract_tit">合同文件：</span>
                        <div style="display: inline-block" v-for="da in item.contract_files">
                            <span class="Contract_con">{{da.name}}</span>
                            <a style="font-size:14px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(51,119,255,1);" :href="da.url">下载</a>
                        </div>
                    </div>
                    <div>
                        <span class="Contract_tit">乙方：</span>
                        <span class="Contract_con">{{((item.signatories).split(','))[1]}}</span>
                        <span class="Contract_tit">失效时间：</span>
                        <span class="Contract_con">{{item.contract_end_time}}</span>
                    </div>
                    <div>
                        <span class="Contract_tit">描述</span>
                        <span class="Contract_con">{{item.note}}</span>
                    </div>
                </div>
                <div style="width: 100%;text-align: center" v-if="Contract.length==0">
                    <img src="../../../public/img/null.png" style="width:48px;margin-top: 150px">
                    <div>
                        <span>暂无数据</span>
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
                tableData:{name:'',attach:{url:''}},
                sc:[],
                thid:this.$route.query.thid,
                channel:this.$route.query.channel,
                ch_thid:this.$route.query.ch_thid,
                upList:[],
                Contract:[],
                tags:[],
                feature_category:[],
            }
        },
        mounted(){
            this.getData()
        },
        methods:{
            bj(){
                this.$router.push({
                    path:'./themeUp',
                    query:{
                        thid:this.thid,
                        channel:this.channel,
                        ch_thid:this.ch_thid,
                    }
                })
            },
            see(id,name){
                let Logistics= this.$router.resolve({
                    path:'./themeSc_details',
                    query:{
                        name:name,
                        thmid:id,
                    },
                })
                window.open(Logistics.href);
            },
            channelDetails(index){
                this.$router.push({
                    path:"./themeDetailsQd",
                    query:{
                        thid:this.upList[index].thid,
                        channel:this.upList[index].channel,
                        ch_thid:this.upList[index].ch_thid,
                        channel_name:this.upList[index].channel_name,
                    }
                })
            },
            getsc(){
                let params={thid:this.thid,ch_thid:this.ch_thid,channel:this.channel};
                this.api.themes_theme_materials({params}).then((res)=>{
                    this.sc=res;
                    this.getUp();
                })
            },
            getUp(){
                let params ={thid:this.thid};
                this.api.themes_theme_records({params}).then((res)=>{
                    this.upList=res.channel_themes;
                })
            },
            getContract(){
                let params={thid:this.thid,ch_thid:this.ch_thid,channel:this.channel}
                this.api.themes_theme_contracts({params}).then((res)=>{
                    this.Contract=res;
                })
            },
            getData(){
                let params={thid:this.thid,ch_thid:this.ch_thid,channel:this.channel}
                this.api.themes_theme_details({params}).then((res)=>{
                    this.tableData=res;
                    this.tags=res.tags.split(',');
                    this.feature_category=res.feature_category.split(',')
                    this.getsc();
                    this.getContract();
                })
            },
            fh(){
                this.$router.push({
                    path:"./themeCook"
                });
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
                    path:"./sheleRecord",
                    query:{
                        thid:this.thid,
                        con:'up'
                    }
                })
            },

        },
    }
</script>

<style scoped>
    .top{
        width: 100%;
        min-height: 269px;
        background: rgba(255,255,255,1);
        position: fixed;
        left: 256px;
        top: 64px;
        z-index: 8;
        box-shadow: 0 5px 5px #dfdfdf;
    }
    .tit_top_url{padding-left: 0!important;}
    .new_url{color: rgba(61,73,102,1)!important;}
    .name{
        margin: 24px 0 12px 23px;
    }
    .top>div{
        margin-left: 23px;
        margin-bottom: 12px;
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
    .name>div>span{
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
        display: inline-block;
        line-height: 36px;
        text-align: center;
        cursor: pointer;
        font-size:14px;
        width:68px;
        font-weight:400;
        height:36px;
        color: #fff!important;
        background:rgba(51,119,255,1)!important;
        border: 0!important;
    }
    .titName{
        display: inline-block;
        width:70px;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
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
         max-width: 300px;
        height: 32px;
        overflow: -moz-scrollbars-none;
        -ms-overflow-style: none;
        overflow-y: scroll;
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
        text-align: center;
        line-height: 24px;
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
        padding-bottom: 15px;
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
        margin-bottom: 24px;
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
    .Contract_name{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin: 24px 10px 12px 24px;
    }
    .Contract_status{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(31,46,77,0.45);
        margin-left: 10px;
    }
    .Contract_tit{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(31,46,77,1);
        margin-bottom: 8px;
        margin-left: 24px;
    }
    .Contract_con{
        text-align: left;
        display: inline-block;
        width:150px;
        height:22px;
        font-size:14px;
        font-family:HelveticaNeue;
        color:rgba(31,46,77,0.65);
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
    #tabs0,#tabs1,#tabs2,#tabs3,#tabs4{
        padding-top:330px;
        margin-top:-330px;
    }
    .specialName{
        display: inline-block;
        font-size: 14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,0.5);
        margin: 0px 10px 8px 12px;
    }
    .special{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
        margin-right: 8px;
    }
</style>