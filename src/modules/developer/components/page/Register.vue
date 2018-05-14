<template>
    <div class="register-wrap">
        <div class="account-box">
            <div class="account-title"><span>{{$t('register.buttonRegister')}}</span><span class="fr" @click="onCancel">{{$t('register.buttonLogin')}}</span></div>
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" :label-position="labelPosition" label-width="0px">
                <el-form-item  prop="email">
                    <el-input type="email" v-model="ruleForm.email" :placeholder="$t('register.labelAccontEmail')" @change="onchange" @focus="onfocus" style="width:92%"></el-input>
                    <i class="el-icon-success"  v-show="VerificationCode"></i>
                </el-form-item>
                <el-form-item  prop="code">
                    <el-button  size="samll" v-model="time" @click="countdown" class="buttonTime">{{time}}</el-button>
                    <el-input type="text" class="text" v-model="ruleForm.code"/>      
                    <i class="el-icon-success"  v-show="VerificationCodesuccess" style="margin-left:11px"></i> 
                </el-form-item>
                <el-form-item  prop="password">
                    <el-input type="password" v-model="ruleForm.password" :placeholder="$t('register.labelPassword')" style="width:92%"></el-input>
                </el-form-item>
                <el-form-item  prop="reppassword">
                    <el-input type="password" v-model="ruleForm.reppassword" :placeholder="$t('register.labelRepPassword')" style="width:92%"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="mini" @click="onSubmit('ruleForm')">{{$t('register.buttonRegister')}}</el-button>
                    <el-button  size="mini" @click="onCancel">{{$t('register.buttonCancel')}}</el-button>
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
                VerificationCode:false,
                VerificationCodesuccess:false,
                time:'',
                idt:'',
                sec:60,
                min:'',
                ruleForm: {
                    email: '',
                    password: '',
                    reppassword: '',
                    text:'',
                    code:''
                },
                rules: {
                    email: [
                            { required: true, message: this.$t('register.msgValidateAccountEmail'), trigger: 'blur' },
                            { type: 'email', message:this.$t('register.msgValidateAccountCorrectEmail'), trigger: 'blur,change' }
                    ],
                    code: [{
                        required: true,
                        message: this.$t('register.msgValidateCode'),
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        min:6,
                        max:12,
                        message: this.$t('register.msgValidatePassword'),
                        trigger: 'blur'
                    }],
                    reppassword: [{
                        required: true,
                        min:6,
                        max:12,
                        message: this.$t('register.msgValidateRepPassword'),
                        trigger: 'blur'
                    }]
                },
                labelPosition: 'right'
            }
        },
        methods: {
            async countdown(){
                await this.onOvtainCode();
                // setTimeout(() => {
                //     this.timer();
                //     }, 1000);          
            },
            timer(){
                this.sec--;
                this.min = 1;
                if(this.sec == 0) {
                    this.sec = 60;
                    this.min -= 1;
                }
                if(this.min > 0) {
                    this.min--;
                    this.time =  this.min + ":" + this.sec;
                    setTimeout(() => {
                        this.timer();
                    }, 1000);
                    if( this.min == 0 && this.sec == 1) {
                        this.time = this.$t('register.getCode');
                        this.VerificationCodesuccess = false;
                    }
                }
            },
            onfocus(){
               this.VerificationCode = false;
            },
            async onchange(){
               const myReg = /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/;
               const email = this.ruleForm.email;
               if(myReg.test(email)){
                    await this.onEmail();
               }else{
                   return;
               }      
            },
            onCancel() {
                this.$router.push('/login');
            },
            onSubmit(ruleForm) {
                const self = this;
                self.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        if(self.ruleForm.password==self.ruleForm.reppassword){
                            self.onReg();
                        }else{
                            self.$message(this.$t('register.getpasswordDifferent'));
                        }       
                    } else {
                        return false;
                    }
                });
            },
            async onReg() {
                const self = this;
                let params = {};
                params.password = md5(self.ruleForm.password);
                params.reppassword = md5(self.ruleForm.reppassword);
                params.email = self.ruleForm.email;
                params.verifyCode = self.ruleForm.code;
                try {
                    const res = await api.registerByEmail(params);
                    if (res.status === 'OK') {
                        self.$router.push('/perferinfo');
                    }
                    if (res.status === 'ERROR') {
                        commonfunc.doError(self, res.error);
                    }
                } catch (errors) {
                    self.$message.error(errors.message);
                }
            },
            async onEmail(){
                const self = this;
                const email = self.ruleForm.email;
                try{
                    const res = await api.getEmailReged(email);
                     if (res.status === 'OK') {
                         if(res.result){ 
                            self.$message.error('注册失败！');
                         }else{
                            self.VerificationCode= true;
                         }      
                    }
                    if (res.status === 'ERROR') {
                        self.VerificationCode= false;
                        self.ruleForm.email = '';
                        commonfunc.doError(self, res.error);
                    }
                }catch(errors){
                    self.$message.error(errors.message);
                }
            },
            async onOvtainCode(){
                const self = this;
               
                try{
                    const res = await api.getEmailVerifyCode(self.ruleForm.email);
                    if(res.status === "OK"){
                        self.VerificationCodesuccess=true;
                        self.timer();
                    }
                    if (res.status === 'ERROR') {
                        commonfunc.doError(self, res.error);
                    }
                }catch(errors){
                    self.$message.error(errors.message);
                }
            }
        },
        mounted(){
            this.time=this.$t('register.getCode');
        }
    }
</script>

<style scoped>
    .account-box {
        position: absolute;
        width: 300px;
        left: 50%;
        top: 50%;
        margin: -170px 0 0 -190px;
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
    .fr{
        float:right;
        font-size: 12px;
        margin-top:7px;
        cursor:pointer;
    }
    .el-icon-success{
        margin-left:2%;
        color:#67c23a;
    }
    .text{
        margin-top:3px;
        margin-left:19%;
        width: 100px;
        height: 30px;
        border-radius: 4px;
        text-indent:5px;
    }
    .buttonTime{
        width:110px;
    }
</style>