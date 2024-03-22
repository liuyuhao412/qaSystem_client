<template>
  <div>
    <div class="header">
      <div class="hearer_div">
        <el-dropdown>
          <el-button type="primary" class="hearer_button">
            <span>更多</span>
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="updatePassword"
                >修改密码</el-dropdown-item
              >
              <el-dropdown-item @click="exit">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="text">{{ username }}</div>
    </div>
    <div>
      <router-view></router-view>
    </div>
    <!-- <div class="bottom">
      <div class="bottom_text">
        Copyright © 知识问答系统 本系统为毕业设计所做，仅供学习参考
      </div>
    </div> -->
    <el-dialog
      v-model="dialogVisiblepwd"
      title="修改密码"
      width="30%"
      :modal="true"
      :close-on-click-modal="false"
      :before-close="handleClosePassword"
    >
      <el-form
        :model="passwordForm"
        label-width="80px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="用户" prop="username">
          <el-input
            v-model="passwordForm.username"
            class="dialog_user_input"
            disabled
          />
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="passwordForm.new_pwd"
            class="dialog_user_input"
            type="password"
          />
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input
            v-model="passwordForm.confirm_pwd"
            class="dialog_user_input"
            type="password"
          /><span class="dialog_text"
            >8位以上,包括大小写字母、数字、特殊字符</span
          >
        </el-form-item>

        <el-form-item>
          <el-button class="dialog_btn" type="primary" @click="set_pwd_btn">
            确认
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { UpdatePasswordApi } from "@/api/admin";

const router = useRouter();
const username: string | null = localStorage.getItem("username");
const dialogVisiblepwd = ref(false);
const passwordForm = ref({
  username: "",
  new_pwd: "",
  confirm_pwd: "",
});

const exit = () => {
  ElMessageBox.confirm("您确认要退出吗？", "提示", {
    cancelButtonText: "取消",
    confirmButtonText: "确认",
    type: "warning",
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "退出成功",
        duration: 1000,
      });
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      setTimeout(() => {
        router.push({ path: "/login" });
      }, 1000);
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消退出",
        duration: 1000,
      });
    });
};

const updatePassword = () => {
  if (username != null) {
    dialogVisiblepwd.value = true;
    passwordForm.value.username = username;
  }
};

const set_pwd_btn = async () => {
  try {
    const res = await UpdatePasswordApi(passwordForm.value);

    if (res.data.code == 1) {
      ElMessage({
        message: res.data.msg,
        type: "success",
        duration: 1000,
      });
      dialogVisiblepwd.value = false;
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

const handleClosePassword = (done: () => void) => {
  done();
  passwordForm.value.new_pwd = "";
  passwordForm.value.confirm_pwd = "";
};
</script>

<style scoped>
.header {
  height: 55px;
  background-color: #7fadb6;
}
.text {
  float: right;
  height: 55px;
  line-height: 55px;
  margin-right: 20px;
}

.hearer_div {
  float: right;
  width: 80px;
  height: 35px;
  line-height: 35px;
  padding-left: 10px;
  margin-top: 10px;
}

.hearer_button {
  width: 60px;
  padding-left: 10px;
}
.hearer_div span {
  margin-left: 20px;
}
.bottom {
  height: 20px;
  padding-left: 20px;
  padding-bottom: 5px;
  position: fixed;
  bottom: 0;
}
.bottom_text {
  font-size: 15px;
}
.dialog_user_input {
  width: 260px;
}
.dialog_btn {
  width: 150px;
  margin-left: 10px;
}
</style>
