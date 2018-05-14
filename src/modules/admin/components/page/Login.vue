<template>
    <div class="login-wrap">
        <div class="ms-title">{{ $t("login.title") }}</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" :placeholder="$t('login.labelUserName')"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" :placeholder="$t('login.labelPassword')" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
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
    import {
        mapActions,
    } from 'vuex';
    import md5 from 'md5'
    export default {
        data: function() {
            return {
                ruleForm: {
                    username: localStorage.getItem('adminusername'),
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
                },
            }
        },
        methods: {
            ...mapActions([
                'actiongetAppServerUrl'
            ]),
            submitForm(formName) {
                const self = this;
                sessionStorage.removeItem('adminInfo');
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        self.onLogin();
                    } else {
                        return false;
                    }
                });
            },
            onSwitchLanguage() {
                let locale = this.$i18n.locale;
                locale === 'cn' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'cn';
                localStorage.setItem('admin_lan', this.$i18n.locale);
                document.title = this.$t('title.documentTitle');
                this.rules.username[0].message = this.$t('login.msgAccountVerification');
                this.rules.password[0].message = this.$t('login.msgPasswordVerification');
            },
            //登录
            async onLogin() {
                const self = this;
                sessionStorage.removeItem('adminToken');
                try {
                    const res = await api.login({
                        adminName: self.ruleForm.username,
                        password: md5(self.ruleForm.password)
                    });
                    if (res.status === 'OK') {
                      //y  self.$store.commit("SET_TOKEN", res.result.accessToken);
                        sessionStorage.setItem('adminToken', res.result.accessToken);
                        localStorage.setItem('adminusername', self.ruleForm.username);

                        
                        
                         if(process.env.NODE_ENV === 'development')
                             self.$router.push('/servermanage');
                         else
                            self.dogInfo();
                    }
                    if (res.status === 'ERROR') {
                        commonfunc.doError(self, res.error);
                    }
                } catch (errors) {
                    self.$message.error(errors.message);
                }
            },
            async dogInfo(){
                const self = this;
                try{
                    const res= await api.activationCode();
                    if(res.status === 'OK'){
                        if(res.result == ''){
                            self.$router.push('/servermanage');
                        }else if(res.result != ""){
                            if(res.result.sn !='' && res.result.code ==0){
                                self.$router.push('/servermanage');   
                            }else{
                                self.$router.push('/activation');
                            }     
                        }
                    }
                    if(res.status === 'ERROR'){
                        commonfunc.doError(self, res.error);
                    }
                }catch(errors){
                    self.$message.error(errors.message);
                }
            }
        },
        created() {
            this.$i18n.locale = localStorage.getItem('admin_lan') ? localStorage.getItem('admin_lan') : 'cn';
            sessionStorage.removeItem('adminToken');
            // document.title = this.$t('title.documentTitle');
           // this.actiongetAppServerUrl();
        }
    }
</script>

<style scoped>
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
        height: 160px;
        margin: -150px 0 0 -190px;
        padding: 40px;
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
</style>
