<template>
    <div>
        <div class="top_name">
            <span class="top_txt" @click='fh()'>杂志锁屏推送  /   推送内容管理</span>
            <div class="tit_name">
                <span>推送内容管理</span>
            </div>
            <div class="search_criteria">
                <div class="num">
                    <span>数量:</span>
                    <span>{{total}}</span>
                </div>
                <div class="action_btn">
                    <span class="manage" @click="del_remove">删除({{this.checked.length}})</span>
                    <span class="select" @click="cancel">取消</span>
                </div>
            </div>
        </div>
        <div class="box">
            <div class="box_img" v-for="(item,index) in dataList">
                <div class="select_img">
                    <template>
                        <el-checkbox-group v-model="checked">
                            <el-checkbox :label="item.mfid" ></el-checkbox>
                        </el-checkbox-group>
                    </template>
                </div>
                <div class="left_img">
                     <img :src="item.mfinal.prev_uri" v-if="((item.mfinal.prev_uri).split('.'))[((item.mfinal.prev_uri).split('.')).length-1]!='mp4'" />
                    <video :src="item.mfinal.prev_uri" v-if="((item.mfinal.prev_uri).split('.'))[((item.mfinal.prev_uri).split('.')).length-1]=='mp4'"></video>
                </div>
                <div class="right_txt">
                    <div>
                        <span class="right_txt_name">物料ID</span>
                        <span class="right_txt_content">{{item.mfid}}</span>
                    </div>
                    <div class="img_size">
                        <span class="right_txt_name">尺寸</span>
                        <span class="right_txt_content">{{item.mfinal.size}}</span>
                    </div>
                    <div>
                        <span class="right_txt_name">文件</span>
                        <span class="right_txt_content" v-if="(item.mfinal.attach.size/1024).toFixed(0)>=1&&(item.mfinal.attach.size/1024/1024).toFixed(0)<1">{{(item.mfinal.attach.size/1024).toFixed(0)}}kb</span>
                        <span class="right_txt_content" v-if="(item.mfinal.attach.size/1024/1024).toFixed(1)>=1&&(item.mfinal.attach.size/1024/1024/1024).toFixed(1)<1">{{(item.mfinal.attach.size/1024/1024).toFixed(1)}}MB</span>
                        <span class="right_txt_content" v-if="(item.mfinal.attach.size/1024/1024/1024).toFixed(2)>=1">{{(item.mfinal.attach.size/1024/1024/1024).toFixed(2)}}GB</span>
                        <a :href="item.mfinal.attach.url">下载</a>
                    </div>
                     <div class="img_size">
                        <span class="right_txt_name">埋点状态</span>
                        <span class="right_txt_content">{{item.status==0?'不通过':"审核通过"}}</span>
                    </div>
                    <div class="img_size">
                        <span class="right_txt_name">外部确认状态</span>
                        <span class="right_txt_content">{{item.status_online==0?"待确定":item.status_online==1?"上线":'拒绝上线'}}</span>
                        <!-- <span class="right_txt_content  yy" @click='updateStatus(index)'>更新状态</span> -->
                    </div>
                     <div class="img_size">
                        <span class="right_txt_name">对接上线状态</span>
                        <span class="right_txt_content">{{item.status_check==0?'待确定':item.status_check==1?'已上线':'未上线'}}</span>
                    </div>
                     <div class="img_size" v-if="item.note">
                        <span class="right_txt_name">原因说明</span>
                        <span class="right_txt_content">{{item.note}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="null_content"  v-if="this.dataList.length==0">
        <img src="../../../public/img/null.png">
        <span class="prompt_message">无相关资源，若有疑问，请联系管理人员</span>
        </div>
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange1"
                    @current-change="handleCurrentChange1"
                    :current-page.sync="currentPage"
                    :page-size="pageSize"
                    layout="prev, pager, next,total, jumper"
                    :total="total">
            </el-pagination>
        </div>
        <div class="bg" v-if="remove">
            <div class="remove_content">
                <div class="remove_content_tit">
                    <span>提示</span>
                    <img src="../../../public/img/gb.png" @click="qx">
                </div>
                <div class="remove_content_cont">
                    <span>确认移除选中物料吗？</span>
                </div>
                <div class="del_btn">
                    <span class="qd" @click="removeDEL()">确定</span>
                    <span @click="qx">取消</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "journal_of_push",
        data(){
            return{
                time:"",
                checked:[],
                remove:false,
                dataList:[],
                total:0,
                pageSize:8,
                currentPage: 1,
                
            }
        },
        mounted(){
            this.getData();
        },
        methods:{
            fh(){
                this.$router.go(-1)
            },
            del_remove(){
                if(this.checked.length==0){
                    return this.$message.error('请至少选择一个物料')
                }
                    this.remove = true;
                    this. stop();
            },
            qx(){
                this.remove = false;
                this.move();
            },
            cancel(){
                this.checked=[];
                this.$router.go(-1)
            },
            handleSizeChange1() { // 每页条数切换
                this.pageSize = pageSize;
                this.getData()
            },
            handleCurrentChange1(currentPage) {//页码切换
                this.currentPage = currentPage;
                this.getData()
            },
            getData(){
                let params = {plid:this.$route.query.id,tdate:this.$route.query.date,p:this.pageSize,page:this.currentPage};
                this.api.pushlib_binds({params}).then((res)=>{
                    this.dataList = res.data;
                    this.total=res.total
                })
            },
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
            removeDEL(){
                let formData = new FormData;
                formData.append('plid',this.$route.query.id);
                formData.append('bind_mfid',JSON.stringify(this.checked));
                this.api.pushlib_del_mfinal(formData).then((res)=>{
                    this.qx();
                    this.checked.length=0;
                    this. getData();
                })
            },
        },
    }
</script>

<style scoped>
    a{
        display: inline-block;
        width:44px;
        height:20px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(51,119,255,1);
        line-height: 20px;
        text-align: center;
        cursor: pointer;
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,119,255,1);
        margin-left: 14px;
    }
    .top_txt{cursor: pointer;}
    .top_txt,.tit_name span{
        margin-left: 24px;
    }
    .top_name{
        height: 166px;
    }
    .tit_name span{
        display: inline-block;
        font-size:20px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(50,50,50,1);
    }
    .tit_name{
        margin-bottom: 24px;
    }
    .search_criteria {
        padding: 0 24px;
    }
    .search_criteria div{
        display: inline-block;
    }
    .date{
        margin-right: 12px;
    }
    .num span{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(50,50,50,1);
    }
    .action_btn{
        float: right;
        margin-right: 250px;
    }
    .action_btn span{
        display: inline-block;
        height: 36px;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .manage{
        width:68px;
        background:rgba(51,119,255,1);
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        margin-right: 20px;
    }
    .select{
        width:144px;
        background:rgba(242,246,252,1);
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(61,73,102,1);
    }
    .box{
        margin-top: 244px;
    }
    .box_img{
        display: inline-block;
        width:380px;
        height:189px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        margin:0px 20px 24px 0;
        position: relative;
    }
    /*.box_img:nth-child(4n){*/
        /*margin-right: 0!important;*/
    /*}*/
    .left_img{
        display: inline-block;
        width:116px;
        height:149px;
        background:rgba(227,231,235,1);
        border-radius:2px;
         margin-left: 35px;
        position: absolute;
        top:50%;
        transform: translateY(-50%);
    }
    .left_img img ,.left_img video{
        max-width: 99px;
        max-height: 149px;
        position:absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
     .right_txt{
        display: inline-block;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        margin-left: 170px;
    }
    .right_txt div{
        height: 25px;
    }
    .right_txt_name{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(143,155,179,1);
    }
    .right_txt_content{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-left: 10px;
    }
    .null_content{
        text-align: center;
        position: relative;
        margin-top: 400px;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .prompt_message{
        display: block;
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(143,155,179,1);
        text-align: center;
    }
    .select_img{
        display: inline-block;
        width: 24px;
        margin-left: 13px;
        position: absolute;
        top:50%;
        transform: translateY(-50%);
    }
    .remove_content{

    }
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        z-index: 99;
        bottom: 0;
        right: 0;
    }
    .remove_content{
        width:560px;
        height:228px;
        background:rgba(255,255,255,1);
        box-shadow:0px 2px 8px 0px rgba(0,0,0,0.2);
        border-radius:4px;
        position: relative;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
    .remove_content_tit{
        height: 56px;
        border-bottom: 1px solid #E6E9F0;
    }
    .remove_content_tit span{
        display: inline-block;
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        margin-left: 24px;
        line-height: 56px;
    }
    .remove_content_tit img{
        display: inline-block;
        width: 16px;
        float: right;
        margin: 20px 24px 0 0 ;
        cursor: pointer;
    }
    .remove_content_cont{
        margin-top: 15px;
    }
    .remove_content_cont span{
        display: inline-block;
        margin-left: 24px;
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
    }
    .del_btn{
        margin-top: 78px;
        text-align: right;
    }
    .del_btn span{
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
        cursor: pointer;
        text-align: center;
        line-height: 36px;
        margin-right: 24px;
    }
    .qd{
        background:rgba(51,119,255,1)!important;
        color:rgba(255,255,255,1)!important;
        border: 0!important;
        margin-right: 14px!important;
    }
</style>