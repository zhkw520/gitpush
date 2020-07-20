<template>
    <div class="bg">
        <div class="centNavBox">
            <div class="title">
                <span class="title_zy">添加资源</span>
                <div class="zy_type">
                    <span @click="ADDsc" :class="{active:sc==true}">添加素材</span>
                    <span @click="ADDwl" :class="{active:wl==true}">添加物料</span>
                </div>
                <div class="title_div">
                    <span class="title_div_span">已添加：</span>
                    <span class="title_div_span">{{numWL+numSC}}</span>
                    <span class="title_div_span">/</span>
                    <span class="title_div_span">{{num}}</span>
                    <span class="title_div_btn" @click="ADDline">
                      <span>+</span>
                        增加一行
                    </span>
                </div>
            </div>
            <div style="width: 100%;height: 635px;overflow-y:auto ">
                <div class="table_material">
                    <div class="content_title" v-for="(item,index) in listSC" v-if="sc">
                        <div>
                            <div  style="display: inline-block">
                                <img class="content_title_img" src="../../../public/img/ADD_bule.png"/>
                                <span class="content_title_span" @click="handleClick(index)" >素材库选择</span>
                                <img class="content_title_img" src="../../../public/img/ADD_bule.png"/>
                                <span class="content_title_span" @click="ts(index)">添加特殊素材</span>
                                <img class="content_title_img" src="../../../public/img/ADD_bule.png"/>
                                <span class="content_title_span" @click="getBD(index)">本地上传</span>
                                <img class="content_title_img" src="../../../public/img/ADD_bule.png" />
                                <span class="content_title_span" @click="upImg(index)" >上传附件</span>
                            </div>
                            <div class="btn_img">
                                <img style="margin-right: 34px" src="../../../public/img/delet.png" @click="delLine(index)"/>
                                <img  src="../../../public/img/comment.png" @click="importText(index)"/>
                            </div>
                        </div>
                        <div  class="img_box">
                            <div class="ADD_img" v-for="(datas,index2) in item.bind" >
                                <img class="ADD_img_del" src="../../../public/img/del.png" @click="delmid(index,datas.mid)">
                                <img  class="ADD_img_img" :src="datas.prev_uri" v-if="(datas.prev_uri.split('.'))[(datas.prev_uri.split('.').length-1)]!='mp4'"/>
                                <video class="ADD_img_img" :src="datas.prev_uri" controls="controls" v-if="(datas.prev_uri.split('.'))[(datas.prev_uri.split('.').length-1)]=='mp4'" />
                                <span>{{datas.mid}}</span>
                            </div>
                            <div class="ADD_img" v-for="(data,index2) in item.middleware" >
                                <img class="ADD_img_del" src="../../../public/img/del.png" @click="delIMG(index,data.id)">
                                <img  class="ADD_img_img" :src="data.url"  v-if="(data.url.split('.'))[(data.url.split('.').length-1)]!='mp4'&&(data.url.split('.'))[(data.url.split('.').length-1)]!='zip'"/>
                                <div  class="ADD_img_img" style="text-align:center;" v-if="(data.url.split('.'))[(data.url.split('.').length-1)]=='zip'"> 无预览图</div>
                                 <video class="ADD_img_img" :src="data.url" controls="controls" v-if="(data.url.split('.'))[(data.url.split('.').length-1)]=='mp4'" />
                                <span>{{data.name}}</span>
                            </div>
                        </div>
                        <div  style="width: 100%;margin-top: 20px">
                            <textarea :id="index" placeholder="请输入您的备注（限200字）" maxlength="200" style="padding: 8px;width: 100%;resize:none;"  v-model="item.note" v-if="line.indexOf(index)!=-1" @blur="addNote(index)"></textarea>
                        </div>
                    </div>

                    <div v-if="wl" class="content_title" v-for="(item,index) in listWL">
                        <div  style="display: inline-block" >
                            <img class="content_title_img" src="../../../public/img/ADD_bule.png"/>
                            <span class="content_title_span" @click="getWl(index)" :class="{disabled:listWL[index].bind!=undefined}">物料库选择</span>
                        </div>
                        <div class="btn_img" >
                            <img style="margin-right: 34px" src="../../../public/img/delet.png" @click="delLine(index)"/>
                        </div>
                        <div class="img_box">
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
                            :page-sizes="[10, 15, 20]"
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
        props:['id','num','ind','typeList','status','types','typeName'],
        name: "add_the_resource",
        data(){
            return{
                listSC:[],
                listWL:[],
                page:1,
                p:10,
                sc:true,
                wl:false,
                total:0,
                line_num:'',
                mfid:'',
                material:1,
                numAll:0,
                note:'',
                line:[],
                numWL:"",
                numSC:"",
                bidID:[],
            }
        },
        mounted(){
            
            if(this.typeList==1){
                this.sc = false;
                this.wl=true;
            }

            this.getDataList();
            this.getDataListWl();
        },
        methods:{
            ADDline(){
                if(this.sc==true){
                    if((this.numWL+this.numSC)==this.num){
                        return
                    }else{
                        this.listSC.unshift({text:false});
                    }
                }else{
                    if((this.numWL+this.numSC)==this.num){
                        return
                    }else{
                        this.listWL.unshift({text:false});
                    }
                }
            },
            delmid(index,id){
                    let formData = new FormData;
                    formData.append('id',this.id);
                    formData.append('material',1);
                    formData.append('line_num', this.listSC[index].line_num);
                    formData.append('mid', JSON.stringify([id]));
                    this.api.demand_business_bind_del(formData).then((res)=>{
                        this.getDataList()
                    })
            },
            delIMG(index,id){
                let formData = new FormData;
                formData.append('id',this.id);
                formData.append('line_num',this.listSC[index].line_num);
                formData.append('middle_id',id);
                this.api.demand_business_middleware_del(formData).then((res)=>{
                    this.getDataList();
                })
            },
            delLine(index){
                if(this.sc ==true){
                        if(this.listSC[index].line_num==undefined){
                            this.listSC.splice(index,1);
                            return
                        }else{
                            let formData = new FormData;
                            formData.append('id',this.id);
                            formData.append('material',1);
                            formData.append('line_num', this.listSC[index].line_num);
                            this.api.demand_business_bind_del(formData).then((res)=>{
                                this.getDataList()
                            })
                        }

                }else{
                    if(this.listWL[index].line_num==undefined){
                        this.listWL.splice(index,1);
                    }else{
                        let formData = new FormData;
                        formData.append('id',this.id);
                        formData.append('material',0);
                        formData.append('line_num',this.listWL[index].line_num);
                        formData.append('mfid',this.listWL[index].bind[0].mfid);
                        this.api.demand_business_bind_del(formData).then((res)=>{
                            this.getDataList()
                        });
                    }
                }

            },
            importText(index){
                this.line_num = this.listSC[index].line_num;
                if(this.line_num==undefined){
                    this.line_num=0;
                }
                if(this.line.indexOf(index)==-1){
                    this.line.push(index);
                }else{
                    for (var i=0;i<this.line.length;i++){
                        if(this.line[i]==index){
                            this.line.splice(i,1)
                        }
                    }
                }

            },
            handleSizeChange(p){
                this.p = p;
                this.getDataList()
            },
            handleCurrentChange(page){
                this.page = page;
                this.getDataList();
            },
            heid(){
                this.$parent.heidAddMaterial();
            },
            handleClick(index){
                if(this.sc ==true){
                  this.line_num = this.listSC[index].line_num;
                  if(this.line_num==undefined){
                      this.line_num=0;
                  }
                }else{
                    this.line_num =  this.listWL[index].line_num
                    if(this.line_num==undefined){
                        this.line_num=0;
                    }
                }

                this.$parent.getSet(this.line_num);
                this.$parent.heidAddMaterial();
            },
            getBD(index){
                if(this.sc ==true){
                    this.line_num = this.listSC[index].line_num;
                    if(this.line_num==undefined){
                        this.line_num=0;
                    }
                }else{
                    this.line_num =  this.listWL[index].line_num;
                    if(this.line_num==undefined){
                        this.line_num=0;
                    }
                }
                this.$parent.getBD(this.line_num);
                this.$parent.heidAddMaterial();
            },
            ts(index){
                 
                this.line_num = this.listSC[index].line_num;
                if(this.line_num==undefined){
                    this.line_num=0;
                }
                
                if(window.location.host=='ts-centerweb.idatachain.cn'||window.location.host=='localhost:8080'){
                    this.bidID=['ADP_178']
                }
                if(window.location.host=='c2.zookingsoft.com'){
                    this.bidID=['ADP_1']
                }
                 let formData = new FormData;
                        formData.append('id',this.id);
                        formData.append('material',1);
                        formData.append('line_num',this.line_num);
                        formData.append('mid',JSON.stringify(this.bidID));
                        this.api.demand_business_bind(formData).then((res)=>{
                            if(res!=false){
                                this.getDataList();
                            }
                        })
            },
            upImg(index){
                this.line_num = this.listSC[index].line_num;
                if(this.line_num==undefined){
                    this.line_num=0;
                    this.$parent.getBU(this.line_num,1);
                    this.$parent.heidAddMaterial();
                }else{
                    this.$parent.getBU(this.line_num);
                    this.$parent.heidAddMaterial();
                }
               
            },
            getWl(index){
                if(this.listWL[index].bind!=undefined){
                    return
                }else{
                    this.$parent.getWl(this.types,this.typeName);
                    this.$parent.heidAddMaterial();
                }

            },
            ADDsc(){
                this.sc = true;
                this.wl = false;
                this.getDataList();

            },
            ADDwl(){
                this.wl = true;
                this.sc = false;
                this.getDataList()
            },
            getDataList(){
                if(this.sc==true){
                    this.material=1
                }else{
                    this.material=0
                }
                let params = {id:this.id,p:this.p,page:this.page,material:this.material};
                this.api.demand_business_bind_list({params}).then((res)=>{
                    if(this.sc==true){
                        this.listSC = res.data.material;
                        this.total = res.total;
                        this.numSC=res.total;
                    }else{
                        this.listWL = res.data.mfinal;
                        this.total = res.total;
                        this.numWL=res.total;
                    }

                })
            },
            getDataListWl(){

                let params = {id:this.id,p:this.p,page:this.page,material:0};
                this.api.demand_business_bind_list({params}).then((res)=>{
                        this.numWL=res.total;

                })
            },
            addNote(index){
                let formData =new FormData;
                formData.append('id',this.id);
                formData.append('material',1);
                formData.append('line_num',this.line_num);
                formData.append('note',document.getElementById(index).value);
                this.api.demand_business_bind_note( formData).then((res)=>{
                    this.getDataList();
                })
            },
            verified(){
                if((this.numWL+this.numSC)==this.num){
                    let formData = new FormData;
                    formData.append('id',this.id);
                    formData.append('status',this.status);
                    this.api.demand_audit(formData).then((res)=>{
                        if(res!=false){
                            this.$emit('upDataLists');
                            this.heid();
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
        width:100%;
        height:80px;
        background:rgba(247,249,252,1);
        border-radius:0px 0px 4px 4px;
        position: fixed;
        bottom: 0;
        left: 0;
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
        display: inline-block;
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
        height: 21px;
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
        width:70px;
        height: 50px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        line-height: 55px;
        cursor: pointer;
        margin-right: 57px;
        text-align: center;
    }
    .active{
        color:rgba(51,119,255,1)!important;
        border-bottom: 3px solid rgba(51,119,255,1)!important;
    }
    .block .el-pagination{
        margin-top: 0!important;
    }
    .block{
        margin-top: 12px;
    }
    .disabled{
        color: #c5c5c5;
    }
</style>