<template>
 <div>
     <div class="top_name">
            <span class="top_txt" @click='fh(-2)'>素材付款&nbsp;/</span>
            <span class="top_txt" @click='fh(-1)'>&nbsp;分成管理&nbsp;/</span>
            <span class="top_txt" @click='fh(-1)'>&nbsp;价格管理&nbsp;/</span>
            <span class="top_txt" @click='fh(-1)'>&nbsp;修改记录&nbsp;/</span>
            <span class="top_txt">&nbsp;查看详情</span>
            <div class="title_left">
                <span>查看详情</span>
            </div>
        </div>
        <div class='content'>
            <div class='tit_box'>
                <span>处理人</span>
                <span></span>
                <span>更新时间</span>
                <span></span>
                <span class='before'>变更前</span>
                <span class='after'>变更后</span>
            </div>
            <div class='box_left'>
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
            </div>
            
           <div class='box_right'>
                <div class='tit_box'>
                    <span>默认数据有效率</span>
                    <input type="text">
                </div>
                <div class='tit_box'>
                   
                    <span>分成价格(元)</span>
                    <input type="text">
                    <span>分成方式</span>
                    <select>
                        <option value="">ecpm</option>
                        <option value="">ecpc</option>
                    </select>
                </div>
                <div  class='tit_box'>
                   
                    <span>分成价格(元)</span>
                    <input type="text">
                    <span>分成方式</span>
                    <select>
                        <option value="">ecpm</option>
                        <option value="">ecpc</option>
                    </select>
                </div>
                <div class='tit_box'>
                  
                    <span>分成价格(元)</span>
                    <input type="text">
                    <span>分成方式</span>
                    <select>
                        <option value="">ecpm</option>
                        <option value="">ecpc</option>
                    </select>
                </div>
                <div class='tit_box'>
                    
                    <span>分成价格(元)</span>
                    <input type="text">
                    <span>分成方式</span>
                    <select>
                        <option value="">ecpm</option>
                        <option value="">ecpc</option>
                    </select>
                </div>
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
    
   
    .tit_box span{
        display: inline-block;
        margin:0 16px 30px 24px;

    }
    .tit_box input{
        width: 140px;
        height: 32px;
        padding-left: 10px;
        border-radius: 3px;
    }
    .tit_box select{
        width:150px;
        height: 36px;
        border-radius: 3px;
    }
   
    .before,.after{
        padding: 3px 5px;
        border:1px solid #000;
        color:#000;
        font-weight: bold;
    }
    .before{
        background: #3377ff;
    }
    .after{
        background: red;
    }
    .box_left,.box_right{
        display: inline-block;
    }
    .box_right{
        padding-left: 40px;
        margin-left: 40px;
        border-left: 1px solid #ddd;
    }
</style>
