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
      <el-button type="primary" class="file_btn" @click="add_btn"
        >添加文件</el-button
      >
    </div>
    <div class="file_table">
      <el-table :data="fileTableData" style="width: 700px">
        <el-table-column
          type="index"
          label="序号"
          :index="IndexMethod"
          width="100px"
        />
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
    <el-dialog
      v-model="dialogVisiblefile"
      title="上传文件"
      width="700px"
      :modal="true"
      :close-on-click-modal="false"
      :before-close="handleCloseFile"
    >
      <el-form
        :model="fileForm"
        label-width="80px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="知识库" prop="kb_name">
          <el-input
            v-model="kb_name"
            class="dialog_user_input item_input"
            disabled
          />
        </el-form-item>

        <el-form-item>
          <el-upload
            ref="upload"
            class="upload-demo"
            action="http://localhost:8081/api/admin_model/upload_file"
            :limit="1"
            :on-exceed="handleExceed"
            :on-success="handleSuccess"
            :auto-upload="false"
          >
            <template #trigger>
              <el-button type="primary" class="upload_file_btn"
                >选择文件</el-button
              >
            </template>
            <el-button
              class="ml-3 upload_file_btn"
              type="success"
              @click="submitUpload"
            >
              上传文件
            </el-button>
            <template #tip>
              <div class="el-upload__tip text-red text">
                只能上传一个文件并且旧文件会替代新文件
              </div>
            </template>
          </el-upload>
        </el-form-item>

        <el-form-item>
          单段文本最大长度：<el-input-number
            v-model="fileForm.chunk_size_max_length"
            :min="1"
            :max="10000"
          />
        </el-form-item>

        <el-form-item>
          相邻文本重合长度：<el-input-number
            v-model="fileForm.chunk_overlap_length"
            :min="1"
            :max="10000"
          />
        </el-form-item>

        <el-form-item>
          <el-checkbox
            v-model="fileForm.zh_title_enhance"
            label="开启中文标题增强"
            size="large"
          />
        </el-form-item>

        <el-form-item>
          <el-button class="dialog_btn" type="primary" @click="uploadFilesBtn">
            上传文件
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  SelectKbApi,
  GetFileListApi,
  DeleteDocApi,
  UploadApi,
} from "@/api/admin";
import type { UploadInstance, UploadProps, UploadRawFile } from "element-plus";
import { ElMessage, ElMessageBox, genFileId } from "element-plus";
const options = ref([{ id: 0, name: "无" }]);
const fileTableData = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const dialogVisiblefile = ref(false);
const kb_name = ref("");
const fileForm = ref({
  kb_name: "",
  file: "",
  chunk_size_max_length: 250,
  chunk_overlap_length: 50,
  zh_title_enhance: false,
});
const upload = ref<UploadInstance>();

const SelectKb = async () => {
  try {
    const res = await SelectKbApi({});
    options.value = res.data.data;
  } catch (error) {
    console.error("Axios request failed:", error);
  }
};

onMounted(SelectKb);

const search_file = async () => {
  try {
    const res = await GetFileListApi({
      page: currentPage.value,
      limit: pageSize.value,
      kb_name: kb_name.value,
    });
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
  } catch (error) {
    console.error("Axios request failed:", error);
  }
};

const add_btn = () => {
  dialogVisiblefile.value = true;
};

const handleExceed: UploadProps["onExceed"] = (files) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};

const submitUpload = () => {
  upload.value!.submit();
};

const handleSuccess = (res: { file: string; msg: string }) => {
  fileForm.value.kb_name = kb_name.value;
  fileForm.value.file = res.file;
  ElMessage({
    message: res.msg,
    type: "success",
    duration: 1000,
  });
};

const uploadFilesBtn = async () => {
  dialogVisiblefile.value = false;
  fileForm.value.kb_name = kb_name.value;
  try {
    const res = await UploadApi(fileForm.value);
    if (res.data.code == "1") {
      ElMessage({
        message: res.data.msg,
        type: "success",
        duration: 1000,
      });
      fileForm.value.chunk_size_max_length = 250;
      fileForm.value.chunk_overlap_length = 50;
      fileForm.value.zh_title_enhance = false;
      fileForm.value.file = "";
      dialogVisiblefile.value = false;
      const res1 = await GetFileListApi({
        page: currentPage.value,
        limit: pageSize.value,
        kb_name: kb_name.value,
      });
      if (res1.data.code == "200") {
        fileTableData.value = res1.data.data;
        total.value = res1.data.count;
      }
    } else {
      ElMessage({
        message: res.data.msg,
        type: "warning",
        duration: 1000,
      });
    }
  } catch (error) {
    console.error("Axios request failed:", error);
  }
};

const handleCloseFile = (done: () => void) => {
  done();
  fileForm.value.chunk_size_max_length = 250;
  fileForm.value.chunk_overlap_length = 50;
  fileForm.value.zh_title_enhance = false;
  fileForm.value.file = "";
};

const handleDelete = (index: number, row: any) => {
  ElMessageBox.confirm("此操作是永久删除,是否删除该知识库？", "提示", {
    cancelButtonText: "取消",
    confirmButtonText: "确认",
    type: "warning",
  })
    .then(async () => {
      try {
        const res = await DeleteDocApi({
          kb_name: kb_name.value,
          filename: row.name,
        });
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
      } catch (error) {
        console.error("Axios request failed:", error);
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "删除取消",
      });
    });
};

const handleSizeChange = async (val: number) => {
  try {
    const res = await GetFileListApi({
      page: currentPage.value,
      limit: val,
      kb_name: kb_name.value,
    });
    fileTableData.value = res.data.data;
    total.value = res.data.count;
  } catch (error) {
    console.error("Axios request failed:", error);
  }
};

const handleCurrentChange = async (val: number) => {
  try {
    const res = await GetFileListApi({
      page: val,
      limit: pageSize.value,
      kb_name: kb_name.value,
    });
    fileTableData.value = res.data.data;
    total.value = res.data.count;
  } catch (error) {
    console.error("Axios request failed:", error);
  }
};

const IndexMethod = (index: number) => {
  const Indexpage = currentPage.value;
  const IndexSize = pageSize.value;
  return index + 1 + (Indexpage - 1) * IndexSize;
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

.item_input {
  width: 200px;
}

.dialog_btn {
  width: 140px;
  margin-left: 130px;
}

.upload_file_btn {
  width: 140px;
  height: 40px;
  margin-right: 20px;
}

.text {
  font-size: 15px;
}
</style>
