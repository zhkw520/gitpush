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
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd ">
                    </el-date-picker>
                </div>
                <span>素材ID</span>
                <input type="text" placeholder="请输入素材ID" v-model="mid"/>
                <span>渠道ID</span>
                <input type="text" placeholder="请输入渠道ID" v-model="channel_id"/>
                <span class="gg_left">广告位ID</span>
                <input type="text" placeholder="请输入广告位ID" v-model="ad_space_id"/>
            </div>
            <div class="bottom">
                <span class="id_left">广告ID</span>
                <input type="text" placeholder="请输入广告ID" v-model="ad_id"/>
                <span class="span_btn" @click="dataList()">查询</span>
                <span class="cz" @click="remove()">重置</span>
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
                                label="素材ID" prop="mid"
                        >
                        </el-table-column>
                        <el-table-column
                                label="渠道ID" prop="channel_id">

                        </el-table-column>
                        <el-table-column
                                label="有效率" prop="status"
                        >
                        </el-table-column>
                        <el-table-column
                                label="广告位ID" prop="ad_space_id"
                        >
                        </el-table-column>
                        <el-table-column
                                label="广告ID" prop="ad_id"
                        >
                        </el-table-column>
                        <el-table-column
                                label="有效展示量" prop="pv"
                        >
                        </el-table-column>
                        <el-table-column
                                label="有效点击量" prop="click"
                        >
                        </el-table-column>
                        <el-table-column
                                label="结算方式" prop="sharing_type"
                        >
                        </el-table-column>
                        <el-table-column
                                label="分成总价值" prop="total_sharing"
                        >
                        </el-table-column>
                        <el-table-column
                                label="实际成交金额" prop="sharing"
                        >
                        </el-table-column>
                        <el-table-column
                                label="回流金额" prop="inner_sharing"
                        >
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
        name: "data_details",
        data(){
            return{
                time:[],
                tableData:[{status:2}],
                channel_id:'',
                mid:'',
                ad_space_id:'',
                ad_id:'',
                p:10,
                page:1,
                total:0
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
            this.time=[qt.join('-'),next.join('-')];
            this.dataList()
        },
        methods:{
            remove(){
                this.mid='';
                this.time=[];
                this.channel_id='';
                this.ad_space_id='';
                this.ad_id='';
            },
            fh(){
                this.$router.go(-1)
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
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
            },
            dataList(){
                let params={tstart:this.time[0],tend:this.time[1],mid:this.mid,channel_id:this.channel_id,ad_space_id:this.ad_space_id,ad_id:this.id,p:this.p,page:this.page};
                this.api.report_sharing_material({params}).then((res)=>{
                    this.tableData=res.data;
                    this.total=res.total;
                })
            },
        }
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
        margin:24px  44px 24px 24px;
    }
    .content span{
        display: inline-block;
        margin-right: 24px;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
    }
    .content input{
        margin-right: 44px;
        width:190px;
        height:36px;
        padding-left: 10px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .gg_left{
        margin-left: 24px;
    }
    .id_left{
        margin-left: 40px;
    }
    .span_btn{
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
        cursor: pointer;
    }
    .bottom{
        margin-bottom: 24px;
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
</style>