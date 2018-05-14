<template>
    <el-container>
        <el-header>账户信息</el-header>
        <el-container>
            <el-aside width="200px">
                <div class="touxiang"></div>
            </el-aside>
            <el-main>
                <el-form ref="form" :model="accountInfo" label-width="100px" size="mini">
                    <el-form-item label="账户名称">
                        <el-input v-model="accountInfo.accountName" disabled style="width: 40%;"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="accountInfo.email" :disabled="emaliEnable" style="width: 40%;"></el-input>
                        <el-input v-model="vercode" v-show="inputvshow" style="width: 13%;"></el-input>
                        <el-button type="primary" @click="handlemodifyEmail">{{emaliButton}}</el-button>
                    </el-form-item>
                    <el-form-item label="折扣">
                        <el-input v-model="accountInfo.discount" disabled style="width: 40%;"></el-input>
                    </el-form-item>
                    <el-form-item label="剩余">
                        <el-input v-model="accountInfo.moneyRemainFen" disabled style="width: 40%;"></el-input>
                    </el-form-item>
                    <el-form-item label="登录次数">
                        <el-input v-model="accountInfo.loginTimes" disabled style="width: 40%;"></el-input>
                    </el-form-item>
                    <el-form-item label="注册日期">
                        <el-input v-model="accountInfo.registerDate" disabled style="width: 40%;"></el-input>
                    </el-form-item>
                    <el-form-item label="最后登录日期">
                        <el-input v-model="accountInfo.lastLoginDate" disabled style="width: 40%;"></el-input>
                    </el-form-item>
                    <el-form-item label="资费政策">
                        <el-button type="primary" @click="orderDown">充值</el-button>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import api from "../../api/api.js";
    import commonfunc from "../../../../utils/commonfunc.js";
    export default {
        data() {
            return {
                accountInfo: {},
                emaliEnable: true,
                emaliButton: '修改',
                emalistate: 0,
                vercode: '',
                inputvshow: false
            };
        },
        methods: {
            async getAccountInfo() {
                try {
                    const res = await api.getAccountInfo();
                    if (res.status === 'OK') {
                        this.accountInfo = res.result;
                        this.accountInfo.discount += ' %';
                        this.accountInfo.moneyRemainFen = this.accountInfo.moneyRemainFen / 100 + ' 元';
                        this.accountInfo.registerDate = commonfunc.secToDate(this.accountInfo.registerDate);
                        this.accountInfo.lastLoginDate = commonfunc.secToDate(this.accountInfo.lastLoginDate);
                        return;
                    }
                    commonfunc.doError(this, res.error);
                } catch (errors) {
                    this.$message.error(errors.message);
                }
            },
            //                       <el-button  size="samll" v-model="time" @click="countdown" class="buttonTime">{{time}}</el-button>
            //           <el-input type="text" class="text" v-model="ruleForm.code"/>      
            //              <i class="el-icon-success"  v-show="VerificationCodesuccess" style="margin-left:11px"></i> 
            async handlemodifyEmail() {
                const self = this;
                self.emaliEnable = !self.emaliEnable;
                if (self.emalistate === 0) {
                    self.emalistate++;
                    self.emaliButton = '发送验证码';
                    self.inputvshow = false;
                } else if (self.emalistate === 1) {
                    try {
                        const res = await api.getEmailVerifyCode(this.accountInfo.email);
                        console.log(res)
                        if (res.status === 'OK') {
                            this.$message('验证码发送成,请输入验证码！');
                            self.inputvshow = true;
                            self.emalistate++;
                            self.emaliButton = '保存';
                            return;
                        }
                        if (res.status === 'ERROR') {
                            self.inputvshow = false;
                            this.$message(`发送验证码失败:${res.error.message}`);
                        }
                    } catch (errors) {}
                } else if (self.emalistate === 2) {
                    try {
                        const parmats = {
                            newEmail: this.accountInfo.email,
                            verifyCode: this.vercode
                        }
                        const res = await api.modifyEmail(parmats);
                        this.vercode = '';
                        if (res.status === 'OK') {
                            this.$message('修改email成功！');
                        }
                        if (res.status === 'ERROR') {
                            self.inputvshow = false;
                            this.$message(`修改email失败:${res.error.message}`);
                        }
                        self.inputvshow = false;
                        self.emalistate = 0;
                        self.emaliButton = '修改';
                        self.emaliEnable = true;
                    } catch (errors) {}
                }

            },
            orderDown() {
                this.$router.push('/recharge');
            }
        },
        created() {
            this.getAccountInfo();
        }
    };
</script>


<style>
    .touxiang {
        width: 80px;
        height: 80px;
        margin: 10px auto;
        border: 1px solid rgb(64, 158, 255);
        border-radius:50%;
        background:url("../../assets/logo02.png") no-repeat center;
    }
</style>
