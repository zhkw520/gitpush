<template>
    <div>
        <div class="top_name">
            <span class="top_txt">收益管理/设计师成本管理</span>
            <div class="title_left" @click="fh">
                <img src="../../../public/img/fh.png">
                <span>分成详情</span>
            </div>
        </div>
        <div class="content">
            <div>
                <div class="timesDate">
                    <el-date-picker
                            v-model="time"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd ">
                    </el-date-picker>
                </div>
                <span class="cx" @click="dataList">查询</span>
                <span class="cz" @click="remove">重置</span>
                <span class="dc">导出数据</span>
                <span class="ts">数据推送</span>
                <span class="fc" @click="divide">分成管理</span>
            </div>
            <div id="flowChart">

            </div>
            <div>
                <template>
                    <el-table
                            :data="tableData"
                            header-align="center"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            style="width: 100%;color:#000">
                        <el-table-column
                                label="日期" prop="create_time"
                        >
                        </el-table-column>
                        <el-table-column
                                label="分成总价格(XY)" prop="cost_total"
                        >
                        </el-table-column>
                        <el-table-column
                                label="实际分成金额(X)" prop="cost_real"
                        >
                        </el-table-column>
                        <el-table-column
                                label="回流金额(Y)" prop="cost_backflow"
                        >
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="props">
                                <el-button type="text" @click="jump()">查看详情</el-button>
                            </template>
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
        name: "cost_management",
        data(){
            return{
                time:[],
                tableData:[{did:1}],
                p:10,
                page:1,
                total:0,
                xData:[],
                yData:[],
                tData:[],
            }
        },
        mounted(){

            var qt = (new Date((new Date()).getTime() - 15*24*60*60*1000)).toLocaleDateString().split('/');
            if(Number(qt[1])<10){
                qt[1]=(0).toString()+qt[1]

            }
            var next = (new Date()).toLocaleDateString().split('/');
            if(Number(next[1])<10){
                next[1]=(0).toString()+next[1]
            }
            console.log(qt)
            this.time=[qt.join('-'),next.join('-')];
            this.dataList()
        },
        methods:{
            remove(){
                this.time=[];
            },
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:rgba(247,249,252,1);color:rgba(31,46,77,1);text-align:center;font-size:14px;font-weight:500;font-family:PingFang-SC-Medium;height:56px'
                } else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'text-align:center;color:rgba(61,73,102,1);font-size:14px;font-weight:400;font-family:PingFangSC-Regula;'
            },
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
                this.dataList()
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.dataList()
            },
            fh(){
                this.$router.go(-1)
            },
            jump(){
                this.$router.push({
                    path:'/income/data_details'
                })
            },
            dataList(){
                let params = {tstart:this.time[0],tend:this.time[1],p:this.p,page:this.page};
                this.api.report_cost_sharing({params}).then((res)=>{
                    this.tableData=res.data;
                    this.imgs()
                    this.total=res.total;
                })
            },
            divide(){
                this.$router.push({
                    path:'/income/divided_management'
                })
            },
            imgs(){
                let params={tstart:this.time[0],tend:this.time[1]};
                this.api.report_cost_sharing_chart({params}).then((res)=>{
                    this.xData=res.series;
                    this.yData=res.xAxis;
                    var arr=[];
                    for(var i=0;i<res.series.length;i++){
                        arr.push(res.series[i].name);
                    }
                    this.tData=arr;
                    this.Chart(res.xAxis,res.series,this.tData)
                })
            },
            Chart(){
                canvas.chart(this.xData,this.yData,this.tData)
            },
        },
    }
</script>

<style scoped>
    .top_name{
        height:112px!important;
        background:rgba(255,255,255,1);
    }
    .title_left img{
        width: 12px;
        margin-left: 24px;
    }
    .title_left span{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,119,255,1);
        margin-left: 8px;
    }
    .top_txt{
        display: inline-block;
        margin-left: 24px;
        font-size: 12px!important;
    }
    .content{
        margin-top: 199px!important;
    }
    .timesDate{
        display: inline-block;
        margin:24px 0 28px 24px!important;
    }
    .cx{
        display: inline-block;
        width:68px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1)!important;
        line-height:36px;
        text-align: center;
        cursor: pointer;
        margin:0 24px;
    }
    .cz{
        display: inline-block;
        width:68px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(232,234,237,1);
        cursor: pointer;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(31,46,77,1);
        line-height:36px;
        text-align: center;
    }
    .fc,.ts,.dc{
        display: inline-block;
        width:96px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        float: right;
        margin: 24px 24px 0 0;
    }
    #flowChart{
        width: 100%;
        height:300px;
        margin-bottom: 30px;
    }
</style>