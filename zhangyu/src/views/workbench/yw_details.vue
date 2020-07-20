<template>
    <div class="bg">
        <div class="content">
            <div class="box_img" >
                <div>
                    <span>广告位示意图</span>

                </div>
                <img :src="this.list.pos_view_url"/>
            </div>
            <div class="content_txt">
                <div class="title_txt">
                    <span>业务需求详情</span>
                    <img class="img" src="../../../public/img/gb.png"  @click=" heid()"/>
                </div>
                <div class="two">
                    <span class="tit_txt">业务类型</span>
                    <span class="tit_txt_2 logs">{{this.list.type_name}}</span>
                    <span class="tit_txt right" v-if="this.list.type!='f_sls_lockscreen'">广告位类型</span>
                    <span class="tit_txt_2" v-if="this.list.type!='f_sls_lockscreen'">{{this.list.pos_type}}</span>
                </div>
                <div class="two">
                    <span class="tit_txt">需求名称</span>
                    <span class="tit_txt_2 ">{{this.list.demand_name}}</span>
                </div>
                <div class="two">
                    <span class="tit_txt ">尺寸</span>
                    <el-tooltip placement="top" class="tit_txt_2 logs tit_txts">
                        <div slot="content">{{this.list.size}}</div>
                        <span>{{this.list.size}}</span>
                    </el-tooltip>
                    <span class="tit_txt right">优先级</span>
                    <span class="tit_txt_2">{{this.list.priority}}</span>
                </div>
                <div class="two">
                    <span class="tit_txt">需求数量</span>
                    <span class="tit_txt_2 logs">{{this.list.num}}</span>
                    <span class="tit_txt right">实现方式</span>
                    <span class="tit_txt_2">{{this.list.model}}</span>
                </div>
                <div v-if="this.list.type!='f_sls_lockscreen'">
                    <span class="tit_txt">投放链接</span>
                    <!--<span class="tit_txt_2">{{this.list.link}}</span>-->
                    <el-tooltip placement="top" class="tit_txt_2 logs tit_txts">
                        <div slot="content">{{list.link}}</div>
                        <span class="tit_txt_2">{{list.link}}</span>
                    </el-tooltip>
                    <span class="copy" v-clipboard:copy="list.link" v-clipboard:success="onCopy"  v-clipboard:error="onError" v-if="list.link!=''">复制</span>
                </div>
                <div v-if="this.list.type!='f_sls_lockscreen'">
                    <span class="tit_txt ">投放库</span>
                    <span class="tit_txt_2" v-if="this.list.putlib!=null">{{this.list.putlib.name}}</span>
                </div>
                <div class="times">
                    <span class="tit_txt">截止时间</span>
                    <span class="tit_txt_2">{{this.list.endtime}}</span>
                </div>
                <div class="gg">
                    <span class="tit_txt">广告要求</span>
                    <div class="text">{{this.list.require}}</div>
                </div>
                <!--<div class="btn">-->
                    <!--<span @click="heid">返回</span>-->
                <!--</div>-->
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        props:['YWid'],
        name: "work-bench_yw",
        data(){
            return {
                sizeList:[],
                typeList:[],
                YWtypeList:[],
                num:0,
                priority:'',
                type:'',
                endtime:'',
                typeIndex:'',
                pos_type:'',
                size:'',
                model:"",
                link:'',
                requirement:'',
                list:{}
            }
        },
        mounted(){
                this.getData()
        },
        methods:{

            heid(){
                this.$parent.heidYW()
            },
            onCopy() {
                this.$message.success('复制成功')
            },
            onError() {
                this.$message.error('复制失败')
            },
            getData(){
                let params ={id:this.YWid};
                this.api.demand_detail({params}).then((res)=>{
                    this.list = res;
                    console.log(res)
                })
            }
        }
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
        top:40%;
        transform: translate(-50%,-50%);
        border-radius:4px;
        text-align: center;
        background: rgba(0,0,0,0);
    }
    .title_txt{
        height: 56px;
        border-bottom: 1px solid #e2e2e2;
        text-align: left;
    }
    .title_txt>span{
        display: inline-block;
        text-align: center;
        line-height: 56px;
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
    }
    .box_img{
        width:256px;
        height:441px;
        background:rgba(247,249,252,1);
        border-radius:4px;
        margin-right: 24px;
        display: inline-block;
        vertical-align: top;
        padding: 0 20px 20px 20px;
        text-align: center;
    }
    .content_txt{
        width:708px;
        min-height:464px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        display: inline-block;
    }
    .content_txt div{
        margin-bottom: 24px;
        text-align: left;
        margin-left: 20px;
    }
    .box_img div{
        height: 53px;
        text-align: center;
    }
    .box_img span{
        display: inline-block;
        line-height: 53px;
        font-size:16px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
    }
    .box_img img{
        width:256px;
        height:388px;
    }

    .gg>.tit_txt{
        vertical-align: top;
    }
    .tit_txt{
        display: inline-block;
        width: 70px;
        text-align: right;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 24px;
    }


    .text{
        display: inline-block;
        padding: 14px;
        width:486px;
        height:144px;
        overflow-y: scroll;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        resize:none;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(143,155,179,1);
    }
    .btn{
        width:708px;
        height:58px;
        background:rgba(247,249,252,1);
        border-radius:0px 0px 4px 4px;
        margin-left: 0!important;
        margin-bottom: 0!important;
        position:relative;
        bottom: -116px;
        text-align: right!important;
    }
    .btn span{
        display: inline-block;
        text-align: center;
        width:68px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        margin-right: 44px;
        line-height: 36px;
        cursor: pointer;
        margin-top: 10px;
    }
    .tit_txt_2{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        margin-left: 14px;
         width: 200px;
        height: 20px;
        overflow: hidden;
        margin-right: 10px;
        white-space:nowrap;
    }
    .img{
        width: 16px;
        position: relative;
        z-index: 9999;
        bottom: 0;
        right: -548px;
    }
    .copy{
        padding: 2px 5px;
        border:1px solid #3377ff;
        display: inline-block;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        cursor: pointer;
        color: #3377ff;
        line-height: 19px;
    }
</style>