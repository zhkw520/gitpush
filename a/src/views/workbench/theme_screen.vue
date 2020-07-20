<template>
    <div>
        <div>
            <div class="top_name">
                <span class="top_txt">运营工具&nbsp;/&nbsp;主题锁屏壁纸定投</span>
                <div class="title_left">
                    <span>主题锁屏壁纸定投</span>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="content_top">
                <span @click="pop_up">上传</span>
            </div>
            <div class="table_content">
                <template>
                    <el-table
                            :data="tableData"
                            header-align="center"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            stripe
                            style="width: 100%">
                        <el-table-column
                                prop="fid"
                                label="预览图"
                        >
                            <template slot-scope="scope">
                                <img :src="tableData[scope.$index].prev_url" style="max-width:80px;max-height: 80px;cursor: pointer" preview="0" />
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="文件名称"
                                :show-overflow-tooltip="true"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="channel"
                                label="渠道"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="tags_name"
                                label="标签"
                                :show-overflow-tooltip="true"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="thid"
                                label="壁纸标识"
                                :show-overflow-tooltip="true"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="created_at"
                                label="上传时间"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="creator"
                                label="操作人员"
                                :show-overflow-tooltip="true"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="操作">
                            <template slot-scope="scope">
                                <a :href="tableData[scope.$index].url" style="font-size: 12px;margin-right: 10px;color: rgb(51, 119, 255)" >下载</a>
                                <el-button type="text" size="small"  @click="del(scope.$index)">删除</el-button>
                                <el-button type="text" size="small"  @click="tags(scope.$index)">配置标签</el-button>
                            </template>
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
            <div class="bg" v-if="pop">
                <div class="load">
                    <div class="load_tit">
                        <span>批量上传</span>
                    </div>
                    <div class="load_upload">
                        <span class="load_tits">渠道:</span>
                        <select v-model="channel">
                            <option value="" selected disabled>请选择</option>
                            <option value="oppo">oppo</option>
                            <!--<option value="vivo">vivo</option>-->
                            <!--<option value="huawei">华为</option>-->
                            <!--<option value="jinli">金立</option>-->
                            <!--<option value="meizu">魅族</option>-->
                        </select>
                        <div class="load_right">
                            <span class="load_tits">附件:</span>
                            <el-upload
                                    class="upload-demo"
                                    action="aaaa"
                                    multiple
                                    :on-exceed="handleExceed"
                                    :limit="100"
                                    :http-request="beforupload"
                            >
                                <el-button size="small" type="primary">选择</el-button>
                            </el-upload>
                        </div>

                    </div>
                    <div class="table_load">
                        <template>
                            <el-table
                                    :data="tableDataList"
                                    style="width: 100%"
                                    :header-cell-style="getRowClass"
                                    :cell-style="cell"
                                    border>
                                <el-table-column
                                        prop="name"
                                        :show-overflow-tooltip="true"
                                        label="文件名">
                                </el-table-column>
                                <el-table-column
                                        prop="size"
                                        label="预览图">
                                    <template slot-scope="scope">
                                        <img :src="tableDataList[scope.$index].prev_url" man-width="80" height="80"/>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="thid"
                                        label="壁纸标识"
                                        :show-overflow-tooltip="true"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="status"
                                        label="状态">
                                    <template slot-scope="scope">
                                        <span v-if="tableDataList[scope.$index].status=='上传中'" class="win">上传中</span>
                                        <span v-if="tableDataList[scope.$index].status=='上传成功'" class="win">上传成功</span>
                                        <span v-if="tableDataList[scope.$index].status=='上传失败'" class="loss">上传失败</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="操作">
                                    <template slot-scope="scope">
                                        <el-button  type="text" size="small" @click="remove(scope.$index)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </div>
                    <div class="btns">
                        <span @click="add()" class="qd">确定</span>
                        <span @click="heidTH()">取消</span>
                    </div>
                </div>
            </div>
            <div class="bgs" v-if="tagData">
                <div class="contents">
                    <div style="font-size: 18px;font-weight: bold;margin-bottom: 15px">配置运营标签</div>
                    <div class="tags_name" style="width: 100%;border: 1px solid #e2e2e2;border-radius: 5px;height: 200px;text-align: left;overflow-y: auto;padding: 5px;overflow-y: auto">
                        <template>
                            <el-checkbox-group
                                    v-model="checkedCities1">
                                <el-checkbox v-for="(item,index) in Operatorlist" :label="item"  @change="fff">{{item.desc}}</el-checkbox>
                            </el-checkbox-group>
                        </template>
                    </div>
                    <div class="btn">
                        <span class="adds" @click="addTags()">保存</span>
                        <span @click="Heidtags()">取消</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "theme_screen",
        data(){
            return{
                tableData:[],
                pop:false,
                p:10,
                page:1,
                total:0,
                tableDataList:[],
                tagData:false,
                checkedCities1:[],
                tagslist:[],
                channel:'',
                themes:[],
                thid:'',
                Operatorlist:[],
                index:'',
                ta:[],
                num:[],
            }
        },
        mounted(){this.listData()},
        methods:{
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:rgb(246, 245, 245,1);color:rgba(30,30,30,1);text-align:center;font-size:16px;font-weight:400;font-family:PingFang-SC-Regular;'
                } else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'text-align:center;color:#000;font-size:16px;font-weight:400;font-family:PingFang-SC-Regular;'
            },
            pop_up(){
                this.pop=true
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择100 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
                this.listData()
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.listData()
            },
            heidTH(){
                this.pop =false;
                this.tableDataList=[];
                this.themes=[];
            },
            tags(index){
                this.index = index;
                this.tagData=true;
                this.getOperatorTag();
            },
            Heidtags(){
                this.tagData=false;
                this.checkedCities1=[];
                this.ta=[];
            },
            fff(){
                console.log(this.checkedCities1)
            },
            addTags(){
                console.log(this.checkedCities1.length);
                this.thid = this.tableData[this.index].thid;
                this.channel = this.tableData[this.index].channel;
                for (var i=0;i<this.checkedCities1.length;i++){
                    var listD={
                        tags_id:'',
                        tags_name:'',
                    }
                    listD.tags_id=this.checkedCities1[i].usertag;
                    listD.tags_name=this.checkedCities1[i].desc;
                    this.ta.push(listD);
                }
                console.log(this.ta);
                let formData = new FormData;
                formData.append('thid',this.thid);
                formData.append('channel',this.channel);
                formData.append('tags',JSON.stringify(this.ta));
                this.api.themes_tags(formData).then((res)=>{
                    this.listData();
                    this.Heidtags();
                })
            },
            beforupload(file){
                if(!this.channel){
                    this.$message.error('渠道不能为空');
                    return
                }
                var obj={};
                obj.status ='上传中';
                obj.name = file.file.name;
                this.tableDataList.push(obj);
                let formData = new FormData;
                formData.append('file',file.file);
                formData.append('channel',this.channel);
                this.api.themes_upload(formData).then((res)=>{
                    if(!res){
                        obj.status = '上传失败';
                        obj.thid = '';
                        obj.prev_url ='';
                    }else{
                        obj.status = '上传成功';
                        obj.thid = res.thid;
                        obj.prev_url = res.prev_url;
                    }
                    var arr={
                        thid:"",
                        theme_name:'',
                        channel:'',
                        prev_url:'',
                        attach:{
                            name:'',
                            url:'',
                            size:'',
                            ext:"",
                            md5:'',
                        }
                    };
                    arr.thid = res.thid;
                    arr.theme_name=res.theme_name;
                    arr.channel=this.channel;
                    arr.prev_url=res.prev_url;
                    arr.attach.name=res.name;
                    arr.attach.url = res.url;
                    arr.attach.size =res.size;
                    arr.attach.ext=res.ext;
                    arr.attach.md5=res.md5;
                    this.themes.push(arr);
                })
            },
            remove(index){
                this.tableDataList.splice(index,1);
                this.themes.splice(index,1);
            },
            add(){
                for(var i=0;i<this.tableDataList.length;i++){
                    if(this.tableDataList[i].status=='上传失败'||this.tableDataList[i].status=='上传中'){
                        this.$message.error('有未上传成功的壁纸，无法添加！！！');
                        return
                    }
                }
                if(this.tableDataList.length==0){
                    this.$message.error('请先添加文件');
                    return
                }
                let formData = new FormData;
                formData.append('themes',JSON.stringify(this.themes));
                this.api.themes_add(formData).then((res)=>{
                    this.heidTH();
                    this.listData();
                })
            },
            listData(){
                let params = {p:this.p,page:this.page};
                this.api.themes_list({params}).then((res)=>{
                    this.tableData = res.data;
                    this.total = res.total;
                })
            },
            del(index){
                this.thid=this.tableData[index].thid;
                this.channel = this.tableData[index].channel;
                let formData = new FormData;
                formData.append('thid',this.thid);
                formData.append('channel',this.channel);
                this.api.themes_del(formData).then((res)=>{
                    this.listData();
                })
            },
            getOperatorTag(){
                this.api.lockwallpaper_tags_list().then((res)=>{
                    this.Operatorlist=res;
                    for(var i=0;i<this.tableData[this.index].tags_name.split(',').length;i++){
                            for(var j=0;j<res.length;j++){
                                if(res[j].desc==this.tableData[this.index].tags_name.split(',')[i]){
                                    if(this.checkedCities1.indexOf(res[j])==-1){
                                        this.checkedCities1.push(res[j]);
                                    }

                                }
                            }
                    }
                })
            },
        }
    }
</script>

<style scoped>
.content{
    margin-top: 200px!important;

}
.content_top{float: right}
    .content_top span{
        display: inline-block;
        margin: 24px;
        background:rgba(51,119,255,1);
        color: #fff;
        text-align: center;
        line-height: 36px;
        border-radius: 5px;
        width: 120px;
        height: 36px;
        cursor: pointer;
    }
.bg{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.2);
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 999;
}
.bgs{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.2);
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 999;
    text-align: center;
}
.load{
    border-radius: 10px;
    width: 800px;
    min-height: 270px;
    position: relative;
    background: #fff;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
}

.load_tit span{
    display: inline-block;
    height: 36px;
    line-height: 36px;
    margin:10px 0 10px 0;
    font-size: 18px;
    font-weight: bold;
}
.load_upload ,.load_tit{
    margin:15px 24px 0 24px
}
.btns{
    margin-top: 30px;
}
.btns span{
    display: inline-block;
    border-radius: 8px;
    width: 80px!important;
    height: 36px;
    line-height: 36px;
    cursor: pointer;
    border: 1px solid #c3c3c3;
    color: #9c9c9c;
    margin-right: 30px;
    margin-left: 24px;
    text-align: center;
    margin-bottom: 24px;
}
.qd{
    color: #fff!important;
    border: 0!important;
    background:rgba(51,119,255,1)!important;
}
.table_load{
    max-height: 200px;
    overflow-y: auto;
    padding: 24px;
}
    .upload-demo{
        display: inline-block;
    }
    .load_tits{
        display: inline-block;
        margin-right: 20px;

    }
    .load_upload select{
        width: 200px;
        height: 36px;
    }
    .load_right{
        float: right;
    }
.contents{
    background: #fff;
    width: 600px;
    height: 300px;
    padding: 24px;
    border-radius: 10px;
    margin-top: 20%;
    margin-left: 50%;
    transform: translate(-50%,-50%);
}
.btn{
    width: 100%;
    height: 50px;
    position:fixed;
    bottom: 0;
    text-align: center;
}
.btn span{
    display: inline-block;
    line-height:40px;
    border:1px solid #ddd;
    text-align: center;
    width: 80px;
    height: 40px;
    border-radius: 10px;
    color: #666666;
    cursor: pointer;
}
.adds{
    border: 0px!important;
    background:#2ad5cd!important; ;
    color: #fff!important;
    margin-right:50px;
}
    .win{
        color: #55a532;
    }
    .loss{
        color: red;
    }
.top_name{height: 112px}
.top_txt,.title_left span{
    margin-left: 24px;
}
</style>