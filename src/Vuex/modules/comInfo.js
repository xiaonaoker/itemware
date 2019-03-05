const state = {
  comInfoVo: {}, // 公司信息
  reportInfoVo:{},   //研报
  subscriptList:[],  //已关注订阅号列表
  zsubscriptList:[],  //未关注订阅号列表
  reportList:[]   //研报列表
}

const mutations = {
  setComInfoVo (state, payLoad) {
    Object.assign(state.comInfoVo, payLoad)
  },
  initComInfoVo (state, payLoad) {
    state.comInfoVo = {
      'name':'',
      'comdesc':'',
      'comimg':'',
      'isconcern':'',
      'comnews':[],
    }
  },
  setReportInfoVo (state, payLoad) {
    Object.assign(state.reportInfoVo, payLoad)
  },
  initReportInfoVo (state, payLoad) {
    state.reportInfoVo = {
      'theme':'',
      'author':'',
      'time':'',
      'content':''
    }
  },
  setSubscriptList (state, payLoad) {
    Object.assign(state.subscriptList, payLoad)
  },
  initSubscriptList (state, payLoad) {
    state.subscriptList = {
      "articleUpdateTime": "",
      "createTime": "",
      "imageUrl": "",
      "status": "",
      "subscriptionId": "",
      "subscriptionName": "",
      "updateTime": ""
    }
  },
  setZsubscriptList (state, payLoad) {
    state.zsubscriptList = payLoad
  },
  initZsubscriptList (state, payLoad) {
    state.zsubscriptList = {
      "articleUpdateTime": "",
      "createTime": "",
      "imageUrl": "",
      "status": "",
      "subscriptionId": "",
      "subscriptionName": "",
      "updateTime": ""
    }
  },
  setReportList (state, payLoad) {
    Object.assign(state.reportList, payLoad)  //不相同的覆盖，相同的不覆盖
  },
  initReportList (state, payLoad) {
    state.reportList = {
      "updateBy": "",
      "createTime": "",
      "reportType": "",
      "reportUrl": "",
      "reportTitle": "",
      "updateTime": "",
      "activeStatus": "",
      "titleImageUrl": "",
      "reportcontenttype": "",
      "createBy": "",
      "reportId": "",
      "subscriptionId": ""
    }
  },
}
 



const getters = {
  comInfoVo: state => state.comInfoVo,
  reportInfoVo: state => state.reportInfoVo,
  subscriptList: state => state.subscriptList,
  zsubscriptList: state => state.zsubscriptList,
  reportList: state => state.reportList

}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
