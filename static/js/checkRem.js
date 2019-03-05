
(function (win) {
  var doc = win.document
  var docEl = doc.documentElement
  var tid
  // 获取样式值
  function getStyle (dom, attr) {
    if (window.getComputedStyle) {
      return window.getComputedStyle(dom, null)[attr]
    } else {
      return dom.currentStyle[attr]
    }
  }
  // 处理不规则的rem计算
  function fixFontSize (width, rem, html) {
    var body = doc.getElementsByTagName('body')[0]
    body.style.width = '10rem'
    var scale = 1
    var bodyWidth = parseInt(getStyle(body, 'width'))
    if (bodyWidth != width) {
      scale = width / bodyWidth
      rem = rem * scale
      docEl.style.fontSize = rem + 'px'
    }
    body.style.width = '100%'
  }

  // 计算root元素的字体大小
  function refreshRem () {
    var html = document.getElementsByTagName('html')[0]
    var width = parseInt(getStyle(html, 'width'))
    if (width > 768) { // 最大宽度
      width = 768
    }
    var rem = width / 10 // 将屏幕宽度分成10份， 1份为1rem
    docEl.style.fontSize = rem + 'px'
    fixFontSize(width, rem)
  }
  win.addEventListener('resize', function () {
    clearTimeout(tid)
    tid = setTimeout(refreshRem, 300)
  }, false)
  win.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      clearTimeout(tid)
      tid = setTimeout(refreshRem, 300)
    }
  }, false)
  refreshRem()
})(window)
