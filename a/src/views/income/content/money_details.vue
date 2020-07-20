<template>
   <div>
        <div class="top_name">
             <span class="top_txt" @click='fh(-1)'>素材付款&nbsp;/&nbsp;金额详情</span>
            <div class="title_left">
                <span>金额详情</span>
                <span class='time'></span>
                <div>
                    <span class='md' :class="{clicks:this.num==1}" @click='data("1")'>买断数据</span>
                    <span class='fc' :class="{clicks:this.num==2}" @click='data("2")'>分成数据</span>
                </div>
            </div>
        </div>
        <div class='content'>
            <div>
                <span class='fc_statuc' style="margin:24px 16px 24px 24px " v-if='num==1'>项目ID</span>
                <input type="text" v-if='num==1' v-model="project_id">
                <span class='fc_statuc' style="margin:24px 16px 24px 24px " v-if='state1==""'>设计师ID</span>
                <input type="text" v-model="id" v-if='state1==""'  @change="sJsID()">
                <span class='fc_statuc' style="margin:24px 16px 24px 24px " v-if='id==""'>结算方</span>
                <el-autocomplete
                v-if='id==""'
                    class="inline-input"
                    v-model="state1"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入内容"
                    @select="handleSelect"
                    >
                </el-autocomplete>
                <div class="btn_right">
                    <span class='cx' @click='getDataList()'>查询</span>
                    <span @click='cz()'>重置</span>
                </div>      
            </div>
           <div>
                  <template v-if="num==2">
                    <el-table
                            :data="tableData"
                            header-align="center"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            style="width: 100%;color:#000">
                        <el-table-column
                                label="设计师ID" prop="open_id"
                               >
                        </el-table-column>
                         <el-table-column
                                label="分成金额" prop="final_income"
                                >
                        </el-table-column>
                         <el-table-column
                                label="加成比例" prop="gain_share_rate"
                                >
                                <template slot-scope="scope">
                                    <span>{{tableData[scope.$index].gain_share_rate+'%'}}</span>
                                </template>
                        </el-table-column>
                        <el-table-column
                                
                                label="加成金额" prop="gain_share_income"
                                >
                        </el-table-column>
                         <!-- <el-table-column
                                label="结算金额" prop="total_income"
                                >
                        </el-table-column> -->
                         <el-table-column
                               
                                label="抵消预约金" prop="advance_payment_income"
                                >
                        </el-table-column>
                          <el-table-column
                                
                                label="付款金额" prop="payment_income"
                                >
                        </el-table-column>
                          <el-table-column
                                
                                label="付款时间" prop="updated_at"
                                >
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="props">
                                <el-button type="text" @click="ck()" >查看详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
                  <template v-if="num==1">
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
                                label="设计师ID" prop="open_id"
                                :show-overflow-tooltip="true"
                               >
                        </el-table-column>
                        <el-table-column
                                label="买断金额" prop="buyout_income"
                                >
                        </el-table-column>
                         <el-table-column
                                label="加成比例" prop="gain_share_rate"
                                >
                                <template slot-scope="scope">
                                    <span>{{tableData[scope.$index].gain_share_rate+'%'}}</span>
                                </template>
                        </el-table-column>
                       
                        <el-table-column
                                sortable
                                label="加成金额" prop="gain_share_income"
                                >
                        </el-table-column>
                         
                        <el-table-column 
                                label="付款金额" prop='total_income'>
                            
                        </el-table-column>
                        <el-table-column 
                                label="付款时间" prop='created_at'>
                            
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
                    p:10,
                    page:1,
                    total:0,
                    tableData:[{open_id:2020}],
                    list:[],
                    num:1,
                    account_name:"",
                    open_id:"",
                    project_id:"",
                    restaurants: [],
                    state1:"",
                    id:"",

                }
            },
            mounted(){
                this.getDataList()
            },
            methods:{
                cz(){
                   this.project_id='';
                   this.open_id='';
                   this.state1='';
                   this.id=''
                },
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
                details(){
                    this.$router.push({
                        path:"./Divided_details"
                    })
                },
                 ck(){
                    this.$router.push({
                        path:"./money_details_divide",
                        query:{
                          
                        }
                    })
                },
                getDataList(){
                    // if(this.num==1){
                    //     let params={type:this.$route.query.type,tdate:this.$route.query.tdate,open_id:this.open_id,account_name:this.account_name,project_id:this.project_id,p:this.p,page:this.page,is_confirmed:'1'} 
                    //     this.api.ds_buyout_income_detail({params}).then((res)=>{
                    //         this.total=res.total;
                    //         this.tableData=res.data;
                    //         this.getData();
                    //    })
                    // }
                    // if(this.num==2){
                    //     let params={type:this.$route.query.type,tdate:this.$route.query.tdate,open_id:this.open_id,account_name:this.account_name,p:this.p,page:this.page,is_confirmed:'1'}
                    //     this.api.sharing_data_income_designer({params}).then((res)=>{
                    //         this.total=res.total;
                    //         this.tableData=res.data;
                    //         this.getData();
                    //     })
                    // }
                    
                },
                getData(){
                    this.api.designer_settlement_list().then((res)=>{
                        this.restaurants=res;
                    })
                },
                data(index){
                    this.num=index;
                    this.getDataList()
                },
                querySearch(queryString, cb) {
                    for(var i =0;i<this.restaurants.length;i++){
                        if(this.restaurants[i].contribute_type==1){
                            this.restaurants[i].value=this.restaurants[i].name+this.restaurants[i].id_card
                        }
                        if(this.restaurants[i].contribute_type==2){
                            this.restaurants[i].value=this.restaurants[i].company_name+this.restaurants[i].code
                        }
                    }
                    var results = queryString ? this.restaurants.filter(this.createFilter(queryString)) : this.restaurants;
                    cb(results);
                },
                createFilter(queryString) {
                    return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                    };
                },
                handleSelect(item) {
                    this.open_id=item.open_id
                },
                 sJsID(){
                    this.open_id=this.id;
                },
            },
            watch:{
                state1:function(val,oldVal){
                    if(val==''){
                        this.open_id=''
                    }
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
        font-weight:bold;
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
        margin-left: 24px;
            
    }
    .cx{
        color: #fff!important;
        border:0!important;
        background: #3377ff!important;
    }
    .fc_statuc{
        display: inline-block;
        margin-right: 15px;

    }
    select{
        width: 200px;
        height: 36px;

    }
    input{
        width: 190px;
        height: 30px;
        padding-left: 10px;
    }
    .md,.fc{
        font-size: 14px!important;
        font-weight: 400!important;
        margin-right: 16px;
        display: inline-block;
        line-height: 36px;
        cursor: pointer;
    }
    .clicks{
        border-bottom: 1px solid #3377ff;
        color:#3377ff!important
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