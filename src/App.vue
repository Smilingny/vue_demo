<template>
  <div class="common-layout">
    <nav>
    <el-container class="Wrapper">
      <el-header class="Header" height="5vh">
        <el-row  align="middle" justify="center">
          <el-col :span="12">
              <router-link to="/">登录</router-link>
          </el-col>
          <el-col :span="12">
              <router-link to="/about">功能界面</router-link>
          </el-col>
        </el-row>
      </el-header>
      <el-main class="Main">
        <router-view/>
      </el-main>
      <el-footer class="Footer" height="4vh">Kirit© 版权所有 2022</el-footer>
    </el-container>
    </nav>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.Wrapper {
  height: 100%;
  width: 100%;
  display: flex;
}

.Header {
  position: fixed;
  top: 0;
  left: 0;
  /*display: flex;*/
  width: 100%;
  background-color: antiquewhite;
}

.Footer {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: aqua;
}
.el-row{
  height: 5vh;
}


</style>
