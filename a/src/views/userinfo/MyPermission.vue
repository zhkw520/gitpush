<template>
    <div>
        <div class="top_name">
            <span class="top_txt">个人中心/我的权限</span>
            <div class="title_left">
                <span>我的权限</span>
            </div>
            <div>
                <div class="tab_title_1">
                    <div class="tab_title_1_1">
                        <img :src="img" style="border-radius: 50%;width: 100px;height: 100px">
                    </div>
                    <div class="tab_title_1_1_1">
                        <p class="text_messages">{{user.role_name}}</p>
                        <p class="text_message_1 top_msg">{{user.note}}</p>
                    </div>
                </div>
                <div class="tab_right">
                    <div class="tab_title_1_2">
                        <p class="text_message">创建时间</p>
                        <p class="text_message_1">{{user.created_at}}</p>
                    </div>
                    <span class="line"></span>
                    <div class="tab_title_1_3">
                        <p class="text_message">状态</p>
                        <p class="text_message_1">{{user.status==1?'启用':'禁用'}}</p>
                    </div>
                </div>

            </div>

        </div>
        <div class="centNavBox">
            <div class="content">
                <div class="particulars"><span>权限详情</span></div>
                <el-table
                        :data="tableData2"
                        header-align="center"
                        :header-cell-style="getRowClass"
                        border
                        style="width: 96%;color:#000;margin: 0 30px">
                    <el-table-column
                            prop="group_name"
                            label="权限名称"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="note"
                            label="权限说明">
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "my-permission",
        data() {
            return {
                time: '2019/4/17',
                tableData2: [],
                user:{},
                img:'./img/user.png'
            }
        },
        mounted(){
            this.getUser();
            this.getUserMessgae()
        },
        methods: {
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:rgba(246,246,246,1);color:rgba(31,46,77,1);text-align:center;font-size:14px;font-weight:500;height:48px;'
                } else {
                    return ''
                }
            },
            getUser(){
                this.api.perm_userperm().then((res)=>{
                    this.tableData2 = res
                })
            },
            getUserMessgae(){
                let params = {email:localStorage.getItem('userAd')}
                this.api.get_account({params}).then((res)=>{
                    this.user = res.roles[0];
                    if(res.roles[0].icon!=''){
                        this.img=res.roles[0].icon
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .top_name{
        height: 237px;
        z-index: 999999;
    }
    .top_txt{
        display: inline-block;
        margin-left: 24px;
    }
.centNavBox{
    margin-top: 324px;
}

.tab_title{
    margin: 0 30px;
    height:130px;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 10px 0px rgba(0, 0, 0, 0.08);
    border-radius:5px;
}
.tab_title_1{
    display: inline-block;
    margin:0 0px 24px 44px;
}

.tab_title_1>.tab_title_1_2{
    margin-left: 0!important;
}
.tab_title_1_1{
    display: inline-block;
    width: 70px;

}

img{
    width: 80px;
}
.tab_title_1_2,.tab_title_1_3{
    display: inline-block;
   min-width: 146px;
    text-align: center;
}

.text_messages{
    margin-bottom: 10px;
    font-size:18px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(50,50,50,1);
    line-height:36px;

}
.top_msg{
    margin-top: 0!important;
}
.tab_title_1_1_1{
    display: inline-block;
    margin-left: 50px;
    vertical-align: top;
}
.text_message{
    font-size:16px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(143,155,179,1);
}

.particulars>span{
    display: inline-block;
    font-size:16px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(61,73,102,1);
    line-height:36px;
    margin: 24px;
}
.content .el-table--border, .el-table--group{
    margin-bottom: 24px;
}
.title_name>span{
    display: inline-block;
    width:80px;
    height:20px;
    font-size:20px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:36px;
}
.text_message_1{
    font-size:16px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(61,73,102,1);
    line-height:36px;
    margin-top: 19px;
}
.title_left{margin-bottom: 24px}
.title_left>span{
    display: inline-block;
    margin-left: 24px;
    font-size:20px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(50,50,50,1);
}
.tab_right{
    display: inline-block;
    float: right;
    margin-right: 270px;
}
    .line{
        display: inline-block;
        height: 56px;
        width: 1px;
        background: #e6e9f0;
    }
</style>