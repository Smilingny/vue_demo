<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <el-menu-item index="0" >{{nameMessage}}</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1">
      <router-link to="/change" >修改信息</router-link>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>Workspace</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
  </el-menu>

  <el-card class="box-card">
  <template #header>
    <div class="card-header">
      <span>{{ nameMessage }}</span>
      <el-button class="button" text>{{idMessage}}</el-button>
    </div>
  </template>
  <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
  </el-card>
</template>

<script>
import {getSessionStorage} from "@/Common";

export default {
  data (){
    return {
      nameMessage: getSessionStorage('usr').name,
      idMessage: getSessionStorage('usr').id,
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

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 500px;
  margin: 40px auto auto;
}
</style>