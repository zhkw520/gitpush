<template>
    <div>
        <div class="top_name">
            <span class="inner">|</span>
            <span class="top_txt">配置管理>标签管理</span>
        </div>
        <div>
            <div class="content">
                <div class="tit_tag">
                    <span>素材库标签管理</span>
                </div>
                <div class="tab_box">
                    <template>
                        <el-table
                                :data="tableData"
                                :header-cell-style="getRowClass"
                                :cell-style="cell"
                                border
                                style="width: 100%">
                            <el-table-column
                                    prop="type_name"
                                    label="分类"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="tags_count"
                                    label="预置标签"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="self_tags_count"
                                    label="个性标签">
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="details(scope.$index)">管理</el-button>

                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </div>

            </div>
            <div class="content_2">
                <div class="tit_tag">
                    <span>物料库标签管理</span>
                </div>
                <div class="tab_box">
                    <template>
                        <el-table
                                :data="tableData2"
                                :header-cell-style="getRowClass"
                                :cell-style="cell"
                                border
                                style="width: 100%">
                            <el-table-column
                                    prop="type_name"
                                    label="分类"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="tags_count"
                                    label="预置标签"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="self_tags_count"
                                    label="个性标签">
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="details2(scope.$index)">管理</el-button>

                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "set_tags",
        data(){
            return{
                tableData2:[],
                tableData:[],
            }
        },
        mounted(){this.getTagslist()},
        methods:{
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:#F7F9FC;color:rgba(30,30,30,1);margin-left:44px;font-size:14px;font-weight:500;height:48px;font-family:PingFang-SC-Regular;'
                } else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'color:#3d4966;font-size:14px;font-weight:400;font-family:PingFang-SC-Regular;margin-left:44px;'
            },
            details(index){
                this.$router.push({
                    query: {
                        material:this.tableData[index].material,
                        type:this.tableData[index].type,
                    },
                    path:'/admin/tags_details'
                })
            },
            details2(index){
                console.log(this.tableData2[index]);
                this.$router.push({
                    query: {
                        material:this.tableData2[index].material,
                        type:this.tableData2[index].type
                    },
                    path:'/admin/tags_details'
                })
            },
            getTagslist(){
                this.api.tags_count().then((res)=>{
                    this.tableData = res.material;
                    this.tableData2 = res.mfinal;
                    console.log(this.tableData2)
                })
            },
        },
    }
</script>

<style scoped>
.tit_tag{
    height: 57px;
}
.tit_tag span{
    display: inline-block;
    margin-left: 24px;
    font-size:16px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(31,46,77,1);
    line-height: 57px;
}
.content_2{
    width: 100%;
    height: 100%;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 6px 0px rgba(0, 0, 0, 0.04);
    margin-top: 24px;
}
    .tab_box{
        margin: 0 24px;
    }
</style>