<template>
  <div>
        <div>
            <div>
                <img src="" alt="">
            </div>
            <div class="top_name">
                <span class="top_txt gesture" @click='fh'>广告内容审核&nbsp;/&nbsp;AI标签复审</span>
                <div class="title_left">
                    <span>AI标签复审</span>
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
                <input type="page" placeholder="输入页码" v-model="page"/>
                <div class='sel'>
                    <span @click='getData()'>查询</span>
                    <span class='yjqr' @click='cz()'>重置</span>
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
                <div class='AIbox' v-for='(key,index) in this.tableData'>
                    <div class='box_left'>
                        <!-- <img :src="key.image_url" alt=""> -->
                        <el-tooltip placement="right" class="tit_txt_2 logs tit_txts">
                                            <div slot="content">
                                                <img :src="key.image_url" alt="" style="max-width:261px;max-height: 464px">
                                            </div>
                                            <img :src="key.image_url" alt="" preview="1">                        
                        </el-tooltip>
                    </div>
                    <div class='box_right'>
                        <div >
                            <span>落地页：</span>
                            <a style="color:#3377ff" :href="key.preview_url" target="_block">点击查看</a>
                            <a :href='key.assist_url' v-if="tableData[index].assist_url" target="_blank" style="color:#3377ff;cursor: pointer;margin-left:10px">辅助查看</a>
                        </div>
                        <div style="overflow: hidden;height:16px">
                            <span>AI标签：</span>
                            <el-tooltip placement="right" class="tit_txt_2 logs tit_txts">
                                            <div slot="content">
                                                <span v-for='da in key.ai_tags'>{{da.tags_name+'('+da.confidence+'%)、'}}</span>
                                            </div>
                                            <span v-for='da in key.ai_tags' preview="0">{{da.tags_name+'('+da.confidence+'%)、'}}</span>                           
                            </el-tooltip>
                            
                        </div>
                        <div>
                            <span class='tagsName'  
                                    v-for='(da,num) in key.tags' 
                                    :class="{'act': da.isShow}"  
                                    style="margin-right:15px" 
                                    @click='sgtData(da,key.mid,num,index)'
                                    >{{da.tags_name}}
                            </span>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
             <div class="block">
                   <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page"
                        :page-sizes="[9, 30, 150, 300]"
                        :page-size="p"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
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
                tableData:[],
                sdk_id:"",
                id_adsrc:"",
                p:9,
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
            cz(){
                this.page=1;
                this.pid='';
                this.sdk_id='';
                this.id_adsrc=''
                this.getData()
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
             handleSizeChange(p) { // 每页条数切换
             this.p = p;
             this.getData()
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.getData()
            }, 
            getData(){
                var res=/^\+?[1-9]\d*$/;
                if(!res.test(this.page)){
                    this.$message.error('页码只能为大于零的正整数');
                    return
                }
                 this.load=true
                 let params={sdk_id:this.sdk_id,id_adsrc:this.id_adsrc,p:this.p,page:this.page,pid:this.pid,status:2}
                     this.api.adver_tags_pending({params}).then((res)=>{
                         this.total=res.total;
                         this.load=false;
                            this.getAPI() ;
                            this.updata();
                            this.getTags(res.data)
                     })
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
                    let dataList=data;
                    this.advers=[];
                    this.api.adver_tags_config_opstags().then((res)=>{
                        res.forEach(item => {
                            item.isShow = false
                        })
                        this.tagsList = res
                        data.forEach((item, index) =>{
                            item.tags = JSON.parse(JSON.stringify(res))
                        })
                        this.tableData =data

                        for(var i=0;i<dataList.length;i++){
                            if(dataList[i].ops_tags.length!=0){
                                 var obj={
                                mid:'',
                                tags:[]
                            };
                                obj.mid=dataList[i].mid;
                                obj.tags=dataList[i].ops_tags;
                                this.advers.push(obj);
                                console.log(this.advers)
                                for(var s=0;s<dataList[i].ops_tags.length;s++){
                                    for(var j=0;j< this.tableData.length;j++){
                                        if(this.tableData[j].mid==dataList[i].mid){
                                            for(var k=0;k<this.tableData[j].tags.length;k++){
                                                if(this.tableData[j].tags[k].tags_name==dataList[i].ops_tags[s].tags_name){
                                                    this.tableData[j].tags[k].isShow=true;
                                                }
                                            }
                                        }
                                    } 
                                }
                             
                            }
                        }
                        this.updata();
                    })
                 },
                  handleSizeChange1(p) { // 每页条数切换
                    this.p = p;
                   
                    this.getData()
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
        margin-top: 80px
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
.AIbox {
    display: inline-block;
    width: 30%;
    height: 300px;
    border:1px solid #ddd;
    margin-right:3% ;
    margin-bottom: 24px;
}
.AIbox>div{
    display: inline-block;
}
.box_left{
    margin: 24px;
    width: 30%;
    height: 252px;
    position: relative;
    background: #ddd;
}
.box_left img{
    max-width: 100%;
    max-height: 100%;
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
}
.box_right{
    height: 100%;
    width: 55%;
    vertical-align: top;
    margin-top:24px
}
.box_right>div{
    margin-bottom: 18px;
}
</style>