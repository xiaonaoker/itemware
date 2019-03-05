<template>
  <div class="ablum">
    <div class="head">
      <div class="go_back" @click="goBack"></div>
      <div class="title">图册</div>
    </div>
  </div>
</template>
<script>
	export default{
    data(){
      return{

      }
    },
    methods:{
      goBack(){
        window.history.go(-1);
      },
    }
	}
</script>
<style>
  .ablum{
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
  }
</style>
