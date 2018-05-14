<template>
  <div>
    <el-table :data="dosageTable" style="width: 100%">
        <el-table-column prop="startDate" label="开始时间">
        </el-table-column>
        <el-table-column prop="endDate" label="结束时间">
        </el-table-column>
        <el-table-column prop="minutes" label="时长[min]">
        </el-table-column>
        <el-table-column prop="incByFen" align="right" label="消费金额">
        </el-table-column>
        <el-table-column prop="dosageType" label="消费方式">
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
          dosageTable: [],
          orderStatus: '',
          sortType: "startDate",
          isDesc: 1
          //value: ''
        }
      },

       methods: {
      
          handleCurrentChange(val){
              const self = this;
              if(self.currentPage != val){
                  self.currentPage = val;
                  self.getDosageList();
              }
          },

          //翻页
          handleSizeChange(val){
              const self = this;
              if(self.pageSize != val){
                self.pageSize = val;
                self.getDosageList();
              }
          },

          async getDosageList(){
            const self = this;
            const from = (self.currentPage-1)*self.pageSize;
            try{
                const res = await api.getDosageList(from,this.pageSize,this.sortType,this.isDesc);
                if(res.status === 'OK'){
                  self.dosageTable = res.result;
                  
                  console.log(self.dosageTable);
                  if(self.dosageTable.length>0){
                    for(let i =0; i<self.dosageTable.length; i++){
                        
                        self.dosageTable[i]['startDate'] = self.formatDate(self.dosageTable[i]['startDate']);
                        self.dosageTable[i]['endDate'] = self.formatDate(self.dosageTable[i]['endDate']);
                        this.dosageTable[i]['incByFen'] = this.intToFloat(Math.abs((this.dosageTable[i]['incByFen']))/100) + ' 元';
                        if(self.dosageTable[i]['dosageType'] === 1){
                            self.dosageTable[i]['dosageType'] = '音频上行';
                        }else if(self.dosageTable[i]['dosageType'] === 2){
                            self.dosageTable[i]['dosageType'] = '音频下行';
                        }else if(self.dosageTable[i]['dosageType'] === 3){
                            self.dosageTable[i]['dosageType'] = '视屏上行';
                        }else if(self.dosageTable[i]['dosageType'] === 4){
                            self.dosageTable[i]['dosageType'] = '视屏下行';
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
          
          async getDosageCount(){
            const self = this;
            try{
              const res = await api.getDosageCount();
              if(res.status === 'OK'){
                self.total = res.result;
                await self.getDosageList();
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
          self.getDosageCount();
       }


    }
  </script>

<style>
  .button {
      text-align: left;
  }
  .demo-table-expand {
      font-size: 0;
  }
  .demo-table-expand label {
      width: 120px;
      color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
  }
</style>