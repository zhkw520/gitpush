<template>
	<div class="tcVbox" v-show="isShow">
		<div class="tcVboxBg" @click="hindAdd"></div>
		<div class="qxBoxd tcVBoxCent">
			<div class="qxB1">
				<span class="qxB1_1">设置权限</span>
				<span class="qxB1_2">当前角色：{{roledata.role_name}}</span>
			</div>
			<div class="qxB2" v-for="(el,index) in datas" :key="el.name">
				<div class="qxB2_1"><el-checkbox  v-model="el.checkAll" @change="handleCheckAllChange(el.checkAll,index)">{{el.name}}</el-checkbox></div>
				<div class="qxB2_2">
					<el-checkbox-group v-model="qxlist"  @change="handleCheckedCitiesChange">
						<div v-for="el2 in el.list" :key="el2.id">
							<el-checkbox  :label="el2.id">{{el2.name}}</el-checkbox>
						</div>
						<div v-for="(el3,index3) in new Array((4-el.list.length%4)==4?0:(4-el.list.length%4))" :key="index3"></div>
					</el-checkbox-group>
				</div>
			</div>
			<div class="btnds">
				<div @click="addqxd" class="btnd honse ">提交</div>
				<div @click="hindAdd" class="btnd hyse">返回</div>
			</div>			
		</div>
	</div>
</template>

<script>
export default {
    data() {
		return {
			roledata:{},
			isShow:false,
			datas:[
			],
			addType:0,
			udf:{},
			qxlist:[],
        checkAll: {},
      };
    },
	mounted: function () {	
		this.getData();
	}, 
	
    methods: {
		hindAdd(){
			this.isShow=false;
		},
		showAdd(data){
			this.qxlist=[];
			this.roledata = data;
			let p = data.permissions;
			for(let i=0,n=p.length;i<n;i++){			
				this.qxlist.push(p[i].id);				
			}
			this.isShow=true;
		},
		addqxd(){
			if(this.addType==1){
				return
			}
			this.addType=1;
			let params = {role_id:this.roledata.id,permission_id:this.qxlist};	
			this.api.edit_role_permission(params).then(()=>{
				this.addType=0;
			}).catch(()=>{
				this.addType=0;
			});
		},
		getData(){
			this.api.get_permissions().then((data)=>{
				for(let i=0,n=data.length;i<n;i++){
					data[i].checkV = [];
				}
				this.datas = data;
				
			})
		},
		
		handleCheckAllChange(val,on) {
			let arr = [];
		
			for(let i=0,n=this.datas[on].list.length;i<n;i++){
				if(val){
					arr.push(this.datas[on].list[i].id);
				}else{
					delete this.qxlist[this.qxlist.indexOf(this.datas[on].list[i].id)];
				}
				
			}	
			this.qxlist =  [...new Set(arr.concat(this.qxlist))];

			this.datas[on].checkAll= val;
        
		},
		handleCheckedCitiesChange(value) {
			console.log(value)
		}
    }
};
</script>

<style>
.qxBoxd{
	overflow-y: auto;	
}
.qxB1{
	height: 60px;
	font-size:14px;
font-family:PingFang-SC-Regular;
font-weight:400;
color:rgba(0,0,0,1);
line-height: 60px;
	box-shadow:0px 1px 3px 0px rgba(0, 0, 0, 0.06);
}
.qxB1_1{
	margin-left: 24px;
}
.qxB1_2{
	float: right;
	margin-right: 24px;
}
.qxB2{
	margin: 15px 24px 35px;
	overflow-x: auto;

}
.qxB2_1{
	min-width: 1000px;
height:32px;
line-height: 32px;
background:rgba(250,247,246,1);
border:1px solid rgba(191,191,191,1);
}
.qxB2_2{
	min-width: 1000px;
	
}
.qxB2_2>div>div{
	display: inline-block;
vertical-align: middle;
	box-sizing: border-box;
	width: 25%;
	height:32px;
	line-height: 32px;
border:1px solid rgba(191,191,191,1);
border-top: none;
border-right: 0;
}
.qxB2_2>div>div:nth-child(4n+4){
	border-right:1px solid rgba(191,191,191,1) !important;
}

.qxBoxd label{
	margin-left: 13px;
}
.btnds{
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
</style>
