<template>
 <div>
         <div>
            <div class="top_name">
                <span class="top_txt" @click='fh(-1)'>TX新闻模板管理&nbsp;/&nbsp;</span>
                <span  class="top_txt" style="margin-left:0" v-if='this.$route.query.num==1'>新增模板</span>
                <span  class="top_txt" style="margin-left:0" v-if='this.$route.query.num==0&&this.status==0'>查看详情</span>
                <span  class="top_txt" style="margin-left:0" v-if='this.$route.query.num==0&&this.status==1'>编辑模板</span>
                <div class="title_left">
                    <span   v-if='this.$route.query.num==1'>新增模板</span>
                    <span  v-if='this.$route.query.num==0&&this.status==0'>查看详情</span>
                    <span  v-if='this.$route.query.num==0&&this.status==1'>编辑模板</span>
                </div>
                <div class='right' v-if="this.$route.query.num==0&&this.status==0">
                    <span @click='open()'>{{this.dataList.status==1?'禁用':'启用'}}</span>
                    <span @click='bj()' >编辑</span>

                </div>
            </div>
            <div class='content_box'>
                <div class='box_left'>
                    <div class='box-img'>
                        <img :src="fill" alt="">
                    </div>
                </div>
                <div class='box_right'>
                    <div>
                        <span class='box_tit_name' style="vertical-align: top;">图片</span>
                        <div style="display:inline-block">
                            <el-upload
                                :disabled="this.$route.query.num==0&&this.status==0"
                                v-if="!(this.$route.query.num==0&&this.status==0)"
                                :http-request="uploadFile"
                                class="upload-demo"
                                action="111"
                                :before-upload="beforeUpload"
                                >
                                <el-button size="small" type="primary" >上传</el-button>
                            </el-upload>
                            <div >
                                 <el-tooltip placement="top" class="tit_txt_2 logs tit_txts" v-if="filename!=''">
                                        <div slot="content" class="text">{{this.filename}}</div>
                                        <span  class="text" style="display:inline-block;overflow: hidden;max-width: 200px;height: 20px;line-height: 28px;color:#000" :class="{up:this.$route.query.num==0&&this.status==0}" >{{this.filename}}</span>
                                </el-tooltip>
                                <span class="content_xz" @click="delRemove()" v-if="(filename!=''&&this.status==1)||(filename!=''&&this.$route.query.num==1)">删除</span>
                            </div>
                           
                        </div>
                        
                    </div>
                    <div>
                        <span class='box_tit_name' style="margin-bottom: 24px">尺寸</span>
                        <input type="text" placeholder="上传后自动获取" disabled v-model="width"> 
                    </div>
                     <div>
                        <span class='box_tit_name' style="margin-bottom: 24px">模板名称</span>
                        <input type="text" placeholder="请输入" maxlength="10" v-model="name" :disabled="this.$route.query.num==0&&this.status==0" :class="{none:this.$route.query.num==0&&this.status==0}" @change='resetfill()'> 
                    </div>
                    <div>
                        <span class='box_tit_name' style="vertical-align: top;margin-top:0">位置</span>
                        <div class='location'>
                                <div>
                                    <span  :class='{chenk:g=="nw"}' @click='rideo("nw")' >左上</span>
                                    <span  :class='{chenk:g=="north"}' @click='rideo("north")'>中上</span>
                                    <span  :class='{chenk:g=="ne"}' @click='rideo("ne")'>右上</span>
                                </div>
                                <div>
                                    <span  :class='{chenk:g=="west"}' @click='rideo("west")'>左中</span>
                                    <span  :class='{chenk:g=="center"}' @click='rideo("center")'>中心</span>
                                    <span  :class='{chenk:g=="east"}' @click='rideo("east")'>右中</span>
                                </div>
                                <div>
                                    <span  :class='{chenk:g=="sw"}' @click='rideo("sw")'>左下</span>
                                    <span  :class='{chenk:g=="south"}' @click='rideo("south")'>中下</span>
                                    <span  :class='{chenk:g=="se"}' @click='rideo("se")'>右下</span>
                                </div>
                        </div>
                    </div>
                    <div>
                        <span class='box_tit_name'>水平边距</span>
                        <input type="number" v-model="x" :disabled="this.$route.query.num==0&&this.status==0" :class="{none:this.$route.query.num==0&&this.status==0}" @change='resetfill()'>
                    </div>
                    <div>
                        <span class='box_tit_name'>垂直边距</span>
                        <input type="number" v-model="y" :disabled="this.$route.query.num==0&&this.status==0" :class="{none:this.$route.query.num==0&&this.status==0}" @change='resetfill()'>
                    </div>
                    <div>
                        <span class='box_tit_name'>字号</span>
                        <input type="number" v-model="size" :disabled="this.$route.query.num==0&&this.status==0" :class="{none:this.$route.query.num==0&&this.status==0}" @change="resetfill()">
                    </div>
                    <div>
                        <span class='box_tit_name'>颜色</span>
                        <input type="text" v-model="color" :disabled="this.$route.query.num==0&&this.status==0" maxlength="6" :class="{none:this.$route.query.num==0&&this.status==0}" @change="resetfill()">
                    </div>
                    <div>
                        <span class='box_tit_name'>最大长度</span>
                        <input type="number" v-model="max_length" :disabled="this.$route.query.num==0&&this.status==0"  :class="{none:this.$route.query.num==0&&this.status==0}" @change="resetfill()">
                    </div>
                    <div class='btn_buttom' v-if="this.$route.query.num==1||this.status==1">
                        <span class='tj' @click='add()'>{{this.$route.query.num==1?'提交':"保存"}}</span>
                        <span v-if='this.$route.query.num==0' @click='back()'>取消</span>
                        <span v-if='this.$route.query.num==1' @click='fh(-1)'>取消</span>
                    </div>
                </div>
            </div>
        </div>
        <div class='bg' v-if='show'>
            <div class='boxContent'>
                <div class='title'>
                    <span>{{this.dataList.status==1?'禁用':'启用'}}</span>
                </div>
                <div class='text'>
                    <span v-if='this.dataList.status==0'>启用后，模板内容将会用于投放，是否确认？</span>
                    <span v-if='this.dataList.status==1'>禁用后，模板将不再用于投放，是否确认？</span>
                </div>
                <div class='btns'>
                    <span class='qd' @click='shut()'>确定</span>
                    <span @click='qx()'>取消</span>
                </div>
            </div>
        </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {
         dataList:{},
        tid:this.$route.query.tid, 
        size:40,
        width:"",
        name:"",
        filename:"",
        g:"nw",
        x:10,
        y:10,
        max_length:10,
        color:"000000",
        fill:'',
        show:false,
        status:'0',
        arr:['720*404','720*1600','720*406'],
        image_url:"",
        type:'d3F5LXplbmhlaQ',

     }
   },
   mounted(){
      if(this.$route.query.num==0){
          this.getDetails()
      }
      
       
   },
   methods:{
       rideo(wz){
           if(this.$route.query.num==0&&this.status==0){
               return
           }else{
                this.g=wz;
                this.resetfill();
           }
       },
       getDetails(){
           let params={tid:this.tid}
           this.api.template_detail({params}).then((res)=>{
               this.dataList=res;
                this.name=res.name
                this.width=res.width+"*"+res.height
                this.image_url=res.image_url,
                this.filename=res.image_url
                this.size=res.size,
                this.g=res.g,
                this.x=res.x,
                this.y=res.y,
                this.max_length=res.max_lenth,
                this.color=res.color;
                this.resetfill()
           })
       },
       back(){
           if(this.$route.query.num==1){
                this.name=''
                this.width=''
                this.fill='',
                this.size=40,
                this.g='nw',
                this.x=10,
                this.y=10,
                this.max_length=10,
                this.color="000000"
           }
           if(this.$route.query.num==0){
               this.name=this.dataList.name
                this.width=this.dataList.width+"*"+this.dataList.height
                this.fill=this.dataList.image_url,
                this.size=this.dataList.size,
                this.g=this.dataList.g,
                this.x=this.dataList.x,
                this.y=this.dataList.y,
                this.max_length=this.dataList.max_lenth,
                this.color=this.dataList.color
                this.status=0
           }
       },
       add(){
           if(this.fill==''){
                   this.$message.error('未上传图片');
                   return
               }
                if(this.arr.indexOf(this.width)==-1){
                    this.$message.error('图片尺寸不对请重传');
                        return
                }
                if(!this.name){
                    this.$message.error('模板名称不能为空');
                        return
                }
                if(!this.max_length){
                    this.$message.error('最大长度不能为空');
                        return
                }
                if(this.max_length<=0){
                    this.$message.error('最大长度必须大于0');
                        return
                }
                if(!this.size){
                    this.$message.error('文字大小不能为空');
                        return
                }
                if(this.size<0){
                    this.$message.error('文字大小范围在0~1000');
                        return
                }
                if(this.size>1000){
                    this.$message.error('文字大小范围在0~1000');
                        return
                }
                if(!this.color){
                    this.$message.error('文字颜色不能为空');
                        return
                }
                if(this.color.split('').length!=6){
                    this.$message.error('文字颜色值长度必须为6');
                        return
                }
                if(!this.x){
                    this.$message.error('水平边距不能为空');
                        return
                }
                 if(this.x<0){
                    this.$message.error('水平边距范围在0~4096');
                        return
                }
                if(this.x>4096){
                    this.$message.error('文字大小范围在0~4096');
                        return
                }
                if(!this.y){
                    this.$message.error('垂直边距不能为空');
                        return
                }
                 if(this.y<0){
                    this.$message.error('垂直边距范围在0~4096');
                        return
                }
                if(this.y>4096){
                    this.$message.error('垂直边距范围在0~4096');
                        return
                }
           if(this.$route.query.num==1){
               
                let formData=new FormData
                formData.append('name',this.name);
                formData.append('width',this.width.split('*')[0]);
                formData.append('height',this.width.split('*')[1]);
                formData.append('image_url',this.image_url);
                formData.append('max_length',this.max_length);
                formData.append('size',this.size);
                formData.append('color',this.color);
                formData.append('g',this.g);
                formData.append('x',this.x);
                formData.append('y',this.y);
                this.api.template_add(formData).then((res)=>{
                    if(res!=false){
                        this.$router.go(-1)
                    }
                })
           }
           if(this.$route.query.num=='0'){
                let formData=new FormData
                formData.append('tid',this.dataList.tid);
                formData.append('name',this.name);
                formData.append('width',this.width.split('*')[0]);
                formData.append('height',this.width.split('*')[1]);
                formData.append('image_url',this.image_url);
                formData.append('max_length',this.max_length);
                formData.append('size',this.size);
                formData.append('color',this.color);
                formData.append('g',this.g);
                formData.append('x',this.x);
                formData.append('y',this.y);
                this.api.template_edit(formData).then((res)=>{
                     if(res!=false){
                        this.getDetails();
                        this.status='0'
                    }
                })
           }
          
           },
           
        resetfill(){
           const Base64 = require('js-base64').Base64
           let TEXT= '测试文本效果预览，一般都会这么长，但是如果真的有特别特别长的文字，那也不是不可以。只要你需要，没有什么不可以的，直接联系管理员吧';     
           let strText = Base64.encode(TEXT.slice(0,this.max_length)).split('+').join('-').split('/').join('_');
           this.fill = this.image_url + '?x-oss-process=image/watermark,type_'+ this.type + ',size_'
                        + this.size + ',text_'+ strText+ ',color_'+ this.color+',g_'+this.g + ',x_' + this.x +',y_'+this.y + ',fill_0';
       },
       fh(index){
           this.$router.go(index)
       },
       open(){
           this.show=true
       },
       qx(){
           this.show=false
       },
       bj(){
           this.status=1
       },
       uploadFile(file){
                let formData = new FormData;
                formData.append('file',file.file);
                this.api.file_upload(formData).then((res)=>{
                    this.image_url = res.url;
                    this.filename=res.name;
                    var image = new Image();
                    var _this=this;
                    image.onload=function(){
                        var width = image.width;
                        var height = image.height;
                        _this.width = (width+"*"+height)
                        if(_this.arr.indexOf(_this.width)==-1){
                              _this.$message.error('图片尺寸不对请重传');
                                _this.image_url = '';
                                _this.filename='';
                                _this.fill=''
                                _this.width=''
                                return
                        }else{
                             _this.resetfill();
                        }
                       
                    };
                    image.src= res.url;
                    
                })
        },
         beforeUpload(file) {
                if(this.types!='f_call_show'){
                        const isJPG = file.type === 'image/jpeg';
                        const isPNG = file.type === 'image/png';
                        const isPSD = file.type === 'image/psd';
                        const isBMP = file.type === 'image/bmp';
                        const isGIF = file.type === 'image/gif';
                        const isTIF = file.type === 'image/tif';
                        if (!isJPG&&!isPNG&&!isPSD&&!isBMP&&!isGIF&&!isTIF) {
                            this.$message.error('只支持JPG、PNG、psd、bmp、gif、tif!');
                        }
                        return isPNG || isJPG ||isPSD||isBMP||isGIF||isTIF;
                }
              
               
            },
        delRemove(){
            if(this.$route.query.num==0&&this.status==0){
                return
                }else{
                    this.filename=''
                    this.width=''
                    this.fill=''
                    this.image_url=''
                }
            
        },
        shut(){
            let formData=new FormData
            formData.append('tid',this.dataList.tid)
            formData.append('status',this.dataList.status==1?"0":"1")
            this.api.template_edit_status(formData).then((res)=>{
                if(res!=false){
                    this.getDetails()
                    this.qx()
                }
            })
        },    
   },
   components: {

   }
 }
</script>

<style scoped>
.top_name{height: 112px}
.top_txt,.title_left span{
        margin-left: 24px;
}
.top_txt{
    cursor: pointer;
}
 .box_left,.box_right{
     display: inline-block;
     background: #fff;
 }
 .content_box{
     margin-top: 195px;
 }
 .box_left{
     width: 60%;
     margin-right: 1%;
     min-height: 728px;
     position: relative;
     text-align: center;
 }
 .box_right{
     width: 39%;
     min-height: 728px;
     vertical-align: top;
 }
 .box-img{
     position: absolute;
     max-width:225px;
     max-height: 500px;
     top:50%;
     left: 50%;
     transform: translate(-50%,-50%);
     background: #ddd;
 }
 img{
    max-width:225px;
    max-height: 500px;
 }
 .a{
     color:#fff;
     display: inline-block;
     position: absolute;
     font-size: 40px;
     top:10px;
     left: 10px;
 }
 .upload-demo{display: inline-block;margin-top: 24px;}
 .location{
     display: inline-block;
 }
 .location div span{
     display: inline-block;
     width: 50px;
     height: 50px;
     cursor: pointer;
     border: 1px solid #000;
     text-align: center;
     line-height: 50px;
 }
 .box_tit_name{
     display: inline-block;
     width:100px;
     text-align: right;
     font-size: 14px;
     margin-top: 24px;
     margin-right: 16px;
 }
 input{
     width: 300px;
     height: 36px;
     padding-left: 5px;
 }
 .btn_buttom span{
        display: inline-block;
        width: 90px;
        height: 36px;
        cursor: pointer;
        line-height: 36px;
        border:1px solid #ddd;
        text-align: center;
        margin-left: 24px;
        margin-top: 24px;
        border-radius: 3px;
 }
 .tj{
     background: #3377ff;
     color: #fff;
     border:0!important;
     margin-left: 45px!important;
     margin-bottom: 30px;
 }
 .chenk{
     color: #fff!important;
     background: #3377ff!important;
 }
  .content_xz{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(51,119,255,1)!important;
        margin-left: 10px;
        cursor: pointer;
    }
    .right{
        display: inline-block;
        float: right;
        margin-right: 20%;
         margin-top: -25px;
    }
    .right span{
        display: inline-block;
        width: 90px;
        height: 36px;
        cursor: pointer;
        line-height: 36px;
        border:1px solid #ddd;
        text-align: center;
        margin-left: 24px;
        border-radius: 3px;
    }
    .bg{
    position: fixed;
    top: 65px;
    bottom: 0;
    right: 0;
    z-index: 999;
    background: rgba(0,0,0,.3);
    width: 100%;
    height: 100%;
}
  .boxContent{
      width: 450px;
      height: 200px;
      position: absolute;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
      background: #fff;
      border-radius: 5px;
  }
  .title{
      width: 100%;
      height: 50px;
      border-bottom: 1px solid #ddd;
  }
  .title span{
      display: inline-block;
      font-size: 14px;
      font-weight: bold;
      margin-left: 24px;
      line-height: 50px;
  }
  .text span{
      font-size: 14px;
      display: inline-block;
      margin: 24px 0 24px 24px;
  }
  .btns{
      text-align: right;
  }
  .btns span{
       display: inline-block;
        width: 90px;
        height: 36px;
        cursor: pointer;
        line-height: 36px;
        border:1px solid #ddd;
        text-align: center;
        margin-right: 24px;
        border-radius: 3px;
        margin-top: 20px;
  }
  .qd{
    background: #3377ff;
     color: #fff;
     border:0!important;
    
  }
  .none{
      border:0!important
  }
  .up{
      margin-top: 24px;
  }
</style>

