<template>
    <div>
        <div class="top_tit">
            <div class="tit_top_url">
                <span class="log_url">素材数据&nbsp;/&nbsp;</span>
                <span class="new_url">物料数据</span>
            </div>
            <div class="tit_top_con">
                <span class="tit_name">物料数据</span>
            </div>
        </div>
        <div class="content_table">
            <div class="nav">
                <el-date-picker
                        v-model="tdate"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
                <span class="name" style="margin-left: 20px">物料ID</span>
                <input type='text' v-model="mfid"/>
                <span class="name">物料类型</span>
                <select v-model="type">
                    <option value="">全部</option>
                    <option value="1">广告图</option>
                    <option value="2">广告模板</option>
                    <option value="3">杂志锁屏</option>
                </select>
                <span class="name">广告ID</span>
                <input type='text' v-model="ad_id"/>
                <span class="dc">导出数据</span>
            </div>
            <div class="nav nav_left">
                <span class="name name_left">项目名称</span>
                <input type="text" v-model="ad_name"/>
                <span class="name">广告主</span>
                <input type="text" v-model="admaster"/>
                <span class="name">广告名称</span>
                <input type="text" v-model="project"/>
                <span class="name">渠道ID</span>
                <input type="text" v-model="channel_id"/>
            </div>
            <div class="nav nav_left">
                <span class="name name_left">业务场景</span>
                <select v-model="scene">
                    <option value="">全部</option>
                    <option v-for="item in typeList" :value="item.scene">{{item.scene}}</option>
                </select>
                <span class="name">广告位类型</span>
                <select v-model="ad_space_type">
                    <option value="">全部</option>
                    <option v-for="item in adList" :value="item.ad_space_type">{{item.ad_space_type}}</option>
                </select>
                <span class="name">广告位ID</span>
                <input type="text" v-model="ad_space_id"/>
                <span class="name">投放环境</span>
                <select v-model="put_env">
                    <option>全部</option>
                </select>
                <span class="inquire" @click="dataList()">查询</span>
                <span class="reset" @click="remove">重置</span>
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
                                width="100"
                                :show-overflow-tooltip="true"
                               >
                        </el-table-column>
                        <el-table-column
                                prop="mfid"
                                :show-overflow-tooltip="true"
                                label="物料ID"
                                >
                        </el-table-column>
                        <el-table-column
                                prop="type_name"
                                label="物料类型">
                        </el-table-column>
                        <el-table-column
                                prop="ad_id"
                                label="广告ID"
                                :show-overflow-tooltip="true"
                               >
                            <template slot-scope="scope">
                                <span v-if="tableData[scope.$index].ad_id==''">-</span>
                                <span v-if="tableData[scope.$index].ad_id!=''">{{tableData[scope.$index].ad_id}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="ad_name"
                                label="广告名称"
                                :show-overflow-tooltip="true"
                               >
                            <template slot-scope="scope">
                                <span v-if="tableData[scope.$index].ad_name==''">-</span>
                                <span v-if="tableData[scope.$index].ad_name!=''">{{tableData[scope.$index].ad_name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="admaster"
                                :show-overflow-tooltip="true"
                                label="广告主">
                            <template slot-scope="scope">
                                <span v-if="tableData[scope.$index].admaster==''">-</span>
                                <span v-if="tableData[scope.$index].admaster!=''">{{tableData[scope.$index].admaster}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="project"
                            label="项目名称"
                            :show-overflow-tooltip="true"
                           >
                            <template slot-scope="scope">
                                <span v-if="tableData[scope.$index].project==''">-</span>
                                <span v-if="tableData[scope.$index].project!=''">{{tableData[scope.$index].project}}</span>
                            </template>
                    </el-table-column>
                        <el-table-column
                                prop="channel_id"
                                label="渠道ID"
                                >
                            <template slot-scope="scope">
                                <span v-if="tableData[scope.$index].channel_id==''">-</span>
                                <span v-if="tableData[scope.$index].channel_id!=''">{{tableData[scope.$index].channel_id}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="scene"
                                label="业务类型">
                            <template slot-scope="scope">
                                <span v-if="tableData[scope.$index].scene==''">-</span>
                                <span v-if="tableData[scope.$index].scene!=''">{{tableData[scope.$index].scene}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="ad_space_type"
                            label="广告位类型"
                           >
                            <template slot-scope="scope">
                                <span v-if="tableData[scope.$index].ad_space_type==''">-</span>
                                <span v-if="tableData[scope.$index].ad_space_type!=''">{{tableData[scope.$index].ad_space_type}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="ad_space_type"
                                label="广告位ID"
                        >
                            <template slot-scope="scope">
                                <span v-if="tableData[scope.$index].ad_space_id==''">-</span>
                                <span v-if="tableData[scope.$index].ad_space_id!=''">{{tableData[scope.$index].ad_space_id}}</span>
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
                                prop="pv"
                                sortable
                                label="展示量">
                        </el-table-column> <el-table-column
                            prop="click"
                            label="点击量"
                            sortable
                           >
                    </el-table-column>
                        <el-table-column
                                prop="click_ratio"
                                sortable
                                label="点击率"
                                >
                            <template slot-scope="scope">
                                <span v-if="tableData[scope.$index].click_ratio==''">-</span>
                                <span v-if="tableData[scope.$index].click_ratio!=''">{{tableData[scope.$index].click_ratio}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="income"
                                sortable
                                label="已出流水">
                        </el-table-column> <el-table-column
                            prop="ecpm"
                            sortable
                            label="ECPM"
                           >
                    </el-table-column>
                        <el-table-column
                                prop="ecpc"
                                sortable
                                label="ECPC"
                               >
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button @click="CkwL(tableData[scope.$index].mfid)">
                                    查看素材
                                </el-button>
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

        name: "material_data",
        data(){
            return{
                tdate:'',
                tableData:[{name:'aaa'}],
                mfid:"",
                type:"",
                ad_id:"",
                ad_name:'',
                admaster:"",
                project:"",
                channel_id:'',
                scene:'',
                ad_space_type:'',
                ad_space_id:'',
                put_env:'',
                page:1,
                p:10,
                total:0,
                typeList:[],
                adList:[]
            }
        },
        mounted(){
            this.dataList();
        },
        methods:{
            remove(){
                this.tdate='';
                this.mfid='';
                this.type='';
                this.ad_id='';
                this.ad_name='';
                this.admaster='';
                this.project='';
                this.channel_id='';
                this.scene='';
                this.ad_space_type='';
                this.ad_space_id='';
                this.put_env='';
            },
            getType(){
                this.api.report_config_scene({}).then((res)=>{
                    this.typeList=res;
                    this.adType()
                })
            },
            adType(){
                this.api.report_config_adspace_type({}).then((res)=>{
                    this.adList=res;
                })
            },
            handleSizeChange(p) { // 每页条数切换
              this.p = p;
              this.dataList()
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.dataList()
            },
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:rgba(247,249,252,1);color:#1f2e4d;margin:0 24px;font-size:14px;font-weight:500;font-family:PingFang-SC-Medium;'
                } else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'margin:0 24px;color:#3d4966;font-size:14px;font-weight:400;font-family:PingFang-SC-Regular;'
            },
            CkwL(id){
                this.$router.push({
                    path:"./Material_related",
                    query:{
                        mfid:id
                    }
                })
            },
            dataList(){
                let params = {tstart:this.tdate[0],tend:this.tdate[1],mfid:this.mfid,type:this.type,ad_id:this.ad_id,ad_name:this.ad_name,
                    admaster:this.admaster,project:this.project,channel_id:this.channel_id,scene:this.scene,ad_space_type:this.ad_space_type,
                    ad_space_id:this.ad_space_id,put_env:this.put_env,page:this.page,p:this.p};
                this.api.report_mfinal({params}).then((res)=>{
                        this.tableData=res.data;
                        this.total=res.total;
                        this. getType();
                })
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
    input{
        width:190px;
        height:26px;
        padding: 5px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-left: 20px;
        margin-top: 24px;
    }
    select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-left: 20px;
    }
    .name{
        display: inline-block;
        width:70px;
        height:20px;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        line-height:20px;
        text-align: right;
        margin-left: 45px;
    }
    .nav{
        margin:0 24px;
    }
    .nav_left{
        margin-left: 17px!important;
    }
    .name_left{
        margin-left: 0!important;
    }
    .dc{
        display: inline-block;
        float: right;
        width:96px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        text-align: center;
        line-height: 36px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        margin-top: 24px;
        cursor: pointer;
    }
    .reset,.inquire{
        display: inline-block;
        width:68px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(232,234,237,1);
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(31,46,77,1);
        text-align: center;
        line-height: 36px;
        cursor: pointer;
    }
    .inquire{
        margin: 0 24px 24px 24px;
        border: 0!important;
        background:rgba(51,119,255,1)!important;
        color:rgba(255,255,255,1)!important;
    }
</style>