<template>
  <div>
    <!-- <div>
      <el-select v-model="value" placeholder="请选择订单">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div> -->
    <el-table :data="ordersTable" style="width: 100%">
        <el-table-column prop="orderID" label="订单号" width="80">
        </el-table-column>
        <el-table-column prop="createDate" label="下单时间" width="150">
        </el-table-column>
        <el-table-column prop="orderMoneyFen" align="right" label="订单金额[元]" width="120">
        </el-table-column>
        <el-table-column prop="orderStatus" label="订单状态" width="120">
        </el-table-column>
        <!-- <el-table-column prop="endDate" label="结束时间" width="150">
        </el-table-column> -->
        <el-table-column prop="payMethod" label="交易方式" width="100">
        </el-table-column>
        <el-table-column prop="transaction_id" label="交易号" width="180">
        </el-table-column>
        
        <el-table-column label="操作" align="center" width="200">
          <div slot-scope="scope" v-show="scope.row.vieworderStatus">
              <el-button type="primary" size="mini" icon="el-icon-delete" @click="cancel(scope.row)">取消</el-button>
              <el-button type="primary" size="mini" icon="el-icon-download" @click="payment(scope.row)">支付</el-button>
          </div>
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

    import api from "../../api/api.js";
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
          sortType: "createDate",
          isDesc: 1
          //value: ''
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
            try{
                const res = await api.getOrderList(from,this.pageSize,this.sortType,this.isDesc);
                if(res.status === 'OK'){
                  self.ordersTable = res.result;
                  
                  console.log(self.appsTable);
                  if(self.ordersTable.length>0){
                    for(let i =0; i<self.ordersTable.length; i++){
                        self.ordersTable[i]['createDate'] = self.formatDate(self.ordersTable[i]['createDate']);
                        this.ordersTable[i]['orderMoneyFen'] = this.intToFloat((this.ordersTable[i]['orderMoneyFen'])/100);

                        if((self.ordersTable[i]['payMethod'] === 0)||(self.ordersTable[i]['payMethod'] ===null)){
                          self.ordersTable[i]['payMethod'] = '';
                        }else if(self.ordersTable[i]['payMethod'] === 1){
                            self.ordersTable[i]['payMethod'] = '微信支付';
                        }else if(self.ordersTable[i]['payMethod'] === 2){
                            self.ordersTable[i]['payMethod'] = '支付宝支付';
                        }else if(self.ordersTable[i]['payMethod'] === 3){
                            self.ordersTable[i]['payMethod'] = '系统赠送';
                        }
                        
                        if((self.ordersTable[i]['orderStatus'] === 0)||(self.ordersTable[i]['orderStatus'] ===null)){
                          self.ordersTable[i]['orderStatus'] = '未支付';
                          self.ordersTable[i]['payMethod'] = '';
                          self.ordersTable[i]['vieworderStatus'] = true;
                        }else if(self.ordersTable[i]['orderStatus'] === 1){
                            self.ordersTable[i]['orderStatus'] = '已支付';
                            self.ordersTable[i]['vieworderStatus'] = false;
                        }else if(self.ordersTable[i]['orderStatus'] === 2){
                            self.ordersTable[i]['orderStatus'] = '取消订单';
                            self.ordersTable[i]['payMethod'] = '';
                            self.ordersTable[i]['vieworderStatus'] = false;
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
            try{
              const res = await api.getOrderCount();
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

          async cancel(row){
            const ok = await this.$confirm('是否删除订单', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            const orderID = Number(row.orderID);
            const res = await api.cancelOrder(orderID);
            console.log(res);
            if(res.status === "OK"){
                this.$message('取消订单成功！');
                this.getOrderCount();
            }
            if (res.status === 'ERROR') {
                commonfunc.doError(self, res.error);
            }
          },
          payment(row){
            this.$router.push({
              path: '/recharge', 

              query: {
                  orderID: row.orderID,
                  orderMoneyFen: row.orderMoneyFen, 
                  orderStatus:row.orderStatus
              }
          }) 
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
