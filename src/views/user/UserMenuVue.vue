<template>
    <div>
      <h5>知识问答系统</h5>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item class="item" index="/user_home">
          <span class="iconfont">&#xe601;</span>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item class="item" index="/user_view">
          <span class="iconfont">&#xe65c;</span>
          <span>问答界面</span>
        </el-menu-item>
        <el-menu-item class="item" index="user_history">
          <span class="iconfont">&#xf1e2;</span>
          <span>历史消息记录</span>
        </el-menu-item>
      </el-menu>
    </div>
  </template>
  
  <script lang="ts" setup></script>
  
  <style scoped>
  @import "@/assets/css/iconfont.css";
  h5 {
    height:25px;
    font-size: 20px;
    font-weight: normal;
    text-align: center;
    margin-top:15px;
    margin-bottom: 15px;
    color:#fff;
  }
  .item{
    width:200px;
    border-bottom: 1px solid #778490;
    border-right: 1px solid #778490;
  }
  .iconfont {
      margin-right: 15px;
      font-size: 20px;
    }
  </style>
  