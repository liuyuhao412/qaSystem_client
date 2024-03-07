<template>
  <div class="home">
    <h1 class="animate__animated animate__backInDown">
      欢迎来到知识问答系统！
    </h1>
    <h1 class="animate__animated animate__backInDown">
      欢迎您，{{ username }}!
    </h1>
    <h1 class="animate__animated animate__backInDown">
      {{time}}
    </h1>
  </div>
</template>

<script setup lang="ts">
import { GetTimeApi } from "@/api/user";
import { ref, onMounted } from "vue";
const username: string | null = localStorage.getItem("username");
const time = ref("");

const get_user_time = async () => {
  try {
    const res = await GetTimeApi({ username: username });
    time.value = res.data.time;
  } catch (error) {
    console.error("Axios request failed:", error);
  }
};

onMounted(get_user_time);
</script>

<style scoped>
@import "animate.css";
.home {
  text-align: center;
  margin-top: 150px;
}
h1 {
  font-size: 50px;
  margin-top: 30px;
  font-family: "华文楷体";
  color: #bbb;
}
</style>
