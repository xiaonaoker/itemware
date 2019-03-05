// 工具类存取
import Vue from 'vue'
import {
  LoadingPlugin,
  AlertModule
} from 'vux'
import Axios from 'axios'
const BASE_URL = process.env.BASE_URL
Vue.use(LoadingPlugin)
// 遮罩累加器 每次弹出遮罩时自增1 请求结束自减1 若为0则取消遮罩层
var loadingAccumulator = 0
var UtilsBonc = function () {
  var getUrlType = function () {
    var thisURL = document.URL
    var getval = decodeURI(thisURL.split('?')[1])
    if (validateIsNull(getval)) {
      // 删除尾部的#/
      getval = getval.charAt(getval.length - 1) == '/' ? getval.substring(0, getval.length - 1) : getval
      getval = getval.charAt(getval.length - 1) == '#' ? getval.substring(0, getval.length - 1) : getval
      var key = decodeURIComponent(getval.split('=')[1])
      return JSON.parse(key)
    } else {
      return ''
    }
  }
  var getInsureCheckedListFromRes = function (res) {
    // 从接口返参中获取选中险种列表
    var list = []
    for (var i = 0, length = res.length; i < length; i++) {
      var sourceItem = res[i]
      var item = {
        'actuaryPremium': '0.0',
        'adjustRate': '1',
        'amount': '', //
        'amountCNY': '', //
        'basePremium': '', // 2.0为空
        'benchMarkPremium': '3045.24',
        'deductibleRate': '',
        'deductableFlag': '0', // TODO 不计免配额赋值
        'discount': '0.95',
        'discountPremium': '-75.92',
        'discountPremiumCNY': '0',
        'endDate': '2019-04-09',
        'endHour': '24',
        'itemCode': '', // 2.0写死空
        'itemDetailName': '车辆',
        'kindCode': '',
        'kindName': '',
        'm1Value': '',
        'modeCode': '', // 玻璃
        'modeName': '', // 玻璃种类
        'optionalFlag': '',
        'premium': '1442.53',
        'premiumCNY': '0',
        'quantity': '',
        'rate': '0',
        'shortRate': '49.86',
        'startDate': '2016-10-21',
        'startHour': '0',
        'unitAmount': '0'
      }
      Object.assign(item, sourceItem)
      list.push(item)
    }
    return list
  }
  var StorageGetter = function (key) {
    return localStorage.getItem(key)
  }
  var StorageSetter = function (key, val) {
    return localStorage.setItem(key, val)
  }
  //  根据身份证号判断性别
  var getCardSex = function (UUserCard) {
    //  获取性别
    if (parseInt(UUserCard.charAt(16)) % 2 == 1) {
      return '1' //  男
    } else {
      return '2'
    }
  }
  //  根据身份证号判断年龄
  var getCardAge = function (UUserCard) {
    //  获取年龄
    var myDate = new Date()
    var month = myDate.getMonth() + 1
    var day = myDate.getDate()
    var age
    if (UUserCard.length == 15) {
      let year = '19' + UUserCard.substring(6, 8)
      age = myDate.getFullYear() - year - 1
    } else {
      age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1
    }
    // var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1
    if ((UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month) && UUserCard.substring(12, 14) <= day) {
      age++
    }
    return age
  }
  // 认证接口获取token
  var OAuthRequest = function (params, callBack) {
    Vue.$vux.loading.show({
      text: '载入中'
    })
    loadingAccumulator++
    let req = {
      'param': params,
      'url': '/oauth/token'
    }
    Axios({
      method: 'post',
      // url: '/oauthProxy/oauth/token',
      url: BASE_URL,
      data: JSON.stringify(req),
      // auth: {
      //   username: 'chinalife',
      //   password: '1qaz!QAZ'
      // },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic Y2hpbmFsaWZlOjFxYXohUUFa'
      }
    })
      .then(res => {
        setTimeout(() => {
          loadingAccumulator--
          if (loadingAccumulator === 0) {
            Vue.$vux.loading.hide()
          }
        }, 0)
        callBack(res.data)
      })
      .catch(err => {
        setTimeout(() => {
          Vue.$vux.loading.hide()
        }, 0)
        AlertModule.show({
          title: '',
          content: err
        })
      })
  }
  var axiosRequest = function (params, path, callBack) {
    Vue.$vux.loading.show({
      text: '载入中'
    })
    loadingAccumulator++
    // qs序列化之前先将对象转成json串
    var req = {
      'url': path,
      'param': params
    }
    Axios({
      method: 'post',
      url: 'http://127.0.0.1:8998/transmit/transferNoEncrypt',
      data: JSON.stringify(req),
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cach'
      }
    })
      .then(res => {
        setTimeout(() => {
          loadingAccumulator--
          if (loadingAccumulator === 0) {
            Vue.$vux.loading.hide()
          }
        }, 0)
        if (res.data.hasOwnProperty('header') && res.data.header.status_code === '000000') {
          let resinfo = res.data.body
          callBack(resinfo)
        } else {
          console.log(JSON.stringify(res))
          console.log('出错接口入参====' + JSON.stringify(params))
          console.log('接口调用异常,' + JSON.stringify(res.data.body))
          callBack(res.data.body)
        }
      })
      .catch(err => {
        if (err instanceof Error && err.message.indexOf('timeout') > -1) {
          setTimeout(() => {
            loadingAccumulator--
            if (loadingAccumulator === 0) {
              Vue.$vux.loading.hide()
            }
            AlertModule.show({
              title: '',
              content: '连接超时'
            })
          }, 0)
        } else {
          console.log(err)
        }
      })
  }

  //  校验传入的对象是否为空,为空返回false，不为空返回true
  var validateIsNull = function (obj) {
    if (obj != null && obj != '' && obj != 'undefined' && obj != undefined) {
      return true
    }
    return false
  }

  //  校验传入的最后一个节点值是否为空,为空返回''，不为空返回节点值
  var validateNullToString = function (obj) {
    if (obj != null && obj != '' && obj != 'undefined' && obj != undefined) {
      return obj
    }
    return ''
  }
  //  身份证校验
  var identityCardVerify = function (type, scCard) {
    var vcity = {
      11: '北京',
      12: '天津',
      13: '河北',
      14: '山西',
      15: '内蒙古',
      21: '辽宁',
      22: '吉林',
      23: '黑龙江',
      31: '上海',
      32: '江苏',
      33: '浙江',
      34: '安徽',
      35: '福建',
      36: '江西',
      37: '山东',
      41: '河南',
      42: '湖北',
      43: '湖南',
      44: '广东',
      45: '广西',
      46: '海南',
      50: '重庆',
      51: '四川',
      52: '贵州',
      53: '云南',
      54: '西藏',
      61: '陕西',
      62: '甘肃',
      63: '青海',
      64: '宁夏',
      65: '新疆',
      71: '台湾',
      81: '香港',
      82: '澳门',
      91: '国外'
    }
    if (type == '01') { //  居民身份证
      if (scCard.length != 0) {
        if (!checkCard(scCard)) {
          Vue.alert('身份证号码格式错误')
          return false
        }
      } else {
        return false
      }
    } else {
      Vue.alert('请选择居民身份证')
      return false
    }
    return true

    function checkCard (obj) {
      if (checkCount(obj) === false) {
        return false
      }
      if (isCardNo(obj) === false) {
        return false
      }
      //  检查省份
      if (checkProvince(obj) === false) {
        return false
      }
      //  校验生日
      if (checkBirthday(obj) === false) {
        return false
      }
      //  检验位的检测
      if (checkParity(obj) === false) {
        return false
      }
      return true
    }

    function checkCount (obj) {
      if (obj.length != '15' && obj.length != '18') {
        return false
      }
      return true
    }

    function isCardNo (obj) {
      // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
      var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/
      if (reg.test(obj) === false) {
        return false
      }
      return true
    }
    // 取身份证前两位,校验省份
    function checkProvince (obj) {
      var province = obj.substr(0, 2)
      if (vcity[province] == undefined) {
        return false
      }
      return true
    }
    // 检查生日是否正确
    function checkBirthday (obj) {
      var len = obj.length
      // 身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
      if (len == '15') {
        var reFifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/
        var arrData = obj.match(reFifteen)
        var year = arrData[2]
        var month = arrData[3]
        var day = arrData[4]
        var birthday = new Date('19' + year + '/' + month + '/' + day)
        return verifyBirthday('19' + year, month, day, birthday)
      }
      // 身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
      if (len == '18') {
        var reEighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/
        var arrDataET = obj.match(reEighteen)
        var yearET = arrDataET[2]
        var monthET = arrDataET[3]
        var dayET = arrDataET[4]
        var birthdayET = new Date(yearET + '/' + monthET + '/' + dayET)
        return verifyBirthday(yearET, monthET, dayET, birthdayET)
      }
      return false
    }
    // 校验日期
    function verifyBirthday (year, month, day, birthday) {
      var now = new Date()
      var nowYear = now.getFullYear()
      // 年月日是否合理
      if (birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
        // 判断年份的范围（3岁到100岁之间)
        var time = nowYear - year
        if (time >= 0 && time <= 130) {
          return true
        }
        return false
      }
      return false
    }
    // 校验位的检测
    function checkParity (obj) {
      // 15位转18位
      obj = changeFivteenToEighteen(obj)
      var len = obj.length
      if (len == '18') {
        var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
        var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
        var cardTemp = 0
        var i, valnum
        for (i = 0; i < 17; i++) {
          cardTemp += obj.substr(i, 1) * arrInt[i]
        }
        valnum = arrCh[cardTemp % 11]
        if (valnum == obj.substr(17, 1)) {
          return true
        }
        return false
      }
      return false
    }
    //  15位转18位身份证号
    function changeFivteenToEighteen (obj) {
      if (obj.length == '15') {
        var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
        var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
        var cardTemp = 0
        var i
        obj = obj.substr(0, 6) + '19' + obj.substr(6, obj.length - 6)
        for (i = 0; i < 17; i++) {
          cardTemp += obj.substr(i, 1) * arrInt[i]
        }
        obj += arrCh[cardTemp % 11]
        return obj
      }
      return obj
    }
  }

  var phoneNumberVerify = function (textValue) {
    if (!textValue.match(/^\s*$/)) {
      var regx = /^1[34578]\d{9}$/
      if (!regx.test(textValue)) {
        Vue.alert('手机号码格式不正确')
        return false
      }
    } else {
      return false
    }
    return true
  }
  // 时间格式转化
  var formatDateTime = function (inputTime) {
    var date = new Date(inputTime)
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    m = m < 10 ? ('0' + m) : m
    var d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    var h = date.getHours()
    h = h < 10 ? ('0' + h) : h
    var min = date.getMinutes()
    min = min < 10 ? ('0' + min) : min
    var s = date.getSeconds()
    s = s < 10 ? ('0' + s) : s
    return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s
  }
  // 替换空数据为'暂无数据'
  var trimNullData = function (obj, key) {
    if (obj.hasOwnProperty(key) && validateIsNull(obj[key])) {
      return obj[key]
    } else {
      return '暂无数据'
    }
  }

  var copyObj = function (obj) {
    if (typeof obj === 'boolean') {
      return obj
    }
    if (typeof obj === 'string') {
      return obj.slice()
    }
    if (Array.isArray(obj)) {
      return deepCopy(obj)
    } else {
      return Object.assign({}, obj)
    }
  }

  var deepCopy = function (o) {
    if (o instanceof Array) {
      let n = []
      for (let i = 0; i < o.length; ++i) {
        n[i] = deepCopy(o[i])
      }
      return n
    } else if (o instanceof Object) {
      let n = {}
      for (let i in o) {
        n[i] = deepCopy(o[i])
      }
      return n
    } else {
      return o
    }
  }

  // 获取险别名称
  var getInsuranceShowName = function (kindCode) {
    var resultData = getInsuranceCodeData()
    for (var i = 0; i < resultData.freeCombinationResListVo.length; i++) {
      var obj = resultData.freeCombinationResListVo[i]
      var resKindCode = obj.kindCode
      if (kindCode == resKindCode) {
        return obj.kindShowName
      }
    }
    return '未知' + kindCode
  }

  // 险别格式化工具
  var getInsuranceCodeData = function () {
    var resultData = {
      'freeCombinationResListVo': [{
        'calCulateFlag': 'Y11Y00',
        'flag': '01',
        'kindCName': '机动车损失保险',
        'kindShowName': '车损险',
        'kindCode': '001',
        'newKindCode': '001'
      }, {
        'calCulateFlag': 'Y21Y00',
        'flag': '02',
        'kindCName': '第三者责任保险',
        'kindShowName': '三者险',
        'kindCode': '002',
        'newKindCode': '002'
      }, {
        'calCulateFlag': 'Y21Y00',
        'flag': '03',
        'kindCName': '车上人员责任保险(驾驶人)',
        'kindShowName': '司机责任险',
        'kindCode': '003',
        'newKindCode': '003'
      }, {
        'calCulateFlag': 'Y21Y00',
        'flag': '04',
        'kindCName': '车上人员责任保险(乘客)',
        'kindShowName': '乘客责任险',
        'kindCode': '006',
        'newKindCode': '006'
      }, {
        'calCulateFlag': 'Y11N00',
        'flag': '05',
        'kindCName': '全车盗抢保险',
        'kindShowName': '盗抢险',
        'kindCode': '007',
        'newKindCode': '007'
      }, {
        'calCulateFlag': 'N32Y00',
        'flag': '08',
        'kindCName': '玻璃单独破碎险',
        'kindShowName': '玻璃险',
        'kindCode': '201',
        'newKindCode': '201'
      }, {
        'calCulateFlag': 'N12Y00',
        'flag': '09',
        'kindCName': '自燃损失险',
        'kindShowName': '自燃险',
        'kindCode': '202',
        'newKindCode': '202'
      }, {
        'calCulateFlag': 'N12Y00',
        'flag': '11',
        'kindCName': '新增加设备损失险',
        'kindShowName': '新增设备',
        'kindCode': '203',
        'newKindCode': '203'
      }, {
        'calCulateFlag': 'N12Y00',
        'flag': '07',
        'kindCName': '车身划痕损失险',
        'kindShowName': '划痕险',
        'kindCode': '205',
        'newKindCode': '205'
      }, {
        'calCulateFlag': 'N12Y00',
        'flag': '10',
        'kindCName': '发动机涉水损失险',
        'kindShowName': '涉水险',
        'kindCode': '206',
        'newKindCode': '206'
      }, {
        'calCulateFlag': 'N12Y00',
        'flag': '14',
        'kindCName': '修理期间费用补偿险',
        'kindShowName': '修理期间费用补偿',
        'kindCode': '207',
        'newKindCode': '207'
      }, {
        'calCulateFlag': 'N12Y00',
        'flag': '13',
        'kindCName': '车上货物责任险',
        'kindShowName': '车上货物',
        'kindCode': '208',
        'newKindCode': '208'
      }, {
        'calCulateFlag': 'N12Y00',
        'flag': '16',
        'kindCName': '机动车损失保险无法找到第三方特约险',
        'kindShowName': '无法找到第三方',
        'kindCode': '210',
        'newKindCode': '210'
      }, {
        'calCulateFlag': 'N32Y00',
        'flag': '12',
        'kindCName': '指定修理厂险',
        'kindShowName': '指定专修',
        'kindCode': '211',
        'newKindCode': '211'
      }, {
        'calCulateFlag': 'N22Y00',
        'flag': '15',
        'kindCName': '精神损害抚慰金责任险',
        'kindShowName': '精神损害',
        'kindCode': '215',
        'newKindCode': '215'
      }, {
        'calCulateFlag': 'Y32Y00',
        'flag': '06',
        'kindCName': '机动车第三者责任保险法定节假日限额翻倍条款',
        'kindShowName': '三者法定节假日限额翻倍条款',
        'kindCode': '218',
        'newKindCode': '218'
      }, {
        'calCulateFlag': 'N32Y00',
        'flag': '06',
        'kindCName': '不计免赔率险（机动车损失保险）',
        'kindShowName': '不计免（车损险）',
        'kindCode': '301',
        'newKindCode': '301'
      }, {
        'calCulateFlag': 'N32Y00',
        'flag': '06',
        'kindCName': '不计免赔率险（第三者责任保险）',
        'kindShowName': '不计免（三者险）',
        'kindCode': '302',
        'newKindCode': '302'
      }, {
        'calCulateFlag': 'N32Y00',
        'flag': '06',
        'kindCName': '不计免赔率险（车上人员责任保险-驾驶人）',
        'kindShowName': '不计免（司机责任险）',
        'kindCode': '303',
        'newKindCode': '303'
      }, {
        'calCulateFlag': 'N32Y00',
        'flag': '06',
        'kindCName': '不计免赔率险（车上人员责任保险-乘客）',
        'kindShowName': '不计免（乘客责任险）',
        'kindCode': '305',
        'newKindCode': '305'
      }, {
        'calCulateFlag': 'N32Y00',
        'flag': '06',
        'kindCName': '不计免赔率险（全车盗抢保险）',
        'kindShowName': '不计免（盗抢险）',
        'kindCode': '306',
        'newKindCode': '306'
      }, {
        'calCulateFlag': 'N32Y00',
        'flag': '06',
        'kindCName': '不计免赔率险（自燃损失险）',
        'kindShowName': '不计免（自燃险）',
        'kindCode': '307',
        'newKindCode': '307'
      }, {
        'calCulateFlag': 'N32Y00',
        'flag': '06',
        'kindCName': '不计免赔率险（新增加设备损失险）',
        'kindShowName': '不计免（新增设备）',
        'kindCode': '308',
        'newKindCode': '308'
      }, {
        'calCulateFlag': 'N32Y00',
        'flag': '06',
        'kindCName': '不计免赔率险（车身划痕损失险）',
        'kindShowName': '不计免（划痕险）',
        'kindCode': '309',
        'newKindCode': '309'
      }, {
        'calCulateFlag': 'N32Y00',
        'flag': '06',
        'kindCName': '不计免赔率险（发动机涉水损失险）',
        'kindShowName': '不计免（涉水险）',
        'kindCode': '310',
        'newKindCode': '310'
      }, {
        'calCulateFlag': 'N32Y00',
        'flag': '06',
        'kindCName': '不计免赔率险（车上货物责任险）',
        'kindShowName': '不计免（车上货物）',
        'kindCode': '311',
        'newKindCode': '311'
      }, {
        'calCulateFlag': 'N32Y00',
        'flag': '06',
        'kindCName': '不计免赔率险（精神损害抚慰金责任险）',
        'kindShowName': '不计免（精神损害）',
        'kindCode': '315',
        'newKindCode': '315'
      },
      {
        'calCulateFlag': 'N12Y00',
        'flag': '16',
        'kindCName': '起重、装卸、挖掘车辆损失扩展条款',
        'kindShowName': '起重、装卸、挖掘车损失',
        'kindCode': '212',
        'newKindCode': '212'
      },
      {
        'calCulateFlag': 'N12Y00',
        'flag': '17',
        'kindCName': '特种车固定设备、仪器损坏扩展条款',
        'kindShowName': '特种车固定设备、仪器损坏',
        'kindCode': '213',
        'newKindCode': '213'
      },
      {
        'clauseType': '0511M0000003',
        'kindCName': '新增加设备损失险',
        'kindShowName': '新增加设备损失险',
        'kindCode': '009',
        'newKindCode': '009'
      },
      {
        'clauseType': '0511M0000003',
        'kindCName': '机动车损失保险',
        'kindShowName': '车损险(IACJQL0001)',
        'kindCode': '008',
        'newKindCode': '008',
        'riskCode': '0511'
      },
      {
        'clauseType': '0511M0000003',
        'kindCName': '绝对免赔率特约条款',
        'kindShowName': '绝对免赔率特约(IACJQ0101)条款',
        'kindCode': '219',
        'newKindCode': '219',
        'riskCode': '0511'
      },
      {
        'clauseType': '0511M0000003',
        'kindCName': '车轮单独损坏除外特约条款',
        'kindShowName': '车轮单独损坏除外特约(IACJQ0201)条款',
        'kindCode': '220',
        'newKindCode': '220',
        'riskCode': '0511'
      }]
    }

    return resultData
  }
  // 获取当期日期，并格式化（yyyy-MM-dd）
  var getNowDate = function () {
    let myDate = new Date()
    let nowDate = myDate.toLocaleDateString() // 获取当前日期
    nowDate = nowDate.replace(/\//g, '-')
    return nowDate
  }

  /**
   * 根据业务来源，显示费折联动业务
   * @param businessCode 业务来源编码
   */
  var calculateServiceFee = function (businessCode) {
    if (businessCode == 0 || businessCode == 6 || businessCode == '8' || businessCode == 'q' ||
      businessCode == 'r' || businessCode == 'u' || businessCode == 'w' || businessCode == 'x' || businessCode == 'y') {
      // 0直接业务 6电话销售-PT  8网络销售-官网（自动）-PT  q网络销售-官网（人工）-PT r网络销售-第三方-PT u电话销售-DM
      // w网络销售-官网（人工）-DM x网络销售-官网（自动）-DM y电话销售-CO
      // 修改后不用调用手续费
      return false
    } else {
      return true
    }
  }
  var relaIdEndDate = '2099-12-31'
  return {
    axiosRequest: axiosRequest,
    StorageGetter: StorageGetter, // 本地取
    StorageSetter: StorageSetter, // 本地存
    getCardSex: getCardSex,
    getCardAge: getCardAge,
    validateIsNull: validateIsNull,
    validateNullToString: validateNullToString,
    phoneNumberVerify: phoneNumberVerify,
    identityCardVerify: identityCardVerify,
    formatDateTime: formatDateTime, // 时间戳格式化
    trimNullData: trimNullData, // 空数据替换
    OAuthRequest: OAuthRequest, // 认证请求接口
    copyObj: copyObj, // 对象或者数组的拷贝
    getInsuranceCodeData: getInsuranceCodeData, // 险别格式化工具
    getInsuranceShowName: getInsuranceShowName, // 获取险别名称
    getNowDate: getNowDate, // 获取当前日期
    calculateServiceFee: calculateServiceFee,
    getInsureCheckedListFromRes: getInsureCheckedListFromRes,
    relaIdEndDate: relaIdEndDate,
    getUrlType: getUrlType
  }
}

export default UtilsBonc()
