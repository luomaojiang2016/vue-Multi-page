<template>
    <div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="Mysql" name="first">
                <el-form ref="formMysql" :model="formMysql" label-width="80px">
                    <el-form-item label="host">
                        <el-input :disabled="true" v-model="formMysql.host" style="width:30%" size='small'></el-input>
                    </el-form-item>
                    <el-form-item label="port">
                        <el-input :disabled="true" v-model="formMysql.port" style="width:30%" size='small'></el-input>
                    </el-form-item>
                    <el-form-item label="user">
                        <el-input :disabled="true" v-model="formMysql.user" style="width:30%" size='small'></el-input>
                    </el-form-item>
                    <el-form-item label="password">
                        <el-input :disabled="true" v-model="formMysql.password" style="width:30%" size='small'></el-input>
                    </el-form-item>
                    <el-form-item label="database">
                        <el-input :disabled="true" v-model="formMysql.database" style="width:30%" size='small'></el-input>
                    </el-form-item>
                    <el-form-item label="tablePrefix">
                        <el-input :disabled="true" v-model="formMysql.tablePrefix" style="width:30%" size='small'></el-input>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="Redis" name="second">
                <el-form ref="formRedis" :model="formRedis" label-width="80px">
                    <el-form-item label="host">
                        <el-input :disabled="true" v-model="formRedis.host" style="width:30%" size='small'></el-input>
                    </el-form-item>
                    <el-form-item label="port">
                        <el-input :disabled="true" v-model="formRedis.port" style="width:30%" size='small'></el-input>
                    </el-form-item>
                    <el-form-item label="password">
                        <el-input :disabled="true" v-model="formRedis.password" style="width:30%" size='small'></el-input>
                    </el-form-item>
                    <el-form-item label="keyPrefix">
                        <el-input :disabled="true" v-model="formRedis.keyPrefix" style="width:30%" size='small'></el-input>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="MongoDB" name="three">
                <el-form ref="formEs" :model="formEs" label-width="80px">
                    <el-form-item label="host">
                        <el-input :disabled="true" v-model="formEs.host" style="width:30%" size='small'></el-input>
                    </el-form-item>
                    <el-form-item label="port">
                        <el-input :disabled="true" v-model="formEs.port" style="width:30%" size='small'></el-input>
                    </el-form-item>
                    <el-form-item label="password">
                        <el-input :disabled="true" v-model="formEs.password" style="width:30%" size='small'></el-input>
                    </el-form-item>
                    <el-form-item label="keyPrefix">
                        <el-input :disabled="true" v-model="formEs.keyPrefix" style="width:30%" size='small'></el-input>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane :label="$t('serverManage.labelDocShareServer')" name="forth">
                <div>
                    <div>
                        <el-button type="primary" size="mini" float="right" @click="onAddMediaServer" icon="el-icon-plus">{{ $t("serverManage.labelDocShareServer") }}</el-button>
                    </div>
                    <div style="margin: 10px;"></div>
                    <el-table :data="serverTable" border style="width: 100%" align="left">
                        <!--   <el-table-column prop="serverID" label="ID" width="80">
                                        </el-table-column>-->
                        <el-table-column prop="serverName" label="Name" width="150">
                        </el-table-column>
                        <el-table-column prop="serverAddress" label="IP" width="150">
                        </el-table-column>
                        <el-table-column prop="serverPort" label="POPR" width="80">
                        </el-table-column>
                        <el-table-column prop="serverDesc" :label="$t('serverManage.labelServerDesc')">
                        </el-table-column>
                        <el-table-column fixed="right" :label="$t('serverManage.labelOperate')" width="250">
                            <div slot-scope="scope">
                                <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleModify(scope.row)">{{ $t("serverManage.buttonModify") }}</el-button>
                                <el-button type="primary" size="mini" icon="el-icon-delete" @click="handleDelete(scope.row)">{{ $t("serverManage.buttonDelete") }}</el-button>
                            </div>
                        </el-table-column>
                        <el-table-column fixed="right" :label="$t('serverManage.labelEnableDisable')" width="160">
                            <div slot-scope="scope" @change="switchChange(scope.row)">
                                <el-switch v-model="scope.row.enabled">
                                </el-switch>
                            </div>
                        </el-table-column>
                        <el-table-column fixed="right" :label="$t('serverManage.labelState')" width="80">
                            <div slot-scope="scope">
                                <div v-if="scope.row.state==-1">
                                    <img src="../../assets/disconn.jpg">
                                </div>
                                <div v-else-if="scope.row.state==0">
                                    <img src="../../assets/unuse.jpg">
                                </div>
                                <div v-else-if="scope.row.state==1">
                                    <img src="../../assets/conn.jpg">
                                </div>
                                <div v-else>
                                    <img src="../../assets/conn.jpg">
                                </div>
                            </div>
                        </el-table-column>
                    </el-table>
                    <div style="margin: 10px;"></div>
                    <div class="block">
                        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" background layout="prev, pager, next" :total="total">
                        </el-pagination>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="Email" name="five">
                <el-form ref="formEmail" :model="formEmail" label-width="80px">
                    <el-form-item label="from">
                        <el-input :disabled="emaliEnable" v-model="formEmail.from" style="width:30%" size='small'></el-input>
                    </el-form-item>
                    <el-form-item label="user">
                        <el-input :disabled="emaliEnable" v-model="formEmail.user" style="width:30%" size='small'></el-input>
                    </el-form-item>
                    <el-form-item label="password">
                        <el-input :disabled="emaliEnable" v-model="formEmail.password" style="width:30%" size='small'></el-input>
                    </el-form-item>
                    <el-form-item label="host">
                        <el-input :disabled="emaliEnable" v-model="formEmail.host" style="width:30%" size='small'></el-input>
                    </el-form-item>
                    <el-form-item label="port">
                        <el-input :disabled="emaliEnable" v-model="formEmail.port" style="width:30%" size='small'></el-input>
                    </el-form-item>
                </el-form>
                &nbsp&nbsp&nbsp&nbsp
                <el-button type="primary" @click="handleSetEmailData" size="small" class="el-icon-edit">{{emaliButton}}</el-button>
            </el-tab-pane>
            <el-tab-pane label="微信支付配置" name="six">
                <el-form ref="FormWeChatPay" :model="FormWeChatPay" label-width="160px">
                        <el-form-item label="微信号">
                            <el-input v-model="FormWeChatPay.appid" placeholder="appid" style="width:58%" size='small'></el-input>
                        </el-form-item>
                        <el-form-item label="微信支付商户号">
                            <el-input v-model="FormWeChatPay.mch_id" placeholder="mch_id" style="width:58%" size='small'></el-input>
                        </el-form-item>
                        <el-form-item label="API密钥">
                            <el-input v-model="FormWeChatPay.key" placeholder="key" style="width:58%" size='small'></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmitWeChatPay">保存</el-button>
                            <el-button>取消</el-button>
                        </el-form-item>
                    </el-form>
            </el-tab-pane>
            <el-tab-pane label="支付宝支付配置" name="seven">
                <el-form ref="FormAlipay" :model="FormAlipay" label-width="160px">
                        <el-form-item label="appID">
                            <el-input v-model="FormAlipay.app_id" placeholder="app_id" style="width:60%" size='small'></el-input>
                        </el-form-item>
                        
                        <el-form-item label="商户私钥">
                            <el-input type="textarea" v-model="FormAlipay.app_private_key" placeholder="app_private_key" style="width:60%" :autosize="{ minRows: 10, maxRows: 20}" size='medium '></el-input>
                        </el-form-item>
                        
                        <el-form-item label="支付宝公钥">
                            <el-input type="textarea" v-model="FormAlipay.alipay_public_key" placeholder="alipay_public_key" style="width:60%" :autosize="{ minRows: 10, maxRows: 20}" size='medium '></el-input>
                        </el-form-item>
                        
                        <el-form-item label="加密方式">
                            <el-radio-group v-model="FormAlipay.sign_type" size="medium">
                            <el-radio border label="RSA"></el-radio>
                            <el-radio border label="RSA2"></el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item label="支付宝网关">
                            <el-input v-model="FormAlipay.alipay_gateway" placeholder="alipay_gateway" style="width:60%" size='small'></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="onSubmitAlipay">保存</el-button>
                            <el-button>取消</el-button>
                        </el-form-item>
                    </el-form>
            </el-tab-pane>
            <el-tab-pane label="单价配置" name="eight">
                <el-form ref="VideoAudioPrice" :model="VideoAudioPrice" label-width="120px">
                        <el-form-item>
                            <el-input v-model="VideoAudioPrice.audioFen" style="width:30%" size='small'>
                                <template slot="prepend">音频:</template>
                                <template slot="append">元 / 分钟</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="VideoAudioPrice.videoFen" style="width:30%" size='small'>
                                <template slot="prepend">视频:</template>
                                <template slot="append">元 / 分钟</template>
                            </el-input>
                        </el-form-item>  
                        <el-form-item>
                            <el-button type="primary" @click="setDosageUnitPrice">保存</el-button>
                            <el-button>取消</el-button>
                        </el-form-item>
                    </el-form>
            </el-tab-pane>
            <el-tab-pane label="默认金钱配置" name="nine">
                <el-form ref="defGiveMoney" :model="defGiveMoney" label-width="120px">
                        <el-form-item>
                            <el-input v-model="defGiveMoney.moneyFen" style="width:33%" size='small'>
                                <template slot="prepend">新用户默认金钱配置:</template>
                            </el-input>
                        </el-form-item> 
                        <el-form-item>
                            <el-button type="primary" @click="setDefGiveMoneyFen">保存</el-button>
                            <el-button>取消</el-button>
                        </el-form-item>
                    </el-form>
            </el-tab-pane>
        </el-tabs>
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="30%" :before-close="handleCreateCancel">
            <el-form ref="form" :model="form" :rules="rules" label-width="25%">
                <el-form-item :label="$t('serverManage.dialogLabelServerName')">
                    <el-input v-model="form.serverName" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="IP" prop="serverAddress">
                    <el-input v-model="form.serverAddress" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="PORT" prop="serverPort">
                    <el-input v-model="form.serverPort" size="mini"></el-input>
                </el-form-item>
                <el-form-item :label="$t('serverManage.dialogLabelDesc')">
                    <el-input type="textarea" :rows="2" v-model="form.serverDesc" size="mini"></el-input>
                </el-form-item>
                <el-form-item :label="$t('serverManage.dialoglabelStart')">
                    <el-switch v-model="form.enabled" size="mini">
                    </el-switch>
                </el-form-item>
                <el-form-item :label="$t('serverManage.dialogConnectTest')">
                    <el-button type="primary" size="mini" :loading="loadFlag" @click="handleConnectTest">{{loadTitle}}</el-button>
                    {{loadMsg}}
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleCreateSubmit('form')" size="mini">{{ $t("serverManage.dialogButtonConfirm") }}</el-button>
                <el-button @click="handleCreateCancel" size="mini">{{ $t("serverManage.dialogButtonCancel") }}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import api from "../../api/api.js";
    import commonfunc from "../../../../utils/commonfunc.js";
    import md5 from "md5";
    import {
        mapActions,
    } from 'vuex';
    export default {
        data() {
            return {
                value6: true,
                activeName: 'first',
                formMysql: {},
                formRedis: {},
                formEs: {},
                formEmail: {},
                FormWeChatPay: {},
                FormAlipay: {},
                VideoAudioPrice: {
                    audioFen:1,
                    videoFen:1
                },
                defGiveMoney:{
                    moneyFen:1
                },
                /*文档共享服务器，流媒体服务器共用数据结构*/
                rules: {
                    serverAddress: [{
                        required: true,
                        message: this.$t('serverManage.msgValidateIp'),
                        trigger: 'blur'
                    }],
                    serverPort: [{
                        required: true,
                        message: this.$t('serverManage.msgValidatePort'),
                        trigger: 'blur'
                    }]
                },
                form: {
                    serverName: '',
                    serverDesc: '',
                    serverAddress: '',
                    serverPort: '',
                    enabled: ''
                },
                total: 0,
                currentPage: 1,
                pageSizes: this.pageSizes,
                pageSize: this.pageSizes[1],
                serverTable: [],
                dialogFormVisible: false,
                dialogTitle: '',
                commond: '',
                /*文档共享服务器，流媒体服务器共用数据结构*/
                /*连接测试*/
                loadFlag: false,
                loadTitle: this.$t('serverManage.msgLoadTitleBeginTest'),
                loadMsg: '',
                serverState: [-1, 0, 1], //-1:断线，0：禁用，1：正常
                emaliEnable: true,
                emaliButton: '修改'
            };
        },
        methods: {
            ...mapActions([
                'actionLeftNavMediaServer'
            ]),
            handleConnectTest() {
                const self = this;
                if (self.loadFlag)
                    return;
                self.loadMsg = "";
                self.$refs['form'].validate((valid) => {
                    if (valid) {
                        self.tryConnectServer();
                        self.loadFlag = true;
                        self.loadTitle = this.$t('serverManage.msgLoadTitleTesting');
                    } else {
                        return false;
                    }
                });
            },
            async tryConnectServer() {
                const self = this;
                try {
                    var res;
                    if (self.activeName === 'forth') {
                        res = await api.tryConnectDocShareServer(parseInt(self.form.serverPort), self.form.serverAddress);
                    }
                    self.$refs['form'].clearValidate();
                    if (res.status === 'OK') {
                        self.loadFlag = false;
                        self.loadTitle = this.$t('serverManage.msgLoadTitleBeginTest');
                        if (res.result) {
                            self.loadMsg = this.$t('serverManage.msgLoadMsgConnectSuccess');
                        } else {
                            self.loadFlag = false;
                            self.loadMsg = this.$t('serverManage.msgLoadMsgConnectFail');
                        }
                    }
                    if (res.status === 'ERROR') {
                        self.loadFlag = false;
                        self.loadTitle = this.$t('serverManage.msgLoadTitleBeginTest');
                        self.loadMsg = this.$t('serverManage.msgLoadMsgConnectFail');
                        // commonfunc.doError(self, res.error);
                    }
                } catch (err) {
                    self.loadFlag = false;
                    self.loadTitle = this.$t('serverManage.msgLoadTitleBeginTest');
                    self.loadMsg = this.$t('serverManage.msgLoadMsgConnectFail');
                    //self.$notify.error(err);
                }
            },
            handleClick(tab, event) {
                this.getCurrentData(tab.name);
            },
            testMysql() {
                this.$message('敬请期待!');
            },
            initMysql() {
                this.$message('敬请期待!');
            },
            testAS() {
                this.$message('敬请期待!');
            },
            testMS() {
                this.$message('敬请期待!');
            },
            //每页条数修改
            handleSizeChange(val) {
                let self = this;
                if (self.pageSize !== val) {
                    self.pageSize = val;
                    if (self.activeName === 'forth') {
                        self.getDocShareServerList();
                    }
                }
            },
            //翻页
            handleCurrentChange(val) {
                let self = this;
                if (self.currentPage !== val) {
                    self.currentPage = val;
                    if (self.activeName === 'forth') {
                        self.getDocShareServerList();
                    }
                }
            },
            async handleSetEmailData() {
                const self = this;
                self.emaliEnable = !self.emaliEnable;
                if (self.emaliEnable) {
                    self.emaliButton = '修改'
                    try {
                        var res = await api.setEmailSenderOptions(self.formEmail);
                        if (res.status === 'OK') {
                            this.$message('修改成功email配置成功！');
                        }
                        if (res.status === 'ERROR') {}
                    } catch (errors) {}
                } else {
                    self.emaliButton = '保存'
                }
            },
            async getMediaServerList() {
                let self = this;
                let from = (self.currentPage - 1) * self.pageSize;
                try {
                    const res = await api.getMediaServerList(from, self.pageSize);
                    if (res.status === 'OK') {
                        self.serverTable = res.result;
                        if (self.serverTable.length > 0) {
                            for (var i = 0; i < self.serverTable.length; i++) {
                                self.serverTable[i].enabled = Boolean(self.serverTable[i].enabled);
                                self.serverTable[i].state = 0;
                            }
                        }
                        self.getStatserver();
                        self.actionLeftNavMediaServer();
                    }
                    if (res.status === 'ERROR') {
                        commonfunc.doError(self, res.error);
                    }
                } catch (errors) {
                    self.$message.error(errors.message);
                }
            },
            async getDocShareServerList() {
                let self = this;
                let from = (self.currentPage - 1) * self.pageSize;
                try {
                    const res = await api.getDocShareServerList(from, self.pageSize);
                    if (res.status === 'OK') {
                        self.serverTable = res.result;
                        self.getStatserver();
                        if (self.serverTable.length > 0) {
                            for (var i = 0; i < self.serverTable.length; i++) {
                                self.serverTable[i].enabled = Boolean(self.serverTable[i].enabled);
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
            async getMediaServerData() {
                let self = this;
                try {
                    const res = await api.getMediaServerCount();
                    if (res.status === 'OK') {
                        self.total = res.result;
                        self.getMediaServerList();
                    }
                    if (res.status === 'ERROR') {
                        commonfunc.doError(self, res.error);
                    }
                } catch (errors) {
                    self.$message.error(errors.message);
                }
            },
            async getDocShareServerData() {
                let self = this;
                try {
                    const res = await api.getDocShareServerCount();
                    if (res.status === 'OK') {
                        self.total = res.result;
                        self.getDocShareServerList();
                    }
                    if (res.status === 'ERROR') {
                        commonfunc.doError(self, res.error);
                    }
                } catch (errors) {
                    self.$message.error(errors.message);
                }
            },
            async getDbInfo() {
                const self = this;
                try {
                    const res = await api.getDbInfo();
                    if (res.status === 'OK') {
                        const obj = JSON.parse(res.result);
                        self.formRedis = obj.redis;
                        self.formMysql = obj.mysql;
                        self.formEs = obj.mongo;
                    }
                    if (res.status === 'ERROR') {
                        commonfunc.doError(self, res.error);
                    }
                } catch (errors) {
                    self.$message.error(errors.message);
                }
            },
            async getEmailData() {
                const self = this;
                try {
                    const res = await api.getEmailSenderOptions();
                    if (res.status === 'OK') {
                        const obj = res.result;
                        self.formEmail = res.result;
                    }
                    if (res.status === 'ERROR') {
                        commonfunc.doError(self, res.error);
                    }
                } catch (errors) {
                    self.$message.error(errors.message);
                }
            },
            async setEmailData() {
                const self = this;
                try {
                    const res = await api.setEmailSenderOptions();
                    if (res.status === 'OK') {
                        const obj = JSON.parse(res.result);
                        self.formRedis = obj.redis;
                        self.formMysql = obj.mysql;
                        self.formEs = obj.mongo;
                    }
                    if (res.status === 'ERROR') {
                        commonfunc.doError(self, res.error);
                    }
                } catch (errors) {
                    self.$message.error(errors.message);
                }
            },
            onAddMediaServer() {
                let self = this;
                self.loadFlag = false;
                self.loadFlag = false;
                self.loadMsg = "";
                self.loadTitle = this.$t('serverManage.msgLoadTitleBeginTest');
                self.dialogTitle = this.$t('serverManage.msgDialogTitleCreate');
                self.form.serverID = '';
                self.form.serverName = '';
                self.form.serverDesc = '';
                self.form.serverAddress = '';
                self.form.serverPort = '';
                self.commond = 'create';
                self.dialogFormVisible = true;
            },
            async handleDelete(row) {
                const self = this;
                if (self.activeName === 'forth') {
                    try {
                        await self.$confirm(this.$t('serverManage.msgConfirmDeleteDocServer'),
                            this.$t('serverManage.msgConfirmTitle'), {
                                confirmButtonText: this.$t('serverManage.buttonConfirm'),
                                cancelButtonText: this.$t('serverManage.buttonCancel'),
                                type: 'warning'
                            });
                        const res = await api.deleteDocShareServer(row.serverID);
                        if (res.status === 'OK') {
                            self.getDocShareServerData()
                        }
                        if (res.status === 'ERROR') {
                            commonfunc.doError(self, res.error);
                        }
                    } catch (errors) {
                        if (errors !== 'cancel')
                            self.$message.error(errors.message);
                    }
                }
            },
            handleModify(row) {
                const self = this;
                self.loadFlag = false;
                self.loadMsg = "";
                self.loadTitle = this.$t('serverManage.msgLoadTitleBeginTest');
                self.dialogTitle = this.$t('serverManage.msgDialogTitleModify');
                self.form.serverID = row.serverID;
                self.form.serverName = row.serverName;
                self.form.serverDesc = row.serverDesc;
                self.form.serverAddress = row.serverAddress;
                self.form.serverPort = row.serverPort.toString();
                self.form.enabled = row.enabled;
                self.commond = 'modify';
                self.dialogFormVisible = true;
            },
            formatDateTime(row, column) {
                return commonfunc.secToDate(row.addDate);
            },
            handleCreateCancel() {
                const self = this;
                self.$refs['form'].resetFields();
                self.dialogFormVisible = false;
            },
            //创建修改项目
            handleCreateSubmit(form) {
                const self = this;
                self.loadFlag = false;
                self.$refs[form].validate((valid) => {
                    if (valid) {
                        self.onSubmin();
                    } else {
                        return false;
                    }
                });
            },
            async switchChange(row) {
                const self = this;
                self.form.serverPort = parseInt(self.form.serverPort)
                if (self.activeName === 'forth') {
                    try {
                        const res = await api.updateDocShareServerEnabled({
                            'serverID': row.serverID,
                            'enabled': row.enabled ? 1 : 0
                        });
                        if (res.status === 'OK') {
                            self.getDocShareServerData();
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
            async onSubmin() {
                const self = this;
                self.loadFlag = false;
                self.form.serverPort = parseInt(self.form.serverPort)
                if (self.form.enabled) {
                    self.form.enabled = 1;
                } else {
                    self.form.enabled = 0;
                }
                if (self.activeName === 'forth') {
                    if (self.commond == 'create') {
                        if (self.form.serverID !== undefined)
                            delete self.form.serverID;
                        try {
                            const res = await api.addDocShareServer(self.form);
                            if (res.status === 'OK') {
                                self.$refs['form'].resetFields();
                                self.getDocShareServerData();
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
                            const res = await api.modifyDocShareServer(self.form);
                            if (res.status === 'OK') {
                                self.$refs['form'].resetFields();
                                self.getDocShareServerData();
                            }
                            if (res.status === 'ERROR') {
                                commonfunc.doError(self, res.error);
                            }
                        } catch (errors) {
                            self.$message.error(errors.message);
                        }
                        self.dialogFormVisible = false;
                    }
                }
            },
            getCurrentData(current) {
                const self = this;
                self.formMysql = {};
                self.formRedis = {};
                self.total = 0;
                self.currentPage = 1;
                self.serverTable = [];
                self.pageSize = self.pageSizes[0],
                    self.dialogFormVisible = false;
                self.dialogTitle = '';
                self.commond = '';
                switch (current) {
                    case 'first':
                        self.getDbInfo();
                        break;
                    case 'second':
                        self.getDbInfo();
                        break;
                    case 'three':
                        self.getDbInfo();
                    case 'forth':
                        self.getDocShareServerData();
                        break;
                    case 'five':
                        self.getEmailData();
                        break;
                    case 'six':
                        self.WeChatPayFun();
                        break;
                    case 'seven':
                        self.AlipayFun();
                        break;
                    case 'eight':
                        self.getDosageUnitPriceFun();
                        break;
                    case 'nine':
                        self.getDefGiveMoneyFen();
                        break;
                    default:
                        self.getDbInfo();
                }
            },
            
            async WeChatPayFun(){
                const self = this;
                try {
                    const res = await api.getWeChatPayConfigs();
                    if(!res){
                        return;
                    }
                    if (res.status === 'OK') {
                        self.FormWeChatPay = res.result;
                    }
                    if (res.status === 'ERROR') {
                        commonfunc.doError(self, res.error);
                    }
                } catch (errors) {
                    self.$message.error(errors.message);
                }
            },

            async AlipayFun(){
                const self = this;
                try {
                    const res = await api.getAlipayConfigs();
                    if(!res){
                        return;
                    }
                    if (res.status === 'OK') {
                        self.FormAlipay = res.result;
                    }
                    if (res.status === 'ERROR') {
                        commonfunc.doError(self, res.error);
                    }
                } catch (errors) {
                    self.$message.error(errors.message);
                }
            },

            async onSubmitWeChatPay(){
                const self = this;
                try {
                    const res = await api.setWeChatPayConfigs(self.FormWeChatPay);
                    if (res.status === 'OK') {
                        self.$message('微信支付配置成功！');
                    }
                    if (res.status === 'ERROR') {
                        commonfunc.doError(self, res.error);
                    }
                } catch (errors) {
                    self.$message.error(errors.message);
                }
            },
            
            async onSubmitAlipay(){
                const self = this;
                try {
                    const res = await api.setAlipayConfigs(self.FormAlipay);
                    if (res.status === 'OK') {
                        self.$message('支付宝支付配置成功！');
                    }
                    if (res.status === 'ERROR') {
                        commonfunc.doError(self, res.error);
                    }
                } catch (errors) {
                    self.$message.error(errors.message);
                }
            },
            
            async getDosageUnitPriceFun(){
                try{
                    const res = await api.getDosageUnitPrice();
                    if(res.status ==="OK"){
                        this.VideoAudioPrice.audioFen = res.result.audioFen/100;
                        this.VideoAudioPrice.videoFen = res.result.videoFen/100;
                    }
                    if(res.status === "ERROR"){
                        commonfunc.doError(this, res.error)
                    }
                }catch(errors){
                    this.$message.error(errors.message);
                }  
                
            },
            
            async setDosageUnitPrice(){
                try{
                    const params = {
                        audioFen: this.VideoAudioPrice.audioFen*100,
                        videoFen: this.VideoAudioPrice.videoFen*100,
                    }
                    const res = await api.setDosageUnitPrice(params);
                    console.log(res);
                    if(res.status === "OK"){
                        this.$message("价格设置成功");
                    }
                    if(res.status === "ERROR"){
                         commonfunc.doError(this, res.error)
                    }
                }catch(errors){
                    this.$message.error(errors.message);
                } 
            },
            //默认金钱配置
            async getDefGiveMoneyFen(){
                try{
                    const res = await api.getDefGiveMoneyFen();
                    if(res.status === "OK"){
                        
                        this.defGiveMoney.moneyFen = res.result/100;
                    }
                    if(res.status === "ERROR"){
                        commonfunc.doError(this, res.error)
                    }

                }catch(errors){
                    this.$message.error(errors.message);
                }
            },

            async setDefGiveMoneyFen(){
                
                try{
                    const params = {
                        moneyFen : Math.abs(this.defGiveMoney.moneyFen)*100
                    }; 
                    const res = await api.setDefGiveMoneyFen(params);
                    if(res.status === "OK"){
                        this.$message("配置新用户默认金钱成功！");
                    }
                    if(res.status === "ERROR"){
                        commonfunc.doError(this, res.error)
                    }
                }catch(errors){
                    this.$message.error(errors.message);
                }
            },

            async getStatserver() {
                const self = this;
                if (self.serverTable.length > 0) {
                    for (var i = 0; i < self.serverTable.length; i++) {
                        if (self.serverTable[i].enabled) {
                            if (self.activeName === 'forth') {
                                try {
                                    var res = await api.tryConnectDocShareServer(parseInt(self.serverTable[i].serverPort), self.serverTable[i].serverAddress);
                                    if (res.status === 'OK') {
                                        if (res.result) {
                                            self.serverTable[i].state = 1;
                                            self.$set(self.serverTable, i, self.serverTable[i])
                                        }
                                    }
                                    if (res.status === 'ERROR') {
                                        self.serverTable[i].state = -1;
                                        self.$set(self.serverTable, i, self.serverTable[i])
                                    }
                                } catch (errors) {
                                    clearInterval(self.timeid);
                                }
                            }
                        }
                    }
                }
            },
            async Onwatch() {
                const data = await api.activationCode();
                sessionStorage.setItem('adminData', data.result.lastUpdateDate);
                console.log(data)
                const self = this;
                if (data.result.sn = "" && data.result.code != 0) {
                    self.$router.push('/activation');
                }
            }
        },
        mounted() {
            const self = this;
            self.timeid = setInterval(() => {
                self.getStatserver();
            }, 1000 * 30);
        },
        beforeDestroy() {
            const self = this;
            clearInterval(self.timeid);
        },
        created() {
            const self = this;
            self.getCurrentData('first');
        }
    };
</script>

<style>
    .button {
        text-align: left;
    }
    .input {
        width: 200px
    }
</style>
