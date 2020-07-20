<template>
    <div class="bg">
        <div class="centNavBox">
            <div class="title">
                <span class="title_zy">添加物料</span>
                <div class="title_div">
                    <span class="title_div_span">已制作物料：</span>
                    <span class="title_div_span">{{this.total}}</span>
                    <span class="title_div_span">/</span>
                    <span class="title_div_span">{{this.numAlls}}</span>
                    <span class="title_div_btn" @click="ADDline">
                      <span>+</span>
                        增加一行
                    </span>
                </div>
            </div>
            <div style="width: 100%;height: 635px;overflow-y:auto ">
                <div class="table_material">
                    <div class="content_title" v-for="(item,index) in listWL">
                        <div  style="display: inline-block" >
                            <img class="content_title_img" src="../../../public/img/ADD_bule.png"/>
                            <span class="content_title_span" @click="bdUP(index)" :class="{disabled:listWL[index].bind!=undefined}">本地上传</span>
                        </div>
                        <div class="btn_img" >
                            <img style="margin-right: 34px" src="../../../public/img/delet.png" @click="delLine(index)"/>
                        </div>
                        <div  class="img_box">
                            <div class="ADD_img" v-for="(data2,index3) in item.bind" >
                                <img  class="ADD_img_img" :src="data2.prev_uri" v-if="(data2.prev_uri.split('.'))[(data2.prev_uri.split('.').length-1)]!='mp4'"/>
                                <video class="ADD_img_img" :src="data2.prev_uri" controls="controls" v-if="(data2.prev_uri.split('.'))[(data2.prev_uri.split('.').length-1)]=='mp4'" />
                                <span>{{data2.mfid}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="Add_btn">
                <span class="Add_btn_ADD" @click="verified()">添加</span>
                <span @click="heid">取消</span>
                <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="page"
                            :page-sizes="[10,15,20]"
                            :page-size="p"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                    </el-pagination>
                </div>
            </div>
            </div>
    </div>
</template>

<script>
    export default {
        props:['id','types','status'],
        name: "a-d-d_material",
        data(){
            return{
                p:3,
                page:1,
                total:0,
                listWL:[],
                numAll:0,
                numAlls:0,
                line_num:'',
            }
        },
        mounted(){
            this.getDATA()
            },
        methods:{
            bdUP(index){
                if(this.listWL[index].bind!=undefined){
                    return
                }else{
                    this.line_num = this.listWL[index].line_num;
                    if(this.line_num==undefined){
                        this.line_num=0;
                    }
                    this.$parent.getADD(this.line_num);
                    this.$parent.heidAddWl();
                }

            },
            handleSizeChange(p){
                this.p = p;
                this.getDATA()
            },
            handleCurrentChange(page){
                this.page = page;
                this.getDATA();
            },
            ADDline(){
                if(this.total>=this.numAlls){
                    return
                }
                this.listWL.unshift({text:false});
            },
            heid(){
                this.$parent.heidAddWl();
            },
            getWl(){
                this.$parent.Getscwl();
                this.$parent.heidAddWl();
            },
            delLine(index){
                    if(this.listWL[index].line_num==undefined){
                        this.listWL.splice(index,1);
                    }else{
                        let formData = new FormData;
                        formData.append('id',this.id);
                        formData.append('material',0);
                        formData.append('line_num',this.listWL[index].line_num);
                        formData.append('mfid',this.listWL[index].bind[0].mfid);
                        this.api.demand_business_bind_del(formData).then((res)=>{
                            this.getDATA()
                        });
                    }
            },


            getDATA(){
                let params = {id:this.id,p:this.p,page:this.page};
                this.api.demand_business_status_mfbind({params}).then((res)=>{
                    this.listWL = res.data.mfinal;
                    this.numAlls=res.data.m_num;
                    this.total=res.total;
                    console.log(res);
                })
            },

            verified(){
                if(this.total==this.numAlls){
                    let formData = new FormData;
                    formData.append('id',this.id);
                    formData.append('status',this.status);
                    this.api.demand_audit(formData).then((res)=>{
                        if(res!=false){
                            this.$emit('upDataLists');
                            this.heid()
                        }
                    })
                }else{
                    this.$message.error('添加资源的数量未达到需求数量')
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
        z-index: 9;
        bottom: 0;
        right: 0;
    }

    .centNavBox{
        width:1106px;
        height:750px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        position: relative;
        left: 50%;
        top:50%;
        transform:translate(-50%,-50%);
    }
    .title{
        height: 55px;
        border-bottom: 1px solid #E6E9F0;
    }
    .table_material{
        margin:0 39px;
    }
    .Add_btn{
        width:1042px;
        height:80px;
        background:rgba(247,249,252,1);
        border-radius:0px 0px 4px 4px;
        margin-top: 60px;
        padding-left: 40px;
        padding-right: 24px;
        position: fixed;
        bottom: 0;
        left:0;
    }
    .Add_btn span{
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
        line-height: 36px;
        text-align: center;
        cursor: pointer;
        margin-top: 17px;
        margin-right: 24px;
    }
    .Add_btn_ADD{
        background:rgba(51,119,255,1)!important;
        color: rgba(255,255,255,1)!important;
        margin-right: 14px!important;
        margin-left: 40px;
    }

    .title_zy{
        display: inline-block;
        line-height: 55px;
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        margin-left: 24px;
    }
    .table_content_right img{
        display: inline-block;
        height: 80px;
        width: 108px;
    }

    .title_div{
        display: inline-block!important;
        float: right;
        height: 55px;
        margin-right: 24px;
    }
    .title_div_span{
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,119,255,1);
        line-height: 55px;
    }
    .title_div_btn{
        display: inline-block;
        width:101px;
        height:32px;
        background:rgba(24,144,255,1);
        border-radius:4px;
        line-height: 32px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        text-align: center;
        margin-left: 16px;
        cursor: pointer;
    }
    select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 26px;
    }
    .content_title{
        margin-top: 24px;
        border-bottom: 1px solid #E6E9F0;
        padding-bottom: 24px;
    }
    .content_title_span{
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,119,255,1);
        margin-right: 24px;
        cursor: pointer;
    }
    .content_title_img{
        margin-right: 8px;
        cursor: pointer;
    }
    .btn_img{
        display: inline-block;
        float: right;
        margin-top: 6px;
    }
    .btn_img img{
        width:18px;
        cursor: pointer;
    }
    .img_box{
        height: 130px;
        width: 1028px;
        overflow-x:auto;
    }
    .ADD_img{
        display: inline-block;
        width: 108px;
        height: 110px;
        margin-right: 48px;
    }
    .ADD_img_img{
        display: inline-block;
        width: 108px;
        height: 80px;
    }
    .ADD_img_del{
        position: relative;
        width:16px;
        height:16px;
        right: -100px;
        top: 10px;
    }
    .ADD_img span{
        display:inline-block;
        width: 108px;
        overflow: hidden;
    }
    .block{
        display: inline-block;
        float: right;
        margin-bottom: 0!important;
    }
    .zy_type{
        display: inline-block;
        margin-left: 50px;
        height: 56px;
    }
    .zy_type span{
        display: inline-block;
        width:60px;
        height: 50px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        line-height: 55px;
        cursor: pointer;
        margin-right: 57px;
    }
    .active{
        color:rgba(51,119,255,1)!important;
        border-bottom: 3px solid rgba(51,119,255,1)!important;
    }
    .block .el-pagination{
        margin-top: 0!important;
    }
    .block{
        margin-top: 17px;
    }
    .disabled{
        color: #c5c5c5;
    }
</style>