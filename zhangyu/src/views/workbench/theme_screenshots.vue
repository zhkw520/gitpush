<template>
    <div>
        <div>
            <div class="top_name">
                <span class="top_txt">官方物料投放库&nbsp;/&nbsp;截图物料审核</span>
                <div class="title_left">
                    <span>截图物料审核</span>
                </div>
            </div>
        </div>
         <div class="content">
            <div style="padding: 24px 0">
                <div class="tit_cx" style="padding: 0 24px">
                    <span class="tit_name">包名</span>
                    <input type="text" placeholder="请输入包名" v-model="pkg_name"/>
                    <span class="tit_name">状态</span>
                    <select v-model="status">
                        <option value="">全部</option>
                        <option value="0">未处理</option>
                        <option value="1">已处理</option>
                    </select>
                    <span class="cx" @click="getList()">查询</span>
                </div>
                <template>
                    <el-table
                            :data="tableData"
                            header-align="center"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            stripe
                            style="width: 100%">
                        <el-table-column
                                prop="pkg_name"
                                label="包名"
                                :show-overflow-tooltip="true"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="req_pv"
                                label="请求量"
                                sortable
                        >
                        </el-table-column>
                        <el-table-column
                                prop="status_name"
                                label="开屏状态"
                        >
                            <template slot-scope="scope">
                                <span class="red" v-if="tableData[scope.$index].status==0">{{tableData[scope.$index].status_name}}</span>
                                <span  v-if="tableData[scope.$index].status==1">{{tableData[scope.$index].status_name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column                              
                                prop="updated_at"
                                label="更新时间"
                                sortable
                        >
                        </el-table-column>
                        <el-table-column
                                prop="operator"
                                label="操作人员"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" size="small"  @click="jump(scope.$index)">查看详情</el-button>
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
    </div>
</template>

<script>
export default {
    data(){
        return{
            pkg_name:"",
            status:"",
            tableData:[],
            p:10,
            page:1,
            total:0,
        }
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
                this.getList()
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.getList()
            },
            getList(){
                let params = {pkg_name:this.pkg_name,status:this.status,p:this.p,page:this.page};
                this.api.appad_pkg_check_list({params}).then((res)=>{
                    this.tableData=res.data;
                    this.total=res.total;
                })
            },
            jump(index){
                this.$router.push({
                    path:"theme_screenshots_xq",
                    query:{
                        pkg_name:this.tableData[index].pkg_name,

                    }

                })
            },
    },
    mounted(){
            this.getList();
        },

}
</script>

<style scoped>

    .red{color: red}
    .top_name{height: 112px}
    .content{
        margin-top: 200px;
    }
    .top_txt,.title_left span{
        margin-left: 24px;
    }
    .tit_cx{
        margin-bottom: 24px;
    }
    .tit_cx input{
        width:190px;
        height:36px;
        padding-left: 10px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 34px;
    }
    .tit_cx select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 24px;
    }
    .tit_name{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 24px;
    }
    .cx{
        display: inline-block;
        width:68px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        line-height: 36px;
        text-align: center;
        cursor: pointer;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);
    }
    .right_btn{
        display: inline-block;
        float: right;
        margin-right: 20%;
         margin-top: -30px
    }
    .right_btn span{
        display: inline-block;
        text-align: center;
        cursor: pointer;
        width: 120px;
        height: 36px;
        line-height: 40px;
        border-radius: 3px;
        color: #fff;
        background: #3377ff;
        font-size: 14px;
       
    }
</style>