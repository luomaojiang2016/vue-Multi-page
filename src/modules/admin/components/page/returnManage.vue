<template>
	<div>
		<table>
			<tr>
				<td>{{$t('returnManage.activetionCode')}}</td>
				<td>{{sn}}</td>
				<td>{{$t('returnManage.controlType')}}</td>
				<td>{{controlType}}</td>
			</tr>
			<tr>
				<td>{{$t('returnManage.activateDate')}}</td>
				<td>{{activateData}}</td>
				<td>{{$t('returnManage.lastUpdateDate')}}</td>
				<td>{{data}}</td>
			</tr>
			<tr>
				<td>{{$t('returnManage.activetionStatus')}}</td>
				<td><i class="el-icon-success"></i> {{$t('returnManage.activetionHas')}}</td>
				<td></td>
				<td></td>
			</tr>
		</table>
		<el-button @click="onlinereturn" :disabled="online">{{$t('returnManage.onlineReturn')}}</el-button>
		<el-button @click="offlinereturn" :disabled="offline">{{$t('returnManage.offlineReturn')}}</el-button>
		<el-button @click="updatafile" :disabled="offlinefile" v-show="updataFile">{{$t('returnManage.updatafile')}}</el-button>
		<div v-show=success class="return">{{$t('returnManage.returnSuccess')}}</div>
		<div v-show=fail class="return">{{$t('returnManage.returnFail')}}{{$t('activation.activettionErrorCode')}}{{code}}</div>
	</div>
</template>

<script>
	import api from '../../api/api.js'
	import commonfunc from "../../../../utils/commonfunc.js"
	export default {
		data() {
			return {
				success: false,
				fail: false,
				online: false,
				offline: false,
				offlinefile: false,
				data: '',
				sn: '',
				activateData: '',
				volume: '',
				controlType: '',
				code: '',
				updataFile: false
			}
		},
		methods: {
			onlinereturn() {
				const self = this;
				self.OnlineReturn()
			},
			offlinereturn() {
				const self = this;
				self.offline = true;
				self.updataFile = true;
			},
			updatafile() {
				const self = this;
				self.OfflineReturn()
			},
			async OnlineReturn() {
				const self = this;
				try {
					const res = await api.activationReturn({});
					if (res.status === 'OK') {
						if (res.result === 0) {
							self.success = true;
							self.online = true;
							setTimeout(function() {
								self.success = false;
								self.$router.push('/activation');
							}, 2000)
						} else {
							self.fail = true;
							setTimeout(function() {
								self.code = res.result;
								self.fail = false;
							}, 2000)
						}
					}
					if (res.status === 'ERROR') {
						commonfunc.doError(self, res.error);
					}
				} catch (errors) {
					self.$message.error(errors.message);
				}
			},
			async OfflineReturn() {
				const self = this;
				try {
					const res = await api.activationReturnOffline();
					if (res.status === 'OK') {
						if (typeof res.result == "string") {
							self.success = true;
							const outdata = res.result;
							self.dataToTxt('离线文件', outdata);
							self.offlinefile = true;
							setTimeout(function() {
								self.success = false;
								self.$router.push('/activation');
							}, 2000)
						} else {
							self.fail = true;
							self.code = res.result;
							setTimeout(function() {
								self.fail = false;
							}, 2000)
						}
					}
					if (res.status === 'ERROR') {
						commonfunc.doError(self, res.error);
					}
				} catch (errors) {
					self.$message.error(errors.message);
				}
			},
			async dogInfo() {
				const self = this;
				try {
					const data = await api.activationCode();
					if (data.result.sn != "" && data.result.code === 0) {
						this.data = data.result.lastUpdateDate;
						this.sn = data.result.sn;
						this.activateData = data.result.activateDate;
						this.volume = data.result.volumeNumber;
						this.controlType = data.result.controlType;
					} else {
						self.$router.push('/activation');
					}
				} catch (errors) {
					self.$message.error(errors.message);
				}
			},
			dataToTxt(name, outdata) {
				let content = new Blob([outdata])
				//生成url对象
				let urlObject = window.URL || window.webkitURL || window
				let url = urlObject.createObjectURL(content)
				//生成<a></a>DOM元素
				let el = document.createElement('a')
				//链接赋值
				el.href = url
				el.download = name + ".req"
				//必须点击否则不会下载
				el.click();
				//移除链接释放资源
				urlObject.revokeObjectURL(url)
			},
		},
		mounted() {
			this.dogInfo();
		}
	}
</script>

<style scoped>
	table {
		width: 100%;
		border: 1px solid #ddd;
		margin-bottom: 20px;
		text-align: center;
		border-radius: 5px;
		color: #606266
	}
	table tr {
		width: 25%;
		height: 40px;
	}
	.return {
		position: absolute;
		width: 300px;
		height: 50px;
		line-height: 50px;
		left: 50%;
		top: 30%;
		text-align: center;
		transform: translate(-50%, -50%);
		background-color: #fef0f0;
		color: #f56c6c;
		border-radius: 5px;
		;
	}
</style>
