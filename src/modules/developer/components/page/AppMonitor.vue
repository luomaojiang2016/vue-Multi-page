<template>
    <div>
        <el-row>
            <el-col :span="1" >
                <el-button type="primary" style="float:left" size="mini" icon="el-icon-refresh" @click="submitRefresh">{{$t("appMonitor.buttonRefresh")}}</el-button>
            </el-col>
        </el-row>
        <el-table :data="PinsDataTable" style="width: 100%" @row-click="handleCurrentRow" size="medium" v-loading="loading">
            <el-table-column prop="pinID" width="80px" :label="$t('appMonitor.labelPinId')"></el-table-column>
            <!-- <el-table-column prop="pinType" :label="$t('appMonitor.labelPinType')" :formatter="formatPin" width="180px"></el-table-column>  -->
            <el-table-column :label="$t('appMonitor.labelPinType')" width="80px">
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
            <el-table-column prop="appName" :label="$t('appMonitor.labelAppName')"></el-table-column>
            <el-table-column prop="roomName" :label="$t('appMonitor.labelRoomName')"></el-table-column>
            <el-table-column prop="publisherName" :formatter="formatPublisher"  :label="$t('appMonitor.labelPublisher')"></el-table-column>
            <el-table-column prop="subscriberName" :formatter="formatSubscriber"  :label="$t('appMonitor.labelSubscribe')"></el-table-column>
            <el-table-column prop="streamType" :label="$t('appMonitor.labelStreamType')" width="110px"></el-table-column>
            <el-table-column prop="streamName" :label="$t('appMonitor.labelStreamName')" width="250px"></el-table-column>
        </el-table>
        <div style="margin: 10px;"></div>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" background layout="prev, pager, next" :total="total">
            </el-pagination>
        </div>
        <el-dialog top='10vh' :title="$t('appMonitor.labelStreamInfo')" :visible.sync="dialogFormVisible" width="50%" :before-close="handleCancel">
            <el-table size="mini" :data="OnePinStatsTable" width="90%" border>
                <el-table-column prop="title" :label="$t('appMonitor.labelStreamAttribute')" width="180px"></el-table-column>
                <el-table-column prop="value" :label="$t('appMonitor.labelStreamValue')"></el-table-column>
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
                total: 0, //总数
                currentPage: 1, //当前页
                pageSizes: this.pageSizes,
                pageSize: this.pageSizes[0],
                searchString: '',
                inputSearchString: '',
                dialogFormVisible: false,
                currentPinID: '',
                loading:true
            };
        },
        watch: {
            '$route' (to, from) {
                const self = this;
                self.appID = self.$route.query.appID;
                self.getPinsData();
            }
        },
        methods: {
            formatPin(row, column) {
                const pin = row.pinType;
                if (pin === 'UserInputPin') {
                    return this.$t('appMonitor.formatPin[0]');
                } else if (pin === 'UserOutputPin') {
                    return this.$t('appMonitor.formatPin[1]');
                } else if (pin === 'ServerInputPin') {
                    return this.$t('appMonitor.formatPin[2]');
                } else if (pin === 'ServerOutputPin') {
                    return this.$t('appMonitor.formatPin[3]');
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
                //
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
                self.currentPage=1;
                self.getPinsData();
            },
            submitSeach() {
                const self = this;
                self.searchString = self.inputSearchString;
                self.getPinsData();
            },
            async getPinsData() {
                const self = this;
                try {
                    
                    const res = await api.getPinCount(0,self.appID,0);
           
                    if (res.status === 'OK') {
                        self.total = res.result;
                    }
                    if (res.status === 'ERROR') {
                        commonfunc.doError(self, res.error);
                        return;
                    }
                    const from = (self.currentPage - 1) * self.pageSize;
                  
                    const reslist = await api.getPinList(0,self.appID,0, from, self.pageSize);
                    if (reslist.status === 'OK') {
                        self.PinsDataTable = reslist.result;
                        self.loading=false;
                        console.log(self.PinsDataTable)
                        /* console.log('sleep(3000)');
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
                    const res = await api.getPinMediaInfo(0, self.currentPinID);
                    console.log(res)
                    if (res.status === 'OK') {
                        self.OnePinStatsTable = [];
                        let Stats = res.result;
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
                            }
                            self.OnePinStatsTable = self.OnePinStatsTable.filter((element, index, array) => {
                                return ((element.title !== "__module__") &&
                                    (element.title !== "associateStatsId") &&
                                    (element.title !== "codecId") &&
                                    (element.title !== "mediaTrackId") &&
                                    (element.title !== "transportId") &&
                                    (element.title !== "type") &&
                                    (element.title !== "id") &&
                                    (element.title !== "isRemote") &&
                                    (element.title !== "remb") &&
                                    (element.title !== "isRemote"));
                            });
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
            }
        },
        async created() {
            const self = this;
            self.appID = self.$route.query.appID;
            await api.statPins(0,self.appID, 0, 0);
            await commonfunc.sleep(2000);
            self.getPinsData();
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
