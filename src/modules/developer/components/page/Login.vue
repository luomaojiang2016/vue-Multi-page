<template>
    <div class="login-wrap">
        <div class="ms-title">{{ $t("login.title") }}</div>
        <div class="ms-login">
            <div class="account-title"><span>{{$t('login.buttonLogin')}}</span><span class="fr" @click="onRegister">{{$t('login.buttonGoRegister')}}</span></div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" :placeholder="$t('login.labelUserName')"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" :placeholder="$t('login.labelPassword')" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <p style="height: 20px;position: relative;top: -20px;float: right;"><el-button type="text" @click="onforget">{{$t('login.backpassword')}}</el-button></p>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">{{$t("login.buttonLogin")}}</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:#999;float: right">
                    <el-button type="text" @click="onSwitchLanguage">{{$t("login.buttonLanguage")}}</el-button>
                </p>
            </el-form>
        </div>
    </div>
</template>

<script>
    import api from '../../api/api.js'
    import commonfunc from "../../../../utils/commonfunc.js";
    import md5 from 'md5'
    export default {
        data: function() {
            return {
                ruleForm: {
                    username: localStorage.getItem('username'),
                    password: ''
                },
                rules: {
                    username: [{
                        required: true,
                        message: this.$t('login.msgAccountVerification'),
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: this.$t('login.msgPasswordVerification'),
                        trigger: 'blur'
                    }]
                }
            }
        },
        methods: {
            submitForm(formName) {
                const self = this;
                sessionStorage.removeItem('accountUserInfo');
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        self.onLogin();
                    } else {
                        return false;
                    }
                });
            },
            //忘记密码
            onforget(){
                 this.$router.push('/forgerpassword');
            },
            //注册
            onRegister() {
                this.$router.push('/register');
            },
            onSwitchLanguage() {
                let locale = this.$i18n.locale;
                locale === 'cn' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'cn';
                localStorage.setItem('developer_lan', this.$i18n.locale);
                document.title = this.$t('title.documentTitle');
                this.rules.username[0].message = this.$t('login.msgAccountVerification');
                this.rules.password[0].message = this.$t('login.msgPasswordVerification');
            },
            //登录
            async onLogin() {
                const self = this;
                sessionStorage.removeItem('accountToken');
                try {
                    const res = await api.loginAccount({
                        loginName: self.ruleForm.username,
                        password: md5(self.ruleForm.password)
                    });
                    if (res.status === 'OK') {
                        self.$store.commit("SET_TOKEN", res.result.accessToken);
                        sessionStorage.setItem('accountToken', res.result.accessToken);
                        localStorage.setItem('username', self.ruleForm.username),
                            self.onGetAccountInfo();
                    }
                    if (res.status === 'ERROR') {
                        commonfunc.doError(self, res.error);
                    }
                } catch (errors) {
                    self.$message.error(errors.message);
                }
            },
            //获取用户信息
            async onGetAccountInfo() {
                let self = this;
                try {
                    const res = await api.getAccountInfo();
                    if (res.status === 'OK') {
                        sessionStorage.setItem('accountUserInfo', JSON.stringify(res.result));
                        this.$store.commit("SET_USERINFO", res.result);
                        self.$router.push('/personalcenter');
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
            this.$i18n.locale = localStorage.getItem('developer_lan') ? localStorage.getItem('developer_lan') : 'cn';
           // document.title = this.$t('title.documentTitle');
        }
    }
</script>

<style>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
    }
    .ms-title {
        position: absolute;
        top: 50%;
        width: 100%;
        margin-top: -230px;
        text-align: center;
        font-size: 30px;
        color: #fff;
    }
    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 300px;
        height: 280px;
        margin: -150px 0 0 -190px;
        padding: 20px 40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn {
        text-align: center;
    }
    .login-btn button {
        width: 100%;
        height: 36px;
    }
    .account-title{
        margin:15px 0;
        color: #409EFF;
    }
    .account-title span:first-child{
       font-size:1.5em; 
    }
    .fr{
        float:right;
        font-size: 12px;
        margin-top:7px;
        cursor:pointer;
    }
</style>