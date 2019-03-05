<template>
  <div class="home_bg">
    <div class="head">
      <div class="head_bg"></div>
      <div class="head_profile"></div>
      <div class="home_name">脑壳儿</div>
      <div class="home_sex">女</div>
      <div class="home_age">22岁</div>
    </div>
    <div class="nav">
      <div class="module" @click="goWare">仓库</div><div class="module" @click="goAblum">图册</div><div class="module" @click="goMess">留言板</div>
    </div>
    <div class="news">
      <div class="news_title">最新动态</div>
      <div class="new">
        <div class="new_title">仓库最新动态</div>
        <div class="new_content">这里是仓库最新动态内容，这里是仓库最新动态内容，这里是仓库最新动态内容，这里是仓库最新动态内容，这里是仓库最新动态内容，这里是仓库最新动态内容，这里是仓库最新动态内容。</div>
      </div>
      <div class="new">
        <div class="new_title">图册最新动态</div>
        <div class="new_content">这里是图册最新动态内容，这里是图册最新动态内容，这里是图册最新动态内容，这里是图册最新动态内容，这里是图册最新动态内容，这里是图册最新动态内容，这里是图册最新动态内容。</div>
      </div>
      <div class="new">
        <div class="new_title">留言板最新动态</div>
        <div class="new_content">这里是留言板最新动态内容，这里是留言板最新动态内容，这里是留言板最新动态内容，这里是留言板最新动态内容，这里是留言板最新动态内容，这里是留言板最新动态内容，这里是留言板最新动态内容。</div>
      </div>
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
      goWare(){
        this.$router.push({
          path: "/ware",
          query: {}
        });
      },
      goAblum(){
        this.$router.push({
          path: "/ablum",
          query: {}
        });
      },
      goMess(){
        this.$router.push({
          path: "/mess",
          query: {}
        });
      }

    },
    components:{

    },
    created(){

    }
  }
</script>

<style scoped>
  *{
    margin:0;
    padding:0;
  }
  .head{
    position:absolute;
    top:0;
    left:0;
    height:180px;
    width:100%;
  }
  .head_bg{
    height:100%;
    width:100%;
    background:url("../../assets/images/homeheadbg.png");
    background-size:100%;

  }
  .head_profile{
    position:absolute;
    top:54px;
    left:24px;
    box-sizing:border-box;
    height:100px;
    width:100px;
    /*border:1px solid black;*/
    border-radius:100px;
    overflow: hidden;
    background: url("../../assets/images/profile.png") no-repeat center;
    background-size: 100%;
  }
  .home_name{
    position:absolute;
    top:85px;
    left:160px;
    font-size:19px;
    /*color:#fff;*/
  }
  .home_sex{
    position:absolute;
    top:115px;
    left:156px;
    font-size:18px;
    /*color:#fff;*/
  }
  .home_age{
    position:absolute;
    top:115px;
    left:184px;
    font-size:18px;
    /*color:#fff;*/
  }
  .nav{
    position:absolute;
    top:180px;
    left:0;
    height:66px;
    width:100%;
    border-bottom:0.3px solid #eee;
    box-shadow:0 1px 1px 0 rgba(86,95,132,0.1);
  }
  .module{
    box-sizing: border-box;
    height:100%;
    width:33.3%;
    display:inline-block;
    border-left:0.5px solid #ddd;
    background:#ffffee;
    font-size:20px;
    text-align:center;
    line-height:67px;
    letter-spacing:1.5px;
  }
  .news{
    position:absolute;
    top:249px;
    left:0;
    width:100%;
    background:#fefefe;
  }
  .news_title{
    height:44px;
    width:100%;
    line-height:46px;
    font-size:22px;
    text-indent:20px;
    letter-spacing:2px;
    color: #ff8377;
    box-sizing: border-box;
    border-bottom:0.3px solid #ddd;
    box-shadow:0 1px 1px 0 rgba(86,95,132,0.1);
  }
  .new{
    margin-top:4px;
    min-height:200px;
    width:100%;
    box-sizing:border-box;
    border-bottom:0.5px solid #ddd;
    box-shadow:0 2px 8px 0 rgba(86,95,132,0.11);
    padding:10px 15px

  }
  .new_title{
    font-size:20px;
    color:#46A0F0;
  }
  .new_content{
    margin-top:3px;
    font-size:18px;
    text-indent:10px;
    color:#666;
  }
</style>
