<template>
   <h2 class="page_header">晒单红包</h2>
   <div class="tab">
      <a href="show/tips?menuKey=st:show">数据统计</a>
      <a href="show/rule?menuKey=st:show" class="active">规则配置</a>
   </div>
   <datalist></datalist>
   <tablelist></tablelist>
</template>

<script>
   import datalist from './dataList.vue';
   import tablelist from './tablelist.vue';

   export default{
      components:{ datalist,tablelist }
   }
</script>

<style lang='sass'></style>