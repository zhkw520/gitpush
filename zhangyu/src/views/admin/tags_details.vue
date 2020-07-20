<template>
    <div>
        <div class="top_name">
            <span class="inner">|</span>
            <span class="top_txt">配置管理>标签管理>{{mName}}-{{this.type}}标签管理</span>
            <div class="fh">
                <img src="../../../public/img/fh.png" style="width: 16px;margin-right: 10px" @click="fh"/>
                <span @click="fh">{{mName}}-{{this.type}}标签管理</span>
            </div>
        </div>
        <div class="content">
            <div class="yz_tags">
                <span class="yz_tit">预置标签</span>
                <span class="tag_con" v-for="(item,index) in yz_tags" @click="getDEL(index)">{{item.name}}</span>
                <span class="tag_add" @click="getAdd">添加标签</span>
                <div class="bg" v-if="add">
                    <div class="ADD_tags">
                        <div class="title">
                            <span>添加标签</span>
                            <img src="../../../public/img/gb.png" @click="heidTags"/>
                        </div>
                        <input type="text" v-model="name" maxlength="6"/>
                        <div class="btn">
                            <span class="qd" @click="AddTags">添加</span>
                            <span @click="heidTags">取消</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="zdy_tags">
            <div class="zdy_tags_tit">
                <span class="zdy_tags_tit_1">个性标签</span>
                <img src="../../../public/img/ss.png" @click="getTogsList()"/>
                <input type="text" placeholder="搜索标签" v-model="search" @input="getTogsList()"/>
                <div class="zdy_btn">
                    <input type="checkbox" v-model="check" @change="setCheckAll"/>
                    <span class="check">本页全选</span>
                    <span class="del" @click="delTags()">删除({{this.tags1.concat(this.tags2).concat(this.tags3).length}})</span>
                    <div class="bg" v-if="dele">
                        <div class="ADD_tags">
                            <div class="title">
                                <span>删除标签</span>
                                <img src="../../../public/img/gb.png" @click="heidDEL"/>
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
                p:15,
                page:1,
                total:0,
                check:false,
                type:'',
                mName:''
            }
        },
        mounted(){
            this.getTogsList();
            if(this.$route.query.material==0){
                this.mName='物料库'
            }else{
                this.mName='素材库'
            }
        },
        methods:{
            fh(){
                this.$router.go(-1)
            },
            getTogsList(){
                let params={p:this.p,page:this.page,type:this.$route.query.type, material:this.$route.query.material,search:this.search}
                this.api.tags_search({params}).then((res)=>{
                    this.total = res.total;
                   this.yz_tags = res.data.tags;
                   this.tableData= res.data.self_tags.splice(0,5);
                    this.tableData1= res.data.self_tags.splice(0,5);
                    this.tableData2= res.data.self_tags.splice(0,5);
                    if(this.$route.query.type=='ad_picture'){
                        this.type='广告图'
                    }
                    if(this.$route.query.type=='ad_template'){
                        this.type='广告图模板'
                    }
                    if(this.$route.query.type=='sls_dynamic'){
                        this.type='场景锁屏动态'
                    }
                    if(this.$route.query.type=='sls_picture'){
                        this.type='场景锁屏壁纸'
                    }
                    if(this.$route.query.type=='f_ad_picture'){
                        this.type='物料广告图'
                    }
                    if(this.$route.query.type=='f_ad_template'){
                        this.type='物料广告图模板'
                    }
                    if(this.$route.query.type=='f_sls_lockscreen'){
                        this.type='物料场景锁屏'
                    }
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
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        z-index: 9;
        bottom: 0;
        right: 0;
    }
    .ADD_tags{
        position: absolute;
        left: 50%;
        top: 30%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        width:560px;
        height:194px;
        background: rgba(255,255,255,1);
        -webkit-box-shadow: 0px 2px 8px 0px rgba(0,0,0,0.2);
        box-shadow: 0px 2px 8px 0px rgba(0,0,0,0.2);
        border-radius: 4px;
    }
    .ADD_tags input{
        width:505px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin: 15px 24px;
        padding-left: 5px;
    }
    .btn{
        text-align: right;
    }
    .btn span{
        display: inline-block;
        width:68px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        line-height: 36px;
        text-align: center;
        cursor: pointer;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        margin-right: 24px;
    }
    .qd{
        background:rgba(51,119,255,1)!important;
        color:rgba(255,255,255,1)!important;
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
        margin-left: 24px;
    }
    .title img{
        width: 16px;
        height: 16px;
        position: relative;
        right: -432px;
    }
    .sc{
        display: inline-block;
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        margin:15px 24px;
    }
.top_name{
    height:113px;
}
.top_name img{
    display: inline-block;
    width:20px;
    margin-left: 24px;
}

.fh span{
    display: inline-block;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(51,119,255,1);
    cursor: pointer;
    line-height: 36px;
}
.content{
    margin-top: 198px!important;
}
.tag_add{
    display: inline-block;
    width:58px;
    height:28px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px dotted rgba(211,219,235,1);
    line-height: 28px;
    text-align: center;
    font-size:12px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(143,155,179,1);
    cursor: pointer;
    margin-top: 30px;
}
.yz_tit{
    display: inline-block;
    font-size:14px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(143,155,179,1);
    margin-right:36px ;
}
.yz_tags{
    margin: 0 24px;
    height: 84px;
}
.tag_con{
    display: inline-block;
    font-size:12px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(143,155,179,1);
    padding: 5px 10px;
    border:1px solid rgba(211,219,235,1);
    border-radius:4px;
    background:rgba(247,249,252,1);
    cursor: pointer;
    margin-right: 14px;
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
    width:404px;
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
    float: right;
    margin-right: 24px;
    margin-top: 24px;
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
</style>