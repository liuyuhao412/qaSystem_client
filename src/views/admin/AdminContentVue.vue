<template>
  <div>
    <div class="header">
      <el-button type="primary" plain class="header_btn" @click="exit"
        >退出</el-button
      >
      <div class="text">超级管理员</div>
    </div>
    <div>
      <router-view></router-view>
    </div>
    <div class="bottom">
      <div class="bottom_text">
        Copyright © 知识问答系统 本系统为毕业设计所做，仅供学习参考
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
const router = useRouter();

const exit = () => {
  ElMessageBox.confirm("您确认要退出吗？", "提示", {
    cancelButtonText: "取消",
    confirmButtonText: "确认",
    type: "warning",
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "退出成功",
        duration: 1000,
      });
      setTimeout(() => {
        router.push({ path: "/login" });
      }, 1000);
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消退出",
        duration: 1000,
      });
    });
};
</script>

<style scoped>
.header {
  height: 55px;
  background-color: #7fadb6;
}
.text {
  float: right;
  height: 55px;
  line-height: 55px;
  margin-right: 20px;
}
.header_btn {
  float: right;
  width: 60px;
  height: 35px;
  margin-top: 10px;
  margin-right: 20px;
}
.bottom {
  height: 20px;
  padding-left: 20px;
  padding-bottom: 5px;
  position: fixed;
  bottom: 0;
}
.bottom_text {
  font-size: 15px;
}
</style>
