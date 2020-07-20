<template>
   <div>
        <div class="top_name">
             <span class="top_txt" @click='fh(-2)'>{{this.$route.query.type=='1'?'主题付款':'来电秀付款'}}&nbsp;/&nbsp;</span>
             <span class="top_txt" @click='fh(-1)'>分成管理&nbsp;/&nbsp;</span>
              <span class="top_txt">分成详情</span>
            <div class="title_left">
                <span>分成详情</span>
                <span class='time'>{{this.$route.query.tdate}}</span>
                <span class='zt' :class='{red:this.status==0}'>({{this.status==0?"未确认":"已确认"}})</span>
            </div>
        </div>
        <div class='content'>
            <div>
                <span class='fc_statuc'>设计师ID</span>
                <input type="text" v-model="open_id" placeholder="请输入">
                <span class='fc_statuc'>结算方</span>
                 <el-autocomplete
                    class="inline-input"
                    v-model="state1"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入内容"
                    @select="handleSelect"
                    >
                </el-autocomplete>
                <div class="btn_right">
                    <span class='cx' @click='getDataList()'>查询</span>
                    <span class='cz
                    ' @click='cz()'>重置</span>
                    <span @click='jeqr()' v-if='this.status==0'>确认金额</span>
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
                                label="设计师ID" prop="open_id"
                                :show-overflow-tooltip="true"
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
                                sortable
                                label="加成金额" prop="gain_share_income"
                                >
                        </el-table-column>
                         <el-table-column
                                label="结算金额" prop="total_income"
                                >
                        </el-table-column>
                         <el-table-column
                                sortable
                                label="抵消预约金" prop="advance_payment_income"
                                >
                        </el-table-column>
                          <el-table-column
                                sortable
                                label="付款金额" prop="payment_income"
                                >
                        </el-table-column>
                          <el-table-column
                                v-if='this.$route.query.status!=0'
                                sortable
                                label="付款时间" prop="updated_at"
                                >
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="props">
                                <el-button type="text" @click="ck(tableData[props.$index].open_id,tableData[props.$index].account_name)" >查看详情</el-button>
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
        <div class='bg' v-if='show'>
            <div class='qrbox'>
                    <div class='tit_name'>
                        <span>确认金额</span>
                    </div>
                    <div class='lr'>
                        <span>提交后，将根据该结算金额给狮圈儿用户账户内，是否确认？</span>
                    </div>
                    <div class='btns'>
                        <span class='qr' @click='qrMoney()'>确认</span>
                        <span @click='heid()'>取消</span>
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
                    list:[],
                    account_name:'',
                    open_id:"",
                    state1:"",
                    status:''
                }
            },
            mounted(){
                this.getDataList()
            },
            methods:{
                fh(index){
                    this.$router.go(index)
                },
                getDetails(){
                    let params={type:this.$route.query.type,tdate:this.$route.query.tdate}
                    this.api.sharing_data_income_is_confirm({params}).then((res)=>{
                        this.status=res.is_confirmed;
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
                ck(id,account_name){
                    this.$router.push({
                        path:"./Divided_details_money",
                        query:{
                            type:this.$route.query.type,
                            open_id:id,
                            tdate:this.$route.query.tdate,
                            account_name:account_name
                        }
                    })
                },
                getDataList(){
                    let params={type:this.$route.query.type,tdate:this.$route.query.tdate,open_id:this.open_id,account_name:this.account_name,p:this.p,page:this.page}
                    this.api.sharing_data_income_designer({params}).then((res)=>{
                        this.total=res.total;
                        this.tableData=res.data;
                        this.getData();
                        this.getDetails()
                    })
                },
                getData(){
                    this.api.designer_settlement_list().then((res)=>{
                        this.restaurants=res;

                    })
                },
                cz(){
                    this.account_name='';
                    this.open_id=''
                },
                qrMoney(){
                    let formData =new FormData;
                    formData.append('type',this.$route.query.type);
                    formData.append('tdate',this.$route.query.tdate);
                    this.api.sharing_data_income_confirm(formData).then((res)=>{
                        if(res!=false){
                            this.getDetails()
                            this.heid()
                        }
                    })
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
                    this.account_name=item.open_id
                }
            },
             watch:{
                state1:function(val,oldVal){
                    if(val==''){
                        this.account_name=''
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
        width: 200px;
        height: 36px;

    }
    input{
        width: 190px;
        height: 30px;
        padding-left: 10px;
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
    .qrbox{
        width: 450px;
        height: 200px;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        border-radius: 3px;
        background: #fff;
    }
    .tit_name{
        width: 100%;
        height: 40px;
        border:1px solid #ddd;
    }
    .tit_name span{
        display: inline-block;
        margin-left: 24px;
        line-height: 40px;
        font-size: 14px;
        font-weight: bold;
    }
    .lr{
        margin: 30px 24px 30px 24px;
    }
    .lr span{
        margin-left: 24px;
        font-size: 14px;
    }
    .btns{
        float:right;
    }
    .btns span{
            width: 90px;
            height: 36px;
            display: inline-block;
            border:1px solid #ddd;
            text-align: center;
            line-height: 36px;
            border-radius: 3px;
            margin-right: 24px;
            cursor: pointer;
    }
    .qr{
        background: #3377ff;
        border:0px!important;
        color:#fff;

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
    .zt{
       font-size: 14px!important;
        font-weight: 400!important; 
    }
    .red{
        color: red;
    }
</style>