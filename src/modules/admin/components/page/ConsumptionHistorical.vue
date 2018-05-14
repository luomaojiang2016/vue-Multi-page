<template>
  <div>
    <!-- <div>
      <el-select v-model="value" placeholder="请选择订单">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div> -->
    <el-table :data="dosageTable" style="width: 100%">
        <el-table-column prop="appServerID" label="ID" width="180">
        </el-table-column>
        <el-table-column prop="accountID" label="开发者ID" width="180">
        </el-table-column>
        <el-table-column prop="startDate" label="下单时间" width="180">
        </el-table-column>
        <el-table-column prop="endDate" label="结束时间" width="180">
        </el-table-column>
        <el-table-column prop="incByFen" label="消费金额">
        </el-table-column>
        <el-table-column prop="dosageType" label="消费方式" width="180">
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
                dosageTable: [],
                orderStatus: '',
                accountID: '',
                sortType:'startDate',
                isDesc: 1
            };
      },

      methods:{

        handleCurrentChange(val){
              if(this.currentPage != val){
                  this.currentPage = val;
                  this.getDosageList();
              }
          },

          //翻页
          handleSizeChange(val){
              if(this.pageSize != val){
                this.pageSize = val;
                this.getDosageList();
              }
          },

        async getDosageCount(){
            const accountID = this.accountID === '' ? 0 : this.accountID;
            try{
                const res = await api.getDosageCount(accountID);
                if(res.status === "OK"){
                  this.total = res.result;
                  await this.getDosageList();
                }
                if(res.status === "ERROR"){
                    commonfunc.doError(this, res.error);
                }

            }catch(errors){
                this.$message.error(errors.message);
            }
        },

        async getDosageList(){
          const accountID = this.accountID === '' ? 0 : this.accountID;
          const from = (this.currentPage-1)*this.pageSize;
          try{
              const res = await api.getDosageList(this.sortType, this.isDesc, from,this.pageSizes,accountID);
              if(res.status === "OK"){
                  this.dosageTable = res.result;
                  console.log(this.appsTable);
                  if(this.dosageTable.length>0){
                    for(let i =0; i<this.dosageTable.length; i++){
                        this.dosageTable[i]['startDate'] = this.formatDate(this.dosageTable[i]['startDate']);
                        this.dosageTable[i]['endDate'] = this.formatDate(this.dosageTable[i]['endDate']);
                        this.dosageTable[i]['incByFen'] = this.intToFloat(Math.abs((this.dosageTable[i]['incByFen']))/100) + ' 元';
                        
                        if(this.dosageTable[i]['dosageType'] === 1){
                            this.dosageTable[i]['dosageType'] = '音频上行';
                        }else if(this.dosageTable[i]['dosageType'] === 2){
                            this.dosageTable[i]['dosageType'] = '音频下行';
                        }else if(this.dosageTable[i]['dosageType'] === 3){
                            this.dosageTable[i]['dosageType'] = '视屏上行';
                        }else if(this.dosageTable[i]['dosageType'] === 4){
                            this.dosageTable[i]['dosageType'] = '视屏下行';
                        }else{
                          this.dosageTable[i]['dosageType'] = '其他';
                        }
                        
                    }
                  }
              }
              if(res.status === "ERROR"){
                  commonfunc.doError(this, res.error);
              }
          }catch(errors){
            this.$message.error(errors.message);
          }
        },

        formatDate(date) {
              return commonfunc.secToDate(date);
        },

        intToFloat(val){  
              return new Number(val).toFixed(2);
        }


      },

      mounted(){

        this.getDosageCount();
      }

    }
  </script>
