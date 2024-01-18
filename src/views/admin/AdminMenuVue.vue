<template>
  <div>
    <h5>后台管理系统</h5>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item class="item" index="/admin_home">
        <span class="iconfont">&#xe751;</span>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item class="item" index="/admin_user">
        <span class="iconfont">&#xe62d;</span>
        <span>用户管理</span>
      </el-menu-item>
      <el-menu-item class="item" index="/admin_log">
        <span class="iconfont">&#xea45;</span>
        <span>登录日志管理</span>
      </el-menu-item>
      <el-menu-item class="item" index="/admin_code">
        <span class="iconfont">&#xe624;</span>
        <span>验证码管理</span>
      </el-menu-item>
      <el-sub-menu class="item" index="'/admin_model">
        <template #title>
          <span class="iconfont">&#xe60f;</span>
          <span>模型管理</span>
        </template>
        <el-menu-item index="/admin_kb_list">知识库管理</el-menu-item>
        <el-menu-item index="/admin_file_list">文件管理</el-menu-item
        ><el-menu-item index="/admin_model_config">模型配置</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
@import "@/assets/css/iconfont.css";
h5 {
  height: 25px;
  font-size: 20px;
  font-weight: normal;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 15px;
  color: #fff;
}
.item {
  width: 200px;
  border-bottom: 1px solid #778490;
  border-right: 1px solid #778490;
}
.iconfont {
  margin-right: 15px;
  font-size: 20px;
}
</style>
