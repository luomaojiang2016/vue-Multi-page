import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },

        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:
            [
                {
                    path: '/appmanage',
                    component: resolve => require(['../components/page/AppManage.vue'], resolve)
                },

                {
                    path: '/appmonitor',
                    component: resolve => require(['../components/page/AppMonitor.vue'], resolve)
                },

                {
                    path: '/roommanage',
                    component: resolve => require(['../components/page/RoomManage.vue'], resolve)
                },

                {
                    path: '/statistics',
                    component: resolve => require(['../components/page/Statistics.vue'], resolve)
                }
                ,
                {
                    path: '/personalinfo',
                    component: resolve => require(['../components/page/PersonalInfo.vue'], resolve)
                },
                {
                    path: '/personalcenter',
                    component: resolve => require(['../components/page/PersonalCenter.vue'], resolve)
                },
                {
                    path: '/recharge',
                    component: resolve => require(['../components/page/Recharge.vue'], resolve)
                },
                {
                    path: '/rechargeRecord', 
                    component: resolve => require(['../components/page/RechargeRecord.vue'], resolve)
                },
                {
                    path: '/consumptionRecord', 
                    component: resolve => require(['../components/page/ConsumptionRecord.vue'], resolve)
                },
                {
                    path: '/streamstatistics',
                    component: resolve =>require(['../components/page/StreamStatistics.vue'], resolve)
                },
                {
                    path: '/loginstatistics',
                    component: resolve =>require(['../components/page/LoginStatistics.vue'], resolve)
                }
            ]
        },

        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },

        {
            path: '/register',
            component: resolve => require(['../components/page/Register.vue'], resolve)
        },

        {
            path: '/forgerpassword',
            component: resolve => require(['../components/page/Forgetpassword.vue'], resolve)
        },

        {
            path: '/perferinfo',
            component: resolve => require(['../components/page/perfectInfo.vue'], resolve)
        },

        {
            path: '/industry',
            component: resolve => require(['../components/page/Industry.vue'], resolve)
        }
    ]
});
