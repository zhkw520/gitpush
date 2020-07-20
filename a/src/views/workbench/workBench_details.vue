<template>
    <div class="bg">
        <div class="content">
            <div class="tit">
                <span>素材需求详情</span>
                <img src="../../../public/img/gb.png" @click="heid"/>
            </div>
            <div >
                <span class="tits">素材类型</span>
                <span>场景锁屏</span>
            </div>
            <div >
                <span class="tits">优先级</span>
                <span>场景锁屏</span>
            </div>
            <div >
                <span class="tits">需求数量</span>
                <span>场景锁屏</span>
            </div>
            <div >
                <span class="tits">设计规范</span>
                <span>场景锁屏</span>
            </div>
            <div >
                <span class="tits">截止时间</span>
                <span>场景锁屏</span>
            </div>
            <div >
                <span class="tits">风格</span>
                <span>场景锁屏</span>
            </div>
            <div class="btn">
                <span>点击下载需求附件</span>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "work-bench_details"
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
        left: 50%;
        top:30%;
        transform: translate(-50%,-50%);
        width:840px;
        height:464px;
        background:rgba(255,255,255,1);
        box-shadow:0px 2px 8px 0px rgba(0,0,0,0.2);
        border-radius:4px;
    }
    .content div{
        margin-bottom: 24px;
    }
    .tit{
        height: 56px;
        border-bottom: 1px solid #ddd;
    }
    .tit>span{
        display: inline-block;
        line-height: 56px;
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        margin-left: 24px;
    }
    .tit>img{
        display: inline-block;
        margin-top: 20px;
        width:16px;
        height:16px;
        float: right;
        margin-right: 24px;
        cursor: pointer;
    }
    .tits{
        display: inline-block;
        width: 80px;
        text-align: right;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 22px;
    }
    .btn{
        margin-top: 78px;
        text-align: right;
    }
    .btn span{
        display: inline-block;
        width:152px;
        height:36px;
        line-height: 36px;
        text-align: center;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        margin-right: 44px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        cursor: pointer;
    }

</style>