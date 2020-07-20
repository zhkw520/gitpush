<template>
    <div class="bg">
        <div class="tag">
            <div class="tit">
                <span>编辑运营标签</span>
                <img src="../../../public/img/gb.png" @click="qx()">
            </div>
            <div class="tags_con">
                <div class="tags_con_1">
                    <div>
                        <div>
                            <template>
                                <el-checkbox-group
                                        v-model="tags">
                                    <el-checkbox v-for="(item,index) in Operatorlist" :label="item.desc" >{{item.desc}}</el-checkbox>
                                </el-checkbox-group>
                            </template>
                        </div>
                    </div>
                </div>
                <div style="padding-left: 24px">
                    <span class="bc" @click="setTags()">保存</span>
                    <span class="qx" @click="qx()">取消</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['op_tags','ch_thid','channel'],
        name: "tags",
        data(){
            return{
                tags:this.op_tags.split(','),
                ta:[],
                Operatorlist:[],
            }
        },
        mounted(){
            this.getOperatorTag();

        },
        methods:{
            qx(){
                this.$parent.qxTags();
            },
            getOperatorTag(){
                this.api.common_operate_tags().then((res)=>{
                    this.Operatorlist=res;
                })
            },
            setTags(){
                for (var i=0;i<this.tags.length;i++){
                    for(var j=0;j<this.Operatorlist.length;j++){
                        var listD={
                            tags_id:'',
                            tags_name:'',
                        };
                        if(this.Operatorlist[j].desc==this.tags[i]){
                            listD.tags_id=this.Operatorlist[j].usertag;
                            listD.tags_name=this.Operatorlist[j].desc;
                            this.ta.push(listD);
                        }
                    }

                }
                let formData=new FormData;
                formData.append('ch_thid',this.ch_thid);
                formData.append('channel',this.channel);
                formData.append('op_tags',JSON.stringify(this.ta));
                this.api.themes_theme_channel_optags(formData).then((res)=>{
                    this.qx();
                    this.$emit('upload','a');
                })
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
    .tag{
        width:560px;
        height:317px;
        background:rgba(255,255,255,1);
        box-shadow:0px 2px 8px 0px rgba(0,0,0,0.2);
        border-radius:4px;
        position: relative;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
    }
    .tit{
        width: 100%;
        height: 56px;
        border-bottom: 1px solid #E6E9F0;
    }
    .tit span{
        display: inline-block;
        font-size:18px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(61,73,102,1);
        line-height: 50px;
        margin-left:24px ;
    }
    .tit img{
        margin-top: 15px;
        float: right;
        width:16px;
        height:16px;
        cursor: pointer;
        margin-right: 24px;
    }
    .tags_con{
        width: 100%;
        height: 259px;
    }
    .tags_con_1{
        width: 512px;
        padding: 14px 24px;
        height: 190px;
        overflow-y:auto;
    }
    .CJ{
        display: inline-block;
        line-height: 26px;
        text-align: center;
        cursor: pointer;
        padding: 3px 5px ;
        background: #d7d7d7;
        font-size: 12px;
        border-radius: 5px;
        margin-bottom: 10px!important;
    }
    input{
        width:316px;
        height:28px;
        padding-left:10px ;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-bottom: 14px;
    }
    .bc{
        display:inline-block;
        cursor: pointer;
        text-align: center;
        line-height: 36px;
        width:68px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);
        margin-right: 14px;
    }
    .qx{
        display:inline-block;
        cursor: pointer;
        text-align: center;
        line-height: 36px;
        width:68px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(61,73,102,1);
    }
</style>