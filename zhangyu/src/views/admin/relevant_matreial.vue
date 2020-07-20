<template>
    <div class="bg" @click="yc()">
        <div class="cont" @click.stop>
            <div class="title">
                <span>相关素材</span>
                <img src="../../../public/img/gb.png" @click="yc()"/>
            </div>
            <div class="images">
                <div v-for="item in dataLIST" class="aaa">
                    <img :src="item.prev_uri" v-if="(item.prev_uri.split('.'))[(item.prev_uri.split('.')).length-1]!='mp4'"/>
                    <video :src="item.prev_uri" controls="controls" v-if="(item.prev_uri.split('.'))[(item.prev_uri.split('.').length-1)]=='mp4'"></video>
                    <span>{{item.mid}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['num','material'],
        name: "relevant_matreial",
        data(){
            return{
                dataLIST:[],
            }
        },
        mounted(){
                this.getLIST();
        },
        methods:{
            getLIST(){
                if(this.material==1){
                    let params = {'mid':this.num}
                    this.api.material_bind_get({params}).then((res)=>{
                        this.dataLIST = res
                    })
                }else{
                    let params={"mfid":this.num};
                        this.api.mfinal_bind_get({params}).then((res)=>{
                            this.dataLIST = res
                        })
                    }
                },
                yc(){
                  this.$parent.heidRel();
                }
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
    right:0;
}
.cont{
    position: absolute;
    left: 50%;
    top:30%;
    transform: translateX(-50%);
    width:576px;
    height:468px;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 8px 0px rgba(0,0,0,0.2);
    border-radius:4px;
}
.title{
    height: 56px;
    border-bottom: 1px solid #E6E9F0;
}
.title span{
    display: inline-block;
    text-align: center;
    line-height: 56px;
    font-size:18px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(61,73,102,1);
    margin-left: 24px;
}
.title img{
    width: 16px;
    height: 16px;
    position: relative;
    right: -443px;
}
.images{
    overflow-y: auto;
    height: 400px;
}
.aaa{
    display: inline-block;
    margin:24px 0 0  24px;
    overflow-y: auto;
}
.aaa img,video{
    width:252px;
    height:326px;
    background:rgba(216,216,216,1);
    border-radius:4px;
}
.aaa span{
    display: block;
    font-size:18px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(48,144,240,1);
    margin-top: 14px;
}
</style>