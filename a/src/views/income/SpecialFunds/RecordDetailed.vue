<template>
    <div>
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="jump()">特殊款项&nbsp;/</span>
                <span class="log_url" @click="jump1()">特殊款项详情&nbsp;/</span>
                <span class="log_url" @click="jump2()">变更记录&nbsp;/</span>
                <span class="new_url">&nbsp;变更记录详情</span>
            </div>
        </div>
        <div class="content">
            <div>
                <span class="nameTit">结算方</span>
                <span  class="cont">{{data.name}}</span>
            </div>

            <div>
                <span class="nameTit">支出金额</span>
                <span  class="cont">{{data.amount}}</span>
            </div>
            <div>
                <span class="nameTit">状态</span>
                <span  class="cont">{{data.status_name}}</span>
            </div>
            <div>
                <span class="nameTit">备注说明</span>
                <span  class="cont" v-if="data.note!=''">{{data.note}}</span>
                <span  class="cont" v-if="data.note==''">暂无说明</span>
            </div>
            <div>
                <span class="nameTit">附件</span>
                <div style="display: inline-block">
                    <div v-for="item in data.attachs">
                        <span class="cont">{{item.name}}</span>
                        <!--<span class="ck">查看</span>-->
                        <a :href="item.url"  class="xz" target="_blank">下载</a>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "record",
        data(){
            return{
                data:this.$route.query.data,
            }
        },
        methods:{
            jump(){
                this.$router.push({
                    path:"./SpecialFunds_Administration"
                })
            },
            jump1(){
                this.$router.push({
                    path:"./special_edit",
                    query:{
                        smid:this.data.smid
                    }
                })
            },
            jump2(){
                this.$router.push({
                    path:"./Record",
                    query:{
                        smid:this.data.smid
                    }
                })
            },
        },
    }
</script>

<style scoped>
    .top{
        width: 100%;
        height:62px;
        border-top: 1px solid #ededed;
        background: white;
        -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.04);
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.04);
        position: fixed;
        left: 256px;
        top: 63px;
        z-index: 99;
    }
    .new_url{color: rgba(61,73,102,1)!important;}
    .content{
        margin-top: 147px;
        padding-top: 28px;
    }
    .nameTit{
        display: inline-block;
        width:161px;
        height:20px;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        text-align: right;
        margin-bottom: 24px;
        margin-right: 22px;
    }
    .cont{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(31,46,77,1);
    }
    .ck,.xz{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,119,255,1);
        margin-right: 10px;
        cursor: pointer;
    }
    .ck{
        margin-left: 10px;
    }
</style>