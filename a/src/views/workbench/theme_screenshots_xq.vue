<template>
    <div>
         <div>
            <div class="top_name">
                <div class="top_txt">
                     <span  @click='fh(-2)'>官方物料投放库&nbsp;/&nbsp;</span>
                    <span  @click='fh(-1)'>截图物料审核&nbsp;/&nbsp;</span>
                    <span >物料审核详情</span>
                </div>
               
                <div class="title_left">
                    <span>物料审核详情</span>
                </div>
            </div>
        </div>
        <div class='content'>
                <div class='lefBox'>
                    <div class='titleName'>
                        <span>效果调整</span>
                    </div>
                        <vueCropper style="height:360px;width:240px;display:inline-block;margin-right:30px"
                        ref="cropper"
                        :img="option.img"     
                        :outputSize="option.size"    
                        :outputType="option.outputType"   
                        :info="true"	    
                        :canScale="true"    
                        :full="false"	
                        :canMove="true"	
                        :canMoveBox="true"   
                        :fixedBox="true"
                        :autoCropWidth="option.autoCropWidth"
                        :autoCropHeight="option.autoCropHeight"
                        :autoCrop="true"	
                        :original="false"
                        @realTime="realTime"	    
                        ></vueCropper>
                        
                        
                         <vueCropper style="height:360px;width:240px;display:inline-block;margin-right:30px"
                        ref="cropper1"
                        :img="option1.img"     
                        :outputSize="option1.size"    
                        :outputType="option1.outputType"   
                        :info="true"	    
                        :canScale="true"    
                        :full="false"	
                        :canMove="true"	
                        :canMoveBox="true"   
                        :fixedBox="true"
                          :autoCropWidth="option1.autoCropWidth"
                        :autoCropHeight="option1.autoCropHeight"
                        :autoCrop="true"	
                        :original="false"
                        @realTime="realTime1"	    
                        ></vueCropper>
                        
                        
                         <vueCropper style="height:360px;width:240px;display:inline-block;"
                        ref="cropper2"
                        :img="option2.img"     
                        :outputSize="option2.size"    
                        :outputType="option2.outputType"   
                        :info="true"	    
                        :canScale="true"    
                        :full="true"	
                        :canMove="true"	
                        :canMoveBox="true"   
                        :fixedBox="true"
                          :autoCropWidth="option2.autoCropWidth"
                        :autoCropHeight="option2.autoCropHeight"
                        :autoCrop="true"	
                        :original="false"
                        @realTime="realTime2"	    
                        ></vueCropper>
                        
                        
                </div>
                <div class='rightBox'>
                    <div  class='titleName2'>
                        <span >最终效果图</span>
                        <span class='addBtn' @click="ADDdata()">提交物料</span>
                    </div>
                    <div class='border_box'>
                        <div>
                            <div class='boxs1'>
                                <div style="display:inline-block">
                                    <span style="display:block;margin-bottom:10px">大图</span>
                                    <span>尺寸:</span>
                                </div>
								<img v-show="realpic" class="real_pic" :src="dataURL" />
								<div v-show="hideimg" class="hideimg" ref="hideimg">
									<div class='big' ref="imageWrapper">
										<img src="img/back.jpg" alt="" ref='bgm' class='bgm'>
										<img :src="option.img" alt="" ref='bgm1' class='bgm1'>
										<img :src="option1.img" alt="" ref='bgm2' class='bgm2'>
										<img :src="option2.img" alt="" ref='bgm3' class='bgm3'>
										<img src="img/ico.png" alt="" ref='bgm4' class='bgm4'>
									</div>
								</div>
                            </div>
                            <div class='boxs2' :style="this.image==1?previewStyle2:this.image==2?previewStyle3:previewStyle4">
                                <div style="display:inline-block">
                                    <span style="display:block;margin-bottom:10px">小图</span>
                                    <span>尺寸:</span>
                                </div>
                                <div :style="this.image==1?previews.div:this.image==2?previews2.div:previews3.div" class="preview">
                                    <img :src="this.image==1?previews.url:this.image==2?previews2.url:previews3.url" 
											:style="this.image==1?previews.img:this.image==2?previews2.img:previews3.img" alt="">
                                </div>
                               
                            </div>
                            <div class='boxs' :style="previewStyle2">
                                <div style="display:inline-block">
                                    <span style="display:block;margin-bottom:10px">组图1</span>
                                    <span>尺寸:</span>
                                </div>
                                <div :style="previews.div" class="preview zt">
                                    <img :src="previews.url" :style="previews.img" alt="">
                                </div>
                               
                            </div>
                            <div class='boxs' :style="previewStyle3">
                                <div style="display:inline-block">
                                    <span style="display:block;margin-bottom:10px">组图2</span>
                                    <span>尺寸:</span>
                                </div>
                                <div  :style="previews2.div" class="preview zt">
                                    <img :src="previews2.url" :style="previews2.img" alt="">
                                </div>
                                
                            </div>
                            <div class='boxs' :style="previewStyle4">
                                <div style="display:inline-block">
                                    <span style="display:block;margin-bottom:10px">组图3</span>
                                    <span>尺寸:</span>
                                </div>
                                <div :style="previews3.div" class="preview zt">
                                    <img :src="previews3.url" :style="previews3.img" alt="">
                                </div>
                               
                            </div>
                            <div class='set'>
                                <span>小图：</span>
                                <select v-model="image">
                                    <option value="1">组图1</option>
                                    <option value="2">组图2</option>
                                    <option value="3">组图3</option>
                                </select>
                            </div>
                            <div class='int'>
                                <div >
                                    <span class="names">标题：</span>
                                    <span class='con' v-if="show==false" @click='clic()'>{{this.dataList.ad_title}}</span>
                                    <input type="text" v-model="ad_title" v-if="show" placeholder="最少6字最多24字"  minlength="6" maxlength="24">
                                </div>
                                <div>
                                    <span class="names">摘要(选填)：</span>
                                    <span class='con' @click='clic1()' v-if="show1==false">{{this.dataList.ad_desc}}</span>
                                    <input type="text" v-model="ad_desc" v-if="show1"  placeholder="最少6字最多24字" minlength="6" maxlength="24">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    
                
        </div>
    </div>
</template>

<script>

import html2canvas from 'html2canvas';

export default {

            data(){
                return{
                    dialogVisible: false,
                    // 裁剪组件的基础配置option
                    option: {
                        img: '', 
                       size:0.5,
                       outputType:'png',
                       autoCropWidth:240,
                       autoCropHeight:160,

                    },
                     option1: {
                        img: '', 
                       size:0.5,
                       outputType:'png',
                       autoCropWidth:240,
                       autoCropHeight:160,

                    },
                     option2: {
                        img: '', 
                       size:0.5,
                       outputType:'png',
                       autoCropWidth:240,
                       autoCropHeight:160,

                    },
                    picsList: [],  //页面显示的数组
                    // 防止重复提交
                    loading: false,
                    previewStyle2:{},
                    previews:{},
                    previewStyle3:{},
                    previews2:{},
                    previewStyle4:{},
                    previews3:{},
                    show:false,
                    show1:false,
                    ad_title:"",
                    ad_desc:"",
                    dataList:{},
                    image:'1',
                    width1:"",
                    height1:"",
                    images:[],
                    temple_name:"",
                    route:"",
					dataURL:"",
					realpic:false,
					hideimg:true,
                }
            },
            mounted(){
                this.getData()
            },
            methods:{
				toImage() {
					html2canvas(this.$refs.imageWrapper,{
						backgroundColor: null,
						allowTaint:false,
						useCORS:true,
						width:720,
						height:307,
					}).then((canvas) => {
						let dataURL = canvas.toDataURL("image/png");
						this.dataURL = dataURL;
						this.realpic = true;
						this.hideimg = false;
                        this.loading = false;
                        console.log(this.dataURL)
					});
				},
				
				imgLoad(bgm,bgm1,bgm2, bgm3, bgm4, callback) {
					this.loading = true;
					var timer = setInterval(function() {
						if(bgm.complete 
						&& bgm1.complete
						&& bgm2.complete
						&& bgm3.complete
						&& bgm4.complete
						) {
							console.log("imgload");	
							callback();
							clearInterval(timer);
						}
					}, 50);
				},
			
                fh(index){
                    this.$router.go(index)
                },
                getData(){
                    let params={pkg_name:this.$route.query.pkg_name}
                    this.api.appad_pkg_check_info({params}).then((res)=>{
                            this.dataList=res;
                            this.ad_title=this.dataList.ad_title;
                            this.ad_desc=this.dataList.ad_desc;
                            this.option.img=this.dataList.images[0];
                            this.option1.img=this.dataList.images[1];
                            this.option2.img=this.dataList.images[2];
							this.imgLoad(this.$refs.bgm, 
										this.$refs.bgm1,
										this.$refs.bgm2, 
										this.$refs.bgm3, 
										this.$refs.bgm4, 
										this.toImage);
                    })
                },
                ADDdata(){
                    if(!this.ad_title){
                        this.$message.error('标题不能为空');
                        return
                    }
                    let formData = new FormData;
                    formData.append('pkg_name',this.$route.query.pkg_name);
                    formData.append('ad_title',this.ad_title);
                    formData.append('ad_desc',this.ad_desc);
                    formData.append('type','2');
                    formData.append('from','2');
                    
                    this.api.appad_pkg_audit(formData).then((res)=>{
                        if(res!=false){
                            this.temple_name=res.temple_name;
                            this.route=res.route;
                            this.file();
                        }
                    })
                },
                file(){
					if(this.dataURL){
						// this.width1 = 720;
						// this.height1 = 307; 
                        // this.updateFile(this.dataURL, 1);
                        this.ADDimg(this.dataURLtoBlob(this.dataURL),1)
					}
                    this.$refs.cropper.getCropBlob(data => {
                        this.ADDimg(data,3);
                    })
                     this.$refs.cropper1.getCropBlob(data => {
                        this.ADDimg(data,4);
                    })
                     this.$refs.cropper2.getCropBlob(data => {
                        this.ADDimg(data,5);
                    })
                    if(this.image==1){
                         this.$refs.cropper.getCropBlob(data => {
                            this.ADDimg(data,2);
                        })
                    }
                    if(this.image==2){
                          this.$refs.cropper1.getCropBlob(data => {
                            this.ADDimg(data,2);
                        })
                    }
                    if(this.image==3){
                          this.$refs.cropper2.getCropBlob(data => {
                                this.ADDimg(data,2);
                            })
                    }
                },
				
				updateFile(dataUrl, num){
					this.ups(this.dataURLtoBlob(dataUrl), num);
				},
				
				dataURLtoBlob(dataurl) {
                    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                    while (n--) {
                        u8arr[n] = bstr.charCodeAt(n);
                    }
                    return new Blob([u8arr], { type: mime });
                 },

                ADDimg(file,num){
                    var _this=this;
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload=function(theFile){
                        const img = new Image()
                        img.src=theFile.target.result;
                        img.crossOrigin = 'Anonymous' // canvas 不能处理跨域图片，如果要处理，除了服务端要开启跨域外，执行canvas操作前也要开启跨域
                        img.onload = function() {
                            let canvas = document.createElement('canvas')
                            const ctx = canvas.getContext('2d')
                            let dataURL = ''
                            if(num!=1){
                                 canvas.height = 240;
                                canvas.width = 360;
                                _this.width1=canvas.width;
                                _this.height1=canvas.height;
                                ctx.drawImage(this, 0, 0,360,240)
                            }
                            if(num==1){
                                canvas.height = 307;
                                canvas.width = 720;
                                _this.width1=canvas.width;
                                _this.height1=canvas.height;
                                ctx.drawImage(this, 0, 0,720,307)
                            }
                           
                            dataURL = canvas.toDataURL();
                            _this.updateFile(dataURL,num);
                        }
                    }
                },
                
				ups(file,nums){
                     var formData = new FormData;
                    formData.append('temple_name',this.temple_name);
                    formData.append('pkg_name',this.$route.query.pkg_name);
                    formData.append('file',file);
                    formData.append('route',this.route);
                    formData.append('width',this.width1);
                    formData.append('height',this.height1);
                    formData.append('type','2')
                    formData.append('order',nums)
					this.api.appad_add(formData).then((res)=>{
						console.log(res)	
					})
				},
                realTime(data){
                   this.previews = data;
                   console.log(this.previews)				
                    this.previewStyle2 = {
                        width: this.previews.w + "px",
                        height: this.previews.h + "px",
                        overflow: "hidden",
                        margin: "0",
                        zoom:100 / this.previews.w,
                        // zoom: 200 / this.previews.h
					};
                },
                 realTime1(data){
                   this.previews2 = data;				
                    this.previewStyle3 = {
                        width: this.previews2.w + "px",
                        height: this.previews2.h + "px",
                        overflow: "hidden",
                        margin: "0",
                        zoom: 100 / this.previews2.w,
                        // zoom: 200 / this.previews.h
                    };
                   
                },
                 realTime2(data){
                   this.previews3 = data;				
                    this.previewStyle4 = {
                        width: this.previews3.w + "px",
                        height: this.previews3.h + "px",
                        overflow: "hidden",
                        margin: "0",
                        zoom: 100 / this.previews3.w,
                        // zoom: 200 / this.previews.h
                    };
                   
                },
                clic(){
                    this.show=true;
                    this.ad_title=this.dataList.ad_title;
                },
                 clic1(){
                    this.show1=true;
                     this.ad_desc=this.dataList.ad_desc;
                },
                bt(){
                    this.show=false;
                    
                },
                zy(){
                    this.show1=false
                },
                
            },
}
</script>

<style scoped>
     .top_name{height: 112px;}
      .top_txt,.title_left span{
        margin-left: 24px;
    }
    .top_txt{
        cursor: pointer;
    }
     .content{
         background: transparent!important;
        margin-top: 160px;
        padding: 40px 0 ;
    }
    .titleName,.titleName2{
        margin:24px 0 40px 24px;
        font-size: 16px;
        color:#000;
        font-weight: bold;
        text-align: left!important
    }
    
    .addBtn{
        float: right;
         display: inline-block;
        text-align: center;
        cursor: pointer;
        width: 120px;
        height: 36px;
        line-height: 40px;
        border-radius: 3px;
        color: #fff;
        background: #3377ff;
        font-size: 14px;
        margin-right: 24px
    }
    /* .border_box{
        text-align: center;
        margin:30px 0 ;
    } */
    .boxs1,.boxs2{
        margin-left:24px;
        margin-bottom: 30px!important;
        width:100%!important
    }
    .boxs1 span,.boxs2 span ,.boxs span{
        margin-right: 20px;
    }
    .boxs2 span{
        margin-left: 50px
    }
    .boxs1 div,.boxs2 div,.boxs div{
        vertical-align: top;
    }
    .boxs{
        display: inline-block;
        width:auto!important;
        height: auto!important;
        margin-left:40px!important;
        margin-bottom: 30px!important;
    }
   
    .con{
        display: inline-block;
        min-width: 300px;
        height: 40px;
        background: #ddd;
        line-height: 40px;
    }
    .boxs>span{
        font-size: 14px;
    }
    /* .boxs>div>img{
        max-height:220px;
        max-width: 155px;
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%) 
    } */
    .set,.int{
        text-align: left!important;
        margin-bottom:30px
    }
    .set>span{
        font-size: 14px;
        margin:0  15px 0 24px;
         display: inline-block;
        width:90px;
        text-align: right

    }
    .int>div{
        margin-bottom:15px 
    }
    .names{
        display: inline-block;
        width:90px;
        margin: 0 15px 15px 24px;
        font-size: 14px;
        color: #000;
        text-align: right
    }
    select{
        width: 200px;
        height: 36px;
    }
    input{
        min-width:300px;
        padding-left: 10px;
        height: 36px;
    }
    .pre-item {
		padding-right: 20px;
	}
    .lefBox{
        display: inline-block;
        margin:0 2% 0 0;
        width:60%;
        min-height: 700px;
        background:#fff;
        vertical-align: top;
        text-align: center
    }
    .rightBox{
        display: inline-block;
        width: 38%;
        background:#fff;
        min-height: 700px;
        vertical-align: top;
    }
	.real_pic{
		max-width: 350px;
		border-radius: 5px;
		display: inline-block;
		position: relative
	}
		
    .big{
        width: 720px;
        height: 307px;
        border-radius: 5px;
        display: inline-block;
        position: relative
    }
    .bgm{
        width: 100%;
    }
    .bgm1,.bgm2,.bgm3{
        position: absolute;
        width: 23%;
        top:2%
    }
    .bgm1{
        left: 9%;
    }
    .bgm2{
        left: 38.5%;
    }
    .bgm3{
        left:68%;
    }
    .preview{
        display: inline-block!important;
        margin-bottom: 30px;
    }
    .bgm4{
        position: absolute;
        width: 50%;
        left: 25%;
        bottom: 3%;
        z-index: 99;
    }
    .zt{
        overflow: hidden!important
    }
</style>