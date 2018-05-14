import http from './http.js';

const baseURL = (process.env.NODE_ENV === 'development') ? 
                '/api' : 
                `${window.location.protocol}//${window.location.host}`;

export default {
    async isDBInited() {
        const data = await http.get(`${baseURL}/api/install/dbinited`);
        return data;
    },

    async login(params) {
        const data = await http.post(`${baseURL}/api/admin/login`, params);
        return data;
    },

    async loginout() {
        const data = await http.get(`${baseURL}/api/admin/logout/`);
        return data;
    },

    async getAdminInfo() {
        const data = await http.get(`${baseURL}/api/admin/admininfo/`);
        return data;
    },

    async modifyPassword(params) {
        const data = await http.put(`${baseURL}/api/admin/modifypassword`, params);
        return data;
    },

    async getDeveloperCount() {
        const data = await http.get(`${baseURL}/api/admin/accounts-count`);
        return data;
    },

    async getDeveloperList(from, count) {
        const url = `${baseURL}/api/admin/accounts?from=${from}&count=${count}`;
        const data = await http.get(url);
        return data;
    },

    async getAppCount(accountID) {
        const url = `${baseURL}/api/admin/apps-count?accountID=${accountID}`;
        const data = await http.get(url);
        return data;
    },

    async getAppList(accountID, sort, desc, from, count) {
        const url = `${baseURL}/api/admin/apps/${sort}/${desc}?accountID=${accountID}&from=${from}&count=${count}`;
        const data = await http.get(url);
        return data;
    },

    async getRoomCount(accountID, appID) {
        const url = `${baseURL}/api/admin/rooms-count?accountID=${accountID}&appID=${appID}`;
        const data = await http.get(url);
        return data;
    },

    async getRoomList(accountID, appID, sort, desc, from, count) {
        const url = `${baseURL}/api/admin/rooms/${sort}/${desc}?accountID=${accountID}&appID=${appID}&from=${from}&count=${count}`;
        const data = await http.get(url);
        return data;
    },

    async getActiveRoomCount() {
        const url = `${baseURL}/api/admin/activeroomcount`;
        const data = await http.get(url);
        return data;
    },

    async getAppServerCount() {
        const url = `${baseURL}/api/admin/appservers-count`;
        const data = await http.get(url);
        return data;
    },

    async getAppServerList(sort, desc, from, count) {
        const url = `${baseURL}/api/admin/appservers/${sort}/${desc}?from=${from}&count=${count}`;
        const data = await http.get(url);
        return data;
    },

    async deleteAppServer(appServerID) {
        const url = `${baseURL}/api/admin/appservers/${appServerID}`;
        const data = await http.del(url);
        return data;
    },

    // 开始统计
    async statPins(appServerID, accountID, appID, roomID) {
        const url = `${baseURL}/api/admin/statpins/?appServerID=${appServerID}&accountID=${accountID}}&appID=${appID}&roomID=${roomID}`;
        const data = await http.get(url);
        return data;
    },

    // 获取count
    async getPinCount(appServerID, accountID, appID, roomID) {
        const url = `${baseURL}/api/admin/pincount/?appServerID=${appServerID}&accountID=${accountID}&appID=${appID}&roomID=${roomID}`;
        const data = await http.get(url);
        return data;
    },

    // 获取list
    async getPinList(appServerID, accountID, appID, roomID, from, count) {
        const url = `${baseURL}/api/admin/pinlist/?appServerID=${appServerID}&accountID=${accountID}&appID=${appID}&roomID=${roomID}&from=${from}&count=${count}`;
        const data = await http.get(url);
        return data;
    },

    // 获取详细信息
    async getPinMediaInfo(appServerID, pinID) {
        const url = `${baseURL}/api/admin/pinmediainfo/?appServerID=${appServerID}&pinID=${pinID}`;
        const data = await http.get(url);
        return data;
    },

    // 添加流媒体服务器
    async addMediaServer(params) {
        const data = await http.post(`${baseURL}/api/admin/addmediaserver`, params);
        return data;
    },

    async deleteMediaServer(serverID) {
        const url = `${baseURL}/api/admin/deletemediaserver/?serverID=${serverID}`;
        const data = await http.del(url);
        return data;
    },

    async getMediaServerCount() {
        const data = await http.get(`${baseURL}/api/admin/mediaservercount/`);
        return data;
    },

    async getMediaServerList(from, count) {
        const url = `${baseURL}/api/admin/mediaserverlist/?from=${from}&count=${count}`;
        const data = await http.get(url);
        return data;
    },

    async modifyMediaServer(params) {
        const data = await http.put(`${baseURL}/api/admin/modifymediaserver`, params);
        return data;
    },

    async updateMediaServerEnabled(params) {
        const data = await http.put(`${baseURL}/api/admin/updatemediaserverenabled`, params);
        return data;
    },

    async tryConnectMediaServer(serverPort, serverAddress) {
        const url = `${baseURL}/api/admin/tryconnectmediaserver/?serverPort=${serverPort}&serverAddress=${serverAddress}`;
        const data = await http.get(url);
        return data;
    },

    async addDocShareServer(params) {
        const data = await http.post(`${baseURL}/api/admin/adddocserver`, params);
        return data;
    },

    async deleteDocShareServer(serverID) {
        const url = `${baseURL}/api/admin/deletedocserver/?serverID=${serverID}`;
        const data = await http.del(url);
        return data;
    },

    async getDocShareServerCount() {
        const data = await http.get(`${baseURL}/api/admin/docservers-count/`);
        return data;
    },

    async getDocShareServerList(from, count) {
        const url = `${baseURL}/api/admin/docservers?from=${from}&count=${count}`;
        const data = await http.get(url);
        return data;
    },

    async modifyDocShareServer(params) {
        const docServerID = params.docServerID;
        const data = await http.put(`${baseURL}/api/admin/docservers/${docServerID}`, params);
        return data;
    },

    async updateDocShareServerEnabled(params) {
        const docServerID = params.docServerID;
        const data = await http.put(`${baseURL}/api/admin/docservers/${docServerID}/updateenabled`, params);
        return data;
    },

    async tryConnectDocShareServer(serverPort, serverAddress) {
        const url = `${baseURL}/api/admin/docservers/tryconnect?serverPort=${serverPort}&serverAddress=${serverAddress}`;
        const data = await http.get(url);
        return data;
    },

    async getDbInfo() {
        const data = await http.get(`${baseURL}/api/admin/dbinfo/`);
        return data;
    },

    async getLoginjoinslist(appServerID, accountID, appID, roomID, startDate, endDate) {
        const url = `/api/admin/loginjoinsloglist/?appServerID=${appServerID}&accountID=${accountID}&appID=${appID}&roomID=${roomID}&startDate=${startDate}&endDate=${endDate}`;
        const data = await http.get(url);
        return data;
    },

    async getPinstatsloglist(appServerID, accountID, appID, roomID, startDate, endDate) {
        const url = `/api/admin/pinstatsloglist/?appServerID=${appServerID}&accountID=${accountID}&appID=${appID}&roomID=${roomID}&startDate=${startDate}&endDate=${endDate}`;
        const data = await http.get(url);
        return data;
    },

    async postloginjoinslog(params) {
        const data = await http.post(`${baseURL}/api/test/loginjoinslog`, params);
        return data;
    },

    async activationCode() {
        const data = await http.get(`${baseURL}/api/admin/doginfo/`);
        return data;
    },

    async activationCodeOnline(params) {
        const data = await http.put(`${baseURL}/api/admin/regdogonline`, params);
        return data;
    },

    async activationCodeOffline(sn) {
        const data = await http.get(`${baseURL}/api/admin/dogofflinerequest/?sn=${sn}`);
        return data;
    },

    async activationReturn(params) {
        const data = await http.put(`${baseURL}/api/admin/unregdogonline`, params);
        return data;
    },

    async activationOffline(params) {
        const data = await http.put(`${baseURL}/api/admin/regdogoffline`, params);
        return data;
    },

    async activationReturnOffline() {
        const data = await http.put(`${baseURL}/api/admin/unregdogoffline`);
        return data;
    },

    async getEmailSenderOptions() {
        const url = `${baseURL}/api/admin/configs/sendemail`;
        const data = await http.get(url);
        return data;
    },///

    async setEmailSenderOptions(params) {
        const data = await http.put(`${baseURL}/api/admin/configs/sendemail`, params);
        return data;
    },

    async getMediaserverInfo(appserverID) {
        const url = `${baseURL}/api/admin/mediaservers/${appserverID}`;
        const data = await http.get(url);
        return data;
    },

    async getOrderList(sort, desc, from, count, accountID){
        const data = await http.get(`${baseURL}/api/admin/orders/${sort}/${desc}?from=${from}&count=${count}&accountID=${accountID}`);
        return data;
    },

    async getOrderCount(accountID){
        const data = await http.get(`${baseURL}/api/admin/orders-count?accountID=${accountID}`);
        return data;
    },

    async getDosageCount(accountID){
        const data = await http.get(`${baseURL}/api/admin/dosages-count?accountID=${accountID}`);
        return data;
    },

    async getDosageList(from, count, accountID){
        const data = await http.get(`${baseURL}/api/admin/dosages?from=${from}&count=${count}&accountID=${accountID}`);
        return data;
    },

    async getWeChatPayConfigs() {
        const url = `${baseURL}/api/admin/configs/wxpay`;
        const data = await http.get(url);
        return data;
    },

    async setWeChatPayConfigs(params) {
        const data = await http.put(`${baseURL}/api/admin/configs/wxpay`, params);
        return data;
    },

    async getAlipayConfigs() {
        const url = `${baseURL}/api/admin/configs/alipay`;
        const data = await http.get(url);
        return data;
    },

    async setAlipayConfigs(params) {
        const data = await http.put(`${baseURL}/api/admin/configs/alipay`, params);
        return data;
    },

    //单价获取
    async getDosageUnitPrice(){
        const data = await http.get(`${baseURL}/api/admin/configs/unitprice`);
        return data;
    },

    //单价配置
    async setDosageUnitPrice(params){
        const data = await http.put(`${baseURL}/api/admin/configs/unitprice`,params);
        return data;
    },
    //为一个开发者帐号赠送金钱
    async giveMoneyToAccount(params){
        const data = await http.post(`${baseURL}/api/admin/givemoney/${params.accountID}`,params);
        return data;
    },
    //新帐号默认送的金钱配置
    async getDefGiveMoneyFen(){
        const data = await http.get(`${baseURL}/api/admin/configs/defgivemoney`);
        return data;
    },
    async setDefGiveMoneyFen(params){
        const data = await http.put(`${baseURL}/api/admin/configs/defgivemoney`,params);
        return data;
    }

};
