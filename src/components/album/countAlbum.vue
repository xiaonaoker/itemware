<template>
  <div class="count_album">
    <div class="head">
      <div class="go_back" @click="goBack"></div>
      <div class="title">算法图册</div>
    </div>
    <div class="add_content">
      <div class="add_border">
        <div class="add_cross">+</div>
      </div>
    </div>
    <div class="content">
      <div class="picture_list" v-for="(item,index) in pictures" :key="index">
        <img class="picture" :src="item.url">
        <div class="picture_note">{{item.note}}</div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "countAlbum",
      data(){
        return{
          pictures:[{
            url:"../../static/slider/album/04算法/01冒泡排序.png",
            note:"项目一：练习冒泡排序"
          },{
            url:"../../static/slider/album/04算法/02素数的挑选.png",
            note:"项目二：练习for循环"
          },{
            url:"../../static/slider/album/04算法/03水仙花数.png",
            note:"项目三：练习多重for循环"
          },{
            url:"../../static/slider/album/04算法/04公约公倍数.png",
            note:"项目三：练习辗转相除法应用"
          },{
            url:"../../static/slider/album/04算法/05规范大小写.png",
            note:"项目五：练习正则"
          },{
            url:"../../static/slider/album/04算法/06判断回文.png",
            note:"项目六：练习字符串和数组的操作"
          },{
            url:"../../static/slider/album/04算法/07斐波那契数列.png",
            note:"项目七：练习循环"
          },{
            url:"../../static/slider/album/04算法/08判断最多最少.png",
            note:"项目八：练习字符串和数组的操作"
          }]
        }
      },
      methods:{
        goBack(){
          window.history.go(-1);
        }
      },
    }
</script>

<style scoped>
  .count_album{
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
    /*letter-spacing:1.2px;*/
  }
  .add_content{
    position:absolute;
    top:44px;
    left:0;
    width:100%;
    background: #fffdea;
    padding-bottom:10px;
    box-shadow:0 2px 8px 0 rgba(86,95,132,0.1);
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
  .content{
    margin-top:20px;
    position: absolute;
    top:180px;
    left:0;
    width:100%;
    padding:0 0 20px;
    height:auto;
    /*box-sizing: border-box;*/
    /*border-top:1px solid black;*/
  }
  .picture_list{
    box-sizing: border-box;
    border-bottom:1px solid #ccc;
    box-shadow:0 2px 8px 0 rgba(86,95,132,0.1);
    width:100%;
    margin-top:5px;
    background:#fefefe;
    padding:10px;
    height:auto;
  }
  .picture{
    margin:10px auto 0;
    height:160px;
    width:320px;
    /*background:url("../../assets/images/album/04算法/02素数的挑选.png") center;*/
    background-size:100%;
  }
  .picture_note{
    margin:auto;
    height:auto;
    width:80%;
    font-size:18px;
    line-height:24px;
    font-family:宋体;
    color:#444;
    padding-top:4px;
  }
</style>
