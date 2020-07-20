<template>
    <div>
        <div class="top_name">
            <span class="inner">|</span>
            <span class="top_txt">投放库</span>
        </div>
        <div class="content">
            <div class="con_select">
                <span style="margin-left: 0">投放库名称</span>
                <input type="text" placeholder="请输入投放库名称" v-model="search"/>
                <span>投放库类型</span>
                <select v-model="put_type">
                    <option value="" selected>全部</option>
                    <option v-for="item in TFlist" :value="item.type">{{item.name}}</option>
                </select>
                <span>广告位类型</span>
                <select v-model="pos_type">
                    <option value="" selected>全部</option>
                    <option v-for="item in oddList" :value="item.pos_type">{{item.pos_type}}</option>
                </select>
                <span class="cx" @click="getDataList">查询</span>
                <span class="addTF"  @click="jump()">新建投放库</span>
            </div>
            <div>
                <template>
                    <el-table
                            :data="tableData"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            style="width: 100%">
                        <el-table-column
                                prop="id"
                                label="投放库ID"
                                width="100"
                                >
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="投放库名称"
                                :show-overflow-tooltip="true"
                                >
                        </el-table-column>
                        <el-table-column
                                prop="put_type_name"
                                label="投放库类型">
                        </el-table-column>
                        <el-table-column
                                prop="pos_type"
                                label="广告位类型"
                               >
                        </el-table-column>
                        <el-table-column
                                prop="size"
                                label="素材尺寸"
                                :show-overflow-tooltip="true"
                                >
                        </el-table-column>
                        <el-table-column
                                prop="ad_type"
                                label="广告类型">
                        </el-table-column>
                        <el-table-column
                                prop="channel_type"
                                label="渠道类型"
                                width="100"
                               >
                        </el-table-column>
                        <el-table-column
                                prop="status"
                                label="状态"
                               >
                        </el-table-column>
                        <el-table-column
                                prop="mfinal_count"
                                label="物料数量"
                                width="100"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="updated_at"
                                :show-overflow-tooltip="true"
                                label="更新时间">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" size="small"  @click="look(scope.$index)">查看详情</el-button>
                                <el-button type="text" size="small"  @click="getDel(scope.$index)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange1"
                        @current-change="handleCurrentChange1"
                        :current-page.sync="page"
                        :page-size="p"
                        layout="prev, pager, next,total, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>
        <div class="bg" v-if="deleted">
            <div class="ensure">
                <div class="title">
                    <span>删除</span>
                    <img src="../../../public/img/gb.png" @click="heidDle()"/>
                </div>
                <div style="margin: 24px 0 0 0 ">
                    <span v-if="this.dataLength.length<=0">
                    是否确定删除该条信息？
                    </span>
                    <span v-if="this.dataLength.length>0">
                    投放库内仍有物料，是否删除？
                    </span>
                </div>

                <div class="ensure_btn">
                    <span class="ensure_btn_qd" @click="delData">确定</span>
                    <span @click="heidDle()">取消</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "library",
        data(){
            return{
                tableData:[],
                p:20,
                page:1,
                total:0,
                search:'',
                put_type:'',
                pos_type:'',
                oddList:[],
                deleted:false,
                index:'',
                TFlist:[],
                dataLength:[],
            }
        },
        mounted(){this.getOddList()},
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
            jump(){
                this.$router.push({
                    path:'/admin/add_library'
                })
            },
            look(index){
                this.$router.push({
                    path:'/admin/details_library',
                    query:{
                        id:this.tableData[index].id,
                        type:this.tableData[index].put_type,
                        size:this.tableData[index].size,
                    }
                })
            },

            getOddList(){
                this.api.config_position_type({}).then((res)=>{
                    this.oddList=res;
                    this.getDataList();
                    this. TFtype();
                })
            },
            getDataList(){
                let params = {search:this.search,put_type:this.put_type,pos_type:this.pos_type,p:this.p,page:this.page};
                this.api.putlib_search({params}).then((res)=>{
                    this.tableData = res.data;
                    this.total = res.total;
                    for(var i=0 ;i<this.tableData.length;i++){

                        if(this.tableData[i].status=='0'){
                            this.tableData[i].status='未使用'
                        }else{
                            this.tableData[i].status='使用中'
                        }
                    }
                    console.log(res)

                })
            },
            TFtype(){
                this.api.config_putlib_type().then((res)=>{
                    this.TFlist = res;
                })
            },
            getDel(id){
                if(this.tableData[id].status=='使用中'){
                    this.$message.error('该投放库正在使用中，无法删除');
                    return
                }
                this.index=id;
                this.deleted =true;
                this.getDATAlist();
            },
            heidDle(){
                this.deleted =false;
                this.id='';
            },
            delData(){
                if(this.tableData[this.index].status=='使用中'){
                    this.$message.error('该投放库正在使用中，无法删除');
                    return
                }
                    let formData = new FormData;
                    formData.append('id',this.tableData[this.index].id);
                    this.api.putlib_del(formData).then((res)=>{
                        this.id='';
                        this.getDataList();
                        this.deleted = false;
                    })

            },
            getDATAlist(){
                let params = {id:this.tableData[this.index].id,search:this.search};
                this.api.putlib_binds({params}).then((res)=>{
                    this.dataLength = res;
                })
            },
            handleSizeChange1(p){
                this.p=p;
                this.getDataList()
            },
            handleCurrentChange1(page){
                this.page=page;
                this.getDataList()
            },
        },
    }
</script>

<style scoped>
.con_select{
    margin:0 0 24px 24px;
}
.con_select span{
    display: inline-block;
    margin-left: 24px;
    font-size:14px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(31,46,77,1);
    margin-right: 24px;
}
.con_select input{
    width:195px;
    height:36px;
    padding-left: 5px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
    margin-top: 24px;
}
.con_select select{
    width:200px;
    height:36px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
}
.cx{
    display: inline-block;
    width:68px;
    height:36px;
    background:rgba(51,119,255,1);
    border-radius:4px;
    line-height: 36px;
    text-align: center;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1)!important;
    cursor: pointer;
}
.addTF{
    display: inline-block;
    line-height: 36px;
    text-align: center;
    cursor: pointer;
    width:110px;
    height:36px;
    background:rgba(51,119,255,1);
    border-radius:4px;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1)!important;
    float: right;
    margin-right: 24px;
    margin-top: 24px;

}
.ensure{
    width: 500px;
    height: 200px;
    background:rgba(255,255,255,1);
    border-radius: 10px;
    position: relative;
    padding: 20px;
    top:40%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.ensure span{
    display: block;
    font-size: 18px;
    font-weight: bold;
}
.ensure_btn{
    width: 100%;
    position: fixed;
    bottom: 30px;
    text-align: right;
}
.ensure_btn span{
    display: inline-block;
    width:68px;
    height:36px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(61,73,102,1);
    line-height: 36px;
    text-align: center;
    margin-right: 48px;
    cursor: pointer;
}
.ensure_btn_qd{
    background:rgba(51,119,255,1)!important;
    color:rgba(255,255,255,1)!important;
    margin-right: 14px!important;
}
.ss span{
    float: right;
    display: inline-block;
    width:88px;
    height:36px;
    background:rgba(242,246,252,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
    font-size:14px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(61,73,102,1);
    text-align: center;
    line-height: 36px;
    margin-right: 24px;
    margin-top: 24px;
    cursor: pointer;
}
.bg{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    position: fixed;
    z-index: 9999;
    bottom: 0;
    right: 0;
}



.tit_sm span{
    display: inline-block;
    text-align: center;
    line-height: 56px;
    font-size:18px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(61,73,102,1);
    margin-left: 24px;
}
.tit_sm img {
    width: 16px;
    height: 16px;
    position: relative;
    right: -430px;
    cursor: pointer;
}
.tit_txt span{
    display: inline-block;
    font-size:14px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(31,46,77,1);
    margin-left: 52px;
    vertical-align: top;
}


.select_btn span,.gfName span{
    display: inline-block;
    font-size:14px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(31,46,77,1);
    margin-left: 24px;
}
.select_btn select{
    width:200px;
    height:36px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
    margin-left: 24px;
}

.upload_btn span{
    display: inline-block;
    width:68px;
    height:36px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(61,73,102,1);
    line-height: 36px;
    text-align: center;
    margin-right: 24px;
    cursor: pointer;
}

.gfName input{
    width: 192px;
    height: 36px;
    padding-left: 8px;
    background: rgba(255,255,255,1);
    border-radius: 4px;
    border: 1px solid rgba(211,219,235,1);
    margin-left: 24px;
}
a{
    color: #3377ff;
    text-decoration:none;
    margin: 0 10px;
}
.title{
    height: 56px;
    border-bottom: 1px solid #ddd;
}
.title span{
    font-size:18px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(61,73,102,1);
    line-height: 56px;
}
.title img{
    width: 16px;
    height: 16px;
    position: relative;
    right: -485px;
    top: -50px;
}
</style>