<template>
    <div>
        <div class="top_name">
            <span class="top_txt" @click='fh(-1)'>广告收款结算 /  合作公司管理</span>
            <div class="title_left">
                <span>合作公司管理</span>
            </div>
        </div>
        <div class="content">
            <div class="sum">
                <input type="text" placeholder="搜索关键词" v-model="search">
                <div class='btn_box'>
                    <span class="cx" @click="getDataList()">查询</span>
                    <span @click='cz()'>重置</span>
                    <span @click='add("1")'>新建</span>
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
                                label="ID" prop="company_id"
                               >
                        </el-table-column>
                        <el-table-column
                                label="合作公司名称" prop="name"
                                >
                        </el-table-column>
                       
                        <el-table-column
                                label="更新时间" prop="updated_at"
                                >
                        </el-table-column>
                        <el-table-column
                                label="操作人员" prop="updator"
                                >
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="props">
                                <el-button type="text"  @click='add("2",tableData[props.$index].name,tableData[props.$index].company_id)'>编辑</el-button>
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
        </div>
        <div class='bg' v-if='show'>
            <div class='contents_box'>
                 <div class='tit_name'>
                    <span v-if="this.index==1">新建合作公司</span>
                    <span  v-if="this.index==2">编辑合作公司</span>
                </div>
                <div class='oldName'>
                    <span>名称：</span>
                    <input type="text" v-model="company_name">
                </div>
                <div class='btns'>
                    <span class='qd' @click='addOrEitd()'>确定</span>
                    <span @click='heid()'>取消</span>
                </div>
            </div>
           
        </div>
    </div>
</template>

<script>
    export default {
        name: "settlement",
        data(){
            return{
                tableData:[],
                total:0,
                page:1,
                p:10,
                show:false,
                index:'',
                company_name:"",
                search:"",
                company_id:"",
            }
        },
        mounted(){
            this.getDataList()
        },
        methods:{
            cz(){
                this.search=''
            },
            add(index,data,company_id){
                this.show=true;
                this.index=index;
                if(data){
                    this.company_name=data;
                    this.company_id=company_id
                }
            },
            heid(){
                this.show=false;
                this.index='';
                this.company_name=''
                this.company_id=''
                
            },
            fh(index){
                this.$router.go(index)
            },
            addOrEitd(){
                if(!this.company_name){
                    this.$message.error('名称不能为空');
                    return
                }
                if(this.index==1){
                     let formData=new FormData;
                    formData.append('company_name',this.company_name)
                    this.api.adproject_adcompany_add(formData).then((res)=>{
                        if(res!=false){
                            this.heid()
                            this.getDataList()
                        }
                    })
                }else{
                     let formData=new FormData;
                    formData.append('company_name',this.company_name);
                    formData.append('company_id',this.company_id)
                    this.api.adproject_adcompany_edit(formData).then((res)=>{
                         if(res!=false){
                            this.heid()
                            this.getDataList()
                        }
                    })
                }
                
                
            },
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:rgba(247,249,252,1);color:rgba(31,46,77,1);text-align:center;font-size:14px;font-weight:blod;font-family:PingFang-SC-Medium;height:56px'
                } else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'text-align:center;color:rgba(61,73,102,1);font-size:14px;font-weight:400;font-family:PingFangSC-Regula;'
            },
             handleSizeChange(p) { // 每页条数切换
                this.p = p;
                this.getDataList()
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.getDataList()
            },
            getDataList(){
                let params={p:this.p,page:this.page,search:this.search}
                this.api.adproject_adcompany_listpage({params}).then((res)=>{
                       this.total=res.total;
                       this.tableData=res.data; 
                })
            },
            jump(data){
                this.$router.push({
                    query:{
                        data:data,
                    },
                    path:"/income/money_details"
                })
            }
        }
    }
</script>

<style scoped>
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        z-index: 9;
        bottom: 0;
        right: 0;
    }
    .contents_box{
        width: 400px;
        height: 200px;
        position: absolute;
        top:30%;
        left: 50%;
        transform: translate(-50%,-50%);
        background: #fff;
        border-radius: 5px;
    }
    .tit_name{
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #ddd;
    }
    .tit_name span{
        font-size: 14px;
        font-weight: bold;
        display: inline-block;
        margin-left: 24px;
        line-height: 50px;
    }
    .oldName span{
        display: inline-block;
        margin-left: 24px;
    }
    .oldName input{
        width: 190px;
        height: 36px;
        padding-left: 10px;
        margin-top: 30px;
    }
    .btns span{
        display: inline-block;
        width: 90px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        border:1px solid #ddd;
        margin-top: 24px;
        cursor: pointer;
        border-radius: 3px;
        margin-left: 24px;

    }
    .qd{
        background: #3377ff;
        border:0!important;
        color:#fff!important
    }
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
        margin-top: 199px!important;
    }
    .timesDate{
        display: inline-block;
        margin:24px 0 28px 24px!important;
    }
    .filtrate div{
        display: inline-block;
        margin-right: 44px;
    }
    .time_tit{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 24px;
        line-height: 36px;
    }
    .filtrate input{
        width:190px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        padding-left: 10px;
    }

    .dc{
        display: inline-block;
        width:96px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        float: right;
        margin: 24px 24px 0 0;
    }
    .sum{margin:0 24px 24px 24px}
    .btn_box{
        display: inline-block;
        float:right;
        margin-right: 24px;
    }
    .btn_box span{
        width: 90px!important;
        height: 36px;
        display: inline-block;
        border:1px solid #ddd;
        text-align: center!important;
        line-height: 36px;
        cursor: pointer;
        margin-left: 24px;
        border-radius: 3px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        margin-top: 24px;
    }
    .sum input{
        width:200px;
        height:36px;
        padding-left: 8px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-top: 24px;
    }
    .sum>span{
        width: 56px;
        display: inline-block;
        line-height: 36px;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 24px;
        text-align: right;
    }
    .sum select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        padding-left: 10px;
        border:1px solid rgba(211,219,235,1);
    }
    .or{
        width: 34px!important;
        text-align: center!important;
        margin-right: 0!important;
    }
    .zh{
         margin-left: 30px;
    }
    .cx{
       
        background:rgba(51,119,255,1)!important;
        color:rgba(255,255,255,1)!important;
        border:0!important
    }
   .timesDate .el-input__inner{
       line-height:normal!important;
   }
</style>