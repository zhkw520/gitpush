<template>
    <div>
        <div class="top_name">
            <span class="inner">|</span>
            <span class="top_txt">投放库/投放详情/物料管理</span>
            <div class="fh">
                <img src="../../../public/img/fh.png" style="width: 16px;margin-right: 10px" @click="fh"/>
                <span @click="fh">投放库物料管理</span>
            </div>
            <div class="top_con">
                <input type="text" placeholder="输入ID查询" v-model="search" @input="getDATAlist"/>
                <div class="top_btn">
                    <span class="xq" @click="getDel()">删除</span>
                    <span class="xq" @click="qx()">取消</span>
                </div>
            </div>
        </div>
        <div class="con">
            <div class="box">
                <div class="boxImg" v-for="(DL,index) in IMGList">
                    <div class="border" :class="{active:ind.indexOf(index)!=-1}" @click="ADDclass(index)">
                        <div class="img_box">
                            <img :src="DL.prev_uri" v-if="(DL.prev_uri.split('.'))[(DL.prev_uri.split('.')).length-1]!='mp4'"/>
                            <video :src="DL.prev_uri" controls="controls" v-if="(DL.prev_uri.split('.'))[(DL.prev_uri.split('.').length-1)]=='mp4'"></video>
                        </div>
                    <div class="boxImg_right" >
                        <div class="boxImg_right_1">
                            <div>
                                <span class="boxImg_text">物料ID:</span>
                                <span class="boxImg_content">{{DL.mfid}}</span>
                            </div>
                            <div>
                                <span class="boxImg_text boxImg_bq">标签:</span>
                                <div class="boxImg_xz">
                                    <span class="box_box" v-for="(tag,index2) in DL.self_tags">{{tag}}</span>
                                    <span class="box_box" v-for="(ta,index3) in DL.tags">{{ta}}</span>
                                    <span class="img"  @click="XStag(index)">+ 标签</span>
                                </div>
                            </div>
                            <div>
                                <div class="zt">
                                    <span class="boxImg_text">素材状态:</span>
                                    <span class="boxImg_content">{{DL.status==1201?'禁用':'启用'}}</span>
                                </div>
                                <div class="cc">
                                    <span class="boxImg_text">预览图尺寸:</span>
                                    <span class="boxImg_content">{{DL.size}}</span>
                                </div>
                            </div>
                            <div>
                                <div class="xgsc">
                                    <span class="boxImg_text">相关素材:</span>
                                    <span class="ck" @click="getRel(index)">查看详情</span>
                                </div>
                                <div class="dx">
                                    <span class="boxImg_text">预览图大小:</span>
                                    <span class="boxImg_content" v-if="(DL.attach.size/1024).toFixed(0)>=1&&(DL.attach.size/1024/1024).toFixed(0)<1">{{(DL.attach.size/1024).toFixed(0)}}kb</span>
                                    <span class="boxImg_content" v-if="(DL.attach.size/1024/1024).toFixed(1)>=1&&(DL.attach.size/1024/1024/1024).toFixed(1)<1">{{(DL.attach.size/1024/1024).toFixed(1)}}MB</span>
                                    <span class="boxImg_content" v-if="(DL.attach.size/1024/1024/1024).toFixed(2)>=1">{{(DL.attach.size/1024/1024/1024).toFixed(2)}}GB</span>
                                </div>
                            </div>

                            <div>
                                <span class="boxImg_text">物料使用记录:</span>
                                <span class="ck">查看详情</span>
                            </div>
                            <div>
                                <span class="boxImg_text">动效实现方式:</span>
                                <span class="boxImg_content">{{DL.model}}</span>
                            </div>
                            <div>
                                <span class="boxImg_text">链接:</span>
                                <span class="boxImg_content" style="display: inline-block;max-width: 200px;height: 20px;overflow: hidden">{{DL.link}}</span>
                                <span class="copy" v-clipboard:copy="DL.link" v-clipboard:success="onCopy"   v-clipboard:error="onError" v-if="DL.link!=''">复制</span>
                            </div>
                            <div>
                                <span class="boxImg_text">更新时间:</span>
                                <span class="boxImg_content">{{DL.updated_at}}</span>
                            </div>
                            <div>
                                <span class="boxImg_text">附件:</span>
                                <span class="boxImg_content" v-if="(DL.attach.size/1024).toFixed(0)>=1&&(DL.attach.size/1024/1024).toFixed(0)<1">{{(DL.attach.size/1024).toFixed(0)}}kb</span>
                                <span class="boxImg_content" v-if="(DL.attach.size/1024/1024).toFixed(1)>=1&&(DL.attach.size/1024/1024/1024).toFixed(1)<1">{{(DL.attach.size/1024/1024).toFixed(1)}}MB</span>
                                <span class="boxImg_content" v-if="(DL.attach.size/1024/1024/1024).toFixed(2)>=1">{{(DL.attach.size/1024/1024/1024).toFixed(2)}}GB</span>
                                <a class="dowload">下载</a>
                            </div>
                            <div class="img_right" v-if='ind.indexOf(index)==-1'><img src="../../../public/img/select2.png" style="width: 50px"></div>
                            <div class="img_right" v-if="ind.indexOf(index)!=-1"><img src="../../../public/img/select.png" style="width: 50px"></div>
                        </div>

                    </div>
                        <div class="bjImg" >
                            <span>编辑素材</span>
                        </div>
                </div>
                </div>
            </div>
        </div>
        <div class="bg" v-if="deleted">
            <div class="ensure">
                <div class="title">
                    <span>删除</span>
                    <img src="../../../public/img/gb.png" @click="heidDle()"/>
                </div>
                <div style="margin: 24px 0 0 0 ">
                    <span>
                    确认从该投放库内移除已选中物料吗？
                </span>
                </div>

                <div class="ensure_btn">
                    <span class="ensure_btn_qd" @click="delWL()">确定</span>
                    <span @click="heidDle()">取消</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "details_library",
        data(){
            return{
                IMGList:[],
                ind:[],
                bind_mfid:[],
                search:'',
                deleted:false,
            }
        },
        mounted(){
            this.getDATAlist();
        },
        methods:{
            onCopy() {
                this.$message.success('复制成功')
            },
            onError() {
                this.$message.error('复制失败')
            },
            fh(){
                this.$router.go(-1)
            },
            getDel(){
                this.deleted =true;
            },
            heidDle(){
                this.deleted =false;
            },
            getDATAlist(){
                let params = {id:this.$route.query.id,search:this.search};
                this.api.putlib_binds({params}).then((res)=>{
                    this.IMGList = res;
                    console.log(this.IMGList)
                })
            },
            ADDclass(index){
                if(this.ind.indexOf(index)!=-1){
                  for(var i = 0;i<this.ind.length;i++){
                      if(this.ind[i]==index){
                          this.ind.splice(i,1);
                      }
                  }
                    for(var j=0;j<this.bind_mfid.length;j++){
                        if(this.bind_mfid[j]==this.IMGList[index].mfid){
                            this.bind_mfid.splice(j,1);
                        }
                    }
                }else{
                    this.ind.push(index);
                    this.bind_mfid.push(this.IMGList[index].mfid);
                }

            },
            delWL(){
                if(this.bind_mfid.length==0){
                    this.$message.error('请选择要删除的物料');
                    return
                }
                let formData = new FormData;
                formData.append('id',this.$route.query.id);
                formData.append('bind_mfid',JSON.stringify(this.bind_mfid));
                this.api.putlib_del_mfinal(formData).then((res)=>{
                    this.ind=[];
                    this.bind_mfid=[];
                    this.heidDle();
                    this.getDATAlist();
                })
            },
            qx(){
                this.ind=[];
                this.bind_mfid=[];
                this.fh();
            }
        },
    }
</script>

<style scoped>
    .top_name{
        height: 167px!important;
    }
    .top_name img{
        display: inline-block;
        width:20px;
        margin-left: 24px;
    }
    .top_con{
        margin: 24px 0 0 24px;
    }
    .top_con input{
        width:339px;
        height:36px;
        padding-left: 5px;
        background:rgba(255,255,255,1);
        border-radius:4px 0px 0px 4px;
        border:1px solid rgba(211,219,235,1);
    }
    .top_btn{
        display: inline-block;
        float: right;
        margin-right: 274px
    }
    .top_btn span{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
    }
    .wl{
        width:144px;
        height:36px;
        background:rgba(242,246,252,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 24px;
    }
    .boxImg{
        padding: 0!important;
        width:793px!important;
        height:353px!important;
        margin-right: 13px;
    }
    .border{
        padding:13px 0 14px 14px ;
        width: 98%;
        height: 91%;
        border: 2px solid #ddd;
    }
    .active_class{
        border-color: #1583e2 #1583e2 transparent transparent!important;
    }
    .active{
        border: 2px solid #3377FF!important;
    }
    .xq{
        width:124px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        color:rgba(255,255,255,1);
        margin-right: 20px;
    }
    .gl{
        width:68px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        color:rgba(255,255,255,1) ;
    }
    .img_right{
        display: inline-block;
        width: 0!important;
        height: 0!important;
        position: relative;
        top: -313px;
        right: -452px;
        cursor: pointer;
    }
    .img_right span{
        display: inline-block;
        color: #fff;
        position: relative;
        right: -3px;
        top: -17px;

    }
    .con{
        width: 100%;
        height: 100%;
        margin-top: 251px;
    }
    .boxImg .img_box{
        display: inline-block;
        width:252px;
        height:326px;
        background:#e3e7eb;
        border-radius:4px;
        margin-right: 24px;
        text-align: center;
    }
    .ensure{
        width: 500px;
        height: 200px;
        background:rgba(255,255,255,1);
        border-radius: 10px;
        position: relative;
        padding: 20px;
        top:40%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .ensure span{
        display: block;
        font-size: 18px;
        font-weight: bold;
    }
    .ensure_btn{
        width: 100%;
        position: fixed;
        bottom: 30px;
        text-align: right;
    }
    .ensure_btn span{
        display: inline-block;
        width:68px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        line-height: 36px;
        text-align: center;
        margin-right: 48px;
        cursor: pointer;
    }
    .ensure_btn_qd{
        background:rgba(51,119,255,1)!important;
        color:rgba(255,255,255,1)!important;
        margin-right: 14px!important;
    }
    .ss span{
        float: right;
        display: inline-block;
        width:88px;
        height:36px;
        background:rgba(242,246,252,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(61,73,102,1);
        text-align: center;
        line-height: 36px;
        margin-right: 24px;
        margin-top: 24px;
        cursor: pointer;
    }
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        z-index: 9999;
        bottom: 0;
        right: 0;
    }



    .tit_sm span{
        display: inline-block;
        text-align: center;
        line-height: 56px;
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        margin-left: 24px;
    }
    .tit_sm img {
        width: 16px;
        height: 16px;
        position: relative;
        right: -430px;
        cursor: pointer;
    }
    .tit_txt span{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-left: 52px;
        vertical-align: top;
    }


    .select_btn span,.gfName span{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-left: 24px;
    }
    .select_btn select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-left: 24px;
    }

    .upload_btn span{
        display: inline-block;
        width:68px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        line-height: 36px;
        text-align: center;
        margin-right: 24px;
        cursor: pointer;
    }

    .gfName input{
        width: 192px;
        height: 36px;
        padding-left: 8px;
        background: rgba(255,255,255,1);
        border-radius: 4px;
        border: 1px solid rgba(211,219,235,1);
        margin-left: 24px;
    }
    a{
        color: #3377ff;
        text-decoration:none;
        margin: 0 10px;
    }
    .title{
        height: 56px;
        border-bottom: 1px solid #ddd;
    }
    .title span{
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        line-height: 56px;
    }
    .title img{
        width: 16px;
        height: 16px;
        position: relative;
        right: -485px;
        top: -50px;
    }
    .bjImg, .bjImg span{opacity: 0}
    .ck{cursor: text!important;}
</style>