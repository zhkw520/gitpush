<template>
    <div>
        <tags v-if="ta" :type="type" :id="id" :bq="bq"></tags>
        <div class="top">
            <span class="topName">二级界面主题素材</span>
            <span class="total">共{{TotalNum}}套/</span>
            <span class="total">{{valid_count}}套已使用</span>
            <span class="upLock" @click="jump">上传二级界面</span>
        </div>
        <div class="seach">
            <div class="tagSeach">
                <span class="tagSeachName">内容标签</span>
                <span class="labelName" :class="{active:tags.length==0}" @click="ClickTag()">全部</span>
                <div class="tags">
                    <span v-for="(item,index) in tag" class="labelName" @click="ClickTag(item.name)" :class="{active:tags.indexOf(item.name)!=-1}">{{item.name}}</span>
                </div>
                <span class="tagsAll" v-if="this.class1==false" @click="getClass">查看更多</span>
                <span class="tagsAll" v-if="this.class1==true" @click="getClass">收起</span>
            </div>
            <div class="seachIiput">
                <img  src="../../../public/img/ss.png"/>
                <input type="text" placeholder="搜索名称或ID" v-model="search"/>
                <span class="seachSelect">状态</span>
                <select v-model="status">
                    <option value="">全部</option>
                    <option value="1">已使用</option>
                    <option value="0">未使用</option>
                </select>
                <span class="cx" @click="dataList()">查询</span>
            </div>
        </div>
        <div>
            <div class="box" v-for="item in list">
                <div class="boxImgs" @click="xq(item.thmid)">
                    <img :src="item.main_preview">
                </div>
                <div class="boxName">
                    <span>{{item.name}}</span>
                </div>
                <div class="boxTag">
                    <span class="addTags" @click="bjTags(item.thmid,item.tags)"><span>+</span>标签</span>
                    <span v-for="da in (item.tags).split(',')" class="tagsBox"  v-if="da">{{da}}</span>
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
    import tags from './tags'
    export default {
        components:{tags},
        name: "theme_lock",
        data(){
            return{
                type:'th_second_page',
                status:'',
                search:'',
                tags:[],
                tag:[],
                p:10,
                page:1,
                total:0,
                list:[],
                class1:false,
                ta:false,
                bq:'',
                id:"",
                TotalNum:"",
                valid_count:"",
        }
        },
        mounted(){this.dataList();this.getTotal()},
        methods:{
            ClickTag(name){

                if(name==undefined){
                    this.tags=[]
                }else{
                    if(this.tags.indexOf(name)==-1){
                        this.tags.push(name);

                    }else{
                        for(var i=0;i<this.tags.length;i++ ){
                            if(this.tags[i]==name){
                                this.tags.splice(i,1);

                            }
                        }
                    }
                }
                this.dataList()
            },
            getTotal(){
                let params={type:this.type}
                this.api.themes_material_count({params}).then((res)=>{
                    this.TotalNum=res.total;
                    this.valid_count=res.valid_count
                })
            },
            qxTags(){
                this.ta=false;
            },
            bjTags(id,tag){
                this.id=id;
                this.ta=true;
                this.bq=tag;
            },
            getClass(){
                if(this.class1==false){
                    this.class1=true
                }else{
                    this.class1=false
                }
            },
            xq(id){
                this.$router.push({
                    path:'./themeSc_details',
                    query:{
                        name:'二级页',
                        thmid:id
                    }
                })
            },
            getTagsList(){
                let params = {material:'2',type:"theme",search:this.tagsName,p:500,page:1};
                this.api.tags_search({params}).then((da)=>{
                    console.log(da);
                    this.tag=da.data.self_tags;
                })
            },
            dataList(){
                let params ={type:this.type,status:this.status,search:this.search,tags:this.tags.join(','),p:this.p,page:this.page};
                this.api.themes_material_search({params}).then((res)=>{
                    this.list=res.data;
                    this.total=res.total;
                    this. getTagsList()
                })
            },
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
                this.dataList()
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.dataList()
            },
            jump(){
                this.$router.push({
                    path:'./themelock_up',
                    query:{
                        type:this.type
                    }
                })
            },
        },
    }
</script>

<style scoped>
    .labelName{
        padding:0px 10px;
    }
    .labelName:hover{
        margin-right: 24px!important;
    }
    .active{
        background:rgba(51,119,255,1);
        color: #fff!important;

    }
    .tags{
        margin-top: 7px;
    }
    .tagsAll{
        margin-top: 13px;
    }
    .top{
        width: 100%;
        height:62px;
        background: rgba(255,255,255,1);
        position: fixed;
        left: 256px;
        top: 64px;
        z-index: 99;
    }
    .topName{
        display: inline-block;
        font-size:18px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-left: 24px;
        margin-right: 10px;
        line-height: 62px;
    }
    .total{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(143,155,179,1);
    }
    .upLock{
        display: inline-block;
        width:96px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height: 36px;
        text-align: center;
        float: right;
        margin-right: 274px;
        margin-top: 13PX;
        cursor: pointer;
    }
    .seach{
        min-height:147px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        margin-top: 148px;
        padding: 0 24px;
        margin-bottom: 24px;
    }
    .tagSeach{
        min-height: 60px;
        border-bottom: 1px dashed #E6E9F0;
    }
    .tagSeachName{
        display: inline-block;
        font-size:12px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(143,155,179,1);
        line-height: 60px;
        margin-right: 22px;
    }
    .seachIiput{
        height: 84px;
    }
    .seachIiput img{
        position: relative;
        top:10px;
    }
    .seachIiput input{
        width:236px;
        height:36px;
        margin: 24px 40px 0 -30px;
        padding-left: 36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .seachSelect{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 14px;
    }
    .seachIiput select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 24px;
    }
    .cx{
        display: inline-block;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        width:68px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);
    }
    .box{
        margin-top: 0;
        display: inline-block;
        width:12%;
        height: 381px;
        margin-right: 40px;
        margin-bottom: 24px;
    }
     .box:nth-child(7n){
        margin-right: 0px
    }
    .box:hover{
        box-shadow: 3px 3px 5px #e3e7ef;
    }
    .boxImgs{
        width: 100%;
        height: 315px;
        margin: 0 auto;
        background: #fff;
        padding: 0 auto!important;
    }
    .boxImgs img{
        max-width: 100%;
        max-height: 315px;
        position: relative;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
    .boxName{
        width: 100%;
        height: 34px;
        background:rgba(255,255,255,1);
    }
    .boxName span{
        display: inline-block;
        margin-left: 10px;
        line-height: 34px;
        font-size:12px;
        font-family:PingFangSC;
        font-weight:400;
        color:#1f2e4d;
    }
    .boxTag{
        width: 94%;
        height: 34px;
        background: #fff;
        padding:0 3% ;
        overflow:hidden;
    }
    .addTags{
        display: inline-block;
        width:56px;
        height:24px;
        border-radius:4px;
        border:1px dashed rgba(230,233,240,1);
        font-size:12px;
        font-family:PingFangSC;
        font-weight:400;
          margin-right: 5px;
        color:rgba(31,46,77,0.45);
        line-height: 24px;
        text-align: center;
        cursor: pointer;

    }
    .tagsBox{
        display: inline-block;
        border: 1px solid #d3dbeb;
        padding:2px 5px;
        margin-right: 5px;
        border-radius: 4px;
        margin-bottom: 10px;
        font-size:12px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,0.45);
    }
</style>