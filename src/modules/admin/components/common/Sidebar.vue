<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" @select="selectIndex" class="el-menu-vertical-demo" background-color="#E6E6E6" text-color="#48576A" active-text-color="#409EFF" unique-opened>
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
    import api from "../../api/api.js";
    import commonfunc from "../../../../utils/commonfunc.js";
    import {
        mapGetters,
        mapActions,
        mapMutations,
        mapState
    } from 'vuex';
    export default {
        data() {
            return {
                add:true,
                leftNav: [
                    {
                        icon: 'el-icon-menu',
                        index: 'servermanage',
                        title: this.$t('leftNav.titleServerManage')
                    },
                    {
                        icon: 'el-icon-bell',
                        index: 'appserver',
                        title: this.$t('leftNav.titleAppServer')
                    },
                    {
                        icon: 'el-icon-picture',
                        index: 'developermanage',
                        title: this.$t('leftNav.titleDeveloperManage')
                    },
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
                        icon: 'el-icon-sold-out',
                        index: 'orderManagement',
                        title: this.$t('consumer.orderManagement')  //订单管理
                    },
                    {
                        icon: 'el-icon-goods',
                        index: 'consumptionHistorical',
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
                    }
                    // {
                    //     icon:'el-icon-refresh',
                    //     index:'return',
                    //     title:this.$t('leftNav.titleRetrun')
                    // }
                    // {
                    //     icon: 'el-icon-goods',
                    //     index: 'consumermanagement',
                    //     title: this.$t('consumer.consumerManagement'),
                    //     subs: [
                            
                    //           {
                    //             icon: 'el-icon-mobile-phone',
                    //             index: 'priceAllocation',
                    //             title: this.$t('PriceAllocation.unitPrice')
                    //           },
                    //           {
                    //             icon: 'el-icon-success',
                    //             index: 'paymentConfiguration',
                    //             title: this.$t('payment.PaymentConfiguration')
                    //           }
                    //     ]
                    // },
                ]
            }
        },
        computed: {
            ...mapGetters({
                UserInfo: 'getUserInfo',
                mediaServerList: 'getmediaServerList'
            }),
            onRoutes() {
                return this.$route.path.replace('/', '');
            }
        },
        methods: {
            ...mapActions([
                'actionLeftNavMediaServer'
            ]),
            selectIndex(index, path) {
                const self = this;
                const indexpath = path.toString().split(",");
                if (indexpath[0] === 'monitor') {
                    this.$router.push({
                        path: '/mediaservermonitor',
                        query: {
                            mediaServerID: indexpath[1],
                        }
                    });
                } else {
                    self.$router.push('/' + index);
                }
            },
            async Onwatch(){
               const self = this;
                    try{
                        const res= await api.activationCode();
                        if(res.status === 'OK'){
                            if(res.result == ""){
                                clearInterval(self.timeid)
                            }else if(res.result != ""){
                                 if(res.result.sn !='' && res.result.code ==0){
                                   if(this.add){
                                        self.leftNav.push({
                                         icon:'el-icon-refresh',
                                         index:'return',
                                         title:this.$t('leftNav.titleRetrun')
                                        });
                                        self.add = false;
                                    }else{
                                        return
                                    }    
                                 }else{
                                      self.$router.push('/activation');  
                                }
                            }         
                        }
                        if(res.status === 'ERROR'){
                            commonfunc.doError(self, res.error);
                        }
                    }catch(errors){
                        self.$message.error(errors.message);
                    }
                }
        },
        watch: {
            /*
            mediaServerList: function(mediaServerList) {
                const self = this;
                self.leftNav[1].subs.splice(0, self.leftNav[1].subs.length);
                mediaServerList.forEach(element => {
                    if (element.enabled) {
                        const item = {
                            index: element.serverID.toString(),
                            icon: 'el-icon-download',
                            title: element.serverAddress
                        };
                        self.leftNav[1].subs.push(item);
                    }
                }, this);
            }*/
        },
        beforeDestroy() {
          const self = this;
          clearInterval(self.timeid)
        },
        created() {
            const self = this;
             self.Onwatch();
              self.timeid = setInterval(function(){
                 self.Onwatch();
               
              },1000 * 60)
            // self.actionLeftNavMediaServer();
            //self.getMediaServerData();
            this.$i18n.locale=localStorage.getItem('admin_lan') ? localStorage.getItem('admin_lan') : 'cn';
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
        background: #d3d3d3;
    }
    .sidebar>ul {
        height: 100%;
    }
</style>
