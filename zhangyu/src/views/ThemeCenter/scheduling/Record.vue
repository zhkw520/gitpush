<template>
    <div>
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="fh(-2)">排期管理&nbsp;/&nbsp;</span>
                <span class="log_url" @click="fh(-1)">排期详情&nbsp;/&nbsp;</span>
                <span class="new_url">变更记录</span>
            </div>
            <div>
                <span class="topName">变更记录</span>
            </div>
        </div>
        <div class="seach">
            <div class="date">
                <el-date-picker
                        class="date1"
                        v-model="time"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                >
                </el-date-picker>
                <span class="cx" @click="getData()">查询</span>
            </div>
        </div>
        <div style="margin-top: 24px;background: #fff;padding:24px ">
            <template>
                <el-table
                        :data="tableData"
                        style="width: 100%"
                        :header-cell-style="getRowClass"
                        :cell-style="cell">
                    <el-table-column
                            prop="updated_at"
                            label="更新时间"
                            sortable
                           >
                    </el-table-column>
                    <el-table-column
                            prop="creator"
                            label="操作人"
                            >
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="jump(tableData[scope.$index])">查看详情</el-button>
                        </template>
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
</template>

<script>
    export default {
        name: "record",
        data(){
            return{
                time:[],
                tableData:[{updated_at:'0'}],
                p:10,
                page:1,
                total:0,
            }
        },
        mounted(){
            this.getData()
        },
        methods:{
            fh(num){
              this.$router.go(num)
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
            jump(data){
                this.$router.push({
                    path:"./xqDetails",
                    query:{
                        data:data,
                        schedule_id:this.$route.query.schedule_id,
                        record:1,
                    }
                })
            },
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
                this.getData()
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.getData()
            },
            getData(){
                let params={schedule_id:this.$route.query.schedule_id,tstart:this.time[0],tend:this.time[1]};
                this.api.themes_schedule_demands_history({params}).then((res)=>{
                    this.tableData=res.data;
                    this.total=res.total;
                })
            },
        }
    }
</script>

<style scoped>
    .top{
        width: 100%;
        height:87px;
        background: rgba(255,255,255,1);
        position: fixed;
        left: 256px;
        top: 64px;
        z-index: 99;
    }
    .topName{
        display: inline-block;
        font-size:18px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-left: 24px;
        margin-right: 10px;
        line-height: 45px;
    }
    .titName span{
        display: inline-block;
        margin: 0 0 20px 24px;
    }
    .new_url{
        color: rgba(61,73,102,1)!important;
    }
    .date1{
        margin: 24px 0 24px 24px;
    }
    .date1 .el-input__inner{
        border: none;
    }
    .seach{
        margin-top: 168px;
        background: #fff;
    }
    .cx{
        display: inline-block;
        width: 96px;
        height: 36px;
        background: rgba(51,119,255,1);
        border-radius: 4px;
        font-size: 14px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(255,255,255,1);
        line-height: 36px;
        text-align: center;
        float: right;
        margin-right: 24px;
        margin-top: 24px;
    }
</style>