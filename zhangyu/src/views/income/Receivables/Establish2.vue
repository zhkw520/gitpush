<template>
    <div>
        <div>
            <!--<DS v-if="msg" :name="name"></DS>-->
            <div class="top">
                <div class="tit_top_url">
                    <span class="log_url" @click="jump()">收款结算&nbsp;/</span>
                    <span class="new_url" v-if="this.$route.query.id==undefined">&nbsp;新建收款结算</span>
                    <span class="new_url" v-if="this.$route.query.id!=undefined">&nbsp;编辑收款结算</span>
                </div>
                <div class="title_left">
                    <span v-if="this.$route.query.id==undefined">新建收款结算</span>
                    <span v-if="this.$route.query.id!=undefined">编辑收款结算</span>
                </div>
            </div>
        </div>
        <div class="tableBox">
            <div style="text-align: center;margin-bottom: 40px;max-width: 893px;border-bottom: 1px solid #ddd;position: relative;left: 50%;transform: translateX(-50%)">
                <div style="margin-right: 350px;text-align: center;display: inline-block">
                    <div class="box boxs">1</div>
                    <span class="boxName">对账确认</span>
                </div>
                <div style="margin-right: 350px;text-align: center;display: inline-block;border-bottom: 1px solid #3377ff">
                    <div class="box  boxs">2</div>
                    <span class="boxName">票据凭证</span>
                </div>
                <div style="text-align: center;display: inline-block">
                    <div class="box">3</div>
                    <span class="boxName">结算汇款</span>
                </div>

            </div>
            <div style="text-align: center" class="fill">
                <div>
                    <span class="fillName">物流单号</span>
                    <input type="text" class="input" v-model="express_id">
                </div>
                <div>
                    <span class="fillName">备注说明</span>
                    <textarea v-model="note"></textarea>
                </div>
                <div>
                    <div style="display: inline-block;width: 100px;margin-right: 20px">
                        <!-- <el-tooltip placement="top" class="tit_txt_2 logs tit_txts">
                            <div slot="content">请上传对账确认邮件截图，结算数据明细等凭证</div>
                            <img src="../../../../public/img/wh.png" style="margin-right: 6px;cursor: pointer">
                        </el-tooltip> -->
                        <span class="fj">上传票据凭证</span>
                    </div>
                    <div class="uplaod">
                        <el-upload
                                class="upload-demo"
                                :on-remove="handleRemove"
                                :http-request="uploadFile"
                                multiple
                                action="111">
                            <el-button size="small" type="primary">上传文件</el-button>
                        </el-upload>
                        <el-progress :percentage="this.times" v-if="up"></el-progress>
                    </div>
                    <div style="margin: 14px 0 14px 0px" v-for="(item,index) in attachs">

                            <el-tooltip placement="top" class="tit_txt_2 logs tit_txts">
                                <div slot="content" class="text">{{item.name}}</div>
                                <span  class="text" style="overflow: hidden;width: 200px;height: 20px;line-height: 28px">{{item.name}}</span>
                            </el-tooltip>

                        <!--<div style="display: inline-block;max-width: 200px;height: 20px;overflow:hidden;font-size:14px;font-family:PingFangSC-Regular,PingFangSC;font-weight:400;color:rgba(31,46,77,1);text-align: left">{{item.name}}</div>-->
                        <!--<span class="content_ck">查看</span>-->
                        <a class="content_xz" :href="item.url">下载</a>
                        <span class="content_xz" @click="dels(index)">删除</span>
                    </div>
                </div>
                <div class="fillBtn">
                    <span class="tj" @click="setData()">提交</span>
                    <span @click="fh(-1)" style="margin-right: 192px">取消</span>
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
                attachs:[],
                note:"",
                express_id:"",
                times:"",
                up:false,
                fcounter:0,
            }
        },
        mounted(){
            if(this.$route.query.id!=undefined){
                this.getList();
            }
        },
        methods:{
            jump(){
                this.$router.push({
                    path:"./Administration"
                })
            },

            fh(){
                this.$router.go(-1)
            },

            handleRemove(file, fileList) {
                this.file = '';
                this.initiate2 = false
            },
            dels(index){
                this.attachs.splice(index,1)
            },
            time(){
                var _this=this;
                _this.times=0;
                var timer = setInterval(function () {
                    if(_this.times<99){
                        _this.times++
                    }
                },100);
            },
            uploadFile(file){
                this.up=true;
                this.times=0;
                ++this.fcounter;
                this.time();
                let formData = new FormData;
                formData.append('file',file.file);
                this.api.file_private_upload(formData).then((res)=>{
                    this.attachs.push(res);
                    this.times=100;
                    --this.fcounter;
                    this.up=false;
                })
            },
            js(){
                this.$router.push({
                    path:"./Administration"
                })
            },

            getList(){
                let params={is_receiver:1,id:this.$route.query.id};
                this.api.settlemanage_detail({params}).then((res)=>{
                    this.express_id=res.invoice.express_id;
                    this.note=res.invoice.note;
                    this.attachs=res.invoice.attachs;
                })
            },
            setData(){
                if(this.fcounter != 0)
                {
                    this.$message.error('文件上传中');
                    return
                }
                if((this.express_id).match(/^[\u4e00-\u9fa5]+$/)){
                    this.$message.error('物流单号为非中文');
                    return
                }
                if(!this.express_id){
                    this.$message.error('物流单号不能为空');
                    return
                }
                if(!this.note){
                    this.$message.error('备注不能为空');
                    return
                }
                if(this.attachs.length==0){
                    this.$message.error('附件不能为空');
                    return
                }
                let formData=new FormData;
                formData.append('note',this.note);
                formData.append('is_receiver',1);
                formData.append('express_id',this.express_id);
                formData.append('id',this.$route.query.id);
                formData.append('attachs',JSON.stringify(this.attachs));
                this.api.demandsettle_invoice_edit(formData).then((res)=>{
                    this.$router.go(-1);
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
        min-height: 600px;
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
    input{
        width:457px;
        height:36px;
        padding-left: 10px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .fillTime{display: inline-block;
        width:467px
    }
    .fillTime .filtrate .timesDate .content_table .time .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width: 100%;
    }
    textarea{
        width:468px;
        height:88px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .uplaod{
        width:474px;
        display: inline-block;
        text-align: left!important;
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
    }
    .tj{
        color: #fff!important;
        background: #3377ff!important;
        border: none!important;
        margin-right: 20px;
        margin-bottom: 50px;
    }
    .content_ck, .content_xz{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(51,119,255,1);
        margin-left: 10px;
        cursor: pointer;
    }
</style>