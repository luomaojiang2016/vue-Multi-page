const v2errors = require("./v2errors");
export default {
    doError(self, error) {
        switch (error.name) {
            case v2errors.Param_accessToken_Error.name:
                self.$message.error(error.message);
                self.$router.push("/login");
                break;
            case 2:
                break;
            default:
                self.$message.error(error.message);
        }
    },

    secToDate(second) {
        const date = new Date(second * 1000);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },

    ipValidate(ip) {
        var val = /([0-9]{1,3}\.{1}){3}[0-9]{1,3}/;
        var vald = val.exec(ip);
        if (vald === null) {
            return false;
        }
        if (vald !== "") {
            if (vald[0] !== ip) {
                return false;
            }
        }
    },

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    success(res) {
        if ("result" in res) {
            return true;
        } else {
            return false;
        }
    },

    getInterval(count) {
        /* 默认坐标轴显示12个能达到最佳效果 */
        const theBest = 15;
        let interval = 0;
        if (count <= theBest) {
            return 0;
        }

        for (var i = 1; i < count; i++) {
            if (count / i > theBest && count / (i + 1) <= theBest) {
                interval = i + 1;
                break;
            }
        }

        return interval;
    },

    // 采集次数，每分钟采集一次
    getTimes(endDate, startDate) {
        const defTime = endDate - startDate;
        let times = 0;
        if (defTime <= 60 * 15) {
            times = 2;
        } else if (defTime <= 60 * 60) {
            times = 5 * 2;
        } else if (defTime <= 60 * 60 * 24) {
            times = 60 * 2;
        } else if (defTime <= 60 * 60 * 24 * 7) {
            times = 60 * 24 * 2;
        } else if (defTime <= 60 * 60 * 24 * 31) {
            times = 60 * 24 * 2;
        } else if (defTime <= 60 * 60 * 24 * 31) {
            times = 60 * 24 * 2;
        } else if (defTime <= 60 * 60 * 24 * 31 * 3) {
            times = 60 * 24 * 2;
        } else if (defTime <= 60 * 60 * 24 * 31 * 12) {
            times = 60 * 24 * 30 * 2;
        } else {
            times = times = 2;
        }
        return times;
    }
};
