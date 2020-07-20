<template>
    <div>
        <div class="top">
            <span class="topName">排期管理</span>
            <div>
                <div class="selTime">
                    <el-date-picker
                            v-model="time"
                            @change="getData()"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                </div>
                <span class="upLock" @click="getADD('')">新建排期</span>
            </div>

        </div>
        <div class="seach">
            <template>
                <el-table
                        :header-cell-style="getRowClass"
                        :cell-style="cell"
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column
                            prop="name"
                            label="排期计划名称"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="cycle"
                            label="周期"
                    >
                        <template slot-scope="scope">
                            <span style="color: rgb(61, 73, 102);font-size: 14px;font-weight: 400;font-family: PingFang-SC-Regular;">{{tableData[scope.$index].tstart+'至'+tableData[scope.$index].tend}}</span>

                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="pv"
                            label="进度(实际/计划)">
                            <template slot-scope="scope">
                            <span >{{tableData[scope.$index].real_count+'/'+ tableData[scope.$index].total}}</span>

                        </template>
                    </el-table-column>
                
                    <el-table-column
                            prop="creator"
                            label="创建人"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="updated_at"
                            label="最后更新时间"
                            :show-overflow-tooltip="true"
                    >
                    </el-table-column>

                    <el-table-column
                            prop="ecpc"
                            label="操作">
                        <template slot-scope="scope">
                            <span style="font-size:14px;font-family:PingFang-SC-Medium,PingFang-SC;font-weight:500;color:rgba(51,119,255,1);margin-right: 24px;cursor: pointer" @click="getADD(tableData[scope.$index].schedule_id)">编辑</span>
                            <span style="font-size:14px;font-family:PingFang-SC-Medium,PingFang-SC;font-weight:500;color:rgba(51,119,255,1);cursor: pointer" @click="jump(tableData[scope.$index])">查看详情</span>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
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
        <div class="bg" v-if="add">
            <div class="newData">
                <div>
                    <span class="tit_top" v-if="this.id==''">新建排期</span>
                    <span class="tit_top"  v-if="this.id!=''">编辑排期</span>
                </div>
                <div>
                    <span class="tit_name">排期计划名称</span>
                    <input type="text" placeholder="请输入" v-model="name"/>
                </div>
                <div>
                    <span class="tit_name1">排期周期</span>
                    <div class="date">
                        <el-date-picker
                                class="date1"
                                v-model="date"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd"
                        >
                        </el-date-picker>
                    </div>
                    <div class="ADDbtn">
                        <span class="tj" @click="ADDdata()">保存</span>
                        <span @click="heidADD()">取消</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "scheduling_management",
        data(){
            return{
                time:[],
                page:1,
                p:10,
                total:0,
                id:'',
                tableData:[],
                date:[],
                add:false,
                name:'',
            }
        },
        mounted(){
            this.getData();
        },
        methods:{
            getADD(id){
                this.id=id;
                this.add=true;
            },
            jump(data){
                this.$router.push({
                    path:'./details',
                    query:{
                        name:data.name,
                        schedule_id:data.schedule_id,
                        tstart:data.tstart,
                        tend:data.tend,
                        real_count:data.real_count,
                        total:data.total,
                    }
                })
            },
            heidADD(){
                this.add=false;
                this.id='';
                this.name='';
            },
            setData(){
                if(!this.name){
                    this.$message.error('名称不能为空')
                    return
                }
                if(this.date==[]){
                    this.$message.error('时间范围不能为空')
                    return
                }
                let formData = new FormData;
                formData.append('schedule_id',this.id);
                formData.append('name',this.name);
                formData.append('tstart',this.date[0]);
                formData.append('tend',this.date[1]);
                this.api.themes_schedule_edit(formData).then((res)=>{
                    this.name='';
                    this.date=[];
                    this.heidADD();
                    this.getData();
                })
            },
            ADDdata(){
                if(this.id!=''){
                    this.setData();
                    return
                }
                if(!this.name){
                    this.$message.error('名称不能为空')
                    return
                }
                if(this.date==[]){
                    this.$message.error('时间范围不能为空')
                    return
                }
                let formData = new FormData;
                formData.append('name',this.name);
                formData.append('tstart',this.date[0]);
                formData.append('tend',this.date[1]);
                this.api.themes_schedule_add(formData).then((res)=>{
                    this.name='';
                    this.date=[];
                    this.heidADD();
                    this.getData();
                })
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
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
            },
            getData(){
                let params={tstart:this.time[0],tend:this.time[1],search:'',p:this.p,page:this.page};
                this.api.themes_schedule_schedules({params}).then((res)=>{
                    this.tableData=res.data;
                    this.total=res.total;
                })
            },
        }
    }
</script>

<style scoped>
    .top{
        width:100%;
        height:120px;
        background:rgba(255,255,255,1);
        position: fixed;
        left: 256px;
        top: 64px;
        z-index: 99;
    }
    .topName{
        margin-left: 24px;
        margin-top: 19px;
        display: block;
        font-size:18px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
    }
    .selTime{
        margin-top: 20px;
        display: inline-block;
        width:272px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        display: inline-block;
        margin-left: 24px;
    }
    .selTime .el-date-editor{width: 100%}
    .upLock{
        margin-right: 15%;
        float: right;
        display: inline-block;
        width:96px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);
        cursor: pointer;
        text-align: center;
        line-height: 36px;
    }
    .seach{
        background:rgba(255,255,255,1);
        border-radius:4px;
        margin-top: 200px;
        margin-bottom: 24px;
    }
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        z-index: 9;
        bottom: 0;
        right: 0;
    }
    .newData{
        width:460px;
        height:255px;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 6px 0px rgba(0,0,0,0.06);
        border-radius:4px;
        position: relative;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
    .tit_top{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Medium,PingFangSC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin: 21px 0 24px 20px;
    }
    .tit_name{
        width: 104px;
        text-align: right;
        margin: 0 12px 0px 0px;
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
    }
    input{
        width:262px;
        height:36px;
        padding-left: 10px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-bottom: 20px;
    }
    .tit_name1{
        width: 104px;
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        text-align: right;
        margin: 0 12px 0px 0px;
    }
    .date{
        display: inline-block;
        width:272px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        margin-bottom: 40px
    }
    .date1{width: 100%}
    .date1 .el-input__inner{
        border: none;
    }
    .ADDbtn{
        text-align: center;
    }
    .ADDbtn span{
        display: inline-block;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        width:80px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
    }
    .tj{
        background:rgba(51,119,255,1)!important;
        color: #fff!important;
        border: none!important;
        margin-right: 20px;
    }
</style>