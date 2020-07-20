<template>
    <div>
        <div class="top_name">
            <span class="top_txt">任务中心/我的已处理</span>
            <div class="title_left">
                <span>我的已处理</span>
            </div>
            <div class="tit_btn">
                <div class="blocks">
                    <el-date-picker
                            v-model="value"
                            type="daterange"
                            @change="getList()"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
                <span class="need_tit">需求类型</span>
                <select class="need_type" v-model="demand_type" @change="getList()">
                    <option value="">全部</option>
                    <option value="demand_business">业务需求</option>
                    <option value="demand_material">素材需求</option>
                    <option value="demand_apply">设计师结算</option>
                </select>
                <img src="../../../public/img/ss.png">
                <input type="text" placeholder="搜索需求ID" v-model="search" @input="typeListSearch"/>
                <span :class="el.cl" v-for="(el,index) in btns" @click="clickfn(el.clfn)">{{el.n}}</span>
            </div>
        </div>
        <!--<div class="padding_btn">-->
            <!--<span :class="{active:this.active==0}" @click="getList">我的待处理</span>-->
            <!--<span :class="{active:this.active==1}" @click="getDataList">全部待处理</span>-->
        <!--</div>-->
        <div class="centNavBox">
            <tab v-if="tables" :tableData="tableData" :active="active" ></tab>
            <sc v-if="sc" :SCid="id"></sc>
            <yw v-if="yw" :YWid="id"></yw>
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
                sc:false,
                yw:false,
                active:0,
                tableData:[],
                p:10,
                page:1,
                search:'',
                total:0,
                scMessage:[],
                type:'',
                detail:[],
                step:[],
                id:'',
                tables:false,
                control:[],
                controlBtn:true,
                controlBtns:true,
                btns:[],
                value:[],
                demand_type:'',
            }
        },
        created(){
            this.control=JSON.parse(localStorage.getItem('control'));
            let arr = [];
            for(var i=0;i<this.control.length;i++){
                if(this.control[i].uri_key=='uri.demand.business.add'){
                    arr.unshift({n:'发布业务需求',cl:'tit_btn_yw',clfn:'getYW'});
                }
                if(this.control[i].uri_key=='uri.demand.material.add'){
                    arr.unshift({n:'发布素材需求',cl:'tit_btn_sc',clfn:'getSC'});
                }
            }
            this.btns = arr;
            let date = new Date();
            date.setDate(date.getDate()-7);
            this.myformatter(date);
        },
        mounted(){
            this.getList();

        },
        methods:{
            clickfn(n){
                this[n]();
            },
            getSC(id){
                this.id = id;
                this.sc=true;
                this.stop()
            },
            heidSC(){
                this.sc=false;
                this.move()
            },
            getYW(id){
                this.id=id;
                this.yw=true;
                this.stop()
            },
            heidYW(){
                this.id='';
                this.yw=false;
                this.move()
            },
            typeListSearch(){
                    this.getList();
            },
            myformatter(date){

                var strDate = date.getFullYear()+"-";

                if(date.getMonth()<10){

                    var s = date.getMonth()+1+"-";

                    strDate += "0"+s;

                }else{

                    strDate += date.getMonth()+1+"-";

                }

                if(date.getDate()<10){

                    strDate += "0"+date.getDate();

                }else{

                    strDate += date.getDate();

                }
                this.value=[strDate,(new Date()).toLocaleDateString().split('/').join('-')];
                this.getList()
            },
            getList(){
                let params ={p:this.p,page:this.page,search:this.search,start_time:this.value[0],end_time:this.value[1],demand_type:this.demand_type};
                this.api.demand_audited({params}).then((res)=>{
                    this.tableData = res.data;
                    this.total = res.total;
                    this.tables = true;
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
            handleSizeChange(p) { // 每页条数切换
                this.tables=false
                this.p = p;
                if(this.active==0){
                    this.getList();
                }else{
                    this.getDataList()
                }
            },
            handleCurrentChange(page) {//页码切换
                this.tables=false
                this.page = page;
                if(this.active==0){
                    this.getList();
                }else{
                    this.getDataList()
                }
            },
        }
    }
</script>

<style scoped>
    .centNavBox{
        width: 100%;
        padding: 24px ;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background: #FFF;
        margin-top: 258px;
    }
    .top_name{
        height: 173px;
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
        width: 80%;
    }
    .tit_btn>input{
        width:198px;
        height:32px;
        background:rgba(255,255,255,1);
        border-radius:2px;
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
        color:rgba(255,255,255,1);
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
        color:rgba(255,255,255,1);
        float: right;
        margin-right: 24px;
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
        border-radius:4px 0px 0px 0;
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
    .activeHeid{
        display: none!important;
    }
    .blocks{
        display: inline-block;
        margin-left: 24px;
        margin-right: 34px;
    }
    .need_type{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-left: 24px;
    }
</style>