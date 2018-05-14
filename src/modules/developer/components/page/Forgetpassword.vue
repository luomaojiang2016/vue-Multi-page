<template>
    <div class="register-wrap">
        <div class="account-box">
            <div class="account-title"><span>{{$t('forgetPassword.forgerTitle')}}</span><span class="fr" @click="ReturnLogin">{{$t('forgetPassword.backLogin')}}</span></div>
            <p style="margin-bottom:20px;font-size:16px; color:#aaa">{{$t('forgetPassword.plearInputEmail')}}</p>
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules"  label-width="0px">
                <el-form-item  prop="mail">
                    <el-input v-model="ruleForm.mail" placeholder="Mail" style="width:70%;float:left"></el-input>
                    <el-button  type="primary" @click="sendmail" style="float:right;padding:12px">{{$t('forgetPassword.sendEmail')}}</el-button>                    
                </el-form-item>
                <el-form-item  prop="code" :label="$t('forgetPassword.plearInputCode')" label-width="148px">
                    <el-input v-model="ruleForm.code" placeholder="验证码" style="float:right"></el-input>                  
                </el-form-item>
                <el-form-item  prop="resetPossword">
                    <el-input type="password" v-model="ruleForm.resetPossword" :placeholder="$t('forgetPassword.plearNewPassword')" style="float:right"></el-input>                  
                </el-form-item>
                <el-form-item  prop="confirmPossword">
                    <el-input type="password" v-model="ruleForm.confirmPossword" :placeholder="$t('forgetPassword.plearConfirmPassword')" style="float:right"></el-input>                  
                </el-form-item>
                 <el-form-item>
                    <el-button type="primary" style="width:100%" @click="onSubmit('ruleForm')">{{$t('forgetPassword.buttonCancel')}}</el-button>
                </el-form-item>
            </el-form>           
        </div>
    </div>
</template>

<script>
    import api from '../../api/api.js'
    import commonfunc from "../../../../utils/commonfunc.js";
    import md5 from 'md5'
    export default {
        data() {
            return {
                ruleForm: {
                    mail: '',
                    code:'',
                    resetPossword:'',
                    confirmPossword:''
                },
                rules: {
                    mail: [{
                        required: true,
                        message:this.$t('forgetPassword.msgplearInputEmail'),
                        trigger: 'blur'
                    }],
                    code: [{
                        required: true,
                        message:this.$t('forgetPassword.msgplearInputCode'),
                        trigger: 'blur'
                    }],
                    resetPossword:[{
                        required: true,
                        message:this.$t('forgetPassword.magplearNewPassword'),
                        min:6,
                        max:12,
                        trigger: 'blur'
                    }],
                    confirmPossword:[{
                        required: true,
                        min:6,
                        max:12,
                        message:this.$t('forgetPassword.msgplearConfirmPassword'),
                        trigger: 'blur'
                    }]
                },
            }
        },
        methods: {
            ReturnLogin(){
                this.$router.push('./login')
            },
            sendmail(){
                 var myReg = /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/;
                    var email = this.ruleForm.mail;
                    if(myReg.test(email)){
                        this.onOvtainCode()
                    }else{
                        this.$message(this.$t('forgetPassword.getEmailFormat'))
                    } 
            },
            onSubmit(ruleForm) {
                const self = this;
                self.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        if(self.ruleForm.resetPossword==self.ruleForm.confirmPossword){
                            self.onresetPossword();
                        }else{
                            self.$message(this.$t('forgetPassword.getpasswordDifferent'))
                        }                 
                    } else {
                        return false;
                    }
                });
            },
            async onOvtainCode(){
                const self = this;
                try{
                    const res = await api.getEmailVerifyCode(self.ruleForm.mail);
                    if(res.status === "OK"){
                        self.validationCode=true;
                    }
                    if (res.status === 'ERROR') {
                        commonfunc.doError(self, res.error);
                    }
                }catch(errors){
                    self.$message.error(errors.message);
                }
            },
            async onresetPossword(){
                const self = this;
                let params = {};
                params.email = self.ruleForm.mail;
                params.password = md5(self.ruleForm.resetPossword);         
                params.verifyCode = self.ruleForm.code;
                try{
                    const res = await api.resetPasswordByEmail(params)
                    if(res.status === "OK"){
                        self.$message(this.$t('forgetPassword.resetMessage'));
                        self.$router.push("/login")
                    }
                    if (res.status === 'ERROR') {
                        commonfunc.doError(self, res.error);
                    }
                }catch(errors){
                    self.$message.error(errors.message);
                }
            }
        }
    }
</script>

<style>
    .account-box {
        position: absolute;
        width: 300px;
        left: 50%;
        top: 50%;
        margin: -240px 0 0 -190px;
        border: 1px;
        background:#fff;
        border-radius:10px;
        padding:10px 30px;
    }
    .account-title{
        margin:15px 0;
        color: #409EFF;
    }
    .account-title span:first-child{
       font-size:1.5em; 
    }
    .register-wrap{
        position: relative;
        width: 100%;
        height: 100%;
        background: #409EFF;
    }
    
</style>