<template>
  <div class="js_album">
    <div class="head">
      <div class="go_back" @click="goBack"></div>
      <div class="title">vue图册</div>
    </div>
    <div>
      <div :class='["tip",{"tip_hide":content_flag}]'>啊偶...这里还没有内容呢</div>
    </div>
    <div class="add_content">
      <div class="add_border">
        <div class="add_cross">+</div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "vueAlbum",
      data(){
        return{
          content_flag:true,
        }
      },
      methods:{
        goBack(){
          window.history.go(-1);
        }
      },
      created(){
        setTimeout(()=>{this.content_flag=!this.content_flag;},1000);
        setTimeout(()=>{this.content_flag=!this.content_flag;},2400);
      },
    }
</script>

<style scoped>
  .vue_album{
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
  .tip{
    position: absolute;
    top:24%;
    left:5%;
    width:90%;
    height:58px;
    line-height:58px;
    text-align: center;
    font-size: 26px;
    font-weight: bolder;
    background: #fffa43;
    /*opacity:0.9;*/
    color:#fff;
    z-index:99;
  }
  .tip_hide{
    display:none;
  }
  .add_content{
    position:absolute;
    top:44px;
    left:0;
    width:100%;
  }
  .add_border{
    box-sizing: border-box;
    border:8px double #cccfff;
    height:100px;
    width:68%;
    margin:22px auto;
    border-radius:14px;
  }
  .add_cross{
    text-align: center;
    line-height:84px;
    font-size:90px;
    color:#cccfff;
  }
</style>
