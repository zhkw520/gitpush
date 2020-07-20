<template>
    <div>
        <div class="top_name">
            <span class="top_txt">任务中心/全部</span>
            <div class="title_left">
            </div>
            <div class="tit_btn">
                <div class="tit_btn_top">
                    <span>需求类型</span>
                    <select class="types" v-model="demand_type" @change="typeData">
                        <option value="">全部</option>
                        <option value="demand_business">业务需求</option>
                        <option value="demand_material">素材需求</option>
                        <option value="demand_apply">设计师结算</option>
                        <option value="demand_settle_receive">收款结算</option>
                        <option value="demand_settle_paying">付款结算</option>
                        <option value="demand_sharing_income">分成收益审核</option>
                    </select>
                    <span>所处流程</span>
                    <select v-model="statuss">
                        <option value="">全部</option>
                        <option v-for="item in statusList" :value="item.status">{{item.status_name}}</option>
                    </select>
                    <span>需求ID</span>
                    <input type="text" placeholder="请输入需求ID" v-model="search"/>
                    <span class="cx" @click="cz">重置</span>
                </div>
                <div class="tit_btn_bom">
                    <div class="blocks">
                        <el-date-picker
                                v-model="value"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                format="yyyy 年 MM 月 dd"
                                value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                    <span>状态</span>
                    <select v-model="reject">
                        <option value=''>全部</option>
                        <option value=1>驳回</option>
                        <option value=0>已处理</option>
                    </select>
                    <span>创建人员</span>
                    <input type="text" placeholder="请输入邮箱账号" v-model="creator"/>
                    <span class="cx" @click="cx()">查询</span>
                    <span class="tit_btn_sc" :class="{activeHeid:this.controlBtn}" @click="getSC('')">发布素材需求</span>
                    <span class="tit_btn_yw"  :class="{activeHeid:this.controlBtns}" @click="getYW('')">发布业务需求</span>
                </div>
            </div>
        </div>
        <div class="centNavBox">
            <tab v-if="tables" :tableData="tableData" @upDataList="upDataList()"></tab>
            <sc v-if="sc" :SCid="id" :status="status" @upDataList="upDataList()"></sc>
            <yw v-if="yw" :YWid="id" :status="status" @upDataList="upDataList()"></yw>

        </div>
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="p"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>

    import tab from './workbenchTable'
    import sc from './workBench_sc'
    import yw from './workBench_yw'
    export default {
        components:{tab,sc,yw},
        name: "workbench_padding",
        data(){
            return{
                creator:'',
                reject:'',
                statuss:'',
                demand_type:'',
                sc:false,
                yw:false,
                sh:false,
                active:0,
                tableData:[],
                p:10,
                page:1,
                search:'',
                total:0,
                ADD_material:true,
                set:false,
                scMessage:[],
                BD:false,
                type:'',
                wl:false,
                bh:false,
                value:[],
                start_time:'',
                end_time:'',
                statusList:[],
                tables:false,
                controlBtn:true,
                controlBtns:true,
                control:[],
                id:'',
                status:"",
            }
        },
        created(){
            this.control=JSON.parse(localStorage.getItem('control'));
            if(this.control.length==0){
                this.controlBtn=true;
                this.controlBtns=true;
            }else{
                for(var i=0;i<this.control.length;i++){
                    if(this.control[i].uri_key=='uri.demand.material.add'){
                        this.controlBtn=false;
                    }
                }
                for(var i=0;i<this.control.length;i++){
                    if(this.control[i].uri_key=='uri.demand.business.add'){
                        this.controlBtns=false;
                    }
                }
            }

        },
        mounted(){
            this.getDataList();
        },
        methods:{
            cz(){
                this.demand_type='';
                this.statuss='';
                this.search='';
                this.value=[];
                this.reject='';
                this.creator='';
            },
            cx(){
                this.page=1;
                this.getDataList();

            },
            getSC(id,status){
                this.id = id;
                this.status=status;
                this.sc=true;
                this.stop()
            },
            heidSC(){
                this.sc=false;
                this.status='';
                this.id='';
                this.move()
            },
            getYW(id,status){
                this.id=id;
                this.status=status;
                this.yw=true;
                this.stop()
            },
            heidYW(){
                this.id='';
                this.status='';
                this.yw=false;
                this.move()
            },
            upDataList(){
                this.getDataList();
            },
            getDataList(){
                if(this.value){
                    var params ={p:this.p,page:this.page,search:this.search,status:this.statuss,demand_type:this.demand_type,start_time:this.value[0],end_time:this.value[1],reject:this.reject,creator:this.creator}
                }else{
                    var params ={p:this.p,page:this.page,search:this.search,status:this.statuss,demand_type:this.demand_type,start_time:"",end_time:"",reject:this.reject,creator:this.creator}
                }

                this.api.demand_search({params}).then((res)=>{
                    this.tableData = res.data;
                    this.total = res.total;
                    this.tables=true;
                    for (let i=0;i<this.tableData.length;i++){
                        if(this.tableData[i].demand_type=='demand_business'){
                            this.tableData[i].demand_type='业务需求'
                            this.tableData[i].demand_name=this.tableData[i].demand_name+'('+this.tableData[i].type_name+'-'+this.tableData[i].model+')'
                        }else if(this.tableData[i].demand_type=='demand_material'){
                            this.tableData[i].demand_type='素材需求'
                            this.tableData[i].demand_name=this.tableData[i].demand_name+'('+ this.tableData[i].type_name+')'
                        }else if(this.tableData[i].demand_type=='demand_apply'){
                            this.tableData[i].demand_type='设计师结算'
                        }else if(this.tableData[i].demand_type=='demand_settle_receive'){
                            this.tableData[i].demand_type='收款结算'
                        }else if(this.tableData[i].demand_type=='demand_settle_paying'){
                            this.tableData[i].demand_type='付款结算'
                        }else if(this.tableData[i].demand_type=='demand_sharing_income'){
                             this.tableData[i].demand_type='分成金额审核'   
                        }
                    }
                })
            },
            // getDataList1(){
            //     let params ={p:this.p,page:this.page,search:this.search,status:this.status,demand_type:this.demand_type,start_time:this.value[0],end_time:this.value[1],reject:this.reject,processor:this.processor};
            //     this.api.demand_search({params}).then((res)=>{
            //         this.tableData = res.data;
            //         this.tables=true;
            //         this.total = res.total;
            //         for (let i=0;i<this.tableData.length;i++){
            //             if(this.tableData[i].demand_type=='demand_business'){
            //                 this.tableData[i].demand_type='业务需求'
            //                 this.tableData[i].demand_name=this.tableData[i].demand_name+'('+this.tableData[i].type_name+'-'+this.tableData[i].model+')'
            //             }else if(this.tableData[i].demand_type=='demand_material'){
            //                 this.tableData[i].demand_type='素材需求'
            //                 this.tableData[i].demand_name=this.tableData[i].demand_name+'('+ this.tableData[i].type_name+')'
            //             }else {
            //                 this.tableData[i].demand_type='设计师结算'
            //             }
            //         }
            //     })
            // },
            listenToChildEvent(a){
                this.scMessage = a;
                console.log(this.scMessage)
            },
            listen(b){
                this.scMessage=b;
                console.log(this.scMessage)
            },
            handleSizeChange(p) { // 每页条数切换
                this.tables = false;
                this.p = p;
                this.getDataList()
            },
            handleCurrentChange(page) {//页码切换
                this.tables = false;
                this.page = page;
                this.getDataList()
            },
            typeData(){
                if(this.demand_type==''){
                    this.statuss=''
                }else{
                    let params = {demand_type:this.demand_type};
                    this.api.process_status({params}).then((res)=>{
                        this.statusList = res;
                    })
                }

            },
            stop(){
                document.body.style.overflow='hidden';
                document.body.style.position='fixed';
                document.body.style.width='100%';
            },
            move(){
                document.body.style.overflow='';//出现滚动条
                document.body.style.position='initial';
                document.body.style.height='1006px';
            },
        }
    }
</script>

<style scoped>
    .centNavBox{
        width: 100%;
        padding: 24px 0 24px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background: #FFF;
        margin-top: 285px;
    }
    .top_name{
        height: 200px;
        width: 100%;

    }
    .top_txt{
        display: inline-block;
        margin-left: 24px;
    }
    .title_left>span{
        display: inline-block;
        margin-left: 24px;
        font-size:20px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(50,50,50,1);
    }
    .tit_btn{
        margin-top: 24px;
    }
    .tit_btn>input{
        width:374px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        padding-left: 30px;
    }
    .tit_btn>img{
        position: relative;
        left: 35px;
        top: 10px;
    }
    .tit_btn_yw{
        display: inline-block;
        line-height: 36px;
        text-align: center;
        width:146px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1)!important;
        float: right;
        margin-right: 24px;
        cursor: pointer;
    }
    .tit_btn_sc{
        display: inline-block;
        line-height: 36px;
        text-align: center;
        width:146px;
        height:36px;
        background:rgba(57,189,101,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1)!important;
        float: right;
        cursor: pointer;
    }
    .padding_btn{
        margin-top: 258px;
    }
    .padding_btn span{
        display: inline-block;
        width:120px;
        height:36px;
        line-height: 36px;
        text-align: center;
        background:rgba(255,255,255,1);
        border-radius:0px 0px 0px 4px;
        border:1px solid rgba(211,219,235,1);
        font-size:16px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(143,155,179,1);
        cursor: pointer;
    }
    .active{
        width:120px;
        height:36px;
        background:rgba(51,119,255,1)!important;
        border-radius:4px 0px 0px 0px;
        border:1px solid rgba(51,119,255,1)!important;
        font-size:16px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1)!important;
    }
    .tit_btn_top{
        margin: 24px;
    }
    .tit_btn_top span{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 24px;
    }
    .tit_btn_top select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 44px;
    }
    .types{
        margin-right: 88px!important;
    }
    .tit_btn_top input,.tit_btn_bom input{
        width:190px;
        height:36px;
        padding-left: 10px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .blocks{
        display: inline-block;

        margin-right: 77px;
    }
    .tit_btn_bom{
        margin: 0 24px;
        width: 80%;
    }
    .tit_btn_bom span{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 24px;
    }
    .tit_btn_bom select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 34px;
    }
    .cx{
        display: inline-block;
        line-height: 36px;
        text-align: center;
        width:68px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1)!important;
        margin-left: 20px;
        cursor: pointer;
    }

</style>