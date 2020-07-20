<template>
    <div class="bg">
        <div class="content">
            <div class="cont_left">
                <div class="cont_tit">
                    <span>打包件详情</span>
                </div>
                <div class="cont_box">
                    <img :src="data.main_preview"/>
                </div>
                <div class="tit_name">
                    <span class="tit_name_block">主题名称：</span>
                    <span class="tit_name_con">{{data.name}}</span>
                </div>
                <div class="tit_name">
                    <span class="tit_name_tit">打包件ID：</span>
                    <span class="tit_name_cont">{{data.pkgid}}</span>
                </div>
                <div class="tit_name">
                    <span class="tit_name_tit">附件：</span>
                    <span class="tit_name_cont" v-if="(data.attach.size/1024).toFixed(0)<1">1kb</span>
                    <span class="tit_name_cont" v-if="data.attach.size>1024&&data.attach.size<1024*1024">{{(data.attach.size/1024).toFixed(0)}}kb</span>
                    <span class="tit_name_cont" v-if="data.attach.size>1024*1024&&data.attach.size<1024*1024*1024">{{(data.attach.size/1024/1024).toFixed(1)}}MB</span>
                    <span class="tit_name_cont" v-if="data.attach.size>1024*1024*1024">{{(data.attach.size/1024/1024/1024).toFixed(2)}}GB</span>
                    <a :href="data.attach.url">下载</a>
                </div>
                <div class="tit_name">
                    <span class="tit_name_tit">备注内容：</span>
                    <span class="tit_name_cont">{{data.note}}</span>
                </div>
            </div>
            <div class="cont_right">
                <div class="cont_tit">
                    <span>绑定主题素材</span>
                    <img src="../../../public/img/gb.png" style="width: 16px;float: right;margin-right: 24px;margin-top: 20px;cursor: pointer" @click="gb()">
                </div>
                <div class="cont_box_img" style="height: 650px;overflow-y:auto ">
                    <div class="box_img" v-for="item in data.previews">
                        <div style="display: inline-block;width:189px;height:315px;position: relative">
                            <img :src="item">
                            <div class="dwnload">
                                <a :href="item">下载</a>
                            </div>
                        </div>
                        <div class="id" style="width:189px;height:34px;background:rgba(255,255,255,1);opacity:0.8;">
                            <span>{{data.pkgid}}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:["data"],
        name: "see_pack",
        data(){
            return{}
        },
        methods:{
            gb(){
                this.$parent.gbPack()
            },
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
        width: 1284px;
        height: 707px;
        background: transparent!important;
        -webkit-box-shadow: 0px 1px 6px 0px rgba(0,0,0,0.06);
        box-shadow: 0px 1px 6px 0px rgba(0,0,0,0.06);
        border-radius: 4px;
        position: relative;
        left: 50%;
        top: 30%;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
    }
    .cont_left{
        display: inline-block;
        width:283px;
        height: 707px;
        vertical-align: top;
        margin-right: 12px;
        background: rgba(255,255,255,1);
}
    .cont_right{
        display: inline-block;
        width: 979px;
        height: 707px;
        background: rgba(255,255,255,1);
    }
    .cont_tit{
        height: 56px;
        border-bottom: 1px solid #E6E9F0;
    }
    .cont_tit span{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin: 19px 0 0 24px;
    }
    .tit_name{
        margin: 0 0 12px 24px;
    }
    .cont_box{
        width:189px;
        height:315px;
        margin-left: 24px;
        margin-top: 23px;
    }
    .cont_box img{
        max-width: 100%;
        max-height: 100%;
     }
    .tit_name_block,.tit_name_con{
        font-size:18px;
        font-family:PingFang-SC-Bold,PingFang-SC;
        font-weight:bold;
        color:rgba(31,46,77,1);
    }
    .tit_name_tit,.tit_name_cont{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(31,46,77,1);
    }
    .tit_name a{
        color: #3377ff;
        margin-left: 10px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
    }
    .cont_box_img{
        background: #F5F5F5;
    }
    .box_img{
        margin: 24px;
        height: 349px;
        width:189px
    }
    .box_img img{
        max-width: 100%;
        max-height:100%;
    }
    .dwnload{
        width:189px;
        height:34px;
        background:rgba(10,10,10,1);
        opacity:0.81;
        position: absolute;
        bottom: 0;
        text-align: center;
    }
    .dwnload a{
        font-size:12px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(230,233,240,1);
        line-height: 34px;
    }
    .id span{
        font-size:12px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(31,46,77,1);
        line-height: 34px;
        margin-left: 10px;
    }
</style>