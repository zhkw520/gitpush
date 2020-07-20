<template>
    <div>
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="jump()">收款结算&nbsp;/</span>
                <span class="log_url" @click="jump1()">收款结算详情&nbsp;/</span>
                <span class="log_url" @click="jump2()">变更记录&nbsp;/</span>
                <span class="new_url">&nbsp;变更记录详情</span>
            </div>
        </div>
        <div class="content">
            <div v-if="data.status==1">
                <span class="nameTit">结算方名称</span>
                <span class="cont">{{data.check.statement}}</span>
            </div>
            <div v-if="data.status==1">
                <span class="nameTit">结算方</span>
                <span  class="cont">{{data.check.name}}</span>
            </div>
            <div v-if="data.status==1">
                <span class="nameTit">结算时间段</span>
                <span  class="cont">{{data.check.tstart}}至{{data.check.tend}}</span>
            </div>
            <div v-if="data.status==1">
                <span class="nameTit">预计结算金额</span>
                <span  class="cont">{{data.check.expect_amount}}</span>
            </div>
            <div v-if="data.status==1">
                <span class="nameTit">实际结算金额</span>
                <span  class="cont">{{data.check.real_amount}}</span>
            </div>
            <div v-if="data.status==1">
                <span class="nameTit">备注说明</span>
                <span  class="cont">{{data.check.note}}</span>
            </div>
            <div v-if="data.status==1">
                <span class="nameTit">附件</span>
                <div style="display: inline-block">
                    <div v-for="item in data.history_attachs">
                        <span  class="cont">{{item.name}}</span>
                        <!--<span class="ck">查看</span>-->
                        <a :href="item.url" class="xz">下载</a>
                    </div>
                </div>
            </div>
            <div v-if="data.status==2">
                <span class="nameTit">物流账单号</span>
                <span  class="cont">{{data.invoice.express_id}}</span>
            </div>
            <div v-if="data.status==2">
                <span class="nameTit">备注说明</span>
                <span  class="cont">{{data.invoice.note}}</span>
            </div>
            <div v-if="data.status==2">
                <span class="nameTit">附件</span>
                <div style="display: inline-block">
                    <div v-for="item in data.history_attachs">
                        <span  class="cont">{{item.name}}</span>
                        <!--<span class="ck">查看</span>-->
                        <a :href="item.url" class="xz">下载</a>
                    </div>
                </div>
            </div>
            <div v-if="data.status==3">
                <span class="nameTit">实际到账金额</span>
                <span  class="cont">{{data.remit.receive_amount}}</span>
            </div>
            <div v-if="data.status==3">
                <span class="nameTit">到账时间</span>
                <span  class="cont">{{data.remit.receive_tdate}}</span>
            </div>
            <div v-if="data.status==3">
                <span class="nameTit">备注说明</span>
                <span  class="cont">{{data.remit.note}}</span>
            </div>
            <div v-if="data.status==3">
                <span class="nameTit">附件</span>
                <div style="display: inline-block">
                    <div v-for="item in data.history_attachs">
                        <span  class="cont">{{item.name}}</span>
                        <!--<span class="ck">查看</span>-->
                        <a :href="item.url" class="xz">下载</a>
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
                    path:"./Administration"
                })
            },
            jump1(){
                this.$router.push({
                    path:"./DetailsOfCollection",
                    query:{
                        id:this.$route.query.id
                    }
                })
            },
            jump2(){
                this.$router.push({
                    path:"./ChangeRecord",
                    query:{
                        id:this.$route.query.id
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