<template>
  <div class="file_wrapper">
    <div class="file_header">
      <el-select
        v-model="kb_name"
        class="m-2 select"
        placeholder="选择知识库"
        size="large"
        style="width: 240px"
      >
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        />
      </el-select>

      <el-button type="primary" class="file_btn" @click="search_file"
        >查询</el-button
      >
      <el-button type="primary" class="file_btn">添加文件</el-button>
    </div>
    <div class="file_table">
      <el-table :data="fileTableData" style="width: 700px" border>
        <el-table-column prop="id" label="序号" width="100px" />
        <el-table-column prop="name" label="文件名" width="500px" />
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
import { ref, onMounted } from "vue";
import { SelectKbApi, GetFileListApi, DeleteDocApi } from "@/api/admin";
import { ElMessage, ElMessageBox } from "element-plus";
const fileTableData = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(5);

const kb_name = ref("");

const options = ref([{ id: 0, name: "无" }]);

const SelectKb = async () => {
  SelectKbApi({}).then((res) => {
    console.log(res);
    options.value = res.data.data;
  });
};

onMounted(SelectKb);

const search_file = () => {
  GetFileListApi({
    page: currentPage.value,
    limit: pageSize.value,
    kb_name: kb_name.value,
  }).then((res) => {
    if (res.data.code == "200") {
      ElMessage({
        message: res.data.msg,
        type: "success",
        duration: 1000,
      });
      fileTableData.value = res.data.data;
      total.value = res.data.count;
    } else {
      ElMessage({
        message: res.data.msg,
        type: "warning",
        duration: 1000,
      });
    }
  });
};

const handleDelete = (index: number, row: any) => {
  ElMessageBox.confirm("此操作是永久删除,是否删除该知识库？", "提示", {
    cancelButtonText: "取消",
    confirmButtonText: "确认",
    type: "warning",
  })
    .then(() => {
      DeleteDocApi({ kb_name: kb_name.value, filename: row.name }).then(
        (res) => {
          if (res.data.code == "200") {
            ElMessage({
              type: "success",
              message: res.data.msg,
              duration: 1000,
            });
            GetFileListApi({
              page: currentPage.value,
              limit: pageSize.value,
              kb_name: kb_name.value,
            }).then((res) => {
              fileTableData.value = res.data.data;
              total.value = res.data.count;
            });
          }
        }
      );
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "删除取消",
      });
    });
};

const handleSizeChange = async (val: number) => {
  GetFileListApi({
    page: currentPage.value,
    limit: val,
    kb_name: kb_name.value,
  }).then((res) => {
    fileTableData.value = res.data.data;
    total.value = res.data.count;
  });
};

const handleCurrentChange = async (val: number) => {
  GetFileListApi({
    page: val,
    limit: pageSize.value,
    kb_name: kb_name.value,
  }).then((res) => {
    fileTableData.value = res.data.data;
    total.value = res.data.count;
  });
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
.select {
  margin-top: 10px;
  margin-right: 20px;
}
</style>
