<template>
  <div class="kb_wrapper">
    <div class="kb_header">
      <el-input
        placeholder="请输入要添加的知识库的名称"
        class="kb_input"
        v-model="kb_name"
      />
      <el-button type="primary" class="kb_btn" @click="add_kb">添加</el-button>
    </div>
    <div class="kb_table">
      <el-table :data="kbTableData" style="width: 400px" border>
        <el-table-column prop="id" label="序号" width="100px" />
        <el-table-column prop="name" label="知识库名" width="200px" />
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
    <div class="kb_page">
      <div class="demo-pagination-block">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          layout="total,prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { GetKbListApi, AddKbApi, DeleteKbApi } from "@/api/admin";
import { ElMessage, ElMessageBox } from "element-plus";
const kb_name = ref("");
const kbTableData = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(5);

const getKbList = async () => {
  GetKbListApi({
    page: currentPage.value,
    limit: pageSize.value,
  }).then((res) => {
    kbTableData.value = res.data.data;
    total.value = res.data.count;
  });
};

onMounted(getKbList);

const add_kb = async () => {
  AddKbApi({
    kb_name: kb_name.value,
  }).then((res) => {
    console.log(res);
    if (res.data.code == "200") {
      ElMessage({
        message: res.data.msg,
        type: "success",
        duration: 1000,
      });
      getKbList();
      kb_name.value = "";
    } else {
      ElMessage({
        message: res.data.msg,
        type: "warning",
        duration: 1000,
      });
    }
  });
};

const handleDelete = async (index: number, row: any) => {
  console.log(row)
  ElMessageBox.confirm("此操作是永久删除,是否删除该知识库？", "提示", {
    cancelButtonText: "取消",
    confirmButtonText: "确认",
    type: "warning",
  })
    .then(() => {
      DeleteKbApi({ kb_name: row.name }).then((res) => {
        if (res.data.code == "200") {
          ElMessage({
            type: "success",
            message: res.data.msg,
            duration: 1000,
          });
          getKbList();
        }
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "删除取消",
      });
    });
};

const handleCurrentChange = async (val: number) => {
  GetKbListApi({
    page: val,
    limit: pageSize.value,
  }).then((res) => {
    console.log(res);
    kbTableData.value = res.data.data;
    total.value = res.data.count;
  });
};
</script>

<style scoped>
.kb_wrapper {
  margin: 10px 20px;
}
.kb_header {
  height: 60px;
  width: 1000px;
}
.kb_input {
  height: 40px;
  width: 260px;
  margin-top: 10px;
  margin-right: 20px;
}
.kb_btn {
  height: 40px;
  width: 100px;
  margin-top: 10px;
  font-size: 15px;
}
.kb_table {
  margin-top: 10px;
  margin-bottom: 20px;
}
.kb_page {
  margin-left: 10px;
}
</style>
