<template>
  <div>
    <el-card class="box-card">
    <el-form
        :rules="rules"
        :model="usr"
        :label-position="center"
        ref="loginForm"
        label-width="80px">
<!--        style="max-width: 60vw;min-width: 20vw"-->
<!--    >-->
      <el-form-item label="Name" prop="name">
        <el-input v-model="usr.name" placeholder="Enter your name" clearable/>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="usr.password" placeholder="Enter your password" type="password" autocomplete="off" clearable/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loginForm()">
          登录
        </el-button>
        <el-button type="danger" @click="resetForm()">
          重置
        </el-button>
        <el-button type="info" @click="registerForm()">
          注册
        </el-button>
      </el-form-item>
    </el-form>
    </el-card>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";

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
              ElMessage({
                    message: '账户名或密码错误',
                    type: 'error',
                    showClose: true,
                    grouping: true
                  },
                  this.resetForm()
              );
            } else {
              this.$setSessionStorage('usr', userInfo);
              this.$router.push({path: '/about'});
            }
          })
        }
      })
    },
    registerForm(){
      this.$router.push({path: '/register'})
    }
  }
}
</script>

<style>
.box-card {
  width: 400px;
  margin: 50px auto ;
  padding: 20px 10px;
}
</style>