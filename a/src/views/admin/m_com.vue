<template>
	<div class="centNavBox">
		<el-tabs v-model="activeOns" type="card" @tab-click="handleClick">
			<el-tab-pane label="广告图库" name="1"></el-tab-pane>
			<el-tab-pane label="广告模板库" name="2"></el-tab-pane>
			<el-tab-pane label="锁屏壁纸库" name="3"></el-tab-pane>	
		</el-tabs>
		<tables 
			:screenConfig="screenConfig" 
			:tableConfig="tableConfig" 
			:tableDatas="tableData"
			:tjData="tjData"
			@screenFn="getData"
			ref="Tabledd"
		></tables>				
		<el-button class="qhstBtn" @click="qhTable()" type="primary" size="mini" round>切换视图</el-button>
	</div>	
</template>

<script>
import tables from '../common/tables.vue';
export default {
	props:['tableConfig','getType','screensd','activeOn','tjType','tjset'],
	components:{tables},
	data() {
			return {
				activeOns: "1",				
				tableData:[],
				screenConfig:[],
				screens:{
					p:10,
					page:1,	
					total:0,
					is_finished:1,					
				},
				tjData:[],
			};
		},
		mounted: function () {
			this.init();
			this.getData();
		}, 
		methods: {
			init(){
				this.activeOns = this.activeOn;
				this.getTj();
				this.setScreenConfig();				
			},
            // clickfn(name,cs){
            //     this[name](cs);
            // },
			need_export(){
				let form = document.createElement('form'),
				arr = [
					{n:'status',d:this.screens.status || ''},
					{n:'type[]',d:this.screens.type || ''},
					{n:'position',d:this.screens.position || ''},
					{n:'size',d:this.screens.size || ''},
					{n:'is_finished',d:this.screens.is_finished || ''},
					{n:'start_date',d:this.screens.start_date || ''},
					{n:'end_date',d:this.screens.end_date || ''},
					{n:'search',d:this.screens.search || ''}
				];			
				for(let i=0,n=arr.length;i<n;i++){
					let dom = document.createElement('input');
					dom.setAttribute('name',arr[i].n);
					dom.setAttribute('value',arr[i].d);	
					form.appendChild(dom);
				}
				form.setAttribute('style', 'display:none');
				form.setAttribute('target', '');
				form.setAttribute('method', 'get');	
				form.setAttribute('action', 'http://ts-i.idatachain.cn/api/material/export');		
				document.body.appendChild(form);
				form.submit();
			},
            need_work(){
						var arr = [
							{n:'status',d:this.screens.status || ''},
							{n:'type[]',d:this.screens.type || ''},
							{n:'position',d:this.screens.position || ''},
							{n:'size',d:this.screens.size || ''},
							{n:'is_finished',d:this.screens.is_finished || ''},
							{n:'start_date',d:this.screens.start_date || ''},
							{n:'end_date',d:this.screens.end_date || ''},
							{n:'search',d:this.screens.search || ''}
						];
					for(let i=0,n=arr.length;i<n;i++){
						let dom = document.createElement('input');
						dom.setAttribute('name',arr[i].n);
						dom.setAttribute('value',arr[i].d);
					}
				   var url = "http://ts-i.idatachain.cn/api/material/export?status="+(this.screens.status==undefined?"":this.screens.status)+'&position='+(this.screens.position==undefined?"":this.screens.position)+"&size="+(this.screens.size==undefined?"":this.screens.size)+"&type[]="+(this.screens.type==undefined?"":this.screens.type)+'&is_finished='+(this.screens.is_finished==undefined?"":this.screens.is_finished)+'&start_date='+(this.screens.start_date==undefined?"":this.screens.start_date)+"&end_date="+(this.screens.end_date==undefined?"":this.screens.end_date)+"&search="+(this.screens.search==undefined?"":this.screens.search);
                   var xmlResquest = new XMLHttpRequest();
                   xmlResquest.open("get",url,true);
                   xmlResquest.setRequestHeader("Accept","application/json, text/plain, */*");
                   xmlResquest.setRequestHeader("Content-type","application/json");
                   xmlResquest.setRequestHeader("Authorization",'Bearer '+localStorage.getItem('token'));
                   xmlResquest.responseType = "blob";
                   xmlResquest.onload = function (oEvent) {
                		var content = xmlResquest.response;
                		var eLink = document.createElement("a");
                		eLink.download = "test.xlsx";
                		eLink.style.display = 'none';
                		var blob = new Blob([content]);
                		eLink.href = URL.createObjectURL(blob);
                		document.body.appendChild(eLink);
                		eLink.click();
                		document.body.removeChild(eLink);
                   };
                   xmlResquest.send();
                },
			
			handleClick() {
				let urld = ['/admin/material_picture','/admin/material_resource','/admin/material_wallpaper']
				this.$router.push(urld[+this.activeOns-1]);
			},
			qhTable(){				
				this.$refs.Tabledd.qhTables();				
			},
			setLoding(type){
				this.$refs.Tabledd.setLoding(type);	
			},	

			getTj(){
				this.tjData = this.tjset;
				let params = {material_type:this.tjType};
				this.api.material_stat({params}).then( (response)=> {
					this.tjData[0].num = response.in_review;
					this.tjData[1].num = response.in_lib;
					this.tjData[2].num = response.online;
					this.tjData[3].num = response.offline;	
				}).catch(()=>{})				
			},
			getData(sxtj){
                // console.log(logs)
                console.log("dnsjadksa")
				this.setLoding(true);
				this.screens.type = this.getType;

				if(sxtj){
					Object.assign(this.screens, sxtj);					
					if(sxtj.type){						
						this.screens.type = [sxtj.type];						
					}else{
						this.screens.type = this.getType;
					}
					if(sxtj.start_date){
						this.screens.end_date = sxtj.start_date[1];
						this.screens.start_date = sxtj.start_date[0];
					}else{
						this.screens.end_date?delete this.screens.end_date:'';
					}
				}	
				let params = this.screens;
				params.is_finished=1;
				this.api.material_lists({params}).then( (response)=> {
					this.tableData = this.clData(response);
					this.setLoding(false);

				}).catch(()=>{
					this.setLoding(false);
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
                            space_num:da[i].extend.space_num,
							preview_url:da[i].preview_url=='null'?'/img/log.jpg':da[i].preview_url ,
							material_type:this.checkNr(da[i].material_type),
							position:da[i].position,
							description:da[i].need.extend.description,
							size:da[i].size,
							link:da[i].need.extend.link,
							material_status:this.checkStatus(da[i].material_status),
							finish_at:this.checkTime(da[i].finish_at),
							dowurl:da[i].attachment.url,
							ad_type:da[i].extend.ad_type || "",
							channel_type:da[i].extend.channel_type || "",
							price:da[i].price || "",
                            picture_style:da[i].extend.picture_style
                            // logs:this.sss(da[i].logs)


						},
					);
				}			
				return arr;
			},

			setScreenConfig(){
				this.api.sysconfig_material().then((data)=>{	
					let p = data.platform_position,
					sz = data.material_size,
					list1 = [{label:'全部',value:''}],
					list2 = [{label:'全部',value:''}];
					for(let i=0,n=p.length;i<n;i++){
						list1.push({label:p[i],value:p[i]})
					}
					for(let i=0,n=sz.length;i<n;i++){
						list2.push({label:sz[i],value:sz[i]})
					}				
					this.screenConfig = [
						{title:'素材类型',type:'select',value:'type',list:this.screensd},
						{title:'投放位置',type:'select',value:'position',list:list1},
						{title:'素材尺寸',type:'select',value:'size',list:list2},
						{title:'素材状态',type:'select',value:'status',list:[
							{label:'全部',value:''},
							{label:'入库',value:'1001'},
							{label:'使用中',value:'1101'},
							{label:'使用过',value:'1201'},
						]},
						{title:'入库时间',type:'times',value:'start_date'},		
						{title:'模糊搜索',type:'text',value:'search'},		
					];						
				}).catch(()=>{})				
			},
			downlod(on){
				window.open(this.tableData[on].dowurl);
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
					default:
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
				return value =='1001'?'入库':value =='1101'?'使用中':value=='1201'?'使用过':'';	
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
	top: 19px;
	right: 40px;
	background:rgba(255,216,191,1) !important;
	border-color: rgba(0, 0, 0, 0.06) !important;
	color:rgba(255,255,255,1);
}
.centNavBox .el-tabs--card>.el-tabs__header .el-tabs__nav{
	border: none !important;
	padding-bottom:2px;
}
.el-tabs--card>.el-tabs__header{
	border: none;
	box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.06);
}
.el-tabs--card>.el-tabs__header .el-tabs__item{
	border: none;
	box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.06);
}
</style>
