<template>
  <div class="layout">
    <AdminMenuVue class="admin_menu"></AdminMenuVue>
    <AdminContentVue class="admin_content"></AdminContentVue>
  </div>
</template>

<script lang="ts" setup>
import AdminMenuVue from "@/views/admin/AdminMenuVue.vue";
import AdminContentVue from "@/views/admin/AdminContentVue.vue";
</script>

<style scoped>
.layout > .admin_menu {
  width: 200px;
  min-height: 500px;
  background-color: #6d7379;
  /*固定定位*/
  position: fixed;
  top: 0;
  bottom: 0;
}

.layout > .admin_content {
  margin-left: 200px;
  min-height: 500px;
}
</style>
