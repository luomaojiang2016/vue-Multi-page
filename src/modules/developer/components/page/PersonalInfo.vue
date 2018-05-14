<template>
    <el-container>
        <el-header>个人信息</el-header>
        <el-container>
            <el-aside width="200px">
                <div class="touxiang"></div>
            </el-aside>
            <el-main>
                <el-form ref="form" :model="accountDesc" label-width="100px" style="width: 50%;" size="mini" :disabled="disableenabled">
                    <el-form-item label="公司">
                        <el-input v-model="accountDesc.company" ></el-input>
                    </el-form-item>
                    <el-form-item label="部门">
                        <el-input v-model="accountDesc.department" ></el-input>
                    </el-form-item>
                    <el-form-item label="职位">
                        <el-input v-model="accountDesc.position" ></el-input>
                    </el-form-item>
                    <el-form-item label="通信地址">
                        <el-input v-model="accountDesc.address" ></el-input>
                    </el-form-item>
                    <el-form-item label="邮编">
                        <el-input v-model="accountDesc.zipcode" ></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-button type="primary" @click="descModify">{{disablebutton}}</el-button>
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
                accountDesc: {
                    company: '',
                    department: '',
                    position: '',
                    address: '',
                    zipcode: ''
                },
                disableenabled: true,
                disablebutton: '修改'
            };
        },
        methods: {
            async getAccountInfo() {
                try {
                    const res = await api.getAccountInfo();
                    if (res.status === 'OK') {
                        if (!res.result.accountDesc) {
                            this.accountDesc = JSON.parse(res.result.accountDesc);
                        }
                        return;
                    }
                    commonfunc.doError(this, res.error);
                } catch (errors) {
                    this.$message.error(errors.message);
                }
            },
            modifyEmail() {
            },
            async descModify() {
                const self = this;
                self.disableenabled = !self.disableenabled;
                if (self.disableenabled) {
                    self.disablebutton = '修改'
                    try {
                        const parmats = {
                            accountDesc: JSON.stringify(this.accountDesc)
                        }
                        const res = await api.modifyAccountDesc(parmats);
                        if (res.status === 'OK') {
                            this.$message('修改个人信息成功！');
                        }
                        if (res.status === 'ERROR') {}
                    } catch (errors) {}
                } else {
                    self.disablebutton = '保存'
                }
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
        border: 1px solid rgb(151, 99, 99);
        background-color: rgb(63, 63, 102);
    }
</style>
