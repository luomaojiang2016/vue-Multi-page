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
            component: resolve =>require(['../components/common/Home.vue'], resolve),
            children: [
                {
                    path: '/servermanage',
                    component: resolve =>require(['../components/page/ServerManage.vue'], resolve)
                },
                {
                    path: '/appserver',component: resolve =>require(['../components/page/AppServer.vue'], resolve)
                },
                {
                    path: '/mediaservermonitor',component: resolve =>require(['../components/page/MediaServerMonitor.vue'], resolve)
                },
                {
                    path: '/streamstatistics',
                    component: resolve =>
                        require(['../components/page/StreamStatistics.vue'], resolve)
                },
                {
                    path: '/loginstatistics',
                    component: resolve =>
                        require(['../components/page/LoginStatistics.vue'], resolve)
                },
                {
                    path: '/developermanage',
                    component: resolve =>
                        require([
                            '../components/page/DeveloperManage.vue'
                        ], resolve)
                },
                {
                    path: '/appmanage',
                    component: resolve =>
                        require(['../components/page/AppManage.vue'], resolve)
                },
                {
                    path: '/roommanage',
                    component: resolve =>
                        require(['../components/page/RoomManage.vue'], resolve)
                },
                {
                    path: '/test',
                    component: resolve =>
                        require(['../components/page/Test.vue'], resolve)
                },
                {
                    path: '/return',
                    component: resolve =>
                        require([
                            '../components/page/returnManage.vue'
                        ], resolve)
                },
                {
                    path: '/orderManagement',
                    component: resolve =>
                        require([
                            '../components/page/OrderManagement.vue'
                        ], resolve)
                },
                {
                    path: '/consumptionHistorical',
                    component: resolve =>
                        require([
                            '../components/page/ConsumptionHistorical.vue'
                        ], resolve)
                }
            ]
        },
        {
            path: '/login',
            component: resolve =>
                require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/activation',
            component: resolve =>
                require(['../components/page/Activation.vue'], resolve)
        },
        {
            path: '/activationno',
            component: resolve =>
                require(['../components/page/ActivationNo.vue'], resolve)
        },
        {
            path: '/activationsuccess',
            component: resolve =>
                require(['../components/page/ActivationSuccess.vue'], resolve)
        }
    ]
});
