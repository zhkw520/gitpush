
<template>
<div>
    <div class="top_name">
            <div class="tit_top_url">
                <span class="log_url" @click="fh(-1)">杂志锁屏推送 &nbsp;/&nbsp;</span>
                <span class="log_url" @click="fh(-1)"> 推送审核内容管理 &nbsp;/&nbsp;</span>
                <span class="log_ur">内容详情</span>
            </div>
            <div class="tit_top_con">
                <span class="tit_name">内容详情</span>
            </div>
    </div>
    <div class='details'>
        <div>
            <div class='tits'>
                <span>广告内容</span>
            </div>
            <div class='details_left'>
                <img :src="adver.pict_url" alt="" v-if="adver.pict_url"/>
            </div>
            <div class='details_right'>
               <div>
                   <span>广告图URL</span>
                    <a :href="adver.pict_url" v-if="adver.pict_url">{{adver.pict_url}}</a>
               </div>
                <div>
                    <span>落地页URL</span>
                    <a :href="adver.click_url">{{adver.click_url}}</a>
               </div>
            </div>
        </div>
        <div>
            <div class='tits'>
                <span>杂志锁屏</span>
            </div>
            <div class='details_left'>
                <img :src="mfinal.prev_uri"  alt=""/>
            </div>
            <div class='details_right2'>
               <div>
                   <div class='tab_box'>
                       <span class='tab_box_name'>物料ID</span>
                       <span class='tab_box_con'>{{mfinal.mfid}}</span>
                   </div>
                   <div class='tab_box'>
                       <span class='tab_box_name' style="margin-left:30px">壁纸标签</span>
                       <!-- <span  class='tab_box_con tag' style="margin-left:30px" v-for='da in list.mfinal.sls_tags'>{{da}}</span> -->
                       <span  class='tab_box_con tag' style="margin-left:30px">{{list.wpid_tags_id}}</span>
                   </div>
                   <div class='tab_box' style="border-right:0!important">
                       <span  class='tab_box_name' style="margin-left:30px">尺寸</span>
                       <span  class='tab_box_con' style="margin-left:30px">{{mfinal.size}}</span>
                   </div>
               </div>
                <div>
                   <div class='tab_box'>
                       <span  class='tab_box_name'>文件大小</span>
                       <!-- <span  class='tab_box_con'>{{list.mfinal.attach.size}}</span> -->
                       <span class="tab_box_con" v-if="mfinal.attach&&(mfinal.attach.size/1024).toFixed(0)<1">1kb</span>
						<span class="tab_box_con" v-if="mfinal.attach&&mfinal.attach.size>1024&&mfinal.attach.size<1024*1024">{{(mfinal.attach.size/1024).toFixed(0)}}kb</span>
						<span class="tab_box_con" v-if="mfinal.attach&&mfinal.attach.size>1024*1024&&mfinal.attach.size<1024*1024*1024">{{(mfinal.attach.size/1024/1024).toFixed(1)}}MB</span>
						<span class="tab_box_con" v-if="mfinal.attach&&mfinal.attach.size>1024*1024*1024">{{(mfinal.attach.size/1024/1024/1024).toFixed(2)}}GB</span>
                       <a class='xz' :href='mfinal.attach.url' v-if="mfinal.attach">下载</a>
                   </div>
                   <div class='tab_box'>
                       <span  class='tab_box_name' style="margin-left:30px">埋点状态</span>
                       <span  class='tab_box_con' style="margin-left:30px">{{mfinal.status_check==0?'暂未上线':"已上线"}}</span>
                   </div>
                   <div class='tab_box' style="border-right:0!important">
                       <span  class='tab_box_name' style="margin-left:30px">对接上线状态</span>
                       <span  class='tab_box_con' style="margin-left:30px">{{list.status_online==0?'待确定':list.status_online==1?'已上线':'未上线'}}</span>
                   </div>
               </div>
            </div>
            <div v-if='list.adver_status!=0'>
                <div class='tits'>
                    <span>处理结果</span>
                </div>
                <div class='jg'>
                    <div>
                        <span>审核结果</span>
                         <span class='jg_con'>{{list.adver_status==0?'待审核':list.adver_status==1?"审核通过":"审核不通过"}}</span>
                    </div>
                    <div>
                        <span>原因说明</span>
                         <span class='jg_con' v-if="list.note != ''">{{list.note}}</span>
                         <span class='jg_con' v-else>--</span>
                    </div>
                    <div>
                        <span>更新时间</span>
                         <span class='jg_con'>{{list.updated_at}}</span>
                    </div>
                    <div style="border:0!important">
                        <span>操作人员</span>
                         <span class='jg_con'>{{list.updator}}</span>
                    </div>
                </div>
               
            </div>
             <div v-if='list.adver_status==0' class='wcl'>
                  <div class='tits' style="text-align: left;color: #000;">
                    <span style="color: #000;">处理结果</span>
                </div>
               <span>暂未处理</span>
           </div>
           
        </div>
        <div style="margin:0 40px">
            <!-- <span class='sh'>审核</span>
            <span class='qx'>取消</span> -->
            <span @click='fh(-1)' class='qx'>返回</span>
        </div>
    </div>
</div>
</template>

<script>

export default {

components: {},
data() {        
    return {
        list:{},
        mfinal:{},
        adver:{},
    };
},

methods: {
    fh(index){
        this.$router.go(index)
    },
    getDetail(){
        let params={adid:this.$route.query.adid,mfid:this.$route.query.mfid,plid:this.$route.query.plid,tags_id:this.$route.query.tags_id}
        this.api.pushlib_adver_mfinal_detail({params}).then((res)=>{
            this.list=res;
            this.mfinal = res.mfinal;
            this.adver = res.adver;
        })
    },
},

created() {
    this.getDetail()
},

mounted() {
    
},

}
</script>
<style  scoped>
.top_name{
        height: 98px;
    }
.log_ur{
        font-size:12px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(61,73,102,1);
    }
    .details{
        margin-top: 185px;
        background: #fff;
        padding: 0 40px;
    }
    .details_left{
        margin: 20px 100px 10px 40px;
        display: inline-block;
        width: 160px;
        height: 230px;
        background: #ddd;
        position: relative;
    }
    .details_left img{
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%)
        
    }
    .details_right,.details_right2{
        display: inline-block;
        position: relative;
        vertical-align: top;
        margin-top: 40px;
        width: 60%;
    }
    .details_right>div{
        width: 100%;
        height: 50px;
        border:1px solid rgb(241, 240, 240);
        padding: 15px 30px;
    } 
    .details_right2>div{
        width: 100%;
        height: 80px;
        padding: 0 30px;
        border:1px solid rgb(241, 240, 240);
    }
    .details_right>div>span{
        display: block;
        font-size: 12px;
        color: rgb(177, 174, 174);
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
        margin-top: 10px;
    }
    .details_right>div>a{
        display: inline-block;
         font-size: 12px;
         color: #3377ff;
        font-family: Arial, Helvetica, sans-serif;
        overflow: hidden;
        text-decoration:#3377ff!important;
        overflow: hidden;
        width: 100%;
        height: 14px;
    }
    .details_name{
        display: inline-block;
        font-family: 'Courier New', Courier, monospace;
        font-size: 18px;
        font-weight: 500;
        color: #000;
    }
    .details_num{
        display: inline-block;
         font-size: 12px;
        font-weight: 500;
        color: ddd;
        font-family: 'Courier New', Courier, monospace;
    }
    .details_box{
        width: 100%;
        height: 150%;
        overflow-y: auto;
    }
    .details_url{
        height: 30px;
        width: 100%;
        line-height: 30px;
        border-bottom: 1px solid #ddd;
    }
    .details_tit{
        width: 100%;
        height: 50px;
        border-bottom: 3px solid #ddd
    }
    .img_box{
        width: 100%;
        height: 150px;
        overflow-x: auto;
        margin-top: 15px;
        border-bottom: 1px solid #ddd;
    }
    .img_url{
        width: 80px;
        height: 120px;
        background: #ddd;
        margin-right:40px; 
    }
    .sh,.qx{
        display: inline-block;
        cursor: pointer;
        margin-right: 24px;
        width: 68px;
        height: 36px;
        background: rgba(255,255,255,1);
        border-radius: 4px;
        border: 1px solid rgba(211,219,235,1);
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(61,73,102,1);
        line-height: 36px;
        cursor: pointer;
        text-align: center;
        margin-top: 7px;
        margin-bottom: 50px;
    }
    .sh{
           border: 0!important;
    background: rgba(51,119,255,1)!important;
    color: rgba(255,255,255,1)!important;
    }
    .tits{
        width: 100%;
        border-bottom: 1px solid #ddd;
    }
    .tits span{
        display: inline-block;
        margin: 20px 0 20px 40px;
        font-family: 'Courier New', Courier, monospace;
        font-size: 16px;
        font-weight: bold;
        color: #000;

    }
    .tab_box{
        display: inline-block;
        width: 33%;
        height: 100%;
        border-right: 1px solid rgb(241, 240, 240);
        position: relative;
    }
    .tab_box_name{
        display: block;
        margin: 25px 0 0 0;
        font-size: 12px;
        color: rgb(177, 174, 174);
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
        
    }
    .tab_box_con{
        font-size: 12px;
        color: rgb(43, 42, 42);
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
    }
    .xz{
        display: inline-block;
        padding: 5px 10px;
        text-align: center;
        border:1px solid #ddd;
        border-radius: 3px;
        cursor: pointer;
        position: absolute;
        right:30px;
        top:25px;
    }
    .jg{
        margin: 30px 0 30px 0;
        width: 100%;
        height: 80px;
        border:1px solid  rgb(241, 240, 240);
    }
    .jg>div{
        width: 24.5%;
        display: inline-block;
        border-right:1px solid rgb(241, 240, 240);
        height: 100%;
    }
    .jg>div>span{
        display: block;
        font-size: 12px;
        color: rgb(177, 174, 174);
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
        margin: 25px 0 0 40px;
    }
    .jg_con{
      display: inline-block!important;
      color: rgb(53, 53, 53)!important;
       margin: 0 0 0 40px!important;
    }
    .tag{
        display: inline-block;
        padding: 2px 5px;
        border:1px solid #ddd;
    }
     .wcl{
       text-align: center;
   }
   .wcl span{
       color: #ddd;
       font-size: 14px;
   }
</style>