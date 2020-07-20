<template>
	<div v-show="dialogVisible" class="tcBOx">
		<div @click="clocs()" class="tcBoxbg"></div>
		<div class="tcboxff">
			<div class="tcboxff2">
				<el-form ref="form" :model="form" :rules="rules" label-width="80px">
					<div class="innerfor">
						<el-form-item  label="需求标题" prop="title">
							<el-input :disabled="clicType==1" v-model="form.title"></el-input>
						</el-form-item>
						<el-form-item   label="素材类型" prop="extend_type" >
							<el-select  :disabled="clicType==1" v-model="form.extend_type" placeholder="请选择素材类型" @change="putLine">
								<el-option :label="itemValue(item)" :value="item" v-for="item in old_type"></el-option>
							</el-select>
							<!--<el-select :disabled="clicType==1" v-for="itme in this.old_type" v-model="form.extend_type" placeholder="请选择素材类型">-->
								<!--<el-option value="">{{itme}}</el-option>-->
							<!--</el-select>-->
						</el-form-item>
						<el-form-item  label="优先级" prop="priority">
							<el-select :disabled="clicType==1" v-model="form.priority" placeholder="优先级">
								<el-option label="高" value="tall"></el-option>
								<el-option label="中" value="centre"></el-option>
								<el-option label="低" value="low"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item  label="广告位类型" prop="position">
							<el-select :disabled="clicType==1" @change="getHint" v-model="form.position"   placeholder="请选择">
								<el-option v-for="item in cslist.platform_position" :key="item" :label="item" :value="item">
								</el-option>
							</el-select>							
						</el-form-item>
						<el-form-item v-show="adType"  label="广告类型" prop="ad_type">
							<el-select :disabled="clicType==1" v-model="form.ad_type"  placeholder="请选择">
								<el-option v-for="item in cslist.platform_ad_type" :key="item" :label="item" :value="item">
								</el-option>
							</el-select>							
						</el-form-item>						
						<el-form-item v-show="adType"  label="渠道类型" prop="channel_type">
							<el-select :disabled="clicType==1" v-model="form.channel_type"  placeholder="请选择">
								<el-option v-for="item in cslist.platform_channel_type" :key="item" :label="item" :value="item">
								</el-option>
							</el-select>							
						</el-form-item>
					</div>
					<div>
						<el-form-item class="shiyi" label="广告类型示意" prop="position_desc" style="display: inline-block; ">
							<img style="width: 200px;height: 284px;margin-left: 50px;border: 1px solid #e4e4e4" :src="Reminders" >
						</el-form-item>
						<el-form-item class="imgs" label="投放位置说明" prop="position_desc">
							<el-upload :disabled="clicType==1" class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="handleAvatarSuccess" :on-error="errd">
								<img v-if="form.position_desc" :src="form.position_desc" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
					</div>

					<el-form-item  class="sixwz wztopdw" label="投放内容描述"  prop="description">
						<el-input :disabled="clicType==1" type="textarea" v-model="form.description"></el-input>
					</el-form-item>
					<el-form-item class="sixwz" label="* 投放链接" v-if="hiden">
						<el-input :disabled="clicType==1" v-model="form.link"></el-input>
					</el-form-item>
					<el-form-item class="sixwz" label="设计要求" prop="note">
						<el-input :disabled="clicType==1" type="textarea" v-model="form.note"></el-input>
					</el-form-item>
					<div class="innerfor">						
						<el-form-item label="素材尺寸" prop="size">
							<el-select :disabled="clicType==1" v-model="form.size"  placeholder="请选择">
								<el-option v-for="item in cslist.material_size" :key="item" :label="item" :value="item">
								</el-option>
							</el-select>			
						</el-form-item>
						<el-form-item  label="需求数量" prop="num">
							<el-input v-model="form.num"></el-input>
						</el-form-item>
						<el-form-item class="sixwz2"  label="投稿截止时间">
							<el-date-picker v-model="form.end_at" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptions1" onchange="fon()" placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</div>
					<el-form-item class="bdbtnd">
						<el-button type="primary" @click="pushData()" round>提交</el-button><el-button type="primary" @click="clocs()" round>取消</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props:['cslist'],
	data() {
		return {
			uploadUrl:'http://ts-i.idatachain.cn/api/upload/file',
			pickerOptions1: {
				disabledDate(time) {			
					return time.getTime() < Date.now() - 8.64e7;
				},
			}, 
			ajaxt:0,
			dialogVisible: false,
            Reminders:'img/1.jpg',
			old_type:[],
            hiden:false,
			form: {
				title: '',
				extend_type:'',
                priority:'',
				size:'',
				position:'',
				position_desc:'',
				end_at:new Date(),
				num:'',
				description:'',
				note:'',
				link:'',
				ad_type:'', 
			},
			imageUrl:'',
			value8:'',
			value1:'',
			clicType:0,
			adType:0,	
			rules:{
				'title': [
					{ required: true, message: ' ', trigger: 'blur' },					
				],
				'extend_type': [
					{ required: true, message: ' ', trigger: 'blur' },					
				],
                'priority': [
                    { required: true, message: ' ', trigger: 'blur' },
                ],
				'size': [
					{ required: true, message: ' ', trigger: 'blur' },				
				],
				'position': [
					{ required: true, message: ' ', trigger: 'blur' },					
				],
				'position_desc': [
					{ required: true, message: ' ', trigger: 'blur' },					
				],
				'num': [
					{ required: true, message: ' ', trigger: 'blur' },					
				],
				'note': [
					{ required: true, message: ' ', trigger: 'blur' },					
				],
				'ad_type': [
					{ required: true, message: ' ', trigger: 'blur' },					
				],
				'description': [
					{ required: true, message: ' ', trigger: 'blur' },					
				],
			}	
		};
	},
	mounted: function () {	
		this.checkUrl();
		this.advertising();
	}, 	
	methods: {
		checkUrl(){
			if(window.location.host=='c.zookingsoft.com'){			
				this.uploadUrl ='http://c.zookingsoft.com/api/upload/file';
			}			
		},
        advertising(){
		    this.api.material_type().then((res)=>{
               this.old_type=res;
               console.log(this.old_type)
			})
		},
        itemValue(item){
		  if(item=='needs_picture'){
		      return '广告静态图'
		  }
		  if(item=='needs_script_picture'){
			  return '广告脚本图'
            }
          if(item=='needs_resource'){
              return '广告脚本模板'
          }
          if(item=='needs_h5_resource'){
             return '广告H5模板'
          }
          if(item=='needs_wallpaper'){
              return '锁屏壁纸脚本图'
          }
		},
		fon(){
		},
            setData(newData){
			this.form = newData;
			this.putLine();
			this.getHint();
			this.clicType=1;
			this.open();
		},				
		clocs(){
			this.dialogVisible= false;				
			if(this.clicType==0){          //this.clicType==1
				this.form={
					title: '',
					extend_type:'',
                    priority:'',
					size:'',
					position:'',
					position_desc:'',
					end_at:new Date(),
					num:'',
					description:'',
					note:'',
					link:'',
					ad_type:'',

				};
				this.Reminders='img/1.jpg';
				console.log(this.clicType)
			}
			this.clicType = 0;

		},
		open(){
			this.dialogVisible= true;
		},
        getHint(){
            this.api.need_adtype().then((res)=>{
                for(var i=0 ;i<res.length;i++){
                    if(this.form.position==res[i].ad_type){
                        this.Reminders = res[i].url;
                        console.log(res[i].url);
                        return
                    }
                }
                console.log(res);
            })
        },
        putLine(){
		    if(this.form.extend_type=='needs_picture'||this.form.extend_type=='needs_script_picture'){
		        return this.hiden=true;
			}else {
		        return this.hiden=false;
			}
		},
		pushData(){
			let pd = Date.parse(new Date(this.form.end_at));
			if(pd<Date.parse(new Date())){
				this.$message("截至时间不能小于当前时间");
				return
			}
			if(!this.form.extend_type){
				this.$message("素材类型 不能为空。");
				return
			}
            if(!this.form.priority){
                this.$message("优先级不能为空。");
                return
            }
			if(!this.form.title){
				this.$message("标题 不能为空。");
				return
			}
			if(!this.form.size){
				this.$message("大小/尺寸 不能为空。");
				return
			}
			if(!this.form.position){
				this.$message("广告位类型 不能为空。");
				return
			}	
			if(!this.form.position_desc){
				this.$message("投放位置说明 不能为空。");
				return
			}
			if(!this.form.num){
				this.$message("需求数量 不能为空。");
				return
			}	
			if(!this.form.description){
				this.$message("描述 不能为空。");
				return
			}	
			if(!this.form.note){
				this.$message("设计要示 不能为空。");
				return
			}
			if(this.form.extend_type=='needs_picture' && !this.form.link){
				this.$message("投放链接 不能为空。");
				return
			}if(this.form.extend_type=='needs_script_picture' && !this.form.link){
				this.$message("投放链接 不能为空。");
				return
			}
			if(this.clicType==0){
				this.addData();
			}else{
				this.upDate();
			}
		},	
		addData(){
			let data = this.form;
			console.log(data)
			this.api.need_create(data)				
		},
		upDate(){
			let data = {id:this.form.id,end_at:this.form.end_at,num:+this.form.num};
			if(this.ajaxt==1){
				return
			}
				this.ajaxt=1;
				this.api.need_update(data).then(()=>{	
				this.ajaxt=0;
			}).catch(()=>{
				this.ajaxt=0;	
			})	
			
		},
		errd(){
			this.form.position_desc='xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
		},
		handleAvatarSuccess(res, file) {
			if(res.code==0){
				this.form.position_desc = URL.createObjectURL(file.raw);
				this.form.position_desc=res.data.url;
			}else{
					this.$message(res.message);
			}
			
		},	
	},
	watch: {
		"form.extend_type"(newv){
			if(newv=='needs_resource' || newv == 'needs_h5_resource'){
				this.adType = true;
			}else{
				this.adType =false;
				this.form.ad_type = '';
			}
		}	
	}
}
</script>

<style>
.tcBOx{
	position: fixed;
	z-index: 9;
	top: 65px;
	left: 316px;
	bottom: 0;
	right: 0;
}
.tcBoxbg{
	background: rgba(0,0,0,.3);
	width: 100%;
	height: 100%;
}
.tcboxff{
	position: absolute;
	top: 36px;
	left: 50px;
	right: 94px;
	bottom: 35px;
	background:rgba(255,255,255,1);
	box-shadow:0px 1px 8px 0px rgba(0, 0, 0, 0.08);
	border-radius: 14px;
}
 .avatar-uploader .el-upload {
	width: 100%;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100%;
    height: 284px !important;
    line-height: 284px !important;
    text-align: center;
}
.avatar {
    width: 100%;
    height: 284px;
    display: block;
}
.tcboxff2{
	margin: 41px 170px 31px;
	
}
.tcboxff{
	overflow: auto;
	overflow-x: hidden;
}
.bdbtnd{text-align: center;margin-top: 55px;}
.tcboxff .el-input__inner{
	height: 28px !important;
}
.bdbtnd .el-button{
	width:82px;
	height:28px;
	line-height: 0;
	font-size:14px;
	font-family:MicrosoftYaHei;
	font-weight:400;
	color:rgba(255,255,255,1);
}
.bdbtnd .el-button:nth-child(1){
	margin-right: 70px;
	background:rgba(255,120,117,1);
	border-color: rgba(255,120,117,1);
}
.bdbtnd .el-button:nth-child(2){
	background:rgba(191,191,191,1);
	border-color:rgba(191,191,191,1);
}
.bdbtnd .el-form-item__content{
	margin-left: 0 !important;
}
.tcboxff .el-form-item{
	margin-bottom: 22px;
}
@media only screen  and (max-width: 720px) {
	.tcBOx{left: 0;}
	.tcboxff2{margin: 20px;}
}
.shiyi{display: inline-block}
.shiyi label{
	width: 140px !important;
	text-align: left;
	padding: 0;
}
.imgs>label{
	width: 100px !important;
	text-align: left;
	padding: 0;
}
.imgs{
	margin-left: 50px;
	width: 64%;
	display: inline-block;
}
.sixwz>label{
	width: 100px !important;
    text-align: left;
    padding: 0;
} 
.sixwz .el-form-item__content{
	margin-left: 137px !important;
	padding-right: 127px;
}
.wztopdw .el-form-item__label{
	line-height: 15px;
}
.sixwz2 label{
	width: 94px !important;
	text-align: right;
	padding: 0;
}
.sixwz2 .el-form-item__content{
	margin-left: 24px !important;
}
.innerfor>div{
	display: inline-block;
	width: 33%;
}
.innerfor>div>div{display: inline-block;margin-left: 0 !important;}
.innerfor>div:nth-child(2){
	text-align: center;
}
.innerfor>div:nth-child(3){
	text-align: right;
}
.innerfor .el-form-item__label{
	float: none;
}
@media only screen  and (max-width: 720px) {
	.tcboxff{left: 30px !important;right: 30px !important;}
} 
.texfg{
	text-align: left !important; 
}
</style>
