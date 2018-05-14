<template>
    <div class="register-wrap">
        <div class="account-box">
            <div class="account-title"><span>{{$t('industry.selectIndustry')}}</span></div>
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules"  label-width="0px">
                <el-form-item  prop="radio">
                <div>
                    <div>
                        <el-radio-group v-model="ruleForm.radio" v-for="item  in professional">
                            <el-radio-button :label="item.info"></el-radio-button>
                        </el-radio-group>
                    </div>
                </div>
                </el-form-item>
                <el-form-item>
                    <el-button  type="primary" size="mini" @click="onSubmit('ruleForm')">{{$t('industry.buttonCancel')}}</el-button>
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
                professional:[
                    {info:this.$t('industry.msgEntertainment')},
                    {info:this.$t('industry.msgEducation')},
                    {info:this.$t('industry.msgEnterprise')},
                    {info:this.$t('industry.msgLive')},
                    {info:this.$t('industry.msgGame')},
                    {info:this.$t('industry.magMedical')},
                    {info:this.$t('industry.msgIt')},
                    {info:this.$t('industry.msgFinancial')},
                    {info:this.$t('industry.msgService')},
                    {info:this.$t('industry.msgCivilServants')}
                ],
                ruleForm: {
                    radio: '',
                },
                rules: {
                    radio: [{
                        required: true,
                        message:this.$t('industry.msgPleaseIndustry'),
                        trigger: 'blur'
                    }],
                },
            }
        },
        methods: {
            onSubmit(ruleForm) {
                const self = this;
                self.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        self.$message(this.$t('register.msgRegisterSuccess'));
                        self.$router.push('/login')
                    } else {
                        return false;
                    }
                });
            },
        }
    }
</script>

<style scoped>
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
    .el-button--mini{
        float:right;
    }
    .el-form-item {
        margin-bottom: 30px;
    }
    .el-radio-button, .el-radio-button__inner{
        margin:7px;
        border-radius:4px;
    }
    .el-radio-button:first-child .el-radio-button__inner,.el-radio-button:last-child .el-radio-button__inner{
        border-radius:4px;
    }
    .el-radio-button__inner{
        border-left:1px solid #dcdfe6;
        padding:12px;
        font-size:12px;
        text-align:left;
        width:120px;
        background:#eee;
    }
</style>