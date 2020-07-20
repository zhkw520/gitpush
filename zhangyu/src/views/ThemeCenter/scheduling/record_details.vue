<template>
    <div>
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="fh(-2)">排期管理&nbsp;/&nbsp;</span>
                <span class="log_url" @click="fh(-1)">排期详情&nbsp;/&nbsp;</span>
                <span class="new_url">变更记录</span>
            </div>
            <div>
                <span class="topName">变更记录</span>
            </div>
        </div>
        <div class="details">

        </div>
    </div>
</template>

<script>
    export default {
        name: "record_details"
    }
</script>

<style scoped>
    .top{
        width: 100%;
        height:87px;
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
    .titName span{
        display: inline-block;
        margin: 0 0 20px 24px;
    }
    .new_url{
        color: rgba(61,73,102,1)!important;
    }
    .details{
        margin-top: 170px;
        background: #fff;
    }
</style>