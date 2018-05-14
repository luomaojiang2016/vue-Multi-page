<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="微信支付配置" name="first">
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
    <el-tab-pane label="支付宝支付配置" name="second">
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
  </el-tabs>
</template>


<script>
    import api from "../../api/api.js";
    import commonfunc from "../../../../utils/commonfunc.js";

    export default {
        data() {
            return {
                activeName: 'first',
                FormWeChatPay: {},
                FormAlipay: {}
            };
        },
        methods: {
            handleClick(tab, event) {
                this.getCurrentData(tab.name);
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
            getCurrentData(current) {
                const self = this;

                switch (current) {
                    case 'first':
                        self.WeChatPayFun();
                        break;
                    case 'second':
                        self.AlipayFun();
                        break;
                    default:
                       break;
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
            }

        },
        created() {
            const self = this;
            self.getCurrentData('first');
        }
    };
</script>