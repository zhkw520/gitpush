<template>
    <div>
        <div class="top_name">
            <div class="tit_top_url">
                <span class="log_url" @click="fh(-2)">广告源列表 &nbsp;/&nbsp;</span>
                <span class="log_url" @click="fh(-1)">广告源详情&nbsp;/&nbsp;</span>
                <span class="log_ur">广告详情</span>
            </div>
            <div class="tit_top_con">
                <span class="tit_name">广告详情</span>
            </div>
        </div>
        <div class="content_table">
            <div style="margin: 0 24px">
                <div>
                    <span style="margin-top: 24px">物料链接：</span>
                    <a :href="this.list.url" target="_blank" class="content_api">{{this.list.url}}</a>
                    <span >获取内容时间：</span>
                    <span class="content_api">{{this.list.created_at}}</span>
                </div>
                <div>
                    <span>sdkID：</span>
                    <span class="content_api">{{this.list.sdkid}}</span>
                    <span>广告主：</span>
                    <span class="content_api">{{this.list.admaster}}</span>
                </div>
                <div>
                    <span>广告类：</span>
                    <span class="content_api">{{this.list.type}}</span>
                </div>
                <div>
                    <span>落地页：</span>
                    <a  :href='this.list.preview_url' target="_blank" style="width: 90%!important;margin-right: 0!important;" class="content_api">{{this.list.preview_url}}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ad_particulars",
        data(){
            return{
                list:{},
            }
        },
        mounted(){
            this.dataList();
        },
        methods:{
            dataList(){
                let params ={adid:this.$route.query.adid}
                this.api.adreview_adver_detail({params}).then((res)=>{
                    this.list=res;
                })
            },
            fh(index){
                this.$router.go(index)
            }
        },
    }
</script>

<style scoped>
    .top_name{
        height: 98px;
    }
    .log_ur{
        font-size:12px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(61,73,102,1);
    }
    .content_table{
        margin-top:186px;
        background: #fff;
        min-height: 730px;
    }
    .content_table span,.content_api{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
        margin-right: 15px;
        width: 100px;
        margin-bottom: 15px;
        overflow: hidden;
    }
    .content_api{
        color:rgba(31,46,77,0.65)!important;
        width: 250px!important;
        margin-right: 185px!important;
    }
</style>