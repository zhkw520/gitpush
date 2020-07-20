<template>
    <div>
        <div class="top_tit">
            <div class="tit_top_url">
                <span class="log_url" @click="fh">物料数据 &nbsp;/&nbsp;</span>
                <span class="new_url">物料相关素材详情</span>
            </div>
            <div class="tit_top_con">
                <span class="tit_name">物料相关素材详情</span>
            </div>
        </div>
        <div class="content_table">
            <div>
                <span class="wlID">物料ID:</span>
                <span>{{this.$route.query.mfid}}</span>
            </div>
            <div class="box-img">
                <div class="SC_img" v-for="item in listData">
                    <div class="SC_img">
                        <img :src="item.prev_uri" style="max-width: 252px;max-height: 326px"/>
                    </div>
                    <span class="ID">{{item.mid}}</span>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "material_related",
        data(){
            return{
                listData:[],
            }
        },
        mounted(){
            this.getDataList()
        },
        methods:{
            fh(){
                this.$router.go(-1);
            },
            getDataList(){
                let params = {mfid:this.$route.query.mfid};
                this.api.report_mfinal_material({params}).then((res)=>{
                    this.listData=res;
                })
            },

        },
    }
</script>

<style scoped>
    .top_tit{
        width:100%;
        height:112px;
        background:rgba(255,255,255,1);
        position: fixed;
        left: 256px;
        top: 64px;
        z-index: 99;
    }
    .content_table{
        margin-top:200px;
        background:rgba(255,255,255,1);
    }
    .SC_img{
        display: inline-block;
        margin-right: 76px;
        width:252px;
        height:326px;
        background:rgba(227,231,235,1);
        border-radius:4px;
    }
    .wlID{
        display: inline-block;
        margin: 32px 10px 24px 24px;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
    }
    .box-img{
        padding: 0 24px;
    }
    .ID{
        display: inline-block;
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(121,130,148,1);
        margin: 12px 0 40px 0;
    }
</style>