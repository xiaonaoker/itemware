<template>
  <div class="mess_issue">
    <div class="head">
      <div class="go_back" @click="goBack"></div>
      <div class="title">写留言</div>
      <div class="issue" @click="issue">发表</div>
    </div>
    <div class="content">
      <div>
        <textarea :class='["write",{"to_bloder":focus_flag2},{"ipt_color":focus_flag1}]' v-model="ipt"></textarea>
        <div class="count">{{ipt.length}}/120</div>
      </div>
      <div class="choose">
        <div :class='["choose_items",{"focus_color":focus_flag1}]' @click="iptColor">T</div><div :class='["choose_items",{"focus_color":focus_flag2},{"to_bloder":focus_flag2}]' @click="toBloder">B</div>
        <div :class='["choose_quick",{"focus_color":focus_flag3},{"to_bloder":focus_flag3}]' @click="shortMessShow">快捷留言</div>
      </div>
    </div>
    <div :class='["tip",{"tip_hide":loading_flag}]'>数据提交中</div>
    <div :class='["tip",{"tip_hide":success_flag}]'>发表成功</div>
    <div :class='["short_mess_area",{"tip_hide":short_mess_flag}]'>
      <div class="short_mess" @click="addShort1">路过路过~踩个小脚丫*^_^*</div>
      <div class="short_mess" @click="addShort2">好嗨哟!今天要继续加油噢！</div>
      <div class="short_mess" @click="addShort3">能力有待加强哦。不要放弃！</div>
      <div class="short_mess" @click="addShort4">项目棒棒！继续加油！</div>
      <div class="short_mess" @click="addShort5">坐等更新！</div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "messIssue",
      data(){
          return{
            ipt:"",
            loading_flag:true,
            success_flag:true,
            short_mess_flag:true,
            focus_flag1:false,
            focus_flag2:false,
            focus_flag3:false,
            n:-1,
            str:"",
          }
      },
      methods:{
        goBack(){
          window.history.go(-1);
        },
        shortMessShow(){
          this.short_mess_flag=!this.short_mess_flag;
          this.focus_flag3=!this.focus_flag3;
        },
        addShort1(){
          this.ipt=this.ipt+"路过路过~踩个小脚丫*^_^*";
        },
        addShort2(){
          this.ipt=this.ipt+"好嗨哟!今天要继续加油噢！";
        },
        addShort3(){
          this.ipt=this.ipt+"能力有待加强哦。不要放弃！";
        },
        addShort4(){
          this.ipt=this.ipt+"项目棒棒！继续加油！";
        },
        addShort5(){
          this.ipt=this.ipt+"坐等更新！";
        },
        toBloder(){
          window.localStorage.setItem("mess_n","-1");
          this.focus_flag2=!this.focus_flag2;
          if(this.focus_flag3==true){
            this.short_mess_flag=!this.short_mess_flag;
            this.focus_flag3=!this.focus_flag3;
          }
        },
        iptColor(){
          this.focus_flag1=!this.focus_flag1;
          if(this.focus_flag3==true){
            this.short_mess_flag=!this.short_mess_flag;
            this.focus_flag3=!this.focus_flag3;
          }
        },
        issue(){
          if(this.ipt==0){
            alert("留言不能为空！")
          }else{
            this.loading_flag=!this.loading_flag;
            setTimeout(()=>{this.loading_flag=!this.loading_flag;this.success_flag=!this.success_flag;},1000);
            setTimeout(()=>{this.success_flag=!this.success_flag;this.ipt="";},2000);
            // let _this = this;
            // setTimeout(function () {
            //   _this.success_flag=!_this.success_flag;_this.ipt="";
            // },2000);
            window.localStorage.removeItem("visitor");
            window.localStorage.removeItem("time");
            window.localStorage.removeItem("content");

            window.localStorage.setItem("visitor","naoker");
            window.localStorage.setItem("time","2019-03-07 17:54");
            window.localStorage.setItem("content",this.ipt);

            this.str=window.localStorage.getItem("mess_str");
            this.str=this.str+"{\"visitor\":\""+window.localStorage.getItem("visitor")+"\",\"time\":\""+window.localStorage.getItem("time")+"\",\"star\":false,\"content\":\""+window.localStorage.getItem("content")+"\"}###";
            window.localStorage.setItem("mess_str",this.str);
            this.n=eval(window.localStorage.getItem("mess_n"));
            this.n=this.n+1;
            window.localStorage.setItem("mess_n",this.n);
          }
        },
      },
      created(){
      },
      watch:{
        ipt:function () {
          if(this.ipt.length>120){
            alert('超出长度限制');
            this.ipt = this.ipt.substr(0,120);
          }
        }
      },
    }
</script>


<style scoped>
  .mess_issue{
    height:100%;
    width:100%;
    /*background: #fefefe;*/
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
    font-size:24px;
    color: #fff;
    text-align: center;
    margin:auto;
    letter-spacing:1.2px;
  }
  .issue{
    position:absolute;
    top:2px;
    right:13px;
    height:44px;
    line-height:44px;
    font-size:23px;
    color: #fff;
    text-align: center;
    font-weight: lighter;
  }
  .content{
    position:absolute;
    top:44px;
    left:0;
    height:600px;
    width:100%;
  }
  .write{
    display:block;
    padding:11px 10px;
    height:220px;
    width:100%;
    text-indent:24px;
    resize:none;
    font-size:23px;
    font-family:楷体;
    color:#888;
    background:#fefefe;
    line-height:28px;
    /*text-align:center;*/
  }
  .choose{
    background: #ffffff;
    height:45px;
    width:100%;
    box-shadow:0 4px 8px 0 rgba(86,95,132,0.1);
    position:relative;
  }
  .choose_items{
    display: inline-block;
    height:32px;
    width:32px;
    border-radius:32px;
    margin-left:21px;
    margin-top:7px;
    text-align: center;
    line-height: 32px;
    background:#bbbccc;
    color:#fff;
    font-size:16px;
    letter-spacing:1.2px;
  }
  .choose_quick{
    position: absolute;
    top:7px;
    right:28px;
    height:32px;
    width:72px;
    border-radius:10px;
    text-align: center;
    line-height: 32px;
    background:#bbbccc;
    color:#fff;
    font-size:15px;
    letter-spacing:1px;
  }
  .count{
    position: absolute;
    top:183px;
    right:24px;
    letter-spacing:1.2px;
    font-size:21px;
    color:lightgreen;
  }
  .tip{
    position: absolute;
    top:20%;
    left:25%;
    width:50%;
    height:56px;
    line-height:56px;
    text-align: center;
    font-size: 26px;
    font-weight: bolder;
    background: #5fee56;
    opacity:0.7;
    color:#fff;
  }
  .tip_hide{
    display:none;
  }
  .short_mess_area{
    box-sizing:border-box;
    border:0.6px solid #ccc;
    position: absolute;
    top:314px;
    width:100%;
  }
  .short_mess{
    box-sizing:border-box;
    border-bottom:0.5px solid #aaa;
    height:40px;
    width:100%;
    line-height:40px;
    text-align: center;
    font-size:22px;
    background:#fefefe;
    font-family:楷体;
  }
  .focus_color{
    background:#46A0F0;
  }
  .to_bloder{
    font-weight:bolder;
  }
  .ipt_color{
    color:#fff;
    background:#bbb;
  }
</style>
