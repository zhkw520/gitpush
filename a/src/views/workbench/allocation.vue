<template>
    <div>
        <div>
            <div class="top_name">
                <span class="top_txt">运营工具&nbsp;/&nbsp;聚合内容配置</span>
                <div class="title_left">
                    <span>聚合内容配置</span>
                </div>
            </div>
        </div>
        <div class="poster">
            <div class="top">
                <span @click="ADDad()">添加</span>
            </div>
            <div class="centNavBox">
                <template>
                    <el-table
                            :data="tableData"
                            header-align="center"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            stripe
                            style="width: 100%">
                        <el-table-column
                                prop="id"
                                label="序号"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="pic_url"
                                label="图片"
                        >
                            <template slot-scope="scope">
                                <img :src="scope.row.pic_url" man-width="80" height="80" />
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="link"
                                label="链接"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="ADDad(scope.$index)">编辑</el-button>
                                <el-button type="text" size="small"  @click="getDel(scope.$index)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
        </div>
        <div>
            <div>
                <div class="top">
                    <span @click=" ADDmore()">更多</span>
                    <span @click="ADDnews()">添加</span>
                </div>
                <div class="centNavBox">
                    <template>
                        <el-table
                                :data="tableData2"
                                header-align="center"
                                :header-cell-style="getRowClass"
                                :cell-style="cell"
                                stripe
                                style="width: 100%">
                            <el-table-column
                                    prop="id"
                                    label="序号"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="pic_url"
                                    label="图片"
                            >
                                <template slot-scope="scope">
                                    <img :src="scope.row.pic_url" min-width="70" height="70" />
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="图片名称"
                                    type="img">
                            </el-table-column>
                            <el-table-column
                                    prop="link"
                                    label="链接"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="ADDnews(scope.$index)">编辑</el-button>
                                    <el-button type="text" size="small" @click="getDel2(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </div>
            </div>
        </div>
        <div class="bg" v-if="AD">
            <div class="content">
                <div class="bg_tit">
                        <span>
                            添加广告位配置
                        </span>
                </div>
                <div style="text-align: center;margin-bottom: 20px">
                    <el-upload
                            class="upload-demo"
                            action="111"
                            :http-request="upload"
                    >
                        <el-button size="small" type="primary">上传图片</el-button>
                    </el-upload>
                </div>
                <div class="text">
                        <span>
                            广告图片链接
                        </span>
                    <input type="text"  v-model="pic_url" disabled/>
                </div>
                <div class="text">
                         <span>
                            链接
                        </span>
                    <input type="text" placeholder="请输入链接" v-model="link"/>
                </div>
                <div class="btn">
                    <span class="bc" @click="ADDdata()">保存</span>
                    <span @click="heidAD">取消</span>
                </div>
            </div>
        </div>
        <div class="bg" v-if="news">
            <div class="content">
                <div class="bg_tit">
                        <span>
                            添加新闻热点
                        </span>
                </div>
                <div style="text-align: center;margin-bottom: 20px">
                    <el-upload
                            class="upload-demo"
                            action="111"
                            :http-request="upload"
                    >
                        <el-button size="small" type="primary">上传图片</el-button>
                    </el-upload>
                </div>
                <div class="text">
                        <span>
                            添加
                        </span>
                    <input type="text" v-model="pic_url" disabled/>
                </div>
                <div class="text">
                        <span>
                            名称
                        </span>
                    <input type="text" v-model="name"/>
                </div>
                <div class="text">
                         <span>
                            链接
                        </span>
                    <input type="text" placeholder="请输入链接" v-model="link"/>
                </div>
                <div class="btn">
                    <span class="bc" @click="ADDNewsdata()">添加</span>
                    <span @click="heidNews">取消</span>
                </div>
            </div>
        </div>
        <div class="bg" v-if="more">
            <div class="content">
                <div class="bg_tit">
                        <span>
                           更多新闻热点
                        </span>
                </div>
                <div class="text">
                         <span>
                            更多热点链接
                        </span>
                    <input type="text" placeholder="请输入链接" v-model="link"/>
                </div>
                <div class="btn">
                    <span class="bc" @click="mores">添加</span>
                    <span @click="heidMore">取消</span>
                </div>
            </div>
        </div>
        <div class="bg" v-if="del">
            <div class="content">
                <div class="comment">
                    <span>是否确定删除该条记录？</span>
                </div>
                <div class="btn">
                    <span class="bc" @click="delDATA()">删除</span>
                    <span @click="heidDel">取消</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "allocation",
        data(){
            return{
                tableData:[{fid:1},{fid:2},{fid:3}],
                tableData2:[{fid:1},{fid:2},{fid:3}],
                AD:false,
                news:false,
                more:false,
                del:false,
                link:'',
                name:'',
                pic_url:'',
                index:'',
                num:'',
                ADid:'',
                NewID:'',

            }
        },
        mounted(){
            this.getData();
        },
        methods:{
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:#ddd;color:#000;text-align:center;font-size:9px;font-weight:500;'
                } else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'text-align:center;'
            },

            ADDad(index){
                if(index!=undefined){
                    this.num=this.tableData[index].id;
                    this.line = this.tableData[index].line;
                    this.pic_url = this.tableData[index].pic_url;
                }
                this.AD = true
            },
            heidAD(){
                this.AD = false;
                this.pic_url='';
                this.name='';
                this.line = ''
            },
            ADDnews(index){
                if(index!=undefined){
                    this.index = this.tableData2[index].id;
                    this.line = this.tableData2[index].line;
                    this.name = this.tableData2[index].name;
                    this.pic_url = this.tableData2[index].pic_url;
                }
                this.news = true;
            },
            heidNews(){
                this.news = false;
                this.pic_url='';
                this.name='';
                this.line = ''
            },
            ADDmore(){
                this.more=true;
            },
            heidMore(){
                this.more=false
                this.pic_url='';
                this.name='';
                this.line = ''
            },
            getDel(index){
                this.ADid=this.tableData[index].id;
                this.del = true;
            },
            getDel2(index){
                this.NewID=this.tableData2[index].id;
                this.del = true;
            },
            heidDel(){
                this.del = false;
                this.pic_url='';
                this.name='';
                this.line = ''
            },
            getData(){
                let params={type:1};
                this.api.aggregation_search({params}).then((res)=>{
                    this.tableData = res;
                    this. getNewsData();
                })
            },
            getNewsData(){
                let params={type:2};
                this.api.aggregation_search({params}).then((res)=>{
                    this.tableData2 = res;
                })
            },
            setData(){
                if(!this.link){
                    this.$message.error("链接不能为空");
                    return
                }
                if(!this.pic_url){
                    this.$message.error("图片地址链接不能为空");
                    return
                }
                let formData = new FormData;
                formData.append('id',this.num);
                formData.append('link',this.link);
                formData.append('pic_url',this.pic_url);
                this.api.aggregation_edit(formData).then((res)=>{
                    this.getData();
                    this.heidAD();
                })
            },
            setNewsData(){
                if(!this.link){
                    this.$message.error("链接不能为空")
                    return
                }
                if(!this.pic_url){
                    this.$message.error("图片地址链接不能为空")
                    return
                }
                if(!this.name){
                    this.$message.error("名称不能为空")
                    return
                }
                let formData = new FormData;
                formData.append('id',this.index);
                formData.append('link',this.link);
                formData.append('name',this.name);
                formData.append('pic_url',this.pic_url);
                this.api.aggregation_edit(formData).then((res)=>{
                    this.heidNews();
                    this.getNewsData()
                })
            },
            upload(file){
                let formData = new FormData;
                formData.append('file',file.file);
                this.api.file_upload(formData).then((res)=>{
                    this.pic_url = res.url
                })
            },
            mores(){
                if(!this.link){
                    this.$message.error("链接不能为空")
                    return
                }
                let formData = new FormData;
                formData.append('type',2);
                formData.append('link',this.link);
                this.api.aggregation_add(formData).then((res)=>{
                    this.heidAD();
                    this.link = ''
                })
            },
            ADDdata(){
                if(this.num!=''){
                    this.setData();
                    return
                }
                if(!this.link){
                    this.$message.error("链接不能为空")
                    return
                }
                if(!this.pic_url){
                    this.$message.error("图片地址链接不能为空")
                    return
                }
                let formData = new FormData;
                formData.append('type',1);
                formData.append('link',this.link);
                formData.append('pic_url',this.pic_url);
                this.api.aggregation_add(formData).then((res)=>{
                    this.heidAD();
                    this.getData();
                    this.pic_url='';
                    this.name='';
                    this.link = ''
                })
            },
            delDATA(){
                if(this.ADid!=''){
                    let formData = new FormData;
                    formData.append('id',this.ADid);
                    this.api.aggregation_del(formData).then((res)=>{
                        this.ADid='';
                        this.heidDel();
                    })
                }else
                {
                    alert(this.NewID);
                    let formData = new FormData;
                    formData.append('id',this.NewID);
                    this.api.aggregation_del(formData).then((res)=>{
                        this.NewID='';
                        this.heidDel()
                    })
                }

            },
            ADDNewsdata(){
                if(this.index!=''){
                    this.setNewsData();
                    return
                }
                if(!this.link){
                    this.$message.error("链接不能为空")
                    return
                }
                if(!this.pic_url){
                    this.$message.error("图片地址链接不能为空")
                    return
                }
                if(!this.name){
                    this.$message.error("名称不能为空")
                    return
                }
                let formData = new FormData;
                formData.append('type',2);
                formData.append('link',this.link);
                formData.append('name',this.name);
                formData.append('pic_url',this.pic_url);
                this.api.aggregation_add(formData).then((res)=>{
                    this.pic_url='';
                    this.name='';
                    this.link = '';
                    this.heidNews();
                    this.getNewsData()
                })
            },
        }
    }
</script>

<style scoped>
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.2);
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 999;
    }
    .content{
        background: #fff;
        width: 600px;
        height: 350px;
        padding: 24px;
        border-radius: 10px;
        margin-top: 20%;
        margin-left: 50%;
        transform: translate(-50%,-50%);
    }
    .poster{
        margin-bottom: 120px;
        margin-top: 200px;
        min-height: 300px;
    }
    .top{
        text-align: right;
        margin-bottom: 20px;
    }
    .top>span{
        display: inline-block;
        width: 120px;
        height: 40px;
        line-height: 40px;
        background: #525cff;
        border-radius: 30px;
        text-align: center;
        color: #fff;
        font-size: 18px;
        font-weight: 500;
        cursor: pointer;
    }
    .centNavBox{
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 3px 0px rgba(0, 0, 0, 0.06);
        height: 60px;
        font-size:14px;
        line-height:60px ;
        color:rgba(0,0,0,1) !important;
    }
    .bg_tit{
        text-align: center;
        margin: 0 24px;
    }
    .bg_tit span{
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 15px;
        display: inline-block;
        line-height: 36px;
    }
    .text{
        margin: 0 24px 30px 24px;
    }
    .text span{
        display: inline-block;
        width: 100px;
        text-align: right;
        margin-right: 40px;
        font-size: 14px;
    }
    .text input{
        width: 300px;
        height: 36px;
        padding-left: 10px;
        border: 1px solid #e2e2e2;
    }
    .btn{
        width: 100%;
        text-align: center;
        position: fixed;
        bottom: 20px;
    }
    .btn span{
        display: inline-block;
        margin-right: 40px;
        height: 36px;
        line-height: 36px;
        width: 80px;
        cursor: pointer;
        border-radius: 5px;
        border: 1px solid #dfdfdf;
        text-align: center;
    }
    .bc{
        color: #f5f6fa!important;
        background: #4f4cf1 !important;
        border: 0!important;
    }
    .comment{
        margin-top: 20%;
        margin-left: 55%;
        transform: translate(-50%,-50%);
    }
    .comment span{
        display: inline-block;
        font-size: 20px;
        font-weight: bold;
    }
    .top_name{height: 112px}
    .top_txt,.title_left span{
        margin-left: 24px;
    }
</style>