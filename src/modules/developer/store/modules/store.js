import api from '../../api/api.js';
const state = {
    userInfo: sessionStorage.getItem('accountUserInfo') ? JSON.parse(sessionStorage.getItem('accountUserInfo')) : null,
    token: sessionStorage.getItem('accountToken') ? sessionStorage.getItem('accountToken') : null,
    appList: '',
    mediaServerList:'',
    logServerUrl:sessionStorage.getItem('accountLogServerUrl') ? sessionStorage.getItem('accountLogServerUrl') : null,
    appServerUrl:sessionStorage.getItem('accountAppServerUrl') ? sessionStorage.getItem('accountAppServerUrl') : null
};
const getters = {
	getUserInfo: state=>state.userInfo,
    getToken: state=>state.token,
    getAppList: state=>state.appList,
    getappServerUrl:state=>state.appServerUrl
};
const actions = {
    actionAppList({commit}){ 
        api.getAppList(0,1000).then(res => {
            if (res.status === 'OK') {
                commit('SET_APPLIST',res.result);
            }
        });
    },

    actionLeftNavMediaServer({commit}){   
        api.getMediaServerList(0,1000).then(res => {
            if (res.status === 'OK') {
                commit('SET_MediaList',res.result);
            }
        });
    },
    actiongetAppServerUrl({commit}){   
        api.getappServerUrl().then(res => {          
            if(res.appServerUrl!==undefined){
                sessionStorage.setItem('accountAppServerUrl',res.appServerUrl);
                commit('SET_AppServerUrl',res.appServerUrl);
                console.log(res.appServerUrl);
            }        
        });
    }
};
// mutations
const mutations = {
    SET_USERINFO(state,data){
        state.userInfo = data;
    },
    SET_TOKEN(state,data){
        state.token= data;
    },
    SET_APPLIST(state,data){
        state.appList= data;
    },
    SET_MediaList(state,data){
        state.mediaServerList= data;
    },
    SET_LogServerUrl(state,data){
        state.logServerUrl= data;
    },
    SET_AppServerUrl(state,data){
        state.appServerUrl= data;
    }
};
export default {
    state,
    getters,
    actions,
    mutations
};