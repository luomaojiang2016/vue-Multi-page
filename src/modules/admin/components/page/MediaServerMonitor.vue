<template>
    <div>
        <el-row>
            <el-col :span="10">
                <el-input size="mini" v-model="mediaServerInfo" :disabled="true">
                </el-input>
            </el-col>
            <el-col :span="2" :offset="3">
                <el-button type="primary" style="float:left" size="mini" icon="el-icon-back" @click="submitBack">{{$t("msMonitor.buttonBack")}}</el-button>
            </el-col>
            <el-col :span="1" :offset="1">
                <el-button type="primary" style="float:left" size="mini" icon="el-icon-refresh" @click="submitRefresh">{{$t("msMonitor.buttonRefresh")}}</el-button>
            </el-col>
        </el-row>
        <el-table :data="PinsDataTable" style="width: 100%" @row-click="handleCurrentRow" size="medium" v-loading="loading">
            <el-table-column prop="pinID" width="80px" :label="$t('msMonitor.labelPinId')"></el-table-column>
            <!-- <el-table-column prop="pinType" :label="$t('msMonitor.labelPinType')" :formatter="formatPin" width="180px"></el-table-column>  -->
            <el-table-column :label="$t('msMonitor.labelPinType')" width="80px">
                <div slot-scope="scope">
                    <div v-if="scope.row.pinType == 'UserPublishPin'">
                        <img src="../../assets/userup.png">
                    </div>
                    <div v-else-if="scope.row.pinType == 'UserSubscribePin'">
                        <img src="../../assets/userdown.png">
                    </div>
                    <div v-else-if="scope.row.pinType == 'ServerPublishPin'">
                        <img src="../../assets/serverup.png">
                    </div>
                    <div v-else>
                        <img src="../../assets/serverdown.png">
                    </div>
                </div>
            </el-table-column>
            <el-table-column prop="appName" :label="$t('msMonitor.labelAppName')"></el-table-column>
            <el-table-column prop="roomName" :label="$t('msMonitor.labelRoomName')"></el-table-column>
            <el-table-column prop="publisherName" :formatter="formatPublisher" :label="$t('msMonitor.labelPublisher')"></el-table-column>
            <el-table-column prop="subscriberName" :formatter="formatSubscriber" :label="$t('msMonitor.labelSubscribe')"></el-table-column>
            <el-table-column prop="streamType" :label="$t('msMonitor.labelStreamType')" width="110px"></el-table-column>
            <el-table-column prop="streamName" :label="$t('msMonitor.labelStreamName')" width="250px"></el-table-column>
        </el-table>
        <div style="margin: 10px;"></div>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" background layout="prev, pager, next" :total="total">
            </el-pagination>
        </div>
        <el-dialog top='10vh' :title="$t('msMonitor.labelStreamInfo')" :visible.sync="dialogFormVisible" width="50%" :before-close="handleCancel">
            <el-table size="mini" :data="OnePinStatsTable" width="100%" border>
                <el-table-column prop="title" :label="$t('msMonitor.labelStreamAttribute')" width="180px"></el-table-column>
                <el-table-column prop="value" :label="$t('msMonitor.labelStreamValue')" width="200px"></el-table-column>
                <el-table-column prop="detial" label="说明"></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
    import api from "../../api/api.js";
    import commonfunc from "../../../../utils/commonfunc.js";
    export default {
        data() {
            return {
                PinsDataTable: [],
                OnePinStatsTable: [],
                OnePinStatsTable_Before: [],
                total: 0, //总数
                currentPage: 1, //当前页
                pageSizes: this.pageSizes,
                pageSize: this.pageSizes[0],
                searchString: '',
                inputSearchString: '',
                dialogFormVisible: false,
                currentPinID: '',
                loading: true,
                mediaServerInfo: ''
            };
        },
        watch: {
            '$route' (to, from) {
                const self = this;
                self.appServerID = self.$route.query.appServerID;
                self.getPinsData();
            }
        },
        methods: {
            formatPin(row, column) {
                const pin = row.pinType;
                if (pin === 'UserInputPin') {
                    return this.$t('msMonitor.formatPin[0]');
                } else if (pin === 'UserOutputPin') {
                    return this.$t('msMonitor.formatPin[1]');
                } else if (pin === 'ServerInputPin') {
                    return this.$t('msMonitor.formatPin[2]');
                } else if (pin === 'ServerOutputPin') {
                    return this.$t('msMonitor.formatPin[3]');
                }
            },
            formatPublisher(row, column) {
                if (row.publisherName) {
                    return `${row.publisherName}(${row.publisherIP})`;
                } else {
                    return '';
                }
            },
            formatSubscriber(row, column) {
                if (row.subscriberName) {
                    return `${row.subscriberName}(${row.subscriberIP})`;
                } else {
                    return ''
                }
            },
            handleCurrentRow(row) {
                const self = this;
                self.currentPinID = row.pinID;
                self.getOnePinStatsData();
                self.dialogFormVisible = true;
            },
            handleCancel() {
                const self = this;
                self.dialogFormVisible = false;
                self.getPinsData();
            },
            handleSizeChange(val) {
                const self = this;
                if (self.pageSize !== val) {
                    self.pageSize = val;
                    self.getPinsData();
                }
            },
            //翻页
            handleCurrentChange(val) {
                const self = this;
                if (self.currentPage !== val) {
                    self.currentPage = val;
                    self.getPinsData();
                }
            },
            submitRefresh() {
                const self = this;
                self.loading = true;
                self.start();
            },
            submitBack() {
                this.$router.go(-1);
            },
            async getPinsData() {
                const self = this;
                try {
                    const res = await api.getPinCount(self.appServerID, 0, 0, 0);
                    if (res.status === 'OK') {
                        self.total = res.result;
                    }
                    if (res.status === 'ERROR') {
                        commonfunc.doError(self, res.error);
                        return;
                    }
                    const from = (self.currentPage - 1) * self.pageSize;
                    const reslist = await api.getPinList(self.appServerID, 0, 0, 0, from, self.pageSize);
                    if (reslist.status === 'OK') {
                        self.PinsDataTable = reslist.result;
                        self.loading = false;
                        /*
                             if (!self.dialogFormVisible) {
                                 await commonfunc.sleep(3000);
                                 self.getPinsData();
                             }*/
                    }
                    if (reslist.status === 'ERROR') {
                        commonfunc.doError(self, reslist.error);
                        return;
                    }
                } catch (err) {
                    self.$message.error(err.message);
                }
            },
            async getOnePinStatsData() {
                const self = this;
                try {
                    const res = await api.getPinMediaInfo(self.appServerID, self.currentPinID);
                    if (res.status === 'OK') {
                        self.OnePinStatsTable = [];
                        let Stats = res.result;
                        //console.log(Stats);
                        if (Stats) {
                            for (var key in Stats.videoStats) {
                                if (Stats.videoStats[key].type === 'inboundrtp') {
                                    const obj = Stats.videoStats[key];
                                    if (obj.bytesReceived > 0) {
                                        for (var key1 in obj) {
                                            self.OnePinStatsTable.push({
                                                'title': key1,
                                                'value': obj[key1]
                                            });
                                        }
                                    }
                                }
                                if (Stats.videoStats[key].type === 'outboundrtp') {
                                    const obj = Stats.videoStats[key];
                                    if (obj.bytesSent > 0) {
                                        for (var key1 in obj) {
                                            self.OnePinStatsTable.push({
                                                'title': key1,
                                                'value': obj[key1]
                                            });
                                        }
                                    }
                                }
                                if (Stats.videoStats[key].type === 'endpoint') {
                                    const obj = Stats.videoStats[key];
                                    for (var key1 in obj) {
                                        if (key1 === "videoE2ELatency") {
                                            self.OnePinStatsTable.push({
                                                'title': key1,
                                                'value': obj[key1]
                                            });
                                        }
                                    }
                                }
                            }
                            for (var key in Stats.audioStats) {
                                if (Stats.audioStats[key].type === 'inboundrtp') {
                                    const obj = Stats.audioStats[key];
                                    if (obj.bytesReceived > 0) {
                                        for (var key1 in obj) {
                                            self.OnePinStatsTable.push({
                                                'title': key1,
                                                'value': obj[key1]
                                            });
                                        }
                                    }
                                }
                                if (Stats.audioStats[key].type === 'outboundrtp') {
                                    const obj = Stats.audioStats[key];
                                    if (obj.bytesSent > 0) {
                                        for (var key1 in obj) {
                                            self.OnePinStatsTable.push({
                                                'title': key1,
                                                'value': obj[key1]
                                            });
                                        }
                                    }
                                }
                                if (Stats.audioStats[key].type === 'endpoint') {
                                    const obj = Stats.audioStats[key];
                                    for (var key1 in obj) {
                                        if (key1 === "audioE2ELatency") {
                                            self.OnePinStatsTable.push({
                                                'title': key1,
                                                'value': obj[key1]
                                            });
                                        }
                                    }
                                }
                            }
                            self.OnePinStatsTable = self.OnePinStatsTable.filter((element, index, array) => {
                                return ((element.title !== "__module__") &&
                                    (element.title !== "associateStatsId") &&
                                    (element.title !== "codecId") &&
                                    (element.title !== "mediaTrackId") &&
                                    (element.title !== "transportId") &&
                                    (element.title !== "__type__") &&
                                    (element.title !== "id") &&
                                    (element.title !== "isRemote") &&
                                    (element.title !== "fractionLost") &&
                                    (element.title !== "isRemote"));
                            });
                            for (const value of self.OnePinStatsTable) {
                                if (value.title === 'bytesReceived') {
                                    for (const item of self.OnePinStatsTable_Before) {
                                        if (item.title === 'bytesReceived') {
                                            let speed = Math.floor((value.value - item.value) / 1024 * 8);
                                            if (speed < 0) {
                                                speed = 0;
                                            }
                                            self.OnePinStatsTable.push({
                                                "title": "bitsReceivedPerSecond",
                                                "value": `${speed} Kbps`,
                                                "detial": '实际接收速度'
                                            });
                                            break;
                                        }
                                    }
                                    break;
                                }
                                if (value.title === 'bytesSent') {
                                    for (const item of self.OnePinStatsTable_Before) {
                                        if (item.title === 'bytesSent') {
                                            let speed = Math.floor((value.value - item.value) / 1024 * 8);
                                            if (speed < 0) {
                                                speed = 0;
                                            }
                                            self.OnePinStatsTable.push({
                                                "title": "bitsSentPerSecond",
                                                "value": `${speed} Kbps`,
                                                "detial": '实际发送速度'
                                            });
                                            break;
                                        }
                                    }
                                    break;
                                }
                            }
                            self.addDetialPinStats();
                            self.OnePinStatsTable_Before = self.OnePinStatsTable.slice();
                        }
                        if (self.dialogFormVisible) {
                            await commonfunc.sleep(1000);
                            self.getOnePinStatsData();
                        }
                    }
                    if (res.status === 'ERROR') {
                        commonfunc.doError(self, res.error);
                        return;
                    }
                } catch (err) {
                    self.$message.error(err.message);
                }
            },
            addDetialPinStats() {
                const self = this;
                for (let i = 0; i < self.OnePinStatsTable.length; i++) {
                    if (self.OnePinStatsTable[i].title === 'ssrc') {
                        self.OnePinStatsTable[i].detial = '同步源（SSRC).'
                    } else if (self.OnePinStatsTable[i].title === 'firCount') {
                        self.OnePinStatsTable[i].detial = '发送方接收的完整内部请求（FIR）数据包的总数.';
                    } else if (self.OnePinStatsTable[i].title === 'pliCount') {
                        self.OnePinStatsTable[i].detial = '由发送方接收并由接收方发送的包丢失指示（PLI）包的总数.';
                    } else if (self.OnePinStatsTable[i].title === 'nackCount') {
                        self.OnePinStatsTable[i].detial = '由发送方接收并由接收方发送的否定确认（NACK）分组的总数.';
                    } else if (self.OnePinStatsTable[i].title === 'sliCount') {
                        self.OnePinStatsTable[i].detial = '发送方接收的分片丢失指示（SLI）分组的总数.';
                    } else if (self.OnePinStatsTable[i].title === 'remb') {
                        self.OnePinStatsTable[i].detial = '接收器估计最大比特率（REMB).';
                    } else if (self.OnePinStatsTable[i].title === 'packetsLost') {
                        self.OnePinStatsTable[i].detial = 'SSRC丢失的RTP数据包总数.';
                    } else if (self.OnePinStatsTable[i].title === 'packetsReceived') {
                        self.OnePinStatsTable[i].detial = 'SSRC接收的RTP数据包总数.';
                    } else if (self.OnePinStatsTable[i].title === 'bytesReceived') {
                        self.OnePinStatsTable[i].detial = 'SSRC接收的字节总数.';
                    } else if (self.OnePinStatsTable[i].title === 'jitter') {
                        self.OnePinStatsTable[i].detial = 'SSRC发送的RTP数据包总数.';
                    } else if (self.OnePinStatsTable[i].title === 'packetsSent') {
                        self.OnePinStatsTable[i].detial = 'SSRC发送的RTP数据包总数.';
                    } else if (self.OnePinStatsTable[i].title === 'bytesSent') {
                        self.OnePinStatsTable[i].detial = 'SSRC发送的字节总数.';
                    } else if (self.OnePinStatsTable[i].title === 'targetBitrate') {
                        self.OnePinStatsTable[i].detial = '当前配置SSRC的比特率目标，以比特每秒为单位.';
                    } else if (self.OnePinStatsTable[i].title === 'roundTripTime') {
                        self.OnePinStatsTable[i].detial = '基于RTCP时间戳的SSRC估计往返时间（秒）.';
                    } else if (self.OnePinStatsTable[i].title === 'audioE2ELatency') {
                        self.OnePinStatsTable[i].detial = '基于RTCP时间戳的SSRC估计往返时间（秒）.';
                    } else if (self.OnePinStatsTable[i].title === 'videoE2ELatency') {
                        self.OnePinStatsTable[i].detial = '以纳秒为单位测量的端到端视频延迟.';
                    } else if (self.OnePinStatsTable[i].title === 'timestamp') {
                        self.OnePinStatsTable[i].detial = '时间戳.';
                    } else if (self.OnePinStatsTable[i].title === 'type') {
                        self.OnePinStatsTable[i].detial = 'RTP类型';
                    }
                }
            },
            getStatsMap(Stats) {
                const self = this;
                for (var key in Stats.videoStats) {
                    if ((Stats.videoStats[key].type === 'inboundrtp') ||
                        (Stats.videoStats[key].type === 'outboundrtp')) {
                        return Stats.videoStats[key];
                    }
                }
                for (var key in Stats.audioStats) {
                    if ((Stats.audioStats[key].type === 'inboundrtp') ||
                        (Stats.audioStats[key].type === 'outboundrtp')) {
                        return Stats.audioStats[key];
                    }
                }
            },
            async start() {
                const self = this;
                self.appServerID = self.$route.query.appServerID;
                const res = await api.statPins(self.appServerID, 0, 0, 0);
                await commonfunc.sleep(3000);
                if (res.status === "OK") {
                    self.getPinsData();
                    self.getMediaserverInfo();
                }
            },
            async getMediaserverInfo() {
                const self = this;
                try {
                    const res = await api.getMediaserverInfo(self.appServerID);
                    if (res.status === 'OK') {
                        self.mediaServerInfo = `${res.result.info.type}:${res.result.info.version}    usedMemory:${Math.floor(res.result.usedMemoryKB/1024)} MB`;
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
            const self = this;
            self.start();
        }
    };
</script>

<style>
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    .button {
        text-align: left;
    }
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 110px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>


