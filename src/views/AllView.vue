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

  <el-select v-model="delId" clearable placeholder="选择需要删除的用户">
    <el-option
        v-for="item in usr"
        :key="item.name"
        :label="item.name"
        :value="item.id"
    />
  </el-select>
  <el-button v-if="delId === ''" type="danger" disabled>删除用户</el-button>
  <el-button v-if="delId !== ''" @click="centerDialogVisible = true" type="danger" >删除用户</el-button>
  <el-dialog
      v-model="centerDialogVisible"
      title="提示"
      width="30%"
      align-center
  >
    <span>确认删除用户？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="deleteOne">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script >
import {ElMessage} from "element-plus";

export default {
  name: "AllView",
  data() {
    this.getAll()
    return {
      centerDialogVisible: false,
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
      this.centerDialogVisible = false
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
              this.getAll()
            }
          })
    }
  }
}

</script>

<style scoped>

</style>