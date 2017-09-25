/**
 * Created by yuanxiaogang on 2017/8/23.
 */
const state = {
  // 创建圈子
  circle: '',
  circleName: '',
  circleTags: '',
  circleId: '',
  // 编辑圈子
  circleDescription: '',
  activityTypeName: '',
  selectedTags: '',
  editcirclename: '',
  // 活动属性
  activity: {},
  activityId: '',
  activityTags: '',
  // 用户
  userId: null,
  userName: '',
  userPicture: '',
  userPhoneNo: '',
  userGender: 1,
  // 参数
  paramData: {},
  // 二维码
  qrCode: '',
  // 当前的活动信息 用于编辑活动页面
  currentAddress: {},
  currentInfo: {},
  // 圈子详情页面，携带当前圈子
  currentCircle: {}
}
export default state
