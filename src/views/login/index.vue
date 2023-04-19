<!--
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-04-17 22:03:53
 * @LastEditors: lcl
 * @LastEditTime: 2023-04-18 13:39:36
 * @Description: lcl
-->
<template>
  <div class="login flex-center">
    <div class="login-box">
      <el-form ref="form" :model="formData" label-width="80px" :rules="rules">
        <el-form-item label="账号" prop="count">
          <el-input v-model="formData.count" size="small"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="formData.password"
            size="small"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button size="small" type="primary" :loading="loading" @click.native.prevent="goLogin"
        >登录</el-button
      >
      <p>支持两种角色：admin; user</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const validatorCount = (rule, value, callback) => {
      if (!value) return callback(new Error('不能为空！'));
      return callback();
    };
    const validatorPassword = (rule, value, callback) => {
      if (!value) return callback(new Error('不能为空！'));
      return callback();
    };
    return {
      formData: {
        count: null || 'admin',
        password: null || 'admin',
        // count: null,
        // password: null,
      },
      loading: false,
      rules: {
        count: [
          {
            required: true,
            validator: validatorCount,
            trigger: 'blur',
          },
        ],

        password: [
          {
            required: true,
            validator: validatorPassword,
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    goLogin(e) {
      this.$refs.form.validate(value => {
        if (value) {
          this.loading = true;
          this.$store.dispatch('user/login', { ...this.formData }).then(res => {
            this.$router.push('/');
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  .login-box {
    width: 350px;
  }
}
</style>
