<template>
    <div>
        <div class="top_name">
            <span class="top_txt">结算管理\设计师结算</span>
            <div class="title_left">
                <span>设计师结算</span>
            </div>
        </div>
        <div class="content">
            <div class="filtrate">
                <div class="timesDate">
                    <el-date-picker
                            v-model="time"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd ">
                    </el-date-picker>
                </div>
                <div>
                    <span class="time_tit" style="margin-left: 43px">用户ID</span>
                    <input type="text" placeholder="请输入用户ID"/>
                </div>
                <div>
                    <span class="time_tit">用户昵称</span>
                    <input type="text" placeholder="请输入用户昵称"/>
                </div>
                <span class="dc">导出数据</span>
            </div>
            <div class="sum">
                <div>
                    <span>提现金额</span>
                    <input type="text" placeholder="单位：元"/>
                    <span class="or">至</span>
                    <input type="text" placeholder="单位：元"/>
                </div>
                <div class="zh">
                    <span>账号主体</span>
                    <select>
                        <option value="1">个人</option>
                        <option value="2">公司</option>
                    </select>
                </div>
                <div>
                    <span>状态</span>
                    <select>
                        <option value="0">待处理</option>
                        <option value="1">已通过</option>
                        <option value="-1">已驳回</option>
                    </select>

                </div>
                <div>
                    <span class="cx" @click="getDataList()">查询</span>
                </div>
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
                                label="用户ID" prop="open_id"
                               >
                        </el-table-column>
                        <el-table-column
                                label="用户昵称" prop="account_name"
                                >
                        </el-table-column>
                        <el-table-column
                                label="用户类别" prop="contributor_type"
                                >
                            <template slot-scope="scope">
                                <span>{{tableData[scope.$index].contributor_type==1?'个人':'公司'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="提现金额" prop="cash_money"
                                >
                        </el-table-column>
                        <el-table-column
                                label="纳税金额" prop="tax_money"
                                >
                        </el-table-column>
                        <el-table-column
                                label="税后金额" prop="after_tax_money"
                                >
                        </el-table-column>
                        <el-table-column
                                label="银行账户名" prop="account_name"
                               >
                        </el-table-column>
                        <el-table-column
                                label="开户银行" prop="bank_name"
                                >
                        </el-table-column>
                        <el-table-column
                                label="开户行" prop="bank_subbranch"
                                >
                        </el-table-column>
                        <el-table-column
                                label="状态" prop="endtime"
                                >
                            <template slot-scope="scope">
                                <span>{{tableData[scope.$index].isfinish==0?'待处理':tableData[scope.$index].isfinish==1?'已通过':'已驳回'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="props">
                                <el-button type="text" @click="jump(tableData[props.$index])">查看详情</el-button>
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
    export default {
        name: "settlement",
        data(){
            return{
                time:'',
                tableData:[],
                total:0,
                page:1,
                p:10,
            }
        },
        mounted(){
            this.getDataList()
        },
        methods:{
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
                 this.getDataList()
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                 this.getDataList()
            },
            getDataList(){
                if(this.time.length>0){
                    var params ={p:this.p,page:this.page,demand_type:'demand_apply',start_time:this.time[0],end_time:this.time[1]}
                }else{
                    var params ={p:this.p,page:this.page,demand_type:'demand_apply',start_time:"",end_time:""}
                }
                this.api.demand_search({params}).then((res)=>{
                    this.tableData = res.data;
                    this.total = res.total;
                })
            },
            jump(data){
                this.$router.push({
                    query:{
                        data:data,
                    },
                    path:"/income/money_details"
                })
            }
        }
    }
</script>

<style scoped>
    .top_name{
        height:112px!important;
        background:rgba(255,255,255,1);
    }
    .title_left span{
        display: inline-block;
        font-size:20px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(50,50,50,1);
        margin-left: 24px;
        text-align: right;
    }
    .top_txt{
        display: inline-block;
        margin-left: 24px;
    }
    .content{
        margin-top: 199px!important;
    }
    .timesDate{
        display: inline-block;
        margin:24px 0 28px 24px!important;
    }
    .filtrate div{
        display: inline-block;
        margin-right: 44px;
    }
    .time_tit{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 24px;
        line-height: 36px;
    }
    .filtrate input{
        width:190px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        padding-left: 10px;
    }

    .dc{
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
    .sum{margin:0 24px 24px 24px}
    .sum div{
        display: inline-block;
        margin-right: 44px;
    }
    .sum input{
        width:88px;
        height:36px;
        padding-left: 8px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .sum span{
        width: 56px;
        display: inline-block;
        line-height: 36px;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 24px;
        text-align: right;
    }
    .sum select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        padding-left: 10px;
        border:1px solid rgba(211,219,235,1);
    }
    .or{
        width: 34px!important;
        text-align: center!important;
        margin-right: 0!important;
    }
    .zh{
         margin-left: 30px;
    }
    .cx{
        display: inline-block;
        width:68px!important;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1)!important;
        line-height: 36px;
        text-align: center!important;
        cursor: pointer;
    }
   .timesDate .el-input__inner{
       line-height:normal!important;
   }
</style>