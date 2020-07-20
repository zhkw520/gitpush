<template>
    <div class="bg">
        <div class="qr">
            <div class='tit'>
                <span>请选择审核结果</span>
            </div>
            <div style="margin-bottom: 30px">
                <template>
                    <div style="margin-bottom: 28px">
                        <el-radio v-model="radio" label="1">通过</el-radio>
                    </div>
                   <div style="margin-bottom: 28px">
                       <el-radio v-model="radio" label="-1">不通过</el-radio>
                   </div>
                    <div v-if="radio==-1" class="yy">
                        <div>
                            <span>请选择原因</span>
                        </div>
                        <div>
                            <input type="checkbox" v-model="chenck"/>
                            <span>物料和落地页不匹配</span>
                        </div>
                        <div>
                            <input type="checkbox" v-model="chenck2"/>
                            <span>物料内容差</span>
                        </div>
                        <div>
                            <input type="checkbox" v-model="chenck3"/>
                            <span>屏蔽竞品</span>
                        </div>
                        <div>
                            <input type="checkbox" v-model="chenck4"/>
                            <span>其他</span>
                            <input type="text" v-model="text" class="text"/>
                        </div>
                    </div>

                </template>
            </div>
            <div class="btn">
                <span class="pass" @click="qd()">确定</span>
                <span @click="qx()">取消</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['adver','channel'],
        name: "ad_affirm",
        data(){
            return{
                radio:'1',
                chenck:false,
                chenck2:false,
                chenck3:false,
                chenck4:false,
                text:'',
                msg:'',
            }
        },
        methods:{
            qx(){
                this.$parent.heid();
            },
            qd(){
                if(this.radio=='-1'){
                    if(this.chenck==false&&this.chenck2==false&&this.chenck3==false&&this.chenck4==false){
                        this.$message.error('请选择或填写驳回原因');
                        return
                    }
                }
                if(this.chenck==true){
                    this.msg+='物料和落地页不匹配'
                }
                if(this.chenck2==true){
                    this.msg+='物料内容差'
                }
                if(this.chenck3==true){
                    this.msg+='屏蔽竞品'
                }
                if(this.chenck4==true){
                    this.msg=this.msg+this.text;
                }
                let formData=new FormData;
                formData.append('adver',JSON.stringify(this.adver));
                formData.append('status',this.radio);
                formData.append('channel',this.channel);
                formData.append('msg',this.msg);
                this.api.adreview_adver_audit(formData).then((res)=>{
                    this.msg='';
                    this.text='';
                    this.$parent.heid();
                    this.$parent.dataList();
                })
            }
        },
    }
</script>

<style scoped>
.bg{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    position: fixed;
    z-index: 9;
    bottom: 0;
    right: 0;
}
    .qr{
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
        padding: 20px;
        width:420px;
        height:410px;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 6px 0px rgba(0,0,0,0.06);
        border-radius:4px;
    }
    .tit>span{
        display: inline-block;
        font-size:16px;
        font-family:PingFangSC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-bottom: 30px;
    }
    .btn{text-align: right;width: 90%}
    .btn span{
        display: inline-block;
        line-height: 36px;
        text-align: center;
        width:80px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
        cursor: pointer;
    }
    .pass{
        background:rgba(51,119,255,1)!important;
        color: #fff!important;
        border: 0!important;
        margin-right: 20px;
    }
    .yy span{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin:0 10px 21px 10px;
    }
    .yy input{
        width:16px;
        height:16px;
        background:rgba(242,246,252,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .text{
        padding-left: 10px;
        width:220px!important;
        height:32px!important;
        background:rgba(255,255,255,1)!important;
        border:1px solid rgba(211,219,235,1)!important;
    }
</style>