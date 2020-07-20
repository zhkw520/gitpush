<template>
	<div>
		<tables :tableConfig="tableConfig" :tableDatas="tableData" @screenFn="getData" ref="Tabledd"></tables>
		<el-dialog :visible.sync="dialogFormVisible" :before-close="closeFor">
			<el-form :model="form" :rules="rules" ref="ruleForm">		
				<div class="innerInput filePs">
					<el-form-item label="附件"><el-input v-model="fileName" clearable autocomplete="off"></el-input></el-form-item> 
					<el-upload ref="upload" class="upload-demo" :action="uploadUrl" :limit="1" :name="'file'" :data="uerAd" :on-success="onsuc">
						<el-button size="small" type="primary">点击上传</el-button>					 
					</el-upload>
					<div v-if="tabsd.flow_detail && tabsd.flow_detail.fields && tabsd.flow_detail.type == 'field_edit'">
						<div v-for="el in tabsd.flow_detail.fields" :key="el.type">
							<el-form-item v-if="el.type=='text' || el.type=='number'" :label="el.field">
								<el-input  v-model="form[el.name]" autocomplete="off"></el-input>													   
							</el-form-item>	
							<el-form-item v-if="el.type =='select'" :label="el.field">
								<el-select v-model="form[el.name]" placeholder="请选择">
									<el-option v-for="item in el.options" :key="item.value" :label="item.label" :value="item.value"></el-option>						
								</el-select>
							</el-form-item>								
							<el-form-item v-if="el.type=='checkbox'" :label="el.field">
								<el-checkbox-group  v-model="form[el.name]">
									<el-checkbox v-for="el2 in el.options" :key="el2.value" :label="el2.label" :value="el2.value"></el-checkbox>							
								</el-checkbox-group>								
							</el-form-item>								
							<el-form-item v-if="el.type=='date'" :label="el.field">
								<el-date-picker v-model="form[el.name]" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
								</el-date-picker>
							</el-form-item>	
						</div>
					</div>
				</div>				
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="closeFor">取 消</el-button>
				<el-button type="primary" @click="pushFor('ruleForm')">确 定</el-button>
			</div>
		</el-dialog>
	</div>	
</template>
<script>
import tables from '../common/tables';
export default {
	components:{tables},
    data() {
		return {
			uploadUrl:'http://ts-i.idatachain.cn/api/upload/attachment',
			tableData:[],	
			tabsd:{},
			tableConfig:{
				total:0,
				ischeck:false,
				list:[],				
			},	
			tabledd:[
				[{prop:'material_id',lable:'素材Id'},
				{prop:'preview_url',lable:'预览图',type:'imgs'},
				{prop:'material_type',lable:'素材类型'},
				{prop:'position',lable:'广告位类型'},
				{prop:'description',lable:'投放内容描述'},
				{prop:'size',lable:'素材尺寸'},
				{prop:'link',lable:'投放链接'},
				{prop:'material_status',lable:'状态'},
				{prop:'created_at',lable:'创建时间'},
				{prop:'attachment.url',lable:'附件下载',
					temps:[{cls:'bjysdicon iconfont',type:'text',value:'&#xe61a;',fnName:'downlod'}]							
				},
				{prop:'attachment.url',lable:'审核',widht:210,
					temps:[
						{type:'primary',size:'mini',cls:'xqshticon',value:'通过',fnName:'opentg',round:'round'},
						{type:'primary',size:'mini',cls:'xqshjicon',value:'拒绝',fnName:'openjj',round:'round'},
						// {type:'primary',size:'mini',value:'转审',fnName:'open4',round:'round'},
					]							
				}],		  	
				[{prop:'material_id',lable:'素材Id'},
				{prop:'preview_url',lable:'预览图',type:'imgs'},
				{prop:'material_type',lable:'素材类型'},
				{prop:'position',lable:'广告位类型'},
						
				{prop:'size',lable:'素材尺寸'},
				
				{prop:'material_status',lable:'状态'},
				{prop:'created_at',lable:'创建时间'},
				{prop:'attachment.url',lable:'附件下载',
					temps:[{cls:'bjysdicon iconfont',type:'text',value:'&#xe61a;',fnName:'downlod'}]							
				},
				{prop:'attachment.url',lable:'审核',widht:210,
					temps:[
						{type:'primary',size:'mini',cls:'xqshticon',value:'通过',fnName:'opentg',round:'round'},
						{type:'primary',size:'mini',cls:'xqshjicon',value:'拒绝',fnName:'openjj',round:'round'},
						// {type:'primary',size:'mini',value:'转审',fnName:'open4',round:'round'},
					]							
				}],		  	
				[{prop:'material_id',lable:'素材Id'},
				{prop:'preview_url',lable:'预览图',type:'imgs'},
				{prop:'material_type',lable:'素材类型'},
				{prop:'position',lable:'广告位类型'},
						
				{prop:'size',lable:'素材尺寸'},
						
				{prop:'material_status',lable:'状态'},
				{prop:'created_at',lable:'创建时间'},
				{prop:'attachment.url',lable:'附件下载',
					temps:[{cls:'bjysdicon iconfont',type:'text',value:'&#xe61a;',fnName:'downlod'}]							
				},
				{prop:'attachment.url',lable:'审核',widht:210,
					temps:[
						{type:'primary',size:'mini',cls:'xqshticon',value:'通过',fnName:'opentg',round:'round'},
						{type:'primary',size:'mini',cls:'xqshjicon',value:'拒绝',fnName:'openjj',round:'round'},
						// {type:'primary',size:'mini',value:'转审',fnName:'open4',round:'round'},
					]							
				}]		  	
			],
			statusType:0,
			dialogFormVisible: false,
			form:{},
			fileList:[],
			uerAd:{user:''},
			fileName:'',
			rules: {
			name: [
				{ required: true, message: '请输入价格', trigger: 'blur' },				
			],
			filed: [
				{ required: true, message: '请上传附件', trigger: 'blur'}
			],			
			}
		}
    },
	mounted: function () {	
		this.setConfig();
		this.getData();
	}, 
	methods: {
		checkUrl(){
			if(window.location.host=='c.zookingsoft.com'){			
				this.uploadUrl ='http://c.zookingsoft.com/api/upload/attachment';
			}			
		},
		open4(){
			
		},
		setConfig(){
			this.uerAd.user = localStorage.getItem('userAd');
			if(this.$route.fullPath=='/user/user_picture'){					
				this.tableConfig.list =  this.tabledd[0];		
			}
			if(this.$route.fullPath=='/user/user_resource'){					
				this.tableConfig.list =  this.tabledd[1];		
			}
			if(this.$route.fullPath=='/user/user_wallpaper'){			
				this.tableConfig.list =  this.tabledd[2];
			}
		},
		downlod(on){
			if(this.tableData[on].attachmentUrl){
				window.open(this.tableData[on].attachmentUrl);
			}			
		},
		closeFor(){
			this.$refs.upload.abort(this.fileList[0]);
			this.$refs.upload.clearFiles();			
			this.fileName = '';
			this.form = {};
			this.dialogFormVisible = false;
		},
		pushFor(){			
			let datas = {
				id:this.tabsd.flow_id,
				type:this.tabsd.type,
				input:{},
			};
			for(let el in this.form){				
				if(this.form[el]){
					if(el == 'file'){
						datas.attachment_id = this.form.file;
					}else{	
						datas.input[el] = this.form[el];
					}					
				}
			}
			datas.input.attachment_id = datas.attachment_id;
			this.api.handle_pass(datas).then(()=>{	
				this.closeFor();
			});		
		},
		enloding(){
			this.$refs.Tabledd.lodingfalse();		
		},
		onsuc(response){
			if(response.code==0){
				this.form.file = response.data.id;
				this.fileName = response.data.name;
				return
			}		
			this.$message.error(response.message); 
		},
		opentg(on){
		
			if(this.tableData[on].type=='work'){
				this.openTgWork(this.tableData[on].work_id,this.tableData[on].type);
				return
			}
			if(this.tableData[on].type=='flow'){
				this.openTgFlow(on);
			}
			if(this.tableData[on].type=='put'){
				this.openTgWork(this.tableData[on].put_id,this.tableData[on].type);
			
			}

		},
		openTgWork(on,on2){
			
			this.$confirm('是否确认通过', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.handle_pass(on,on2);
			}).catch(() => {});			
		},
		openTgFlow(on){
			if(this.tableData[on].flow_detail.type=='test'){
				this.$confirm('是否确认通过', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {					
					this.handle_pass(this.tableData[on].flow_id,this.tableData[on].type);
				}).catch(() => {});	
			}else{
				this.tabsd = this.tableData[on];
				this.dialogFormVisible = true;
			}
			
		},
		openjj(on) {
			if(this.tableData[on].flow_detail && this.tableData[on].flow_detail.type!='test'){
				this.$message('已进入工作流不可拒绝');
				return
			}
			this.$prompt('请输入拒绝理由', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',				 
			}).then(({ value }) => {				
				let id= this.tableData[on].flow_id,
				type = this.tableData[on].type,
				msg = value;
				if(type=='work'){
					id = this.tableData[on].work_id
				}		
				this.handle_reject(id,type,msg);
			}).catch(() => {});		 
		},	
		handle_pass(id,type){
		
			let datas = {
				id:id,
				type:type
			};
			this.api.handle_pass(datas);			
		},
		handle_reject(id,type,msg){
			let datas = {
				id:id,
				type:type,
				msg : msg,
			};
			this.api.handle_reject(datas)			
		},
		opentip1(on,type){
			if(this.statusType==1){
				return
			}
			this.$confirm('是否确认通过', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.setStatus(on,type);
			}).catch(() => {});
		},
		getData(sxtj){
		
			let params = {
				p:10,
				page:1,				
			};
			if(sxtj){
				Object.assign(params, sxtj);
			}	

			params.type = this.$route.fullPath.split('_')[1];
			this.api.handle_lists({params}).then((data)=>{	
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
						material_id:da[i].material_id,
						preview_url:da[i].preview_url=='null'?'/img/log.jpg':da[i].preview_url ,						
						material_type:this.checkNr(da[i].material_type),
						position:da[i].position,
						description:da[i].description,
						size:da[i].size,
						link:da[i].link,
						material_status:da[i].status,
						created_at:this.checkTime(da[i].created_at),
						attachmentUrl:da[i].attachment_url,
						type:da[i].type,
						work_id:da[i].work_id,
						flow_id:da[i].flow_id,
						put_id:da[i].put_id,
						flow_detail:da[i].flow_detail,						
					},
				);
			}
			
			return arr;

		},
		filterTag(value, row) {
			return row.material_type === value;
		},	
		handleSizeChange(val) {     
			this.currentPage = val;
			this.getListData();
		},
		handleCurrentChange(val) {
			this.onpage = val-1;
			this.getListData();
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
				case 'm_h5_resource':a= '广告广告H5模板';
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
	},
	watch: {   
		$route: {
			handler: function () {
				this.$refs.Tabledd.initpage();
				this.setConfig();
				this.getData();
				
			},
			deep: true
		}
	},
}	
	
</script>
<style>
</style>