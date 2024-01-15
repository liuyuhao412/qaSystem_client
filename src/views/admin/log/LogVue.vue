<template>
  <div class="log_wrapper">
    <div class="log_header">
      <el-input
        v-model="log_username"
        placeholder="请输入用户"
        class="log_input"
        @click="searchLog"
      />
      <el-button type="primary" class="log_btn">查询</el-button>
    </div>
    <div class="log_table">
      <el-table :data="LogTableData" style="width: 750px" border>
        <el-table-column prop="id" label="序号" width="80px" />
        <el-table-column prop="username" label="用户" width="200px" />
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
const log_username = ref("");
const LogTableData = ref([]);
const currentPage = ref(1);
const pageSize = ref(5);
const total = ref(1);

const loadTableData = async () => {
  GetLogApi({ page: currentPage.value, limit: pageSize.value }).then((res) => {
    if (res.data.code == 1) {
      LogTableData.value = res.data.data;
      total.value = res.data.count;
    } else {
      LogTableData.value = [];
    }
  });
};
onMounted(loadTableData);

const handleSizeChange = (val: number) => {
  GetLogApi({ page: currentPage.value, limit: val }).then((res) => {
    if (res.data.code == 1) {
      LogTableData.value = res.data.data;
      total.value = res.data.count;
    } else {
      LogTableData.value = [];
    }
  });
};
const handleCurrentChange = (val: number) => {
  GetLogApi({ page: val, limit: pageSize.value }).then((res) => {
    if (res.data.code == 1) {
      LogTableData.value = res.data.data;
      total.value = res.data.count;
    } else {
      LogTableData.value = [];
    }
  });
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
}
.log_table {
  margin-top: 10px;
  margin-bottom: 20px;
}
.log_page {
  margin-left: 10px;
}
</style>
