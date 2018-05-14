<template>
  <div class="activation-warp">
   <div class="activation-title">{{ $t("activation.activationTitle") }}</div>
    <div class="activation-status">
      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('activation.activationOnline')" name="first">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">
            <el-form-item :label="$t('activation.activetionCode')" prop="onlinecode">
              <el-input v-model="ruleForm.onlinecode" style="width:80%" size='small' ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">{{ $t("activation.activetionsubmit") }}</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane :label="$t('activation.activetionoffline')" name="second">
          <el-form  label-width="80px" :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">
              <el-form-item :label="$t('activation.activetionCode')" prop="onlinecode">
                <el-input v-model="ruleForm.onlinecode" style="width:80%" size='small' ></el-input>
              </el-form-item>
              <el-form-item v-show="primary==0">
                <el-button type="primary" @click="submitForm('ruleForm')">{{ $t("activation.activetionGenerate") }}</el-button>
              </el-form-item>
              <el-form-item v-show="primary!=0">
                <el-button type="primary" @click="updata" :disabled="disabled">{{$t('activation.downFile')}}</el-button>
              </el-form-item>
            </el-form>
            <div  v-show=show style="margin-left: 10px;">
              <el-form-item :label="$t('activation.actibetionSelect')" prop="onlinecode">
                <input  type="file" style="width:55%" id="input"></input>
                <el-button type="primary" @click="submit">{{ $t("activation.activetionOfflineSubmit") }}</el-button>
              </el-form-item>
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import api from '../../api/api.js'
  import commonfunc from "../../../../utils/commonfunc.js"

    export default {
        data() {
          return {
            activeName:'first',
            show:false,
            primary:0,
            data:'',
            updateInfo:'',
            disabled:false,
            ruleForm: {
              onlinecode: '',
            },
            rules: {
              onlinecode: [
                { required: true, message: this.$t('activation.activetionPrompt'), trigger: 'blur' },
              ],
            }
          };
      },
      methods: {
        submitForm(formName) {
          const self = this;
          self.$refs[formName].validate((valid) => {
              if (valid) {
                self.onActivationCodeOnline();
              } else {
                return false;
              }
            });
        },
        async onActivationCodeOnline(){
              const self = this;
          try{
              if(self.activeName =="first"){
                var res = await api.activationCodeOnline({
                      sn:self.ruleForm.onlinecode
                });
                if(res.status === 'OK'){
                  if(res.result == 0){
                    self.$router.push('/activationsuccess');
                    setTimeout(function(){
                      self.$router.replace('/servermanage');
                    },2000)
                  }else{
                    self.$router.push({
                      path: '/activationno',
                      query: {
                        error:res.result
                      }
                    });
                    setTimeout(function(){
                      self.$router.replace('/activation');
                    },2000)
                  }
                  self.ruleForm.onlinecode = ''
                }
                if (res.status === 'ERROR') {
                  commonfunc.doError(self, res.error);
                }
              }else if(self.activeName =="second"){
                var sn = self.ruleForm.onlinecode;
                var res = await api.activationCodeOffline(sn);
                if(res.status === 'OK'){
                  if(typeof res.result == "string"){
                    self.primary=1;
                    self.data = res.result;
                  }else if(typeof res.result != "string"){
                    alert( this.$t('activation.activetionString')+res.result)
                  }
                }
                if (res.status === 'ERROR') {
                  commonfunc.doError(self, res.error);
                }
               }
            }catch (errors) {
                self.$message.error(errors.message);
             }
          },
          submit(){
              const self = this;
              self.readText();
            },
          async onActivationCodeOffline(){
              const self = this;
              try{
                const updateInfo = sessionStorage.getItem('adminUpdateInfo');
                const res = await api.activationOffline({
                  updateInfo:updateInfo
                });
                if(res.status === 'OK'){
                  if(res.result == 0){
                    self.$router.push('/activationsuccess');
                    setTimeout(function(){
                      self.$router.replace('/servermanage');          
                      sessionStorage.removeItem('adminUpdateInfo');
                    },2000)
                  }else{
                    self.$router.push({
                      path: '/activationno',
                      query: {
                        error:res.result
                      }
                    });
                    setTimeout(function(){
                      self.$router.replace('/activation');
                    },2000)
                  }
                }
                if (res.status === 'ERROR') {
                  commonfunc.doError(self, res.error);
                }
              }catch(errors){
                self.$message.error(errors.message);
              }
          },
          updata(){
                const self = this;
                self.disabled=true;
                self.show = true;
                self.ruleForm.onlinecode = ''
                const outdata =this.data;
                self.dataToTxt("离线文件", outdata);
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
            readText(){
              const self = this;
              var input = document.getElementById('input');
              var file = input.files[0];
              if(file === undefined){
                  alert(this.$t('activation.activetionUpdata'))
                  return
              }
              var filename = file.name.split(".")[0];
              var reader = new FileReader();
              reader.onload = function() {
                var result = this.result;
                var text = result.replace(/\s/g,"");
                sessionStorage.setItem("adminUpdateInfo",text)
              }
              reader.readAsText(file);
              setTimeout(function(){
                self.onActivationCodeOffline()
              },2000)
            }
        }
    }
</script>

<style scoped>
  .activation-warp{
    position:relative;
    width:100%;
    height:100%;
  }
  .activation-title {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-size: 30px;
  }
  .activation-status {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 260px;
    margin: -170px 0 0 -190px;
    padding:  10px 40px;
    border-radius: 5px;
    border: 1px solid #ddd;
  }
  .activation-status .el-button{
    padding:7px 11px;
  }
  .return{
    position: absolute;
    width: 300px;
    height: 50px;
    line-height: 50px;
    left: 50%;
    top: 30%;
    text-align: center;
    transform: translate(-50%,-50%);
    background-color: #fef0f0;
    color: #f56c6c;
    border-radius: 5px;
  }
</style>
