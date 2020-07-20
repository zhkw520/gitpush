<template>
    <div>
        <div class="top_name">
            <span class="top_txt">设计师结算/查看提现详情</span>
            <div class="title_left" @click="fh">
                <img src="../../../public/img/fh.png">
                <span>查看提现详情</span>
            </div>
        </div>
        <div class="content">
            <div>
                <span class="tit">提现ID</span>
                <span class="tit_right">{{list.apply_id}}</span>
            </div>
            <div>
                <span class="tit">提现用户昵称</span>
                <span class="tit_right">{{list.account_name}}</span>
            </div>
            <div>
                <span class="tit">提现金额</span>
                <span class="tit_right">{{'￥'+list.cash_money}}</span>
            </div>
            <div>
                <span class="tit">账号主体</span>
                <span class="tit_right">{{list.contributor_type==1?'个人':'公司'}}</span>
            </div>
            <div>
                <span class="tit">收款账户名称</span>
                <span class="tit_right">{{list.account_name}}</span>
            </div>
            <div>
                <span class="tit">身份证号</span>
                <span class="tit_right">{{list.id_card}}</span>
            </div>
            <div>
                <span class="tit">银行卡号</span>
                <span class="tit_right">{{list.bank_card_id}}</span>
            </div>
            <div>
                <span class="tit">开户银行</span>
                <span class="tit_right">{{list.bank_name}}</span>
            </div>
            <div>
                <span class="tit">开户支行</span>
                <span class="tit_right">{{list.bank_subbranch}}</span>
            </div>
            <div>
                <span class="tit">银行预留手机号</span>
                <span class="tit_right">{{list.reserve_phone}}</span>
            </div>
            <div>
                <span class="tit">状态</span>
                <span class="tit_right">{{list.isfinish==0?'待处理':tableData[scope.$index].isfinish==1?'已通过':'已驳回'}}</span>
            </div>
            <div>
                <span class="tit">申请时间</span>
                <span class="tit_right">{{list.created_at}}</span>
            </div>
            <div>
                <span class="tit">处理时间</span>
                <span class="tit_right">{{list.updated_at}}</span>
            </div>
            <div>
                <span class="tit">相关合同</span>
                <span></span>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "money_details",
        data(){
            return{
                list:this.$route.query.data,
            }
        },
        methods:{
            fh(){
                this.$router.go(-1)
            },
        }
    }
</script>

<style scoped>
.top_name{
    height:113px!important;
    background:rgba(255,255,255,1);
}
.title_left,.top_txt{
    margin-left: 24px;
    cursor: pointer;
}
.top_txt{
    font-size: 12px!important;
}
.title_left img{
    width: 12px;
}
.title_left span{
    display: inline-block;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(51,119,255,1);
    margin-left: 8px;
}
    .content div{
        margin-left: 24px;
    }
    .content{
        margin-top: 197px!important;
        height:754px!important;
    }
    .tit{
        display: inline-block;
        width: 112px;
        text-align: right;
        margin: 24px 24px 0px 0;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(143,155,179,1);
    }
    .tit_right{
        display: inline-block;
        text-align: left;
        margin: 24px 24px 0px 0;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);

    }
</style>