<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="视频单价配置" name="first">
        <el-form ref="VideoPrice" :model="VideoPrice" label-width="120px">
                <el-form-item>
                    <el-input v-model="VideoPrice.price" style="width:30%" size='small'>
                        <template slot="prepend">单价:</template>
                        <template slot="append">元 / 分钟</template>
                    </el-input>
                </el-form-item>  
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
    </el-tab-pane>
    <el-tab-pane label="音屏单价配置" name="second">
        <el-form ref="AudioPrice" :model="AudioPrice" label-width="120px">
                <el-form-item>
                    <el-input v-model="AudioPrice.price" style="width:30%" size='small'>
                        <template slot="prepend">单价:</template>
                         <template slot="append">元 / 分钟</template>
                    </el-input>
                </el-form-item>
                
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'first',
        VideoPrice: {},
        AudioPrice: {}
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>