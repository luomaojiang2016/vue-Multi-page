<template>
    <div class="activetion-alert">
        {{$t('activation.activetionSuccess')}}
    </div>
</template>

<script>
    export default {
        name: "active-success"
    }
</script>

<style scoped>
  .activetion-alert{
    position: absolute;
    width: 300px;
    height: 50px;
    line-height: 50px;
    left: 50%;
    top: 30%;
    text-align: center;
    transform: translate(-50%,-50%);
    background-color: #fef0f0;
    color: #f56c6c;
    border-radius: 5px;
  }
</style>
