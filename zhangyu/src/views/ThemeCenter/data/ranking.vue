<template>
    <div>
        <div class="top">
            <span class="qj">排名数据</span>
            <span class="Section">维度</span>
            <select v-model="data_type">
                <option value="1">整日</option>
                <option value="2">整月</option>
            </select>
        </div>
        <div class="tabs">
            <div>
                <div>
                    <div class="date" v-if="data_type==2">
                        <el-date-picker
                                v-model="value1"
                                type="month"
                                placeholder="选择月">
                        </el-date-picker>
                    </div>
                    <div class="date" style="width: 225px" v-if="data_type==1">
                        <el-date-picker
                                v-model="value"
                                type="daterange"
                                range-separator="至"
                                format="yyyy-MM-dd"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                    <span class="nameTit">渠道</span>
                    <select v-model="channel">
                        <option v-for="item in channels" :value="item.channel">{{item.channel_name}}</option>
                    </select>
                    <span class="cx" @click="GetData()">查询</span>
                    <span class="cz" @click="CZ()">重置</span>
                    <span class="dc">导出</span>
                </div>
                <div>
                    <select v-model="order_by" style="margin: 0 24px 24px 24px" @change="GetData()">
                        <option value="download">下载量排名</option>
                        <option value="sales_amount">销售量排名</option>
                    </select>
                    <div :class="{actives:charge_type==0}" style="display: inline-block;margin-right: 80px">
                        <span class="all" @click="check('0')">全部</span>
                    </div>
                    <div :class="{actives:charge_type==1}" style="display: inline-block;margin-right: 80px">
                        <span class="all"  @click="check('1')">收费</span>
                    </div>
                    <div :class="{actives:charge_type==2}" style="display: inline-block;margin-right: 80px">
                        <span class="all"  @click="check('2')">免费</span>
                    </div>

                </div>
            </div>
            <div>
                <template v-if="this.data_type==2">
                    <el-table
                            :data="tableData"
                            style="width: 100%"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                    >
                        <el-table-column
                                prop="date"
                                label="排名"
                        >
                         <template slot-scope="scope">
                                    <span>{{scope.$index+1}}</span>
                                </template>
                        </el-table-column>
                        <el-table-column
                                prop="channel"
                                label="渠道">
                        </el-table-column>
                        <el-table-column
                        :show-overflow-tooltip="true"
                                prop="theme_name"
                                label="主题名称"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="type"
                                label="主题类型">
                        </el-table-column>

                        <el-table-column
                                prop="price"
                                label="单价">
                        </el-table-column>
                        <el-table-column
                                prop="click"
                                label="点击量">
                        </el-table-column>
                        <el-table-column
                                prop="ctr"
                                label="点击率">
                                 <template slot-scope="scope">
                                    <span>{{tableData[scope.$index].ctr}}%</span>
                                </template>
                        </el-table-column>
                        <el-table-column
                                prop="download"
                                label="下载量">
                        </el-table-column>
                        <el-table-column
                                prop="sales"
                                label="销售量">
                        </el-table-column>
                        <el-table-column
                                prop="cvr"
                                label="转化率">
                                 <template slot-scope="scope">
                                    <span>{{tableData[scope.$index].cvr}}%</span>
                                </template>
                        </el-table-column>
                        <el-table-column
                                prop="sales_amount"
                                label="销售额">
                        </el-table-column>
                        <el-table-column
                                prop="cost_channel"
                                label="渠道成本费">
                        </el-table-column>
                        <el-table-column
                                prop="bad_debt"
                                label="坏账">
                        </el-table-column>
                        <el-table-column
                                prop="tax"
                                label="扣税费">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="设计师成本费">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="利润">
                        </el-table-column>
                        <el-table-column
                        :show-overflow-tooltip="true"
                                prop="note"
                                label="备注">
                        </el-table-column>
                    </el-table>
                </template>
                <template v-if="this.data_type==1">
                    <el-table
                            :data="tableData"
                            style="width: 100%"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                    >
                        <el-table-column
                                prop="date"
                                label="排名"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="channel"
                                label="渠道">
                        </el-table-column>
                        <el-table-column
                                prop="theme_name"
                                label="主题名称"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="type"
                                label="主题类型">
                        </el-table-column>

                        <el-table-column
                                prop="price"
                                label="单价">
                        </el-table-column>
                        <el-table-column
                                prop="click"
                                label="点击量">
                        </el-table-column>
                        <el-table-column
                                prop="ctr"
                                label="点击率">
                        </el-table-column>
                        <el-table-column
                                prop="download"
                                label="下载量">
                        </el-table-column>
                        <el-table-column
                                prop="sales"
                                label="销售量">
                        </el-table-column>
                        <el-table-column
                                prop="cvr"
                                label="转化率">
                        </el-table-column>
                        <el-table-column
                                prop="sales_amount"
                                label="销售额">
                        </el-table-column>
                        <el-table-column
                                prop="note"
                                label="备注">
                        </el-table-column>
                    </el-table>
                </template>
            </div>
            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="page"
                        :page-size="p"
                        layout="prev, pager, next,total, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "all-data",
        data(){
            return{
                value:[],
                value1:"",
                tableData:[],
                data_type:"2",
                channels:[],
                channel:'',
                p:10,
                page:1,
                total:0,
                charge_type:'0',
                order_by:'download',
                direct:"ASC"
            }
        },
        mounted(){
            this.qd();
            this.GetData()
        },
        methods:{
            check(num){
                this.charge_type=num
            },
            CZ(){
                this.name='';
                this.channel='';
                this.type='';
                this.className='';
                this.value='';
            },
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:rgba(255,255,255,1);color:#1f2e4d;margin:0 24px;font-size:14px;font-weight:Medium;font-family:PingFang-SC-Regular;'
                } else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'margin:0 24px;color:#3d4966;font-size:14px;font-weight:400;font-family:PingFang-SC-Regular;'
            },

            qd(){
                this.api.themes_config_channel().then((res)=>{
                    this.channels=res;
                })
            },

            handleSizeChange(p) { // 每页条数切换
                this.p = p;
                this.GetData()
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.GetData()
            },
            GetData(){
                if(this.data_type==2){
                    var params={
                        charge_type:this.charge_type,data_type:this.data_type,channel:this.channel,tdate:this.value1,p:this.p,page:this.page,order_by:this.order_by,direct:this.direct
                    }
                }else{
                    var params={
                        charge_type:this.charge_type,data_type:this.data_type,channel:this.channel,tstart:this.value[0],tend:this.value[1],p:this.p,page:this.page,order_by:this.order_by,direct:this.direct
                    }
                }
                this.api.themes_report_rank({params}).then((res)=>{
                    this.tableData=res.data;
                    this.total=res.total;
                })
            }
        }
    }
</script>

<style scoped>
    .top{
        width: 100%!important;
        height:62px;
        background:rgba(255,255,255,1);
        position: fixed;
        left: 256px;
        top: 64px;
        z-index: 99;
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0,0)
    }
    .qj{
        display: inline-block;
        font-size:18px;
        font-family:PingFangSC-Medium,PingFangSC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin: 19px 10px 0 24px;
    }
    .Section{
        display: inline-block;
        font-size:12px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
    }
    .top select{
        border: none!important;
        font-size:12px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
    }
    .tabs{
        width: 100%;
        height:100%;
        background:rgba(255,255,255,1);
        border-radius:4px;
        margin-top: 145px;
    }
    .date{
        display: inline-block;
        width:145px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        margin: 24px;
    }
    .date .el-input__inner,.el-date-editor.el-input, .el-date-editor.el-input__inner{
        width: 100%!important;
    }
    .nameTit{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 24px;
    }
    .tabs input{
        width:190px;
        height:36px;
        padding-left: 10px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 24px;
    }
    .tabs select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 24px;
    }

    .cx,.cz,.dc{
        display: inline-block;
        line-height: 36px;
        text-align: center;
        cursor: pointer;
        width:68px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
        margin:0 20px 24px 0;
    }
    .cx{
        color: #fff!important;
        background:rgba(51,119,255,1)!important;
        border: none!important;
    }
    .actives{
        border-bottom: 1px solid #3377FF;

    }
    .actives span{
        color: #3377FF!important;
    }
    .all{
        display: inline-block;
        padding-bottom: 30px ;
        font-size:16px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,0.65);
        cursor: pointer;
    }
</style>