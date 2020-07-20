<template>
	<div class="centNavBox">

		<tables 
			:screenConfig="screenConfig" 
			:tableConfig="tableConfig" 
			:tableDatas="tableData"
			:tjData="tjData"
			@screenFn="getData"
			ref="Tabledd"
		></tables>				
		<el-button class="qhstBtn newdqgh" @click="qhTable()" type="primary" size="mini" round>切换视图</el-button>
	</div>	
</template>

<script>
import tables from '../common/tables.vue';
	export default {
		components:{tables},
		data() {
			return {
				activeName2: '1',
				screenConfig:[],
				tableConfig:{
					total:0,
					ischeck:false,
					list:[
						{prop:'id',lable:'素材Id'},
						{prop:'preview_url',lable:'预览图',type:'imgs'},
						{prop:'material_type',lable:'风格分类'},
						{prop:'position',lable:'广告位类型'},
						{prop:'size',lable:'素材尺寸'},
						{prop:'put_status',lable:'状态',fnName:'sxxFn',select:{value:'',mode:[],list:[{'label':'通过',value:'1103'},{'label':'不通过',value:'1002'}]}},
						{prop:'created_at',lable:'上线时间',sor:true},
						{prop:'attachment.url',lable:'附件下载',
							temps:[{cls:'bjysdicon iconfont',type:'text',value:'&#xe61a;',fnName:'downlod'}]							
						},
					],					
				},
				tableData:[],
				screens:{
					p:10,
					page:1,	
					
					
				},
				sxtjList:'',

				tjData:[],		
				baconfig:[],
			};
		},
		mounted: function () {	
			this.setScreenConfig();	
			
			this.getData();
		}, 
		methods: {
			
			qhTable(){				
				this.$refs.Tabledd.qhTables();				
			},
			enloding(){				
				this.$refs.Tabledd.lodingfalse();				
			},
			sxxFn(on){	
				console.log(on)
				if(this.setStatusType==1){
					return
				}
				this.setStatusType=1;							
				let params = {material_id:this.tableData[on].id,status:this.tableConfig.list[5].select.mode[on]};		
				this.api.wallpaper_check({params}).then(()=>{					
					this.setStatusType = 0;			
				}).catch(()=>{
					this.setStatusType = 0;
					location.reload();
				})			
			},
		
			getData(sxtj){
				if(sxtj){
					this.screens = sxtj;
					if(sxtj.type){
						this.screens.type = [sxtj.type];
					}
					for(let el in sxtj){
						
						if(sxtj[el]=='all'){
							delete  this.screens[el];
						}
					}
				
					
				}
				let params = this.screens;	
				this.tjData='';
																		
				this.api.wallpaper_put({params}).then( (response)=> {
					this.tableData = this.clData(response);
					this.enloding();
				}).catch(()=>{
					this.enloding();
				})
				
			},	
			clData(data){
				let arr  = [];
				let da = data.data;		
				this.tableConfig.total=data.total;
				for(let i=0,n=da.length;i<n;i++){
					arr.push(
						{
							id:da[i].id,
							preview_url:da[i].preview_url,
							material_type:'锁屏壁纸',
							position:da[i].position,
							size:da[i].size,		
							put_status:this.checkStatus(da[i].put_status),
							created_at:this.checkTime(da[i].created_at),
							dowurl:da[i].attachment.url
						},
					);
				}		
				return arr;
			},
			setScreenConfig(){
				this.api.sysconfig_material().then((data)=>{	
					this.sxtjList = data;
					let p = data.platform_position,
					sz = data.material_size;
					let list1 = [{label:'全部',value:'all'},];
					for(let i=0,n=p.length;i<n;i++){
						list1.push({label:p[i],value:p[i]})
					}
					let list2 = [{label:'全部',value:'all'},];
					for(let i=0,n=sz.length;i<n;i++){
						list2.push({label:sz[i],value:sz[i]})
					}				
					this.screenConfig = [
					
						{title:'投放位置',type:'select',value:'position',list:list1},
						{title:'素材尺寸',type:'select',value:'size',list:list2},
						{title:'需求状态',type:'select',value:'status',list:[
							{label:'全部',value:'all'},
							{label:'待审核',value:'1102'},
							{label:'已通过',value:'1103'},
							{label:'不通过',value:'1002'}
						]},	
						{title:'入库时间',type:'times',value:'start_date'},		
						{title:'模糊搜索',type:'text',value:'search'},	
					];	
					
				}).catch(()=>{})				
			},
			downlod(on){
				window.open(this.tableData[on].dowurl);
			},
			xzFn(){
	
			},			
			checkTime(value){
				if(!value){return}
				return value.substring(0,10);
			},
			checkStatus(value){	
				if(!value){return}
				return value =='1102'?'待审':value =='1103'?'已通过':value=='1002'?'不通过':'';				
			},
		}
	};
</script>

<style>
.centNavBox{
	position: relative;
}
.centNavBox .el-tabs__header{
	background:rgba(255,255,255,1);
	box-shadow:0px 1px 3px 0px rgba(0, 0, 0, 0.06);
	margin-bottom: 0 !important;

}
.centNavBox .el-tabs__item{
	background:rgba(250,247,246,1);
	height: 60px;
	font-size:14px;
	line-height:60px ;
	padding: 0 33px;
	color:rgba(0,0,0,.65) !important;
}
.centNavBox .is-active{
	background:rgba(255,255,255,1);
	color:rgba(0,0,0,1) !important;
}
.qhstBtn{
	position: absolute;
top: 10px;
    right: 44px;
	background:rgba(255,216,191,1) !important;
	border-color: rgba(255,216,191,1) !important;
	color:rgba(255,255,255,1);
}
.centNavBox .el-tabs--card>.el-tabs__header .el-tabs__nav{
	border-bottom: 1px solid #e4e7ed;
}
.newdqgh{
	top: 8px !important;
    right: 43px !important;
}
</style>
