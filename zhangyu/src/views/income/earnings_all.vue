<template>
    <div>
        <div class="top_tit">
            <div class="tit_top_url">
                <span class="log_url">收益数据 &nbsp;/&nbsp;</span>
                <span class="log_url">收益总览</span>
            </div>
            <div class="tit_top_con">
                <span class="tit_name">收益总览</span>
            </div>
        </div>
        <div class="content_table">
           <div>
               <select v-model="time_quantum" @change="getData">
                   <option value="d">今日</option>
                   <option value="w">本周</option>
                   <option value="m">本月</option>
                   <option value="y">全年</option>
               </select>
           </div>
            <div id="across">

            </div>
        </div>
        <div class="content_table2">
            <div class="content_table2_top">
                <span :class="{active:num==0}" @click="estimator(0,'income')">预估流水</span>
                <span :class="{active:num==1}" @click="estimator(1,'pre_income')">已出流水</span>
                <span :class="{active:num==2}" @click="estimator(2,'cost')">渠道成本</span>
                <span :class="{active:num==3}" @click="estimator(3,'designer_cost')">设计师成本</span>
                <div class="right_top">
                    <span :class="{date:times==0}" @click="dataTime(0,'d')">今日</span>
                    <span :class="{date:times==1}" @click="dataTime(1,'w')">本周</span>
                    <span :class="{date:times==2}" @click="dataTime(2,'m')">本月</span>
                    <span :class="{date:times==3}" @click="dataTime(3,'y')">全年</span>
                    <el-date-picker
                            v-model="value"
                            type="daterange"
                            @change="getPie()"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
            </div>
            <div style="display: inline-block">
                <div style="display: inline-block;margin-top: 20px">
                    <span class="btn_qs" :class="{checked:chenck==0}" @click="tendency">渠道维度</span>
                    <span class="btn_wd" :class="{checked:chenck==1}" @click="dimensionality">广告主维度</span>
                </div>
                <div id="histogram">

                </div>
            </div>
            <div style="display: inline-block;width: 41%">
                <div>
                    <span>TOP5占比</span>
                </div>
                <div id="pie">

                </div>
            </div>
        </div>
        <div class="content_table3">
            <div class="content_table3_top">
                <span class="trench" :class="{checkeds:chenck1==0}" @click="trenchData">渠道数据</span>
                <span class="ad" :class="{checkeds:chenck1==1}" @click="AdData">广告主数据</span>
                <div class="right_seach">
                    <el-date-picker
                            v-model="values"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                    <span class="more">更多</span>
                    <span class="upload">导出</span>
                </div>
            </div>
            <div v-if="tableData.length>0">
                <template>
                    <el-table
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            :data="tableData"
                            style="width: 100%">
                        <el-table-column
                                prop="create_time"
                                label="日期"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="channel_id"
                                label="渠道ID"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="日活">
                        </el-table-column>
                        <el-table-column
                                sortable
                                prop="date"
                                label="流水"
                        >
                        </el-table-column>
                        <el-table-column
                                sortable
                                prop="cost"
                                label="成本"
                                :show-overflow-tooltip="true"
                        >
                        </el-table-column>
                        <el-table-column
                                sortable
                                prop="income"
                                label="收益">
                        </el-table-column> <el-table-column
                            sortable
                            prop="date"
                            label="毛利率"
                            :show-overflow-tooltip="true"
                    >
                    </el-table-column>
                        <el-table-column
                                prop="name"
                                label="日活arpu值"
                        >
                        </el-table-column>
                    </el-table>
                </template>
            </div>
            <div v-if="tableDataList.length>0">
                <template>
                    <el-table
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            :data="tableDataList"
                            style="width: 100%">
                        <el-table-column
                                prop="create_time"
                                label="日期"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="admaster"
                                label="广告主"
                        >
                        </el-table-column>
                        <el-table-column
                                sortable
                                prop="pre_income"
                                label="预估流水">
                        </el-table-column>
                        <el-table-column
                                sortable
                                prop="income"
                                label="已出流水"
                        >
                        </el-table-column>
                        <el-table-column
                                sortable
                                prop="ecpc"
                                label="ECPC"
                                :show-overflow-tooltip="true"
                        >
                        </el-table-column>
                        <el-table-column
                                sortable
                                prop="ecpm"
                                label="ECPM">
                        </el-table-column>
                    </el-table>
                </template>
            </div>
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

    import canvas from '../../api/commonality'
    export default {
        name: "earnings_all",
        data(){
            return{
                IDname:"across",
                value:[],
                chenck:'0',
                chenck1:'0',
                tableData:[],
                tableDataList:[],
                req_type:'channel',
                req_data:"income",
                req_cycle:"w",
                num:'0',
                times:'1',
                p:10,
                page:1,
                total:0,
                time_quantum:'m',
                channel_id:'',
                put_env:'',
                scene:'',
                values:[],
                admaster:'',
                xData1:[],
                yData1:[],
                xData2:[],
                yData2:[],
                xData3:[],
                yData3:[],
            }
        },
        mounted(){
            this.getData();
            this.ListData()
        },
        methods:{
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
                if(this.chenck1==0){
                    this.ListData()
                }else{
                    this.getDataList();
                }

            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                if(this.chenck1==0){
                    this.ListData()
                }else{
                    this.getDataList();
                }
            },
            chart(){
               canvas.transverseLine(this.xData1,this.yData1);
            },
            histogramLine(){
                canvas.cavansLine(this.xData2,this.yData2)
            },
            pieImg(){
                canvas.pie(this.xData3,this.yData3)
            },
            tendency(){
                this.chenck=0;
                this.req_type='channel';
                this.getPie();
            },
            dimensionality(){
                this.chenck=1;
                this.req_type='admaster';
                this.getPie();
            },
            trenchData(){
                this.chenck1 = 0;
                this.ListData()
            },
            AdData(){
                this.chenck1 = 1;
                this.getDataList();
            },
            getRowClass({row, column, rowIndex}) {
                if (rowIndex === 0) {
                    return 'background:#f7f9fc;color:#1F2E4D;font-size:14px;font-weight:bold;height:48px;font-family:PingFang-SC-Regular;padding:20px 0px 20px 14px'
                } else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'padding:15px 14px;color:#3d4966;font-size:14px;font-weight:400;font-family:PingFang-SC-Regular;'
            },
            getDataList(){
                if(this.values.length==0){
                    this.values=['','']
                }
                let params = {tstart:this.values[0],tend:this.values[1],p:this.p,page:this.page,admaster:this.admaster}
                this.api.report_income_admaster({params}).then((res)=>{
                    this.tableDataList=res.data;
                    this.total=res.total;
                    this.tableData=[];
                })
            },
            ListData(){
                if(this.values.length==0){
                    this.values=['','']
                }
                let params ={channel_id:this.channel_id,put_env:this.put_env,scene:this.scene,p:this.p,page:this.page,tstart:this.values[0],tend:this.values[1]}
                this.api.report_income_channel({params}).then((res)=>{
                    this.tableData = res.data;
                    this.total=res.total;
                    this.tableDataList=[];
                })
            },
            getData(){
                let params ={req_cycle:this.time_quantum};
                this.api.report_income_summary({params}).then((res)=>{
                    this.xData1=res.data;
                    this.yData1=res.series;
                    this.chart(res.data,res.series);
                    this.getSector()
                })
            },
            getSector(){
                if(this.value.length==0){
                    this.value=['','']
                }
                let params = {tstart:this.value[0],tend:this.value[1],req_cycle:this.req_cycle,req_data:this.req_data,p:this.p,page:this.page};
                this.api.report_income_rank({params}).then((res)=>{
                    this.xData2=res.data;
                    this.yData2=res.series;
                    this.histogramLine(res.data,res.series);
                    this.getPie();
                })
            },
            getPie(){
                if(this.value.length==0){
                    this.value=['','']
                }
                let params={tstart:this.value[0],tend:this.value[1],req_cycle:this.req_cycle,req_data:this.req_data,p:this.p,page:this.page,req_type:this.req_type};
                this.api.report_income_top({params}).then((res)=>{
                    this.xData3=res.data;
                    this.yData3=res.series;
                    this.pieImg(res.data,res.series);
                })
            },
            estimator(num,data){
                this.num=num;
                this.req_data = data;
                this.getPie();
                this.getSector();
            },
            dataTime(n,data){
                this.times = n;
                this.req_cycle=data;
                this.getPie();
                this.getSector();
            },
        },
    }
</script>

<style scoped>
    .top_tit{
        width:100%;
        height:112px;
        background:rgba(255,255,255,1);
        position: fixed;
        left: 256px;
        top: 64px;
        z-index: 99;
    }
    .content_table{
        margin-top:200px;
        padding: 0 24px;
        background:rgba(255,255,255,1);
    }
    .content_table2,.content_table3{
        margin-top: 24px;
        padding: 0 24px;
        background:rgba(255,255,255,1);
    }
    .content_table3{
        padding: 0 !important;
    }
    select{
        margin:28px 0 24px 0;
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    #across{
        width:100%;
        height:396px;
        background:rgba(247,249,252,1);
    }
    .content_table2_top{
        border-bottom:2px solid rgb(243, 244, 246);
        height: 50px;
    }
    .content_table2_top span{
        display: inline-block;
        cursor: pointer;
        padding: 10px;
        font-size:16px;
        color: #798294;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(121,130,148,1);
        line-height:24px;
        margin-top: 5px;
    }
    .right_top{
        display: inline-block;
        float: right;
    }
    #histogram{
        height: 285px;
        width: 844px;
    }
    #pie{
        width: 100%;
        height: 285px;
    }
    .btn_qs,.btn_wd{
        display: inline-block;
        width:96px;
        height:32px;
        color:rgba(121,130,148,1);
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        background:rgba(255,255,255,1);
        border-radius:4px 0px 0px 4px!important;
        border:1px solid rgba(210,213,219,1);
        line-height: 32px;
        text-align: center;
        cursor: pointer;
    }
    .btn_wd{
        border-radius:0px 4px 4px 0px!important;
    }
    .checked{
        border:1px solid rgba(51,119,255,1)!important;
        color:rgba(51,119,255,1)!important;
    }
    .trench,.ad{
        display:inline-block;
        width:80px;
        height:50px;
        line-height: 50px;
        text-align: center;
        font-size:16px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(121,130,148,1);
        cursor: pointer;
    }
    .trench{
       margin-left: 24px;
    }
    .checkeds{
        border-bottom: 2px solid rgba(52,118,255,1)!important;
        color:rgba(52,118,255,1)!important ;
    }
    .active{
        border-bottom: 2px solid rgba(52,118,255,1)!important;
        color:rgba(52,118,255,1)!important ;
    }
    .date{
        border-bottom: 2px solid rgba(52,118,255,1)!important;
        color:rgba(52,118,255,1)!important ;
    }
    .right_seach{
        display: inline-block;
        float: right;
        vertical-align: middle;
    }
    .more{
        display: inline-block;
        width:68px;
        height:32px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(210,214,212,1);
        cursor: pointer;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,119,255,1);
        line-height: 32px;
        text-align: center;
        margin:10px 24px 0 24px;
    }
    .upload{
        display: inline-block;
        cursor: pointer;
        width:68px;
        height:32px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:32px;
        text-align: center;
    }
</style>