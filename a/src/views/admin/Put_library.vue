<template>
    <div class="bg" @click.stop>
        <div>
            <div class="content">
                <div class="con_select">
                    <span>投放库名称</span>
                    <input type="text" placeholder="请输入投放库名称" v-model="search"/>
                    <span>投放库类型</span>
                    <select v-model="put_type" disabled="disabled">
                        <option value="">全部</option>
                        <option v-for="item in TFlist" :value="item.type">{{item.name}}</option>
                    </select>
                    <span>广告位类型</span>
                    <select v-model="pos_type">
                        <option value="">全部</option>
                        <option v-for="item in oddList" :value="item.pos_type">{{item.pos_type}}</option>
                    </select>
                    <span class="cx" @click="getDataList">查询</span>
                </div>
                <div style="padding: 0 24px" >
                        <el-table
                                :data="tableData"
                                :header-cell-style="getRowClass"
                                :cell-style="cell"
                                @current-change="handleCurrentChange">
                            <!--<el-table-column-->
                                    <!--type="index"-->
                                    <!--width="50">-->
                            <!--</el-table-column>-->
                            <el-table-column label="" width="80">
                                <template scope="scope">
                                    <el-radio :label="scope.$index" v-model="radio" ></el-radio>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="id"
                                    label="投放库ID"
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
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="status"
                                    label="状态"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="updated_at"
                                    :show-overflow-tooltip="true"
                                    label="更新时间">
                            </el-table-column>
                        </el-table>
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
                <div class="btn">
                    <span class="qd" @click=" tj()">确定</span>
                    <span @click="qx()">取消</span>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        props:['type','model'],
        name: "library",
        data(){
            return{
                tableData:[],
                p:8,
                page:1,
                total:0,
                search:'',
                put_type:'',
                pos_type:'',
                oddList:[],
                radio:'',
                currentRow:"",
                TFlist:[],
                id:'',
                size:'',
            }
        },
        mounted(){
            this.getOddList();
        },
        methods:{
            jump(){
                this.$router.push({
                    path:'/admin/add_library'
                })
            },
            look(index){

                this.$router.push({
                    path:'/admin/details_library',
                    query:{
                        id:this.tableData[index].id
                    }
                })
            },
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:#f7f9fc;color:#8F9BB3;text-align:center;font-size:14px;font-weight:Medium;height:48px;font-family:PingFang-SC-Regular;'
                } else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'text-align:center;color:#3d4966;font-size:14px;font-weight:400;font-family:PingFang-SC-Regular;width:100%'
            },
            TFtype(){
                this.api.config_putlib_type().then((res)=>{
                    this.TFlist = res;
                })
            },
            getOddList(){
                this.api.config_position_type({}).then((res)=>{
                    this.oddList=res;
                    this.getDataList()
                    this. TFtype();
                })
            },
            getDataList(){
                if(this.model=='无'&&this.type=='f_ad_picture'){
                    this.put_type='m_picture'
                }
                if(this.model=='脚本'&&this.type=='f_ad_picture'){
                    this.put_type='m_script_picture'
                }
                if(this.model=='H5'&&this.type=='f_ad_template'){
                    this.put_type='m_h5_resource'
                }
                if(this.model=='脚本'&&this.type=='f_ad_template'){
                    this.put_type='m_resource'
                }
                let params = {search:this.search,put_type:this.put_type,pos_type:this.pos_type,p:this.p,page:this.page};
                this.api.putlib_search({params}).then((res)=>{
                    this.tableData = res.data;
                    for(var i=0;i<this.tableData.length;i++){
                      if(this.tableData[i].status==1) {
                          this.tableData[i].status='使用中'
                      }else {
                          this.tableData[i].status='未使用'
                      }
                    }
                    this.total = res.total;
                    console.log(res)

                })
            },
            delData(index){
                let formData = new FormData;
                formData.append('id',this.tableData[index].id);
                this.api.putlib_del(formData).then((res)=>{
                    this.getDataList();
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
            handleCurrentChange(val) {
                this.currentRow = val.name;
                this.id = val.id;
                this.size=val.size;
                // this.$emit('listenToChildEvent',this.currentRow,this.id,true);
            },
            tj(){
                this.$emit('listenToChildEvent',this.currentRow,this.id,this.size,true);
                this.$parent.heidLibrary()
            },
            qx(){
                this.$parent.heidLibrary()
            },
        },
    }
</script>

<style scoped>
    .content{
        width:1416px!important;
        height:912px!important;
        position: absolute;
        left: 50%;
        top: 34%;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%)
    }
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
    .btn{
        width:1416px;
        height:58px;
        background:rgba(247,249,252,1);
        border-radius:0px 0px 4px 4px;
        text-align: right;
        position: fixed;
        bottom: 0;
    }
    .btn span{
        display: inline-block;
        line-height: 36px;
        text-align: center;
        margin-right: 24px;
        width:68px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        cursor: pointer;
        margin-top: 10px;
    }
    .qd{
        background:rgba(51,119,255,1)!important;
        border: 0px!important;
        color: #fff!important;
    }
    .block{padding-right: 24px}
</style>