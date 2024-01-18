<template>
  <div class="file_wrapper">
    <div class="file_header">
      <el-input
        placeholder="请输入文件名"
        class="file_input"
        v-model="file_name"
      />
      <el-button type="primary" class="file_btn" @click="search_file"
        >查询</el-button
      >
      <el-button type="primary" class="file_btn" @click="search_file"
        >添加文件</el-button
      >
    </div>
    <div class="file_table">
      <el-table :data="fileTableData" style="width: 600px" border>
        <el-table-column prop="id" label="序号" width="100px" />
        <el-table-column prop="file_name" label="文件名" width="200px" />
        <el-table-column prop="kb_name" label="知识库" width="200px" />
        <el-table-column label="操作" width="100px">
          <template #default="scope">
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="file_page">
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
import { ref } from "vue";
const file_name = ref("");
const fileTableData = ref([{ id: "1", kb_name: "知识库1" }]);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(5);

const search_file = () => {
  console.log("搜索");
};

const handleDelete = (index: number, row: any) => {
  console.log(index, row);
};

const handleSizeChange = async (val: number) => {
  console.log("页面大小改变");
  console.log(val);
};

const handleCurrentChange = async (val: number) => {
  console.log("页面改变");
  console.log(val);
};
</script>

<style scoped>
.file_wrapper {
  margin: 10px 20px;
}
.file_header {
  height: 60px;
  width: 1000px;
}
.file_input {
  height: 40px;
  width: 260px;
  margin-top: 10px;
  margin-right: 20px;
}
.file_btn {
  height: 40px;
  width: 100px;
  margin-top: 10px;
  font-size: 15px;
}
.file_table {
  margin-top: 10px;
  margin-bottom: 20px;
}
.file_page {
  margin-left: 10px;
}
</style>
