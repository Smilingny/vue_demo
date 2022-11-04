<template>
  <el-table
      :data="usr"
      height="250"
      width="80"
      stripe=true
      ref="getAll">
    <el-table-column prop="id" label="学号" width="180"/>
    <el-table-column prop="name" label="姓名" width="180"/>
    <el-table-column prop="age" label="年龄" width="180"/>
    <el-table-column prop="password" label="密码"/>
  </el-table>

  <el-select v-model="delId" clearable placeholder="Select">
    <el-option
        v-for="item in usr"
        :key="item.name"
        :label="item.id"
        :value="item.id"
    />
  </el-select>

  <el-button @click="deleteOne" type="danger" round>删除用户</el-button>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "AllView",
  data() {
    this.getAll()
    return {
      usr: '',
      delId: ''
    }
  },
  methods: {
    getAll() {
      this.$axios.get('/student/getall')
          .then((response) => {
            this.usr = response.data
            if (this.usr === null || this.usr.length === 0) {
              ElMessage({
                message: '获取失败',
                type: 'error'
              })
            } else {
              ElMessage({
                message: '获取成功',
                type: 'success',
                grouping: true
              })
            }
          })
    },
    deleteOne() {
      let aid = {id: this.delId}
      this.$axios.post('/student/delete', this.$qs.stringify(aid))
          .then((response) => {
            if (response.data === false) {
              ElMessage({
                message: '删除失败',
                type: 'error'
              })
            } else {
              ElMessage({
                message: '删除成功',
                type: 'success',
                grouping: true
              })
            }
          })
    }
  }
}

</script>

<style scoped>

</style>