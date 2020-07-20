<template>
    <div>
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="jump()">收款结算&nbsp;/</span>
                <span class="log_url" @click="jumps()">&nbsp;收款结算方管理&nbsp;/&nbsp;</span>
                <span v-if="this.$route.query.name==undefined" class="new_url">添加结算方</span>
                <span v-if="this.$route.query.name!=undefined" class="new_url">编辑结算方</span>
            </div>
            <div class="title_left">
                <span v-if="this.$route.query.name==undefined">添加结算方</span>
                <span v-if="this.$route.query.name!=undefined">编辑结算方</span>
            </div>
        </div>
        <div class="tableBox">
            <div>
                <span class="titName">结算方名称</span>
                <input type="text" class="input" v-model="name">
            </div>
            <!--<div>-->
                <!--<span  class="titName">生成对账时间</span>-->
                <!--<span class="titText">每月</span>-->
                <!--<select v-model="tdate">-->
                    <!--<option v-for="item in num" :value="item">{{item}}</option>-->
                <!--</select>-->
                <!--<input type="checkbox" class="check" v-model="is_auto">-->
                <!--<span class="titText">不自动生成</span>-->
            <!--</div>-->
            <div>
                <span  class="titName">开户名</span>
                <input type="text" class="input" v-model="account_name">
            </div>
            <div>
                <span  class="titName">银行账号</span>
                <input type="text" class="input" v-model="bank_card_id">
            </div>
            <div>
                <span  class="titName">开户银行</span>
                <input type="text" class="input" v-model="bank_name">
            </div>
            <div>
                <span  class="titName">信用代码</span>
                <input type="text" class="input" v-model="tax_id">
            </div>
            <div>
                <span  class="titName">联系人<span style="color: #acadb0">(选填)</span></span>
                <input type="text" class="input" v-model="contact">
            </div>
            <div>
                <span  class="titName">对账邮箱<span style="color: #acadb0">(选填)</span></span>
                <input type="text" class="input" v-model="email">
            </div>
            <div>
                <span  class="titName" style="vertical-align: top">备注<span style="color: #acadb0">(选填)</span></span>
                <textarea v-model="note"></textarea>
            </div>
            <!-- <div style="margin-bottom:20px">
                <span  class="titName" >相关合同<span style="color: #acadb0">(选填)</span></span>
                <span class="ADDs" @click="ADDht">添加合同</span>
                <div style="width: 714px;margin-left: 140px" class="contract">
                    <template>
                        <el-table
                                :data="contracts"
                                style="width: 100%"
                                :header-cell-style="getRowClass"
                                :cell-style="cell"
                        >
                            <el-table-column
                                    prop="date"
                                    show-overflow-tooltip
                            >
                                <template slot-scope="scope">
                                    <div v-for="(item,key) in (contracts[scope.$index])">
                                        <span class="titTableName">文件归档号:</span>
                                        <span class="titTableCon">{{item.archive_id}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    show-overflow-tooltip
                            >
                                <template slot-scope="scope">
                                    <div v-for="(item,key) in (contracts[scope.$index])">
                                        <span class="titTableName">合同编号:</span>
                                        <span class="titTableCon">{{item.contract_id}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    width="100"
                            >
                                <template slot-scope="scope">
                                    <div v-for="(item,key) in (contracts[scope.$index])">
                                        <span v-if="item.status=='1'" style="color:#39BD65">{{item.status_text}}</span>
                                        <span v-if="item.status=='0'" style="color:#FFA033">{{item.status_text}}</span>
                                        <span v-if="item.status=='2'" style="color:#F05656">{{item.status_text}}</span>
                                        <span v-if="item.status=='3'" style="color:#1F2E4D">{{item.status_text}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    width="50"
                            >
                                <template slot-scope="scope" >
                                    <img src="../../../../public/img/dels.png" style="cursor: pointer" @click="del(scope.$index)"/>
                                </template>
                            </el-table-column>
                            <el-table-column type="expand">
                                <template slot-scope="scope">
                                    <div v-for="(data,key) in (contracts[scope.$index])">
                                        <div v-for="da in data.contract_files">
                                            <span style="display: inline-block;width: 50%">{{da.name}}</span>
                                            <a :href="da.url" target="_blank" style="display: inline-block;width: 50%;text-align: right">下载</a>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </div>

            </div> -->
            <div style="margin-bottom:20px">
                <span  class="titName" >附件<span style="color: #acadb0">(选填)</span></span>
                <span class="ADDs" @click="ADDfj()">上传</span>
                <div style="margin: 14px 0 14px 140px" v-for="(item,index) in attachs">
                            <div style="display: inline-block;max-width: 200px;height: 20px;overflow:hidden;font-size:14px;font-family:PingFangSC-Regular,PingFangSC;font-weight:400;color:rgba(31,46,77,1);">{{item.name}}</div>
                            <!--<span class="content_ck">查看</span>-->
                            <a class="content_xz" :href="item.url" target="_blank">下载</a>
                    <span class="content_xz" @click="dels(index)">删除</span>
                </div>
            </div>
            <div class="ADDbtn">
                <span class="tj" @click="ADDdata()">添加</span>
                <span @click="fh(-1)">取消</span>
            </div>
        </div>
        <!-- <div class="bg" v-if="ht">
            <div class="content">
                <div class="content_tit">
                    <span>添加合同</span>
                </div>
                <div>
                    <input type="text" class="content_input" placeholder="搜索文件归档号" v-model="contract_id"/>
                    <span class="content_seach" @click="getHT()">查询</span>
                </div>
                <div style="margin: 14px 20px" v-for="item in list">
                    <div>
                        <span class="ContractID">合同编号：</span>
                        <span style="display: inline-block;width: 200px;height: 20px" class="ContractID">{{item.contract_id}}</span>
                        <span v-if="item.status=='1'" class="statusColor" style="color:#39BD65;float: right">{{item.status_text}}</span>
                        <span v-if="item.status=='0'" class="statusColor" style="color:#FFA033;float: right">{{item.status_text}}</span>
                        <span v-if="item.status=='2'" class="statusColor" style="color:#F05656;float: right">{{item.status_text}}</span>
                        <span v-if="item.status=='3'" class="statusColor" style="color:#1F2E4D;float: right">{{item.status_text}}</span>
                        <div>
                            <span  class="ContractID">归档文件：</span>
                            <div v-for="da in item.contract_files" style="display: inline-block">
                                <div>
                                    <span class="imgName">{{da.name}}</span>
                                    <a class="content_xz" target="_blank" :href="da.url" >下载</a>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
                <div class="content_btn">
                    <span class="btn_tj" @click="heidHT()">添加</span>
                    <span @click="heidHTs()">取消</span>
                </div>
            </div>
        </div> -->
        <div class="bg" v-if="fj">
            <div class="content">
                <div class="content_tit">
                    <span>添加附件</span>
                </div>
                <div class="uplaod">
                    <el-upload
                            class="upload-demo"
                            :on-remove="handleRemove"
                            :http-request="uploadFile"
                            multiple
                            action="111">
                        <el-button size="small" type="primary">选择文件</el-button>
                    </el-upload>
                    <el-progress :percentage="this.times" v-if="up"></el-progress>
                </div>
                <div class="content_btn">
                    <span class="btn_tj" @click="heidFj()">添加</span>
                    <span @click="heidFj()">取消</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "a-d-d-settlement",
        data(){
            return{
                ht:false,
                fj:false,
                name:'',
                tdate:'',
                is_auto:"1",
                account_name:"",
                bank_card_id:"",
                bank_name:"",
                tax_id:"",
                contact:"",
                email:"",
                note:"",
                contracts:[],
                attachs:[],
                num:[""],
                contract_id:"",
                list:[],
                contract:[],
                auto:'',
                times:"",
                up:false,
            }
        },
        mounted(){
            for(var i=0;i<31;i++){
                this.num.push(i+1);
            }
            if(this.$route.query.name!=undefined){
                this.getData()
            }
        },
        methods:{
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return ';color:rgba(31,46,77,1);text-align:center;font-size:14px;font-weight:500;font-family:PingFang-SC-Medium;height:0px;padding:0px'
                } else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'text-align:center;color:rgba(61,73,102,1);font-size:14px;font-weight:400;font-family:PingFangSC-Regula;'
            },
            jump(){
                this.$router.push({
                    path:"./Administration"
                })
            },
            jumps(){
                this.$router.push({
                    path:"./ReceiverManagement"
                })
            },
            fh(num){
                this.$router.go(num)
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
            del(index){
                this.contracts.splice(index,1);
            },
            dels(index){
                this.attachs.splice(index,1)
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
                })
                this.up=false;
            },
            ADDht(){
                this.ht=true;
            },
            ADDfj(){
                this.fj=true;
            },
            heidFj(){
                this.fj=false
            },
            heidHT(){
                
                     this.ht=false;
                    this.contract.push((this.list[0]).archive_id);
                    this.contracts.push(this.list);
                    this.contract_id='';
                    this.list=[];
               
               
            },
            heidHTs(){
                this.ht=false;
                this.contract_id='';
                this.list=[];
            },
            getHT(){
                let params={contract_id:this.contract_id};
                this.api.common_contract({params}).then((res)=>{
                    this.list=res;
                    console.log(res);
                })
            },
            ADDdata(){
                if(this.$route.query.name!=undefined){
                    this.setData();
                    return
                }
                if(!this.name){
                    this.$message.error('名称不能为空');
                    return
                }
                // if(!this.tdate&&this.auto!=0){
                //     this.$message.error('生成对账时间不能为空');
                //     return
                // }
                if(!this.account_name){
                    this.$message.error('开户名不能为空');
                    return
                }
                if(!this.bank_card_id){
                    this.$message.error('银行账号不能为空');
                    return
                }
                if(!this.bank_name){
                    this.$message.error('开户银行不能为空');
                    return
                }
                if(!this.tax_id){
                    this.$message.error('信用代码不能为空');
                    return
                }
                // if(!this.contact){
                //     this.$message.error('联系人不能为空');
                //     return
                // }
                // if(!this.email){
                //     this.$message.error('对账邮箱不能为空');
                //     return
                // }
                // if(this.contracts.length==0){
                //     this.$message.error('合同不能为空');
                //     return
                // }
                let formData=new FormData;
                formData.append('name',this.name);
                formData.append('is_receiver',1);
                formData.append('tdate',this.tdate);
                formData.append('is_auto',this.auto);
                formData.append('account_name',this.account_name);
                formData.append('bank_card_id',this.bank_card_id);
                formData.append('bank_name',this.bank_name);
                formData.append('tax_id',this.tax_id);
                formData.append('contact',this.contact);
                formData.append('email',this.email);
                formData.append('note',this.note);
                formData.append('contracts',JSON.stringify(this.contract));
                formData.append('attachs',JSON.stringify(this.attachs));
                this.api.settle_settlement_add(formData).then((res)=>{
                    if(res!=false){
                        this.fh(-1)
                    }
                })
            },

            getData(){
                let params={name:this.$route.query.name,is_receiver:1};
                this.api.settle_settlement_detail({params}).then((res)=>{
                    this.name=res.name;
                    this.tdate=res.tdate;
                    this.account_name=res.account_name;
                    this.bank_card_id=res.bank_card_id;
                    this.bank_name=res.bank_name;
                    this.tax_id=res.tax_id;
                    this.contact=res.contact;
                    this.email=res.email;
                    this.note=res.note;
                    this.contracts=res.contracts;
                    this.attachs=res.attachs;
                })
            },
            setData(){
                var arr=[];
                for(var i=0;i<this.contracts.length;i++){
                    for(var j=0;j<this.contracts[i].length;j++){
                        arr.push((this.contracts[i][j]).archive_id);
                    }
                }
                this.contract=(this.contract).concat(arr);
                if(this.is_auto==false){
                    this.auto=1;
                }
                if(this.is_auto==true){
                    this.auto=0;
                }
                if(!this.name){
                    this.$message.error('名称不能为空');
                    return
                }
                // if(!this.tdate&&this.auto!=0){
                //     this.$message.error('生成对账时间不能为空');
                //     return
                // }
                if(!this.account_name){
                    this.$message.error('开户名不能为空');
                    return
                }
                if(!this.bank_card_id){
                    this.$message.error('银行账号不能为空');
                    return
                }
                if(!this.bank_name){
                    this.$message.error('开户银行不能为空');
                    return
                }
                if(!this.tax_id){
                    this.$message.error('信用代码不能为空');
                    return
                }
                // if(!this.contact){
                //     this.$message.error('联系人不能为空');
                //     return
                // }
                // if(!this.email){
                //     this.$message.error('对账邮箱不能为空');
                //     return
                // }
                // if(this.contract.length==0){
                //     this.$message.error('合同不能为空');
                //     return
                // }
                let formData=new FormData;
                formData.append('name',this.name);
                formData.append('is_receiver',1);
                formData.append('tdate',this.tdate);
                formData.append('is_auto',this.auto);
                formData.append('account_name',this.account_name);
                formData.append('bank_card_id',this.bank_card_id);
                formData.append('bank_name',this.bank_name);
                formData.append('tax_id',this.tax_id);
                formData.append('contact',this.contact);
                formData.append('email',this.email);
                formData.append('note',this.note);
                formData.append('contracts',JSON.stringify(this.contract));
                formData.append('attachs',JSON.stringify(this.attachs));
                this.api.settle_settlement_edit(formData).then((res)=>{
                    if(res!=false){
                        this.fh(-1)
                    }
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
    padding-top:24px ;
}
    .titName{
        display: inline-block;
        width:116px;
        height:20px;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        text-align: right;
        margin-right: 24px;
    }
    .input{
        width:457px;
        height:36px;
        padding-left: 10px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-bottom: 20px;
    }
    .titText{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(109,119,139,1);
        margin-right: 13px;
    }
    select{
        width:118px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin:0 20px 20px 0;

    }
    .check{
        width:16px;
        height:16px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        margin:0 6px 0 0!important;
    }
   textarea{
       width:452px;
       height:72px;
       padding: 8px;
       background:rgba(255,255,255,1);
       border-radius:4px;
       border:1px solid rgba(211,219,235,1);
       margin-bottom: 20px;
   }
    .ADDbtn span{
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
        margin: 0 20px 50px 140px;
    }
    .ADDs{
        display: inline-block;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        width:96px;
        height:36px;
        background:rgba(242,246,252,1);
        border-radius:4px;
        border:1px solid rgba(51,119,255,1);
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(51,119,255,1);
    }
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        z-index: 9;
        bottom: 0;
        right: 0
    }
    .content{
        position: relative;
        left: 50%;
        top: 30%;
        transform: translate(-50%,-50%);
        width:460px;
        height:312px;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 6px 0px rgba(0,0,0,0.06);
        border-radius:4px;
    }
    .content_tit span{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Medium,PingFangSC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin: 21px 0 24px 20px;
    }
    .content_btn{
        position: absolute;
        width: 100%;
        bottom: 0;
        margin-bottom: 24px;
        text-align: right;
    }
.content_btn span{
    display: inline-block;
    text-align: center;
    line-height: 36px;
    cursor: pointer;
    width:80px;
    height:36px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
    margin-right: 20px;
}
    .btn_tj{
        color: #fff!important;
        background: #3377ff!important;
        border: none!important;
    }
    .content_input{
        width:190px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        padding-left: 10px;
        margin:0  24px 0 20px;
    }
    .content_seach{
        display: inline-block;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        width:68px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);
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
    .uplaod{
        margin-left: 20px;
        width: 200px;
    }
    .titTableName{
        font-size:14px;
        font-family:PingFang-SC-Regular,PingFang-SC;
        font-weight:400;
        color:rgba(31,46,77,0.65);
    }
    .titTableCon{
        font-size:14px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:#1F2E4D;
    }
    .contract{
        max-height: 368px;
        overflow-y:auto;
    }
    .ContractID{
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(31,46,77,1);
        vertical-align: top;
    }
    .imgName{
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(31,46,77,0.65);
    }
    .statusColor{
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;

    }

</style>