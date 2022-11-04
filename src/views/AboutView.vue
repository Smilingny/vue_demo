<template>
<!--  导航条-->
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
  >
    <el-menu-item index="0" >{{stuInfo.nameMessage}}</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1">
      <router-link to="/change" >修改信息</router-link>
    </el-menu-item>
    <el-menu-item index="2">
      <router-link to="/all" >全部信息</router-link>
    </el-menu-item>
  </el-menu>

<!--  卡片显示学生信息-->
  <el-card class="box-card">
  <template #header>
    <div class="card-header">
      <span>{{ stuInfo.nameMessage }}</span>
      <el-button class="button" text>{{stuInfo.idMessage}}</el-button>
    </div>
  </template>
    <div v-for="(value,key,index) in stuInfo" :key="index">
      {{info[index]}}:
      {{ value }}
    </div>
  </el-card>

</template>

<script>
import {getSessionStorage} from "@/Common";

export default {
  data (){
    return {
      info:[
        '学号',
        '姓名',
        '密码',
        '年龄'
      ],
      stuInfo: {
        idMessage: getSessionStorage('usr').id,
        nameMessage: getSessionStorage('usr').name,
        passwordMessage: getSessionStorage('usr').password,
        ageMessage: getSessionStorage('usr').age,
      }
    }
  }
}
</script>

<style>
a{
  text-decoration: none;
}


.flex-grow {
  flex-grow: 1;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.box-card {
  width: 300px;
  margin: 50px auto ;
}

</style>