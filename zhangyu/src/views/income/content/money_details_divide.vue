<template>
   <div>
        <div class="top_name">
             <span class="top_txt" @click='fh(-3)'>素材付款&nbsp;/&nbsp;</span>
             <span class="top_txt" @click='fh(-2)'>分成管理&nbsp;/&nbsp;</span>
             <span class="top_txt" @click='fh(-1)'>分成详情&nbsp;/&nbsp;</span>
              <span class="top_txt">分成金额详情</span>
            <div class="title_left">
                <span>分成金额详情</span>
                <span class='time'>{{this.$route.query.tdate}}</span>
                <span class='time'>设计师ID：{{this.$route.query.open_id}}</span>
                <span class='time'>开户名：{{this.$route.query.account_name}}</span>
            </div>
        </div>
        <div class='content'>
            <div>
                <span class='fc_statuc'>项目ID</span>
                <input type="text" placeholder="请输入" v-model="project_id">
                <span class='fc_statuc' >素材名称ID</span>
                <input type="text" placeholder="请输入" v-model="material_name">
                <span class='fc_statuc'>素材类型</span>
                <select name="" id="">
                    <option value="">全部</option>
                </select>
                <span class='fc_statuc'>渠道</span>
                <select v-model='channel'>
                    <option value="">全部</option>
                    <option :value="item.channel" v-for="item in channels">{{item.channel_name}}</option>
                </select>
                <span class='fc_statuc'>结算方式</span>
                <select name="" id="">
                    <option value="">全部</option>
                </select>
                <div class="btn_right">
                    <span class='cx' @click='getDataList()'>查询</span>
                    <span @click='cz()'>重置</span>
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
                                label="项目ID" prop="project_id"
                                :show-overflow-tooltip="true"
                               >
                        </el-table-column>
                        <el-table-column
                            
                                label="素材ID" prop="material_name"
                                :show-overflow-tooltip="true"
                                >
                        </el-table-column>
                         <el-table-column
                                
                                label="素材类型" prop="fname"
                                :show-overflow-tooltip="true"
                                        >
                        </el-table-column>
                        <el-table-column
                                label="渠道" prop="channel"
                                >
                        </el-table-column>
                         <el-table-column
                                label="点击量" prop="channel"
                                >
                        </el-table-column>
                         <el-table-column
                                label="曝光量" prop="channel"
                                >
                        </el-table-column>
                        <el-table-column
                              
                                label="分成方式" prop="theme_name"
                                :show-overflow-tooltip="true"
                                >
                        </el-table-column>
                        <el-table-column
                                
                                label="分成价格" prop="call_show_name"
                                :show-overflow-tooltip="true"
                                        >
                                </el-table-column>
                         <el-table-column
                               
                                label="分成金额" prop="income"
                                >
                        </el-table-column>
                          <el-table-column
                                
                                label="加成比例" prop="sharing_rate"
                                >
                                <template slot-scope="scope">
                                    <span>{{tableData[scope.$index].sharing_rate+'%'}}</span>
                                </template>
                        </el-table-column>
                          <el-table-column
                                
                                label="加成金额" prop="final_income"
                                >
                        </el-table-column>
                          <el-table-column
                                
                                label="抵消预付金" prop="final_income"
                                >
                        </el-table-column>
                          <el-table-column
                                
                                label="付款金额" prop="final_income"
                                >
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
            data(){
                return{
                    value1:"",
                    p:10,
                    page:1,
                    total:0,
                    tableData:[{time:2020}],
                    show:false,
                    project_id:'',
                    material_name:'',
                    channels:[],
                    channel:''
                }
            },
            mounted(){
                this.getDataList()
            },
            methods:{
                fh(index){
                    this.$router.go(index)
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
                    this.getDataList()
                },
                handleCurrentChange(page) {//页码切换
                    this.page = page;
                    this.getDataList()
                },
                dr(){
                    this.$router.push({
                        path:"./exports"
                    })
                },
                jeqr(){
                    this.show=true;

                },
                heid(){
                    this.show=false
                },
                cz(){
                    this.project_id='';
                    this.material_name='';
                    this.channel=''
                },
                getDataList(){
                    var params={}
                    if(this.$route.query.num){
                         params={type:this.$route.query.type,tdate:this.$route.query.tdate,open_id:this.$route.query.open_id,project_id:this.project_id,p:this.p,page:this.page,is_confirmed:'1'}   
                    }else{
                        params={type:this.$route.query.type,tdate:this.$route.query.tdate,open_id:this.$route.query.open_id,project_id:this.project_id,p:this.p,page:this.page}   
                    }
                   
                    this.api.sharing_data_income_detail({params}).then((res)=>{
                        this.total=res.total;
                        this.tableData=res.data;
                        this. qd();
                    })
                },
                 qd(){
                    this.api.themes_config_channel().then((res)=>{
                        this.channels=res;
                    })
                },
            },
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
        cursor: pointer;
    }
    .content{
        margin-top: 199px;
    }  
    .times{
        display: inline-block;
        margin: 24px;
    }
    .times .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width:200px!important
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
        margin:0 0 24px 24px;

            
    }
    .cx{
        color: #fff!important;
        border:0!important;
        background: #3377ff!important;
    }
    .fc_statuc{
        display: inline-block;
        margin:24px  15px 24px 24px;

    }
    select{
        width: 150px;
        height: 36px;

    }
    input{
        width: 190px;
        height: 30px;
        padding-left: 10px;
    }
    .time{
        display: inline-block;
        padding: 3px 5px;
        background: #ddd;
        border-radius: 3px;
        margin: 0 16px;
        font-size: 14px!important;
        font-weight: 400!important;
        
    }
</style>