<template>
	<div>
		<tables
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
                screens:{
                    p:10,
                    page:1,
                    type:'work'
                },
                statusType:0,
                tableData:[],
                tableConfig:{
                    total:0,
                    ischeck:false,
                    list:[
                        {prop:'work_id',lable:'素材ID'},
                        {prop:'id',lable:'需求ID'},
                        {prop:'preview_url',lable:'预览图',type:'imgs'},
                        {prop:'work_type',lable:'素材类型'},
                        {prop:'position',lable:'广告位类型'},
                        {prop:'size',lable:'素材尺寸'},
                        {prop:'status_desc',lable:'状态'},
                        {prop:'created_at',lable:'最近更新时间'},
                        // {prop:'attachment.url',lable:'操作',widht:210,
                        //     temps:[
                        //         {type:'primary',size:'mini',cls:'xqshticon',value:'通过',fnName:'opentip',round:'round'},
                        //         {type:'primary',size:'mini',cls:'xqshjicon',value:'拒绝',fnName:'open3',round:'round'},
                        //         // {type:'primary',size:'mini',value:'转审',fnName:'open4',round:'round'},
                        //     ]
                        // },

                    ],
                    expand:[
                        {prop:'id',lable:'作品ID'},
                        {prop:'status',lable:'状态信息'},
					],
                },
            }
        },
        mounted: function () {
            this.getData();
        },
        methods: {
            setLoding(type){
                this.$refs.Tabledd.setLoding(type);
            },
            opentip(on){
                if(this.statusType==1){return}
                this.$confirm('是否确认通过', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.setStatus(on,2);
                }).catch(() => {
                });
            },
            getData(sxtj){
                this.setLoding(true);
                let params = this.screens;
                if(sxtj){
                    Object.assign(params, sxtj);
                }
                this.api.get_processed({params}).then((response)=>{
                    console.log(response)
                    this.tableData = this.clData(response);
                    this.tableConfig.expand = this.logData(response);
                    this.setLoding(false);
                }).catch(()=>{
                    this.setLoding(false);
                });
            },
			logData(data){
                let arr  = [];
                let da = data.data;
                // console.log(da[0].need.id,)
                for(let i=0,n=da.length;i<n;i++){
                    arr.push(
                        {
                            logs:da[i].logs, //协议,
                        },
                    );
                }

                return arr;
			},
            clData(data){
                let arr  = [];
                this.tableConfig.total=data.total;
                let da = data.data;
                // console.log(da[0].need.id,)
                for(let i=0,n=da.length;i<n;i++){
                    arr.push(
                        {
                            work_id:da[i].work.id,
                            id:da[i].need.id,
                            preview_url:da[i].work.preview_url,
                            position:da[i].need.position,
							work_type:this.checkNr(da[i].work.work_type),//协议
                            size:da[i].need.size,
                            status_desc:da[i].work.status_desc,//协议
							created_at:da[i].work.created_at, //协议,
                            logs:da[i].logs,
							logs_length:da[i].logs_length,//协议,
                        },
                    );
                }

                return arr;
            },
            checkNr(value){
                if(!value){return}
                let a = '';
                switch (value){
                    case 'picture':a= '广告静态图';
                        break;
                    case 'script_picture':a= '广告脚本图';
                        break;
                    case 'resource':a= '广告脚本模板';
                        break;
                    case 'h5_resource':a= '广告H5模板';
                        break;
                    case 'wallpaper':a= '锁屏壁纸脚本图';
                        break;
                    default:
                        break;
                }
                return a;
            },
            checkStatus(value){
                return value ==0?'待审核':'';
            },
            open3(on) {
                if(this.statusType==1){
                    return
                }
                this.$prompt('请输入拒绝理由', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
                    this.setStatus(on,1);
                }).catch(() => {
                });
            },
            setStatus(on,type){
                this.statusType=1;
                let params = {id:this.tableData[on].id,base_status:type};
                this.api.need_check({params}).then(()=>{
                    this.statusType = 0;
                }).catch(()=>{
                    this.statusType = 0;
                    location.reload();
                })
            },
        }
    }

</script>

<style>

	.xqList{
		position: relative;

		margin: 114px 24px 85px 276px!important;

	}

	.tjboxd li{
		position: relative;
		display: inline-block;
		width:312px;
		height:110px;
		background:rgba(255,255,255,1);
		box-shadow:0px 1px 8px 0px rgba(0, 0, 0, 0.08);
		vertical-align: middle;
		margin: 0 70px 30px 0;
	}
	.tjboxd li:last-child{
		margin-right: 0;
	}
	.tjboxd li>div:nth-child(1){
		position: absolute;
		top: 47px;
		left: 40px;
		font-size:14px;
		font-family:PingFang-SC-Light;
		font-weight:300;
		color:rgba(0,0,0,1);
		opacity:0.85;
	}
	.tjboxd li>div:nth-child(2){
		position: absolute;
		top: 38px;
		right: 40px;
		font-size:28px;
		font-family:PingFang-SC-Bold;
		font-weight:bold;
		color:rgba(255,120,117,1);
	}
	.xqCentBox{
		width: 100%;
		box-sizing: border-box;
		background:rgba(255,255,255,1);
		box-shadow:0px 1px 8px 0px rgba(0, 0, 0, 0.08);
	}
	.xqCentBox tr{
		margin: 0 52px;
	}
	.xqCentBox th{
		font-size:14px;
		font-family:PingFang-SC-Light;
		font-weight:300;
		color:rgba(0,0,0,1);
		opacity:0.85;
		text-align: left;
	}
	.xqCentBox1{
		width: 100%;
		background: #FEFAF8;

	}



	@media only screen  and (max-width: 720px) {
		.xqList{margin:114px 25px 0;}
		.tableBuee{
			position: fixed;
			z-index: 8;
			bottom: 20px;
			left: 20px;
		}

		.pldc{
			display: none !important;
		}
		.tbale .tableBuee2{
			position: absolute;
			bottom: 60px;
			left: 0;
		}
		.tbale{padding-bottom: 120px;}
		.tbale .el-pagination__sizes{display: none !important;}
	}
	.bjysdicon{
		color: #000 !important;
		margin-left: 20px !important;
	}
	.sxbtnd{
		position: absolute;
		top: 46px;
		right: 41px;
		width: 82px;
		height: 28px;
		background: rgba(255,120,117,1) !important;
		border-radius: 14px;
		line-height: 28px !important;
		padding: 0 !important;
		border: none !important;
		font-size: 14px;
		font-family: MicrosoftYaHei;
		font-weight: 400;
		color: rgba(255,255,255,1) !important;
	}
	.sxbtnd:hover{
		opacity: .7;
	}
	.xqshticon{
		background: #95DE64 !important;
		border-color: #95DE64 !important;
	}
	.xqshjicon{
		background: #FF7875 !important;
		border-color: #FF7875 !important;
	}
</style>