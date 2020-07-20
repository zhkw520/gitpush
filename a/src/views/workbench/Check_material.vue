<template>
    <div class="bg">
        <div class="centNavBox">
            <div class="title">
                <span>查看素材</span>
                <div class="zy_type">
                    <span  class="active">添加素材</span>
                </div>
                <div class="num">
                    <span>已添加：{{this.total}}</span>
                </div>
            </div>
            <div style="width: 100%;height: 635px;overflow-y:auto ">
                <div class="table_material" v-for="(item,index) in listSC">
                    <div class="table_material_tit">
                        <el-checkbox-group v-model="checkList">
                            <el-checkbox :label="index"></el-checkbox>
                        </el-checkbox-group>
                        <span style="display: inline-block;margin: 0 26px 0 18px" v-if='type==""'>{{item.line_num}}</span>
                        <span class="table_material_tit_sc" v-if='type==""'>素材</span>
                         <span class="table_material_tit_sc" style="margin-left:16px" v-if='type!=""'>素材</span>
                        <a class="download" v-if='item.attach' :href="item.attach.url" >下载</a>
                    </div>
                    <div class="img_box">
                        <div  class="ADD_img" v-if='type==""'>
                            <img :src="item.prev_uri" class="ADD_img_img"  preview='0' v-if="(item.prev_uri.split('.'))[(item.prev_uri.split('.')).length-1]!='mp4'"/>
                            <video  :src="item.prev_uri" controls="controls" class="ADD_img_img" v-if="(item.prev_uri.split('.'))[(item.prev_uri.split('.')).length-1]=='mp4'" /> 
                            <span>{{item.mid}}</span>
                        </div>
                         <div  class="ADD_img" v-if='type!=""'>
                            <img :src="item.main_preview" class="ADD_img_img"  preview='0'  v-if='item.type=="th_lock_screen"||item.type=="th_icon"||item.type=="th_second_page"'/>
                            <span v-if='item.type=="th_lock_screen"||item.type=="th_icon"||item.type=="th_second_page"'>{{item.thmid}}</span>
                            <img :src="item.prev_uri" class="ADD_img_img"  preview='0' v-if='item.type!="th_lock_screen"&&item.type!="th_icon"&&item.type!="th_second_page"'/>
                            <span v-if='item.type!="th_lock_screen"&&item.type!="th_icon"&&item.type!="th_second_page"&&item.type!=""'>{{item.mid}}</span>
                        </div>
                         <!-- <div  class="ADD_img" v-if='type!="th_lock_screen"&&type!="th_icon"&&type!="th_second_page"&&type!=""'>
                            <img :src="item.prev_uri" class="ADD_img_img"  preview='0'/>
                            <span>{{item.mid}}</span>
                        </div> -->
                    </div>
                    <div>
                    </div>
                </div>
            </div>

            <div class="Add_btn">
                <div class="checkSelect">
                    <el-checkbox v-model="value" @change="all">全选</el-checkbox>
                </div>
                <span class="ALLdownload" @click="downloadImg()">下载({{this.checkList.length}})</span>
                <span @click="heid">取消</span>
                <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="page"
                            :page-sizes="[ 10, 15, 20]"
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
        props:['id','status_num'],
        name: "a-d-d_material",
        data(){
            return{
                checkList:[],
                value:false,
                material:1,
                page:1,
                p:10,
                listSC:[],
                total:0,
                numAll:0,
                imgList:[],
                type:''

            }
        },
        mounted(){
            
            if(this.status_num){
                 this.dataList()
            }else{
                this.getDataList();
            }
           
        },
        methods:{
            heid(){
                this.$parent.heidCm();
            },
            getDataList(){
                let params = {id:this.id,p:this.p,page:this.page};
                this.api.demand_material_bind_list({params}).then((res)=>{
                    this.listSC = res.data;
                    this.total = res.total;
                })
            },
            dataList(){
                let params = {id:this.id,p:this.p,page:this.page};
                this.api.demand_material_list({params}).then((res)=>{
                    this.listSC = res.data;
                    this.total = res.total;
                    this.type=this.listSC[0].type;
                })
            },
            handleSizeChange(p){
                this.p = p;
                this.getDataList();
            },
            handleCurrentChange(page){
                this.page = page;
                this.getDataList();
            },
            all(){
                if(this.value==true){
                    for(var i=0;i<this.listSC.length;i++){
                        if(this.checkList.indexOf(i)==-1){
                            this.checkList.push(i);
                        }
                    }
                    return
                }
                this.checkList=[];
            },
            downloadImg(){
                this.imgList=[];
                for(var i =0;i<this.checkList.length;i++){
                    this.imgList.push(this.listSC[i].attach.url);
                }
                this.imgList.forEach(item =>{
                        fetch(item).then(res => res.blob().then(blob => {
                            const a = document.createElement('a');
                            document.body.appendChild(a)
                            a.style.display = 'none'
                            // 使用获取到的blob对象创建的url
                            const url = window.URL.createObjectURL(blob);
                            var filename = res.url.split('/')[res.url.split('/').length-1];
                            a.href = url;
                            // 指定下载的文件名
                            a.download = filename;
                            a.click();
                            document.body.removeChild(a);
                            // 移除blob对象的url
                            window.URL.revokeObjectURL(url);
                        }));
                })
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
    .title>span{
        display: inline-block;
        line-height: 55px;
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        margin-left: 24px;
    }
    .table_material{
        margin: 20px 24px 0 24px;
        width:1058px;
        height:188px;
        background:rgba(245,247,250,1);
        border-radius:4px;
        border:1px solid rgba(230,233,240,1);
    }

    .table_material_tit{
        height: 71px;
        margin: 0 35px;
    }
    .table_material_tit_sc{
        display: inline-block;
        font-size:16px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(143,155,179,1);
        line-height: 71px;
    }
    .Add_btn{
        width:100%;
        height:58px;
        background:#F7F9FC;
        border-radius:0px 0px 4px 4px;
        box-shadow: 0px -3px 5px #E0DFDF;
        position: fixed;
        left:0;
        bottom: 0;


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
        margin-top:12px;
        margin-right: 24px;
    }
    .ALLdownload{
        width:104px!important;
        height:36px!important;
        background:rgba(51,119,255,1)!important;
        border-radius:4px!important;
        color:rgba(255,255,255,1)!important;
        margin-left: 11px;

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
    .num{
        display: inline-block;
        float: right;
        margin-right: 24px;
    }
    .num span{
        line-height: 55px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,119,255,1);
    }
    .download{
        float: right;
        display: inline-block;
        width:105px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height: 36px;
        text-align: center;
        margin-top: 17px;
        cursor: pointer;
    }
    .img_box{
        height: 130px;
        width: 1028px;
        overflow-x:auto;
        margin-left: 15px;
    }
    .ADD_img{
        display: inline-block;
        width: 108px;
        height: 110px;
        margin-right: 48px;
        text-align: center;
    }
    .ADD_img_img{
        display: inline-block;
        max-width: 108px;
        max-height: 80px;
    }

    .ADD_img span{
        display:block;
        width:100%;
        overflow: hidden;
    }
    .block{
        display: inline-block;
        float: right;
        margin-bottom: 0!important;
        margin-top: 10px;
        margin-right: 24px;
    }
    .block .el-pagination{
        margin-top: 0!important;
    }
    .checkSelect{
        display: inline-block;
        margin-left: 54px;
    }
</style>