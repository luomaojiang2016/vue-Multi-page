
import http from './http.js';
const baseURL = (process.env.NODE_ENV === 'development') ? '/api' : `${window.location.protocol}//${window.location.host}`;
export default {
    getLoginList(appID, roomID, startDate, endDate) {
        const url = `${baseURL}/api/account/loginlog/login/?appID=${appID}&roomID=${roomID}&startDate=${startDate}&endDate=${endDate}`;

        return http.get(url);
    },

    getJoinList(appID, roomID, startDate, endDate) {
        const url = `${baseURL}/api/account/loginlog/join/?appID=${appID}&roomID=${roomID}&startDate=${startDate}&endDate=${endDate}`;

        return http.get(url);
    },

    getLoginjoinslist(appID, roomID, startDate, endDate, from, count) {
        const url = `${baseURL}/api/account/loginlog/loginjoin/?appID=${appID}&roomID=${roomID}&startDate=${startDate}&endDate=${endDate}&from=${from}&count=${count}`;
    
        return http.get(url);
    },

    getPinsCount(appID, roomID, startDate, endDate) {
        const url = `${baseURL}/api/account/streamlog/pincount/?appID=${appID}&roomID=${roomID}&startDate=${startDate}&endDate=${endDate}`;
        return http.get(url);
    },

    getPinstatsloglist(appID, roomID, startDate, endDate) {
        const url = `${baseURL}/api/account/pins/?appID=${appID}&roomID=${roomID}&startDate=${startDate}&endDate=${endDate}`;
        return http.get(url);
    },

    getPublishStreamCount(appID, roomID, startDate, endDate) {
        const url = `${baseURL}/api/account/streamlog/publishstreamcount/?appID=${appID}&roomID=${roomID}&startDate=${startDate}&endDate=${endDate}`;
        return http.get(url);
    },

    getSubscribeStreamCount(appID, roomID, startDate, endDate) {
        const url = `${baseURL}/api/account/streamlog/subscribestreamcount/?appID=${appID}&roomID=${roomID}&startDate=${startDate}&endDate=${endDate}`;
        return http.get(url);
    },

    getPublishStreamFlow(appID, roomID, startDate, endDate) {
        const url = `${baseURL}/api/account/streamlog/publishstreamFlow/?appID=${appID}&roomID=${roomID}&startDate=${startDate}&endDate=${endDate}`;
        return http.get(url);
    },

    getSubscribeStreamFlow(appID, roomID, startDate, endDate) {
        const url = `${baseURL}/api/account/streamlog/subscribestreamflow/?appID=${appID}&roomID=${roomID}&startDate=${startDate}&endDate=${endDate}`;
        return http.get(url);
    },

    getPublishStreamSpeed(appID, roomID, startDate, endDate) {
        const url = `${baseURL}/api/account/streamlog/publishstreamspeed/?appID=${appID}&roomID=${roomID}&startDate=${startDate}&endDate=${endDate}`;
        return http.get(url);
    },

    getSubscribeStreamSpeed(appID, roomID, startDate, endDate) {
        const url = `${baseURL}/api/account/streamlog/subscribestreamspeed/?appID=${appID}&roomID=${roomID}&startDate=${startDate}&endDate=${endDate}`;
        return http.get(url);
    }
};