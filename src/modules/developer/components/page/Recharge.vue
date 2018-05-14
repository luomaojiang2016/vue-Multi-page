<template>
  <el-container>
    <el-header><div class="font_st">充值中心</div></el-header>
    <div style="width:80%">
      <el-steps :active="active" finish-status="success">
        <el-step title="选择支付金额"></el-step>
        <el-step title="选择支付方式"></el-step>
        <el-step title="扫描支付"></el-step>
      </el-steps>

    </div>
    <el-main v-show="paymentTagger">
      <el-form ref="formRecharge" :model="formRecharge" label-width="100px">
         <el-form-item label="充值金额">
          <el-radio-group v-model="formRecharge.orderMoneyFen">
            <el-radio label="1">0.01元</el-radio>
            <el-radio label="10000">100元</el-radio>
            <el-radio label="20000">200元</el-radio>
            <el-radio label="50000">500元</el-radio>
            <el-radio label="100000">1000元</el-radio>
            <el-radio label="200000">2000元</el-radio>
            <el-radio label="500000">5000元</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createOrderByPer">下一步</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-main>
    <el-main v-show="!paymentTagger">
      <el-form ref="formPayment" :model="formPayment" label-width="100px" v-show="QRcodetagger">
         <el-form-item label="选择支付方式">
          <el-radio-group v-model="formPayment.Method">
            <el-radio label="WeChat" aria-selected="true">微信支付</el-radio>
            <el-radio label="Alipay">支付宝支付</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <div class="font_pay_parten"><span class="font_pay">充值金额 </span><span class="font_pay_fen">{{orderMoneyFenMessage}}</span></div>
          <el-button type="primary" @click="handleClick" style="width:38%">立即支付</el-button>
        </el-form-item>
      </el-form>
      <!-- <div style="align:center;text-align: center;" v-show="!QRcodetagger">
        <div class="font_st">扫描支付</div>
        <img :src="imgUrl" width="300px" height="300px">
      </div> -->
      <el-dialog title="等待扫描支付..." :visible.sync="WxPaydialogVisible" width="30%" :before-close="wxhandleClose">
        <span>
          <div style="align:center;text-align: center;">
            <img :src="imgUrl" width="300px" height="300px">
          </div>

        </span>

      </el-dialog>
      <el-dialog title="等待支付宝扫描支付..." :visible.sync="AliPaydialogVisible" width="50%" :before-close="alihandleClose">
        <span>
          <div style="align:center;text-align: center;">
            <span>等待支付宝扫描支付...</span>
          </div>

        </span>

      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>

    import api from "../../api/api.js";
    import commonfunc from "../../../../utils/commonfunc.js";

    export default {
      data() {
        return {
          qrcodeurl:'',
          paymentTagger: true,  
          QRcodetagger: true,
          active: 0,
          paymentState:false,
          WxPaydialogVisible:false,
          AliPaydialogVisible:false,
          orderMoneyFenMessage:'',
          orderParams:{
            orderID:'',
            orderMoneyFen:'',
            orderStatus:''
          },
          formRecharge: {
            orderMoneyFen: '',
            accountID: '',
            createDate:'',
            orderID:''
          },
          formPayment: {
            Method: ''
          },
        }
      },
      
      methods: {
        //创建订单
        async createOrderByPer() {
          const self = this;
          try {
            //alert(self.formRecharge.moneyAccountFen);
              const res = await api.createOrderByPersonal(self.formRecharge);
              if (res.status === 'OK') {
                  const obj = res.result;
                  self.formRecharge = res.result;
                  self.paymentTagger = false;
                  self.next();
              }
              if (res.status === 'ERROR') {
                  commonfunc.doError(self, res.error);
              }
          } catch (errors) {
              self.$message.error(errors.message);
          }
        },

        async handleClick() {
          const self = this;
          await this.getPaymentMethod(self.formPayment);
        },

        async getPaymentMethod(formPayment){
          const self = this;
          switch (formPayment.Method) {
              case 'WeChat':
                  if(this.orderParams.orderID){
                      const orderID = Number(this.orderParams.orderID);
                      self.getWxPayCodeurlByOrderId(orderID);
                  }else{
                      self.getWxPayCodeurlByOrderId(self.formRecharge.orderID);
                  }
                  break;
              case 'Alipay':
                  if(this.orderParams.orderID){
                      const orderID = Number(this.orderParams.orderID);
                      self.getAlipayPayUrlByOrderId(orderID);
                  }else{
                      self.getAlipayPayUrlByOrderId(self.formRecharge.orderID);
                  }
                  break;
              default:
                  break;
          }
        },

        async getWxPayCodeurlByOrderId(orderID){
          const self = this;
          try {
              const res = await api.getWxPayCodeurl(orderID);
              if (res.status === 'OK') {
                  //self.qrcodeurl = location.protocol+'//'+location.host+"/api/pay/qrcode?url="+res.result;
                  self.qrcodeurl = res.result;
                  //self.QRcodetagger = !self.QRcodetagger;
                  self.WxPaydialogVisible = !self.WxPaydialogVisible;
                  self.next();
                  await self.listenPayState();
              }
              if (res.status === 'ERROR') {
                  commonfunc.doError(self, res.error);
              }
          } catch (errors) {
              self.$message.error(errors.message);
          }
        },

        async getAlipayPayUrlByOrderId(orderID){
          try {
              const res = await api.getAlipayPayUrl(orderID);
              this.AliPaydialogVisible = true;
              this.next();
              await this.listenPayState();
              window.open(res,'_blank')
          } catch (errors) {
              this.$message.error(errors.message);
          }
        },

        async listenPayState(){

          const self = this;
          setTimeout(async() => {
            if(self.paymentState){
              return;
            }
            try{
              let res;
              if(this.orderParams.orderID){
                  const orderID = Number(this.orderParams.orderID);
                  res = await api.getOrderInfoByOrrderID(orderID);
              }else{
                  res = await api.getOrderInfoByOrrderID(self.formRecharge.orderID);
              }
              
              if (res.status === 'OK') {
                  if (res.result.orderStatus === 0) {
                
                  }else if(res.result.orderStatus === 1){
                      self.$message('支付成功');
                      self.next();
                      self.paymentState = true;
                      if(this.orderParams.orderID){
                          this.$router.push('/rechargeRecord');
                      }else{
                          this.$router.push('/personalcenter');
                      }
                      return;
                  }else if(res.result.orderStatus === 2){
                      self.$message('取消支付');
                      self.next();
                      self.paymentState = true;
                      if(this.orderParams.orderID){
                          this.$router.push('/rechargeRecord');
                      }else{
                          this.$router.push('/personalcenter');
                      }
                      return;
                  }
              }
              if (res.status === 'ERROR') {
                  commonfunc.doError(self, res.error);
              }
              
            }catch(errors){
              self.$message.error(errors.message);
            }
            await this.listenPayState();
          }, 1000);
        },

        judgeIsHistoryOrder(params){
            this.orderParams = params;
            if(this.orderParams.orderStatus === "未支付"){
                this.orderMoneyFenMessage = this.orderParams.orderMoneyFen;
                this.paymentTagger = !this.paymentTagger;
                this.next();
            }
        },
        
        //步骤提示
        next() {
          const self = this;
          if (self.active++ > 2) this.active = 0;
        },

        wxhandleClose(done) {
          this.$confirm('取消支付').then(_ => {
              done();
              if(this.orderParams.orderID){
                  this.$router.push('/rechargeRecord');
              }else{
                  this.$router.push('/personalcenter');
              }
            })
            .catch(_ => {});
        },

        alihandleClose(done) {
          this.$confirm('取消支付').then(_ => {
              done();
              if(this.orderParams.orderID){
                  this.$router.push('/rechargeRecord');
              }else{
                  this.$router.push('/personalcenter');
              }
            })
            .catch(_ => {});
        }

      },
      computed: {
          imgUrl(){
              return this.qrcodeurl;
          },
          orderMoneyFen() {
      　　　　return '   ￥ '+this.formRecharge.orderMoneyFen/100;
      　　}
      },

      watch: {
        // 计算属性的 getter
        orderMoneyFen(newValue, oldValue) {

          console.log(newValue);
          this.orderMoneyFenMessage = newValue;

        }
      },

      mounted() {
          const self = this;
          if(self.$route.query){
            this.judgeIsHistoryOrder(self.$route.query)
          }
       }
    }
</script>

<style>
.font_st{
  font-size: 22px;
  color: rgb(46, 71, 124);
  
}

.font_pay_parten{
    width: 50%;
    text-align: center;
}
.font_pay{
  font-size: 14px; 
  color: rgb(18, 18, 19)
}
.font_pay_fen{
  font-size: 32px;
  color: rgb(65, 67, 216);
  
}
</style>

