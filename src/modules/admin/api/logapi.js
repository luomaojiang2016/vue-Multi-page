
import http from './http.js';
const baseURL = (process.env.NODE_ENV === 'development') ? '/api' : `${window.location.protocol}//${window.location.host}`;
export default {
    getLoginList(appServerID, accountID, appID, roomID, startDate, endDate) {
        const url = `${baseURL}/api/admin/loginlog/login/?appServerID=${appServerID}&accountID=${accountID}&appID=${appID}&roomID=${roomID}&startDate=${startDate}&endDate=${endDate}`;
       
        return http.get(url);
    },

    getJoinList(appServerID, accountID, appID, roomID, startDate, endDate) {
        const url = `${baseURL}/api/admin/loginlog/join/?appServerID=${appServerID}&accountID=${accountID}&appID=${appID}&roomID=${roomID}&startDate=${startDate}&endDate=${endDate}`;

        return http.get(url);
    },

    getLoginjoinslist(appServerID, accountID, appID, roomID, startDate, endDate, from, count) {
        const url = `${baseURL}/api/admin/loginlog/loginjoin/?appServerID=${appServerID}&accountID=${accountID}&appID=${appID}&roomID=${roomID}&startDate=${startDate}&endDate=${endDate}&from=${from}&count=${count}`;
    
        return http.get(url);
    },

    getPinsCount(appServerID, accountID, appID, roomID, startDate, endDate) {
        const url = `${baseURL}/api/admin/streamlog/pincount/?appServerID=${appServerID}&accountID=${accountID}&appID=${appID}&roomID=${roomID}&startDate=${startDate}&endDate=${endDate}`;
        return http.get(url);
    },

    getPinstatsloglist(appServerID, accountID, appID, roomID, startDate, endDate) {
        const url = `${baseURL}/api/admin/pins/?appServerID=${appServerID}&accountID=${accountID}&appID=${appID}&roomID=${roomID}&startDate=${startDate}&endDate=${endDate}`;
        return http.get(url);
    },

    getPublishStreamCount(appServerID, accountID, appID, roomID, startDate, endDate) {
        const url = `${baseURL}/api/admin/streamlog/publishstreamcount/?appServerID=${appServerID}&accountID=${accountID}&appID=${appID}&roomID=${roomID}&startDate=${startDate}&endDate=${endDate}`;
        return http.get(url);
    },

    getSubscribeStreamCount(appServerID, accountID, appID, roomID, startDate, endDate) {
        const url = `${baseURL}/api/admin/streamlog/subscribestreamcount/?appServerID=${appServerID}&accountID=${accountID}&appID=${appID}&roomID=${roomID}&startDate=${startDate}&endDate=${endDate}`;
        return http.get(url);
    },

    getPublishStreamFlow(appServerID, accountID, appID, roomID, startDate, endDate) {
        const url = `${baseURL}/api/admin/streamlog/publishstreamFlow/?appServerID=${appServerID}&accountID=${accountID}&appID=${appID}&roomID=${roomID}&startDate=${startDate}&endDate=${endDate}`;
        return http.get(url);
    },

    getSubscribeStreamFlow(appServerID, accountID, appID, roomID, startDate, endDate) {
        const url = `${baseURL}/api/admin/streamlog/subscribestreamflow/?appServerID=${appServerID}&accountID=${accountID}&appID=${appID}&roomID=${roomID}&startDate=${startDate}&endDate=${endDate}`;
        return http.get(url);
    },

    getPublishStreamSpeed(appServerID, accountID, appID, roomID, startDate, endDate) {
        const url = `${baseURL}/api/admin/streamlog/publishstreamspeed/?appServerID=${appServerID}&accountID=${accountID}&appID=${appID}&roomID=${roomID}&startDate=${startDate}&endDate=${endDate}`;
        return http.get(url);
    },

    getSubscribeStreamSpeed(appServerID, accountID, appID, roomID, startDate, endDate) {
        const url = `${baseURL}/api/admin/streamlog/subscribestreamspeed/?appServerID=${appServerID}&accountID=${accountID}&appID=${appID}&roomID=${roomID}&startDate=${startDate}&endDate=${endDate}`;
        return http.get(url);
    }
};