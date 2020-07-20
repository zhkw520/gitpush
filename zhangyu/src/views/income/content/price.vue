<template>
 <div>
     <div class="top_name">
            <span class="top_txt" @click='fh(-2)'>素材付款&nbsp;/</span>
            <span class="top_txt" @click='fh(-1)'>&nbsp;分成管理&nbsp;/</span>
            <span class="top_txt">&nbsp;价格管理</span>
            <div class="title_left">
                <span>价格管理</span>
            </div>
        </div>
        <div class='content'>
            <div class='btns'>
                <span class='bj'>编辑</span>
                <span @click='log()'>修改记录</span>
            </div>
            <div class='tit_box'>
                <span>默认数据有效率</span>
                <input type="text">
            </div>
             <div class='tit_box'>
                <span>素材类型</span>
                <select>
                    <option value="">广告图</option>
                    <option value="">广告模板</option>
                    <option value="">场景锁屏-壁纸</option>
                    <option value="">场景锁屏-动效</option>
                </select>
                <span>分成价格(元)</span>
                <input type="text">
                 <span>分成方式</span>
                <select>
                    <option value="">ecpm</option>
                    <option value="">ecpc</option>
                </select>
            </div>
             <div  class='tit_box'>
                <span>素材类型</span>
                <select>
                    <option value="">广告图</option>
                    <option value="">广告模板</option>
                    <option value="">场景锁屏-壁纸</option>
                    <option value="">场景锁屏-动效</option>
                </select>
                <span>分成价格(元)</span>
                <input type="text">
                 <span>分成方式</span>
                <select>
                    <option value="">ecpm</option>
                    <option value="">ecpc</option>
                </select>
            </div>
             <div class='tit_box'>
                <span>素材类型</span>
                <select>
                    <option value="">广告图</option>
                    <option value="">广告模板</option>
                    <option value="">场景锁屏-壁纸</option>
                    <option value="">场景锁屏-动效</option>
                </select>
                <span>分成价格(元)</span>
                <input type="text">
                 <span>分成方式</span>
                <select>
                    <option value="">ecpm</option>
                    <option value="">ecpc</option>
                </select>
            </div>
             <div class='tit_box'>
                <span>素材类型</span>
                <select>
                    <option value="">广告图</option>
                    <option value="">广告模板</option>
                    <option value="">场景锁屏-壁纸</option>
                    <option value="">场景锁屏-动效</option>
                </select>
                <span>分成价格(元)</span>
                <input type="text">
                 <span>分成方式</span>
                <select>
                    <option value="">ecpm</option>
                    <option value="">ecpc</option>
                </select>
            </div>
            <div class='button'>
                <span class="bc">保存</span>
                <span>取消</span>
            </div>
        </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {

     }
   },
   methods:{
       log(){
           this.$router.push({
               path:"./AmendantRecord"
           })
       },
   },

 }
</script>

<style scoped>
     .top_name{
         height:112px!important;
        background:rgba(255,255,255,1);
    }
    .title_left span{
        display: inline-block;
        font-size:20px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(50,50,50,1);
        margin-left: 24px;
        text-align: right;
    }
    .top_txt{
        display: inline-block;
        margin-left: 24px;
        cursor: pointer;
    }
    .content{
        margin-top: 199px;
        background: #fff;
    }  
    .btns{
        width: 100%;
        text-align: right;
    }
    .btns span{
        width: 90px;
        height: 36px;
        text-align: center;
        border:1px solid #ddd;
        border-radius: 3px;
        line-height: 36px;
        margin: 24px 24px 40px 0;
        display: inline-block;
        cursor: pointer;
    }
    .bj{
        background: #3377ff;
        color:#fff;
        border:0!important
    }
   
    .tit_box span{
        display: inline-block;
        margin:0 16px 30px 24px;

    }
    .tit_box input{
        width: 190px;
        height: 32px;
        padding-left: 10px;
        border-radius: 3px;
    }
    .tit_box select{
        width:200px;
        height: 36px;
        border-radius: 3px;
    }
    .button span{
        display: inline-block;
        width: 90px;
        height: 36px;
        border-radius: 3px;
        line-height: 36px;
        text-align: center;
        border:1px solid #ddd;
        margin-left: 24px;
        margin-bottom: 50px;
        cursor: pointer;
    }
    .bc{
        background: #3377ff;
        border:0!important;
        color:#fff;
    }
    
</style>

