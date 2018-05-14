<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="4">
                <el-select v-model="accountID" @change="changeDeveloper" clearable placeholder="请选择开发者" size="small">
                    <el-option v-for="item in developmerOptions" :key="item.accountID" :label="item.accountName" :value="item.accountID">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select v-model="appID" @change="changeApp" clearable placeholder="请选择app" size="small">
                    <el-option v-for="item in appOptions" :key="item.appID" :label="item.appName" :value="item.appID">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select v-model="roomID" @change="changeRoom" clearable placeholder="请选择房间" size="small">
                    <el-option v-for="item in roomOptions" :key="item.roomID" :label="item.roomName" :value="item.roomID">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-row>
            <br>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="10">
                <el-radio-group size="small" v-model="timeValue" @change="timeSelectChange" style="margin-bottom: 20px;">
                    <el-radio-button label="min">最近15分钟</el-radio-button>
                    <el-radio-button label="hour">最近一小时</el-radio-button>
                    <el-radio-button label="day">最近一天</el-radio-button>
                    <el-radio-button label="week">最近一周</el-radio-button>
                    <el-radio-button label="month">最近一月</el-radio-button>
                    <el-radio-button label="other">选择时间</el-radio-button>
                </el-radio-group>
            </el-col>
            <el-col :span="8">
                <div v-if="timeValue === 'other'" class="block">
                    <el-date-picker size="small" v-model="selectDateTime" @change="selectChange" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
                    </el-date-picker>
                </div>
            </el-col>
        </el-row>
        <el-card>
            <el-row>
                <el-col :span="8">
                    <el-switch v-model="curveType" active-text="曲线图" inactive-text="直方图" @change="curveChange">
                    </el-switch>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" size='mini' icon="el-icon-search" @click="reFreash">刷新</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card style="width: 100%" height="80" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
            <vue-highcharts :options="loginTemplate" ref="loginChart"></vue-highcharts>
        </el-card>
        <el-card style="width: 100%" height="80" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
            <vue-highcharts :options="joinTemplate" ref="joinChart"></vue-highcharts>
        </el-card>
        <el-card class="box-card">
            <el-table :data="loginJoinsTable" style="width: 100%" height="250">
                <el-table-column prop="userName" label="用户名">
                </el-table-column>
                <el-table-column prop="type" label="类型" width="150">
                </el-table-column>
                <el-table-column prop="terminalType" label="终端" width="150">
                </el-table-column>
                <el-table-column prop="remoteAddress" label="地址">
                </el-table-column>
                <el-table-column prop="logDate" label="日期" :formatter="formatLogDate">
                </el-table-column>
                <el-table-column type="expand">
                    <div slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="账户ID">
                                <span>{{ props.row.accountID }}</span>
                            </el-form-item>
                            <el-form-item label="appID">
                                <span>{{ props.row.appID }}</span>
                            </el-form-item>
                            <el-form-item label="服务器ID">
                                <span>{{ props.row.appServerID }}</span>
                            </el-form-item>
                            <el-form-item label="appServerUrl">
                                <span>{{ props.row.appServerUrl }}</span>
                            </el-form-item>
                            <el-form-item label="mediaServerWsUri">
                                <span>{{ props.row.mediaServerWsUri }}</span>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" background layout="prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {
        mapActions,
    } from 'vuex';
    import commonfunc from "../../../../utils/commonfunc.js";
    import {
        loginTemplate,
        joinTemplate
    } from "../../../../utils/chartTemplate.js";
    import api from "../../api/api.js";
    import logapi from "../../api/logapi.js";
    import Schart from 'vue-schart';
    import VueHighcharts from './VueHighcharts.vue'
    export default {
        components: {
            Schart,
            VueHighcharts,
        },
        data() {
            return {
                curveType: true,
                timeValue: 'min',
                onlineMegTitle: '',
                loginJoinsTable: [],
                selectDateTime: '',
                loading: false,
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                loginTemplate: loginTemplate,
                joinTemplate: joinTemplate,
                xAxis: '',
                yAxis: [],
                loginData: {
                    name: '登录',
                    data: []
                },
                joinData: {
                    name: '入会',
                    color: "#ADFF2F",
                    data: []
                },
                loginBuckets: [], //登录桶数据
                joinBuckets: [], //入会桶数据
                total: 0,
                currentPage: 1,
                pageSizes: this.pageSizes,
                pageSize: this.pageSizes[1],
                appServerOptions: [],
                appServerID: '',
                developmerOptions: [],
                accountID: '',
                appOptions: [],
                appID: '',
                roomOptions: [],
                roomID: ''
            };
        },
        methods: {
            curveChange(val) {
                this.curveType = val;
                if (val) {
                    loginTemplate.chart.type = 'line'
                    joinTemplate.chart.type = 'line'
                } else {
                    loginTemplate.chart.type = 'column'
                    joinTemplate.chart.type = 'column'
                }
                this.reFreash();
            },
            handleCurrentChange(val) {
                const self = this;
                if (self.currentPage !== val) {
                    self.currentPage = val;
                    self.getLoginJoin(this.startTimestamp, this.endTimestamp);
                }
            },
            reFreash() {
                if (this.timeValue === '') {
                    this.timeValue = 'min';
                }
                this.timeSelectChange(this.timeValue);
            },
            changeDeveloper(accountID) {
                const self = this;
                self.appOptions = [],
                    self.appID = '';
                self.roomOptions = [],
                    self.roomID = '';
                self.accountID = accountID;
                if (accountID) {
                    self.getAppOptions(accountID);
                }
                if (self.timeValue != '') {
                    self.timeValue = ''
                }
            },
            changeApp(appID) {
                this.roomOptions = [],
                    this.roomID = '';
                this.appID = appID;
                if (appID) {
                    this.getRoomOptions(appID);
                }
                if (this.timeValue != '') {
                    this.timeValue = ''
                }
            },
            changeRoom(room) {
                if (this.timeValue != '') {
                    this.timeValue = ''
                }
            },
            updateLoginCurve() {
                const self = this;
                const loginChart = this.$refs.loginChart;
                loginChart.removeSeries();
                this.loginData.data = [];
                self.loginTemplate.xAxis.categories = [];
                const length = self.loginBuckets.length;
                let loginTimes = 0;
                this.loginTemplate.xAxis.tickInterval = commonfunc.getInterval(length);
                for (const value of self.loginBuckets) {
                    self.loginTemplate.xAxis.categories.push(value._id); //时间轴坐标
                    self.loginData.data.push(value.count);
                }
                this.loginData.name = `登录次数`;
                loginChart.mergeOption(this.loginTemplate);
                loginChart.addSeries(this.loginData);
                this.loading = false;
            },
            updateJoinCurve() {
                const self = this;
                const joinChart = this.$refs.joinChart;
                joinChart.removeSeries();
                this.joinData.data = [];
                self.joinTemplate.xAxis.categories = [];
                const length = self.joinBuckets.length;
                let joinTimes = 0;
                this.joinTemplate.xAxis.tickInterval = commonfunc.getInterval(length);
                for (const value of self.joinBuckets) {
                    self.joinTemplate.xAxis.categories.push(value._id); //时间轴坐标
                    self.joinData.data.push(value.count);
                }
                this.joinData.name = `入会次数`;
                joinChart.mergeOption(this.joinTemplate);
                joinChart.addSeries(this.joinData);
                this.loading = false;
            },
            selectChange(datetime) {
                const self = this;
                const beginTime = datetime[0].valueOf();
                const endTime = datetime[1].valueOf();
                const dat = (endTime - beginTime) / 1000;
                if (dat <= 60 * 15) {
                    self.otherTimeValue = 'min';
                } else if (dat <= 60 * 60) {
                    self.otherTimeValue = 'hour';
                } else if (dat <= 60 * 60 * 24) {
                    self.otherTimeValue = 'day';
                } else if (dat <= 60 * 60 * 24 * 7) {
                    self.otherTimeValue = 'week';
                } else if (dat <= 60 * 60 * 24 * 31 * 3) {
                    self.otherTimeValue = 'month';
                } else if (dat <= 60 * 60 * 24 * 31 * 12) {
                    self.otherTimeValue = 'year';
                } else {
                    this.$message.error('选择时间范围不能超过一年!');
                    return;
                }
                this.startTimestamp = Math.floor(beginTime / 1000);
                this.endTimestamp = Math.floor(endTime / 1000);
                this.getLoginjoinslist(this.startTimestamp, this.endTimestamp);
            },
            load() {
                let loginChart = this.$refs.loginChart;
                loginChart.delegateMethod('showLoading', 'Loading...');
                setTimeout(() => {
                    loginChart.hideLoading();
                }, 10)
            },
            async getLoginjoinslist(startDate, endDate) {
                const self = this;
                const appServerID = self.appServerID === '' ? 0 : self.appServerID;
                const accountID = self.accountID === '' ? 0 : self.accountID;
                const appID = self.appID === '' ? 0 : self.appID;
                const roomID = self.roomID === '' ? 0 : self.roomID;
                try {
                    self.loading = true;
                    const res = await logapi.getLoginList(0, accountID, appID, roomID, startDate, endDate);
                    self.loading = false;
                    if (res.status === 'OK') {
                        this.loginBuckets = res.result;
                        this.updateLoginCurve();
                    }
                    if (res.status === 'ERROR') {
                        if (res.error.status === 404)
                            return;
                        commonfunc.doError(self, res.error);
                    }
                } catch (errors) {
                    this.$message.error(errors.message);
                }
                try {
                    self.loading = true;
                    const res = await logapi.getJoinList(0, accountID, appID, roomID, startDate, endDate);
                    self.loading = false;
                    if (res.status === 'OK') {
                        this.joinBuckets = res.result;
                        this.updateJoinCurve();
                    }
                    if (res.status === 'ERROR') {
                        if (res.error.status === 404)
                            return;
                        commonfunc.doError(self, res.error);
                    }
                } catch (errors) {
                    this.$message.error(errors.message);
                }
                self.getLoginJoin(startDate, endDate);
            },
            //查询
            async getLoginJoin(startDate, endDate) {
                const self = this;
                const appServerID = self.appServerID === '' ? 0 : self.appServerID;
                const accountID = self.accountID === '' ? 0 : self.accountID;
                const appID = self.appID === '' ? 0 : self.appID;
                const roomID = self.roomID === '' ? 0 : self.roomID;
                self.loginJoinsTable = [];
                try {
                    const from = (self.currentPage - 1) * self.pageSize;
                    const res = await logapi.getLoginjoinslist(0, accountID, appID, roomID, startDate, endDate, from, self.pageSize);
                    if (res.status === 'OK') {
                        this.total = res.result.total;
                        for (var value of res.result.record) {
                            value.userName = value.data.userInfo.userName;
                            value.remoteAddress = `${value.data.userInfo.remoteAddress}:${value.data.userInfo.remotePort}`;
                            value.terminalType = value.data.userInfo.terminalType;
                            if (value.data.appServerInfo) {
                                value.appServerUrl = value.data.appServerInfo.appServerUrl;
                                value.mediaServerWsUri = value.data.appServerInfo.mediaServerWsUri;
                            } else {
                                value.appServerUrl = '--';
                                value.mediaServerWsUri = '--';
                            }
                            self.loginJoinsTable.push(value);
                        }
                    }
                    if (res.status === 'ERROR') {
                        if (res.error.status === 404)
                            return;
                        commonfunc.doError(self, res.error);
                    }
                } catch (errors) {
                    this.$message.error(errors.message);
                }
            },
            formatLogDate(row, column) {
                const date = new Date(row.logDate).valueOf() / 1000;
                return commonfunc.secToDate(date);
            },
            timeSelectChange(time) {
                if (time === 'other') {
                    return;
                }
                switch (time) {
                    case 'min':
                        {
                            this.startTimestamp = Math.floor(new Date().valueOf() / 1000 - 60 * 15);
                        }
                        break;
                    case 'hour':
                        {
                            this.startTimestamp = Math.floor(new Date().valueOf() / 1000 - 60 * 60);
                        }
                        break;
                    case 'day':
                        {
                            this.startTimestamp = Math.floor(new Date().valueOf() / 1000 - 60 * 60 * 24);
                        }
                        break;
                    case 'week':
                        {
                            this.startTimestamp = Math.floor(new Date().valueOf() / 1000 - 60 * 60 * 24 * 7);
                        }
                        break;
                    case 'month':
                        {
                            this.startTimestamp = Math.floor(new Date().valueOf() / 1000 - 60 * 60 * 24 * 30);
                        }
                        break;
                };
                this.endTimestamp = Math.floor(new Date().valueOf() / 1000);
                this.getLoginjoinslist(this.startTimestamp, this.endTimestamp);
            },
            async getAppServerDeveloper() {
                const self = this;
                try {
                    const from = 0;
                    const count = 10000 * 5;
                    // self.appServerOptions = [];
                    const results = await Promise.all([api.getAppServerList(from, count), api.getDeveloperList(from, count)]);
                    if (results[0].status === 'OK') {
                        for (const value of results[0].result) {
                            const item = {
                                appServerID: value.appServerID,
                                appServerUrl: value.appServerUrl
                            }
                            self.appServerOptions.push(item);
                        }
                    }
                    if (results[0].status === 'ERROR') {
                        commonfunc.doError(self, results[0].error);
                    }
                    if (results[1].status === 'ERROR') {
                        commonfunc.doError(self, results[1].error);
                    }
                    if (results[1].status === 'OK') {
                        for (const value of results[1].result) {
                            const item = {
                                accountID: value.accountID,
                                accountName: value.accountName
                            }
                            self.developmerOptions.push(item);
                        }
                    }
                    this.timeSelectChange(this.timeValue);
                } catch (errors) {
                    self.$message.error(errors.message);
                }
            },
            async getAppOptions(accountID) {
                const self = this;
                try {
                    const from = 0;
                    const count = 10000 * 5;
                    const res = await api.getAppList(accountID, from, count);
                    if (res.status === 'OK') {
                        for (const value of res.result) {
                            const item = {
                                appID: value.appID,
                                appName: value.appName
                            }
                            self.appOptions.push(item);
                        }
                    }
                    if (res.status === 'ERROR') {
                        commonfunc.doError(self, res.error);
                    }
                } catch (errors) {
                    self.$message.error(errors.message);
                }
            },
            async getRoomOptions(appID) {
                const self = this;
                try {
                    const from = 0;
                    const count = 10000 * 5;
                    const res = await api.getRoomList(self.accountID, appID, from, count);
                    if (res.status === 'OK') {
                        for (const value of res.result) {
                            const item = {
                                roomID: value.roomID,
                                roomName: value.roomName
                            }
                            self.roomOptions.push(item);
                        }
                    }
                    if (res.status === 'ERROR') {
                        commonfunc.doError(self, res.error);
                    }
                } catch (errors) {
                    self.$message.error(errors.message);
                }
            }
        },
        created() {
            this.getAppServerDeveloper();
            //  this.actiongetLogServerUrl();
        }
    };
</script>

<style>
    .box-card {}
    .box-card-table {
        height: 100px;
    }
    .schart {
        width: 200px;
        display: inline-block;
    }
    .content-title {
        clear: both;
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
    .small {
        max-width: 600px;
        margin: 150px auto;
    }
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 130px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>