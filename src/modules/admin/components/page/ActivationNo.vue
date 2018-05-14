<template>
    <div class="activetion-alert">
        <p>{{$t('activation.activetionFail')}}</p>
        <p :model=errorCode>{{$t('activation.activettionErrorCode')}}{{errorCode}}</p>
    </div>
</template>

<script>
    export default {
        name: "active-success",
        data(){
          return{
            errorCode:''
          }
        },
      methods: {
        getParams () {
          let routerParams = this.$route.query.error;
          this.errorCode = routerParams;
        },
      },
      mounted(){
        this.getParams ()
      }
    }
</script>

<style scoped>
  .activetion-alert{
    position: absolute;
    width: 300px;
    height: 100px;
    left: 50%;
    top: 30%;
    text-align: center;
    transform: translate(-50%,-50%);
    background-color: #fef0f0;
    color: #f56c6c;
    border-radius: 4px;
  }
  .activetion-alert P{
    line-height: 50px;
  }
</style>
