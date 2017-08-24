/**
 * Created by yuanxiaogang on 2017/8/23.
 */
import * as types from './mutation-types'
const mutations = {
  // 创建圈子
  [types.CIRCLENAME]: (state, circleName) => {
    state.circleName = circleName
    console.log('保存', state.circleName)
  }
}
export default mutations
