
<template>
<div class="loading">
    <img src="img/loading.gif" alt="">
</div>
</template>

<script>
export default {
  name: 'Loading' // 定义的组件名称 使用时写法：loading
 
}
</script>

<style scoped>
.loading {
  position: fixed;
  left: 0;
  top: 0;
  /* background: url('../../public/img/loading.gif') center center no-repeat rgba(255,255,255,0.4); */
  width: 100%;
  height: 100%;
  z-index: 100;
  background: rgba(0,0,0,0.2);


}
img{
  position: absolute;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
}
</style>

