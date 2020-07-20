<template>
    <div>
        <!--<DS v-if="msg" :name="name"></DS>-->
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="jump()">特殊款项管理&nbsp;/</span>
                <span class="new_url">&nbsp;添加特殊款项</span>
            </div>
        </div>
        <div class="content">
            <div>
                <span class="TitName">结算方</span>
                <select v-model="name">
                    <option v-for="item in listName" :value="item.name">{{item.name}}</option>
                </select>
                <!--<span class="click" @click="massgae()">查看结算方信息</span>-->
            </div>
            <div>
                <span  class="TitName">支出金额</span>
                <input type="number" v-model="amount"/>

            </div>
            <div>
                <span  class="TitName">状态</span>
                <select v-model="status">
                    <option value="0">待确定</option>
                    <option value="1">已支出</option>
                    <option value="-1">已作废</option>
                </select>
            </div>
            <div>
                <span  class="TitName">备注</span>
                <textarea v-model="note"></textarea>
                <!--<span class="text">{{list.note}}</span>-->
            </div>
            <div>
                <span  class="TitName">附件</span>
                <div class="uplaod">
                    <el-upload
                            class="demo"
                            :on-remove="handleRemove"
                            :http-request="uploadFile"
                            action="111"
                            multiple
                    >
                        <el-button size="small" type="primary">上传文件</el-button>
                    </el-upload>
                    <el-progress :percentage="this.times" v-if="up"></el-progress>
                    <div>
                        <div v-for="(item,index) in attachs">
                            <span  class="text">{{item.name}}</span>
                            <!--<a class="click" :href="item.url">查看</a>-->
                            <a class="click" :href="item.url">下载</a>
                            <span class="click" @click="dels(index)">删除</span>
                        </div>
                    </div>
                </div>

            </div>
            <div>
                <span class="bc" @click="bc()">保存</span>
                <span class="boxBtn" @click="fh()">返回</span>
            </div>
        </div>
    </div>
</template>

<script>
    // import DS from '../Receivables/DetailsSettlement'
    export default {
        // components:{DS},
        name: "change",
        data(){
            return{
                msg:false,
                list:{},
                status:'',
                listName:[],
                name:"",
                amount:"",
                note:"",
                attachs:[],
                times:"",
                up:false,
            }
        },
        mounted(){
            this.getData()
        },
        methods:{
            dels(index){
                this.attachs.splice(index,1)
            },
            fh(){
                this.$router.go(-1)
            },
            handleRemove(file, fileList) {
                this.file = '';
                this.initiate2 = false
            },
            scope(){
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
                this.scope();
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
                    this.listName=res
                })
            },
            massgae(){this.msg=true},
            heidMassage(){
                this.msg=false
            },
            jump(){
                this.$router.push({
                    path:"./SpecialFunds_Administration"
                })
            },
            getData(){
                let params={smid:this.$route.query.smid};
                this.api.settle_special_detail({params}).then((res)=>{
                    this.note=res.note;
                    this.name=res.name;
                    this.amount=res.amount;
                    this.attachs=res.attachs;
                    this.status=res.status;
                    this.setList()
                })
            },
            bc(){
                if(this.status===''){
                    this.$message.error('状态不能为空');
                    return
                }
                if(this.name===''){
                    this.$message.error('结算名不能为空');
                    return
                }
                if(this.note===''){
                    this.$message.error('备注不能为空');
                    return
                }
                if(this.attachs.length==0){
                    this.$message.error('附件不能为空');
                    return
                }
                if(this.amount===''){
                    this.$message.error('支出金额不能为空');
                    return
                }
                if(this.amount>999999999.99){
                    this.$message.error('支出金额不能大于999999999.99');
                    return
                }
                let formData=new FormData;
                formData.append('smid',this.$route.query.smid);
                formData.append('status',this.status);
                formData.append('name',this.name);
                formData.append('note',this.note);
                formData.append('amount',this.amount);
                formData.append('attachs',JSON.stringify(this.attachs));
                this.api.settle_special_edit(formData).then((res)=>{
                    if(res!=false){
                        this.fh()
                    }
                })
            },
        },
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
        margin-top: 142px;
        background: #fff;
        min-height: 760px;
    }
    .TitName{
        width:116px;
        display: inline-block;
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
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(109,119,139,1);
    }
    .click{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(51,119,255,1);
        margin-left: 12px;
        cursor: pointer;
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
        margin:27px 0 0 20px;
    }
    .title_left span{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-top: 15px;
        cursor: pointer;
    }
    .title_left img{
        width:12px;
        height:12px;
        margin-right: 9px;
        margin-left: 24px;
    }
   .bc{
       display: inline-block;
       width:68px;
       height:36px;
       background:rgba(51,119,255,1);
       border-radius:4px;
       line-height: 36px;
       text-align: center;
       cursor: pointer;
       margin-left: 140px;
       color: #fff!important;
   }

    select{
        width:467px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    input{
        width:457px;
        height:36px;
        padding-left: 10px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    textarea{
        width:447px!important;
        height:36px!important;
        padding: 10px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-top: 20px;
    }
    .uplaod{
        margin-top: 20px;
        display: inline-block;
        text-align: left!important;
    }
    .demo  .el-upload-list__item-name{
        display: none;
    }
</style>