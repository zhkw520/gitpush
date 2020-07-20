<template>
  <div>
        <div>
            <div class="top_name">
                <span class="top_txt gesture" @click='fh'>广告内容审核&nbsp;/&nbsp;图片审核</span>
                <div class="title_left">
                    <span>图片审核</span>
                </div>
                <span  class='tits'>项目：</span>
                <select v-model="pid">
                    <option value="">全部</option>
                    <option value="1" >魅族开屏</option>
                    <option value="2" >魅族信息流</option>
                    <option value="3" >金立开屏</option>
                </select>
                <span class='tits'>三方广告源ID：</span>
                <select v-model="sdk_id" @change="ganged()">
                    <option value="">全部</option>
                    <option :value="item.sdk_id" v-for='(item,index) in adAPI'>{{item.sdk_id}}</option>
                </select>
                <span class='tits' v-if='sdk_id!=""'>三方广告位ID：</span>
                <select v-model="id_adsrc" v-if='sdk_id!=""'>
                    <option value="">全部</option>
                    <option :value="item"  v-for='item in adAPI[index].id_adsrc'>{{item}}</option>
                </select>
                <span class='tits'>页码：</span>
                <input type="number" placeholder="输入页码" v-model="page"/>
                <div class='sel'>
                    <span @click='getData()'>查询</span>
                    <span class='yjqr' @click='tc()'>一键确认</span>
                </div>
            </div>
        </div>
       
          <div class="content_right">
            <div class="titel_table">
                <span class="circle"></span>
                <span>共</span>
                <span class="all">{{total}}</span>
                <span>项&nbsp&nbsp</span>
            </div>
            <div class='tableBox'>
                <template>
                    <el-table
                            :data="tableData"
                            style="width: 100%"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            >
                       
                        <el-table-column
                                label="图片"
                                width="150">
                                <template slot-scope="scope">
                                    <!-- <img :src='tableData[scope.$index].image_url' style="max-width:80px;max-height: 80px;cursor: pointer"  preview="0" /> -->
                                    <el-tooltip placement="right" class="tit_txt_2 logs tit_txts">
                                        <div slot="content">
                                            <img :src='tableData[scope.$index].image_url' style="max-width:261px;max-height: 464px;"/>
                                        </div>
                                        <img :src='tableData[scope.$index].image_url' style="max-width:80px;max-height: 80px;cursor: pointer"  preview="0" />
                                    </el-tooltip>
                                </template>
                        </el-table-column>
                       
                        <el-table-column
                                prop="a"
                                width="180"
                                label="落地页">
                                 <template slot-scope="scope">
                                    <a :href='tableData[scope.$index].preview_url' target="_blank" style="color:#3377ff;cursor: pointer">点击查看</a>
                                    <a :href='tableData[scope.$index].assist_url' v-if="tableData[scope.$index].assist_url" target="_blank" style="color:#3377ff;cursor: pointer;margin-left:10px">辅助查看</a>
                                </template>
                        </el-table-column>
                        <el-table-column
                                prop=""
                                label="AI标签">
                                 <template slot-scope="scope">
                                 <span v-for='val in tableData[scope.$index].ai_tags'>{{val.tags_name+"("+val.confidence+"%)"}},</span>
                                </template>
                        </el-table-column>
                        <el-table-column
                                prop=""
                                label="分类">
                                 <template slot-scope="scope">

                                    <span class='tagsName'  
                                    v-for='(da,num) in tableData[scope.$index].tags' 
                                    :class="{'act': da.isShow}"  
                                    style="margin-right:15px" 
                                    @click='sgtData(da,tableData[scope.$index].mid,num,scope.$index)'
                                    >{{da.tags_name}}</span>

                                </template>
                        </el-table-column>
                        <el-table-column
                                prop=""
                                width='90'
                                label="确认状态">
                                 <template slot-scope="scope">
                                    <span>{{tableData[scope.$index].status_name}}</span>
                                </template>
                        </el-table-column>
                       
                    </el-table>
                </template>
            </div>
          
        </div>
        <div class='tcvBox' v-if='this.show'>
            <div class='box'>
                <div class='box_tit'>
                    <span>
                        一键确认
                    </span>
                </div>
                <div class='box_con'>
                    <span>确认更新当前分类数据？</span>
                </div>
                <div class='btn'>
                   
                    <span class='qx' @click='heid()'>取消</span>
                     <span class='yes' @click='add()'>确认</span>
                </div>
            </div>
        </div>
         <loading v-if='load'></loading>
  </div>
</template>

<script>
import loading from '../../components/loading'
export default {
    components:{loading},
        data(){
            return{
                tableData:[{a:'1'}],
                sdk_id:"",
                id_adsrc:"",
                p:10,
                page:1,
                total:"",
                process:"",
                adAPI:[],
                index:0,
                tags:[],
                advers:[],
                show:false,
                list:[],
                tagsList:[],
                pid:"",
                load:true
            }
        },
        
        mounted(){
            this.getData()
        },
       
        methods:{
            fh(){
                this.$router.go(-1)
            },
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:rgb(246, 245, 245,1);color:rgba(30,30,30,1);text-align:center;font-size:16px;font-weight:blod;font-family:PingFang-SC-Regular;'
                } else {
                    return ''
                }
            },
             cell({row, column, rowIndex, columnIndex}){
                return 'text-align:center;color:#000;font-size:16px;font-weight:400;font-family:PingFang-SC-Regular;'
            },
            getData(a){
                var res=/^\+?[1-9]\d*$/;
                if(!res.test(this.page)){
                    this.$message.error('页码只能为大于零的正整数');
                    return
                }
                 this.load=true
                let params={sdk_id:this.sdk_id,id_adsrc:this.id_adsrc,p:this.p,page:this.page,pid:this.pid,status:0}
                this.api.adver_tags_pending({params}).then((res=>{
                    this.total=res.total;
                    this.load=false;
                        this.updata();
                        this. getAPI();
                        this.getTags(res.data)       
                }))
            },
            getAPI(){
                this.api.adver_tags_config_sdkid().then((res=>{
                    this.adAPI=res
                }))
            },
            updata(){this.$previewRefresh()},
            ganged(){
                if(this.sdk_id!=''){
                    for(var i=0;i<this.adAPI.length;i++){
                        if(this.sdk_id==this.adAPI[i].sdk_id){
                            this.index=i
                        }
                    }
                }
            },
            getTags(data){
                this.api.adver_tags_config_opstags().then((res)=>{
                    res.forEach(item => {
                        item.isShow = false
                    })
                    this.tagsList = res
                    data.forEach((item, index) =>{
                        item.tags = JSON.parse(JSON.stringify(res))
                    })
                    this.tableData =data
                    this.updata();
                })
            },
             sgtData(name,id,indexs, idxs){
                    this.tableData[idxs].tags[indexs].isShow = !this.tableData[idxs].tags[indexs].isShow
                    if(this.advers.length==0){
                            var obj={
                                mid:'',
                                tags:[]
                            };
                            obj.mid=id;
                            (obj.tags).push(name);
                            this.advers.push(obj); 
                            console.log(this.advers)                   
                            return
                    }
                    if(this.advers.length>0){
                        var bFind = false;
                        var sFind = false;
                        for(var i=0;i<this.advers.length;i++){
                            if(this.advers[i].mid!=id){             
                                continue;
                            } 
							bFind =true;
                            if(this.advers[i].mid==id){
                                for(var s=0;s<this.advers[i].tags.length;s++){
                                    if(this.advers[i].tags[s].tags_id!=name.tags_id){
                                        continue;
                                    }
                                    sFind=true;
                                }
                                if(!sFind){
                                     (this.advers[i].tags).push(name);
                                    console.log(this.advers) 
                                    return
                                }
                                // (this.advers[i].tags).push(name);
                                // console.log(this.advers) 
                                // return
                            }
                            if(this.advers[i].mid==id&&this.advers[i].tags.length>1){
                                for(var k=0;k<this.advers[i].tags.length;k++){
                                    if(this.advers[i].tags[k].tags_id==name.tags_id){
                                        (this.advers[i].tags).splice(k,1);
                                        console.log(this.advers) 
                                        return
                                    }
                                
                                }
                            }
                            if(this.advers[i].mid==id&&(this.advers[i].tags).indexOf(name)!=-1&&this.advers[i].tags.length<2){
                                this.advers.splice(i,1); 
                                console.log(this.advers)                           

                            }
                        }
						if(!bFind)
						{
							var obj = {
							    mid:'',
							    tags:[]
							};
							
							obj.mid=id;
							(obj.tags).push(name);
							this.advers.push(obj); 
							console.log(this.advers) 
							return
						}
                    }
                
                },

            tc(){
                 if(this.advers.length==0){
                    this.$message.error('请最少配置一个分类');
                    return
                    
                }
                this.show=true;
            },
            heid(){
                this.show=false;
            },
            add(){
                let formData = new FormData;
                formData.append('advers',JSON.stringify(this.advers));
                this.api.adver_tags_audit(formData).then((res)=>{
                    if(res!=false){
                        this.advers=[];
                        this.getData();
                        this.heid();
                    }
                })
            },
            
        }
}
</script>

<style scoped>
    .top_name{height: 130px}
    .top_txt,.title_left span{
        margin-left: 24px;
    }
    
    .tit_name,.tits{
        display: inline-block;
        font-size: 14px;
        font-family: PingFang-SC;
        font-weight: 500;
        color: rgba(31,46,77,1);
        margin:0 10px 0 24px;
    }
    select{
        width: 200px;
        height: 36px;
        background: rgba(255,255,255,1);
        border-radius: 4px;
        border: 1px solid rgba(211,219,235,1);
    }
    input{
        width: 80px;
        height: 30px!important;
        padding-left: 3px!important;
        border: 1px solid rgba(211,219,235,1)!important;
    }
    .sel{
        display: inline-block;
        float: right;
        margin-right: 20%;
    }
    .sel span{
        display: inline-block;
        height: 36px;
        line-height: 36px;
        cursor: pointer;
        border-radius: 5px;
        color: #f5f6fa;
        background: #3377ff;
        border: 0;
        text-align: center;
        margin-left: 15px;
        width:90px ;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
    }
   .yjqr{
       color: #3d3d3d!important;
        border: 1px solid #ddd!important;
        background: transparent!important;
   }
   .content_right{
        width: 100%;
        padding: 24px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background: #fff;
        margin-top: 217px
    }
    .titel_table{
        width: 100%;
        height: 36px;
        border: 1px solid #98d6f1;
        border-radius: 5px;
        margin: 15px 0;
        background: rgba(230, 247, 255, 1)
    }
    .titel_table>span{
        display: inline-block;
        line-height: 36px;
        font-size: 14px;
    }
    .title_top{
        margin-top: 60px;
    }
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.2);
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 999;
    }
    .content{
        background: #fff;
        width: 890px;
        height: 500px;
        padding: 24px;
        border-radius: 10px;
        margin-top: 30%;
        margin-left: 50%;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
    }
    .del{
        background: #fff;
        width: 400px;
        height: 150px;
        padding: 24px;
        border-radius: 10px;
        margin-top: 20%;
        margin-left: 50%;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
    }
    .tit{
        border-bottom: 1px solid #ddd;
    }
    .tit span{
        display:inline-block;
        height: 36px;
        line-height: 36px;
        font-size: 18px;
        font-weight: bold;
    }
    .move{
        width: 100%;
        margin-top: 20px;
    }
    .move span{
        display: inline-block;
        height: 36px;
        line-height: 36px;
        font-size: 16px;
        font-weight: bold;
    }
    .btn{
        margin-top: 20px;
        text-align: center;
    }
    .btn span{
        display: inline-block;
        height: 36px;
        line-height: 36px;
        width: 80px;
        cursor: pointer;
        border-radius: 5px;
        border: 1px solid #dfdfdf;
        text-align: center!important;
    }
    .th{
        color: #f5f6fa!important;
        background: #4f4cf1!important;
        border: 0!important;
        margin-right: 40px!important;
    }
    .box_content div{
        margin-top: 20px;
    }
    .box_content span{
        display: inline-block;
        width: 150px;
        text-align: right;
        font-size: 16px;
        margin-right: 15px;
        line-height: 36px;
    }
    .box_content input{
        width: 200px;
        height: 36px;
        padding-left: 10px;
    }
    .upload-demo{
        display: inline-block;
        margin-top: 20px;
        width: 150px;
        margin-left: 165px;
    }
    .circle{
        display: inline-block;
        width: 16px;
        height: 16px;
        background: #98d6f1;
        border-radius: 50%;
        line-height: 36px;
        margin:9px 15px 0 15px;
    }
    .all{
        color:#4f4cf1
    }
    .red{
        color:red
    }
    .cx{
        display: inline-block;
        height: 36px;
        line-height: 36px;
        width: 90px;
        cursor: pointer;
        border-radius: 5px;
        color: #f5f6fa;
        background: #4f4cf1 ;
        border: 0;
        text-align: center;
        margin:20px 0 20px 24px ;
    }
    .blocks{
        margin-top: 30px;
        float: right;
        margin-bottom: 80px
    }
    .tit_top{
        width: 103%;
        height: 120px;
        left: -24px;
        position: relative;
        top:-50px;
        background: #fff;
    }
    .tit_top_url,.tit_top_con{
        padding:20px 0 0 24px;
    }
    .log_url,.new_url{
        display: inline-block;
        font-family: "Microsoft YaHei";
        cursor: pointer;
        font-size: 14px;
        font-weight: 400;
    }
    .log_url{color: #acadb0
    }
    .new_url{color: #4f4cf1}
    .tit_name{
        display: inline-block;
        font-family: "Microsoft YaHei";
        font-weight: bold;
        font-size: 18px;
    }
    .time,.num,.sdk{
        display: inline-block;
        height: 26px;
        padding: 5px 10px;
        font-size: 14px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: #000;
        margin-left: 20px;
        line-height: 26px;
        text-align: center;
        background: #e7e7e7;
    }
    .educe{
        float: right;
        color: #3d3d3d;
        border: 1px solid #ddd;
        background: transparent;
        display: inline-block;
        height: 36px;
        line-height: 36px;
        width: 90px;
        cursor: pointer;
        border-radius: 5px;
        text-align: center;
        margin:0px 24px 0px 0px ;
    }
    .tagsName{
        padding:0 5px;
        border:1px solid #000;
        border-radius: 3px;
        cursor: pointer;
        display: inline-block;
        height: 30px;
        line-height: 30px;
        margin-bottom: 10px
    }
    .tagsName:hover{
        border: 0!important;
        background: #3377ff;
        color: #fff!important
    }
    .act{
         border: 0!important;
        background: #3377ff;
        color: #fff!important
    }
    .tcvBox{
    position: fixed;
    top: 65px;
    bottom: 0;
    right: 0;
    z-index: 999;
    background: rgba(0,0,0,.3);
    width: 100%;
    height: 100%;
}
.box{
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    background: rgba(255,255,255,1);
    -webkit-box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.08);
    box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.08);
    width:500px;
    height: 260px;
    border-radius: 8px;
}
.box_tit{
    width: 100%;
    height:40px;
    border-bottom: 1px solid #000;
    line-height: 40px;
}
.box_tit span{
    display: inline-block;
    margin-left: 24px;
    font-size: 16px;
    font-weight: bold;
    color:#000;
}
.box_con{
     width: 100%;
    height:90px;
    line-height: 90px
}
.box_con span{
    display: inline-block;
     margin-left: 24px;
    font-size: 14px;
    font-weight:400;
    color:#000;
}
.btn{
   width:100%;
   height: 90px;
   line-height: 90px 
}
.yes,.qx{
    display: inline-block;
    width: 90px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 3px;
    margin-right: 50px;
    float: right;
}
.yes{
    border: 0!important;
    background: #3377ff;
    color: #fff!important;
    margin-right: 24px!important;
    cursor: pointer;
}
.gesture{
    cursor: pointer;
}
</style>