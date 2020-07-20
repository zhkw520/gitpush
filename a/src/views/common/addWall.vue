<template>
<div class="tcVbox" v-show="isShow">
	<div class="tcVboxBg" @click="hindAdd"></div>
		<div class="tcVBoxCent">
			<el-tabs v-model="activeName2" type="card" >
				<el-tab-pane label="壁纸推送" name="1"></el-tab-pane>			
			</el-tabs>
			<tables 
				:screenConfig="screenConfig" 
				:tableConfig="tableConfig" 
				:tableDatas="tableData"
				@screenFn="getData"
				ref="Tabledd"
			></tables>			
		<el-button class="qhstBtn" @click="qhTable()" type="primary" size="mini" round>切换视图</el-button>				
	</div>
</div>
</template>

<script>
import tables from './tables';
export default {
	components:{tables},
    data() {		
		return {
			screens:{
				p:10,
				page:1,				
			},
			ids:0,
			isShow:false,
			activeName2: '1',
			tableData:[],	
			tableConfig:{
				total:0,
				ischeck:true,
				list:[
					{prop:'id',lable:'素材Id'},
					{prop:'preview_url',lable:'预览图',type:'imgs'},
					{prop:'material_type',lable:'风格分类'},
					{prop:'space_num',lable:'广告位数量'},
					{prop:'size',lable:'素材尺寸'},
					{prop:'price',lable:'价格'},
					{prop:'material_status',lable:'状态'},
					{prop:'finish_at',lable:'入库时间',sor:true},
					{prop:'material_status',lable:'上线账号'},
					{prop:'attachment.url',lable:'附件下载',
						temps:[{cls:'bjysdicon iconfont',type:'text',value:'&#xe61a;',fnName:'downlod'}]							
					}
				],
				btns:[
					{fnName:'addsc',cls:'hsan',value:'确认'},
					{fnName:'hindAdd',cls:'pldc ',value:'取消',check:'1'},
				],
			},
			screenConfig:[],	
			sxLn:{
				picture:[
					{label:'全部',value:'m_picture,m_script_picture'},
					{label:'静态图片',value:'m_picture'},
					{label:'动态图片',value:'m_script_picture'},
				],
				resource:[
					{label:'全部',value:'m_resource,m_h5_resource'},
					{label:'模板',value:'m_resource'},
					{label:'H5模板',value:'m_h5_resource'},
				],
			},
			xzData:'',
			addAjaxType:0,
		}
    },
	mounted: function () {	

	}, 
	methods: {
		qhTable(){				
			this.$refs.Tabledd.qhTables();				
		},
		hindAdd(){
			this.isShow = false;
			
		},
		showAdd(id){
			this.ids = id;
			this.setScreenConfig();
			this.getData();
			this.isShow = true;
		},
		xzFn(ids){
			this.xzData = ids;
		},
		addsc(){
			if(this.addAjaxType===1){
				return
			}			
			if(!this.xzData){
				return
			}
			this.addAjaxType=1;
			let id='';
			this.xzData.map((el)=>{
				if(el){
					id+=  ','+el.id;
				}				
			})
			let params = {
				user:this.ids,
				material_id:id.substring(1),	
			};	

			this.api.material_wallpaperPutmat({params}).then(()=>{	
				this.addAjaxType =0;					
			}).catch(()=>{
				this.addAjaxType =0;
			})				
		},
		setLoding(type){
			this.$refs.Tabledd.setLoding(type);	
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
						{title:'素材尺寸',type:'select',value:'size',list:list2},
						{title:'入库时间',type:'times',value:'start_date'},	
						{title:'模糊搜索',type:'text',value:'search'},
						{title:'广告位数量',type:'text',value:'space_num',list:list2},
						{title:'状态',type:'select',value:'status',list:[
							{label:'全部',value:'all'},
							{label:'入库',value:'1001'},
							{label:'使用中',value:'1101'},
							{label:'使用过',value:'1201'}
						]},	
							
							
					];	
					
				}).catch(()=>{})		
		},
		getData(sxtj){	
			this.setLoding(true);
			if(sxtj){
				Object.assign(this.screens, sxtj);	
				if(sxtj.start_date){
					this.screens.end_date = sxtj.start_date[1];
					this.screens.start_date = sxtj.start_date[0];
				}else{
					this.screens.end_date?delete this.screens.end_date:'';
					this.screens.start_date?delete this.screens.start_date:'';
				}
			}	
			let params = this.screens;			
			params.user = this.ids;
		
			this.api.material_wallpaperPut({params}).then((data)=>{	
				this.tableData =this.clData(data);	
				this.setLoding(false);
			}).catch(()=>{
				this.setLoding(false);
			})	

		},
		clData(data){
			let arr  = [];
			this.tableConfig.total=data.total;
			let da = data.data;			
			for(let i=0,n=da.length;i<n;i++){
				arr.push(
					{
						id:da[i].id,
						preview_url:da[i].preview_url,
						material_type:this.checkNr(da[i].material_type),
						space_num:da[i].extend.space_num,
						description:da[i].description,
						size:da[i].size,
						price:da[i].price,
						material_status:this.checkStatus(da[i].material_status),
						finish_at:this.checkTime(da[i].finish_at),

					},
				);
			}
			return arr;

		},
		checkNr(value){		
			if(!value){return}
			let a = '';
			switch (value){
				case 'm_picture':a= '广告静态图';
					break;
				case 'm_script_picture':a= '广告脚本图';
					break;
				case 'm_resource':a= '广告脚本模板';
					break;
				case 'm_h5_resource':a= '广告H5模板';
					break;
				case 'm_wallpaper':a= '锁屏壁纸脚本图';
					break;
				}
			return a;
		},	
		checkTime(value){
			if(!value){return}
			return value.substring(0,10);
		},
		checkStatus(value){	
			if(!value){return}
			return value =='1001'?'未使用':value =='1101'?'使用中':value=='1201'?'使用过':'';				
		},
	},
	watch: {   
		$route: {
			handler: function () {
				this.setScreenConfig();
				this.getData();
			},
			deep: true
		}
	},
}	
</script>

<style>
.tcVbox{
	position: fixed;
	z-index: 9;
	top: 65px;
	left: 316px;
	bottom: 0;
	right: 0;
	z-index: 99;
}
.tcVboxBg{
	background: rgba(0,0,0,.3);
	width: 100%;
	height: 100%;	
}
.tcVBoxCent{
	position: absolute;
    top: 50px;
    left: 50px;
    right: 94px;
    bottom: 50px;
    background: #fff;
		overflow: hidden;
	overflow-y: auto;
}
</style>
