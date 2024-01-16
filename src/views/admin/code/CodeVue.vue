<template>
  <div class="code_wrapper">
    <div class="code_header">
      <el-input
        v-model="code_email"
        placeholder="请输入邮箱"
        class="code_input"
      />
      <el-button type="primary" class="code_btn" @click="search_code"
        >查询</el-button
      >
    </div>
    <div class="code_table">
      <el-table :data="codeTableData" style="width: 1000px" border>
        <el-table-column prop="id" label="序号" width="80px" />
        <el-table-column prop="email" label="邮箱" width="200px" />
        <el-table-column prop="code" label="验证码" width="120px" />
        <el-table-column prop="is_valid" label="验证码状态" width="100px" />
        <el-table-column prop="created_time" label="创建时间" width="250px" />
        <el-table-column prop="expiration_time" label="过期时间" width="250px" />
      </el-table>
    </div>
    <div class="code_page">
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
import { GetCodeApi } from "@/api/admin";
import { ref, onMounted } from "vue";
const code_email = ref("");
const codeTableData = ref([]);
const currentPage = ref(1);
const pageSize = ref(5);
const total = ref(1);

const loadTableData = async () => {
  GetCodeApi({
    page: currentPage.value,
    limit: pageSize.value,
  }).then((res) => {
    codeTableData.value = res.data.data;
    total.value = res.data.count;
  });
};
onMounted(loadTableData);

const search_code = async () => {
  GetCodeApi({
    page: currentPage.value,
    limit: pageSize.value,
    email: code_email.value,
  }).then((res) => {
    codeTableData.value = res.data.data;
    total.value = res.data.count;
  });
};

const handleSizeChange = async (val: number) => {
  if (code_email.value == "") {
    GetCodeApi({
      page: currentPage.value,
      limit: val,
    }).then((res) => {
      codeTableData.value = res.data.data;
      total.value = res.data.count;
    });
  } else {
    GetCodeApi({
      page: currentPage.value,
      limit: val,
      email: code_email.value,
    }).then((res) => {
      codeTableData.value = res.data.data;
      total.value = res.data.count;
    });
  }
};

const handleCurrentChange = async (val: number) => {
  if (code_email.value == "") {
    GetCodeApi({
      page: val,
      limit: pageSize.value,
    }).then((res) => {
      codeTableData.value = res.data.data;
      total.value = res.data.count;
    });
  } else {
    GetCodeApi({
      page: val,
      limit: pageSize.value,
      email: code_email.value,
    }).then((res) => {
      codeTableData.value = res.data.data;
      total.value = res.data.count;
    });
  }
};
</script>

<style scoped>
.code_wrapper {
  margin: 10px 20px;
}
.code_header {
  height: 60px;
  width: 1000px;
}
.code_input {
  height: 40px;
  width: 240px;
  margin-top: 10px;
  margin-right: 20px;
}
.code_btn {
  height: 40px;
  width: 100px;
  margin-top: 10px;
  font-size: 15px;
}
.code_table {
  margin-top: 10px;
  margin-bottom: 20px;
}
.code_page {
  margin-left: 10px;
}
</style>
