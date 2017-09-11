import Vue from 'vue'
import Router from 'vue-router'
import { Indicator } from 'mint-ui'
import Hello from '@/components/Hello'
// import CreateCircle from '@/page/circle/createCircle.vue'
// import ChooseCategory from '@/page/circle/chooseCategory.vue'
// import UploadCircleCover from '@/page/circle/uploadCircleCover.vue'
// import CircleLists from '@/page/circle/circleLists.vue'
// import CircleDetails from '@/page/circle/circleDetails.vue'
// import MyCircle from '@/page/circle/myCircle.vue'

// 圈子
const CreateCircle = r => {
  Indicator.open()
  require.ensure(['@/page/circle/createCircle.vue'], () => {
    r(require('@/page/circle/createCircle.vue'))
    Indicator.close()
  }, 'createCircle')
}
const ChooseCategory = r => {
  Indicator.open()
  require.ensure(['@/page/circle/chooseCategory.vue'], () => {
    r(require('@/page/circle/chooseCategory.vue'))
    Indicator.close()
  }, 'chooseCategory')
}
const UploadCircleCover = r => {
  Indicator.open()
  require.ensure(['@/page/circle/uploadCircleCover.vue'], () => {
    r(require('@/page/circle/uploadCircleCover.vue'))
    Indicator.close()
  }, 'uploadCircleCover')
}
const CircleLists = r => {
  Indicator.open()
  require.ensure(['@/page/circle/circleLists.vue'], () => {
    r(require('@/page/circle/circleLists.vue'))
    Indicator.close()
  }, 'circleLists')
}
const CircleDetails = r => {
  Indicator.open()
  require.ensure(['@/page/circle/circleDetails.vue'], () => {
    r(require('@/page/circle/circleDetails.vue'))
    Indicator.close()
  }, 'circleDetails')
}
const MyCircle = r => {
  Indicator.open()
  require.ensure(['@/page/circle/myCircle.vue'], () => {
    r(require('@/page/circle/myCircle.vue'))
    Indicator.close()
  }, 'myCircle')
}
// import ActivityLists from '@/page/activity/activityLists.vue'
// import ActivityDetails from '@/page/activity/activityDetails.vue'
// import MyActivity from '@/page/activity/myActivity.vue'
// import EditContent from '@/page/activity/editContent.vue'
// import ActivitySuccess from '@/page/activity/ActivitySuccess.vue'

// 活动
const MyActivity = r => {
  Indicator.open()
  require.ensure(['@/page/activity/myActivity.vue'], () => {
    r(require('@/page/activity/myActivity.vue'))
    Indicator.close()
  }, 'myActivity')
}
const EditContent = r => {
  Indicator.open()
  require.ensure(['@/page/activity/editContent.vue'], () => {
    r(require('@/page/activity/editContent.vue'))
    Indicator.close()
  }, 'editContent')
}
const ActivityLists = r => {
  Indicator.open()
  require.ensure(['@/page/activity/activityLists.vue'], () => {
    r(require('@/page/activity/activityLists.vue'))
    Indicator.close()
  }, 'activityLists')
}
const ActivitySuccess = r => {
  Indicator.open()
  require.ensure(['@/page/activity/ActivitySuccess.vue'], () => {
    r(require('@/page/activity/ActivitySuccess.vue'))
    Indicator.close()
  }, 'ActivitySuccess')
}
const ActivityDetails = r => {
  Indicator.open('加载中...')
  require.ensure(['@/page/activity/activityDetails.vue'], () => {
    r(require('@/page/activity/activityDetails.vue'))
    Indicator.close()
  }, 'activityDetails')
}
import ChooseActivityTags from '@/page/activity/chooseActivityTags.vue'
import ActivityMessage from '@/page/activity/activityMessage.vue'
// 报名活动
import SignUpActivity from '@/page/activity/signUpActivity.vue'
import EditFriends from '@/page/activity/editFriends.vue'
import PraiseMembers from '@/page/activity/praiseMembers.vue'
// 授权
import Authorization from '@/page/authorization/authorization.vue'
// 二维码
import QrCode from '@/page/circle/qrCode.vue'

// 点赞列表
const PointList = r => require.ensure([], () => r(require('@/components/pointList')), 'pointList')

const nopage = r => require.ensure([], () => r(require('@/page/nopage')), 'nopage')

Vue.use(Router)
let requireAuth = true
export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/circleLists'
    },
    {
      path: '/Hello',
      name: 'Hello',
      component: Hello
    },
    // 圈子
    {
      path: '/createCircle',
      name: 'CreateCircle',
      component: CreateCircle,
      meta: {
        requireAuth: requireAuth
      }
    },
    {
      path: '/chooseCategory',
      name: 'ChooseCategory',
      component: ChooseCategory,
      meta: {
        requireAuth: requireAuth
      }
    },
    {
      path: '/uploadCircleCover',
      name: 'UploadCircleCover',
      component: UploadCircleCover,
      meta: {
        requireAuth: requireAuth
      }
    },
    {
      path: '/circleLists',
      name: 'CircleLists',
      component: CircleLists,
      meta: {
        requireAuth: requireAuth,
        keepAlive: true
      }
    },
    {
      path: '/circleDetails/:cid',
      name: 'CircleDetails',
      component: CircleDetails,
      meta: {
        requireAuth: requireAuth
      }
    },
    {
      path: '/myCircle',
      name: 'MyCircle',
      component: MyCircle,
      meta: {
        requireAuth: requireAuth
      }
    },
    // 活动
    {
      path: '/myActivity',
      name: 'MyActivity',
      component: MyActivity,
      meta: {
        requireAuth: requireAuth
      }
    },
    {
      path: '/editContent',
      name: 'EditContent',
      component: EditContent,
      meta: {
        requireAuth: requireAuth
      }
    },
    {
      path: '/activityLists',
      name: 'ActivityLists',
      component: ActivityLists,
      meta: {
        requireAuth: requireAuth,
        keepAlive: true
      }
    },
    {
      path: '/activitySuccess',
      name: 'ActivitySuccess',
      component: ActivitySuccess,
      meta: {
        requireAuth: requireAuth
      }
    },
    {
      path: '/activityDetails/:aid',
      name: 'ActivityDetails',
      component: ActivityDetails,
      meta: {
        requireAuth: requireAuth
      }
    },
    {
      path: '/chooseActivityTags',
      name: 'ChooseActivityTags',
      component: ChooseActivityTags,
      meta: {
        requireAuth: requireAuth
      }
    },
    {
      path: '/activityMessage/:id',
      name: 'ActivityMessage',
      component: ActivityMessage,
      meta: {
        requireAuth: requireAuth
      }
    },
    // 报名活动
    {
      path: '/signUpActivity',
      name: 'SignUpActivity',
      component: SignUpActivity,
      meta: {
        requireAuth: requireAuth
      }
    },
    {
      path: '/editFriends',
      name: 'EditFriends',
      component: EditFriends,
      meta: {
        requireAuth: requireAuth
      }
    },
    {
      path: '/praiseMembers/:id',
      name: 'PraiseMembers',
      component: PraiseMembers,
      meta: {
        requireAuth: requireAuth
      }
    },
    {
      path: '/authorization',
      name: 'Authorization',
      component: Authorization
    },
    // 二维码
    {
      path: '/qrCode',
      name: 'QrCode',
      component: QrCode
    },
    // 点赞列表
    {
      path: '/pointList/:id',
      name: 'PointList',
      component: PointList
    },
    {
      path: '*',
      name: '404',
      component: nopage
    }
  ]
})
