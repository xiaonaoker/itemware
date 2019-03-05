import { AlertModule } from 'vux'
import InitCodeTableUtils from 'common/js/InitCodeTableUtils.js'
var VerifyUtils = function () {
  var showPlugin = function (textVal) {
    AlertModule.show({
      title: '',
      content: textVal
    })
  }

  var phoneNumberVerify = function (textValue, relaType) {
    if (textValue != '' && textValue != null && textValue != undefined) { // 非空
      var regx = /^1[0-9]\d{9}$/
      if (!regx.test(textValue)) {
        showPlugin('手机号码格式不正确')
        return false
      }
    } else {
      if (relaType == '1') {
        showPlugin('请输入车主手机号码')
      } else if (relaType == '2') {
        showPlugin('请输入投保人手机号码')
      } else if (relaType == '3') {
        showPlugin('请输入被保人手机号码')
      } else if (relaType == '4') {
        showPlugin('请输入代办人电话')
      }
      return false
    }
    return true
  }
	/**
     * identityCardVerify：身份证校验
     * param1:type==判断证件类型是不是身份证(若是则传“居民身份证”)
     * param2:id==身份证元素id
     * parms3:relaType==判断是车主、投保人、被保人、双录人员
     */
  var identityCardVerify = function (type, scCard, relaType) {
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
    if (type == '01') { // 居民身份证
      if (scCard.length != 0) {
        if (!checkCard(scCard)) {
          if (relaType == '4') {
            showPlugin('双录人员身份证格式错误')
            return false
          } else {
            showPlugin('身份证号码格式错误')
            return false
          }
        }
      } else {
        if (relaType == '1') {
          showPlugin('请输入车主身份证号码')
        } else if (relaType == '2') {
          showPlugin('请输入投保人身份证号码')
        } else if (relaType == '3') {
          showPlugin('请输入被保人身份证号码')
        } else if (relaType == '4') {
          showPlugin('请输入双录人员身份证')
        } else if (relaType == '5') {
          showPlugin('请输入代办人身份证')
        }
        return false
      }
    } else {
      showPlugin('请选择居民身份证')
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
            // 检查省份
      if (checkProvince(obj) === false) {
        return false
      }
            // 校验生日
      if (checkBirthday(obj) === false) {
        return false
      }
            // 检验位的检测
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
    };
        // 取身份证前两位,校验省份
    function checkProvince (obj) {
      var province = obj.substr(0, 2)
      if (vcity[province] == undefined) {
        return false
      }
      return true
    };
        // 检查生日是否正确
    function checkBirthday (obj) {
      var len = obj.length
            // 身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
      if (len == '15') {
        var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/
        var arr_data = obj.match(re_fifteen)
        var year = arr_data[2]
        var month = arr_data[3]
        var day = arr_data[4]
        var birthday = new Date('19' + year + '/' + month + '/' + day)
        return verifyBirthday('19' + year, month, day, birthday)
      }
            // 身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
      if (len == '18') {
        var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/
        var arr_data = obj.match(re_eighteen)
        var year = arr_data[2]
        var month = arr_data[3]
        var day = arr_data[4]
        var birthday = new Date(year + '/' + month + '/' + day)
        return verifyBirthday(year, month, day, birthday)
      }
      return false
    };
        // 校验日期
    function verifyBirthday (year, month, day, birthday) {
      var now = new Date()
      var now_year = now.getFullYear()
            // 年月日是否合理
      if (birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
                // 判断年份的范围（3岁到100岁之间)
        var time = now_year - year
        if (time >= 0 && time <= 130) {
          return true
        }
        return false
      }
      return false
    };
        // 校验位的检测
    function checkParity (obj) {
            // 15位转18位
      obj = changeFivteenToEighteen(obj)
      var len = obj.length
      if (len == '18') {
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2)
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2')
        var cardTemp = 0, i, valnum
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
    };
        // 15位转18位身份证号
    function changeFivteenToEighteen (obj) {
      if (obj.length == '15') {
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2)
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2')
        var cardTemp = 0, i
        obj = obj.substr(0, 6) + '19' + obj.substr(6, obj.length - 6)
        for (i = 0; i < 17; i++) {
          cardTemp += obj.substr(i, 1) * arrInt[i]
        }
        obj += arrCh[cardTemp % 11]
        return obj
      }
      return obj
    };
  }
    /**
     * 固话校验
     * @param telNum  固话号码
     */
  var telVerify = function (telNum) {
    var regx = /^[\d-]*$/    // 只能输入-和数字，不校验长度
    if (!regx.test(telNum)) {
      showPlugin('固话格式不正确')
      return false
    }
    return true
  }
  // 邮箱验证，谢鑫编写
  var mailVerify = function (mail) {
    var regx = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/    // 验证邮箱格式
    if (!regx.test(mail)) {
      showPlugin('邮箱格式不正确')
      return false
    }
    return true
  }
    // 根据身份证号判断性别
  var getCardSex = function (UUserCard) {
        // 获取性别
    if (parseInt(UUserCard.charAt(16)) % 2 == 1) {
      return true// 男
    } else {
      return false
    }
  }
    /**
     * 车辆使用性质与座位数、排量校验
     * @param carUseNature 车辆使用性质
     * @param seatCount 座位数
     */
  var testCarUseNatureAndSeatCount = function (carUseNature, seatCount) {
    var tip = InitCodeTableUtils.getNameByValue('carUseNatureData', '', carUseNature) + '座位数不能小于6座！'
    var str = '9B,9C,9E'
    if (str.indexOf(carUseNature) != -1) {
      if (seatCount < 6) {
        showPlugin(tip)
        return false
      }
    }
    return true
  }
  // 北京江苏输入信息校验
  var userAdditionalVerify = function (frameNo, engineNo) {
    if (frameNo == '') {
      showPlugin('请输入车架号')
      return false
    } else if (frameNumberVerify(frameNo) == false) {
      showPlugin('车架号格式不正确')
      return false
    } else if (engineNo == '') {
      showPlugin('请输入发动机号')
      return false
    }
    return true
  }
  var frameNumberVerify = function (textValue) {
    var regx = /^[a-zA-Z0-9]{1,17}$/g
    if (!regx.test(textValue)) {
      showPlugin('车架号格式不正确')
      return false
    } else {
      if (textValue == '') {
        showPlugin('请输入车架号')
        return false
      }
    }
    return true
  }
    // 校验日期时效性    格式为：YYYY-MM-DD或YYYY/MM/DD
  var isValidDate = function (DateStr) {
    if (DateStr == '') {
      return true
    }
    var sDate = DateStr.replace(/(^\s+|\s+$)/g, '')// 去两边空格;
    var dateRegx = /^\d{4}-\d{1,2}-\d{1,2}/// 校验日期格式
    if (!dateRegx.test(sDate)) {
      return false
    }
    var t = new Date(sDate.replace(/\-/g, '/'))
    var ar = sDate.split(/[-/:]/)
    if (ar[0] != t.getFullYear() || ar[1] != t.getMonth() + 1 || ar[2] != t.getDate()) { // alert('错误的日期格式！格式为：YYYY-MM-DD或YYYY/MM/DD。注意闰年。');
      return false
    }
    return true
  }
	/**
     * 车辆种类与使用性质与整备质量核定载质量规则校验
     * param1:carKind==车辆种类
     * param2:useNature==使用性质
     * parms3:displacement==排量
     */
  var testCarKind = function (carKind, useNature, displacement, tonCount) {
    carKind = carKind.substring(0, 1)
    if (carKind == 'H') { // 货车 排气量不必录
      if (tonCount == '') {
        showPlugin('请输入核定载质量')
        return false
      }
    } else {
      if (displacement == '') {
        showPlugin('请输入排量')
        return false
      }
    }
    return true
  }
    // 号牌种类与号牌底色匹配校验
  var testLicenseTypeAndColor = function (licenseType, licenseColorCode) {
    var flag = true
    var arr = [
      {
        code: '02,08',
        data: '01'
      },
      {
        code: '03,04,05,06,09,10,11,12,17',
        data: '02'
      },
      {
        code: '20,21,22',
        data: '03'
      },
      {
        code: '01,07,13,15,16',
        data: '04'
      },
      {
        code: '14',
        data: '04,06'
      }
    ]
    for (var i = 0; i < arr.length; i++) {
      var obj = arr[i]
      if (obj.code.indexOf(licenseType) != -1) {
        if (obj.data.indexOf(licenseColorCode) == -1) {
          showPlugin('号牌种类与号牌底色不一致')
          flag = false
          break
        }
      }
    }
    return flag
  }
    // 校验代理机构
  var testBusinessNature = function (businessNature) {
    var pro = ['0', '6', '8', 'q', 'r', 'u', 'w', 'x', 'y']
    for (var i = 0; i < pro.length; i++) {
      if (businessNature == pro[i]) {
        return false
      }
    }
    return true
  }
    // 校验车牌号码
  var checkLicenceNo = function (licenseNo) {
    var reg_licenceNo = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/
    if (!(reg_licenceNo.test(licenseNo))) {
      return false
    }
  }
  /**
    *校验组织机构代码
    *长度为9位或10位，如果为‘PDY’开头，则为虚拟组织机构代码证；
    *如果非‘PDY’开头，则有如下规则：1-8位为数字0-9或者大写字母A-Z；若总长度为9，则第9为为校验位；若总长度为10，则第9位为‘-’,第十位为校验位
    *参数1：类型 参数2：组织机构代码
    */
  var organizationCodeVerify = function (type, orCode) {
    if (type == '10' || type == '07') { // 组织机构代码证
      if (orCode.length != 0) {
        if (!checkOrgCode(orCode)) {
          return false
        }
      } else {
        showPlugin('请输入组织机构代码')
        return false
      }
      return true
    }
    function checkOrgCode (obj) {
 // 传送格式为8位数字或者大写字母+0-9/X,例如“123456789”或“12345678X”，平台对公司传送的组织机构代码证号码进行格式校验
 // 传送的组织机构代码必须为18位，且仅能使用阿拉伯数字或者英文字母，不允许录入其他字符
 // var reg1 = /^[0-9A-Z]{8}[0-9|X]{1}$/;
 // var reg2 = /^[0-9A-Z]{18}$/;
 // 2018/06/21 修改校验规则
      var reg1 = /^(PDY)[0-9A-Z]{6,7}$/ // 以‘PDY’开头，长度为9位或10位
      var reg2 = /^([0-9A-Z]{8}|[0-9A-Z]{8}(-))[0-9A-Z]{1}$/
      if (reg1.test(obj) == false && reg2.test(obj) == false) {
        showPlugin('请输入正确的组织机构代码')
        return false
      }
      return true
    }
  }
  /**
*2018/06/21 统一社会信用代码 总长度为18位
*参数1：类型 参数2：组织机构代码
*/
  var socialCreditCodeVerify = function (type, socialCode) {
    if (type == '22') {
      if (socialCode.length != 0) {
        var regx = /^([0-9A-Z]{15}|[0-9A-Z]{18})$/
        if (!regx.test(socialCode)) {
          showPlugin('请输入正确的统一社会信用代码')
          return false
        } else {
          return true
        }
      } else {
        showPlugin('请输入统一社会信用代码')
        return false
      }
    }
  }
    // 车辆购买日期判断省级匹配校验
  var testProvince = function (comCode) {
    var pro = ['34', '35', '62', '37', '45', '52', '46', '15', '3702', '37', '14', '61', '31', '4403', '51', '43', '32']
    comCode = comCode.substring(0, 2)
    for (var i = 0; i < pro.length; i++) {
      if (comCode == pro[i]) {
        return true
      }
    }
    return false
  }
  // 深圳双录业务来源编码校验
  var testDoubleBusinessCode = function (businessNature) {
    var pro = ['0', '1', '6', '8', 'q', 'r', 'u', 'w', 'x', 'y']
    for (var i = 0; i < pro.length; i++) {
      if (businessNature == pro[i]) {
        return false
      }
    }
    return true
  }
  return {
    testDoubleBusinessCode: testDoubleBusinessCode, // 深圳双录业务来源编码校验
    organizationCodeVerify: organizationCodeVerify, // 校验证件组织类型
    socialCreditCodeVerify: socialCreditCodeVerify, // 校验统一社会代码证
    testCarUseNatureAndSeatCount: testCarUseNatureAndSeatCount, // 车辆使用性质与座位数、排量校验
    userAdditionalVerify: userAdditionalVerify, // 北京江苏地区校验车架号发动机号
    frameNumberVerify: frameNumberVerify, // 车架号格式校验
    isValidDate: isValidDate, // 日期格式校验
    testCarKind: testCarKind, // 车辆种类与使用性质与整备质量核定载质量规则校验
    testLicenseTypeAndColor: testLicenseTypeAndColor, // 号牌种类与号牌底色匹配校验
    testBusinessNature: testBusinessNature, // 校验代理机构
    phoneNumberVerify: phoneNumberVerify, // 校验手机号
    identityCardVerify: identityCardVerify, // 校验证件号码
    telVerify: telVerify, // 校验固话
    mailVerify: mailVerify, // 校验邮箱
    checkLicenceNo: checkLicenceNo, // 校验车牌号码
    getCardSex: getCardSex, // 根据身份证号码判断性别
    testProvince: testProvince // 车辆购买日期判断省级匹配校验
  }
}
export default VerifyUtils()
