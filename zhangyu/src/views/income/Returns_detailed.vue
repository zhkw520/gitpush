<template>
    <div>
        <div class="top_tit">
            <div class="tit_top_url">
                <span class="log_url">收益管理 &nbsp;/&nbsp;</span>
                <span class="log_ur">渠道收益</span>
            </div>
            <div class="tit_top_con">
                <span class="tit_name">渠道收益</span>
            </div>
        </div>
        <div class="content_table">
            <div class="content_table_top">
                <el-date-picker
                        v-model="value"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
                <span class="qd">渠道ID</span>
                <input type="text" placeholder="请输入渠道ID" v-model="channel_id"/>
                <span>业务场景</span>
                <select v-model="scene">
                    <option value="">全部</option>
                    <option v-for="item in typeList" :value="item.scene">{{item.scene}}</option>
                </select>
                <span>投放环境</span>
                <select v-model="put_env">
                    <option selected>
                        全部
                    </option>
                </select>
                <span class="cx" @click="getData()">查询</span>
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
                                prop="channel_id"
                                label="渠道ID"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="scene"
                                label="业务场景">
                            <template slot-scope="scope">
                                <span v-if="tableData[scope.$index].scene==''">-</span>
                                <span v-if="tableData[scope.$index].scene!=''">{{tableData[scope.$index].scene}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="put_env"
                                label="投放环境"
                        >
                            <template slot-scope="scope">
                                <span v-if="tableData[scope.$index].put_env==''">-</span>
                                <span v-if="tableData[scope.$index].put_env!=''">{{tableData[scope.$index].put_env}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="日活"
                        >
                            <template slot-scope="scope">
                                <span v-if="tableData[scope.$index].name==undefined">-</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="pv"
                                label="请求量">
                        </el-table-column> <el-table-column
                            prop="date"
                            label="请求频次"
                    >
                        <template slot-scope="scope">
                            <span v-if="tableData[scope.$index].name==undefined">-</span>
                        </template>
                    </el-table-column>
                        <el-table-column
                                prop="name"
                                label="填充率"
                        >
                            <template slot-scope="scope">
                                <span v-if="tableData[scope.$index].name==undefined">-</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="click"
                                label="点击量">
                        </el-table-column>
                        <el-table-column
                                prop="click_ratio"
                                label="点击率"
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
                        </el-table-column> <el-table-column
                            prop="pre_income"
                            label="预估流水"
                    >
                    </el-table-column>
                        <el-table-column
                                prop="income"
                                label="已出流水"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="cost"
                                label="成本">
                        </el-table-column> <el-table-column
                            prop="date"
                            label="利润率"
                    >
                        <template slot-scope="scope">
                            <span v-if="tableData[scope.$index].name==undefined">-</span>
                        </template>
                    </el-table-column>
                        <el-table-column
                                prop="name"
                                label="日活arpu值"
                               >
                            <template slot-scope="scope">
                                <span v-if="tableData[scope.$index].name==undefined">-</span>
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
        name: "returns_detailed",
        data(){
            return{
                channel_id:"",
                value:'',
                put_env:'',
                scene:"",
                p:10,
                page:1,
                total:0,
                tableData:[],
                typeList:[],
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
            this.getData();
        },
        methods:{
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:rgba(247,249,252,1);color:#1f2e4d;margin:0 24px;font-size:14px;font-weight:500;font-family:PingFang-SC-Medium;text-align: center;'
                } else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'margin:0 24px;color:#3d4966;font-size:14px;font-weight:400;font-family:PingFang-SC-Regular;text-align: center;'
            },
            getType(){
                this.api.report_config_scene({}).then((res)=>{
                    this.typeList=res;
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
                let params ={channel_id:this.channel_id,put_env:this.put_env,scene:this.scene,p:this.p,page:this.page,tstart:this.value[0],tend:this.value[1]}
                this.api.report_income_channel({params}).then((res)=>{
                    this.tableData = res.data;
                    this.total=res.total;
                    this. getType()
                })
            },
            remove(){
                this.channel_id='';
                this.value='';
                this.put_env='';
                this.scene='';
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
    .content_table_top{
        width: 100%;
        min-height:84px ;
        padding: 0 24px;
    }
    .content_table_top span{
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 20px;
    }
    .qd{
        margin-left: 44px;
    }
    input{
        width:190px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        padding: 0 5px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 28px;
    }
    select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-top: 25px;
        margin-right: 28px;
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
    }
</style>