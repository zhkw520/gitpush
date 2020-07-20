<template>
    <div class="bg">
        <DS v-if="msg" :name="list.check.check1.name" :type="type"></DS>
        <pro v-if='budget' :name='list.check.check1.name' :tstart='list.check.check1.tstart' :id="id" :tend='list.check.check1.tend' :is_receiver='this.is_receiver' :a='a' :fj='fj' :projects='list.check.check1.bind_projects_name' :channels='list.check.check1.bind_channel_name'></pro>
        <div class="tableBox">
            <div style="text-align: center;margin-bottom: 40px;max-width: 893px;border-bottom: 1px solid #ddd;position: relative;left: 50%;transform: translateX(-50%)">
                <div style="margin-right: 350px;text-align: center;border-bottom: 1px solid #3377ff;display: inline-block" v-if="userNames&&heid">
                    <div class="box boxs">1</div>
                    <span class="boxName">对账确认</span>
                </div>
                <div style="margin: 0 auto;text-align: center;display: inline-block;border-bottom: 1px solid #3377ff" v-if="!heid">
                    <span class="boxName">对账确认</span>
                </div>
                <div style="margin-right: 350px;text-align: center;display: inline-block" v-if="userNames&&heid">
                    <div class="box" :class="{boxs:list.status>3}" @click="scope()">2</div>
                    <span class="boxName" @click="scope()">票据凭证</span>
                </div>
                <div style="text-align: center;display: inline-block" v-if="userNames&&heid">
                    <div class="box" :class="{boxs:list.status>4}"  @click="scope2()">3</div>
                    <span class="boxName" @click="scope2()">结算汇款</span>
                </div>

            </div>
            <div style="text-align: center" class="fill">
                <div>
                    <span class="fillName">结算单名称</span>
                    <div style="display: inline-block;width: 300px;text-align: left">
                        <span class="text">{{list.check.check1.statement}}</span>
                    </div>

                </div>
                <div v-if="userNames&&heid">
                    <span class="fillName">结算方</span>
                    <div style="display: inline-block;width: 300px;text-align: left">
                        <span  class="text">{{list.check.check1.name}}</span>
                        <span class="click" @click="massgae()">查看结算方信息</span>
                    </div>

                </div>
                <div v-if="is_receiver==1">
                    <span class="fillName">项目</span>
                    <div style="display: inline-block;width: 300px;text-align: left">
                        <span  class="text">{{list.check.check1.bind_projects_name}}</span>
                    </div>

                </div>
                 <div v-if="is_receiver==0">
                    <span class="fillName">渠道</span>
                    <div style="display: inline-block;width: 300px;text-align: left">
                        <span  class="text">{{list.check.check1.bind_channel_name}}</span>
                    </div>

                </div>
                <div>
                    <span class="fillName">结算时间段</span>
                    <div style="display: inline-block;width: 300px;text-align: left">
                        <span  class="text">{{list.check.check1.tstart}}-{{list.check.check1.tend}}</span>
                    </div>

                </div>
                <div v-if="list.status>=2">
                    <span class="fillName">预计结算金额</span>
                    <div style="display: inline-block;width: 300px;text-align: left">
                        <span  class="text">{{list.check.check2.expect_amount}}</span>
                        <span class="click" @click='detail()'>查看预计结算数据</span>
                    </div>

                </div>
                <div v-if="list.status>2 && userNames&&heid">
                    <span class="fillName">实际结算金额</span>
                    <div style="display: inline-block;width: 300px;text-align: left">
                        <span  class="text">{{list.check.check3.real_amount}}</span>
                    </div>

                </div>
                <div v-if="list.status>2 && userNames&&heid">
                    <span class="fillName">备注说明</span>
                    <div style="display: inline-block;width: 300px;text-align: left">
                        <span  class="text">{{list.check.check3.note}}</span>
                    </div>

                </div>
                <div v-if="list.status>2 && userNames&&heid">
                    <div style="display: inline-block;width: 84px;margin-right: 20px;text-align: right">
                        <span class="fj">附件</span>
                    </div>
                    <div style="display: inline-block;width: 300px">
                        <div v-for="item in list.check.check3.attachs" style="text-align: left">
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
                    <!-- <span v-if="this.list.status>3" class="tj">确认提交</span> -->
                    <span @click="fh()">返回</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import DS from '../income/payment/DetailsSettlement'
    import pro from '../income/projection'
    export default {
        components:{DS,pro},
        props:['skID','skType','status','processor'],
        name: "establish",
        data(){
            return{
                list:{check:{check1:{},check2:{},check3:{}}},
                control:[],
                controlBtn:false,
                is_receiver:'',
                type:"",
                msg:false,
                budget:false,
                a:0,
                id:"",
                fj:{},
                purview:[],
                userNames:true,
                isShow: false,
                functionality:[],
                heid:true
            }
        },
        mounted(){
            this.purview=JSON.parse(localStorage.getItem('letNav'));
            for(var i=0;i<this.purview.length;i++){
                if(this.purview[i].title=='收益中心'){
                    var alt1 = this.purview[i].children;
                    for(var k=0;k<alt1.length;k++){
                        if(alt1[k].title=='结算管理'){
                            var alt2=alt1[k].children;   
                            for(var t=0;t<alt2.length;t++){
                                if(alt2[t].url=='/income/Payment_operation/Administration'){      
                                    this.userNames=false;
                                    this.isShow = true;
                                }
                            }
                        }
                    }
                }
            }
            this.functionality=JSON.parse(localStorage.getItem('control'));
            for(var j=0;j<this.functionality.length;j++){
                if(this.functionality[j].uri_key=='uri.settlement.opt.audit.add'){
                    this.heid=false
                }
            }
            this.id=this.skID,
            this.getData();
            this.type=this.skType;
            if(this.skType=='收款结算'){
                    this.is_receiver=1
                }else{
                    this.is_receiver=0
            }
        },
        methods:{
             detail(){
                this.budget=true;
            },
             heidDetail(){
                this.budget=false;
            },
            fh(){
                this.$parent.heidFkCK();
            },
            massgae(){this.msg=true},
            heidMassage(){
                this.msg=false
            },
            scope(){
                if(this.list.status==3){
                    this.add();
                    return
                }
               if(this.list.status>3){
                   this.$parent.heidFkCK();
                   if(this.list.demand_type=='demand_settle_receive'){
                       this.type='收款结算'
                   }else{
                       this.type='付款结算'
                   }
                   this.$parent.getCK(this.list.id,this.type,'4',this.processor);
               }
            },
            add(){
                if((this.processor).indexOf(localStorage.getItem('userName'))!=-1){
                     this.$parent.heidFkCK();
                     this.$parent.ADDscope(this.skID,this.skType,4)
                }
            },
            add2(){
                if((this.processor).indexOf(localStorage.getItem('userName'))!=-1){
                    this.$parent.heidFkCK();
                    this.$parent.ADDRemit(this.skID,this.skType,5)
                }
            },
            scope2(){
                if(this.list.status==4){
                    this.add2();
                    return
                }
                if(this.list.status>4){
                    this.$parent.heidFkCK();
                    if(this.list.demand_type=='demand_settle_receive'){
                        this.type='收款结算'
                    }else{
                        this.type='付款结算'
                    }
                    this.$parent.getCK(this.list.id,this.type,'5',this.processor);
                }
            },
            getData(){
                if(this.skType=='收款结算'){
                    this.is_receiver=1
                }else{
                    this.is_receiver=0
                }
                let params={is_receiver:this.is_receiver,id:this.skID};
                this.api.settlemanage_detail({params}).then((res)=>{
                    this.list=res;
                     this.fj=res.check.check2;
                })
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
    z-index: 999;
    bottom: 0;
    right: 0;
}
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
        position: absolute;
        left: 50%;
        top: 40%;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        border-radius: 4px;
        text-align: center;
        background: rgba(0,0,0,0);
        background: #fff;
        padding-top:48px ;
        width: 1020px;
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
        display: none;
    }
    .tj{
        color: #fff!important;
        background: #3377ff!important;
        border: none!important;
        margin-right: 20px;
        margin-bottom: 50px;
    }
</style>