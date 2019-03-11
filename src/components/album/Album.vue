<template>
  <div class="album">
    <div class="head">
      <div class="go_back" @click="goBack"></div>
      <div class="title">图册</div>
    </div>
    <div class="albums">
      <div class="album_specific" @click="goHtmlAlbum">html+css图册</div>
      <div class="album_specific" @click="goJsAlbum">JavaScript图册</div>
      <div class="album_specific" @click="goVueAlbum">vue图册</div>
      <div class="album_specific" @click="goCountAlbum">算法图册</div>
      <div class="album_specific" @click="goCompleteAlbum">完整项目图册</div>
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
      goHtmlAlbum(){
        this.$router.push({
          path: "/htmlAlbum",
          query: {}
        });
      },
      goJsAlbum(){
        this.$router.push({
          path: "/jsAlbum",
          query: {}
        });
      },
      goVueAlbum(){
        this.$router.push({
          path: "/vueAlbum",
          query: {}
        });
      },
      goCountAlbum(){
        this.$router.push({
          path: "/countAlbum",
          query: {}
        });
      },
      goCompleteAlbum(){
        this.$router.push({
          path: "/completeAlbum",
          query: {}
        });
      },
    }
	}
</script>
<style>
  .album{
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
  .albums{
    position:absolute;
    top:44px;
    left:0;
    width:100%;
    /*background:#fefefe;*/
    padding:6px 10px;

  }
  .album_specific{
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
