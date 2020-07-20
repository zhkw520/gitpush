<template>
    <div class="centNavBox">
        <div class="title_name">
            <img src="../../../public/img/fh.png" @click="fh" style="width: 16px;margin-right: 10px"/>
            <span @click="fh">{{this.$route.query.role_name}}账号列表</span>
        </div>
        <div class="tab">
            <tab :tableData2="tableData2" :roleID="this.$route.query.role_id"></tab>
        </div>
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange1"
                    @current-change="handleCurrentChange1"
                    :current-page.sync="currentPage"
                    :page-size="pageSize"
                    layout="prev, pager, next,total, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import tab from './table';
    export default {
        components:{tab},
        name: "quantity",
        data(){
            return {
                tableData2:[],
                pageSize:30,
                currentPage:1,
                total:0
            }
        },
        mounted(){
            this.getlist()
        },
        methods:{
            getlist(){
                let params = {role_id:this.$route.query.role_id,p:this.pageSize,page:this.currentPage};
                this.api.role_user_list({params}).then((res)=>{
                    this.total = res.total;
                    this.tableData2 = res.data;
                })
            },
            handleSizeChange1(pageSize) { // 每页条数切换
                this.pageSize = pageSize;
                this.getList()

            },
            handleCurrentChange1(currentPage) {//页码切换
                console.log(currentPage);
                this.getList()

            },
            fh(){
                this.$router.push({
                    path:'/userinfo/roleManagement'
                })
            },
        },

    }
</script>

<style scoped>
img{
    width: 28px;
    cursor: pointer;
}
.title_name{margin-bottom: 40px}
.title_name>span{
    display: inline-block;
    font-size:20px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:36px;
    margin-left: 10px;
}
.tab{
    margin:0 35px ;
}
</style>