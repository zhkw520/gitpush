<template>
    <div>
        <div class="top">
            <span class="topTit">标签管理</span>
            <span class="allNum">共{{total}}个标签</span>
        </div>
        <div class="tagsTable">
            <div class="zdy_tags">
                <div class="zdy_tags_tit">
                    <span class="zdy_tags_tit_1">个性标签</span>
                    <img src="../../../../public/img/ss.png" @click="getTogsList()"/>
                    <input type="text" placeholder="搜索标签" v-model="search" @input="getTogsList()"/>
                    <div class="zdy_btn">
                        <input type="checkbox" v-model="check" @change="setCheckAll"/>
                        <span class="check">本页全选</span>
                        <span class="del" @click="delTags()">删除({{this.tags1.concat(this.tags2).concat(this.tags3).length}})</span>
                        <div class="bg" v-if="dele">
                            <div class="ADD_tags">
                                <div class="title">
                                    <span>删除标签</span>
                                    <img src="../../../../public/img/gb.png" @click="heidDEL"/>
                                </div>
                                <span class="sc">请确认是否<span class="red">删除</span>标签</span>
                                <div class="btn">
                                    <span class="qd" @click="del">确认</span>
                                    <span @click="heidDEL">取消</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tableList">
                    <div class="tab">
                        <template>
                            <el-table ref="tab0"
                                      :data="tableData"
                                      border
                                      style="width: 100%"
                                      @selection-change="handleSelectionChange">
                                <el-table-column
                                        type="selection"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="标签"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="操作"
                                >
                                    <template slot-scope="props">
                                        <el-button type="text" @click="bj(tableData[props.$index].id)">修改</el-button>
                                        <el-button type="text" @click=" delTag(tableData[props.$index].id)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </div>
                    <div class="tab">
                        <template>
                            <el-table ref="tab1"
                                      :data="tableData1"
                                      border
                                      style="width: 100%"
                                      @selection-change="handleSelectionChange1">
                                <el-table-column
                                        type="selection"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="标签"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="操作"
                                >
                                    <template slot-scope="props">
                                        <el-button type="text" @click="bj(tableData1[props.$index].id)">修改</el-button>
                                        <el-button type="text" @click=" delTag(tableData1[props.$index].id)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </div>
                    <div class="tab">
                        <template>
                            <el-table ref="tab2"
                                      :data="tableData2"
                                      border
                                      style="width: 100%"
                                      @selection-change="handleSelectionChange2">
                                <el-table-column
                                        type="selection"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="标签"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="操作"
                                >
                                    <template slot-scope="props">
                                        <el-button type="text" @click="bj(tableData2[props.$index].id)">修改</el-button>
                                        <el-button type="text" @click=" delTag(tableData2[props.$index].id)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </div>
                </div>

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
        <div class="bg" v-if="tagsName">
            <div class="setTag">
                <div class="setTagTit">
                    <span>修改标签</span>
                </div>
                <div class="setTagCont">
                    <span>标签名</span>
                    <input type="text" v-model="tagName">
                </div>
                <div class="tagBtn">
                    <span class="qd" @click="setTag()">确定</span>
                    <span @click="heidBj()">取消</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "tags_details",
        data(){
            return{
                tableData: [],
                tableData1: [],
                tableData2: [],
                yz_tags:[],
                add:false,
                name:'',
                dele:false,
                index:null,
                tags1:[],
                tags2:[],
                tags3:[],
                search:'',
                p:27,
                page:1,
                total:0,
                check:false,
                type:'',
                mName:'',
                tagsName:false,
                tagName:"",
                tagID:'',
            }
        },
        mounted(){
            this.getTogsList();

        },
        methods:{
            fh(){
                this.$router.go(-1)
            },
            bj(id){
                this.tagsName=true;
                this.tagID=id
            },
            heidBj(){
                this.tagsName=false;
                this.tagName=''
            },
            setTag(){
                let formData =new FormData;
                formData.append('name',this.tagName);
                formData.append('id',this.tagID);
              this.api.tags_edit(formData).then((res)=>{
                  this.heidBj();
                  this.getTogsList();
              })
            },
            getTogsList(){
                let params={p:this.p,page:this.page,type:'theme', material:"2",search:this.search};
                this.api.tags_search({params}).then((res)=>{
                    this.total = res.total;
                    this.tableData= res.data.self_tags.splice(0,9);
                    this.tableData1= res.data.self_tags.splice(0,9);
                    this.tableData2= res.data.self_tags.splice(0,9);
                })
            },
            delTag(id){
                let formData = new FormData;
                formData.append('tags',JSON.stringify([id]));
                this.api.tags_del(formData).then((res)=>{
                    this.getTogsList();
                    this.tags=[]
                })
            },
            delTags(){
                if(this.tags1.concat(this.tags2).concat(this.tags3).length<=0){
                    this.$message.error('请至少选择一个要删除的个性标签');
                    return
                }
                let formData = new FormData;
                formData.append('tags',JSON.stringify(this.tags1.concat(this.tags2).concat(this.tags3)));
                this.api.tags_del(formData).then((res)=>{
                    this.getTogsList();
                    this.tags=[]
                })
            },
            handleSizeChange(p){
                this.p = p;
                this.getTogsList()
            },
            handleCurrentChange(page){
                this.page = page;
                this.getTogsList()
            },
            getAdd(){
                this.add=true;
                this.stop()
            },
            heidTags(){
                this.add=false;
                this.move()
            },
            getDEL(index){
                this.dele=true;
                this.index = index
                this.stop()
            },
            heidDEL(){
                this.dele=false;
                this.move()
            },
            setCheckAll(){
                // this.$refs.tab0.toggleAllSelection();
                // this.$refs.tab1.toggleRowSelection(this.tableData1);
                this.tableData.map((option) => {
                    this.$refs.tab0.toggleRowSelection(option);
                })
                this.tableData1.map((option) => {
                    this.$refs.tab1.toggleRowSelection(option);
                })
                this.tableData2.map((option) => {
                    this.$refs.tab2.toggleRowSelection(option);
                })
                // this.$refs.tab1.toggleAllSelection();
                // this.$refs.tab2.toggleAllSelection();
            },
            AddTags(){
                let formData = new FormData;
                formData.append('name',this.name);
                formData.append('preset',1);
                formData.append('material',this.$route.query.material);
                formData.append('type',this.$route.query.type);
                this.api.tags_add(formData).then((res)=>{
                    this.name='';
                    this. heidTags();
                    this.getTogsList();
                })
            },
            del(){
                let formData = new FormData;
                formData.append('tags',JSON.stringify([this.yz_tags[this.index].id]));
                this.api.tags_del(formData).then((res)=>{
                    this.heidDEL();
                    this.getTogsList();
                })
            },
            handleSelectionChange(val){
                var ary =[];
                for(let i = 0;i<val.length;i++){
                    ary.push(val[i].id);
                }
                this.tags1=ary;
            },
            handleSelectionChange1(val){
                var ary =[];
                for(let i = 0;i<val.length;i++){
                    ary.push(val[i].id);
                }
                this.tags2=ary;
            },
            handleSelectionChange2(val){
                var ary =[];
                for(let i = 0;i<val.length;i++){
                    ary.push(val[i].id);
                }
                this.tags3=ary;
            },
            stop(){
                document.body.style.overflow='hidden';
                document.body.style.position='fixed';
                document.body.style.width='100%';
            },
            move(){
                document.body.style.overflow='';//出现滚动条
                document.body.style.position='initial';
                document.body.style.height='1006px';
            },
        },

    }
</script>

<style scoped>

    .top{
        width: 100%!important;
        height:62px;
        background:rgba(255,255,255,1);
        position: fixed;
        left: 256px;
        top: 64px;
        z-index: 99;
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0,0)
    }
    .topTit{
        display: inline-block;
        font-size:18px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin: 19px 10px 18px 24px;
    }
    .allNum{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(143,155,179,1);
    }
    .tagsTable{
        margin-top: 145px;
    }
    .zdy_tags{
        width: 100%;
        height: 100%;
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 6px 0px rgba(0, 0, 0, 0.04);
        margin-top: 41px;
    }
    .zdy_tags_tit{
        margin-left: 24px;
    }
    .zdy_tags_tit_1{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
    }
    .zdy_tags_tit>input{
        width:190px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        padding-left: 30px;
        margin-top: 24px;
    }
    .zdy_tags_tit>img{
        width: 25px;
        height: 25px;
        position: relative;
        right: -30px; top:8px;
    }
    .zdy_btn{
        display: inline-block;
        margin-left: 44px;
    }
    .zdy_btn>input{
        width:16px;
        height:16px;
        background:rgba(242,246,252,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 14px;
    }
    .check{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(143,155,179,1);
    }
    .del{
        display: inline-block;
        width:95px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        cursor: pointer;
        text-align: center;
        line-height: 36px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        margin-left: 20px;
    }
    .tab{
        display: inline-block;
        width: 30%;
        margin-right: 52px;
        vertical-align: top;
        margin-bottom: 50px;
    }
    .tab:nth-child(3){
        margin-right: 0!important;
    }
    .tableList{
        margin: 24px;
    }
    .red{
        color: red;
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
    .setTag{
        width:400px;
        height:200px;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 6px 0px rgba(0,0,0,0.06);
        border-radius:4px;
        -webkit-box-shadow: 0px 1px 6px 0px rgba(0,0,0,0.06);
        position: relative;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
    }
    .setTagTit span{
        display: inline-block;
        margin: 24px;
        font-size:14px;
        font-family:PingFangSC-Medium,PingFangSC;
        font-weight:500;
        color:rgba(31,46,77,1);
    }
    .setTagCont span{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin: 0 10px 0 24px;
    }
    .setTagCont input{
        width: 190px;
        height: 36px;
        padding-left: 10px;
    }
    .tagBtn{
        position: fixed;
        bottom: 0;
        width: 100%;
        text-align: left;
    }
    .tagBtn span{
        display: inline-block;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
        width:80px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin: 24px;

    }
    .qd{
        color: #fff!important;
        background: #3377ff!important;
        border: none!important;
        margin-right: 0!important;
        margin-left: 77px!important;
    }
</style>