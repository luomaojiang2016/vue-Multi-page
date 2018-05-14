<template>
    <div>
        <div class="header">
            <div class="logo">
                <a href= "/"><img src="../../assets/logo02.png" style="margin-top:5px"/></a>
                <span style="position:relative;top:-20px;left:40px">{{ $t("header.title") }}</span>
            </div>
            <div class="user-info">
                <el-dropdown trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                                    {{UserInfo.accountName}}
                                    <i class="el-icon-arrow-down"></i>
                                </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="modifypassord">{{ $t("header.menuModifyPassord") }}</el-dropdown-item>
                        <el-dropdown-item command="loginout">{{ $t("header.menuLoginOut") }}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <el-dialog :title="$t('header.titleModifyPassword')" :visible.sync="dialogFormVisible" width="35%" :before-close="handleCancel">
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" :label-position="labelPosition" label-width="25%">
                <el-form-item :label="$t('header.labelOldPassword')" prop="oldPassword">
                    <el-input type="password" v-model="ruleForm.oldPassword" size="small"></el-input>
                </el-form-item>
                <el-form-item :label="$t('header.labelNewPassword')" prop="newPassword">
                    <el-input type="password" v-model="ruleForm.newPassword" size="small"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="handlePassword('ruleForm')">{{ $t("header.buttonConfirm") }}</el-button>
                <el-button size="small" @click="handleCancel">{{ $t("header.buttonCancel") }}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        mapGetters,
        mapActions,
        mapMutations,
        mapState
    } from 'vuex';
    import api from '../../api/api.js'
    import commonfunc from "../../../../utils/commonfunc.js";
    import md5 from 'md5'
    export default {
        data() {
            const self = this;
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                     callback(new Error(this.$t('header.msgValidateOldPassword')));
                } else {
                    if (self.ruleForm.newPassword !== '') {
                        self.$refs.ruleForm.validateField('newPassword');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('header.msgValidateNewPassword')));
                } else if (value == self.ruleForm.oldPassword) {
                    callback(new Error(this.$t('header.msgValidateEqualPassword')));
                } else {
                    callback();
                }
            };
            return {
                name: 'xxx',
                labelPosition: 'right',
                dialogFormVisible: false,
                ruleForm: {
                    oldPassword: '',
                    newPassword: '',
                },
                rules: {
                    oldPassword: [{
                        validator: validatePass,
                        trigger: 'blur'
                    }],
                    newPassword: [{
                        validator: validatePass2,
                        trigger: 'blur'
                    }]
                }
            }
        },
        computed: {
            ...mapGetters({
                UserInfo: 'getUserInfo'
            })
        },
        methods: {
            handleCommand(command) {
                let self = this;
                if (command == 'loginout') {
                    sessionStorage.removeItem('accountUserInfo')
                    self.$router.push('/login');
                }
                if (command == 'modifypassord') {
                    self.dialogFormVisible = true;
                    self.ruleForm.oldPassword = '';
                    self.ruleForm.newPassword = '';
                }
            },
            handlePassword(ruleForm) {
                const self = this;
                self.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        self.onModifyPassword();
                    } else {
                        return false;
                    }
                });
            },
            async onModifyPassword() {
                const self = this;
                let params = {};
                params.oldpassword = md5(self.ruleForm.oldPassword);
                params.newpassword = md5(self.ruleForm.newPassword);
                try {
                    const res = await api.modifyPassword(params);
                    if (res.status === 'OK') {
                        self.$router.push('/login');
                    }
                    if (res.status === 'ERROR') {
                        commonfunc.doError(self, res.error);
                    }
                }catch(errors){
                    self.$message.error(errors.message);
                }
            },
            handleCancel() {
                const self = this;
                self.ruleForm.oldpassword = '';
                self.ruleForm.newpassword = '';
                self.dialogFormVisible = false;
            }
        }
    }
</script>

<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
    }
    .header .logo {
        float: left;
        text-align: center;
        padding-left:40px;
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link {
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo {
        position: absolute;
        left: 0;
        top: 15px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    .el-dropdown-menu__item {
        text-align: center;
    }
</style>
