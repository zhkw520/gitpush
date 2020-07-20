<template>
    <div class="bg" @click="heid">
        <div class="content"  @click.stop>
            <div class="tit">
                <span>上传说明</span>
            </div>
            <div class="txt">
                <ul>
                    <li>• 不得含有毒品及相关元素隐喻，不得出现低俗网络用语及违反社会主义道德文明的用语
                          不得含有政治、军事、宗教、迷信、色情、暴力等不文明的素材及文案。
                    </li>
                    <li>
                        • 需保证语句通顺完整，不能存在多字、少字、错字等情况。
                    </li>
                    <li>
                        • 广告中数字、标点符号的用法和计量单位，应符合国家标准和有关规定，需使用具备语
                          句意义的标点符号，不能连续使用相同的标点符号，如：“！！！”。
                    </li>
                    <li>
                        • 不得侵权，不得攻击、抄袭、盗用他人的作品、品牌及产品。
                    </li>
                    <li>
                        • 与推广内容需有关联性，不得夸大、虚假、不实宣传。
                    </li>
                    <li>
                        • 不可使用任何有版权的字体及素材。
                    </li>
                </ul>
            </div>
            <img src="../../../public/img/yc.png" @click="heid"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "hint-message",
        data(){
            return {}
        },
        methods:{
            heid(){
                this.$parent.YCHint();
            }
        }

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
 .content{
     position: absolute;
     left: 50%;
     top:30%;
     transform:translate(-50%,-50%);
     width:742px;
     height:365px;
     background:rgba(255,255,255,1);
     border-radius:5px;
 }
.tit{
    margin: 39px 0 29px 0;
    text-align: center;
}
.tit span{
    display: inline-block;
    font-size:20px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(54,54,54,1);
}
.txt{
    margin: 0 61px!important;
}
.txt li{
    margin-bottom: 15px;
    font-size:16px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
}
img{
    position: relative;
    top: -341px;
    left: 702px;
    cursor: pointer;
}
</style>