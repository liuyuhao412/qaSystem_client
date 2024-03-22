<template>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1>注册</h1>
      </div>
      <div class="main">
        <el-form :model="RegisterForm" label-width="60px">
          <el-form-item>
            <el-input
              v-model="RegisterForm.Email"
              placeholder="请输入邮箱"
              class="input_box"
            />
            <template #label>
              <span>
                <i class="iconfont">&#xe632;</i>
              </span>
            </template>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="RegisterForm.Code"
              placeholder="验证码"
              class="input_code"
            />
            <el-button
              type="default"
              class="code_btn"
              :disabled="isButtonDisabled"
              @click="sendCode"
              >{{ buttonLabel }}</el-button
            >
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="RegisterForm.Password"
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
            <el-input
              v-model="RegisterForm.ConfirmePassword"
              placeholder="请再次输入密码"
              type="password"
              class="input_box"
            />
          </el-form-item>
          <el-form-item>
            <div class="msg">
              如果你有账号，请?
              <span class="to_login" @click="to_login">登录</span>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" class="register_btn"
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
import { RegisterApi, SendCodeApi } from "@/api/login";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();
const RegisterForm = ref({
  Email: "",
  Code: "",
  Password: "",
  ConfirmePassword: "",
});
const isButtonDisabled = ref(false);
const buttonLabel = ref("发送验证码");

const startCountDown = () => {
  isButtonDisabled.value = true;
  let countdownTime = 60;
  const updateCountdown = () => {
    if (countdownTime === 0) {
      isButtonDisabled.value = false;
      buttonLabel.value = "发送验证码";
    } else {
      buttonLabel.value = ` 请在${countdownTime}秒后重试`;
      countdownTime--;
      setTimeout(updateCountdown, 1000);
    }
  };
  updateCountdown();
};

const sendCode = async () => {
  try {
    const res = await SendCodeApi({ Email: RegisterForm.value.Email });
    if (res.data.code == "1") {
      ElMessage({
        message: res.data.msg,
        type: "success",
        duration: 1000,
      });
      startCountDown();
    }
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

const onSubmit = async () => {
  try {
    const res = await RegisterApi(RegisterForm.value);
    if (res.data.code == "1") {
      ElMessage({
        message: res.data.msg,
        type: "success",
        duration: 1000,
      });
      setTimeout(() => {
        router.push({ path: "/login" });
      }, 1500);
    }
    /*登录失败*/
    if (res.data.code == "0") {
      ElMessage({
        message: res.data.msg,
        type: "warning",
        duration: 2000,
      });
    }
  } catch (error) {
    console.error("Axios request failed:", error);
  }
};

const to_login = () => {
  setTimeout(() => {
    router.push({ path: "/login" });
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
  height: 350px;
  padding-left: 20px;
}

span {
  height: 40px;
  padding-top: 4px;
}
.input_code {
  width: 120px;
  height: 40px;
  font-size: 15px;
  border: none;
  outline: none;
}
.code_btn {
  width: 125px;
  height: 40px;
  margin-left: 5px;
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
.msg a {
  color: rgb(79, 65, 92);
}

.to_login {
  color: rgb(79, 65, 92);
}
.to_login:hover {
  color: rgb(102, 102, 102);
  cursor: pointer;
}
.register_btn {
  width: 160px;
  height: 40px;
  margin-left: 40px;
  font-size: 15px;
  font-weight: bold;
}
</style>
