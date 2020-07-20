<template>
    <div>
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="fhs()">预付款管理&nbsp;/&nbsp;</span>
                <span class="log_url" @click="fh()">{{this.$route.query.is_receiver==1?'收款结算预付款详情':'付款结算预付款详情'}}&nbsp;/</span>
                <span class="new_url">&nbsp;预付款改变更新详情</span>
            </div>
        </div>
        <div class="content">
            <div>
                <span class="TitName">类型</span>
                <span class="text">{{list.type==1?'消耗金额':'增加金额'}}</span>
            </div>
            <div>
                <span  class="TitName">消耗金额</span>
                <span class="text">{{list.amount}}</span>
            </div>
            <div>
                <span  class="TitName">备注</span>
                <span class="text">{{list.note}}</span>
            </div>
            <div v-if="list.type==1">
                <span  class="TitName">绑定结算单</span>
                <span class="text">{{list.settle_id}}</span>
                <span class="click" @click="ck()">查看详情</span>
            </div>
            <div v-if="list.type==2">
                <span  class="TitName">附件</span>
                <div style="display: inline-block">
                    <div v-for="item in list.attachs">
                        <span class="text">{{item.name}}</span>
                        <a class="click" target="_blank" :href="item.url">查看</a>
                        <a class="click" :href="item.url">下载</a>
                    </div>
                </div>

            </div>
            <div>
                <span class="boxBtn" @click="jump()">返回</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "change",
        data(){
            return{
                list:{},
            }
        },
        mounted(){this.getData()},
        methods:{
            fh(){
                this.$router.push({
                    path:"./YFdetails",
                    query:{
                        is_receiver:this.$route.query.is_receiver,
                        name:this.$route.query.name,
                    }
                })
            },
            fhs(){
                this.$router.push({
                    path:"./Administration"
                })
            },
            jump(){
                this.$router.go(-1)
            },
            getData(){
                let params={prid:this.$route.query.prid};
                this.api.settle_prepayment_detail({params}).then((res)=>{
                    this.list=res
                })
            },
            ck(){
                if(this.list.is_receiver==1){
                    this.$router.push({
                        path:"../Receivables/DetailsOfCollection",
                        query:{id:this.list.settle_id}

                    })
                }else{
                    this.$router.push({
                        path:"../payment/DetailsOfCollection",
                        query:{id:this.list.settle_id}

                    })
                }
            },
        }
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
        margin-top: 148px;
        background: #fff;
        min-height: 760px;
    }
    .TitName{
        display: inline-block;
        width:96px;
        height:20px;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin: 26px 21px 0 56px;
        text-align: right;
    }
    .text{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(109,119,139,1);
    }
    .click{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(51,119,255,1);
        margin-left: 12px;
        cursor: pointer;
    }
    .boxBtn{
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
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
        margin:28px 0 0 173px;
    }
</style>