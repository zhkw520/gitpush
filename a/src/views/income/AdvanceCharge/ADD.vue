<template>
    <div>
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="jump()">预付款管理&nbsp;/</span>
                <span class="log_url" @click="fh()">&nbsp;{{this.$route.query.is_receiver==1?'收款结算预付款详情':'付款结算预付款详情'}}&nbsp;/</span>
                <span class="new_url">&nbsp;添加变更记录</span>
            </div>
        </div>
        <div class="content">
            <div>
                <span class="TitName">选择类型</span>
                <select v-model="type">
                    <option value="1">消耗金额</option>
                    <option value="2">增加金额</option>
                </select>
            </div>
            <div>
                <span  class="TitName">金额数值</span>
                <input type="number" placeholder="请输入" v-model="amount"/>
            </div>
            <div>
                <span  class="TitName">备注</span>
                <textarea v-model="note"></textarea>
            </div>
            <div v-if="type==1">
                <span  class="TitName">绑定结算单</span>
                <input type="text" placeholder="请输入" v-model="settle_id"/>
            </div>
            <div v-if="type==2" id="lime">
               <span  class="TitName">附件</span>
                <div class="uplaod">
                    <el-upload
                            class="upload-demo"
                            :on-remove="handleRemove"
                            :http-request="uploadFile"
                            action="111"
                            multiple
                           >
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                    <el-progress :percentage="this.times" v-if="up"></el-progress>
                </div>
                <div v-for="item in attachs" style="display: inline-block">
                    <el-tooltip placement="top" class="tit_txt_2 logs tit_txts">
                        <div slot="content" class="text">{{item.name}}</div>
                        <span  class="text" style="overflow: hidden;width: 200px;height: 20px;line-height: 28px">{{item.name}}</span>
                    </el-tooltip>
                </div>
            </div>
            <div>
                <span class="tj" @click="ADDdata()">添加</span>
                <span class="boxBtn" @click="fh()">取消</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "change",
        data(){
            return{
                type:"",
                amount:"",
                note:"",
                attachs:[],
                settle_id:"",
                times:"",
                up:false
            }
        },
        methods:{

            handlePreview(file) {
                console.log(file);
            },

            handleRemove(file, fileList) {
                this.file = '';

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
            jump(){
                this.$router.push({
                    path:"./Administration"
                })
            },
            fh(){this.$router.go(-1)},
            ADDdata(){
                if(this.type==1){
                    if(!this.type){
                        this.$message.error("类型不能为空");
                        return
                    }
                    if(!this.amount){
                        this.$message.error("预付款金额不能为空");
                        return
                    }
                    if(this.amount>999999999.99){
                        this.$message.error("预付款金额不能大于999999999.99");
                        return
                    }
                    if(!this.note){
                        this.$message.error("备注不能为空");
                        return
                    }
                    if(!this.settle_id){
                        this.$message.error("绑定结算单不能为空");
                        return
                    }
                    var formData=new FormData;
                    formData.append('name',this.$route.query.name);
                    formData.append('type',this.type);
                    formData.append('is_receiver',this.$route.query.is_receiver);
                    formData.append('amount',this.amount);
                    formData.append('settle_id',this.settle_id);
                    formData.append('note',this.note);
                }else {
                        if (!this.type) {
                            this.$message.error("类型不能为空");
                            return
                        }
                        if (!this.amount) {
                            this.$message.error("消耗金额不能为空");
                            return
                        }
                    if(this.amount>999999999.99){
                        this.$message.error("消耗金额不能大于999999999.99");
                        return
                    }
                        if (!this.note) {
                            this.$message.error("备注不能为空");
                            return
                        }
                        if (this.attachs.length==0) {
                            this.$message.error("附件不能为空");
                            return
                        }
                        var formData = new FormData;
                        formData.append('name', this.$route.query.name);
                        formData.append('type', this.type);
                        formData.append('is_receiver', this.$route.query.is_receiver);
                        formData.append('amount', this.amount);
                        formData.append('note', this.note);
                        formData.append('attachs', JSON.stringify(this.attachs));
                    }
                    this.api.settle_prepayment_add(formData).then((res) => {
                        this.$router.go(-1)
                    })
            },
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
    .TitName{
        display: inline-block;
        width:96px;
        height:20px;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin: 26px 21px 0 56px;
        text-align: right;
    }
    .text{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(109,119,139,1);
    }
    .click{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(51,119,255,1);
        margin-left: 12px;
    }
    .uplaod{
        display: inline-block;
        width:96px;
    }
    .boxBtn{
        display: inline-block;
        line-height: 36px;
        text-align: center;
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
    input{
        width:457px;
        height:36px;
        padding-left: 10px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-bottom: 20px;
    }
    select{
        width:158px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-bottom: 20px;
    }
    textarea{
        width:448px;
        height:68px;
        padding: 10px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .tj{
        width:68px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        display: inline-block;
        margin:28px 20px 0 173px;
    }
</style>