<template>
  <div>
<!--    卡片效果展示学生基本信息-->
    <el-card class="box-card">
    <el-form
        :rules="rules"
        :model="usr"
        :label-position="center"
        ref="loginForm"
        label-width="80px">

<!--      使用element表单组件-->
      <el-form-item label="Name" prop="name">
        <el-input v-model="usr.name" placeholder="Enter your name" clearable/>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="usr.password" placeholder="Enter your password" type="password" autocomplete="off" clearable/>
      </el-form-item>
<!--      按钮绑定方法-->
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
// 引入element消息弹窗组件
import {ElMessage} from "element-plus";

export default {
  name: "LoginView",
  data() {
    return {
      usr: {
        name: '',
        password: ''
      },
      // 定义规则
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
    // 清空输入框内容
    resetForm() {
      this.usr.name = '';
      this.usr.password = '';
    },
    // 登录方法
    loginForm() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          // 使用axios进行http请求，利用qs进行传输对象的处理，使后端能正确接收并处理
          this.$axios.post('student/login', this.$qs.stringify(this.usr)
          ).then((response) => {
            // 后端返回数据存储在response.data里面
            let userInfo = response.data;
            // 判断返回数据是否为空，为空表示没有在数据库查询到信息，登录失败
            if (Object.keys(userInfo).length === 0) {
              // 使用element组件ElMessage提示信息
              ElMessage({
                    message: '账户名或密码错误',
                    type: 'error',
                    showClose: true,
                    grouping: true
                  },
                  // 登录失败则调用方法清空输入框内容
                  this.resetForm()
              );
            } else {
              // 登录成功则将登录用户的信息存储在SessionStorage中，然后进入关于信息页面
              this.$setSessionStorage('usr', userInfo);
              this.$router.push({path: '/about'});
            }
          })
        }
      })
    },
    // 注册方法，进入注册新用户信息页面
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