<template>
  <div>
    <!-- <div>
      <el-select v-model="value" placeholder="请选择订单">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div> -->
    <el-table :data="ordersTable" style="width: 100%">
        <el-table-column prop="orderID" label="ID" width="120">
        </el-table-column>
        <el-table-column prop="accountID" label="开发者ID" width="100">
        </el-table-column>
        <el-table-column prop="createDate" label="下单时间" width="160">
        </el-table-column>
        <el-table-column prop="orderMoneyFen" align="right" label="订单金额[元]" width="120">
        </el-table-column>
        <el-table-column prop="orderStatus" label="订单状态" width="120">
        </el-table-column>
        <el-table-column prop="endDate" label="结束时间" width="160">
        </el-table-column>
        <el-table-column prop="payMethod" label="订单类型" width="120">
        </el-table-column>
      </el-table>

      <div style="margin: 10px;"></div>
      <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" background layout="prev, pager, next" :total="total">
          </el-pagination>
      </div>
      
</div>
</template>

<script>

    import api from '../../api/api.js'
    import commonfunc from "../../../../utils/commonfunc.js";

    export default {
      data() {
        return {
          total: 0, //总数
          currentPage: 1, //当前页
          pageSizes: this.pageSizes,
          pageSize: this.pageSizes[0],
          ordersTable: [],
          orderStatus: '',
          value: '',
          accountID:'',
          sortType: 'createDate',
          isDesc: 1,
          options:[{
                value: 'all',
                label: '全部订单'
              }, {
                value: 'ChatPay',
                label: '微信支付'
              }, {
                value: 'Alipay',
                label: '支付宝支付'
              }]
        }
      },

       methods: {
      
          handleCurrentChange(val){
              const self = this;
              if(self.currentPage != val){
                  self.currentPage = val;
                  self.getOrderList();
              }
          },

          //翻页
          handleSizeChange(val){
              const self = this;
              if(self.pageSize != val){
                self.pageSize = val;
                self.getOrderList();
              }
          },

          async getOrderList(){
            const self = this;
            const from = (self.currentPage-1)*self.pageSize;
            const accountID = self.accountID === '' ? 0 : self.accountID;
            try{
                const res = await api.getOrderList(this.sortType, this.isDesc, from,this.pageSize,accountID);
                if(res.status === 'OK'){
                  self.ordersTable = res.result;
                  
                  console.log(self.appsTable);
                  if(self.ordersTable.length>0){
                    for(let i =0; i<self.ordersTable.length; i++){
                        self.ordersTable[i]['createDate'] = self.formatDate(self.ordersTable[i]['createDate']);
                        self.ordersTable[i]['orderMoneyFen'] = this.intToFloat((self.ordersTable[i]['orderMoneyFen'])/100);
                        if(self.ordersTable[i]['endDate']){
                            self.ordersTable[i]['endDate'] = self.formatDate(self.ordersTable[i]['endDate']);
                        }
                        
                        
                        if((self.ordersTable[i]['orderStatus'] === 0)||(self.ordersTable[i]['orderStatus'] ===null)){
                          self.ordersTable[i]['orderStatus'] = '未支付';
                        }else if(self.ordersTable[i]['orderStatus'] === 1){
                            self.ordersTable[i]['orderStatus'] = '已支付';
                        }else if(self.ordersTable[i]['orderStatus'] === 2){
                            self.ordersTable[i]['orderStatus'] = '取消订单';
                        }else{
                            self.ordersTable[i]['orderStatus'] = '其他';
                        }
                        if((self.ordersTable[i]['payMethod'] === 0)||(self.ordersTable[i]['payMethod'] ===null)){
                          self.ordersTable[i]['payMethod'] = '已取消';
                        }else if(self.ordersTable[i]['payMethod'] === 1){
                            self.ordersTable[i]['payMethod'] = '微信订单';
                        }else if(self.ordersTable[i]['payMethod'] === 2){
                            self.ordersTable[i]['payMethod'] = '支付宝订单';
                        }else if(self.ordersTable[i]['payMethod'] === 3){
                            self.ordersTable[i]['payMethod'] = '系统赠送';
                        }
                        
                    }
                  }
                }
                if (res.status === 'ERROR') {
                    commonfunc.doError(self, res.error);
                }
            }catch(errors){
                self.$message.error(errors.message);
            }
          },
          
          async getOrderCount(){
            const self = this;
             const accountID = self.accountID === '' ? 0 : self.accountID;
            try{
              const res = await api.getOrderCount(accountID);
              if(res.status === 'OK'){
                self.total = res.result;
                await self.getOrderList();
              }
              if(res.status === 'ERROR'){
                commonfunc.doError(self, res.error);
              }

            }catch(errors){
              self.$message.error(errors.message);
            }
          },

          formatDate(date) {
              return commonfunc.secToDate(date);
          },

          intToFloat(val){  
              return new Number(val).toFixed(2);
          }


       },
       
       mounted() {
          const self = this;
          self.getOrderCount();
       }


    }
  </script>
