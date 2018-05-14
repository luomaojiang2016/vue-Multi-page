<template>
    <div>
        <el-row :gutter="20">
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
        <el-row>
            <el-col :span="12">
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
        <el-row>
            <el-col :span="12">
                <el-card style="width: 100%" height="100" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
                    <vue-highcharts :options="PSCTemplate" ref="PSCChart"></vue-highcharts>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card style="width: 100%" height="100" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
                    <vue-highcharts :options="SSCTemplate" ref="SSCChart"></vue-highcharts>
                </el-card>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-card style="width: 100%" height="100" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
                    <vue-highcharts :options="PSSTemplate" ref="PSSChart"></vue-highcharts>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card style="width: 100%" height="100" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
                    <vue-highcharts :options="SSSTemplate" ref="SSSChart"></vue-highcharts>
                </el-card>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-card style="width: 100%" height="100" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
                    <vue-highcharts :options="PSFTemplate" ref="PSFChart"></vue-highcharts>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card style="width: 100%" height="100" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
                    <vue-highcharts :options="SSFTemplate" ref="SSFChart"></vue-highcharts>
                </el-card>
            </el-col>
        </el-row>
        <!--
                                                                                            <el-card class="box-card">
                                                                                                <el-table :data="pinStatsTable" style="width: 100%" height="250">
                                                                                                    <el-table-column prop="accountName" label="用户名">
                                                                                                    </el-table-column>
                                                                                                    <el-table-column prop="appName" label="App名">
                                                                                                    </el-table-column>
                                                                                                    <el-table-column prop="roomName" label="房间">
                                                                                                    </el-table-column>
                                                                                                    <el-table-column prop="logDate" label="日期" :formatter="formatLogDate">
                                                                                                    </el-table-column>
                                                                                                    <el-table-column type="expand">
                                                                                                        <div slot-scope="props">
                                                                                                            <el-form label-position="left" inline class="demo-table-expand">
                                                                                                                <el-form-item label="pinID">
                                                                                                                    <span>{{ props.row.pinID }}</span>
                                                                                                                </el-form-item>
                                                                                                                <el-form-item label="pinType">
                                                                                                                    <span>{{ props.row.pinType }}</span>
                                                                                                                </el-form-item>
                                                                                                                <el-form-item label="appID">
                                                                                                                    <span>{{ props.row.appID }}</span>
                                                                                                                </el-form-item>
                                                                                                                <el-form-item label="服务器ID">
                                                                                                                    <span>{{ props.row.appServerID }}</span>
                                                                                                                </el-form-item>
                                                                                                                <el-form-item label="roomID">
                                                                                                                    <span>{{ props.row.roomID }}</span>
                                                                                                                </el-form-item>
                                                                                                                <el-form-item label="streamID">
                                                                                                                    <span>{{ props.row.streamID }}</span>
                                                                                                                </el-form-item>
                                                                                                                <el-form-item label="streamType">
                                                                                                                    <span>{{ props.row.streamType }}</span>
                                                                                                                </el-form-item>
                                                                                                                <el-form-item label="streamName">
                                                                                                                    <span>{{ props.row.streamName }}</span>
                                                                                                                </el-form-item>
                                                                                                                <el-form-item label="publisherID">
                                                                                                                    <span>{{ props.row.publisherID }}</span>
                                                                                                                </el-form-item>
                                                                                                                <el-form-item label="publisherIP">
                                                                                                                    <span>{{ props.row.publisherIP }}</span>
                                                                                                                </el-form-item>
                                                                                                                <el-form-item label="publisherName">
                                                                                                                    <span>{{ props.row.publisherName }}</span>
                                                                                                                </el-form-item>
                                                                                                                <el-form-item label="subscriberID">
                                                                                                                    <span>{{ props.row.subscriberID }}</span>
                                                                                                                </el-form-item>
                                                                                                                <el-form-item label="subscriberIP">
                                                                                                                    <span>{{ props.row.subscriberIP }}</span>
                                                                                                                </el-form-item>
                                                                                                                <el-form-item label="subscriberName">
                                                                                                                    <span>{{ props.row.subscriberName }}</span>
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
                                                                                            </el-card> -->
    </div>
</template>

<script>
    import commonfunc from "../../../../utils/commonfunc.js";
    import {
        mapActions,
    } from 'vuex';
    import {
        PSCTemplate,
        SSCTemplate,
        PSFTemplate,
        SSFTemplate,
        PSSTemplate,
        SSSTemplate
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
                otherTimeValue: '',
                onlineMegTitle: '',
                pinStatsTable: [],
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
                PSCTemplate,
                SSCTemplate,
                PSFTemplate,
                SSFTemplate,
                PSSTemplate,
                SSSTemplate,
                PSCData: {
                    name: '',
                    data: []
                },
                PSCBuckets: [],
                SSCData: {
                    name: '',
                    data: []
                },
                SSCBuckets: [],
                PSFData: {
                    name: '',
                    data: []
                },
                PSFBuckets: [],
                SSFData: {
                    name: '',
                    data: []
                },
                SSFBuckets: [],
                PSSData: {
                    name: '',
                    data: []
                },
                PSSBuckets: [],
                SSSData: {
                    name: '',
                    data: []
                },
                SSSBuckets: [],
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
                roomID: '',
                staticMethond: false
            };
        },
        methods: {
            curveChange(val) {
                this.curveType = val;
                if (val) {
                    PSCTemplate.chart.type = 'line'
                    SSCTemplate.chart.type = 'line'
                    PSFTemplate.chart.type = 'line'
                    SSFTemplate.chart.type = 'line'
                    PSSTemplate.chart.type = 'line'
                    SSSTemplate.chart.type = 'line'
                } else {
                    PSCTemplate.chart.type = 'column'
                    SSCTemplate.chart.type = 'column'
                    PSFTemplate.chart.type = 'column'
                    SSFTemplate.chart.type = 'column'
                    PSSTemplate.chart.type = 'column'
                    SSSTemplate.chart.type = 'column'
                }
                this.reFreash();
            },
            reFreash() {
                if (this.timeValue === '') {
                    this.timeValue = 'day';
                }
                this.timeSelectChange(this.timeValue);
            },
            handleCurrentChange(val) {
                const self = this;
                const a = (val - 1) * self.pageSize;
                const b = (val - 1) * self.pageSize + self.pageSize;
                self.pinStatsTable = self.pinStatsTableCopy.slice(a, b);
                for (let i = 0; i < self.pinStatsTable.length; i++) {
                    const jsonData = JSON.parse(self.pinStatsTable[i].data);
                    self.pinStatsTable[i].appName = jsonData.appInfo.appName;
                    self.pinStatsTable[i].roomName = jsonData.roomInfo.roomName;
                    self.pinStatsTable[i].accountName = jsonData.accountInfo.accountName;
                    self.pinStatsTable[i].appServerUrl = jsonData.appServerInfo.appServerUrl;
                    self.pinStatsTable[i].mediaServerWsUri = jsonData.appServerInfo.mediaServerWsUri;
                    const jsonPinBaseInfo = JSON.parse(self.pinStatsTable[i].pinBaseInfo);
                    self.pinStatsTable[i].pinID = jsonPinBaseInfo.pinID;
                    self.pinStatsTable[i].appID = jsonPinBaseInfo.appID;
                    self.pinStatsTable[i].appName = jsonPinBaseInfo.appName;
                    self.pinStatsTable[i].roomID = jsonPinBaseInfo.roomID;
                    self.pinStatsTable[i].roomName = jsonPinBaseInfo.roomName;
                    self.pinStatsTable[i].pinType = jsonPinBaseInfo.pinType;
                    self.pinStatsTable[i].streamID = jsonPinBaseInfo.streamID;
                    self.pinStatsTable[i].streamType = jsonPinBaseInfo.streamType;
                    self.pinStatsTable[i].streamName = jsonPinBaseInfo.streamName;
                    self.pinStatsTable[i].publisherID = jsonPinBaseInfo.publisherID !== undefined ? jsonPinBaseInfo.publisherID : '';
                    self.pinStatsTable[i].publisherName = jsonPinBaseInfo.publisherName !== undefined ? jsonPinBaseInfo.publisherName : '';
                    self.pinStatsTable[i].publisherIP = jsonPinBaseInfo.publisherIP !== undefined ? jsonPinBaseInfo.publisherIP : '';
                    self.pinStatsTable[i].subscriberID = jsonPinBaseInfo.subscriberID !== undefined ? jsonPinBaseInfo.subscriberID : '';
                    self.pinStatsTable[i].subscriberName = jsonPinBaseInfo.subscriberName !== undefined ? jsonPinBaseInfo.subscriberName : '';
                    self.pinStatsTable[i].subscriberIP = jsonPinBaseInfo.subscriberIP !== undefined ? jsonPinBaseInfo.subscriberIP : '';
                }
            },
            changeApp(appID) {
                this.roomOptions = [],
                    this.roomID = '';
                this.appID = appID;
                if (appID) {
                    this.getRoomOptions(appID);
                }
                if (self.timeValue != '') {
                    self.timeValue = ''
                }
            },
            changeRoom(room) {
                if (self.timeValue != '') {
                    self.timeValue = ''
                }
            },
            updatePSCCurve() {
                const self = this;
                const linePSCChart = this.$refs.PSCChart;
                linePSCChart.removeSeries();
                self.PSCData.data = [];
                self.PSCTemplate.xAxis.categories = [];
                const length = self.PSCBuckets.length;
                self.PSCTemplate.xAxis.tickInterval = commonfunc.getInterval(length);
                for (const value of self.PSCBuckets) {
                    self.PSCTemplate.xAxis.categories.push(value._id); //时间轴坐标
                    self.PSCData.data.push(value.count);
                }
                self.PSCData.data.pop();
                self.PSCData.name = `发布流数量`;
                linePSCChart.mergeOption(self.PSCTemplate);
                linePSCChart.addSeries(self.PSCData);
            },
            updateSSCCurve() {
                const self = this;
                const lineSSCChart = self.$refs.SSCChart;
                lineSSCChart.removeSeries();
                self.SSCData.data = [];
                self.SSCTemplate.xAxis.categories = [];
                const length = self.SSCBuckets.length;
                self.SSCTemplate.xAxis.tickInterval = commonfunc.getInterval(length);
                for (const value of self.SSCBuckets) {
                    self.SSCTemplate.xAxis.categories.push(value._id); //时间轴坐标
                    self.SSCData.data.push(value.count);
                }
                self.SSCData.data.pop();
                self.SSCData.name = `订阅流数量`;
                lineSSCChart.mergeOption(self.SSCTemplate);
                lineSSCChart.addSeries(self.SSCData);
            },
            updatePSFCurve() {
                const self = this;
                const linePSFChart = self.$refs.PSFChart;
                linePSFChart.removeSeries();
                self.PSFData.data = [];
                self.PSFTemplate.xAxis.categories = [];
                const length = self.SSCBuckets.length;
                self.PSFTemplate.xAxis.tickInterval = commonfunc.getInterval(length);
                for (const value of self.PSFBuckets) {
                    self.PSFTemplate.xAxis.categories.push(value._id); //时间轴坐标
                    const flow = Math.floor(value.sum);
                    self.PSFData.data.push(flow);
                }
                self.PSFData.data.pop();
                self.PSFData.name = `发布流流量`;
                self.PSFData.data.pop(); //去掉最后一个元素
                let sum = 0;
                for (const value of self.PSFData.data) {
                    sum += value;
                }
                const average = sum / self.PSFData.data.length;
                let yAxisTitle = '';
                const sizes = ['Bytes', 'KB', 'MB', 'GB'];
                let yAxis = 0;
                if (average < 1024) {
                    yAxisTitle = sizes[0];
                    yAxis = 1;
                } else if (average < (1024 * 1024)) {
                    yAxisTitle = sizes[1];
                    yAxis = 1024;
                } else if (average < (1024 * 1024 * 1024)) {
                    yAxisTitle = sizes[2];
                    yAxis = 1024 * 1024;
                } else if (average < (1024 * 1024 * 1024 * 1024)) {
                    yAxisTitle = sizes[3];
                    yAxis = 1024 * 1024 * 1024;
                } else {
                    yAxisTitle = sizes[0];
                    yAxis = 1;
                }
                for (let i = 0; i < self.PSFData.data.length; i++) {
                    self.PSFData.data[i] = Math.floor(self.PSFData.data[i] / yAxis);
                }
                self.PSFTemplate.yAxis.title.text = yAxisTitle;
                linePSFChart.mergeOption(self.PSFTemplate);
                linePSFChart.addSeries(self.PSFData);
            },
            updateSSFCurve() {
                const self = this;
                const lineSSFChart = self.$refs.SSFChart;
                lineSSFChart.removeSeries();
                self.SSFData.data = [];
                self.SSFTemplate.xAxis.categories = [];
                const length = self.SSCBuckets.length;
                self.SSFTemplate.xAxis.tickInterval = commonfunc.getInterval(length);
                for (const value of self.SSFBuckets) {
                    self.SSFTemplate.xAxis.categories.push(value._id); //时间轴坐标
                    const flow = Math.floor(value.sum);
                    self.SSFData.data.push(flow);
                }
                self.SSFData.data.pop();
                self.SSFData.name = `订阅流流量`;
                self.SSFData.data.pop(); //去掉最后一个元素
                let sum = 0;
                for (const value of self.SSFData.data) {
                    sum += value;
                }
                const average = sum / self.SSFData.data.length;
                let yAxisTitle = '';
                const sizes = ['Bytes', 'KB', 'MB', 'GB'];
                let yAxis = 0;
                if (average < 1024) {
                    yAxisTitle = sizes[0];
                    yAxis = 1;
                } else if (average < (1024 * 1024)) {
                    yAxisTitle = sizes[1];
                    yAxis = 1024;
                } else if (average < (1024 * 1024 * 1024)) {
                    yAxisTitle = sizes[2];
                    yAxis = 1024 * 1024;
                } else if (average < (1024 * 1024 * 1024 * 1024)) {
                    yAxisTitle = sizes[3];
                    yAxis = 1024 * 1024 * 1024;
                } else {
                    yAxisTitle = sizes[0];
                    yAxis = 1;
                }
                for (let i = 0; i < self.SSFData.data.length; i++) {
                    self.SSFData.data[i] = Math.floor(self.SSFData.data[i] / yAxis);
                }
                self.SSFTemplate.yAxis.title.text = yAxisTitle;
                lineSSFChart.mergeOption(self.SSFTemplate);
                lineSSFChart.addSeries(self.SSFData);
            },
            //发布流速度
            updatePSSCurve(times) {
                const self = this;
                const linePSSChart = self.$refs.PSSChart;
                linePSSChart.removeSeries();
                self.PSSData.data = [];
                self.PSSTemplate.xAxis.categories = [];
                const length = self.PSSBuckets.length;
                self.PSSTemplate.xAxis.tickInterval = commonfunc.getInterval(length);
                for (const value of self.PSSBuckets) {
                    self.PSSTemplate.xAxis.categories.push(value._id); //时间轴坐标
                    self.PSSData.data.push(value.speed / times);
                }
                self.PSSData.data.pop();
                self.PSSData.name = `发布流速度`;
                let sum = 0;
                for (const value of self.PSSData.data) {
                    sum += value;
                }
                const average = sum / self.PSSData.data.length;
                let yAxisTitle = '';
                const sizes = ['bps', 'Kbps', 'Mbps', 'Gbps'];
                let yAxis = 0;
                if (average < 1024) {
                    yAxisTitle = sizes[0];
                    yAxis = 1 / 8;
                } else if (average < (1024 * 1024)) {
                    yAxisTitle = sizes[1];
                    yAxis = 1024 / 8;
                } else if (average < (1024 * 1024 * 1024)) {
                    yAxisTitle = sizes[2];
                    yAxis = 1024 * 1024 / 8;
                } else if (average < (1024 * 1024 * 1024 * 1024)) {
                    yAxisTitle = sizes[3];
                    yAxis = 1024 * 1024 * 1024 / 8;
                } else {
                    yAxisTitle = sizes[0];
                    yAxis = 1 / 8;
                }
                for (let i = 0; i < self.PSSData.data.length; i++) {
                    self.PSSData.data[i] = Math.floor(self.PSSData.data[i] / yAxis);
                }
                self.PSSTemplate.yAxis.title.text = yAxisTitle;
                linePSSChart.mergeOption(self.PSSTemplate);
                linePSSChart.addSeries(self.PSSData);
            },
            //订阅流速度
            updateSSSCurve(times) {
                const self = this;
                const lineSSSChart = self.$refs.SSSChart;
                lineSSSChart.removeSeries();
                self.SSSData.data = [];
                self.SSSTemplate.xAxis.categories = [];
                const length = self.SSSBuckets.length;
                self.SSSTemplate.xAxis.tickInterval = commonfunc.getInterval(length);
                for (const value of self.SSSBuckets) {
                    self.SSSTemplate.xAxis.categories.push(value._id); //时间轴坐标
                    self.SSSData.data.push(value.speed / times);
                }
                self.SSSData.data.pop(); //去掉最后一个元素
                self.SSSData.name = `订阅流速度`;
                let sum = 0;
                for (const value of self.SSSData.data) {
                    sum += value;
                }
                const average = sum / self.SSSData.data.length;
                let yAxisTitle = '';
                const sizes = ['bps', 'Kbps', 'Mbps', 'Gbps'];
                let yAxis = 0;
                if (average < 1024) {
                    yAxisTitle = sizes[0];
                    yAxis = 1 / 8;
                } else if (average < (1024 * 1024)) {
                    yAxisTitle = sizes[1];
                    yAxis = 1024 / 8;
                } else if (average < (1024 * 1024 * 1024)) {
                    yAxisTitle = sizes[2];
                    yAxis = 1024 * 1024 / 8;
                } else if (average < (1024 * 1024 * 1024 * 1024)) {
                    yAxisTitle = sizes[3];
                    yAxis = 1024 * 1024 * 1024 / 8;
                } else {
                    yAxisTitle = sizes[0];
                    yAxis = 1 / 8;
                }
                for (let i = 0; i < self.SSSData.data.length; i++) {
                    self.SSSData.data[i] = Math.floor(self.SSSData.data[i] / yAxis);
                }
                self.SSSTemplate.yAxis.title.text = yAxisTitle;
                lineSSSChart.mergeOption(self.SSSTemplate);
                lineSSSChart.addSeries(self.SSSData);
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
                this.getAllData(Math.floor(beginTime / 1000), Math.floor(endTime / 1000));
            },
            getAllData(startTimestamp, endTimestamp) {
                this.getPublishStreamCount(startTimestamp, endTimestamp);
                this.getSubscribeStreamCount(startTimestamp, endTimestamp);
                this.getPublishStreamFlow(startTimestamp, endTimestamp);
                this.getSubscribeStreamFlow(startTimestamp, endTimestamp);
                this.getPublishStreamSpeed(startTimestamp, endTimestamp);
                this.getSubscribeStreamSpeed(startTimestamp, endTimestamp);
            },
            async getPublishStreamCount(startDate, endDate) {
                const self = this;
                const appID = self.appID === '' ? 0 : self.appID;
                const roomID = self.roomID === '' ? 0 : self.roomID;
                try {
                    const res = await logapi.getPublishStreamCount(appID, roomID, startDate, endDate);
                    if (res.status === "OK") {
                        self.PSCBuckets = res.result;
                        self.updatePSCCurve();
                    }
                    if (res.status === 'ERROR') {
                        if (res.error.status === 404)
                            return;
                        commonfunc.doError(self, res.error);
                    }
                } catch (errors) {
                    self.$message.error(errors.message);
                }
            },
            async getSubscribeStreamCount(startDate, endDate) {
                const self = this;
                const appID = self.appID === '' ? 0 : self.appID;
                const roomID = self.roomID === '' ? 0 : self.roomID;
                try {
                    const res = await logapi.getSubscribeStreamCount(appID, roomID, startDate, endDate);
                    if (res.status === "OK") {
                        self.SSCBuckets = res.result;
                        self.updateSSCCurve();
                    }
                    if (res.status === 'ERROR') {
                        if (res.error.status === 404)
                            return;
                        commonfunc.doError(self, res.error);
                    }
                } catch (errors) {
                    self.$message.error(errors.message);
                }
            },
            async getPublishStreamFlow(startDate, endDate) {
                const self = this;
                const appID = self.appID === '' ? 0 : self.appID;
                const roomID = self.roomID === '' ? 0 : self.roomID;
                try {
                    const res = await logapi.getPublishStreamFlow(appID, roomID, startDate, endDate);
                    if (res.status === "OK") {
                        self.PSFBuckets = res.result;
                        self.updatePSFCurve();
                    }
                    if (res.status === 'ERROR') {
                        if (res.error.status === 404)
                            return;
                        commonfunc.doError(self, res.error);
                    }
                } catch (errors) {
                    self.$message.error(errors.message);
                }
            },
            async getSubscribeStreamFlow(startDate, endDate) {
                const self = this;
                const appID = self.appID === '' ? 0 : self.appID;
                const roomID = self.roomID === '' ? 0 : self.roomID;
                try {
                    const res = await logapi.getSubscribeStreamFlow(appID, roomID, startDate, endDate);
                    if (res.status === "OK") {
                        self.SSFBuckets = res.result;
                        self.updateSSFCurve();
                    }
                    if (res.status === 'ERROR') {
                        if (res.error.status === 404)
                            return;
                        commonfunc.doError(self, res.error);
                    }
                } catch (errors) {
                    self.$message.error(errors.message);
                }
            },
            async getPublishStreamSpeed(startDate, endDate) {
                const self = this;
                const appID = self.appID === '' ? 0 : self.appID;
                const roomID = self.roomID === '' ? 0 : self.roomID;
                try {
                    const res = await logapi.getPublishStreamSpeed(appID, roomID, startDate, endDate);
                    if (res.status === "OK") {
                        self.PSSBuckets = res.result;
                        const times = commonfunc.getTimes(endDate, startDate); //采集次数
                        self.updatePSSCurve(times);
                    }
                    if (res.status === 'ERROR') {
                        if (res.error.status === 404)
                            return;
                        commonfunc.doError(self, res.error);
                    }
                } catch (errors) {
                    self.$message.error(errors.message);
                }
            },
            async getSubscribeStreamSpeed(startDate, endDate) {
                const self = this;
                const appID = self.appID === '' ? 0 : self.appID;
                const roomID = self.roomID === '' ? 0 : self.roomID;
                try {
                    const res = await logapi.getSubscribeStreamSpeed(appID, roomID, startDate, endDate);
                    if (res.status === "OK") {
                        self.SSSBuckets = res.result;
                        const times = commonfunc.getTimes(endDate, startDate); //采集次数
                        self.updateSSSCurve(times);
                    }
                    if (res.status === 'ERROR') {
                        if (res.error.status === 404)
                            return;
                        commonfunc.doError(self, res.error);
                    }
                } catch (errors) {
                    self.$message.error(errors.message);
                }
            },
            formatLogDate(row, column) {
                return commonfunc.secToDate(row.logDate);
            },
            timeSelectChange(time) {
                if (time === 'other') {
                    return;
                }
                let startTimestamp;
                let endTimestamp;
                switch (time) {
                    case 'min':
                        {
                            startTimestamp = Math.floor(new Date().valueOf() / 1000 - 60 * 15);
                            endTimestamp = Math.floor(new Date().valueOf() / 1000)
                        }
                        break;
                    case 'hour':
                        {
                            startTimestamp = Math.floor(new Date().valueOf() / 1000 - 60 * 60);
                            endTimestamp = Math.floor(new Date().valueOf() / 1000);
                        }
                        break;
                    case 'day':
                        {
                            startTimestamp = Math.floor(new Date().valueOf() / 1000 - 60 * 60 * 24);
                            endTimestamp = Math.floor(new Date().valueOf() / 1000);
                        }
                        break;
                    case 'week':
                        {
                            startTimestamp = Math.floor(new Date().valueOf() / 1000 - 60 * 60 * 24 * 7);
                            endTimestamp = Math.floor(new Date().valueOf() / 1000);
                        }
                        break;
                    case 'month':
                        {
                            startTimestamp = Math.floor(new Date().valueOf() / 1000 - 60 * 60 * 24 * 30);
                            endTimestamp = Math.floor(new Date().valueOf() / 1000);
                        }
                        break;
                };
                this.getAllData(startTimestamp, endTimestamp);
            },
            async getAppOptions() {
                const self = this;
                try {
                    const from = 0;
                    const count = 10000 * 5;
                    const res = await api.getAppList(from, count);
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
                    this.timeSelectChange(this.timeValue);
                } catch (errors) {
                    self.$message.error(errors.message);
                }
            },
            async getRoomOptions(appID) {
                const self = this;
                try {
                    const from = 0;
                    const count = 10000 * 5;
                    const res = await api.getRoomList(appID, from, count);
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
            this.getAppOptions();
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