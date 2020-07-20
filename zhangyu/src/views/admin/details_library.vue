<template>
    <div>
        <div class="top_name">
            <span class="inner">|</span>
            <span class="top_txt">投放库/投放详情页</span>
            <div class="fh">
                <img src="../../../public/img/fh.png" style="width: 16px;margin-right: 10px;cursor: pointer" @click="fh"/>
                <span @click="fh">投放库详情</span>
            </div>
            <div class="top_con">
                <input type="text" placeholder="输入物料ID快速查询" v-model="search" @input="getDATAlist()"/>
                <div class="top_btn">
                    <span class="wl" @click="getWl">从物料库添加</span>
                    <span class="xq" @click="Addyw">发布业务需求</span>
                    <span class="gl" @click="ment">管理</span>
                </div>
            </div>
        </div>
        <div class="con">
            <div class="box">
                <div class="boxImg" v-for="(DL,index) in IMGList">
                    <div class="img_box">
                        <img :src="DL.prev_uri" v-if="(DL.prev_uri.split('.'))[(DL.prev_uri.split('.')).length-1]!='mp4'"/>
                        <video :src="DL.prev_uri" controls="controls" v-if="(DL.prev_uri.split('.'))[(DL.prev_uri.split('.')).length-1]=='mp4'"/>
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
                                    <div class="boxImg_xz_yz">
                                        <span class="box_box" v-for="(tag,index2) in DL.self_tags" v-if="tag!=''">{{tag}}</span>
                                        <span class="box_box" v-for="(ta,index3) in DL.tags" v-if="ta!=''">{{ta}}</span>
                                    </div>
                                    <span class="img"  @click="XStag(index)">+ 标签</span>
                                </div>
                            </div>
                            <div>
                                <div class="zt">
                                    <span class="boxImg_text">物料状态:</span>
                                    <span class="boxImg_content">{{DL.status}}</span>
                                </div>
                                <div class="cc">
                                    <span class="boxImg_text">预览图尺寸:</span>
                                    <span class="boxImg_content">{{DL.size}}</span>
                                </div>
                            </div>
                            <div>
                                <div class="xgsc">
                                    <span class="boxImg_text">相关素材:</span>
                                    <span class="ck" >查看详情</span>
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
                                <a class="dowload" :href="DL.attach.url">下载</a>
                            </div>
                        </div>
                    </div>
                    <div class="bjImg" >
                        <span>编辑素材</span>
                    </div>
                </div>
            </div>
        </div>
        <rel v-if="getRe" :num="num" :material="material" ></rel>
        <YW v-if="yw"></YW>
        <AM v-if ='am' @listenToChildEvent="listenToChildEvent" :typeName="typeName" :size="size"></AM>
        <am v-if="sc" :message="message" :hqUrl="hqUrl" :bindMid="bindMid" :material="material" :types="type"></am>
    </div>
</template>

<script>
    import am from './AddMaterial'
    import rel from './relevant_matreial'
    import YW from './Add_business'
    import AM from './Add_material'
    export default {
        components:{YW,AM,rel,am},
        name: "details_library",
        data(){
            return{
                IMGList:[],
                yw:false,
                am:false,
                getRe:false,
                num:'',
                bind_id:[],
                sc:false,
                search:'',
                typeName:'',
                size:this.$route.query.size
            }
        },
        mounted(){
            this.getDATAlist();
            this.typeName=this.$route.query.type;
        },
        methods:{
            fh(){
                this.$router.go(-1)
            },
            onCopy() {
                this.$message.success('复制成功')
            },
            onError() {
                this.$message.error('复制失败')
            },
            getDATAlist(){
                let params = {id:this.$route.query.id,search:this.search};
                this.api.putlib_binds({params}).then((res)=>{
                    this.IMGList = res;
                    for(let i =0;i<this.IMGList.length;i++){
                        if(this.IMGList[i].status=='1101'){
                            this.IMGList[i].status='使用中'
                        }
                        if(this.IMGList[i].status=='1001'){
                            this.IMGList[i].status='未使用'
                        }
                        if(this.IMGList[i].status=='1201'){
                            this.IMGList[i].status='禁用'
                        }
                    }

                })
            },
            getCon(){
                this.sc = true;
                this.message=''
                this.stop()
            },
            SCsc(){
                this.sc = true
                this.stop()
            },

            heidSc(){
                this.sc = false;
                this.move()
            },
            getRel(index){
                this.getRe=true;
                this.num =this.IMGList[index].mfid;
                this.stop()
            },
            heidRel(){
                this.getRe=false;
                this.move()
            },
            getWl(){
                this.am = true;
                this.stop()
            },
            heidWL(){
                this.am = false;
                this.move()
            },
            Addyw(){
                this.yw = true;
                this.stop()
            },
            heidYW(){
                this.yw = false;
                this.move()
            },
            listenToChildEvent(a){
                this.bind_id = a;
               let formData = new FormData;
                formData.append('id',this.$route.query.id);
                formData.append('bind_mfid',JSON.stringify(this.bind_id));
                this.api.putlib_add_mfinal(formData).then((res)=>{
                    this.getDATAlist();
                })
            },
            // getLt(a){
            //     let params ={p:this.pageSize,page:this.currentPage,type:this.type,search:this.search};
            //     this.api.mfinal_search({params}).then((res)=>{
            //         this.IMGList=res.data;
            //         for(let i =0;i<this.IMGList.length;i++){
            //             if(this.IMGList[i].status=='1101'){
            //                 this.IMGList[i].status='使用中'
            //             }
            //             if(this.IMGList[i].status=='1001'){
            //                 this.IMGList[i].status='未使用'
            //             }
            //             if(this.IMGList[i].status=='1201'){
            //                 this.IMGList[i].status='禁用'
            //             }
            //         }
            //         if(a!=undefined){
            //             this.message = res.data[a];
            //             this.sc = true;
            //             this.stop()
            //         }
            //     })
            // },
            stop(){
                document.body.style.overflow='hidden';
                document.body.style.position='fixed';
                document.body.style.width='100%';
            },
            move(){
                document.body.style.overflow='';//出现滚动条
                document.body.style.position='initial';
                document.body.style.height='1006px';
            },
            ment(){
                this.$router.push({
                    query:{
                        id:this.$route.query.id
                    },
                    path:'/admin/mangement'
                })
            },
        }
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
    .con{
        width: 100%;
        height: 100%;
        margin-top: 251px;
    }
    .bjImg, .bjImg span{opacity: 0}
    .ck{cursor: text!important;}
</style>