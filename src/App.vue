<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import MiniSite from 'common/js/jsLoader.js'
  export default {
    name: "app",
    created(){
      var isAndroid = window.navigator.appVersion.match(/android/gi);
		  if(isAndroid) {
			  MiniSite.JsLoader.load("static/js/checkRem.js", function() {});
		  }
    }
  };

</script>

<style lang="less">
  @import "~vux/src/styles/reset.less";
  html,
  body {
    height: 100%;
    width: 100%;
    background: #F5F5F5;
  }
  .vux-header {
    background-color: #00a561!important;
  }
  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 16px;
    font-family: arial, microsoft yahei, helvetica, sans-serif;
    color: #555;
  }

  .weui-cells {
    margin-top: 0px !important;
    /*background-color: #00a561 !important;*/
  }
.weui-form-preview__label{
  color: #555!important;
  font-size: 15px;
}
  hr {
    -webkit-margin-after: 0px !important;
    -webkit-margin-before: 0px !important;
  }
  .vux-cell-value{
    color: #555!important;
  }
  // 载入字体颜色
  .weui-toast__content{
    color: white !important;
  }
  // popup 颜色
  .vux-popover {
    color: white !important;
    z-index: 99 !important;
  }
</style>
