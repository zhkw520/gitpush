<template>
    <div>
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="jump()">付款结算&nbsp;/</span>
                <span class="new_url">&nbsp;付款结算详情</span>
            </div>
            <div class="title_left">
                <span>付款结算详情</span>
                <div class="top_btn">
                    <span class="bj" @click="bj()" :class="{Jurisdiction:controlBtn}">编辑</span>
                    <span class="ck" @click="change()">查看变更记录</span>
                </div>
            </div>
        </div>
        <div class="tableBox">
            <div style="text-align: center;margin-bottom: 40px;max-width: 893px;border-bottom: 1px solid #ddd;position: relative;left: 50%;transform: translateX(-50%)">
                <div style="margin-right: 350px;text-align: center;display: inline-block">
                    <div class="box boxs"  @click="scope()">1</div>
                    <span class="boxName" @click="scope()">对账确认</span>
                </div>
                <div style="margin-right: 350px;text-align: center;display: inline-block;border-bottom: 1px solid #3377ff">
                    <div class="box  boxs">2</div>
                    <span class="boxName">票据凭证</span>
                </div>
                <div style="text-align: center;display: inline-block">
                    <div class="box" :class="{boxs:this.status>4}" @click="scope2()">3</div>
                    <span class="boxName" @click="scope2()">结算汇款</span>
                </div>

            </div>
            <div style="text-align: center" class="fill">
                <div>
                    <span class="fillName">物流单号<span style="color: #acadb0">(选填)</span></span>
                    <div style="display: inline-block;width: 300px;text-align: left">
                        <span class="text">{{list.express_id}}</span>
                    </div>

                </div>
                <div>
                    <span class="fillName">备注说明</span>
                    <div style="display: inline-block;width: 300px;text-align: left">
                        <span  class="text">{{list.note}}</span>
                    </div>

                </div>
                <div>
                    <div style="display: inline-block;width: 100px;margin-right: 20px;text-align: right">
                        <span class="fj">票据凭证</span>
                    </div>
                    <div style="display: inline-block;width: 300px;text-align: left">
                        <div v-for="item in list.attachs" style="text-align: left">
                            <el-tooltip placement="top" class="tit_txt_2 logs tit_txts">
                                <div slot="content" class="text">{{item.name}}</div>
                                <span  class="text" style="overflow: hidden;width: 200px;height: 20px;line-height: 28px">{{item.name}}</span>
                            </el-tooltip>
                            <!--<span class="click">查看</span>-->
                            <a class="click" :href="item.url">下载</a>
                        </div>
                    </div>

                </div>
                <div class="fillBtn">
                    <span @click="jump()">返回</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "establish",
        data(){
            return{
                list:{
                    express_id:"",
                    note:"",
                    attachs:[],
                },
                control:[],
                controlBtn:false,
                status:"",
            }
        },
        created(){
            this.getData()
        },
        mounted(){
            this.control=JSON.parse(localStorage.getItem('control'));
            if(this.control.length==0){
                this.controlBtn=true;
            }else {
                for (var i = 0; i < this.control.length; i++) {
                    if (this.control[i].uri_key == 'uri.settlement.invoice.edit') {
                        this.controlBtn = false;
                        return
                    }else{
                        this.controlBtn = true;
                    }
                }
            }
        },
        methods:{
            jump(){
                this.$router.push({
                    path:"./Administration"
                })
            },
            change(){
                this.$router.push({
                    path:"./ChangeRecord",
                    query:{
                        id:this.$route.query.id
                    }
                })
            },
            fh(num){
                this.$router.go(num)
            },

            scope(){
                    this.$router.push({
                        path:"./DetailsOfCollection",
                        query:{
                            id:this.$route.query.id,
                        },
                    })
            },
            scope2(){
                if(this.status>4){
                    this.$router.push({
                        path:"./DetailsOfCollection3",
                        query:{
                            id:this.$route.query.id,
                        },
                    })
                }

            },
            bj(){
                this.$router.push({
                    path:'./establish2',
                    query:{
                        id:this.$route.query.id,
                        spet:this.list.status,
                    },
                })
            },
            getData(){
                let params={is_receiver:0,id:this.$route.query.id};
                this.api.settlemanage_detail({params}).then((res)=>{
                    this.list=res.invoice;
                    this.status=res.status;
                })
            },

        }
    }
</script>

<style scoped>
    .top{
        width: 100%;
        height:98px;
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

    .title_left span{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-left: 24px;
        margin-top: 15px;
        cursor: pointer;
    }
    .tableBox{
        margin-top: 182px;
        background: #fff;
        padding-top:48px ;
    }
    .box{
        width:32px;
        height:32px;
        border-radius: 50%;
        border:1px solid rgba(143,155,179,1);
        text-align: center;
        line-height: 32px;
        font-size:16px;
        font-family:HelveticaNeue;
        color:#8F9BB3;
        margin: 0 0 10px 15px;
        cursor: pointer;
    }
    .boxs{
        background:rgba(0,122,255,1)!important;
        color:rgba(255,255,255,1)!important;
        border: none!important;
    }

    .boxName{
        display: inline-block;
        font-size:16px;
        font-family:PingFangSC-Medium,PingFangSC;
        font-weight:500;
        margin-bottom: 5px;
        color:rgba(31,46,77,1);
        cursor: pointer;
        text-align: left;
    }
    .fill>div{
        margin-bottom: 20px;
    }
    .fillName{
        display: inline-block;
        width:100px;
        height:20px;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 21px;
        text-align: right!important;

    }
    .text{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(109,119,139,1);
        text-align: left;
    }
    .fj{display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
    }

    .fillBtn span{
        display: inline-block;
        text-align: center;
        line-height: 36px;
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
        margin-bottom: 50px;
        margin-right: 110px;
    }
    .click{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(51,119,255,1);
        margin-left: 10px;
        cursor: pointer;
    }
    .top_btn{
        display: inline-block;
        float: right;
        margin-right: 20%;
    }
    .top_btn span{
        display: inline-block;
        line-height: 36px;
        text-align: center;
        cursor: pointer;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        width:68px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);
        margin-top: 0!important;
    }
    .ck{
        width:124px!important;
        margin-left: 24px;
    }
    .Jurisdiction{
        display: none!important;
    }
</style>