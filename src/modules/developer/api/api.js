import http from './http.js';
const baseURL =
    process.env.NODE_ENV === 'development'
        ? '/api'
        : `${window.location.protocol}//${window.location.host}`;
export default {
    registerByName(params) {
        return http.post(`${baseURL}/api/account/registerbyname`, params);
    },
    
    getAccountInfo() {
        return http.get(`${baseURL}/api/account/accountinfo`);
    },
    modifyPassword(params) {
        return http.put(`${baseURL}/api/account/modifypassword`, params);
    },
    modifyAccountDesc(params) {
        return http.put(`${baseURL}/api/account/modifyaccountdesc`, params);
    },
    modifyEmail(params) {
        return http.put(`${baseURL}/api/account/modifyemail`, params);
    },
    loginAccount(params) {
        return http.post(`${baseURL}/api/account/login`, params);
    },
    createApp(params) {
        return http.post(`${baseURL}/api/account/apps`, params);
    },
    deleteApp(appID) {
        const url = `${baseURL}/api/account/apps/${appID}`;
        return http.del(url);
    },
    getAppCount() {
        const url = `${baseURL}/api/account/apps-count`;
        return http.get(url);
    },
    getAppList(sort, desc, from, count) {
        const url = `${baseURL}/api/account/apps/${sort}/${desc}?from=${from}&count=${count}`;
        return http.get(url);
    },
    modifyApp(params) {
        const appID = params.appID;
        return http.put(`${baseURL}/api/account/apps/${appID}`, params);
    },
    resetAppSecret(params) {
        return http.put(`${baseURL}/api/account/resetappsecret`, params);
    },
    createRoom(params) {
        return http.post(`${baseURL}/api/account/rooms`, params);
    },
    getRoomCount(appID) {
        const url = `${baseURL}/api/account/rooms-count?appID=${appID}`;
        return http.get(url);
    },
    getRoomList(appID, from, count) {
        const url = `${baseURL}/api/account/rooms/?from=${from}&count=${count}&appID=${appID}`;
        return http.get(url);
    },
    deleteRoom(roomID) {
        const url = `${baseURL}/api/account/rooms/${roomID}`;
        return http.del(url);
    },
    modifyRoom(params) {
        const roomID = params.roomID;
        return http.put(`${baseURL}/api/account/rooms/${roomID}`, params);
    },

    statPins(appServerID, appID, roomID) {
        const url = `${baseURL}/api/account/statpins/?appServerID=${appServerID}&appID=${appID}&roomID=${roomID}`;
        return http.get(url);
    },

    getPinCount(appServerID, appID, roomID) {
        const url = `${baseURL}/api/account/pincount/?appServerID=${appServerID}&appID=${appID}&roomID=${roomID}`;
        return http.get(url);
    },

    getPinList(appServerID, appID, roomID, from, count) {
        const url = `${baseURL}/api/account/pinlist/?appServerID=${appServerID}&appID=${appID}&roomID=${roomID}&from=${from}&count=${count}`;
        return http.get(url);
    },
    getPinMediaInfo(appServerID, pinID) {
        const url = `${baseURL}/api/account/pinmediainfo/?appServerID=${appServerID}&pinID=${pinID}`;
        return http.get(url);
    },
    getEmailReged(email) {
        const url = `${baseURL}/api/account/emails/reged/?email=${email}`;
        return http.get(url);
    },
    getEmailVerifyCode(email) {
        return http.get(`${baseURL}/api/account/emails/verifycode?email=${email}`);
    },
    registerByEmail(params) {
        return http.post(`${baseURL}/api/account/emails`, params);
    },
    resetPasswordByEmail(params) {
        return http.put(`${baseURL}/api/account/resetpassword`, params);
    },
    createOrderByPersonal(params){
        return http.post(`${baseURL}/api/account/orders`, params);
    },
    //取消订单
    cancelOrder(orderID){
        return http.put(`${baseURL}/api/account/orders/${orderID}/cancel`);  
    },
    getWxPayCodeurl(orderID){
        return http.get(`${baseURL}/api/account/orders/${orderID}/wxpay/codeurl`);
    },
    getAlipayPayUrl(orderID){
        const token = sessionStorage.getItem("accountToken");
        const  return_url = `${window.location.protocol}//${window.location.host}`; //"http://192.168.0.54:8080";
        return `${baseURL}/api/account/orders/${orderID}/alipay/payurl?return_url=${return_url}&accessToken=${token}`;
        //return http.get(`${baseURL}/api/account/orders/${params.orderID}/alipay/payurl?return_url=${params.return_url}`);
    },
    getOrderInfoByOrrderID(orderID){
        return http.get(`${baseURL}/api/account/orders/${orderID}`);
    },
    getOrderList(sort, desc, from, count){
        return http.get(`${baseURL}/api/account/orders/${sort}/${desc}?from=${from}&count=${count}`);
    },

    getOrderCount(){
        return http.get(`${baseURL}/api/account/orders-count`);
    },

    getDosageCount(){
        return http.get(`${baseURL}/api/account/dosage-count`);
    },
    getDosageList(sort, desc ,from, count){
        return http.get(`${baseURL}/api/account/dosages/${sort}/${desc}?from=${from}&count=${count}`);
    }
     

};
