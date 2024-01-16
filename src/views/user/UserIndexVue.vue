<template>
    <div class="layout">
      <UserMenuVue class="menu"></UserMenuVue>
      <UserContentVue class="content"></UserContentVue>
    </div>
  </template>
  
  <script lang="ts" setup>
  import UserMenuVue from "@/views/user/UserMenuVue.vue";
  import UserContentVue from "@/views/user/UserContentVue.vue";
  </script>
  
  <style scoped>
  .layout > .menu {
    width: 200px;
    min-height: 500px;
    background-color: #6d7379;
    /*固定定位*/
    position: fixed;
    top: 0;
    bottom: 0;
  }
  
  .layout > .content {
    margin-left: 200px;
    min-height: 500px;
  }
  </style>
  