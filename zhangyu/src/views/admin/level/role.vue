<template>
	<div>
		<div class="sler">
			<el-input class=" wdhf"  v-model="search" placeholder="角色名称/角色描述"></el-input><el-button round @click="sx()" class="sxbtnde">查询</el-button>
		</div>
		<div>
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
						<el-form-item label="角色名称">
							<el-input v-model="form.name" :value="form.name" placeholder=""></el-input>
						</el-form-item>
						<el-form-item label="角色描述">
							<el-input type="textarea" v-model="form.description">{{form.description}}</el-input>
						</el-form-item>
					</el-form>
					<div class="btnds">
						<div @click="add_role" class="btnd honse">提交</div>
						<div @click="hindjse" class="btnd hyse">返回</div>
					</div>

				</div>
			</div>
			<roqxList :datas="datasd" ref="roqx"></roqxList>
		</div>
	</div>

</template>
<script>
import tables from '../../common/tables';
import roqxList from './roqxList';
export default {
	components:{tables,roqxList},
    data() {
		return {
			form:{},
			datasd:{},
			addType:0,
            search:'',
			tableData:[],	
			isshowd:false,
			tableConfig:{
				total:0,
				ischeck:false,
				list:[
					{prop:'role_name',lable:'角色名称'},
					{prop:'description',lable:'介绍'},
					{prop:'created_at',lable:'创建日期'},
					{prop:'status',lable:'是否启用','switch':{cls:'',mode:[],fnName:'chetype'},
						
					},
					{prop:'users_count',lable:'绑定人数'},
					{prop:'updator',lable:"最近操作人"},
					{prop:'attachment.url',lable:'操作',
						temps:[
							{cls:'hesd',type:'text',value:'设置权限',fnName:'seeQux'},
							{cls:'hesd',type:'text',value:'编辑',fnName:'edit_roles'},
							{cls:'hesd',type:'text',value:'删除',fnName:'delete_role'}
						]							
					},		
								
				],
				btns:[
					{fnName:'addjse',cls:'hsan',value:'新增角色'},
				],
			},
			onTd:'',
		}
    },
	mounted: function () {	
		this.getData();
	}, 
	methods: {
		seeQux(on){
			
			this.$refs.roqx.showAdd(this.tableData[on]);
		
		},
		delete_role(on){
			this.$confirm('是否确认删除', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if(this.addType==1){
						return;
					}
					this.addType=1;
					let params = {id:this.tableData[on].id};	
					this.api.delete_role(params).then(()=>{
						this.addType=0;
					}).catch(()=>{
						this.addType=0;
					});
				}).catch(() => {
					
				});
		},
		edit_roles(on){			
			let params = {id:this.tableData[on].id};	
			this.api.edit_roles({params}).then((datas)=>{
				this.form = {
					name:datas.role_name,
					description:datas.description,
					id:datas.id,
				}
				this.onTd='eid';
				this.isshowd= true;
			})
		},

		chetype(on){
		
			let params = {id:this.tableData[on].id,status:this.tableData[on].status==1?0:1};	
			this.api.change_role_status(params);	
		},
		add_role(){
			if(this.addType==1){
				return;
			}
			this.addType=1;
			let params = this.form;
			if(this.onTd=='add'){
				this.api.add_role(params).then(()=>{
					this.addType=0;
				}).catch(()=>{
					this.addType=0;
				});
			}			
			if(this.onTd=='eid'){
				this.api.edit_rolex(params).then(()=>{
					this.addType=0;
				}).catch(()=>{
					this.addType=0;
				});			
			}
		},
		enloding(){
			this.$refs.Tabledd.lodingfalse();
		},
		addjse(){
			this.form = {};
			this.onTd='add';
			this.isshowd= true;
		},
		hindjse(){
			this.isshowd= false;
		},
        sx(){
            if(this.search){
                this.getData(this.search);
            }
        },
		getData(search){
            let params;
            if(search){
                params = {search:search};
            }
			this.api.get_roles({params}).then((response)=>{
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
			for(let i=0,n=da.length;i<n;i++){
				this.tableConfig.list[3].switch.mode.push(da[i].status==0?false:true);			
				arr.push(
					{
						id:da[i].id,
                        updator:da[i].updator,
						role_name:da[i].role_name,
						description:da[i].description,
						created_at:da[i].created_at,						
						status:da[i].status,
						users_count:da[i].users_count,
						permissions:da[i].permissions
					},
				);
			}
			return arr;
		},				
    },
	
}	
</script>
<style>

.tjzsd{
	position: absolute;
	top: 50%;
	left: 50%;
	padding: 69px 113px 0;
	-webkit-transform: translate(-50%,-50%);
	transform: translate(-50%,-50%);
	background:rgba(255,255,255,1);
	box-shadow:0px 1px 8px 0px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    overflow-y: auto;
    max-height: 80%;
}
.btnds{
	min-width: 240px;
	text-align: center;
}
.btnd{
	display: inline-block;
	cursor: pointer;
	width:82px;
	height:28px;
	border-radius:14px;
	text-align: center;
	line-height: 28px;
	font-size:14px;
	font-family:MicrosoftYaHei;
	font-weight:400;
	color:rgba(255,255,255,1);
}
.btnd:hover{
	opacity: .7;
}
.honse{
	margin: 15px 70px 50px 0;
	background:rgba(255,120,117,1);
}
.hyse{
	background:rgba(191,191,191,1);
}
.hesd{
	color: #FFA39E !important;
}
</style>