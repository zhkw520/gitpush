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
				<el-form ref="form" :model="form" label-width="80px">
				<el-form-item v-show="onTd=='add'" label="用户名">
				<el-input v-model="form.name" :value="form.name" placeholder=""></el-input>
				</el-form-item>		
				<el-form-item v-show="onTd=='add'" label="邮箱">
				<el-input v-model="form.email" :value="form.email" placeholder=""></el-input>
				</el-form-item>	
				<el-form-item label="所属角色">
					<div><el-checkbox-group v-model="form.roles" >						
						<el-checkbox 
						:disabled="(ckon==1 || form.roles.indexOf(el.id)!=-1)?false:true" 
						v-for="el in options" 
						:key="el.id"
						:label="el.id" 
						>
							{{el.role_name}}
						</el-checkbox>
					</el-checkbox-group></div>
				</el-form-item>	
				<el-form-item v-show="onTd=='add'" label="密码">
				<el-input v-model="form.password" :value="form.name" type="password" placeholder=""></el-input>
				</el-form-item>	
				<el-form-item v-show="onTd=='add'" label="确认密码">
				<el-input v-model="form.password_confirmation" :value="form.name" type="password" placeholder=""></el-input>
				</el-form-item>	
				
				
				</el-form>				 
				<div class="btnds" v-if="ckon==1">
					<div @click="add_account" class="btnd honse">提交</div>
					<div @click="hindjse" class="btnd hyse">返回</div>
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
			isshowd:false,
			datasd:{},
			options:[],
			tableData:[],
			search:'',
			tableConfig:{
				total:0,
				ischeck:false,
				list:[		
					{prop:'email',lable:'用户邮箱'},
					{prop:'name',lable:'用户名'},
					{prop:'description',lable:'角色',
						temps:[							
							{cls:' ',type:'text',value:'查看',fnName:'edit_fn2'},
						]
					},
					{prop:'created_at',lable:'创建时间'},
					{prop:'login',lable:'最近登录'},
					
					{prop:'status',lable:'是否启用','switch':{cls:'',mode:[],fnName:'chetype'},
						
					},	
					{prop:'attachment.url',lable:'操作',
						temps:[		
							{cls:' ',type:'text',value:'编辑',fnName:'edit_fn'},
							// {cls:' ',type:'text',value:'删除',fnName:'delete_account'}
						]							
					},			
				],
				btns:[/* {fnName:'addjse',cls:'hsan',value:'添加账号'},*/],
			},
			onTd:'',
			form:{},
			ckon:1,
		}
    },
	mounted: function () {	
		this.getOpd();
		this.getData();
	}, 
	methods: {	
		addjse(){
			this.onTd='add';	
			if(this.options.length>0){
				this.showBoxd();
			}else{
				this.getOp();	
			}
					
		},
		showBoxd(obj){
			if(this.onTd=='add'){				
				this.form={roles:[]};
			}
			if(this.onTd=='edit'){
	
				this.form=obj;
				let arr = [];

				for(let i=0,n=this.form.roles.length;i<n;i++){
				
					arr.push(this.form.roles[i].id);
				}
				this.form.roles = arr;
			}	

			this.isshowd= true;		
		},
		hindjse(){			
			this.isshowd= false;
		},
		edit_fn2(on){
			this.form={roles:[]};
			this.ckon='';
			let params = {email:this.tableData[on].email};	
			this.api.get_account({params}).then((response)=>{
				this.onTd='edit';			
				if(this.options.length>0){		
					this.showBoxd(response);
				}else{
					this.getOp(response);	
				}		
			})		
		},
		edit_fn(on){
			this.ckon=1;
			let params = {email:this.tableData[on].email};	
			this.api.get_account({params}).then((response)=>{

				this.onTd='edit';			
				if(this.options.length>0){
					this.showBoxd(response);
				}else{
					this.getOp(response);	
				}		
			})		
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
		chetype(on){
			let params = {email:this.tableData[on].email,status:this.tableData[on].status==1?0:1};	
			this.api.edit_account_status(params).catch(()=>{
				this.tableConfig.list[5].switch.mode[on] = this.tableData[on].status==1?true:false;
			});	
		},
		add_account(){	
			let params = this.form;
			if(this.onTd=='add'){				
				this.api.add_account(params)
			}
			if(this.onTd=='edit'){
				this.api.edit_account(params)
			}			
		},
		
		enloding(){
			this.$refs.Tabledd.lodingfalse();		
		},
		getOp(obj){
			this.api.get_roles().then((response)=>{		
				for(let i=0,n=response.length;i<n;i++){
					if(response[i].status==1){
						this.options.push({'role_name':response[i].role_name,'id':response[i].id});
					}
					
				}
				this.showBoxd(obj);
			})
		},
		getOpd(){
			this.api.get_account_roles().then((response)=>{		
				for(let i=0,n=response.length;i<n;i++){
					if(response[i].status==1){
						this.options.push({'role_name':response[i].role_name,'id':response[i].id});
					}
				}
				
			})
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
			this.api.get_accounts({params}).then((response)=>{		
				this.tableData = this.clData(response);		
				this.enloding();
			}).catch(()=>{
				this.enloding();
			});	
		},
		clData(data){
			let arr  = [];
			this.tableConfig.total=-1;
			let da = data;		
			this.tableConfig.list[5].switch.mode = [];
			for(let i=0,n=da.length;i<n;i++){
				this.tableConfig.list[5].switch.mode.push(da[i].status==1?true:false);
				arr.push(
					{
						email:da[i].email,
						name:da[i].name,
						login:da[i].login,
						created_at:da[i].created_at,						
						status:da[i].status,
						sum_user:da[i].sum_user,
					},

				);
			}
		
			return arr;
		},				
    },	
}	
</script>
<style>

</style>