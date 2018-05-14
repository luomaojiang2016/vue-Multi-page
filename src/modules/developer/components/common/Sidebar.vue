<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" @select="selectIndex" class="el-menu-vertical-demo" background-color="#E6E6E6" font-size="22px" text-color="#48576A" active-text-color="#409EFF" unique-opened>
            <div v-for="item in leftNav">
                <div v-if="item.subs">
                    <el-submenu v-bind:index="item.index">
                        <div slot="title"><i :class="item.icon"></i>{{ item.title }}
                        </div>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index" :class="subItem.icon">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </div>
                <div v-else>
                    <el-menu-item v-bind:index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </div>
            </div>
        </el-menu>
    </div>
</template>

<script>
    import {
        mapGetters,
        mapActions,
        mapMutations,
        mapState
    } from 'vuex';
    export default {
        data() {
            return {
                leftNav: [/*{
                        icon: 'el-icon-view',
                        index: 'statistics',
                        title: '用量',
                        subs: [{
                            index: 'statistics',
                            title: '用量统计'
                        }]
                    },
                    */
                    {
                        icon: 'el-icon-tickets',
                        index: 'personalcenter',
                        title: '个人中心'
                    },
                  /*  {
                        icon: 'el-icon-bell',
                        index: 'appmmonitor',
                        title: this.$t('leftNav.titleAppMonitor'),
                        subs: []
                    },*/
                    {
                        icon: 'el-icon-mobile-phone',
                        index: 'appmanage',
                        title: this.$t('leftNav.titleAppManage')
                    },
                    {
                        icon: 'el-icon-tickets',
                        index: 'roommanage',
                        title: this.$t('leftNav.titleRoomManage')
                    },
                    {
                        icon: 'el-icon-search',
                        index: 'rechargeRecord',
                        title: '我的订单'
                    },
                    {
                        icon: 'el-icon-view',
                        index: 'consumptionRecord',
                        title: '消费记录'
                    },
                    {
                        icon: 'el-icon-document',
                        index: 'statisticalanalysis',
                        title: '统计分析',
                        subs: [
                            {   icon: 'el-icon-tickets',
                                index: 'loginstatistics',
                                title: '登录入会'
                              },
                              {
                                icon: 'el-icon-tickets',
                                index: 'streamstatistics',
                                title: '流&流量'
                              }
                        ]
                    },
                    {
                        icon: 'el-icon-tickets',
                        index: 'personalinfo',
                        title: '个人信息'
                    },         
                ]
            }
        },
        computed: {
            ...mapGetters({
                UserInfo: 'getUserInfo',
                appList: 'getAppList'
            }),
            onRoutes() {
                return this.$route.path.replace('/', '');
            }
        },
        methods: {
            ...mapActions([
                'actionAppList'
            ]),
            selectIndex(index, path) {
                const self = this;
                const indexpath = path.toString().split(",");
                if (indexpath[0] === 'appmmonitor') {
                    this.$router.push({
                        path: '/appmonitor',
                        query: {
                            appID: indexpath[1],
                        }
                    });
                } else {
                    self.$router.push('/' + index);
                }
            }
        },
        watch: {
            appList: function(appList) {
                const self = this;
                self.leftNav[0].subs.splice(0, self.leftNav[0].subs.length);
                appList.forEach(element => {
                    let item = {
                        index: element.appID.toString(),
                        icon: 'el-icon-download',
                        title: element.appName
                    };
                    self.leftNav[0].subs.push(item);
                }, this);
            }
        },
        created() {
           // const self = this;
           // self.actionAppList({
            //    from: 0,
             //   count: 1000
           // });
            this.$i18n.locale = localStorage.getItem('developer_lan') ? localStorage.getItem('developer_lan') : 'cn';
           // document.title = this.$t('title.documentTitle');
        }
    }
</script>

<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        width: 200px;
        left: 0;
        top: 70px;
        bottom: 0;
        font-size: 22px;
        background: #CCCCCC;
    }
    .sidebar>ul {
        height: 100%;
    }
</style>
