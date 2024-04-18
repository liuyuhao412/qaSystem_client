  <template>
    <div class="user_wrapper">
      <div class="user_header">
        <el-input
          v-model="input_username"
          placeholder="请输入用户"
          class="user_input"
        />
        <el-input
          v-model="input_role"
          placeholder="请输入身份"
          class="user_input"
        />
        <el-button type="primary" class="user_btn" @click="search_user"
          >查询</el-button
        >
        <el-button type="primary" class="user_btn" @click="add_user"
          >添加</el-button
        >
      </div>
      <div class="user_table">
        <el-table :data="userTableData" style="width: 1050px">
          <el-table-column
            type="index"
            label="序号"
            :index="IndexMethod"
            width="80px"
          />
          <el-table-column prop="username" label="用户" width="200px" />
          <el-table-column prop="email" label="邮箱" width="200px" />
          <el-table-column prop="role" label="角色" width="100px" />
          <el-table-column prop="register_time" label="注册时间" width="220px" />
          <el-table-column label="操作" width="250px">
            <template #default="scope">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
                >修改</el-button
              >
              <el-button
                size="small"
                @click="setPassword(scope.$index, scope.row)"
                >重置密码</el-button
              >
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
      <div class="user_page">
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
        v-model="dialogVisibleAdd"
        title="添加用户"
        width="30%"
        :modal="true"
        :close-on-click-modal="false"
        :before-close="handleCloseAdd"
      >
        <el-form
          :model="addUserForm"
          label-width="80px"
          class="demo-ruleForm"
          status-icon
          ><el-form-item label="用户">
            <el-input v-model="addUserForm.username" class="dialog_user_input" />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="addUserForm.email" class="dialog_user_input" />
          </el-form-item>
          <el-form-item>
            <el-radio-group v-model="addUserForm.role" class="ml-4">
              <el-radio label="admin" size="large">管理员</el-radio>
              <el-radio label="user" size="large">用户</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item>
            <el-button class="dialog_btn" type="primary" @click="add_user_btn">
              确认
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <el-dialog
        v-model="dialogVisibleUpdate"
        title="编辑用户"
        width="30%"
        :modal="true"
        :close-on-click-modal="false"
        :before-close="handleCloseUpdate"
      >
        <el-form
          :model="updateUserForm"
          label-width="80px"
          class="demo-ruleForm"
          status-icon
        >
          <el-form-item label="用户" prop="username">
            <el-input
              v-model="updateUserForm.username"
              class="dialog_user_input"
            />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="updateUserForm.email"
              class="dialog_user_input"
            />
          </el-form-item>
          <el-form-item prop="role">
            <el-radio-group v-model="updateUserForm.role" class="ml-4">
              <el-radio label="admin" size="large">管理员</el-radio>
              <el-radio label="user" size="large">用户</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item>
            <el-button class="dialog_btn" type="primary" @click="update_user_btn">
              确认
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </template>

  <script setup lang="ts">
  import {
    GetUserApi,
    AddUserApi,
    UpdateUserApi,
    DeleteUserApi,
    SetPasswordApi,
  } from "@/api/admin";
  import { ElMessage, ElMessageBox } from "element-plus";
  import { ref, onMounted, toRaw } from "vue";

  const input_username = ref("");
  const input_role = ref("");

  const userTableData = ref([]);
  const currentPage = ref(1);
  const pageSize = ref(5);
  const total = ref(1);

  const dialogVisibleAdd = ref(false);
  const dialogVisibleUpdate = ref(false);
  const addUserForm = ref({
    username: "",
    email: "",
    role: "",
  });
  const updateUserForm = ref({
    id:"",
    username: "",
    email: "",
    role: "",
  });

  const loadTableData = async () => {
    try {
      const res = await GetUserApi({
        page: currentPage.value,
        limit: pageSize.value,
      });
      userTableData.value = res.data.data;
      total.value = res.data.count;
    } catch (error) {
      console.error("Axios request failed:", error);
    }
  };

  onMounted(loadTableData);

  const search_user = async () => {
    try {
      const res = await GetUserApi({
        page: currentPage.value,
        limit: pageSize.value,
        username: input_username.value,
        role: input_role.value,
      });
      userTableData.value = res.data.data;
      total.value = res.data.count;
    } catch (error) {
      console.error("Axios request failed:", error);
    }
  };

  const add_user = () => {
    dialogVisibleAdd.value = true;
  };

  const add_user_btn = async () => {
    try {
      const res = await AddUserApi(addUserForm.value);
      if (res.data.code == 1) {
        ElMessage({
          message: res.data.msg,
          type: "success",
          duration: 1000,
        });
        dialogVisibleAdd.value = false;
        addUserForm.value.username = "";
        addUserForm.value.email = "";
        addUserForm.value.role = "";
        loadTableData();
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

  const handleCloseAdd = (done: () => void) => {
    done();
    addUserForm.value.username = "";
    addUserForm.value.email = "";
    addUserForm.value.role = "";
  };

  const handleEdit = (index: number, row: any) => {
    console.log(index, row);
    dialogVisibleUpdate.value = true;
    // console.log(toRaw(row));
    updateUserForm.value = toRaw(row);
  };

  const update_user_btn = async () => {
    try {
      const res = await UpdateUserApi(updateUserForm.value);
      if (res.data.code == 1) {
        ElMessage({
          message: res.data.msg,
          type: "success",
          duration: 1000,
        });
        dialogVisibleUpdate.value = false;

        // const newUser: string | null = updateUserForm.value.username;
        // const localUser: string | null = localStorage.getItem("username");
        // const newRole: string | null = updateUserForm.value.role;
        // const localRole: string | null = localStorage.getItem("role");
        // if (localUser != newUser) {
        //   localStorage.setItem("username", newUser);
        // }

        // if (localRole != newRole) {
        //   localStorage.removeItem("token");
        //   localStorage.removeItem("username");
        //   localStorage.removeItem("role");
        //   location.reload();
        // }
        loadTableData();
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

  const handleCloseUpdate = (done: () => void) => {
    done();
  };

  const setPassword = (index: number, row: any) => {
    ElMessageBox.confirm("是否要重置密码", "提示", {
      cancelButtonText: "取消",
      confirmButtonText: "确认",
      type: "warning",
    })
      .then(async () => {
        try {
          const res = await SetPasswordApi({ email: toRaw(row).email });
          if (res.data.code === 1) {
            ElMessage({
              type: "success",
              message: res.data.msg,
              duration: 1000,
            });
          }
          loadTableData();
        } catch (error) {
          console.error("Axios request failed:", error);
        }
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "取消",
        });
      });
  };

  const handleDelete = (index: number, row: any) => {
    ElMessageBox.confirm("此操作是永久删除,是否删除该用户？", "提示", {
      cancelButtonText: "取消",
      confirmButtonText: "确认",
      type: "warning",
    })
      .then(async () => {
        try {
          const res = await DeleteUserApi({ email: toRaw(row).email });
          if (res.data.code === 1) {
            ElMessage({
              type: "success",
              message: res.data.msg,
              duration: 1000,
            });
            const newUser = localStorage.getItem("username");
            if (newUser == toRaw(row).username) {
              localStorage.removeItem("username");
              localStorage.removeItem("token");
              localStorage.removeItem("role");
            }
            loadTableData();
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
    if (input_username.value == "" && input_role.value == "") {
      try {
        const res = await GetUserApi({
          page: currentPage.value,
          limit: val,
        });
        userTableData.value = res.data.data;
        total.value = res.data.count;
      } catch (error) {
        console.error("Axios request failed:", error);
      }
    } else {
      try {
        const res = await GetUserApi({
          page: currentPage.value,
          limit: val,
          username: input_username.value,
          role: input_role.value,
        });
        userTableData.value = res.data.data;
        total.value = res.data.count;
      } catch (error) {
        console.error("Axios request failed:", error);
      }
    }
  };

  const handleCurrentChange = async (val: number) => {
    if (input_username.value == "" && input_role.value == "") {
      try {
        const res = await GetUserApi({
          page: val,
          limit: pageSize.value,
        });
        userTableData.value = res.data.data;
        total.value = res.data.count;
      } catch (error) {
        console.error("Axios request failed:", error);
      }
    } else {
      try {
        const res = await GetUserApi({
          page: val,
          limit: pageSize.value,
          username: input_username.value,
          role: input_role.value,
        });
        userTableData.value = res.data.data;
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
  .user_wrapper {
    margin: 10px 20px;
  }
  .user_header {
    height: 60px;
    width: 1000px;
  }

  .user_input {
    height: 40px;
    width: 240px;
    margin-top: 10px;
    margin-right: 20px;
  }
  .user_btn {
    height: 40px;
    width: 100px;
    margin-top: 10px;
    font-size: 15px;
  }
  .dialog_user_input {
    width: 240px;
  }
  .dialog_btn {
    width: 150px;
    margin-left: 10px;
  }
  .user_table {
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .user_page {
    margin-left: 10px;
  }
  </style>
