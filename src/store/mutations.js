/**
 * Created by yuanxiaogang on 2017/8/23.
 */
import * as types from './mutation-types'
const mutations = {
  // 创建圈子
  [types.CIRCLE]: (state, circle) => {
    state.circle = circle
  },
  [types.CIRCLENAME]: (state, circleName) => {
    state.circleName = circleName
    // console.log('保存', state.circleName)
  },
  [types.CIRCLETAGS]: (state, circleTags) => {
    state.circleTags = circleTags
  },
  [types.CIRCLEID]: (state, circleId) => {
    state.circleId = circleId
  },
  [types.ACTIVITY]: (state, activity) => {
    state.activity = activity
  },
  [types.ACTIVITYID]: (state, activityId) => {
    state.activityId = activityId
  },
  [types.USERID]: (state, userId) => {
    sessionStorage.setItem('userId', userId)
    state.userId = userId
  }
}
export default mutations
