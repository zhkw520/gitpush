
<template>
<div>
    <div>
           <div class="titl">
            <div style="margin:24px 0 20px 24px">
                <span style="color: #b3b3b3;cursor: pointer " @click="fh()">资源替换管理 </span>
                <span style="color: #1890ff;">&nbsp;/&nbsp;操作记录</span>
            </div>
            <div>
                <span class="titl_name">操作记录</span>
            </div>
        </div>
    </div>
    <div class='base'>
        <span>日期：</span>
         <div class="date">
                <el-date-picker
                    v-model="date"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
        </div>
        <span>操作人员：</span>
        <input type="text">
        <span>操作类型：</span>
        <select>
            <option value="导入原始数据">导入原始数据</option>
            <option value="导出替换数据">导出替换数据</option>
            <option value="导入结果数据">导入结果数据</option>
            <option value="编辑内容">编辑内容</option>
        </select>
        <div class='operation'>
             <span class='cx'>查询</span>
              <span>重置</span>
        </div>
        <div style="margin:24px 0">
         <template>
                    <el-table
                            ref="tab"
                            :data="tableData"
                            style="width: 100%"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            >
                         <el-table-column
                                prop="count"
                                label="更新时间">
                        </el-table-column>
                         <el-table-column
                                prop="count"
                                label="操作人员">
                        </el-table-column>
                        <el-table-column
                                prop="count"    
                                label="操作类型">
                        </el-table-column>
                         <el-table-column
                                prop="status"
                                label="相关内容">
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

components: {},
data() {

return {
        date:"",
        page:1,
        p:10,
        total:0,
        tableData:[],
};
},

methods: {
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
        handleSizeChange(p) { // 每页条数切换
             this.p = p;
                
        },
        handleCurrentChange(page) {//页码切换
            this.page = page;
                
        }, 
        fh(){
            this.$router.go(-1)
        },
},

mounted() {

},

}
</script>
<style scoped>

   .titl{
        width: 100%;
        height: 100px;
        border-top: 3px solid #ededed;
        background: #fff;
        -webkit-box-shadow: 0 0 6px 0 rgba(0,0,0,.04);
        box-shadow: 0 0 6px 0 rgba(0,0,0,.04);
        position: fixed;
        left: 256px;
        top: 63px;
        z-index: 99;
    }
    .titl_name{
        font-size: 20px;
        font-weight: bold;
        font-family: "Microsoft YaHei";
        margin-left: 24px;
    }
    .base{
        background: #fff;
        margin-top: 200px;
        padding: 24px;
    }
    .date{
        display: inline-block;
        margin-right: 50px;
    }
    input{
        width: 190px;
        padding-left: 10px;
        height: 36px;
        margin-right: 50px;
        border-radius: 5px;
    }
    select{
        width: 200px;
        height: 36px;
        margin-right: 50px;
         border-radius: 5px;
    }
    .operation{
    display: inline-block;
    float:right;
} 
.operation span{
    
    display: inline-block;
    width: 68px;
    height: 36px;
    background: rgba(255,255,255,1);
    border-radius: 4px;
    border: 1px solid rgba(211,219,235,1);
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(61,73,102,1);
    line-height: 36px;
    cursor: pointer;
    text-align: center;
    position: relative;
}   
.cx{
    border: 0!important;
    background: rgba(51,119,255,1)!important;
    color: rgba(255,255,255,1)!important;
     margin-right: 24px;
}
</style>