<template>
  <el-form
      ref="registerForm"
      :model="usr"
      status-icon
      :rules="rules"
      label-width="80px"
      class="demo-ruleForm"
  >
    <el-form-item label="Name" prop="name">
      <el-input v-model="usr.name" clearable/>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input
          v-model="usr.password"
          type="password"
          autocomplete="off"
          clearable
      />
    </el-form-item>
    <el-form-item label="Age" prop="age">
      <el-input v-model.number="usr.age" oninput="value=value.replace(/[^0-9.]/g,'')"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="registerForm">提交注册</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "RegisterView",
  data() {
    return {
      usr: {
        name: '',
        password: '',
        age: '',
      },
      rules: ({
        name: [
          {
            required: true,
            message: 'Enter your name',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: 'Enter your password',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 15,
            message: 'Password length must be 3 to 15'
          }
        ],
        age: [
          {
            required: true,
            message: 'Enter your age'
          }
        ]
      })
    }
  },
  methods:{
    resetForm(){
      this.usr.name = '';
      this.usr.password = '';
      this.usr.age = ''
    },
    registerForm(){
      this.$refs.registerForm.validate(async (valid) =>{
        if (valid) {
          this.$axios.post('student/register',this.$qs.stringify(this.usr))
              .then((response) =>{
                let userInfo=response.data;
                if (Object.keys(userInfo).length === 0) {
                  ElMessage({
                    message: '注册失败',
                    type: 'error',
                    showClose: true
                  })
                }else{
                  this.$setSessionStorage('usr', userInfo);
                  ElMessage({
                    message: '注册成功',
                    type: 'success',
                    showClose: true
                  })
                }
              })
        }
      })
    }
  }
}
</script>