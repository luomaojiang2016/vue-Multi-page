<template>
    <div v-if="appServersTable!=''">
        <el-table :data="appServersTable" style="width: 100%" size="medium">
            <!--  <el-table-column type="expand">
                    
                    <div slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item :label="$t('appServer.labelAppServerID')">
                                <span>{{ props.row.appServerID }}</span>
                            </el-form-item>
                            <el-form-item :label="$t('appServer.labelServerProtocol')">
                                <span>{{ props.row.appServerProtocol }}</span>
                            </el-form-item>
                            <el-form-item :label="$t('appServer.labelServerHost')">
                                <span>{{ props.row.appServerHost }}</span>
                            </el-form-item>
                            <el-form-item :label="$t('appServer.labelServerPort')">
                                <span>{{ props.row.appServerPort }}</span>
                            </el-form-item>
                            <el-form-item :label="$t('appServer.labelMediaServerWsUri')">
                                <span>{{ props.row.mediaServerWsUri }}</span>
                            </el-form-item>
                            <el-form-item :label="$t('appServer.labelStartDate')">
                                <span>{{ props.row.startDate }}</span>
                            </el-form-item>
                        </el-form>
                    </div> 
                </el-table-column>-->
            <el-table-column :label="$t('appServer.labelAppServerID')" prop="appServerID"></el-table-column>
            <el-table-column :label="$t('appServer.labelServerUrl')" prop="appServerUrl"></el-table-column>
            <el-table-column :label="$t('appServer.labelMediaServerWsUri')" prop="mediaServerWsUri"> </el-table-column>
            <el-table-column label="状态" prop="runtitle"> </el-table-column>
            <el-table-column :label="$t('appServer.labelStartDate')" prop="startDate"> </el-table-column>
            <el-table-column fixed="right" :label="$t('appServer.labelAppServerOperate')" width="200">
                <div slot-scope="scope">
                    <el-button type="primary" size="mini" icon="el-icon-delete" @click="deleteServer(scope.row)" :disabled="scope.row.running">{{ "删除" }}</el-button>
                    <el-button type="primary" size="mini" icon="el-icon-view" @click="handleDetail(scope.row)">{{ $t('appServer.buttonDetial') }}</el-button>
                </div>
            </el-table-column>
        </el-table>
        <div style="margin: 10px;"></div>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" background layout="prev, pager, next" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import api from "../../api/api.js";
    import commonfunc from "../../../../utils/commonfunc.js";
    export default {
        data() {
            return {
                total: 0, //总数
                currentPage: 1, //当前页
                pageSizes: this.pageSizes,
                pageSize: this.pageSizes[0],
                appServersTable: [],
                sortType: 'appServerID',
                isDesc: 0
            };
        },
        methods: {
            handleSizeChange(val) {
                const self = this;
                if (self.pageSize !== val) {
                    self.pageSize = val;
                    self.getAppServerList();
                }
                //
            },
            //翻页
            handleCurrentChange(val) {
                const self = this;
                if (self.currentPage !== val) {
                    self.currentPage = val;
                    self.getAppServerList();
                }
            },
            
        async deleteServer(row){
               const self = this;
                try {
                    const res = await api.deleteAppServer(row.appServerID);
                    if (res.status === 'OK') {
                        self.getAppServerList();
                    }
                    if (res.status === 'ERROR') {
                        commonfunc.doError(self, res.error);
                    }
                } catch (errors) {
                    self.$message.error(errors.message);
                }
            },
            handleDetail(row) {
                this.$router.push({
                    path: '/mediaservermonitor',
                    query: {
                        appServerID: row.appServerID,
                    }
                });
            },
            async getAppServerList() {
                const self = this;
                const from = (self.currentPage - 1) * self.pageSize;
                try {
                    const res = await api.getAppServerList(from, this.pageSize, this.sortType, this.isDesc);
                    if (res.status === 'OK') {
                        self.appServersTable = res.result;
                        if (self.appServersTable.length > 0) {
                            for (var i = 0; i < self.appServersTable.length; i++) {

                                self.appServersTable[i].startDate = self.formatDate(self.appServersTable[i].startDate);
                                if (self.appServersTable[i].running === 1) {
                                    self.appServersTable[i].running=true;
                                    self.appServersTable[i].runtitle = '运行中';
                                } else {
                                    self.appServersTable[i].running=false;
                                    self.appServersTable[i].runtitle = '已停止';
                                }
                               
                                
                            }
                        }
                    }
                    if (res.status === 'ERROR') {
                        commonfunc.doError(self, res.error);
                    }
                } catch (errors) {
                    self.$message.error(errors.message);
                }
            },
            //按分页获取app列表
            async getAppServerData() {
                const self = this;
                try {
                    const res = await api.getAppServerCount();
                    if (res.status === 'OK') {
                        self.total = res.result;
                        self.getAppServerList();
                    }
                    if (res.status === 'ERROR') {
                        commonfunc.doError(self, res.error);
                    }
                } catch (errors) {
                    self.$message.error(errors.message);
                }
            },
            formatDate(date) {
                return commonfunc.secToDate(date);
            }
        },
        created() {
            const self = this;
            self.getAppServerData();
        }
    };
</script>

<style>
    .button {
        text-align: left;
    }
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 140px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>