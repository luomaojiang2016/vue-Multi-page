<template>
    <div>
        <div class="button">
            <el-button type="primary" size="mini" @click="onCreateRoom" icon="el-icon-plus">{{$t("roomManage.buttonCreateRoom")}}</el-button>
        </div>
        <div style="margin: 10px;"></div>
        <el-table :data="roomsTable" style="width: 100%" size="medium">
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
                    </el-form>
                </div>
            </el-table-column>
            <el-table-column :label="$t('roomManage.labelRoomId')" prop="roomID"></el-table-column>
            <el-table-column :label="$t('roomManage.labelRoomName')" prop="roomName"></el-table-column>
            <el-table-column :label="$t('roomManage.labelOnlineNumber')" prop="joinUserCount"></el-table-column>
            <el-table-column :label="$t('roomManage.labelRoomDesc')" prop="roomDesc"></el-table-column>
            <el-table-column :label="$t('roomManage.labelCreateDate')" prop="createDate"></el-table-column>
            <el-table-column :label="$t('roomManage.labelOperte')" width="250px">
                <div slot-scope="scope">
                    <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleModify(scope.row)">{{$t("roomManage.buttonModify")}}</el-button>
                    <el-button size="mini" type="primary" icon="el-icon-delete" @click="handleDelete(scope.row)">{{$t("roomManage.buttonDelete")}}</el-button>
                </div>
            </el-table-column>
        </el-table>
        <div style="margin: 10px;"></div>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" background layout="prev, pager, next" :total="total">
            </el-pagination>
        </div>
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="35%" :before-close="handleCreateCancel">
            <el-form ref="form" :model="form" :rules="rules" :label-position="labelPosition" label-width="25%">
                <el-form-item :label="$t('roomManage.dialogLabeltheApp')">
                    <el-select v-model="form.appID" :disabled="cmd" :placeholder="$t('roomManage.dialogLabelSelectApp')">
                        <el-option v-for="item in appsTable" :key="item.appID" :label="item.appName" :value="item.appID">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('roomManage.dialogLabelRoomName')" prop="roomName">
                    <el-input v-model="form.roomName" size="mini"></el-input>
                </el-form-item>
                <el-form-item :label="$t('roomManage.dialogLabelDesc')">
                    <el-input type="textarea" resize="none" size="mini" v-model="form.roomDesc"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" @click="handleCreateSubmit('form')">{{$t("roomManage.buttonConfirm")}}</el-button>
                <el-button size="mini" @click="handleCreateCancel">{{$t("roomManage.buttonCancel")}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import api from "../../api/api.js";
    import commonfunc from "../../../../utils/commonfunc.js";
    import md5 from "md5";
    export default {
        data() {
            return {
                rules: {
                    appID: [{
                        required: true,
                        message: this.$t('roomManage.msgValidateSelectApp'),
                        trigger: 'blur'
                    }],
                    roomName: [{
                        required: true,
                        message: this.$t('roomManage.msgValidateInputRoom'),
                        trigger: 'blur'
                    }],
                },
                form: {
                    appID: "",
                    roomName: "",
                    roomDesc: ""
                },
                total: 0, //总数
                currentPage: 1, //当前页
                pageSizes: this.pageSizes,
                //每页数
                pageSize: this.pageSizes[0],
                roomsTable: [],
                appsTable: [],
                dialogFormVisible: false,
                dialogTitle: '',
                //值为1增加，值为2修改
                commond: '',
                labelPosition: 'right',
                cmd:false,
                sortType: "roomID",
                isDesc: 0
            };
        },
        methods: {
            handleSizeChange(val) {
                let self = this;
                if (self.pageSize !== val) {
                    self.pageSize = val;
                    self.getRoomList();
                }
                //
            },
            //翻页
            handleCurrentChange(val) {
                let self = this;
                if (self.currentPage !== val) {
                    self.currentPage = val;
                    self.getRoomList();
                }
            },
            async getAppList() {
                const self = this;
                const from = (self.currentPage - 1) * self.pageSize;
                try {
                    const res = await api.getAppList(from, this.pageSize, this.sortType, this.isDesc);
                    self.appsTable = res.result;
                    const length = self.appsTable.length;
                    if (length > 0) {
                        for (var i = 0; i < length; i++) {
                            self.appsTable[i].appID = self.appsTable[i].appID.toString();
                        }
                    }
                    if (res.status === 'ERROR') {
                        commonfunc.doError(self, res.error);
                    }
                } catch (errors) {
                    self.$message.error(errors.message);
                }
            },
            async getRoomList() {
                const self = this;
                const from = (self.currentPage - 1) * self.pageSize;
                try {
                    const res = await api.getRoomList(0,from, self.pageSize);
                    if (res.status === 'OK') {
                        self.roomsTable = res.result;
                        if (self.roomsTable.length > 0) {
                            for (var i = 0; i < self.roomsTable.length; i++) {
                                self.roomsTable[i].createDate = self.formatDate(self.roomsTable[i].createDate);
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
            async getRoomData() {
                const self = this;
                try {
                    const res = await api.getRoomCount(0);
                    if (res.status === 'OK') {
                        self.total = res.result;
                        self.getRoomList();
                    }
                    if (res.status === 'ERROR') {
                        commonfunc.doError(self, res.error);
                    }
                } catch (errors) {
                    self.$message.error(errors.message);
                }
            },
            onCreateRoom() {
                const self = this;
                self.form.roomName = "";
                self.form.roomDesc = "";
                self.dialogTitle = this.$t('roomManage.msgDialogCreateTitle');
                self.commond = 'create';
                self.form.appID = '';
                self.dialogFormVisible = true;
                self.cmd=false;
            },
            handleModify(row) {
                const self = this;
                self.form.roomName = row.roomName;
                self.form.roomDesc = row.roomDesc;
                self.dialogTitle = this.$t('roomManage.msgDialogModifyTitle');
                self.commond = 'modify';
                self.form.roomID = row.roomID;
                self.form.appID = row.appID.toString();
                self.dialogFormVisible = true;
                self.cmd=true;
            },
            async handleDelete(row) {
                const self = this;
                await self.$confirm(this.$t('roomManage.msgConfirmDeleteRoom'), this.$t('roomManage.msgConfirmTitle'), {
                    confirmButtonText: this.$t('roomManage.buttonConfirm'),
                    cancelButtonText: this.$t('roomManage.buttonCancel'),
                    type: 'warning'
                });
                try {
                    const res = await api.deleteRoom(row.roomID);
                    if (res.status === 'OK') {
                        self.getRoomData();
                    }
                    if (res.status === 'ERROR') {
                        commonfunc.doError(self, res.error);
                    }
                } catch (errors) {
                    if (errors !== 'cancel')
                        self.$message.error(errors.message);
                }
            },
            formatDate(date) {
                return commonfunc.secToDate(date);
            },
            onBack() {
                this.$router.go(-1);
            },
            handleCreateCancel() {
                this.dialogFormVisible = false;
            },
            //创建项目
            handleCreateSubmit(form) {
                const self = this;
                self.$refs[form].validate((valid) => {
                    if (valid) {
                        self.onSubmin();
                    } else {
                        return false;
                    }
                });
            },
            async onSubmin() {
                const self = this;
                if (self.commond == 'create') {
                    if (self.form.roomID !== undefined)
                        delete self.form.roomID;
                    try {
                        const res = await api.createRoom(self.form);
                        if (res.status === 'OK') {
                            self.$refs['form'].resetFields();
                            self.getRoomData();
                        }
                        if (res.status === 'ERROR') {
                            commonfunc.doError(self, res.error);
                        }
                    } catch (errors) {
                        self.$message.error(errors.message);
                    }
                }
                if (self.commond == 'modify') {
                    try {
                        const res = await api.modifyRoom(self.form);
                        if (res.status === 'OK') {
                            self.$refs['form'].resetFields();
                            self.getRoomData();
                        }
                        if (res.status === 'ERROR') {
                            commonfunc.doError(self, res.error);
                        }
                    } catch (errors) {
                        self.$message.error(errors.message);
                    }
                }
                this.dialogFormVisible = false;
            }
        },
        created() {
            let self = this;
            self.getRoomData();
            self.getAppList();
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
        width: 130px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>