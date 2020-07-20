<template>
<div class="tcVbox" v-show="isShow">
	<div class="tcVboxBg" @click="hindAdd"></div>
		<div class="tcVBoxCent">
			<el-tabs v-model="activeName2" type="card" >
				<el-tab-pane :label="ndana" name="1"></el-tab-pane>			
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
			ndana:'添加素材',
			isShow:false,
			activeName2: '1',
			tableData:[],	
			tableConfig:{
				total:0,
				ischeck:true,
				list:[],
				btns:[
					{fnName:'addsc',cls:'hsan',value:'确认'},
					{fnName:'hindAdd',cls:'pldc ',value:'取消',check:'1'},
				],
			},
			tabledd: [
				[{prop:'id',lable:'素材Id'},
					{prop:'preview_url',lable:'预览图',type:'imgs'},
					{prop:'material_type',lable:'素材类型'},
					{prop:'position',lable:'广告位类型'},
					{prop:'size',lable:'素材尺寸'},
					{prop:'description',lable:'投放内容描述'},
					{prop:'link',lable:'投放链接'},
					{prop:'material_status',lable:'状态'},
					{prop:'finish_at',lable:'入库时间',sor:true},										
					{prop:'attachment.url',lable:'附件下载',
						temps:[{cls:'bjysdicon iconfont',type:'text',value:'&#xe61a;',fnName:'downlod'}]							
					},],
					[{prop:'id',lable:'素材Id'},
						{prop:'preview_url',lable:'预览图',type:'imgs'},
						{prop:'material_type',lable:'素材类型'},
						{prop:'position',lable:'广告位类型'},
						{prop:'size',lable:'素材尺寸'},
						{prop:'ad_type',lable:'广告类型'},
						{prop:'channel_type',lable:'渠道类型'},
						{prop:'material_status',lable:'状态'},
						{prop:'finish_at',lable:'入库时间',sor:true},										
						{prop:'attachment.url',lable:'附件下载',
							temps:[{cls:'bjysdicon iconfont',type:'text',value:'&#xe61a;',fnName:'downlod'}]							
						},],
			],
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
		this.setScreenConfig();
		this.getData();
	}, 
	methods: {
		qhTable(){				
			this.$refs.Tabledd.qhTables();				
		},
		hindAdd(){
			this.isShow = false;
		},
		showAdd(){
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
				if(id){
					id+=  ','+el.id;
				}else{
					id = el.id;
				}				
			})
		
			let params = {
				lib_id:this.$route.query.lib_id,
				material_id:id,	
			};	

			this.api.materialLib_attach(params).then(()=>{	
				this.addAjaxType =0;					
			}).catch(()=>{
				this.addAjaxType =0;
			})				
		},
		setLoding(type){
			this.$refs.Tabledd.setLoding(type);	
		},	
		downlod(on){
			window.open(this.tableData[on].dowurl);
		},
		setScreenConfig(){
			
			if(this.$route.fullPath.split('?')[0]=='/admin/library_pictures'){
				this.ndana = '添加广告图';
				this.tableConfig.list =  this.tabledd[0];
			}
			if(this.$route.fullPath.split('?')[0]=='/admin/library_resources'){
				this.ndana = '添加模版';
				this.tableConfig.list =  this.tabledd[1];
				
			}

			this.screenConfig = [
				{title:'入库时间',type:'times',value:'start_date'},		
				{title:'模糊搜索',type:'text',value:'search'},	
			];
		},
		getData(sxtj){	
			this.setLoding(true);
			let params = {
				p:10,
				page:1,	
			};						
			if(sxtj){
				params = sxtj;
			}
			if(!this.$route.query.lib_id){
				this.setLoding(false);
				return
			}
			params.lib_id = this.$route.query.lib_id;
			
			this.api.materialLib_materialList({params}).then((data)=>{	

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
						position:da[i].position,
						price:da[i].price,
						size:da[i].size,
						finish_at:da[i].finish_at,
						material_status:this.checkStatus(da[i].material_status),
						attachment_id:da[i].attachment_id,
						dowurl:da[i].attachment.url,
						link:da[i].extend.link || '',
						description:da[i].description,
						channel_type:da[i].extend.channel_type || '',
						ad_type:da[i].extend.ad_type || '',
						
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
			if(value==null || !value){return '--'}
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
