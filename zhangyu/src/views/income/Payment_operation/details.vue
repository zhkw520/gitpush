<template>
    <div>
       
<<<<<<< HEAD
        <pro v-if='budget' :name='list.check.check1.name' :tstart='list.check.check1.tstart' :tend='list.check.check1.tend'  :is_receiver='0' :fj='fj' :type='type'></pro>
=======
        <pro v-if='budget' :name='list.check.check1.name' :tstart='list.check.check1.tstart' :tend='list.check.check1.tend'   :is_receiver='0' :fj='fj' :type='type'></pro>
>>>>>>> origin/develop
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="jump()">付款结算&nbsp;/</span>
                <span class="new_url">&nbsp;付款结算详情</span>
            </div>
            <div class="title_left">
                <span>付款结算详情</span>
              
            </div>
        </div>
        <div class="tableBox">
            <div style="text-align: center;margin-bottom: 40px;">
              
                <div style="text-align: center;display: inline-block">
                  
                    <span class="boxName">结算信息确认</span>
                </div>
               

            </div>
            <div style="text-align: center" class="fill">
                <div>
                    <span class="fillName">结算单名称</span>
                    <div style="display: inline-block;width: 300px;text-align: left">
                        <span class="text">{{list.check.check1.statement}}</span>
                    </div>

                </div>
                <div>
                    <span class="fillName">结算时间段</span>
                    <div style="display: inline-block;width: 300px;text-align: left">
                        <span  class="text">{{list.check.check1.tstart}}至{{list.check.check1.tend}}</span>
                    </div>

                </div>
                <div v-if='this.list.status>=2'>
                    <span class="fillName">预计结算金额</span>
                    <div style="display: inline-block;width: 300px;text-align: left">
                        <span  class="text">{{list.check.check2.expect_amount}}</span>
                        <span class="click" @click='detail()'>查看预计结算数据</span>
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
    import pro from '../projection'
    export default {
        components:{pro},
        data(){
            return{
                list:{check:{check1:{},check2:{},check3:{}}},
                control:[],
                controlBtn:false,
                msg:false,
                budget:false,
                fj:{},
                type:'yy'
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
                    if (this.control[i].uri_key=='uri.settlement.check.edit') {
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

            fh(num){
                this.$router.go(num)
            },
            change(){
                this.$router.push({
                    path:"./ChangeRecord",
                    query:{
                        id:this.$route.query.id
                    }
                })
            },
             detail(){
                this.budget=true;
            },
            heidDetail(){
                this.budget=false;
            },
            massgae(){this.msg=true},
            heidMassage(){
                this.msg=false
            },
            scope2(){
                if(this.list.status>3){
                    this.$router.push({
                        path:"./DetailsOfCollection2",
                        query:{
                            id:this.$route.query.id,
                        },
                    })
                }

            },
            scope3(){
                if(this.list.status>4){
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
                    path:"./establish",
                    query:{
                        id:this.$route.query.id,
                        step:this.list.status,
                    },
                })
            },
            getData(){
                let params={is_receiver:0,id:this.$route.query.id};
                this.api.settlemanage_detail({params}).then((res)=>{
                    this.list=res;
                     this.fj=res.check.check2;
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
        margin-right: 110px;
    }
    .fill>div{
        margin-bottom: 20px;
    }
    .fillName{
        display: inline-block;
        width:84px;
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