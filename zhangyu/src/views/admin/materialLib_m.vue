<template>
	<div>
		<tables 
		:screenConfig="screenConfig" 
		:tableConfig="tableConfig" 
		:tableDatas="tableData"
		@screenFn="getData"
		ref="Tabledd"
		></tables>
		
	</div>	
</template>
<script>
import tables from '../common/tables';
export default {
	components:{tables},
    data() {
		return {
			tableData:[],	
			tableConfig:{
				total:0,
				ischeck:false,
				list:[
					{prop:'id',lable:'库Id'},
					{prop:'material_type',lable:'库类型'},
					{prop:'position',lable:'广告位类型'},
					{prop:'desc',lable:'投放内容描述'},
					{prop:'size',lable:'素材尺寸'},
					{prop:'materials_valid_count',lable:'广告图数量'},
					{prop:'link',lable:'投放链接'},
					{prop:'status',lable:'状态'},
					{prop:'attachment.url',lable:'操作',
						temps:[{type:'primary',size:'mini',value:'管理广告图',fnName:'openmate',round:'round'},]							
					},
					
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
			}			  

		}
    },
	mounted: function () {	
		console.log(this.$route);
		this.setScreenConfig();
		this.getData();
	}, 
	methods: {

		enloding(){
			this.$refs.Tabledd.lodingfalse();		
		},
		
		setScreenConfig(){
			this.api.sysconfig_material().then((datas)=>{	
		
				this.sxtjList = datas;					
				let p = datas.platform_position,
				sz = datas.material_size;
				let list1 = [{label:'全部',value:'all'},];
				for(let i=0,n=p.length;i<n;i++){
					list1.push({label:p[i],value:p[i]})
				}
				let list2 = [{label:'全部',value:'all'},];
				for(let i=0,n=sz.length;i<n;i++){
					list2.push({label:sz[i],value:sz[i]})
				}
				
				this.screenConfig = [
					{title:'素材类型',type:'select',value:'types',list:this.sxLn[this.$route.query.type]},
					{title:'投放位置',type:'select',value:'position',list:list1},
					{title:'素材尺寸',type:'select',value:'size',list:list2},
					{title:'需求状态',type:'select',value:'status',list:[
						{label:'全部',value:'all'},

					]},
					{title:'模糊搜索',type:'text',value:'search'},	
					
				];
			})	
		},
		openmate(cs){		

			this.$router.push({
			   name:this.$route.fullPath.split('/')[2]+'s',
			   params:{
				lib_id:this.tableData[cs].id
			 }
			});
			// this.$router.push({path:,query:{type:0,lib_id:}});	
		},
		getData(sxtj){
			let params = {
				p:10,
				page:1,		
			};		
			console.log(this.$route.fullPath);
			if(this.$route.fullPath=='/admin/library_picture'){
				params.types = 'm_picture,m_script_picture';
			}
			if(this.$route.fullPath=='/admin/library_resource'){
				params.types = 'm_resource,m_h5_resource';
			}
			if(sxtj){
				params = sxtj;
			}
			this.api.materialLib_lists({params}).then((data)=>{	
				this.tableData =this.clData(data);	
				this.enloding();
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
						material_type:this.checkNr(da[i].material_type),						
						position:da[i].position,
						desc:da[i].desc,
						size:da[i].size,
						materials_valid_count:da[i].materials_valid_count,
						link:da[i].link,
						status:da[i].status
					},					
				);
			};
			return arr;

		},
		checkNr(value){		
			if(!value){return}
			let a = '';
			switch (value){
				case 'm_picture':a= '静态图片';
					break;
				case 'm_script_picture':a= '动态图片';
					break;
				case 'm_resource':a= '脚本模板';
					break;
				case 'm_h5_resource':a= 'H5模板';
					break;
				case 'm_wallpaper':a= '锁屏壁纸';
					break;
				}
			return a;
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