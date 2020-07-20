<template>
	<div>
		<topNav :config="topConfig"></topNav>
		<div class="HomeBox">
			<img src="../../public/img/index.png" style="overflow: hidden" v-if="type==0"/>
			<img src="../../public/img/home2.png" style="overflow: hidden" v-if="type==1"/>
			<!--<div class="HomeBox_n">-->
				<!--<div class="HomeBox_nl">			-->
					<!--<div class="HomeBox_nlxf">				-->
					<!--<div class="hoBox1_t">待处理事项</div>-->
					<!--<div class="Hcentbox">-->
						<!--<div>-->
							<!--<div>{{dt.need}}</div>-->
							<!--<div>需求待处理</div>-->
						<!--</div>-->
						<!--<div>-->
							<!--<div>{{dt.picture}}</div>-->
							<!--<div>广告图待处理</div>-->
						<!--</div>-->
						<!--<div>-->
							<!--<div>{{dt.resource}}</div>-->
							<!--<div>广告模板待处理</div>-->
						<!--</div>-->
						<!--<div>-->
							<!--<div>{{dt.wallpaper}}</div>-->
							<!--<div>锁屏壁纸待处理</div>-->
						<!--</div>-->
					<!--</div>-->
					<!--</div>-->
					<!--<div class="HomeBox_nlxf">-->
					<!--<div class="homBoxlboxt">常用操作</div>-->
					<!--<div class="Hcentbox">-->
						<!--<div @click="tzd('/data/ad_material_p')"><div><img src="/img/datas.png"></div><div>广告位数据</div></div>-->
						<!--<div @click="tzd('/admin/needList')"><div><img src="/img/xq_xqlist.png"></div><div>需求管理</div></div>-->
						<!--<div @click="tzd('/admin/library_picture')"><div><img src="/img/xq_materialLibt_picture.png"></div><div>广告图库投放管理</div></div>-->
						<!--<div @click="tzd('/admin/library_resource')"><div><img src="/img/xq_materialLib_resource.png"></div><div>广告图模板库投放管理</div></div>-->
						<!--<div @click="tzd('/admin/external')"><div><img src="/img/xq_external.png"></div><div>外部账号管理</div></div>					-->
					<!--</div>-->
					<!--</div>-->
					<!--<div class="HomeBox_nlxf">-->
					<!--<div class="homBoxlboxt">历史操作</div>-->
					<!--<div class="Hcentbox">-->
						<!--<div @click="tzd('/data/ad_material_p')"><div><img src="/img/datas.png"></div><div>广告位数据</div></div>-->
						<!--<div @click="tzd('/admin/needList')"><div><img src="/img/xq_xqlist.png"></div><div>需求管理</div></div>-->
						<!--<div @click="tzd('/admin/library_picture')"><div><img src="/img/xq_materialLibt_picture.png"></div><div>广告图投放管理</div></div>-->
						<!--<div @click="tzd('/admin/library_resource')"><div><img src="/img/xq_materialLib_resource.png"></div><div>广告图模板管理</div></div>-->
						<!--<div @click="tzd('/admin/external')"><div><img src="/img/xq_external.png"></div><div>外部账号管理</div></div>	-->
					<!--</div>-->
					<!--</div>-->
				<!--</div>-->
			<!---->
				<!--<div class="HomeBox_nr">-->
					<!--<div class="homBoxlboxt ndf">登录记录</div>-->
					<!--<div class="homBoxr2">-->
						<!--<div v-for="(el,index) in loind.slice(0, 15)" :key="index">-->
							<!--<div class="homBoxr2_1">-->
								<!--<h1 v-if="index==0">时间</h1>-->
								<!--<div>{{el.created_at}}</div>-->
							<!--</div>-->
							<!--<div class="homBoxr2_2">-->
								<!--<h1 v-if="index==0">地点</h1>-->
								<!--<div>{{el.login_address}}</div>-->
							<!--</div>							-->
						<!--</div>						-->
					<!--</div>-->
				<!--</div>-->
			<!--</div>-->
		</div>
	</div>
</template>

<script>
import topNav from '../components/topNav';
export default {
	data() {
		return {
		    type:localStorage.getItem('role'),
			loind:[],
			czlog:{
				often:[],
				last:[],
			},
			topConfig:{showL:1},
			dt:{},
		}
	},
	components: {
		topNav,
	},
	mounted: function () {	
	// this.get_logs();
	// this.handle_stat();
	// this.get_menulog();
	}, 
	methods: {
		// handle_stat(){
		// 	this.api.handle_stat().then((datas)=>{
		// 		console.log(datas);
		// 		this.dt = datas;
		// 	})
		// },
		get_menulog(){
			this.api.get_menulog().then((datas)=>{					
				console.log(datas);
				this.czlog = datas;
			})
		},	
		get_logs(){
			this.api.get_logs().then((datas)=>{
				this.loind = datas;
			})
		},
		
		tzd(url){
			window.location.href= '#'+url
			
		},
	},
}
</script>

<style>
li{list-style-type: none;}
.HomeBox{
	position: absolute;
	top: 0;
	left: 0;
	box-sizing: border-box;
	padding-top: 63px;
	width: 100%;
	height: 100%;
	background: #fff;
	overflow: hidden;
}	
.HomeBox_n{
    padding:51px 79px 0;	
	box-sizing: border-box;
    width: 100%;
	display: flex;
}
.HomeBox_nl{
	flex: 1;
	margin-right: 57px;
	
}
.HomeBox_nlxf{
	width: 100%;
	background:rgba(255,255,255,1);
	box-shadow:0px 1px 8px 0px rgba(0, 0, 0, 0.08);
	margin-bottom: 51px;
	padding-bottom: 20px;
}

.Hcentbox>div{
	flex: 1;
	text-align: center;
	font-size:14px;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	color:rgba(0,0,0,1);
}
.Hcentbox{
	display: flex;
}
.Hcentbox>div>div:nth-child(1){
	width: 100px;	
	margin:20px auto 15px;
	font-size:28px;
	font-family:PingFang-SC-Bold;
	font-weight:bold;
	color:rgba(255,120,117,1);
}
.Hcentbox>div>div:nth-child(1)>img{
	width: 100px;
	cursor: pointer;
}
.Hcentbox>div>div>h1{
	font-size:14px;
	font-family:PingFang-SC-Regular;
	font-weight:400;
	color:rgba(0,0,0,1);
	margin-bottom: 12px;
}
.Hcentbox>div>div>div{
	font-size:12px;
	font-family:PingFang-SC-Light;
	font-weight:300;
	color:rgba(0,0,0,1);
	opacity:0.85;
}
.HomeBox_nr{
	width:366px;
	float: right;
	height:820px;
	background:rgba(255,255,255,1);
	box-shadow:0px 1px 8px 0px rgba(0, 0, 0, 0.08);
}			
.homBox{
	margin-top: 63px;
}
.homBox>div{
	display: inline-block;
}
.homBoxr{
	margin: 51px 96px 0 0;
	float: right;
	height:820px;
	background:rgba(255,255,255,1);
	box-shadow:0px 1px 8px 0px rgba(0, 0, 0, 0.08);
}
.homBoxl{
	margin: 51px 0 0 79px;
	float: left;
	width: 65%;
}
.homBoxlbox{
	background:rgba(255,255,255,1);
	box-shadow:0px 1px 8px 0px rgba(0, 0, 0, 0.08);	
	margin-bottom: 50px;
}
.homBoxlboxt{
	width: 100%;
	height:66px;
	font-size:14px;
	font-family:PingFang-SC-Regular;
	font-weight:400;
	color:rgba(0,0,0,1);
	line-height: 66px;
	background:rgba(250,247,246,1);
	box-shadow:0px 1px 3px 0px rgba(0, 0, 0, 0.06);
	text-indent: 38px;
}

@media only screen  and (max-width: 1380) {
	.homBoxr{display:none ;}  
}
.ndf{
	text-indent: 20px;
}
.homBoxr2{
	padding: 15px 20px;
}
.homBoxr2>div>div{
	display: inline-block;
}
.homBoxr2>div>div>h1{
	font-size:14px;
	font-family:PingFang-SC-Regular;
	font-weight:400;
	color:rgba(0,0,0,1);
	margin-bottom: 12px;
}
.homBoxr2>div>div>div{
	font-size:12px;
	font-family:PingFang-SC-Light;
	font-weight:300;
	color:rgba(0,0,0,1);
	opacity:0.85;
}
.homBoxr2>div>div:nth-child(1){
	margin-right: 138px;
}
.homBoxlbox_a{
	padding: 0 80px;
}
.homBoxlbox_a>div{
	display: inline-block;
	cursor: pointer;
	text-align: center;
}
.homBoxlbox_a>div:hover{
	opacity: .7;
}
.homBoxlbox_a>div:last-child{
	margin-right: 0;
}
.homBoxlbox_a>div>div:nth-child(1){
	font-size:28px;
	font-family:PingFang-SC-Bold;
	font-weight:bold;
	color:rgba(255,120,117,1);
}
.homBoxlbox_a>div>div:nth-child(2){
	font-size:14px;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	color:rgba(0,0,0,1);
}
.homBoxlbox_a>div img{	
	width: 100px;
}
.homBoxlbox_b>div{
	margin-right: 22%;
}
.homBoxlbox_b>div:hover{
	opacity: 1;
	cursor: auto;	
}
.tipboxd{
	margin: 51px 0 0 79px;
	float: left;
	width: 65%;
}
.tipboxdtit{
	width: 100%;
	height:66px;
	font-size:14px;
	font-family:PingFang-SC-Regular;
	font-weight:400;
	color:rgba(0,0,0,1);
	line-height: 66px;
	background:rgba(250,247,246,1);
	box-shadow:0px 1px 3px 0px rgba(0, 0, 0, 0.06);
	text-indent: 38px;
}
.tipboxdtit1{
	width: 100%;
	background: #fff;
}
.tipboxdtit1>div{
	display: inline-block;
	width: 25%;
	min-width: auto;
	text-align: center;
}
.tipboxdtit1>div>div:nth-child(1) {
    font-size: 28px;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: rgba(255,120,117,1);
	white-space:nowrap;
}
.tipboxdtit1>div>div:nth-child(2) {
    font-size: 14px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(0,0,0,1);
	white-space:nowrap;
}
.hoBox{
	position: relative;
	width: 100%;
	min-height: 100%;
	background: #fff;
	margin-top: 114px;
	box-sizing: border-box;
	width: 100%;
	padding-right: 519px;   
	padding-left: 79px;
}
.hoBox1{
	width: 100%;
	height:251px;
}
.hoBox2{
	position: absolute;
	right: 96px;
	top: 0;
	width:366px;
	height:855px;
	background:rgba(255,255,255,1);
	box-shadow:0px 1px 8px 0px rgba(0, 0, 0, 0.08);
}
.hoBox1_t{
	width: 100%;
	height:66px;
	font-size:14px;
	font-family:PingFang-SC-Regular;
	font-weight:400;
	color:rgba(0,0,0,1);
	line-height: 66px;
	background:rgba(250,247,246,1);
	box-shadow:0px 1px 3px 0px rgba(0, 0, 0, 0.06);
	text-indent: 38px;
}
.hoBox1_c1{
	box-sizing: border-box;
	padding:0 80px;
	width: 100%;
	background:rgba(255,255,255,1);
	box-shadow:0px 1px 8px 0px rgba(0, 0, 0, 0.08);
}
.hoBox1_c1>div{
	display: inline-block;
	width: 25%;
	text-align: center;
}
.xqList{
	position: relative;
	margin: 114px 24px 85px 276px!important;
}
</style>
