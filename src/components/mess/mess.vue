<template>
    <div class="mess">
      <div class="head">
        <div class="go_back" @click="goBack"></div>
        <div class="title">留言板</div>
      </div>
      <div class="content">
        <div class="mess_write" @click="goMessIssue">留个言吧...</div>
        <div class="mess_show">
          <div v-bind:class='["mess_list",{"mark_mess":item.star}]' v-for="(item,index) in mess_list" :key="index">
            <div class="visitor">{{item.visitor}}</div>
            <div class="time">{{item.time}}</div>
            <div class="mess_content">{{item.content}}</div>
            <div v-bind:class='["setup",{"on_setup":boardFlag==index}]' @click="listShow(index)"></div>
            <div class="board" v-show="boardFlag==index">
              <div class="board_item" @click="markMess(index)">{{item.star ? "取消星标" : "星标"}}</div>
              <div class="board_item">删除</div>
            </div>
          </div>
        </div>
      </div>
      <div class="screen_lock" v-show="screenLockFlag"></div>
    </div>
</template>

<script>
    export default {
      name: "itemWare",
      data(){
        return{
          mess_list:[{
            visitor:'长胖的谢鑫',
            time:'2019-03-03 18:53',
            star:false,
            content:'宝宝最棒棒宝宝最棒棒宝宝最棒棒宝宝最棒棒宝宝最棒棒宝宝最棒棒宝宝最棒棒宝宝最棒棒！！！'
          },{
              visitor:'聪明的脑壳儿',
              time:'2019-03-03 19:34',
              star:false,
              content:'跟我念句话：孩子你是最棒的！重复这句话，孩子你是最棒的！！！'
            },{
              visitor:'傻傻的脑瓜儿',
              time:'2019-03-03 21:33',
              star:false,
              content:'从前有座山，山上有座庙，庙里有个老和尚再给小和尚讲故事...'
            },{
            visitor:'长胖的谢鑫',
            time:'2019-03-03 18:53',
            star:false,
            content:'宝宝最棒棒宝宝最棒棒宝宝最棒棒宝宝最棒棒宝宝最棒棒宝宝最棒棒宝宝最棒棒宝宝最棒棒！！！'
          },{
            visitor:'聪明的脑壳儿',
            time:'2019-03-03 19:34',
            star:false,
            content:'跟我念句话：孩子你是最棒的！重复这句话，孩子你是最棒的！！！'
          },{
            visitor:'傻傻的脑瓜儿',
            time:'2019-03-03 21:33',
            star:false,
            content:'从前有座山，山上有座庙，庙里有个老和尚再给小和尚讲故事...'
          }],
          boardFlag:-1,
          screenLockFlag:false,
          boardColorFlag:-1,
        }
      },
      methods:{
        goMessIssue(){
          this.$router.push({
            path: "/messissue",
            query: {}
          });
        },
        goBack(){
          window.history.go(-1);
        },
        listShow(index){
          if(this.boardFlag==-1){
            this.boardFlag=index;
          }else{
            this.boardFlag=-1;
          }
          this.screenLockFlag=!this.screenLockFlag;
        },
        markMess(index){
          this.flag=index;
          if(this.boardColorFlag==-1){
            this.boardFlag=-1;
            this.screenLockFlag=!this.screenLockFlag;
            this.boardColorFlag=index;
            // this.mess_list[index].star=true;
          }else{
            this.screenLockFlag=!this.screenLockFlag;
            this.boardColorFlag=-1;
            this.boardFlag=-1;
            // this.mess_list[index].star=false;
          }
          this.mess_list[index].star=!this.mess_list[index].star;
        }
      },
      computed:{
      },
      created(){// 相当于window.onload
      }
    }
</script>

<style scoped>
  .mess{
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
  .content{
    position:absolute;
    top:44px;
    left:0;
    width:100%;
  }
  .mess_write{
    box-sizing: border-box;
    height:44px;
    width:100%;
    border:1px solid #eee;
    color:#999;
    font-size:18px;
    line-height:46px;
    text-indent:5px;
    box-shadow:0 7px 8px 0 rgba(86,95,132,0.11);
    padding-left:10px;
    /*background:#fefefe;*/
  }
  .mess_show{
    position: absolute;
    top:50px;
    left:0;
    width:100%;
    /*background:#fefefe;*/
  }
  .mess_list{
    position: relative;
    margin:2px 0 0 0;
    box-sizing: border-box;
    height:auto;
    padding:14px 0 16px 0;
    width:100%;
    border-left:1px solid #eee;
    border-right:1px solid #eee;
    border-bottom:1px solid #eee;
    box-shadow:0 6px 8px 0 rgba(86,95,132,0.11);
  }
  .mark_mess{
    background:#ffffee;
  }
  .visitor{
    display:inline-block;
    margin-left:18px;
    height:30px;
    line-height:30px;
    font-size:20px;
    color:#333;
  }
  .setup{
    position: absolute;
    top:22px;
    right:14px;
    display:inline-block;
    height:10px;
    width:10px;
    margin-right:20px;
    border-bottom:2px solid #aaa;
    border-right:2px solid #aaa;
    transform: rotate(45deg);
    z-index:99;
  }
  .on_setup{
    border-bottom:2px solid #fff;
    border-right:2px solid #fff;
  }
  .time{
    margin:0 auto 0 18px;
    height:20px;
    width:120px;
    line-height:20px;
    font-size:14px;
    color:#888;
    /*border: 1px solid black;*/
  }
  .mess_content{
    /*margin:5px auto 0 30px;*/
    box-sizing: border-box;
    min-height:30px;
    width:100%;
    padding: 2px 19px 0 24px;
    line-height:25px;
    font-size:20px;
    font-family:楷体;
    color:royalblue;
    text-indent:10px;
  }
  .board{
    position:absolute;
    top:35px;
    right:35px;
    border:1px solid #ccc;
    width:110px;
    background:#fff;
    z-index:99;
    /*display:none;*/
  }
  .board_item{
    border-bottom: 0.5px solid #ccc;
    height:55px;
    line-height:55px;
    text-align: center;
    font-size:18px;
    color:#323232;
    z-index:99;
    letter-spacing:3px;
  }
  .screen_lock{
    z-index:98;
    background:#000;
    opacity:0.2;
    position:fixed;
    top:0;
    left:0;
    height:100%;
    width:100%;
    /*display:none;*/
  }
</style>
