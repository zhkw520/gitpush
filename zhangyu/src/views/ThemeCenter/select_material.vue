<template>
    <div class="bg">
        <div class="content">
            <div class="tit_name">
                <span>从主题素材库选择</span>
            </div>
            <div class="contentImg">
                <div class="Search">
                    <div>
                        <span>主题素材类型</span>
                        <select v-model="type">
                            <option value="">全部</option>
                            <option value="th_lock_screen">锁屏</option>
                            <option value="th_icon">图标</option>
                            <option value="th_second_page">二级页</option>
                             <option value="th_advertise">宣传图</option>
                        </select>
                        <img src="../../../public/img/ss.png" />
                        <input type="text" placeholder="搜索标签或ID" v-model="search" @input="getList()"/>
                        <span>状态</span>
                        <select v-model="status">
                            <option value="">全部</option>
                            <option value="1">已上架</option>
                            <option value="0">未上架</option>
                        </select>
                        <span>使用范围</span>
                        <select v-model="range">
                            <option value="">全部</option>
                            <option v-for="item in con" :value="item.range">{{item.range}}</option>
                        </select>
                        <span class="box_btn" @click="getList()">查询</span>
                    </div>
                </div>
                <div class="label">
                    <span class="label_txt">内容标签:</span>
                    <span class="labelName" @click="getListTag()" :class="{active:listTag.length==0}">全部</span>
                    <div class="tags" :class="{ALLtags:this.class==true}">
                        <span v-for="(item,index) in preset_tags" class="labelName" @click="getListTag(item.name,index)" :class="{active:listTag.indexOf(item.name)!=-1}">{{item.name}}</span>
                    </div>
                    <span class="tagsAll" v-if="this.class==false" @click="getTag">查看更多</span>
                    <span class="tagsAll" v-if="this.class==true" @click="heidTag">收起</span>
                </div>
                <div class="box">
                    <div class="box_img"  v-for="(item,index) in IMGList" @click="clicks(index)">
                        <div class="box_top">
                            <img src="../../../public/img/select2.png" style="width: 48px;height: 48px;position: absolute;right: 0px;z-index: 99" v-if="ind.indexOf(IMGList[index].thmid)==-1">
                            <img src="../../../public/img/select.png" style="width: 48px;height: 48px;position: absolute;right: 0px;z-index: 99" v-if="ind.indexOf(IMGList[index].thmid)!=-1">
                            <img :src="item.main_preview" class="box_top_img">
                        </div>
                        <div class="box_name">
                            <span>{{item.name}}</span>
                        </div>
                    </div>
                </div>
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
                <div class="select_btn">
                    <span class="select_btn_left" @click="messageID">确定</span>
                    <span @click="YCset">取消</span>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "select_material",
        props:['material','typeSC'],
        data(){
            return {
                IMGList:[],
                checked:[],
                radioSize:'',
                pageSize: 6,
                total: 0,
                currentPage: 1,
                preset_tags:[],
                self_tags:[],
                search:'',
                type:'',
                mid_list:[],
                url_list:[],
                inx:null,
                inde:null,
                listData:[],
                class:false,
                class1:false,
                listTag:[],
                listTagData:[],
                search_tags:[],
                time:[],
                channel:[],
                ui:[],
                con:[],
                status:'',
                range:'',
                ind:[],
            }
        },
        mounted() {
            this.getList();
            this.getChannel()
        },
        methods:{
            clicks(index){
                if(this.ind.indexOf(this.IMGList[index].thmid)==-1){
                    this.ind.push(this.IMGList[index].thmid)
                }else{
                    for(var i = 0;i<this.ind.length;i++){
                        if(this.ind[i]==this.IMGList[index].thmid){
                            this.ind.splice(i,1);
                        }
                    }
                }
            },
            getChannel(){
                this.api.themes_config_channel().then((res)=>{
                    this.channel=res;
                    this.getCon();
                })
            },
            getCon(){
                this.api.themes_config_account().then((res)=>{
                    this.con=res;
                })
            },
            getTheme(){
                this.api.themes_config_theme_type().then((res)=>{
                    this.theme=res
                })
            },


            YCset(){this.$parent.setJump()},
            messageID(){
                        this.$emit('linet',this.ind);
                        this. YCset();
            },
            getList(){
                let params ={p:this.pageSize,page:this.currentPage,type:this.type,search:this.search,tags:this.listTag.join(','),status:this.status,range:this.range};
                this.api.themes_material_search({params}).then((res)=>{
                    this.IMGList=res.data;
                    this.total=res.total;
                    this.getTagsList();
                    this.getType();
                })
            },
            getTag(){
                this.class=true;
            },
            heidTag(){
                this.class=false;
            },
            getTag1(){
                this.class1=true;
            },
            heidTag1(){
                this.class1=false;
            },
            getType(){
                let params={material:1};
                this.api.config_material_type({params}).then((res)=>{
                    this.scType=res;
                })
            },
            getTagsList(){
                let params = {preset:1,material:2,type:"theme",search:''};
                this.api.tags_search({params}).then((da)=>{
                    this.preset_tags = da.data.self_tags;
                })
            },
            getListTag(name){
                if(!name){
                    this.listTag.length=0
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
                this.getList();
            },
            handleSizeChange1(pageSize) { // 每页条数切换
                this.pageSize = pageSize;
                this.getList()
            },
            handleCurrentChange1(currentPage) {//页码切换
                this.currentPage = currentPage;
                this.getList()
            },
        },
        watch:{
            'listData':function (val,oldVal) {
                console.log(val);
                console.log(oldVal)
            }
        }
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
    .content{
        position: absolute;
        width:1416px;
        height:780px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        top:-122px;
        left: 50%;
        transform: translateX(-50%);
        overflow-y: auto;
    }
    .tit_name{
        height: 55px;
        border: 1px solid #E6E9F0;
    }
    .tit_name span{
        display: inline-block;
        line-height: 55px;
        margin-left: 24px;
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,0,0,1);
    }

    .top_name>span{
        display: inline-block;

        line-height: 50px;
    }
    .Search{
        margin-left: 0!important;
    }
    .Search span{
        display: inline-block;
        text-align: right;
        font-size:14px;
        margin-right: 10px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
    }
    .Search .el-date-editor{
        margin-right: 29px;
        width: 272px;
    }
    .Search img{
        width: 28px;
        position: relative;
        top: 10px;
        cursor: pointer;
        z-index: 99;
    }
    .Search input {
        position: relative;
        left: -30px;
        width: 232px;
        height: 32px;
        background: white;
        border-radius: 4px;
        border: 1px solid #d3dbeb;
        margin-right: 0px!important;
        margin-top: 0px!important;
    }
    select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin: 16px  20px 0px 0px;
    }
    .label{
        margin-left: 0!important;
    }
    .labelName{
        display: inline-block;
        width:78px;
        height:38px;
        border-radius:5px;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 18px;
        text-align: center;
        line-height: 38px;
        cursor: pointer;
        vertical-align: top;
    }
    .label_txt{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(143,155,179,1);
        margin-right: 16px;
        vertical-align: top;
    }
    .contentImg{
        margin: 0 24px;
    }
    .active{
        background:#3377ff!important;
        color: #fff;
        border:0!important;
    }
    .box{
        width: 100%;
        overflow-y:auto ;
        height: 452px;
        background: #F5F5F5;
    }
    .box_select input{
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 18px;
        margin-left: 0!important;
    }
    .select_btn{
        display: inline-block;
        text-align: right;
        position: fixed;
        bottom: 30px;
        right: 56px;
    }
    .select_btn span{
        display: inline-block;
        width:68px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        line-height: 36px;
        cursor: pointer;
        text-align: center;
    }
    .select_btn_left{
        border: 0!important;
        background:rgba(51,119,255,1)!important;
        color:rgba(255,255,255,1)!important;
        margin-right: 20px;
    }
    .box_btn{
        display: inline-block;
        width:68px!important;
        height:36px!important;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1)!important;
        text-align: center!important;
        line-height: 36px;
        cursor: pointer;
    }
    .block{
        width: 100%;
        height:84px;
        background:rgba(255,255,255,1);
        box-shadow:0px -2px 6px 0px rgba(0,0,0,0.1);
        border-radius:0px 0px 4px 4px;
        margin-bottom: 0;
        position: fixed;
        bottom: 0;
        text-align: left;
    }

    .block .el-pagination{display: inline-block;margin-top: 0;margin-top:15px}
    .tags{
        display: inline-block;
        max-width: 1090px;
        max-height: 50px!important;
        overflow: hidden;
        vertical-align: bottom;
    }
    .ALLtags{
        max-height: 100%!important;
    }
    .tagsAll{
        display: inline-block;
        color:rgba(51,119,255,1);
        cursor: pointer;
        vertical-align: top;
        font-size: 12px;
    }
    .box_img{
        display: inline-block;
        width: 189px;
        height: 349px;
        margin-right: 44px;
        margin-bottom: 20px;
        background: #e3e7ef;
    }
    .box_top{
        position: relative;
        width: 189px;
        height: 315px;
    }
    /*.box_top span{*/
        /*display: inline-block;*/
        /*width:50px;*/
        /*height:24px;*/
        /*background:rgba(10,10,10,1);*/
        /*opacity:0.81;*/
        /*font-size:12px;*/
        /*font-family:PingFangSC-Regular,PingFangSC;*/
        /*font-weight:400;*/
        /*color:rgba(230,233,240,1);*/
        /*text-align: center;*/
        /*line-height: 24px;*/
        /*position: relative;*/
        /*top:-31px*/
    /*}*/
    .box_top_img{
        max-width: 189px;
        max-height: 315px;
        position: relative;
        top: 50%;
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
</style>