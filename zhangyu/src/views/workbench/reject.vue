<template>
    <div class="bg" @click="heid">
        <div class="content" @click.stop>
            <div class="tit">
                <span>驳回</span>
                <img src="../../../public/img/gb.png" @click="heid"/>
            </div>
            <div class="tishi">
                <textarea placeholder="请输入驳回原因" v-model="note" maxlength="20"></textarea>
            </div>
            <div class="btn">
                <span class="btn_qd" @click="tj">确定</span>
                <span  @click="heid">取消</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "reject",
        props:["dbid",'id','open_id','status'],
        data(){
            return{
                note:'',
            }   
        },
        mounted(){
            console.log(this.open_id);
        },
        methods:{

            heid(){
                this.$parent.heidBH();
            },
           tj(){
                if(this.id!=undefined){
                    if(!this.note){
                        this.$message.error("驳回原因不能为空");
                        return
                    }
                    let formData = new FormData;
                    formData.append("note",this.note);
                    formData.append("status",this.status);
                    formData.append('id',this.id);
                    formData.append('arr_open_id',JSON.stringify(this.open_id));
                    this.api.demand_apply_reject(formData).then((res)=>{
                        if(res!=false){
                            this.$emit('upDataLists');
                            this.heid()
                        }
                    })
                }else{
                    if(!this.note){
                        this.$message.error("驳回原因不能为空");
                        return
                    }
                    let formData = new FormData;
                    formData.append("note",this.note);
                    formData.append("status",this.status);
                    formData.append('id',this.dbid);
                    this.api.demand_reject(formData).then((res)=>{
                        if(res!=false){
                            this.$emit('upDataLists');
                            this.heid()
                        }
                    })
                }

           },
        },
    }
</script>

<style scoped>
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        z-index: 999;
        bottom: 0;
        right: 0;
    }
    .content{
        position: absolute;
        left: 50%;
        top:30%;
        transform: translate(-50%,-50%);
        width:588px;
        height:380px;
        background:rgba(255,255,255,1);
        border-radius:4px;

    }
    .tit{
        height: 56px;
        border-bottom: 1px solid #ddd;
    }
    .tit>span{
        display: inline-block;
        line-height: 56px;
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        margin-left: 24px;
    }
    .tit>img{
        display: inline-block;
        margin-top: 20px;
        width:16px;
        height:16px;
        float: right;
        margin-right: 24px;
        cursor: pointer;
    }

    .tishi textarea{
        width:520px;
        height:180px;
        padding: 10px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        resize: none;
        margin: 23px 0 0 23px;
    }
    .tishi span{
        display: inline-block;
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        margin-top: 15px;
        margin-left: 24px;
    }
    .btn{
         margin-top: 50px;
         text-align: right;
        margin-bottom: 10px;
     }
    .btn span{
        display: inline-block;
        width:68px;
        height:36px;
        line-height: 36px;
        text-align: center;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        margin-right: 24px;
        cursor: pointer;
    }
    .btn_qd{
        background:rgba(51,119,255,1)!important;
        border: 0!important;
        color:rgba(255,255,255,1)!important;
        margin-right: 14px!important;
    }
</style>