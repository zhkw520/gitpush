<template>
    <div class="bg">
        <div class="content">
            <div class="tit">
                <span>提示</span>
                <img src="../../../public/img/gb.png" @click="heid"/>
            </div>
            <div class="tishi">
                <span>请确定是否通过审核</span>
            </div>
            <div class="btn">
                <span class="btn_qd" @click="audit">确定</span>
                <span  @click="heid">取消</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "work-bench_auditor",
        props:['id','open_id','status'],
        data(){
            return{}
        },
        methods:{
            heid(){
                this.$parent.heidSH()
            },
            audit(){
                if(this.open_id!=undefined){
                    if(this.open_id.length<=0){
                        this.$message.error('未找到除驳回外的数据');
                        return
                    }
                    let formData = new FormData;
                    formData.append('id',this.id);
                    formData.append('status',this.status);
                    formData.append('arr_open_id',JSON.stringify(this.open_id));
                    this.api.demand_apply_audit(formData).then((res)=>{
                        if(res!=false){
                            this.$emit('upDataLists');
                            this.heid()
                        }
                    })
                }else{
                    let formData = new FormData;
                    formData.append('id',this.id);
                    formData.append('status',this.status);
                    this.api.demand_audit(formData).then((res)=>{
                        if(res!=false){
                            this.$emit('upDataLists');
                            this.heid()
                        }
                    })
                }

            },
        }
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
.content{
    position: absolute;
    left: 50%;
    top:30%;
    transform: translate(-50%,-50%);
    width:560px;
    height:228px;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 8px 0px rgba(0,0,0,0.2);
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
    margin-top: 78px;
    text-align: right;
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