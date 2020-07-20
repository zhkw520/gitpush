<template>
	<div>
		
		<div class="sler">
			<el-input class=" wdhf"    v-model="search" placeholder="公司名/联系人/邮箱"></el-input><el-button round @click="sx()" class="sxbtnde">查询</el-button>
		</div>	
		<tables 
			:tableConfig="tableConfig" 
			:tableDatas="tableData"
			@screenFn="getData"
			ref="Tabledd"
		></tables>
		
		<div class="tcVbox" v-show="isshowd">
			<div class="tcVboxBg" @click="hindjse"></div>		
			<div class="tjzsd">
				<div v-show="isaff=='add' || isaff=='edit'">
				<el-form ref="form" :model="form" label-width="100px">
					<el-form-item label="公司名称">
					<el-input v-model="form.company" :value="form.company" placeholder=""></el-input>
					</el-form-item>		
					<el-form-item v-if="isaff=='add'" label="公司邮箱">
					<el-input v-model="form.email" :value="form.email" placeholder=""></el-input>
					</el-form-item>		
					<el-form-item label="联系人姓名">
					<el-input v-model="form.name" :value="form.name" placeholder=""></el-input>
					</el-form-item>		
					<el-form-item label="联系人电话">
					<el-input v-model="form.phone" :value="form.phone" placeholder=""></el-input>
					</el-form-item>		
					<el-form-item label="联系人邮箱">
					<el-input v-model="form.contact_email" :value="form.contact_email" placeholder=""></el-input>
					</el-form-item>		
					<el-form-item v-if="isaff=='add'" label="密码">
					<el-input  v-model="form.password" :value="form.password" type="password"></el-input>
					</el-form-item>		
					<el-form-item v-if="isaff=='add'" label="确认密码">
					<el-input v-model="form.password_confirmation" :value="form.password_confirmation" type="password"></el-input>
					</el-form-item>		
				
				</el-form>				 
				<div class="btnds">
					<div @click="add_account" class="btnd honse">提交</div>
					<div @click="hindjse" class="btnd hyse">返回</div>
				</div>		
				</div>
				<div class="seebox" v-show="isaff=='see'">
					<div><span>联系人：</span>{{onUser.name}}</div>
					<div><span>联系电话：</span>{{onUser.phone}}</div>
					<div><span>联系邮箱：</span>{{onUser.contact_email}}</div>
					<!-- <div @click="hindjse" class="hsbtn">关闭</div> -->
				</div>
			</div>
		</div>
		
		
	</div>	
</template>
<script>
import tables from '../../common/tables';
export default {
	components:{tables},
    data() {
		return {
			form:{},
			isshowd:false,
			onUser:{},
			search:'',
			options:[],
			isaff:'',
			tableData:[],	
			tableConfig:{
				total:0,
				ischeck:false,
				list:[
					{prop:'email',lable:'公司邮箱'},
					{prop:'company',lable:'公司名称'},
					{prop:'description',lable:'联系人信息',
						temps:[
							{cls:' ',type:'text',value:'查看',fnName:'seeXx'},

						]	
					},
					{prop:'created_at',lable:'创建时间'},
					{prop:'login',lable:'最近登录'},
					
					{prop:'status',lable:'是否启用','switch':{cls:'',mode:[],fnName:'chetype'},
						
					},	
					{prop:'attachment.url',lable:'操作',
						temps:[
							{cls:' ',type:'text',value:'编辑',fnName:'edit_user'},
							// {cls:' ',type:'text',value:'删除',fnName:'delete_account'}
						]							
					},		
				],
				btns:[
					{fnName:'addShow',cls:'hsan',value:'添加账号'},
				],
			},
			onTd:'',
			
		}
    },
	mounted: function () {	
		
		this.getData();
	}, 
	methods: {
		edit_user(on){
			
			let params = {email:this.tableData[on].email};	
			this.api.get_account({params}).then((response)=>{
				this.form = response;
				this.isaff = 'edit';
				this.isshowd= true;		
			})
		},
		chetype(on){
		
			let params = {email:this.tableData[on].email,status:this.tableData[on].status==1?0:1};	
			this.api.edit_account_status(params).catch(()=>{
				this.tableConfig.list[5].switch.mode[on] = this.tableData[on].status==1?true:false;
			});	
		
			
		},
		delete_account(on){
			this.$confirm('是否确认删除', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let params = {email:this.tableData[on].email};	
				this.api.delete_account(params);
			}).catch(() => {
			});
			
		},
		get_account(){
			this.api.get_account()
		},
		add_account(){
			if(this.isaff=='add'){
				let params = this.form;
				this.api.add_external_account(params)
			}
			if(this.isaff=='edit'){
				let params = this.form;
				this.api.edit_external_account(params)
			}
		},
		seeXx(on){
			this.onUser = this.tableData[on];
			this.isaff = 'see';
			this.isshowd= true;
		},
		addShow(){
			this.isaff = 'add';
			this.isshowd= true;
		},
		addjse(){
			this.getUserList();
			
		},
		hindjse(){
	
			this.isshowd= false;
		},
		enloding(){
			this.$refs.Tabledd.lodingfalse();		
		},
		sx(){
			if(this.search){
				this.getData(this.search);
			} 
		},
		getData(data){	
			let params;
			if(data){
				params = {search:data};	
			}
			this.api.get_external_accounts({params}).then((response)=>{		

				this.tableData = this.clData(response);		
				this.enloding();
			}).catch(()=>{
				this.enloding();
			});	
		},
		checkTime(value){
			if(!value){return}
			return value.substring(0,10);
		},
		clData(data){

			let arr  = [];
			this.tableConfig.total=-1;
			let da = data;			
			for(let i=0,n=da.length;i<n;i++){
				this.tableConfig.list[5].switch.mode.push(da[i].status==1?true:false);
				arr.push(
					{
						email:da[i].email,
						company:da[i].company,
						contact_email:da[i].contact_email,
						name:da[i].name,
						phone:da[i].phone,
						created_at:this.checkTime(da[i].created_at),
						login:da[i].login,						
						type:da[i].type,
						status:da[i].status
					},					
				);
			}
			return arr;
		},				
    },	
}	
</script>
<style>
.seebox{
	font-size:14px;
	font-family:MicrosoftYaHei;
	font-weight:400;
	color:rgba(2,2,2,1);
	opacity:0.85;
	margin-bottom: 40px;
}
.seebox>div{
	margin-bottom: 13px;
}
.seebox>div>span{
	margin-right: 15px;
}
.hsbtn{
	cursor: pointer;
	width:82px;
	height:28px;
	line-height: 28px;
	color: #fff;
	background:rgba(191,191,191,1);
	border-radius:14px;
	text-align: center;
	margin: 112px auto 76px !important;
}
.hsbtn:hover{
	opacity: .7;
}
.wdhf{
	width: 155px !important;}
.sxbtnde {
	position: absolute;
    top: 52px;
    left: 240px;
    width: 82px;
    height: 28px;
    background: rgba(105,192,255,1) !important;
    border-radius: 14px;
    line-height: 28px !important;
    padding: 0 !important;
    border: none !important;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(255,255,255,1) !important;
}

</style>