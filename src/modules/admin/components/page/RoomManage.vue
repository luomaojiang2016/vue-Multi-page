<template>
    <div v-if="roomsTable!=''">
        <el-table :data="roomsTable" style="width: 100%" size="medium">
            <el-table-column :label="$t('roomManage.labelRoomId')" prop="roomID"></el-table-column>
            <el-table-column :label="$t('roomManage.labelRoomName')" prop="roomName"></el-table-column>
            <el-table-column :label="$t('roomManage.labelOnlineNumber')" prop="joinUserCount"></el-table-column>
            <el-table-column :label="$t('roomManage.labelRoomDesc')" prop="roomDesc"></el-table-column>
            <el-table-column :label="$t('roomManage.labelCreateDate')" prop="createDate"></el-table-column>
            <el-table-column type="expand">
                <div slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item :label="$t('roomManage.labelRoomId')">
                            <span>{{ props.row.roomID }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('roomManage.labelRoomName')">
                            <span>{{ props.row.roomName }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('roomManage.labelAccountID')">
                            <span>{{ props.row.accountID }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('roomManage.labelAccountName')">
                            <span>{{ props.row.accountName }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('roomManage.labelAppId')">
                            <span>{{ props.row.appID }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('roomManage.labelAppName')">
                            <span>{{ props.row.appName }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('roomManage.labelRoomId')">
                            <span>{{ props.row.joinUserCount }}</span>
                        </el-form-item>
                    </el-form>
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
                total: 0,
                currentPage: 1,
                pageSizes: this.pageSizes,
                pageSize: this.pageSizes[0],
                roomsTable: "",
                sortType: 'roomID',
                isDesc: 0
            };
        },
        methods: {
            handleSizeChange(val) {
                const self = this;
                if (self.pageSize !== val) {
                    self.pageSize = val;
                    self.getRoomData();
                }
            },
            handleCurrentChange(val) {
                const self = this;
                if (self.currentPage !== val) {
                    self.currentPage = val;
                    self.getRoomData();
                }
            },
            async getRoomData() {
                const self = this;
                try {
                    const from = (self.currentPage - 1) * self.pageSize;
                    const results = await Promise.all([api.getRoomCount(0, 0), api.getRoomList(0, 0, this.sortType, this.isDesc, from, this.pageSize)]);
                    if (results[0].status === 'OK') {
                        self.total = results[0].result;
                    }
                    if (results[0].status === 'ERROR') {
                        commonfunc.doError(self, results[0].error);
                    }
                    if (results[1].status === 'ERROR') {
                        commonfunc.doError(self, results[1].error);
                    }
                    if (results[1].status === 'OK') {
                        self.roomsTable = results[1].result;
                        if (self.roomsTable.length > 0) {
                            for (var i = 0; i < self.roomsTable.length; i++) {
                                self.roomsTable[i].createDate = self.formatDate(self.roomsTable[i].createDate);
                            }
                        }
                    }
                } catch (errors) {
                    self.$message.error(errors.message);
                }
            },
            formatDate(date) {
                return commonfunc.secToDate(date);
            }
        },
        mounted() {
            const self = this;
            self.getRoomData();
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
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>