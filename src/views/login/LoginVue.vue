<template>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1>登录</h1>
      </div>
      <div class="main">
        <el-form :model="LoginForm" label-width="60px">
          <el-form-item>
            <el-input
              v-model="LoginForm.Username"
              placeholder="请输入账号"
              class="input_box"
            />
            <template #label>
              <span>
                <i class="iconfont">&#xe634;</i>
              </span>
            </template>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="LoginForm.Password"
              placeholder="请输入密码"
              type="password"
              class="input_box"
            />
            <template #label>
              <span>
                <i class="iconfont">&#xe6b2;</i>
              </span>
            </template>
          </el-form-item>
          <el-form-item>
            <div class="msg">
              假若你没有账号,请先进行<span
                class="to_register"
                @click="to_register"
                >注册</span
              >
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" class="login_btn"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { LoginApi } from "@/api/login";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
const router = useRouter();
const LoginForm = ref({
  Username: "",
  Password: "",
});

const onSubmit = async () => {
  try {
    const res = await LoginApi(LoginForm.value);
    if (res.data.code == "2") {
      ElMessage({
        message: res.data.msg,
        type: "success",
        duration: 1000,
      });
      localStorage.setItem("token", res.data.store.token);
      localStorage.setItem("username", res.data.store.username);
      localStorage.setItem("role", res.data.store.role);
      setTimeout(() => {
        router.push({ path: "/admin_index" });
      }, 1500);
    }
    /*用户*/
    if (res.data.code == "1") {
      ElMessage({
        message: res.data.msg,
        type: "success",
        duration: 1000,
      });
      localStorage.setItem("token", res.data.store.token);
      localStorage.setItem("username", res.data.store.username);
      localStorage.setItem("role", res.data.store.role);
      setTimeout(() => {
        router.push({ path: "/index" });
      }, 1500);
    }
    /*登录失败*/
    if (res.data.code == "0") {
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
const to_register = () => {
  setTimeout(() => {
    router.push({ path: "/register" });
  }, 500);
};
</script>

<style scoped>
@import "@/assets/css/iconfont.css";
.wrapper {
  height: 100vh;
  background-image: url("../../assets/images/login_bkg.png");
  background-repeat: no-repeat;
  /*溢出隐藏*/
  overflow: hidden;
  background-size: cover;
}
.container {
  width: 400px;
  margin: 7% auto;
  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0.1);
  /*阴影部分*/
  box-shadow: 0 0 17px #333;
}
.header {
  text-align: center;
  padding-top: 60px;
}
.header h1 {
  color: #333;
  font-size: 40px;
  margin-bottom: 40px;
}
.main {
  text-align: center;
  width: 380px;
  height: 260px;
  padding-left: 20px;
}

span {
  height: 40px;
  padding-top: 4px;
}

.input_box {
  width: 250px;
  height: 40px;
  font-size: 15px;
  border: none;
  outline: none;
}
.msg {
  height: 30px;
  text-align: center;
  color: #333;
  font-size: 15px;
  margin: 0 0;
}
.to_register {
  color: rgb(79, 65, 92);
}
.to_register:hover {
  color: rgb(102, 102, 102);
  cursor: pointer;
}
.login_btn {
  width: 160px;
  height: 40px;
  margin-left: 40px;
  font-size: 15px;
  font-weight: bold;
}
</style>
