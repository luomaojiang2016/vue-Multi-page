<template>
    <div v-if="developersTable!=''">
        <el-table :data="developersTable" style="width: 100%" size="medium">
            <el-table-column :label="$t('developerManage.labelEmail')" prop="email">
            </el-table-column>
            <el-table-column :label="$t('developerManage.labelLoginTimes')" prop="loginTimes">
            </el-table-column>
            <el-table-column :label="$t('developerManage.labelLastLoginDate')" prop="lastLoginDate">
            </el-table-column>
            <el-table-column label="余额[元]" prop="moneyRemainFen">
            </el-table-column>
            <el-table-column label="操作">
                <div slot-scope="scope">
                    <el-button type="primary" size="mini" icon="el-icon-time" @click="showGiveMoneyToAccount(scope.row)">赠送试用金额</el-button>
                </div>
            </el-table-column>
            <el-table-column type="expand">
                <div slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item :label="$t('developerManage.labelAccountId')">
                            <span>{{ props.row.accountID }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('developerManage.labelAccountName')">
                            <span>{{ props.row.accountName }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('developerManage.labelEmail')">
                            <span>{{ props.row.email }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('developerManage.labelMobile')">
                            <span>{{ props.row.mobile }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('developerManage.labelRegisterDate')">
                            <span>{{ props.row.registerDate }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('developerManage.labelLoginTimes')">
                            <span>{{ props.row.loginTimes }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('developerManage.labelLastLoginDate')">
                            <span>{{ props.row.lastLoginDate }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('developerManage.labelAccountDesc')">
                            <span>{{ props.row.accountDesc }}</span>
                        </el-form-item>
                    </el-form>
                </div>
            </el-table-column>
        </el-table>
        <el-dialog title="赠送使用金额" :visible.sync="AliPaydialogVisible" width="50%">
                <el-form ref="giveMoneyToAccountForm" :model="giveMoneyToAccountForm" label-width="120px">
                        <el-form-item>
                            <el-input v-model="giveMoneyToAccountForm.email" disabled="true" style="width:80%" size='small'>
                                <template slot="prepend">用户邮箱 :</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="giveMoneyToAccountForm.orderMoneyFen" style="width:80%" size='small'>
                                <template slot="prepend">充值金额[元]:</template>
                            </el-input>
                        </el-form-item>  
                        <el-form-item>
                            <el-button type="primary" @click="giveMoneyToAccount">保存</el-button>
                            <el-button @click="cancelMoneyToAccount">取消</el-button>
                        </el-form-item>
                    </el-form>
            </el-dialog>
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
                //每页数
                pageSize: this.pageSizes[0],
                developersTable: "",
                AliPaydialogVisible:false,
                giveMoneyToAccountForm:{},
                sortType: 'lastLoginDate',
                isDesc: 1
            };
        },
        methods: {
            handleSizeChange(val) {
                const self = this;
                if (self.pageSize !== val) {
                    self.pageSize = val;
                    self.getDeveloperList();
                }
                //
            },
            //翻页
            handleCurrentChange(val) {
                const self = this;
                if (self.currentPage !== val) {
                    self.currentPage = val;
                    self.getDeveloperList();
                }
            },
            async getDeveloperList() {
                const self = this;
                const from = (self.currentPage - 1) * self.pageSize;
                try {
                    const res = await api.getDeveloperList(from, this.pageSize, this.sortType, this.isDesc);
                    if (res.status === 'OK') {
                        self.developersTable = res.result;
                        if (self.developersTable.length > 0) {
                            for (var i = 0; i < self.developersTable.length; i++) {
                                self.developersTable[i].registerDate = self.formatDate(self.developersTable[i].registerDate);
                                self.developersTable[i].lastLoginDate = self.formatDate(self.developersTable[i].lastLoginDate);
                                self.developersTable[i].moneyRemainFen = (self.developersTable[i].moneyRemainFen)/100;
                                
                            }
                        }
                    }
                    if (res.status === 'ERROR') {
                        commonfunc.doError(self, res.error);
                    }
                } catch (errors) {
                    self.$message.error(errors.message);
                }
            },
            //按分页获取app列表
            async getDeveloperData() {
                const self = this;
                try {
                    const res = await api.getDeveloperCount();
                    if (res.status === 'OK') {
                        self.total = res.result;
                        self.getDeveloperList();
                    }
                    if (res.status === 'ERROR') {
                        commonfunc.doError(self, res.error);
                    }
                } catch (errors) {
                    self.$message.error(errors.message);
                }
            },
            
            async showGiveMoneyToAccount(row){
                this.AliPaydialogVisible = true;
                this.giveMoneyToAccountForm.accountID = row.accountID;
                this.giveMoneyToAccountForm.email = row.email;
                this.giveMoneyToAccountForm.orderMoneyFen = 0;
            },
            cancelMoneyToAccount(){
                this.AliPaydialogVisible = false;
                this.giveMoneyToAccountForm.orderMoneyFen = 0;
            },

            async giveMoneyToAccount(){
                
                const params = {
                    accountID : this.giveMoneyToAccountForm.accountID,
                    orderMoneyFen :Math.abs(this.giveMoneyToAccountForm.orderMoneyFen)*100,
                }
                try{
                    const res = await api.giveMoneyToAccount(params);
                    if(res.status === "OK"){
                        this.$message("赠送金额成功");
                        this.AliPaydialogVisible = false;
                        this.getDeveloperData();
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
            }
        },
        created() {
            const self = this;
            self.getDeveloperData();
        }
    };
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