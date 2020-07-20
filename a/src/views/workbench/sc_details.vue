<template>
    <div>
        <div class="bg" @click=" heid()">
            <div class="AddIMG" @click.stop>
                <div class="AddIMG_tit">
                    <span>素材需求详情</span>
                    <img src="../../../public/img/gb.png"  @click=" heid()"/>
                </div>
                <div>
                    <div>
                        <span class="tit_txt">素材类型</span>
                        <span class="tit_txt_2 ">{{this.list.type_name}}</span>
                    </div>
                    <div >
                        <span class="tit_txt">需求名称</span>
                        <span class="tit_txt_2 ">{{this.list.demand_name}}</span>
                    </div>
                    <div>
                        <span class="tit_txt">优先级</span>
                        <span  class="tit_txt_2 ">{{this.list.priority}}</span>
                    </div>
                    <div>
                        <span class="tit_txt">需求数量</span>
                        <span  class="tit_txt_2 ">{{this.list.num}}</span>
                    </div>
                    <div>
                        <span class="tit_txt">设计规范</span>
                        <span v-if="list.design_standard!=null"  class="tit_txt_2 ">{{this.list.design_standard.name}}</span>
                        <a v-if="list.design_standard!=null" :href="list.design_standard.attach_url" >下载</a>
                    </div>
                    <div>
                        <span class="tit_txt">截止时间</span>
                        <span  class="tit_txt_2 ">{{this.list.endtime}}</span>
                        <span class="surplus_time">(剩余时间:{{this.list.endtime_toast}})</span>
                    </div>
                    <div>
                        <span class="tit_txt">附件</span>
                        <span v-if="!(list.attach)"  class="tit_txt_2 ">无</span>
                        <span v-if="list.attach"  class="tit_txt_2 ">{{this.list.attach.name}}</span>
                        <a v-if="list.attach" :href="list.attach.url" >下载</a>
                    </div>
                    <div>
                        <span class="tit_txt">风格</span>
                        <span v-if="list.ref_url!=''" @click="getIMG" style="color:#3090F0;cursor: pointer ">查看</span>
                        <a v-if="list.ref_url!=''" :href="this.list.ref_url">下载</a>
                        <span v-if="list.ref_url==''"  class="tit_txt_2 ">不限</span>
                    </div>
                    <div>
                        <span class="tit_txt top">设计要求</span>
                        <span v-if="!this.list.require"  class="tit_txt_2 ">不限定风格</span>
                        <div v-if="this.list.require!=null" class="text">{{this.list.require}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg" style="text-align: center" @click=" heidImg()" v-if="img">
            <div style="max-width: 700px" class="images">
                <img :src="this.list.ref_url" style="width: 70%" />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['SCid'],
        name: "work-bench_sc",
        data(){
            return{
                list:{},
                img:false,
            }
        },
        mounted(){
            this. getData()
        },
        methods:{

            heid(){
                this.$parent.heidSC();
            },
            getIMG(){
                this.img = true
            },
            heidImg(){
                this.img = false
            },
            getData(){
                let params ={id:this.SCid};
                this.api.demand_detail({params}).then((res)=>{
                    this.list = res;
                    if(this.list.type_name=='场景锁屏壁纸'){
                        this.list.type_name='杂志锁屏壁纸'
                    }
                    if(this.list.type_name=='场景锁屏动效'){
                        this.list.type_name='杂志锁屏动效'
                    }
                    console.log(res)
                })
            },
        }
    }
</script>

<style scoped>

    a{
        margin-left: 15px;
        font-size:16px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(48,144,240,1);
    }
    a:hover{
        color: #3090F0
    }
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        z-index: 9;
        bottom: 0;
        right: 0;
    }
    .AddIMG{
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
        width:840px;
        max-height:660px;
        background:rgba(255,255,255,1);
        border-radius:4px;
    }
    .AddIMG_tit{
        height: 55px;
        border-bottom: 1px solid #ddd;
    }

    .AddIMG_tit>span{
        display: inline-block;
        text-align: center;
        line-height: 55px;
        margin-left:24px ;
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
    }
    .AddIMG div{
        margin-bottom: 21px;
    }
    .tit_txt{
        display: inline-block;
        width: 100px;
        text-align: right;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(143,155,179,1);
        margin-right: 24px;
    }
    .tit_txt_2{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(31,46,77,1);
    }
    .surplus_time{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color: rgb(187, 187, 191);
    }
    .top{
        vertical-align: top;
    }

    select,input{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        padding-left: 8px;
    }

    .text{
        display: inline-block;
        width:376px;
        height:144px;
        overflow-y: scroll;
        padding: 14px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid #F7F9FC;
        resize:none;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(143,155,179,1);
    }

    .AddIMG_tit img{
        float: right;
        margin-right: 24px;
        width: 16px;
        margin-top: 10px;
        cursor: pointer;
    }
    .images{
        position: relative;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
</style>