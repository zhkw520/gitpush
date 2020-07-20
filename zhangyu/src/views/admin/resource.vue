<template>
    <div class="content_right">
        <div>
            <div class="block" style="display: inline-block">
                <el-date-picker
                        v-model="tdate"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy年MM月dd日"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
            </div>
            <span class="tit_text">获取次数:</span>
            <div class="select_check">
                <template>
                    <el-select
                            v-model="number"
                            multiple
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请选择文章标签">
                        <el-option
                                v-for="item in options5"
                                :key="item.hour"
                                :label="item.desc"
                                :value="item.hour">
                        </el-option>
                    </el-select>
                </template>
            </div>

            <span class="tit_text">SDK_ID:</span>
            <input type="text" placeholder="请输入sdkID查询" v-model="text"/>
            <span class="cx" @click="getList()">
                查询
            </span>
            <span class="reset" @click="resetRemove">重置</span>
            <span class="educe" >导出</span>
        </div>
        <div>
            <template>
                <el-table
                        :data="tableData"
                        style="width: 100%"
                        :header-cell-style="getRowClass"
                        :cell-style="cell"
                        border>
                    <el-table-column
                            prop="sdk_id"
                            label="SDK_ID">
                    </el-table-column>
                    <el-table-column
                            prop="pv"
                            sortable
                            label="数据访问量">
                    </el-table-column>
                    <el-table-column
                            prop="ratio"
                            sortable
                            label="访问占比">
                    </el-table-column>
                    <el-table-column
                            label="访问量趋势">
                        <template slot-scope="scope">
                            <img src="../../../public/img/datas.png" style="max-height: 40px;max-width: 80px" @click="getTendency(tableData[scope.$index].sdk_id)">
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="created_at"
                            sortable
                            label="内容获取时间">
                    </el-table-column>
                    <el-table-column
                            prop="had_replace"
                            sortable
                            label="替换资源数量">
                    </el-table-column>
                    <el-table-column
                            prop="sucess_ratio"
                            sortable
                            label="替换占比">
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            <el-button @click="getAdd(tableData[scope.$index].sdk_id)" type="text" size="small">查看详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <div class="blocks">
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
        <div class="bg" v-if="tendency" @click="heidTendency">
            <div id="myChart" @click.stop ref="myChart"></div>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        name: "replace",
        data(){
            return{
                tableData:[],
                tdate:(new Date()).toLocaleDateString().split('/').join('-'),
                total:0,
                search:'',
                page:1,
                p:10,
                text:'',
                number:[],
                options5:[],
                tendency:false,
            }
        },
        mounted(){
            this.getList();
            this.getTimes();
        },

        methods:{
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
                this. getList()
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this. getList()
            },
            resetRemove(){
                this.times='';
                this.number=[];
                this.text='';
            },
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:rgb(246, 245, 245,1);color:rgba(30,30,30,1);text-align:center;font-size:16px;font-weight:400;font-family:PingFang-SC-Regular;'
                } else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'text-align:center;color:#000;font-size:16px;font-weight:400;font-family:PingFang-SC-Regular;'
            },

            getList(){
                if(!this.text){
                    this.search=''
                }else{
                    var s = '{"'+'sdk_id' + '":"'+this.text + '"}';
                    this.search=s;
                }
                let params ={tdate:this.tdate,times:JSON.stringify(this.number),p:this.p,page:this.page,search:this.search};
                this.api.replace_sdk_overview({params}).then((res)=>{
                    this.tableData = res;
                    this.total=res.total;
                })
            },
            getTimes(){
                this.number=[];
                let params = {tdate:this.tdate};
                this.api.replace_times({params}).then((res)=>{
                   this.options5=res;
                   this.number.push(this.options5[this.options5.length-1].hour)
                })
            },
            getAdd(data){
                this.$router.push({
                    query:{
                        sdkid:data,
                        time:this.tdate,
                        num:JSON.stringify(this.number),

                    },
                    path:'./replace'
                })
            },
            getPv(sdk_id){
                var s = '{"'+'sdk_id' + '":"'+sdk_id + '"}';
                this.search=s;
                let params = {tdate:this.tdate,search:this.search};
                this.api.replace_sdk_graph({params}).then((res)=>{
                   let dataList = res;
                   let pv =[];
                   let hour =[];
                   for(var i=0;i<dataList.length;i++){
                       pv.push(dataList[i].pv);
                       hour.push(dataList[i].hour);
                   }
                    this.drawLine(pv,hour);
                })
            },
            getTendency(sdk_id){
                this.tendency=true;
                this.getPv(sdk_id);
            },
            heidTendency(){
                this.tendency=false;
            },
            drawLine(pv,hour){
                let myChart = echarts.init(document.getElementById('myChart'));
                var option = {
                    xAxis: {
                        type: 'category',
                        data:hour
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: pv,
                        type: 'line'
                    }]
                };
                myChart.setOption(option);
            }
        },
    }
</script>

<style scoped>
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.2);
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 999;
    }
    #myChart{
        max-width:600px ;
        max-height:400px ;
        position: relative;
        left: 50%;
        top:50%;transform: translate(-50%,-50%);
        background: #fff;
    }
    input,select{
        margin-left: 20px;
        width: 200px;
        height: 36px;
        padding-left: 10px;
    }
    input{
        height: 30px!important;
        font-size: 10px;
    }
    .content_right{
        width: 100%;
        padding: 24px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background: #fff;
    }

    .box_content div{
        margin-top: 20px;
    }
    .box_content span{
        display: inline-block;
        width: 150px;
        text-align: right;
        font-size: 16px;
        margin-right: 15px;
        line-height: 36px;
    }
    .box_content input{
        width: 200px;
        height: 36px;
        padding-left: 10px;
    }
    .cx,.educe,.reset{
        display: inline-block;
        height: 36px;
        line-height: 36px;
        width: 90px;
        cursor: pointer;
        border-radius: 5px;
        color: #f5f6fa;
        background: #4f4cf1 ;
        border: 0;
        text-align: center;
        margin:20px 0 20px 24px ;
    }
    .blocks{
        margin-top: 30px;
        float: right;
    }
    .tit_text{
        display: inline-block;
        font-size: 14px;
        font-weight: 400;
        font-family: "Microsoft YaHei";
        margin-left: 20px;
    }
    .select_check{
        display: inline-block;
        margin-left: 20px;
    }
    .educe,.reset{
        color: #3d3d3d!important;
        border: 1px solid #ddd!important;
        background: transparent!important;
    }
</style>