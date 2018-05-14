<template>
    <div >
        <el-table :data="appsTable" style="width: 100%" size="medium">
            <el-table-column :label="$t('appManage.labelAppId')" prop="appID">
            </el-table-column>
            <el-table-column :label="$t('appManage.labelAppName')" prop="appName">
            </el-table-column>
            <el-table-column :label="$t('appManage.labelOnlineNumber')" prop="joinUserCount">
            </el-table-column>
            <el-table-column :label="$t('appManage.labelCreateDate')" prop="createDate">
            </el-table-column>
            <el-table-column type="expand">
                <div slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item :label="$t('appManage.labelAppId')">
                            <span>{{ props.row.appID }}</span>
                        </el-form-item>
                           <el-form-item :label="$t('appManage.labelAppName')">
                            <span>{{ props.row.appName }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('appManage.labelAccountId')">
                            <span>{{ props.row.accountID }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('appManage.labelAccontName')">
                            <span>{{ props.row.accountName }}</span>
                        </el-form-item>  
                        <el-form-item :label="$t('appManage.labelOnlineNumber')">
                            <span>{{ props.row.joinUserCount }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('appManage.labelAppSecret')">
                            <span>{{ props.row.appSecret }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('appManage.labelAppDesc')">
                            <span>{{ props.row.appDesc }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('appManage.labelCreateDate')">
                            <span>{{ props.row.createDate }}</span>
                        </el-form-item>
                    </el-form>
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
                appsTable: [],
                sortType: 'createDate',
                isDesc: 1
            };
        },
        methods: {
            handleSizeChange(val) {
                const self = this;
                if (self.pageSize !== val) {
                    self.pageSize = val;
                    self.getAppList();
                }
            },
            //翻页
            handleCurrentChange(val) {
                const self = this;
                if (self.currentPage !== val) {
                    self.currentPage = val;
                    self.getAppList();
                }
            },
            async getAppList() {
                const self = this;
                const from = (self.currentPage - 1) * self.pageSize;
                try {
                    const res = await api.getAppList(0, this.sortType, this.isDesc, from, this.pageSize);
                    if (res.status === 'OK') {
                        self.appsTable = res.result;
                        console.log(self.appsTable)
                        if (self.appsTable.length > 0) {
                            for (var i = 0; i < self.appsTable.length; i++) {
                                self.appsTable[i].createDate = self.formatDate(self.appsTable[i].createDate);
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
            async getAppData() {
                const self = this;
                try {
                    const res = await api.getAppCount(0);
                    if (res.status === 'OK') {
                        self.total = res.result;
                        self.getAppList();
                    }
                    if (res.status === 'ERROR') {
                        commonfunc.doError(self, res.error);
                    }
                } catch (errors) {
                    self.$message.error(errors.message);
                }
            },
            formatDate(date) {
                return commonfunc.secToDate(date);
            }
        },
        mounted() {
            const self = this;
            self.getAppData();
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