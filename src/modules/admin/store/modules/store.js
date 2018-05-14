import api from '../../api/api.js';
const state = {
    adminInfo: sessionStorage.getItem('adminInfo')
        ? JSON.parse(sessionStorage.getItem('adminInfo'))
        : null,
    token: sessionStorage.getItem('adminToken')
        ? sessionStorage.getItem('adminToken')
        : null,
    mediaServerList: '',
    logServerUrl: sessionStorage.getItem('adminLogServerUrl')
        ? sessionStorage.getItem('adminLogServerUrl')
        : null,
    appServerUrl: sessionStorage.getItem('adminAppServerUrl')
        ? sessionStorage.getItem('adminAppServerUrl')
        : null
};

const getters = {
    getAdminInfo: state => state.adminInfo,
    getToken: state => state.token,
    getmediaServerList: state => state.mediaServerList,
    getLeftNav: state => state.leftNav,
    getappServerUrl: state => state.appServerUrl
};

const actions = {
    actionLeftNavMediaServer({ commit }) {
        api.getMediaServerList(0, 1000).then(res => {
            if (res.status === 'OK') {
                commit('SET_MediaList', res.result);
            }
        });
    },
    actiongetAppServerUrl({ commit }) {
        api.getappServerUrl().then(res => {
            if (res.appServerUrl !== undefined) {
                sessionStorage.setItem('adminAppServerUrl', res.appServerUrl);
                commit('SET_AppServerUrl', res.appServerUrl);
            }
        });
    }
};
// mutations
const mutations = {
    SET_USERINFO(state, data) {
        state.userInfo = data;
    },
    SET_TOKEN(state, data) {
        state.token = data;
    },
    SET_MediaList(state, data) {
        state.mediaServerList = data;
    },
    SET_AppServerUrl(state, data) {
        state.appServerUrl = data;
    }
};
export default {
    state,
    getters,
    actions,
    mutations
};
