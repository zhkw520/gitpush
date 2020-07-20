<template>
	<div class="centNavBox">
		<el-tabs v-model="activeName2" type="card"  @tab-click="jupm">
			<el-tab-pane :label="namedd" name="1"></el-tab-pane>
		</el-tabs>
		<tables 
		:screenConfig="screenConfig" 
		:tableConfig="tableConfig" 
		:tableDatas="tableData"
		@screenFn="getData"
		ref="Tabledd"
		></tables>			
		<el-button class="qhstBtn" @click="qhTable()" type="primary" size="mini" round>切换视图</el-button>
		<addsc ref="AddX"></addsc>
		
	</div>	
</template>
<script>
import tables from '../common/tables';
import addsc from '../common/addsc';
export default {
	components:{tables,addsc},
    data() {		
		return {
			namedd:'广告图库投放管理-管理广告图',
			activeName2: '1',
			tableData:[],
			screens:{
				p:10,
				page:1,	
			},
			tableConfig:{
				total:0,
				ischeck:true,
				list:[],
				btns:[
					{fnName:'showAddB',cls:'hsan',value:'新增素材'},
					{fnName:'xzFn',cls:'pldc ',value:'批量导出',check:'1'},
				],
			},
			tabledd: [
				[{prop:'lib_id',lable:'广告图库Id'},
					{prop:'id',lable:'素材Id'},
					{prop:'preview_url',lable:'预览图',type:'imgs'},
					{prop:'material_type',lable:'素材类型'},
					{prop:'position',lable:'广告位类型'},
					{prop:'size',lable:'素材尺寸'},
					{prop:'description',lable:'投放内容描述'},
					{prop:'link',lable:'投放链接'},				
					{prop:'material_status',lable:'状态'},
					{prop:'finish_at',lable:'入库时间'},					
					{prop:'attachment.url',lable:'附件下载',
						temps:[{cls:'bjysdicon iconfont',type:'text',value:'&#xe61a;',fnName:'downlod'}]							
					},
					{prop:'attachment.url',lable:'操作',
						temps:[{type:'primary',size:'mini',value:'下线',fnName:'opentip',round:'round'},]
					},],
				[{prop:'lib_id',lable:'模板库ID'},
					{prop:'id',lable:'素材Id'},
					{prop:'preview_url',lable:'预览图',type:'imgs'},
					{prop:'material_type',lable:'素材类型'},
					{prop:'position',lable:'广告位类型'},
					{prop:'size',lable:'素材尺寸'},
					{prop:'ad_type',lable:'广告类型'},
					{prop:'channel_type',lable:'渠道类型'},				
					{prop:'finish_at',lable:'入库时间'},					
					{prop:'attachment.url',lable:'附件下载',
						temps:[{cls:'bjysdicon iconfont',type:'text',value:'&#xe61a;',fnName:'downlod'}]							
					},
					{prop:'attachment.url',lable:'操作',
						temps:[{type:'primary',size:'mini',value:'下线',fnName:'opentip',round:'round'},]
					},],
			],
			screenConfig:[],	
			sxLn:{
				picture:[
					{label:'全部',value:'m_picture,m_script_picture'},
					{label:'广告静态图',value:'m_picture'},
					{label:'广告脚本图',value:'m_script_picture'},
				],
				resource:[
					{label:'全部',value:'m_resource,m_h5_resource'},
					{label:'广告脚本模板',value:'m_resource'},
					{label:'广告H5模板',value:'m_h5_resource'},
				],
			}			  

		}
    },
	mounted: function () {	
		this.setScreenConfig();
		this.getData();
	}, 
	methods: {
		showAddB(){
			this.$refs.AddX.showAdd();	
		},
		jupm(){
		    console.log('dsadsadsda');
		    this.$router.push({
                path: '/admin/library_picture'
            })
		},
		qhTable(){				
			this.$refs.Tabledd.qhTables();				
		},
		enloding(){
			this.$refs.Tabledd.lodingfalse();		
		},		
		setScreenConfig(){
			
			this.$refs.Tabledd.initpage();	
			if(this.$route.fullPath.split('?')[0]=='/admin/library_pictures'){
					
				this.tableConfig.list =  this.tabledd[0];
				this.namedd = '广告图库投放管理-管理广告图';
				this.tableConfig.btns=[
					{fnName:'showAddB',cls:'hsan',value:'新增广告图'},
					{fnName:'xzFn',cls:'pldc ',value:'批量导出',check:'1'},
				];
			}
			if(this.$route.fullPath.split('?')[0]=='/admin/library_resources'){
				this.namedd = '广告模板库投放管理-管理模板';
				this.tableConfig.list =  this.tabledd[1];
				this.tableConfig.btns=[
					{fnName:'showAddB',cls:'hsan',value:'新增模板'},
					{fnName:'xzFn',cls:'pldc ',value:'批量导出',check:'1'},
				];
			}
			this.screenConfig = [
				{title:'入库时间',type:'times',value:'start_date'},		
				{title:'模糊搜索',type:'text',value:'search'},	
			];
		},
        opentip(on){
            console.log(this.tableData[on].id)
            if(this.statusType==1){return}
            this.$confirm('是否确认通过', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this. detach(on);
            }).catch(() => {
            });
        },
		detach(on){
			let params = {
				lib_id:+this.$route.query.lib_id,
				material_id:+this.tableData[on].id,	
			};						
			this.api.materialLib_detach(params);
		},
		getData(sxtj){

			if(sxtj){				
				Object.assign(this.screens, sxtj);
				if(sxtj.start_date){
					this.screens.end_date = sxtj.start_date[1];
					this.screens.start_date = sxtj.start_date[0];
				}else{
					this.screens.end_date?delete this.screens.end_date:'';
				}
			}	
			let params = this.screens;
			if(!this.$route.query.lib_id){
				this.enloding();
				this.tableData = [];
				return
			}
			params.lib_id = this.$route.query.lib_id;
			this.api.materialLib_materials({params}).then((data)=>{	
				this.tableData =this.clData(data);	
				this.enloding();
			}).catch(()=>{
				this.enloding();
			})	

		},
		downlod(on){
			window.open(this.tableData[on].dowurl);
		},
		clData(data){
			
			let arr  = [];
			this.tableConfig.total=data.total;
			let da = data.data;			
			for(let i=0,n=da.length;i<n;i++){
				arr.push(
					{
						lib_id:da[i].pivot.lib_id,
						id:da[i].id,
						preview_url:da[i].preview_url,
						material_type:this.checkNr(da[i].material_type),						
						position:da[i].position,
						price:da[i].price,
						size:da[i].size,
						finish_at:this.checkTime(da[i].finish_at),
						material_status:this.checkStatus(da[i].material_status),
						attachment_id:da[i].attachment_id,
						dowurl:da[i].attachment.url,
						link:da[i].extend.link || '',
						description:da[i].description,
						created_at:da[i].created_at,
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

</style>