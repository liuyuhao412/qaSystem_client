<template>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1>Register</h1>
      </div>
      <div class="main">
        <el-form :model="RegisterForm" label-width="60px">
          <el-form-item>
            <el-input
              v-model="RegisterForm.Username"
              placeholder="Please input your email"
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
              placeholder="Code"
              class="input_code"
            />
            <el-button
              type="default"
              class="code_btn"
              :disabled="isButtonDisabled"
              @click="startCountDown"
              >{{ buttonLabel }}</el-button
            >
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="RegisterForm.Password"
              placeholder="Password"
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
              placeholder="Confirm Password"
              type="password"
              class="input_box"
            />
          </el-form-item>
          <el-form-item>
            <div class="msg">
              If you have an account? <a href="/login">Sign in</a>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" class="register_btn"
              >Sign up</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
const RegisterForm = reactive({
  Username: "",
  Code:"",
  Password: "",
  ConfirmePassword:""
});
const isButtonDisabled = ref(false);
const buttonLabel = ref("Send Code");

const startCountDown = () => {
  isButtonDisabled.value = true;
  let countdownTime = 60;
  const updateCountdown = () => {
    if (countdownTime === 0) {
      isButtonDisabled.value = false;
      buttonLabel.value = "发送验证码";
    } else {
      buttonLabel.value = `Try again after  ${countdownTime} s`;
      countdownTime--;
      setTimeout(updateCountdown, 1000);
    }
  };
  updateCountdown();
};

const onSubmit = () => {
  console.log("register success!");
  console.log(RegisterForm)
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
  width: 100px;
  height: 40px;
  font-size: 15px;
  border: none;
  outline: none;
}
.code_btn {
  width: 145px;
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
.register_btn {
  width: 160px;
  height: 40px;
  margin-left: 40px;
  font-size: 15px;
  font-weight: bold;
}
</style>
