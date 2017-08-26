import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
// 圈子
import CreateCircle from '@/page/circle/createCircle.vue'
import ChooseCategory from '@/page/circle/chooseCategory.vue'
import UploadCircleCover from '@/page/circle/uploadCircleCover.vue'
import CircleLists from '@/page/circle/circleLists.vue'
import CircleDetails from '@/page/circle/circleDetails.vue'
import MyCircle from '@/page/circle/myCircle.vue'
// 活动
import MyActivity from '@/page/activity/myActivity.vue'
import EditContent from '@/page/activity/editContent.vue'
import ActivityLists from '@/page/activity/activityLists.vue'
import ActivitySuccess from '@/page/activity/activitySuccess.vue'
import ActivityDetails from '@/page/activity/activityDetails.vue'
import ChooseActivityTags from '@/page/activity/chooseActivityTags.vue'
import ActivityMessage from '@/page/activity/activityMessage.vue'
// 报名活动
import SignUpActivity from '@/page/activity/signUpActivity.vue'
import EditFriends from '@/page/activity/editFriends.vue'
import PraiseMembers from '@/page/activity/praiseMembers.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/circleLists'
    },
    // 圈子
    {
      path: '/createCircle',
      name: 'CreateCircle',
      component: CreateCircle
    },
    {
      path: '/chooseCategory',
      name: 'ChooseCategory',
      component: ChooseCategory
    },
    {
      path: '/uploadCircleCover',
      name: 'UploadCircleCover',
      component: UploadCircleCover
    },
    {
      path: '/circleLists',
      name: 'CircleLists',
      component: CircleLists
    },
    {
      path: '/circleDetails',
      name: 'CircleDetails',
      component: CircleDetails
    },
    {
      path: '/myCircle',
      name: 'MyCircle',
      component: MyCircle
    },
    // 活动
    {
      path: '/myActivity',
      name: 'MyActivity',
      component: MyActivity
    },
    {
      path: '/editContent',
      name: 'EditContent',
      component: EditContent
    },
    {
      path: '/activityLists',
      name: 'ActivityLists',
      component: ActivityLists
    },
    {
      path: '/activitySuccess',
      name: 'ActivitySuccess',
      component: ActivitySuccess
    },
    {
      path: '/activityDetails',
      name: 'ActivityDetails',
      component: ActivityDetails
    },
    {
      path: '/chooseActivityTags',
      name: 'ChooseActivityTags',
      component: ChooseActivityTags
    },
    {
      path: '/activityMessage',
      name: 'ActivityMessage',
      component: ActivityMessage
    },
    // 报名活动
    {
      path: '/signUpActivity',
      name: 'SignUpActivity',
      component: SignUpActivity
    },
    {
      path: '/editFriends',
      name: 'EditFriends',
      component: EditFriends
    },
    {
      path: '/praiseMembers',
      name: 'PraiseMembers',
      component: PraiseMembers
    }
  ]
})
