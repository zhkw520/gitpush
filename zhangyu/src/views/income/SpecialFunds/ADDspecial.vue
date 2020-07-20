<template>
    <div>
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="jump()">特殊款项管理&nbsp;/</span>
                <span class="new_url">&nbsp;添加特殊款项</span>
            </div>
        </div>
        <div class="content">
            <div>
                <span>结算方</span>
                <select style="margin-top: 29px" v-model="name">
                    <option v-for="item in list" :value="item.name">{{item.name}}</option>
                </select>
            </div>
            <div>
                <span>支出金额</span>
                <input type="text" v-model="amount">
            </div>
            <div>
                <span>状态</span>
                <select v-model="status">
                    <option value="0">待确定</option>
                    <option value="1">已支出</option>
                    <option value="-1">已作废</option>
                </select>
            </div>
            <div>
                <span style="vertical-align: top">备注</span>
               <textarea v-model="note"></textarea>
            </div>
            <div>
                <span>附件</span>
                <div class="uplaod">
                    <el-upload
                            class="upload-demo"
                            :on-remove="handleRemove"
                            :http-request="uploadFile"
                            multiple
                            action="111">
                        <el-button size="small" type="primary">上传</el-button>
                    </el-upload>
                    <el-progress :percentage="this.times" v-if="up"></el-progress>
                </div>
            </div>
            <div class="contentBtn">
                <span class="tj" @click="ADD()">添加</span>
                <span @click="fh()">取消</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "a-d-dspecial",
        data(){
            return{
                name:'',
                status:"",
                amount:"",
                note:'',
                list:[],
                attachs:[],
                times:"",
                up:false
            }
        },
        mounted(){
            this.setList()
        },
        methods:{
            jump(){
                this.$router.push({
                    path:"./SpecialFunds_Administration"
                })
            },
            fh(){
                this.$router.go(-1)
            },

            handleRemove(file, fileList) {
                this.file = '';
                this.initiate2 = false
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
                this.times=0
                this.time();
                let formData = new FormData;
                formData.append('file',file.file);
                this.api.file_private_upload(formData).then((res)=>{
                    this.attachs.push(res);
                    this.times=100;
                    this.up=false;
                })
            },
            setList(){
                let params={is_receiver:2};
                this.api.settle_settlement({params}).then((res)=>{
                    this.list=res
                })
            },
            ADD(){
                if(!this.name){
                    this.$message.error('名称不能为空');
                    return
                }
                if(!this.status){
                    this.$message.error('状态不能为空');
                    return
                }
                if(!this.amount){
                    this.$message.error('支出金额不能为空');
                    return
                }
                if(this.amount>999999999.99){
                    this.$message.error("支出金额不能大于999999999.99");
                    return
                }
                if(this.attachs.length==0){
                    this.$message.error('附件不能为空');
                    return
                }

                let formData=new FormData;
                formData.append('name',this.name);
                formData.append('status',this.status);
                formData.append('amount',this.amount);
                formData.append('note',this.note);
                formData.append('attachs',JSON.stringify(this.attachs));
                this.api.settle_special_add(formData).then((res)=>{
                    this.fh();
                })
            }
        }
    }
</script>

<style scoped>
    .top{
        width: 100%;
        height:62px;
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
    .content{
        margin-top: 148px;
        background: #fff;
        min-height: 760px;
    }
    .content>div>span{
        display: inline-block;
        width:116px;
        height:20px;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin: 0 24px 0 0;
        text-align: right;
    }
    select{
        width:467px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-bottom: 24px;
    }
    input{
        width:457px;
        height:36px;
        padding-left: 10px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-bottom: 24px;
    }
    textarea{
        width:448px;
        height:68px;
        padding: 10px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-bottom: 24px;
    }
    .uplaod{
        display: inline-block;
        width:96px;
    }
    .contentBtn>span{
        display: inline-block!important;
        width:68px!important;
        height:36px!important;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
        line-height: 36px;
        text-align: center!important;
        cursor: pointer;
    }
    .tj{
        color: #fff!important;
        background: #3377ff!important;
        border: none!important;
        margin:24px 24px  0 140px !important;
    }
</style>