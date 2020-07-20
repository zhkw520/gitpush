<template>
    <div>
        <div class="top_name">
            <span class="top_txt">个人中心/查看意见详情</span>
            <div class="title_left">
                <span>查看意见详情</span>
            </div>
        </div>
        <div class="centNavBox">
            <div class="titl_right">
                <div class="message">
                    <span class="message_name">用户名</span>
                    <span class="message_box">{{messageData.user.user_name}}</span>
                </div>
                <div class="message">
                    <span class="message_name">用户账号</span>
                    <span class="message_box">{{messageData.user.email}}</span>
                </div>
                <div class="message">
                    <span class="message_name">问题类型</span>
                    <span class="message_box">{{messageData.fd_type}}</span>
                </div>
                <div class="message">
                    <span class="message_name">提交时间</span>
                    <span class="message_box">{{messageData.created_at}}</span>
                </div>
                <div class="message">
                    <span class="message_name message_top">问题描述</span>
                    <div class="issue">{{messageData.fd_desc}}</div>
                </div>
                <div class="message">
                    <span class="message_name message_top">相关图片</span>
                    <div v-if="messageData.fd_pics.length>0" class="ps" v-for="(item,index) in messageData.fd_pics"><img :src="item"/></div>
                    <span v-if="messageData.fd_pics.length==0" class="message_box">无</span>
                </div>
            </div>
            <div class="btn_bottom" @click="back">
            <span>
                返回
            </span>
            </div>

        </div>
    </div>

</template>

<script>
    export default {
        name: "details",
        data(){
            return {
                    messageData:{},
            }
        },
        mounted(){
            this.getMessage();
        },
        methods:{
            getMessage(){
                let params = {fd_id:this.$route.query.fd_id};
                this.api.feedback_detail({params}).then((res)=>{
                    this.messageData = res;
                })
            },
            back(){
                this.$router.push({
                    path:'/userinfo/feedback'
                })
            },
        }
    }
</script>

<style scoped>
    .top_name{
        height: 109px;
        z-index: 999999;
    }
    .top_txt{
        display: inline-block;
        margin-left: 24px;
    }
    .title_left>span{
        display: inline-block;
        margin-left: 24px;
        font-size:20px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(50,50,50,1);
    }
    .centNavBox{
        width: 100%;
        padding: 24px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background: #FFF;
        margin-top:194px;
    }
.title_name>span{
    font-size:20px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(54,54,54,1);
    display: block;
}

.message{
    margin-bottom: 46px;
}
.message_name{
    display: inline-block;
    width: 70px;
    text-align: right;
    margin-right: 24px;
    font-size:14px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(31,46,77,1);
}
.message_top{
    vertical-align: top;
}
.issue{
    display: inline-block;
    width:1020px;
    height:170px;
    border:1px solid #f7f9fc;
    border-radius:5px;
    word-wrap :break-word;
    padding: 10px;
    color:#8F9BB3;
}
.ps{
    display: inline-block;
    width:160px;
    height:153px;
    border: 1px solid #ddd;
    margin-right: 20px;
}
.ps>img{
    width:160px;
    height:153px;
}
.ps:last-child{
    margin-right: 0;
}
.btn_bottom{
    text-align: left;
    margin-top: 100px;
}
.btn_bottom>span{
    display: inline-block;
    width:68px;
    height:36px;
    text-align: center;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
    cursor: pointer;
   line-height: 36px;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(61,73,102,1);
}
.message_box{
    display: inline-block;
    width: 500px;
    font-size:16px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:#8F9BB3;
    text-align: left!important;
}
</style>