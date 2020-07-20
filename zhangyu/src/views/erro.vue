<template>
	<div class="box">
		<el-dialog
			title="提示"
			:visible.sync="centerDialogVisible"
			width="30%"
			left
			:before-close="handleClose">
			<span style="margin-bottom:20px;display: inline-block;">账号暂无权限，请输入权限申请说明，发起权限申请</span>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="125px" class="demo-ruleForm">
				<el-form-item label="用户名:">
					<el-input type="text" maxlength="10" show-word-limit v-model="ruleForm.userName" placeholder="请输入用户名，最多可输入10字"></el-input>
				</el-form-item>
				<el-form-item label="申请说明(选填):">
					<el-input :rows="3" type="textarea" maxlength="200" show-word-limit v-model="ruleForm.desc" placeholder="请输入申请内容，最多200字"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="submitForm()">确 认</el-button>
				<el-button @click="resetForm()">取消</el-button>	
			</span>
		</el-dialog>
		<el-dialog
			title="提示"
			:visible.sync="dialogVisible"
			width="30%"
			left
			:close-on-click-modal="false"
			:showClose="showClo">
			<span style="margin-bottom:20px;display: inline-block;">已申请权限，请耐心等待</span>
			<div class="titl_right">
                <div class="message">
                    <span class="message_name" style="width:135px;">用户名:</span>
                    <span class="message_box">{{ruleForm.name}}</span>
                </div>
                <div class="message">
                    <span class="message_name" style="width:135px;">申请说明(选填):</span>
                    <span class="message_box">{{ruleForm.reason}}</span>
                </div>
                <div class="message">
                    <span class="message_name" style="width:135px;">申请时间:</span>
                    <span class="message_box">{{ruleForm.apply_time}}</span>
                </div>
            </div>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="sure1">确 认</el-button>
			</span>
		</el-dialog>
		<el-dialog
			title="提示"
			:visible.sync="popupWindow"
			width="30%"
			left
			:before-close="handleClose">
			<span>权限申请已通过，请重新登录</span>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="sure3">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog
			title="提示"
			:visible.sync="refusedVisible"
			width="30%"
			left
			:before-close="handleClose">
			<span>权限申请已拒绝，请联系管理员</span>
			<div class="message" v-if="ruleForm.reason != ''" style="margin-top:20px;">
				<span class="message_name">拒绝原因:</span>
				<span class="message_box">{{ruleForm.refuse_reason}}</span>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="sure4">确 认</el-button>
				<el-button type="primary" @click="newApply">重新申请</el-button>
			</span>
		</el-dialog>
		<el-dialog
			title="提示"
			:visible.sync="refusedVisible_pop"
			width="30%"
			left
			:before-close="handleClose">
			<span>已申请权限，请耐心等待</span>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="sure">确 认</el-button>
			</span>
		</el-dialog>
		<el-dialog
			title="提示"
			:visible.sync="refusedVisible_pop2"
			width="30%"
			left
			:before-close="handleClose">
			<span>账号暂无权限</span>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="sure2">确 认</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data(){
		return {
			ruleForm:{
				userName:'',
				email:'',
			    desc:'',
			},
			rules: {
				userName:[
					{ required: true, message: '请输入用户名', trigger: 'blur' },
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				// desc:[
				// 	{ required: true, message: '请输入申请说明', trigger: 'blur' },
				// ],
			},	
			centerDialogVisible:false,
			dialogVisible:false,
			popupWindow:false,
			refusedVisible:false,
			refusedVisible_pop:false,
			refusedVisible_pop2:false,
			showClo:false,
		}
	},
    mounted:function (){
		this.account_apply_status();
		// this.loginout()
	},
	methods:{
		newApply(){
			this.centerDialogVisible = true;
		},
		sure(){
			this.centerDialogVisible = false;
			this.refusedVisible_pop = false;
			this.loginout()
		},
		sure1(){
			this.dialogVisible = false;
			this.loginout()
		},
		sure2(){
			this.refusedVisible_pop2 = false;
			this.loginout()
		},
		sure3(){
			this.popupWindow = false;
			this.loginout()
		},
		sure4(){
			this.refusedVisible = false;
            this.loginout()
		},
		handleClose(done) {
			this.$confirm('确认关闭？')
			.then(_ => {
				done();
			})
			.catch(_ => {});
		},
		submitForm() {
			if(!this.ruleForm.userName){
				this.$message.error('请输入用户名!')
				return false
			}
			this.api.account_apply_permission({name:this.ruleForm.userName,reason:this.ruleForm.desc}).then((datas)=>{
				console.log(datas)
				if(datas==false){
					return
				}
				if(datas==null){
					this.$message.success('申请成功,请耐心等待!')
					this.centerDialogVisible = false;
					this.refusedVisible_pop = true;				
				    
				}			
            })
			
		},
		resetForm() {
			this.centerDialogVisible = false;
			this.loginout()
		},
		loginout(){
		    window.localStorage.clear();
			let urld = 'http://ts-i.idatachain.cn',
			accountUrl = "http://ts-account.idatachain.cn/auth/logout?from=";
			if(window.location.host=='c.zookingsoft.com'){
				urld = 'https://c.zookingsoft.com';
				accountUrl = "http://account.zookingsoft.com/auth/logout?from=";
			}
            if(window.location.host=='c2.zookingsoft.com'){
                urld = 'https://c2.zookingsoft.com';
				accountUrl = "http://account.zookingsoft.com/auth/logout?from=";
            }
			this.$ajax({
				method: 'get',
				timeout: 10000,
				url: urld+'/api/logout',			     
			}).then((msg)=>{	
					if(msg.data.code==0){
						localStorage.setItem('token','');
						let cent = 'center';
						if(window.location.host=='ts-centerweb.idatachain.cn'){
							cent = 'center_dev';
						}else
						if(window.location.host=='localhost:8080'){
							cent = 'center_local';
						}else if(window.location.host=='c2.zookingsoft.com'){
                            cent = 'center_dev2';
						}
						window.location.href=accountUrl + cent;
					}						
			}).catch(()=>{
			
			})			
		},
		account_apply_first_login(){
            this.api.account_apply_first_login().then((datas)=>{
				this.popupWindow = true;
			})				
		},
		account_apply_status(){
			// let params = {Authorization:"Bearer"+localStorage.getItem('token')}
            this.api.account_apply_status().then((datas)=>{					
                if(datas.status == 0){
                    this.centerDialogVisible = true;
                }
                if(datas.status == 1){
					this.dialogVisible = true;
					this.ruleForm = datas;
                }
                if(datas.status == 2){
					this.refusedVisible = true;
					this.ruleForm = datas;
                }
                if(datas.status == 3){
					this.popupWindow = true;
				}
				if(datas.status == 4){
					this.centerDialogVisible = true;
				}
				if(datas.status == 5){
					this.account_apply_first_login();
                }
            })

		},
	}
}
</script>

<style scoped="scoped">
.box >>> .el-form-item__label{
	text-align: left;
}
.box >>> .el-button{
	background-color: #ffffff !important;
}
.box >>> .el-button--primary {
    color: #FFF;
    background-color: #409EFF !important;
    border-color: #409EFF;
}
.box >>> .el-input{
	width: 87%;
}
.message{
    margin-bottom: 46px;
}
.message_name{
    display: inline-block;
    width: 70px;
    text-align: right;
    margin-right: 24px;
    font-size:14px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(31,46,77,1);
}
.message_top{
    vertical-align: top;
}
</style>
