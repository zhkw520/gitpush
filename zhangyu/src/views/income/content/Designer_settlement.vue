<template>
   <div>
        <div class="top_name">
            <div class="title_left">
                <span>设计师线下结算</span>
            </div>
        </div>
        <div class='content'>
            <div>
                 <div class='times'>
                    <el-date-picker
                        v-model="tdate"
                        type="month"
                        format="yyyy-MM"
                        value-format="yyyy-MM"
                        placeholder="选择月">
                    </el-date-picker>
                </div>
                <div class="btn_right">
                    <span @click='add()'>新建</span>
                    <!-- <span @click='jump()'>操作记录</span> -->
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
                                label="结算周期" prop="tdate"
                               >
                        </el-table-column>
                        <el-table-column
                                label="结算金额" prop="total_amount"
                                >
                        </el-table-column>
                        <el-table-column
                                label="备注" prop="remark"
                                >
                        </el-table-column>
                        <el-table-column
                                label="更新时间" prop="updated_at"
                                >
                        </el-table-column>
                         <el-table-column
                                label="操作人员" prop="updated"
                                >
                        </el-table-column>
                        <el-table-column label="操作" width="150">
                            <template slot-scope="props" >
                                <el-button type="text" @click='xq(tableData[props.$index].record_id)'>查看详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
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
        </div>
   </div>
</template>

<script>
export default {
    props:['type'],
            data(){
                return{
                    tdate:'',
                    p:10,
                    page:1,
                    total:0,
                    tableData:[{time:2020}]
                }
            },
            mounted(){
               this.getData()
            },
            methods:{
                add(){
                    this.$router.push({
                        path:"./Designer_ADD"
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
                    this.getData()
                },
                handleCurrentChange(page) {//页码切换
                    this.page = page;
                    this.getData()
                },
                // jump(){
                //     this.$router.push({
                //         path:"./Designer_record"
                //     })
                // },
               
                xq(data){
                   this.$router.push({
                       path:"./look_details",
                       query:{
                           record_id:data
                       }
                   })
                },
                getData(){
                    let params={tdate:this.tdate,p:this.p,page:this.page}
                    this.api.ds_offline_settlement_record_list({params}).then((res)=>{
                        this.total=res.total;
                        this.tableData=res.data;
                    })
                },
            },
}
</script>

<style scoped>
      .top_name{
        height:90px!important;
        background:rgba(255,255,255,1);
    } 
    .title_left span{
        display: inline-block;
        font-size:20px;
        font-family:PingFang-SC-Medium;
        font-weight:bold;
        color:rgba(50,50,50,1);
        margin-left: 24px;
        text-align: right;
        margin-top:30px
    }
    .content{
        margin-top: 173px;
    }  
    .times{
        display: inline-block;
        margin: 24px;
    }
    .times .el-input__inner{
        width:300px!important
    }
    .btn_right{
        display: inline-block;
        float:right;
        margin: 24px 24px 0 0;
    }
    .btn_right span{
        display: inline-block;
        cursor: pointer;
        width: 90px;
        height: 36px;
        border: 1px solid #ddd;
        border-radius: 3px;
        line-height: 36px;
        text-align: center;
        margin-left: 24px;
            
    }
    .cx{
        color: #fff!important;
        border:0!important;
        background: #3377ff!important;
    }
   
</style>