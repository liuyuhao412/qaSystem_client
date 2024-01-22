<template>
  <div class="chat_container">
    <div class="chat_box" ref="chatBox">
      <div
        v-for="(message, index) in messagesList"
        :key="index"
        :class="[message.role === 'user' ? 'user_message' : 'system_message']"
      >
        <span v-if="message.role === 'user'" class="iconfont user_icon"
          >&#xe625;</span
        >
        <span v-html="message.text"></span>
        <span v-if="message.role === 'system'" class="iconfont system_icon"
          >&#xe61a;</span
        >
      </div>
      <div class="user_input">
        <el-input
          v-model="newMessage"
          type="text"
          placeholder="请输入您要提问的问题"
          @keydown.enter.prevent="sendMessageOnEnter"
          class="qa_input"
        ></el-input>
        <el-button class="input_btn" @click="sendMessage">
          <span class="iconfont input_icon">&#xe63b;</span>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { ChatApi } from "@/api/user";

interface Message {
  text: string;
  role: string;
}

const messagesList = ref<Message[]>([]);
const chatBox = ref<HTMLDivElement | null>(null);
const newMessage = ref<string>("");
const username: string | null = localStorage.getItem("username");

const chatToBottom = () => {
  if (chatBox.value) {
    chatBox.value.scrollTop = chatBox.value.scrollHeight;
  }
};

onMounted(() => {
  chatToBottom();
});

const sendMessage = async () => {
  if (newMessage.value.trim() === "") return;
  messagesList.value.push({ text: newMessage.value, role: "user" });
  const question = newMessage.value;
  newMessage.value = "";
  chatToBottom();
  ChatApi({ question: question, username: username }).then((res) => {
    messagesList.value.push({ text: res.data.answer, role: "system" });
    chatToBottom();
  });
};

const sendMessageOnEnter = () => {
  sendMessage();
};
</script>

<style scoped>
.chat_container {
  overflow-x: hidden;
  position: relative;
  height: 650px;
  max-width: 100%;
  padding-top: 10px;
  margin: 0 auto;
  /*border: 1px solid #c0c9d2;*/
}

.top {
  height: 50px;
}

.chat_box {
  max-height: 5000px;
  overflow-y: auto;
  max-height: 580px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-bottom: 20px;
}

/* 滚轮样式的伪类选择器 */
.chat_box::-webkit-scrollbar {
  width: 5px;
}
/*滚轮滑块颜色*/
.chat_box::-webkit-scrollbar-thumb {
  background-color: #99b4c7;
}
/*滚轮轨道颜色*/
.chat_box::-webkit-scrollbar-track {
  background-color: #f0f0f0;
}

.user_message,
.system_message {
  display: flex;
  font-size: 15px;
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #ecf0f1;
  color: #333;
  word-wrap: break-word;
}

.user_message {
  /*flex中元素在主轴上对齐方式*/
  align-self: flex-start;
  margin-left: 8px;
}

.system_message {
  align-self: flex-end;
  margin-right: 8px;
}

.user_input {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 100%;
  bottom: 0px;
}

.qa_input {
  width: 90%;
  height: 40px;
  outline: none;
  border-radius: 4px;
}

.input_btn {
  height: 40px;
  border: none;
  float: right;
  margin-left: 5px;
  margin-right: 10px;
}

.input_icon,
.user_icon,
.system_icon {
  font-size: 20px;
  padding-top: 1px;
}
.user_icon {
  margin-right: 5px;
  color: #3498db;
}
.system_icon {
  margin-left: 5px;
}
</style>
