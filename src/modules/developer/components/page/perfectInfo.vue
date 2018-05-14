<template>
    <div class="register-wrap">
        <div class="account-box">
            <div class="account-title"><span>{{$t('perfectInfo.perfectInfoTitle')}}</span></div>
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" :label-position="labelPosition" label-width="0px">
                <el-form-item  prop="name">
                    <el-input  v-model="ruleForm.name" :placeholder="$t('perfectInfo.perfectInfoName')"></el-input>
                </el-form-item>
                <el-form-item  prop="company">
                    <el-input  v-model="ruleForm.company" :placeholder="$t('perfectInfo.perfectInfoCompany')"></el-input>
                </el-form-item>
                <p>{{$t('perfectInfo.companyAlert')}}</p>
                <el-form-item  prop="phone">
                    <el-input  v-model.number="ruleForm.phone" :placeholder="$t('perfectInfo.perfectInfoTel')"></el-input>
                </el-form-item>
                <p>{{$t('perfectInfo.telAlert')}}</p>
                <el-form-item>
                    <el-button  type="primary" size="mini" @click="onSubmit('ruleForm')">{{$t('perfectInfo.buttonNext')}}</el-button>
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
            var CheckTel = (rule, value, callback) => {
                var reg=/^1[3|4|5|7|8][0-9]\d{8}$/;
                if (!value) {
                callback(new Error(this.$t('perfectInfo.msgPleaseTel')));
                } else if (!Number.isInteger(value)) {
                callback(new Error(this.$t('perfectInfo.msgTelNumber')));
                } else if (value.toString().length != 11) {
                callback(new Error(this.$t('perfectInfo.msgTelDigits')));
                }else if(!reg.test(value)){
                    callback(new Error(this.$t('perfectInfo.msgTelFormat')));
                }else{
                    callback();
                }
            };
            return {
                ruleForm: {
                    name: '',
                    company: '',
                    phone: '',
                },
                rules: {
                    name: [{
                        required: true,
                        message:this.$t('perfectInfo.msgPleaseName'),
                        trigger: 'blur'
                    }],
                   company: [{
                        required: true,
                        message:this.$t('perfectInfo.msgPleaseCompany'),
                        trigger: 'blur'
                    }],
                   phone: [
                       {validator: CheckTel,trigger: 'blur',required: true,}
                    ]
                },
                labelPosition: 'right'
            }
        },
        methods: {
            onSubmit(ruleForm) {
                const self = this;
                self.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        self.$router.push('/industry')
                    } else {
                        return false;
                    }
                });
            }
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
    .el-button--mini{
        float:right;
    }
    p{
        position:relative;
        top:-9px;
        font-size:0.6em;
        color:#aaa;
    }
    .el-form-item {
        margin-bottom: 30px;
    }
</style>