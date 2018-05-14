<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="accountID" size="small">
                <el-input v-model="form.accountID"></el-input>
            </el-form-item>
            <el-form-item label="appID" size="small">
                <el-input v-model="form.appID"></el-input>
            </el-form-item>
            <el-form-item label="appServerID" size="small">
                <el-input v-model="form.appServerID"></el-input>
            </el-form-item>
            <el-form-item label="logDate" size="small">
                <el-input v-model="form.logDate"></el-input>
            </el-form-item>
            <el-form-item label="loginJoinID" size="small">
                <el-input v-model="form.loginJoinID"></el-input>
            </el-form-item>
            <el-form-item label="roomID" size="small">
                <el-input v-model="form.roomID"></el-input>
            </el-form-item>
            <el-form-item label="type" size="small">
                <el-input v-model="form.type"></el-input>
            </el-form-item>
            <el-form-item label="userID" size="small">
                <el-input v-model="form.userID"></el-input>
            </el-form-item>
            <el-form-item label="data" size="small">
                <el-input v-model="form.data" type="textarea" :rows="5"></el-input>
            </el-form-item>
            生成数量
            <el-input v-model="number" placeholder="生成个数"></el-input>
            <el-button @click="onSubmit">生成在线数据</el-button>
        </el-form>
        <br>
        <br>
        <br>
        <el-form ref="form" :model="form1" label-width="80px">
            <el-form-item label="accountID" size="small">
                <el-input v-model="form1.accountID"></el-input>
            </el-form-item>
            <el-form-item label="appID" size="small">
                <el-input v-model="form1.appID"></el-input>
            </el-form-item>
            <el-form-item label="appServerID" size="small">
                <el-input v-model="form1.appServerID"></el-input>
            </el-form-item>
            <el-form-item label="logDate" size="small">
                <el-input v-model="form1.logDate"></el-input>
            </el-form-item>
            <el-form-item label="logAppServerID" size="small">
                <el-input v-model="form1.logAppServerID"></el-input>
            </el-form-item>
            <el-form-item label="roomID" size="small">
                <el-input v-model="form1.roomID"></el-input>
            </el-form-item>
            <el-form-item label="userID" size="small">
                <el-input v-model="form1.userID"></el-input>
            </el-form-item>
            <el-form-item label="data" size="small">
                <el-input v-model="form1.data" type="textarea" :rows="5"></el-input>
            </el-form-item>
            <el-form-item label="pinBaseInfo" size="small">
                <el-input v-model="form1.pinBaseInfo" type="textarea" :rows="6"></el-input>
            </el-form-item>
            <el-form-item label="pinMediaInfo" size="small">
                <el-input v-model="form1.pinMediaInfo" type="textarea" :rows="10"></el-input>
            </el-form-item>
            生成数量
            <el-input v-model="number1" placeholder="生成个数"></el-input>
            <el-button @click="onSubmit1">生成在线数据</el-button>
        </el-form>
    </div>
</template>

<script>
    import api from "../../api/api.js";
    import * as data from "../../../../test/Template";
    import commonfunc from "../../../../utils/commonfunc.js";
    export default {
        data() {
            return {
                form: data.loginjoin,
                number: 1000,
                form1: data.pinstats,
                number1: 1000
            };
        },
        methods: {
            handleCheckAllChange() {},
            async postloginjoinslog() {
                const self = this;
                try {
                    this.form.type = this.getType();
                    let yushu = this.number % 6;
                    if (yushu === 0) {
                        this.form.logDate = new Date().valueOf() / 1000 - 60 * 60 + Math.floor(Math.random() * 60 * 60);
                    } else if (yushu === 1) {
                        this.form.logDate = new Date().valueOf() / 1000 - 60 * 60 * 24 + Math.floor(Math.random() * 60 * 60 * 24);
                    } else if (yushu === 2) {
                        this.form.logDate = new Date().valueOf() / 1000 - 60 * 60 * 24 * 7 + Math.floor(Math.random() * 60 * 60 * 24 * 7);
                    } else if (yushu === 3) {
                        this.form.logDate = new Date().valueOf() / 1000 - 60 * 60 * 24 * 31 + Math.floor(Math.random() * 60 * 60 * 24 * 31);
                    } else if (yushu === 4) {
                        this.form.logDate = new Date().valueOf() / 1000 - 60 * 60 * 24 * 31 * 3 + Math.floor(Math.random() * 60 * 60 * 24 * 31 * 3);
                    } else if (yushu === 5) {
                        this.form.logDate = new Date().valueOf() / 1000 - 60 * 60 * 24 * 31 * 10 + Math.floor(Math.random() * 60 * 60 * 24 * 31 * 12);
                    }
                    this.form.logDate = Math.floor(this.form.logDate);
                    const res = await api.postloginjoinslog(this.form);
                    if (res.status === 'OK') {
                        if (this.number > 0) {
                            //   await commonfunc.sleep(1);
                            this.postloginjoinslog();
                            this.number = this.number - 1;
                            console.log(this.number);
                        }
                    }
                    if (res.status === 'ERROR') {
                        commonfunc.doError(self, res.error);
                    }
                } catch (errors) {
                    this.$message.error(errors.message);
                }
            },
            async postloginjoinslog1() {
                const self = this;
                try {
                    let yushu = this.number % 6;
                    if (yushu === 0) {
                        this.form.logDate = new Date().valueOf() / 1000 - 60 * 60 + Math.floor(Math.random() * 60 * 60);
                    } else if (yushu === 1) {
                        this.form.logDate = new Date().valueOf() / 1000 - 60 * 60 * 24 + Math.floor(Math.random() * 60 * 60 * 24);
                    } else if (yushu === 2) {
                        this.form.logDate = new Date().valueOf() / 1000 - 60 * 60 * 24 * 7 + Math.floor(Math.random() * 60 * 60 * 24 * 7);
                    } else if (yushu === 3) {
                        this.form.logDate = new Date().valueOf() / 1000 - 60 * 60 * 24 * 31 + Math.floor(Math.random() * 60 * 60 * 24 * 31);
                    } else if (yushu === 4) {
                        this.form.logDate = new Date().valueOf() / 1000 - 60 * 60 * 24 * 31 * 3 + Math.floor(Math.random() * 60 * 60 * 24 * 31 * 3);
                    } else if (yushu === 5) {
                        this.form.logDate = new Date().valueOf() / 1000 - 60 * 60 * 24 * 31 * 10 + Math.floor(Math.random() * 60 * 60 * 24 * 31 * 12);
                    }
                    this.form.logDate = Math.floor(this.form.logDate);
                    const res = await api.postloginjoinslog(this.form);
                    if (res.status === 'OK') {
                        if (this.number > 0) {
                            //   await commonfunc.sleep(1);
                            this.postloginjoinslog();
                            this.number = this.number - 1;
                            console.log(this.number);
                        }
                    }
                    if (res.status === 'ERROR') {
                        commonfunc.doError(self, res.error);
                    }
                } catch (errors) {
                    this.$message.error(errors.message);
                }
            },
            onSubmit() {
                this.postloginjoinslog();
            },
            onSubmit1() {
                let pinID = Math.floor(Math.random() * 100 + 1);
                let jsonPinBaseInfo = JSON.parse(this.form.pinBaseInfo);
                jsonPinBaseInfo.pinID = pinID;
                this.form.pinBaseInfo = JSON.stringify(jsonPinBaseInfo);
                //
                //this.postloginjoinslog();
            },
            getpinMediaInfo(md, i) {
                var Stats = JSON.parse(this.form.pinMediaInfo);
                if (Stats) {
                    for (var key in Stats.videoStats) {
                        if (Stats.videoStats[key].type === 'inboundrtp' && Stats.videoStats[key].bytesReceived > 0) {
                            if (md === 'inVedio') {
                                Stats.videoStats[key].type = 'inboundrtp';
                                let bytess = Math.floor(Math.random() * 1000 + 1000);
                                Stats.videoStats[key].bytesReceived = Stats.videoStats[key].bytesReceived + bytess * i;
                            } else if (md === 'outVedio') {
                                Stats.videoStats[key].type = 'outboundrtp';
                                let bytess = Math.floor(Math.random() * 1000 + 1000);
                                Stats.videoStats[key].bytesSent = Stats.videoStats[key].bytesReceived + bytess * i;
                                Stats.videoStats[key].bytesReceived = 0;
                            } else if (md === 'inAudio') {
                                Stats.videoStats[key].type = 'inboundrtp';
                                let bytess = Math.floor(Math.random() * 1000 + 1000);
                                Stats.videoStats[key].bytesReceived = Stats.videoStats[key].bytesReceived + bytess * i;
                                Stats.audioStats = Stats.vedioStats;
                                Stats.vedioStats = null;
                            } else if (md === 'outAudio') {
                                Stats.videoStats[key].type = 'outboundrtp';
                                let bytess = Math.floor(Math.random() * 1000 + 1000);
                                Stats.videoStats[key].bytesSent = Stats.videoStats[key].bytesReceived + bytess * i;
                                Stats.videoStats[key].bytesReceived = 0;
                                Stats.audioStats = Stats.vedioStats;
                                Stats.vedioStats = null;
                            }
                        }
                    }
                }
                return JSON.stringify(Stats);
            },
            getLogDate() {
                const now = new Date();
                let nowYear = now.getFullYear() /*+ Math.floor(Math.random() * 3)*/ ;
                let nowMonth = Math.floor(Math.random() * 12)
                // if (nowMonth > 12)
                //     nowMonth = nowMonth - 12;
                let nowDate = Math.floor(Math.random() * 31)
                // if (nowDate > 31)
                // nowDate = nowDate - 31;
                let nowHour = Math.floor(Math.random() * 23)
                console.log(nowHour)
                // if (nowHour > 23)
                //   nowHour = nowHour - 23;
                let nowMinite = Math.floor(Math.random() * 60)
                //if (nowMinite > 60)
                //  nowMinite = nowMinite - 60;
                return Math.floor(new Date(nowYear, 1, nowDate, nowHour, nowMinite, 5).valueOf() / 1000);
            },
            getType() {
                let t = Math.random();
                if (t > 0.5) {
                    return 'login'
                } else {
                    return 'join'
                }
            }
        },
        created() {
            console.log(data);
        }
    };
</script>

<style>

</style>