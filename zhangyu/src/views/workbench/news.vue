<template>
    <div>
        <div class="top_name">
            <span class="top_txt">TX新闻模板管理</span>
        </div>  
        <div class='screen'>
            <span>模板ID：</span>
            <input type="text" v-model="tid">
            <span>模板名称：</span>
            <input type="text" v-model="name">
            <span>尺寸：</span>
            <select v-model="size" @change="sizeBig()">
                <option value="">全部</option>
                <option :value="index" v-for='(item,index) in sizeList'>{{item.size}}</option>
            </select>
            <span>状态：</span>
            <select name="" id="" v-model="status">
                <option value="">全部</option>
                <option value="0">禁用</option>
                <option value="1">启用</option>
            </select>
            <div class='btnsName'>
                <span class='cx' @click='getDate()'>查询</span>
                <span @click='cz()'>重置</span>
                <span @click='addNews("1")'>新增模板</span>
            </div>
        </div>
        <div class='tables'>
            <template>
                    <el-table
                            ref="tab"
                            :data="tableData"
                            style="width: 100%"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            >
                         <el-table-column
                                prop="tid"
                                label="模板ID">
                        </el-table-column>
                         <el-table-column
                                prop="name"
                                label="模板名称">
                        </el-table-column>
                        <el-table-column
                                prop="count"    
                                label="尺寸">
                                <template slot-scope="scope">
                                    <span v-if='tableData[scope.$index].width'>{{tableData[scope.$index].width+'*'+tableData[scope.$index].height}}</span>
                                </template>
                        </el-table-column>
                         <el-table-column
                                prop="status"
                                label="状态">
                                  <template slot-scope="scope">
                                    <span >{{tableData[scope.$index].status==1?'启用':'禁用'}}</span>
                                </template>
                        </el-table-column>
                         <el-table-column
                                prop="updated_at"
                                label="更新时间">
                        </el-table-column>
                         <el-table-column
                                prop="updator"
                                label="操作人员">
                        </el-table-column>
                         <el-table-column
                                prop="status"
                                label="操作">
                                <template slot-scope="scope">
                                        <el-button type='text' @click='addNews("0",tableData[scope.$index].tid)'>查看详情</el-button>
                                </template>
                        </el-table-column>
                    </el-table>
            </template>
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
   data () {
     return {
             page:1,
            p:10,
            total:0,
            tableData:[{status:'还行'}],
            tid:"",
            name:'',
            status:"",
            sizeList:[],
            size:'',
            width:"",
            height:""
     }
   },
   mounted(){
       this.getDate()
   },
   methods:{
       getDate(){
           let params={p:this.p,page:this.page,tid:this.tid,name:this.name,status:this.status,width:this.width,height:this.height}
           this.api.template_search({params}).then((res)=>{
               this.total=res.total;
               this.tableData=res.data
               this.getSize()
           })
       },
       cz(){
           this.tid=""
           this.status=''
           this.name='',
           this.size='',
           this.width=''
           this.height=''
       },
       sizeBig(){
           this.width=this.sizeList[this.size].width;
           this.height=this.sizeList[this.size].height;
           console.log(this.width)
       },
        getRowClass({row, column, rowIndex}) {
            if (rowIndex === 0) {
                return 'background:#f7f9fc;color:#1F2E4D;font-size:14px;font-weight:bold;height:48px;font-family:PingFang-SC-Regular;padding:20px 0px 20px 14px'
            } 
            else {
                return ''
            }
        },
        cell({row, column, rowIndex, columnIndex}){
                return 'padding:15px 14px;color:#3d4966;font-size:14px;font-weight:400;font-family:PingFang-SC-Regular;'
        },
        getSize(){
            this.api.template_config_size().then((res)=>{
                this.sizeList=res
            })
        },
        handleSizeChange(p) { // 每页条数切换
             this.p = p;
             this.getDate()   
        },
        handleCurrentChange(page) {//页码切换
            this.page = page;
            this.getDate()      
        }, 
        addNews(index,tid){
            this.$router.push({
                path:"./news_add",
                query:{
                    num:index,
                    tid:tid
                }
            })
        }
   },
   components: {

   }
 }
</script>

<style scoped>
  .top_name{
        height: 62px;
        border: 0;
    }
 .top_txt{
    margin-left: 24px;
    font-size:18px;
    font-family:PingFang-SC;
    font-weight:500;
    line-height:62px ;
    color:rgba(31,46,77,1);
}
.screen{
    margin-top: 145px;
    background: #fff;
    height: 100px;
}
.screen span{
    margin:0 10px 0 24px;
    font-size: 14px;
    line-height: 100px;
}
.screen input{
    width: 200px;
    height: 32px;
    padding-left: 5px;
    border-radius: 3px;
}
.screen select{
    width: 120px;
    height: 36px;
    border-radius: 3px;
}
.btnsName{
    float: right;
    margin-right: 24px;
}
.btnsName span{
    width:90px;
    height: 36px;
    text-align: center;
    line-height: 36px;
    cursor: pointer;
    font-size: 14px;
    border:1px solid #ddd;
    display: inline-block;
    border-radius: 3px;
    margin-top: 30px;
}
.cx{
    color: #fff;
    background: #3377ff!important;
    border:0!important
}
.tables{
    margin-top: 24px;
    background: #fff;
    padding:24px
}
</style>
