<template>
	<div class="centNavBox">
		<el-tabs v-model="activeName2" type="card" >
			<el-tab-pane label="详细资料" name="1">
				<div class="cembox">
					<div class="cembox1">
						<!--<img :src="'/img/tx.png'" alt="">-->
					</div>
					<div class="cembox2">
						<div class="cembox2T">基本信息</div>
						<div class="cembox2P1"><span>手机号</span><span>{{userData.phone}}</span></div>
						<div class="cembox2P1"><span>邮箱</span><span>{{userData.email}}</span></div>
					</div>
					<div class="cembox3">
						<div class="cembox2T">权限信息</div>
						<ul>
							<li v-for="(el,index) in userData.roles" :key="index">{{el.role_name}}</li>							
						</ul>
					</div>
				</div>
			</el-tab-pane>	
			<el-tab-pane label="帐号安全" name="2">
				<div class="cembox cemboxy">
					<div class="cemboxyT">修改密码</div>
					<div><el-input v-model="input1" type="password" placeholder="原始密码"></el-input></div>
					<div><el-input v-model="input2" type="password" placeholder="新密码"></el-input></div>
					<div><el-input v-model="input3" type="password" placeholder="确认新密码"></el-input></div>
					<div class="cemboxyB" @click="edit_account_password"><div>确认</div></div>
				</div>
			</el-tab-pane>
		</el-tabs>
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

<style>
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
</style>
