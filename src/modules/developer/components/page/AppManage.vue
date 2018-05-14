<template>
    <div>
        <div>
            <el-button type="primary" size="mini" float="right" @click="onAddApp" icon="el-icon-plus">{{$t("appManage.buttonCreateApp")}}</el-button>
        </div>
        <div style="margin: 10px;"></div>
        <el-table :data="appsTable" style="width: 100%" size="medium">
            <el-table-column type="expand">
                <div slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item :label="$t('appManage.labelAppId')">
                            <span>{{ props.row.appID }}</span>
                        </el-form-item>
                           <el-form-item :label="$t('appManage.labelAppName')">
                            <span>{{ props.row.appName }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('appManage.labelAccountId')">
                            <span>{{ props.row.accountID }}</span>
                        </el-form-item>
                                  <el-form-item :label="$t('appManage.labelAccontName')">
                            <span>{{ props.row.accountName }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('appManage.labelOnlineNumber')">
                            <span>{{ props.row.joinUserCount }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('appManage.labelAppSecret')">
                            <span>{{ props.row.appSecret }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('appManage.labelAppDesc')">
                            <span>{{ props.row.appDesc }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('appManage.labelCreateDate')">
                            <span>{{ props.row.createDate }}</span>
                        </el-form-item>
                    </el-form>
                </div>
            </el-table-column>
            <el-table-column :label="$t('appManage.labelAppId')"  prop="appID">
                </el-table-column>
            <el-table-column :label="$t('appManage.labelAppName')" prop="appName">
            </el-table-column>
                <el-table-column :label="$t('appManage.labelAppSecret')" prop="appSecret" width="160px" >
            </el-table-column>
            <el-table-column :label="$t('appManage.labelOnlineNumber')" prop="joinUserCount" >
            </el-table-column>
            <el-table-column :label="$t('appManage.labelCreateDate')" width="150px" prop="createDate">
            </el-table-column>
            <!--F
                                                                                    <el-table-column prop="createDate" :formatter="formatDateTime" label="创建日期" width="160">
                                                                                    </el-table-column>  -->
            <el-table-column  :label="$t('appManage.labelOperte')" width="400px">
                <div slot-scope="scope">
                    <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleModify(scope.row)">{{$t("appManage.buttonModify")}}</el-button>
                    <el-button type="primary" size="mini" icon="el-icon-delete" @click="handleDelete(scope.row)">{{$t("appManage.buttonDelete")}}</el-button>
                    <el-button type="primary" size="mini" icon="el-icon-refresh" @click="handleResetSecret(scope.row)">{{$t("appManage.buttonRessetSerect")}}</el-button>
                    <el-button type="primary" size="mini" icon="el-icon-download" @click="handleOut(scope.row)">{{$t("appManage.buttonExport")}}</el-button>
                </div>
            </el-table-column>
        </el-table>
        <div style="margin: 10px;"></div>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" background layout="prev, pager, next" :total="total">
            </el-pagination>
        </div>
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="35%" :before-close="handleCreateCancel">
            <el-form ref="form" :model="form" :rules="rules" label-width="25%">
                <el-form-item :label="$t('appManage.dialogLabelAppName')" prop="appName">
                    <el-input v-model="form.appName" size="mini"></el-input>
                </el-form-item>
                <el-form-item :label="$t('appManage.dialogLabelDesc')">
                    <el-input type="textarea" :rows="3" v-model="form.appDesc" size="mini"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleCreateSubmit('form')" size="mini">{{$t("appManage.dialogButtonConfirm")}}</el-button>
                <el-button @click="handleCreateCancel" size="mini">{{$t("appManage.dialogButtonCancel")}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import api from '../../api/api.js'
    import commonfunc from "../../../../utils/commonfunc.js";
    import {
        mapGetters,
        mapActions,
        mapMutations,
        mapState
    } from 'vuex';
    export default {
        data() {
            return {
                rules: {
                    appName: [{
                        required: true,
                        message: this.$t('appManage.msgValidateAppName'),
                        trigger: 'blur'
                    }]
                },
                form: {
                    appName: '',
                    appDesc: ''
                },
                total: 0,
                //总数
                currentPage: 1,
                //当前页
                pageSizes: this.pageSizes,
                //每页数
                pageSize: this.pageSizes[0],
                //每页条数
                appsTable: [],
                //app列表
                dialogFormVisible: false,
                dialogTitle: '',
                //值为1增加，值为2修改
                commond: '',
                sortType: 'appID',
                isDesc: 0
            }
        },
        computed: {},
        methods: {
            ...mapActions([
                'actionAppList'
            ]),
            //每页条数修改
            handleSizeChange(val) {
                let self = this;
                if (self.pageSize !== val) {
                    //alert(val)
                    self.pageSize = val;
                    self.getAppList();
                }
                // 
            },
            //翻页
            handleCurrentChange(val) {
                let self = this;
                if (self.currentPage !== val) {
                    //alert(val)
                    self.currentPage = val;
                    self.getAppList();
                }
            },
            async getAppList() {
                const self = this;
                const from = (self.currentPage - 1) * self.pageSize;
                try {
                    const res = await api.getAppList(from, this.pageSize, this.sortType, this.isDesc);
                    if (res.status === 'OK') {
                        self.appsTable = res.result;
                        if (self.appsTable.length > 0) {
                            for (var i = 0; i < self.appsTable.length; i++) {
                                self.appsTable[i].createDate = self.formatDate(self.appsTable[i].createDate);
                            }
                        }
                        self.actionAppList();
                    }
                    if (res.status === 'ERROR') {
                        commonfunc.doError(self, res.error);
                    }
                } catch (errors) {
                    self.$message.error(errors.message);
                }
            },
            //按分页获取app列表
            async getAppData() {
                const self = this;
                try {
                    const res = await api.getAppCount();
                    if (res.status === 'OK') {
                        self.total = res.result;
                        self.getAppList();
                    }
                    if (res.status === 'ERROR') {
                        commonfunc.doError(self, res.error);
                    }
                } catch (errors) {
                    self.$message.error(errors.message);
                }
            },
            //添加App
            onAddApp() {
                let self = this;
                self.dialogTitle = this.$t('appManage.msgDialogCreateTitle');
                self.form.appName = '';
                self.form.appDesc = '';
                self.form.appID = '';
                self.commond = 'create';
                self.dialogFormVisible = true;
            },
            async handleDelete(row) {
                const self = this;
                try {
                    const ok = await this.$confirm(this.$t('appManage.msgConfirmDeleteApp'), this.$t('appManage.msgConfirmTitle'), {
                        confirmButtonText: this.$t('appManage.buttonConfirm'),
                        cancelButtonText: this.$t('appManage.buttonCancel'),
                        type: 'warning'
                    })
                    const res = await api.deleteApp(row.appID);
                    if (res.status === 'OK') {
                        self.getAppData();
                    }
                    if (res.status === 'ERROR') {
                        commonfunc.doError(self, res.error);
                    }
                } catch (errors) {
                    if (errors !== 'cancel')
                        self.$message.error(errors.message);
                }
            },
            handleModify(row) {
                let self = this;
                self.dialogTitle = this.$t('appManage.msgDialogModifyTitle');
                self.form.appName = row.appName;
                self.form.appDesc = row.appDesc;
                self.form.appID = row.appID;
                self.commond = 'modify';
                self.dialogFormVisible = true;
            },
            formatDate(date) {
                return commonfunc.secToDate(date);
            },
            handleCreateCancel() {
                this.dialogFormVisible = false;
            },
            //创建修改项目
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
                    if (self.form.appID !== undefined)
                        delete self.form.appID;
                    try {
                        const res = await api.createApp(self.form);
                        if (res.status === 'OK') {
                            self.$refs['form'].resetFields();
                            self.getAppData();
                        }
                        if (res.status === 'ERROR') {
                            commonfunc.doError(self, res.error);
                        }
                    } catch (errors) {
                        self.$message.error(errors.message);
                    }
                    self.dialogFormVisible = false;
                };
                if (self.commond == 'modify') {
                    try {
                        const res = await api.modifyApp(self.form);
                        if (res.status === 'OK') {
                            self.$refs['form'].resetFields();
                            self.getAppData();
                        }
                        if (res.status === 'ERROR') {
                            commonfunc.doError(self, res.error);
                        }
                    } catch (errors) {
                        self.$message.error(errors.message);
                    }
                    self.dialogFormVisible = false;
                }
            },
            //重置AppSerect
            async handleResetSecret(row) {
                const self = this;
                try {
                    const res = await api.resetAppSecret({
                        appID: row.appID
                    });
                    if (res.status === 'OK') {
                        self.getAppData();
                        self.$message(this.$t('appManage.msgResetSecret'));
                    }
                    if (res.status === 'ERROR') {
                        commonfunc.doError(self, res.error);
                    }
                } catch (errors) {
                    self.$message.error(errors.message);
                }
            },
            handleOut(row) {
                const outdata = `appID:${row.appID}        appSecret:${row.appSecret}`;
                this.dataToTxt(row.appName, outdata);
            },
            dataToTxt(name, outdata) {
                let content = new Blob([outdata])
                //生成url对象  
                let urlObject = window.URL || window.webkitURL || window
                let url = urlObject.createObjectURL(content)
                //生成<a></a>DOM元素  
                let el = document.createElement('a')
                //链接赋值  
                el.href = url
                el.download = name + ".txt"
                //必须点击否则不会下载  
                el.click()
                //移除链接释放资源        
                urlObject.revokeObjectURL(url)
            }
        },
        created() {
            let self = this;
            self.getAppData();
        }
    }
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