<template>
    <div class="ware">
      <div class="head">
        <div class="go_back" @click="goBack"></div>
        <div class="title">仓库</div>
      </div>
      <div class="wares">
        <div class="ware_specific" @click="goHtmlWare">html+css练习库</div>
        <div class="ware_specific" @click="goJsWare">JavaScript练习库</div>
        <div class="ware_specific" @click="goVueWare">vue练习库</div>
        <div class="ware_specific" @click="goCountWare">算法练习库</div>
        <div class="ware_specific" @click="goCompleteWare">完整项目库</div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Ware",
      data(){
          return{

          }
      },
      methods:{
        goBack(){
          window.history.go(-1);
        },
        goHtmlWare(){
          this.$router.push({
            path: "/htmlWare",
            query: {}
          });
        },
        goJsWare(){
          this.$router.push({
            path: "/jsWare",
            query: {}
          });
        },
        goVueWare(){
          this.$router.push({
            path: "/vueWare",
            query: {}
          });
        },
        goCountWare(){
          this.$router.push({
            path: "/countWare",
            query: {}
          });
        },
        goCompleteWare(){
          this.$router.push({
            path: "/completeWare",
            query: {}
          });
        },
      }
    }
</script>

<style scoped>
  .ware{
    height:100%;
    width:100%;
  }
  .head{
    height:44px;
    width:100%;
    background:#46A0F0;
    position:fixed;
    top:0;
    left:0;
    z-index:100;
  }
  .go_back{
    height:16px;
    width:16px;
    position:absolute;
    top:14px;
    left:20px;
    border-bottom:2px solid #fff;
    border-left:2px solid #fff;
    transform: rotate(45deg) ;
  }
  .title{
    height:44px;
    line-height:44px;
    width:50%;
    margin:auto;
    font-size:24px;
    color: #fff;
    text-align: center;
    letter-spacing:1.2px;
  }
  .wares{
    position:absolute;
    top:44px;
    left:0;
    width:100%;
    /*background:#fefefe;*/
    padding:6px 10px;

  }
  .ware_specific{
    width:92%;
    height:84px;
    background:#ffffee;
    box-sizing: border-box;
    border:1px solid black;
    border-radius:20px;
    margin:15px auto;
    font-size:22px;
    text-align:center;
    line-height:84px;
  }
</style>
