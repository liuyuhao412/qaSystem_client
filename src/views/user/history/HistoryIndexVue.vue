<template>
  <div class="history_wrapper">
    <div class="history_header">
      <el-input
        v-model="history_role"
        placeholder="请输入角色"
        class="history_input"
      />
      <el-button type="primary" class="history_btn" @click="search_history"
        >查询</el-button
      >
    </div>
    <div class="history_table">
      <el-table :data="historyTableData" style="width: 1200px" border>
        <el-table-column
          type="index"
          label="序号"
          :index="IndexMethod"
          width="80px"
        />
        <el-table-column prop="message" label="记录" width="600px" />
        <el-table-column prop="username" label="用户" width="200px" />
        <el-table-column prop="role" label="角色" width="100px" />
        <el-table-column prop="time" label="时间" width="220px" />
      </el-table>
    </div>

    <div class="history_page">
      <div class="demo-pagination-block">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[3, 5]"
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
import { GetUserHistoryApi } from "@/api/user";
import { ref, onMounted } from "vue";
const username: string | null = localStorage.getItem("username");
const history_role = ref("");
const historyTableData = ref([]);
const currentPage = ref(1);
const pageSize = ref(3);
const total = ref(1);

const loadTableData = async () => {
  try {
    const res = await GetUserHistoryApi({
      page: currentPage.value,
      limit: pageSize.value,
      username: username,
    });
    console.log(res);
    historyTableData.value = res.data.data;
    total.value = res.data.count;
  } catch (error) {
    console.error("Axios request failed:", error);
  }
};
onMounted(loadTableData);

const search_history = async () => {
  try {
    const res = await GetUserHistoryApi({
      page: currentPage.value,
      limit: pageSize.value,
      username: username,
      role: history_role.value,
    });
    historyTableData.value = res.data.data;
    total.value = res.data.count;
  } catch (error) {
    console.error("Axios request failed:", error);
  }
};

const handleSizeChange = async (val: number) => {
  if (history_role.value == "") {
    try {
      const res = await GetUserHistoryApi({
        page: currentPage.value,
        limit: val,
        username: username,
      });
      historyTableData.value = res.data.data;
      total.value = res.data.count;
    } catch (error) {
      console.error("Axios request failed:", error);
    }
  } else {
    try {
      const res = await GetUserHistoryApi({
        page: currentPage.value,
        limit: val,
        username: username,
        role: history_role.value,
      });
      historyTableData.value = res.data.data;
      total.value = res.data.count;
    } catch (error) {
      console.error("Axios request failed:", error);
    }
  }
};

const handleCurrentChange = async (val: number) => {
  if (history_role.value == "") {
    try {
      const res = await GetUserHistoryApi({
        page: val,
        limit: pageSize.value,
        username: username,
      });
      historyTableData.value = res.data.data;
      total.value = res.data.count;
    } catch (error) {
      console.error("Axios request failed:", error);
    }
  } else {
    try {
      const res = await GetUserHistoryApi({
        page: val,
        limit: pageSize.value,
        username: username,
        role: history_role.value,
      });
      historyTableData.value = res.data.data;
      total.value = res.data.count;
    } catch (error) {
      console.error("Axios request failed:", error);
    }
  }
};
const IndexMethod = (index: number) => {
  const Indexpage = currentPage.value;
  const IndexSize = pageSize.value;
  return index + 1 + (Indexpage - 1) * IndexSize;
};
</script>

<style scoped>
.history_wrapper {
  margin: 10px 20px;
}
.history_header {
  height: 60px;
  width: 1000px;
}
.history_input {
  height: 40px;
  width: 240px;
  margin-top: 10px;
  margin-right: 20px;
}
.history_btn {
  height: 40px;
  width: 100px;
  margin-top: 10px;
  font-size: 15px;
}
.history_table {
  margin-top: 10px;
  margin-bottom: 20px;
}
.history_page {
  margin-left: 10px;
}
</style>
