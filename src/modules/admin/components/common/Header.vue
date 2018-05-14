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
                        {{adminInfo.adminName}}
                        <i class="el-icon-arrow-down"></i>
                        </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="modifypassord">{{ $t("header.menuModifyPassord") }}</el-dropdown-item>
                      <!--  <el-dropdown-item command="switchLanguage">{{ $t("header.menuSwitchLanguage") }}</el-dropdown-item> -->
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
                },
                adminInfo: {}
            }
        },
        methods: {
            handleCommand(command) {
                const self = this;
                if (command === 'loginout') {
                    self.$router.push('/login');
                    sessionStorage.removeItem('AdminData');
                    clearInterval(self.timeid)
                }
                if (command === 'modifypassord') {
                    self.dialogFormVisible = true;
                    self.ruleForm.oldPassword = '';
                    self.ruleForm.newPassword = '';
                }
                if (command === 'switchLanguage'){
                    let locale = this.$i18n.locale;
                    locale === 'cn' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'cn';
                    localStorage.setItem('language', this.$i18n.locale);
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
            onModifyPassword() {
                const self = this;
                let params = {};
                params.oldpassword = md5(self.ruleForm.oldPassword);
                params.newpassword = md5(self.ruleForm.newPassword);
                api.modifyPassword(params)
                    .then(res => {
                        if (res.status === 'OK') {
                            self.$router.push('/login');
                        }
                        if (res.status === 'ERROR') {
                            commonfunc.doError(self, res.error);
                        }
                    });
            },
            //获取用户信息
            onGetAccountInfo() {
                const self = this;
                api.getAdminInfo()
                    .then(res => {
                        if (res.status === 'OK') {
                            self.adminInfo = res.result;
                        }
                        if (res.status === 'ERROR') {
                            commonfunc.doError(self, res.error);
                        }
                    })
            },
            handleCancel() {
                const self = this;
                self.ruleForm.oldpassword = '';
                self.ruleForm.newpassword = '';
                self.dialogFormVisible = false;
            },
        //   async Onwatch(){
        //        const self = this;
        //         try{
        //             const res= await api.activationCode();
        //             if(res.status === 'OK'){
        //                 if(res.result.sn = "" && res.result.code == -1){
        //                     self.$router.push('/activation');
        //                 }
        //             }
        //             if(res.status === 'ERROR'){
        //                 commonfunc.doError(self, res.error);
        //             }
        //         }catch(errors){
        //             self.$message.error(errors.message);
        //         }
        //     }
        },
        // beforeDestroy() {
        //   const self = this;
        //   clearInterval(self.timeid)
        // },
        mounted() {   
            const self = this;
             self.onGetAccountInfo();
            //   self.timeid = setInterval(function(){
            //     self.Onwatch();
            //   },1000 * 60)
            // self.Onwatch();
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
