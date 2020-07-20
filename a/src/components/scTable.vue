<template>
	<div class="tbale">
		<template v-if="typeOnde==0" class="tablboxd">
			<el-table :data="tableDatas" :summary-method="getSummaries" :show-summary="tableConfig['show-summary']" v-loading="loading" style="width:100%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" v-if="tableConfig.ischeck">
				</el-table-column>
				<el-table-column v-if="tableConfig.expand"  type="expand">
					<template slot-scope="props">
							<!--<table class="mytabled" width="100%">-->
								<!--<tr><th v-for="(el,index) in tableConfig.expand" :key="index">{{el.lable}}</th></tr>-->
								<!--<tr  v-for="(el,indexx) in props.row.works" :key="indexx">-->
									<!--<td v-for="(el2,index2) in tableConfig.expand" :key="index2">-->
										<!--<span v-if="el2.temps" class="el-button el-button&#45;&#45;text bjysdicon iconfont"-->
											  <!--@click="clickfn('downlods',{on:props.$index,ons:indexx})">{{el2[0]}}&#xe61a;</span>-->
										<!--<span v-else>{{props.row.works[indexx][el2.prop]}}</span>-->
									<!--</td>-->
								<!--</tr>-->
						<!--</table>-->
						<el-steps  :active="props.row.logs_length" align-center >
							<el-step v-for="(el,indexx) in props.row.logs" :key="indexx" @click.native="down(el.attachment_url)"
									 :title="el.msg"
									 :status="win(el.reject)"
									 :description="currentStep(el.created_at,el.creator,el.attachment_url)" :style="{ cursor : ['pointer'] }" >
							</el-step>

						</el-steps>
					</template>
				</el-table-column>
				<el-table-column show-overflow-tooltip :width="el.widht" v-for="(el,index) in tableConfig.list" :key="index"  :prop="el.prop" :label="el.lable" :sortable="el.sor">
					<template  slot-scope="scope" >
						<img v-if="el.type=='imgs'" preview="0" :preview-text="el.lable" class="xyipmg" :src="scope.row[el.prop]"/>
						<el-select v-else-if="el.select &&  ['未通过','已通过','待审核'].indexOf(scope.row[el.prop])==-1" v-model="el.select.mode[scope.$index]" @change="clickfn(el.fnName,scope.$index)" :placeholder="scope.row[el.prop]">
							<el-option v-for="item in el.select.list" :label="item.label" :key="item.value" :value="item.value">
							</el-option>
						</el-select>
						<el-button v-else-if="el.temps" v-for="(el2,el2x) in el.temps" :key="el2x"	@click="clickfn(el2.fnName,scope.$index)" :class="el2.cls" :type="el2.type" :size="el2.size" :round="el2.round" v-html="el2.value">						
						</el-button>
						<span v-else-if="el.poclick" @click="clickfn(el.poclick.fnName,scope.$index)" :class="['jscbtn',el.poclick.cls]">	
							{{scope.row[el.prop]}}				
						</span>
						<span v-else-if="el.wzimg" :class="['jscbtn',el.wzimg.cls]">	
							{{scope.row[el.prop]}}	
							<img class="ycpic" preview="0" :preview-text="el.lable"  :src="[scope.row['img_url']?scope.row['img_url']:'/img/log.jpg']"/>			
						</span>
						<el-switch v-else-if="el.switch" @change="clickfn(el.switch.fnName,scope.$index)" v-model="el.switch.mode[scope.$index]" active-color="#FFA39E" inactive-color="#CFCDCD">
						</el-switch>						
						<span v-else>{{scope.row[el.prop]}}</span>
					</template>
				</el-table-column>				
			</el-table>
		</template>
		<ul v-if="typeOnde==1" class="tbalcp">
			<li v-for="(el,index) in tableDatas" :key="index">
				<img preview="1" :preview-text="el.id" :src="el.preview_url" alt="">
				<div @click="cheaxz(el.id)">
				<p>{{el.id}}</p>
				<p>{{el.material_type}}</p>
				<p>{{el.material_status}}</p>
				<p>{{el.created_at}}</p>
				<p :title="el.link">{{el.link}}</p>
				</div>
				<div :class="['xzkg',ids.indexOf(el.id)!=-1?'btmysd':'']">✔</div>
			</li>			
		</ul>		
		<div :class="['tableBuee',tableConfig.total==-1?'noeflow':'']" v-if="tableConfig.btns"  >
			<el-button v-for="(el,index) in tableConfig.btns" :key="index" @click="clickfn(el.fnName)" :class="[el.cls,el.check?dcan:'']" round>{{el.value}}</el-button>
		</div>
		<div class="tableBuee2">
			<el-pagination  v-if="tableConfig.total!=-1"
				background 
				@size-change="handleSizeChange" 
				@current-change="handleCurrentChange" 
				:current-page="page"
				:page-count="4" 
				:page-sizes="[10, 20, 50, 100]" 
				:page-size="currentPage" 
				layout="sizes, prev, pager, next" 
				:total="tableConfig.total">
			</el-pagination>
		</div>		   
	</div>
</template>

<script>
export default {
	props:['tableConfig','tableDatas'],
	data() {
		return {
            Cut:false,
			typeOnde:0,
			dcan:'ysd',
			tdata:{},
			currentPage:10,
			page:1,
			multipleSelection:[],
			loading:true,
			ids:[],
            logs:[],
			a:'success'
		};
	},

	methods: {

		handleSelectionChange(val){
			this.multipleSelection = val;		
			this.$parent.xzFn(this.multipleSelection); 
		},
        down(urls){
		    if(urls!=''){
                window.location.href= urls;
                return
			}
		},
		cheaxz(id){
			let on = this.ids.indexOf(id);
			if(on!=-1){
				this.ids.splice(on,1);
			}else{
				this.ids.push(id);
			}
			let pok = [];
			for(let i=0,n=this.ids.length;i<n;i++){
				pok.push({id:this.ids[i]});
			}
			this.multipleSelection = pok;
			this.$parent.xzFn(this.multipleSelection); 
		},	
		starloding(){
			this.loading = true;
		},
		setLoding(type){
			this.loading = type;
		},
		endloding(){
			this.loading = false;
		},
		lodingfalse(){
			this.loading = false;
		},
		setData(data){				
			this.tdata = data;				
			this.endloding();
		},
		clickfn(name,cs){		
			this.$parent.clickfn(name,cs); 
		},
		checkSt(){
			this.typeOnde = this.typeOnde==1?0:1;
			this.$previewRefresh();
		},
		handleSizeChange(val) {
			this.currentPage = val;	
			this.page = 1;
			this.$parent.setCurrentPage(val); 
		},
		handleCurrentChange(val) {
			this.page = val;
			this.$parent.setPage(val); 
		},
		initPage(){
			this.page = 1;
			this.currentPage=10;
			this.$parent.setPage(1); 
			
		},	
		setPage(on){
			this.page = on;
		},
		getSummaries(param) {       
			const {columns} = param;   
			const sums = [];
			columns.forEach((column, index) => {
				if (index === 0) {
					sums[index] = '总价';
					return;
				}
			});
			return this.tableConfig.cont;
		},
        setLogs(logs){
		    console.log(logs)
            this.logs = logs;
        },
		win(d){

            if(d==1){
                return 'error'
            }
		},
        currentStep(a,b,c){
		    a=a+"            ";
		    b=b+"            ";
		    if(c!=''){
                return  a + b+'下载';
			}else {
                return  a + b
			}

		}
	},
	watch:{
		multipleSelection(val){
			if(val.length==0){
				this.dcan = 'ysd';
			}else{
				this.dcan = '';
			}
		}
	}	
}
</script>

<style>
.tbale{width: 100%;padding:24px 45px 24px;box-sizing: border-box;background: #FFF;}
.tbale .el-table th{
	background:rgba(254,250,248,1) !important;
}
.tbale .el-table--enable-row-hover .el-table__body tr:hover>td{
	background:rgba(254,250,248,1) !important;
}
.tbale .el-table{
	margin-bottom: 30px;
}
.tbale .tableBuee{
	float: left;
}
.tbale .tableBuee2{
	text-align: right;
}
.tbale .el-pagination.is-background .el-pager li:not(.disabled).active{
	background-color: #8C8C8C;
}

.xyipmg{
	width: 55px;
    height: 27px;
    display: block;
}
.tbalcp{
	margin-left: -62px;
    width: 106%;
}
.tbalcp>li{
	position: relative;
	list-style-type: none;
	display: inline-block;
	padding: 7px 10px;
	width:300px;
	margin-left: 43px;
	margin-bottom: 24px;
	background:rgba(250,247,246,1);
	box-shadow:0px 2px 6px 0px rgba(0, 0, 0, 0.08);
	font-size:12px;
	font-family:PingFang-SC-Regular;
	font-weight:400;
	color:rgba(0,0,0,1);
	opacity:0.85;
}
.tbalcp>li>img{
	display: block;
	width: 300px;
	height: 320px;
}
.tbalcp>li>div>p{
	margin-top: 7px;
	overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.hsan{
	background: rgba(255,120,117,1);
	color: rgba(255,255,255,1) !important;
	border-color:  rgba(255,120,117,1) !important;
}	
.pldc, .pldc:active, .pldc:focus{
	background: #69C0FF !important;
}
.ysd, .ysd:active, .ysd:focus{
	background: #A8A8A8 !important;
}
.xzkg{
	height: 16px;
    position: absolute;
	top: 13px;
    right: 16px;
    width: 16px;
    background: #fff;
    border-radius: 50%;
    text-align: center;
    line-height: 16px;
    font-size: 12px;
    opacity: .3;
	-webkit-opacity: .3;
}
.btmysd{opacity: 1;-webkit-opacity: 1;}
.noeflow{float: none !important;}
.zdiBox{display: table;width: 100%;}
.mytabled{
	width: 100%;
}
.mytabled tr{
	width: 100%;
}
.mytabled td,.mytabled th{
	width: 14%;
}
td{
	overflow:hidden;white-space:nowrap;text-overflow:ellipsis;
}
.jscbtn{
	display: inline-block;
	width: 100%;
	height: 100%;
	cursor: pointer;
	color: #096DD9;
}
.hsetext{color: #FFA39E !important;}
img.ycpic {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
	-webkit-opacity: 0;
	-moz-opacity: 0;
	opacity: 0;
}
</style>
