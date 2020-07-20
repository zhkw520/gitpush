<template>
    <div>
        <div class="top_tit">
            <div class="tit_top_url">
                <span class="log_url">收益管理 &nbsp;/&nbsp;</span>
                <span class="log_url">广告主收益</span>
            </div>
            <div class="tit_top_con">
                <span class="tit_name">广告主收益</span>
            </div>
        </div>
        <div class="content_table">
            <div style="margin-bottom: 24px;padding: 0 24px;">
                <el-date-picker
                        v-model="value"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
                <span class="ad">广告主</span>
                <input type="text" placeholder="请输入广告主名称" v-model="admaster"/>
                <span class="cx" @click="getDataList">查询</span>
                <span class="cz" @click="remove()">重置</span>
                <span class="dc">导出数据</span>
            </div>
            <div>
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
                                prop="admaster"
                                label="广告主"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="pv"
                                label="展现量">
                        </el-table-column>
                        <el-table-column
                                prop="click"
                                label="点击量"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="click_ratio"
                                label="点击率"
                                :show-overflow-tooltip="true"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="pre_income"
                                label="预估流水">
                        </el-table-column> <el-table-column
                            prop="income"
                            label="已出流水"
                            :show-overflow-tooltip="true"
                    >
                    </el-table-column>
                        <el-table-column
                                prop="ecpm"
                                label="ECPM"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="ecpc"
                                label="ECPC">
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
    export default {
        name: "advertiser",
        data(){
            return{
                value:'',
                admaster:'',
                tableData:[],
                p:10,
                page:1,
                total:0,
            }
        },
        mounted(){
            this.getDataList();
        },
        methods:{
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
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
                this.getDataList()
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.getDataList()
            },
            getDataList(){
                let params = {tstart:this.value[0],tend:this.value[1],p:this.p,page:this.page,admaster:this.admaster}
                this.api.report_income_admaster({params}).then((res)=>{
                    this.tableData=res.data;
                    this.total=res.total;
                })
            },
            remove(){
                this.value='';
                this.admaster=''
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
        background:rgba(255,255,255,1);
    }
    .ad{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin: 0 24px 0 44px;
    }
    input{
        width:190px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        padding: 0 5px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 28px;
        margin-top: 24px;
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
        margin-right: 24px;
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
    .dc{
        display: inline-block;
        width:96px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        cursor: pointer;
        text-align: center;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1)!important;
        line-height:36px;
        float: right;
        margin: 24px 24px 0 0 ;
    }
</style>