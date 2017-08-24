import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
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

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
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
    }
  ]
})
