<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png">
    <el-form
        :rules="rules"
        :model="usr"
        :label-position="center"
        ref="loginForm"
        label-width="100px"
        style="max-width: 60vw;min-width: 40vw"
    >
      <el-form-item label="Name" prop="name">
        <el-input v-model="usr.name" placeholder="Enter your name"/>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="usr.password" placeholder="Enter your password" type="password" autocomplete="off"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loginForm()">
          登录
        </el-button>
        <el-button type="danger" @click="resetForm()">
          重置
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: "LoginView",
  data() {
    return {
      usr: {
        name: '',
        password: ''
      },
      rules: ({
        name: [
          {
            required: true,
            message: 'Please enter name first',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: 'Please enter your password first',
            trigger: 'change',
          },
          {
            min: 3,
            max: 15,
            message: 'Password length should be 3 to 15',
            trigger: 'blur'
          },
        ]
      }),
    }

  },
  methods: {
    resetForm() {
      this.usr.name = '';
      this.usr.password = '';
    },
    loginForm() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.$axios.post('student/login', this.$qs.stringify(this.usr)
          ).then((response) => {
            let userInfo = response.data;
            if (Object.keys(userInfo).length === 0) {
              alert('用户名或者密码错误!!!');
            } else {
              this.$setSessionStorage('usr', userInfo);
              this.$router.push({path: '/about'});
            }
          })
        }
      })
    }
  }
}
</script>


<style scoped>

</style>