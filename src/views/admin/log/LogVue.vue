<template>
  <div class="log_wrapper">
    <div class="log_header">
      <el-input
        v-model="log_email"
        placeholder="请输入用户"
        class="log_input"
      />
      <el-input v-model="log_role" placeholder="请输入角色" class="log_input" />
      <el-button type="primary" class="log_btn" @click="search_log"
        >查询</el-button
      >
    </div>
    <div class="log_table">
      <el-table :data="logTableData" style="width: 850px" border>
        <el-table-column prop="id" label="序号" width="80px" />
        <el-table-column prop="email" label="用户" width="200px" />
        <el-table-column prop="role" label="角色" width="100px" />
        <el-table-column prop="ip" label="IP" width="220px" />
        <el-table-column prop="login_time" label="登录时间" width="250px" />
      </el-table>
    </div>
    <div class="log_page">
      <div class="demo-pagination-block">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[5, 10]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GetLogApi } from "@/api/admin";
import { ref, onMounted } from "vue";
const log_email = ref("");
const log_role = ref("");
const logTableData = ref([]);
const currentPage = ref(1);
const pageSize = ref(5);
const total = ref(1);

const loadTableData = async () => {
  GetLogApi({
    page: currentPage.value,
    limit: pageSize.value,
  }).then((res) => {
    logTableData.value = res.data.data;
    total.value = res.data.count;
  });
};
onMounted(loadTableData);

const search_log = async () => {
  GetLogApi({
    page: currentPage.value,
    limit: pageSize.value,
    email: log_email.value,
    role: log_role.value,
  }).then((res) => {
    logTableData.value = res.data.data;
    total.value = res.data.count;
  });
};

const handleSizeChange = async (val: number) => {
  if (log_email.value == "" && log_role.value == "") {
    GetLogApi({
      page: currentPage.value,
      limit: val,
    }).then((res) => {
      logTableData.value = res.data.data;
      total.value = res.data.count;
    });
  } else {
    GetLogApi({
      page: currentPage.value,
      limit: val,
      email: log_email.value,
      role: log_role.value,
    }).then((res) => {
      logTableData.value = res.data.data;
      total.value = res.data.count;
    });
  }
};

const handleCurrentChange = async (val: number) => {
  if (log_email.value == "" && log_role.value == "") {
    GetLogApi({
      page: val,
      limit: pageSize.value,
    }).then((res) => {
      logTableData.value = res.data.data;
      total.value = res.data.count;
    });
  } else {
    GetLogApi({
      page: val,
      limit: pageSize.value,
      email: log_email.value,
      role: log_role.value,
    }).then((res) => {
      logTableData.value = res.data.data;
      total.value = res.data.count;
    });
  }
};
</script>

<style scoped>
.log_wrapper {
  margin: 10px 20px;
}
.log_header {
  height: 60px;
  width: 1000px;
}
.log_input {
  height: 40px;
  width: 240px;
  margin-top: 10px;
  margin-right: 20px;
}
.log_btn {
  height: 40px;
  width: 100px;
  margin-top: 10px;
  font-size: 15px;
}
.log_table {
  margin-top: 10px;
  margin-bottom: 20px;
}
.log_page {
  margin-left: 10px;
}
</style>
