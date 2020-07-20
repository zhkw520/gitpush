<template>
	<div>
		<div class="top_name">
			<!--<span class="inner">|</span>-->
			<span class="top_txt">个人中心/基本信息</span>
			<div class="title_left">
				<span>基本信息</span>
			</div>
		</div>
		<div class="centNavBox">

			<div class="center">
				<div class="userImg message">
					<span style="vertical-align: top">头像</span>
					<img :src="img" style="border-radius: 50%;width: 100px;height: 100px">
				</div>
				<div class="message" v-if="userData.type==0">
					<span>用户名</span>
					<input type="text" v-model="userData.name" disabled="disabled"/>
				</div>
				<div class="message">
					<span>账号</span>
					<input type="text" v-model="userData.email" disabled="disabled"/>
				</div>
				<div class="message" v-if="userData.type==0&&userData.roles.length>0">
					<span>角色</span>
					<input type="text" v-model="userData.roles[0].role_name" disabled="disabled"/>
				</div>
				<div class="message" v-if="userData.type==1">
					<span>公司名称</span>
					<input type="text" v-model="userData.company" disabled="disabled"/>
				</div>
				<div class="message" v-if="userData.type==1">
					<span>联系方式</span>
					<input type="text" v-model="userData.phone" disabled="disabled"/>
				</div>
			</div>

		</div>
	</div>

</template>

<script>
export default {

    data() {		
		return {
			activeName2: '1',
			input1:'',
			input2:'',
			input3:'',
			userData:{},
            name:'',
            email:'',
            role_name:'',
            company:'',
            phone:'',
			img:'./img/user.png'

		}
	},
	mounted: function () {	
		this.getData();
	}, 
	methods: {
		getData(){
			let params = {
				email:localStorage.getItem('userAd'),
			};
			
			this.api.get_account({params}).then((datas)=>{			
				this.userData = datas;
				if(datas.roles[0].icon!=''){
				    this.img=datas.roles[0].icon;
				}

			});
		},
		edit_account_password(){

			if(!this.input1){
				this.$message('旧密码不能为空！');
				return
			}
			if(!this.input2){
				this.$message('新密码不能为空！');
				return
			}
			if(!this.input3){
				this.$message('重复密码不能为空');
				return
			}
			if(this.input2!=this.input3){
				this.$message('两次输入不一致');
				return
			}
			let params = {
				email:localStorage.getItem('userAd'),
				password_old:this.input1,
				password:this.input2,
				password_confirmation:this.input3,
			};
			this.api.edit_account_password(params);
		}
	}
}
</script>

<style scoped>
.top_name{
	height: 109px;
	z-index: 999999;
}
.top_txt{
	display: inline-block;
	margin-left: 24px;
}
.centNavBox{
	width: 100%;
	padding: 24px 0 24px;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	background: #FFF;
	margin-top:194px;
}
.userImg{
	margin-bottom: 50px;
}
.userImg>img{
	width: 100px;
}
.xqList{
	margin: 114px 24px 85px 276px!important;
}
.center{
	margin-bottom: 210px;

}
.message {
	margin-bottom: 24px;
}
input{
	width:404px;
	height:36px;
	background:rgba(255,255,255,1);
	border-radius:4px;
	border:1px solid #F7F9FC;
	padding-left: 15px;
}
.message>span{
	display: inline-block;
	width: 80px;
	margin-right: 24px;
	margin-left: 0!important;
	text-align: right;
	font-size:14px;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	color:rgba(31,46,77,1);
	line-height:36px;
}
.cembox{width: 100%;background: #fff;}
.cembox>div{padding: 0 30px;}
.cembox1{text-align: center;padding: 49px 30px 0 !important;margin-bottom: 36px;}
.cembox1>img{
	display: block;
	margin: 0 auto 16px;

}
.cembox2{
	margin-bottom: 103px;
}
.cembox2>div{
	margin-bottom: 17px;
}
.cembox2T{
	font-size:14px;
	font-family:PingFang-SC-Regular;
	font-weight:400;
	color:rgba(0,0,0,1);
}
.cembox2P1{
	font-size:12px;
font-family:PingFang-SC-Regular;
font-weight:400;
color:rgba(0,0,0,1);
opacity:0.65;
}
.cembox2P1>span:nth-child(1){
	display: inline-block;
	text-align: right;
	margin-right: 36px;
	width: 60px;
}
.cemboxy{
	padding: 181px 0 384px;	
}
.cemboxy>div{
	width: 250px;
	margin: 0 auto 25px;	
}
.cemboxyT{
	text-align: center;
	font-size:14px;
	font-family:PingFang-SC-Regular;
	font-weight:400;
	color:rgba(0,0,0,1);
	padding:  0 25px !important;
}
.cemboxyB{text-align: center;}
.cemboxyB>div{
	display: inline-block;
	width:72px;
	height:28px;
	background:rgba(105,192,255,1);
	border-radius:14px;
	text-align: center;
	line-height: 28px;
	cursor: pointer;
	font-size:14px;
	font-family:PingFang-SC-Regular;
	font-weight:400;
	color:rgba(255,255,255,1);
}
.cemboxyB>div:hover{
	opacity: .7;
}

.cembox>div input{
	background:rgba(245,245,245,1);
}
.cembox3 ul{
	margin: 17px 0 0 26px;
}
.cembox3 li{
	display: inline-block;
	margin-right: 20px;
	margin-bottom: 20px;
	font-size: 12px;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(0,0,0,1);
    opacity: 0.65;
}

.title_left>span{
	display: inline-block;
	margin-left: 24px;
	font-size:20px;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	color:rgba(50,50,50,1);
}
</style>
