<template>
  <div>
    <div class="wrapper">
      <div class="container">
        <div class="div1">
          <span class="iconfont">&#xe608;</span>
          <span>模型结构设置</span>
        </div>
        <div class="div5">
          <span>知识库选择:</span>
          <el-select
            v-model="kb_name"
            class="m-2 select"
            size="large"
            style="width: 160px"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </div>
        <div class="div2">
          <span>匹配知识条数:</span>
          <el-input-number
            v-model="top_k"
            :min="1"
            :max="10"
            class="input_number"
          />
        </div>
        <div class="div3">
          <span>知识匹配分数阈值:</span>
          <div class="slider-demo-block slider-container">
            <el-slider
              v-model="default_score_threshold"
              size="small"
              :min="0"
              :max="2"
              :step="0.01"
            />
          </div>
        </div>
        <div class="div4">
          <span>Temperature:</span>
          <div class="slider-demo-block slider-container">
            <el-slider
              v-model="default_score_Temperature"
              size="small"
              :min="0"
              :max="1"
              :step="0.01"
            />
          </div>
        </div>
        <div class="div5">
          <el-button type="success" class="btn" @click="save">保存</el-button>
          <el-button type="primary" class="btn" @click="reset">重置</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { GetConfigApi, SaveConfigApi, SelectKbApi } from "@/api/admin";
const top_k = ref(3);
const default_score_threshold = ref(1.0);
const default_score_Temperature = ref(0.7);
const kb_name = ref<string>("Olympics");
const options = ref([{ id: 0, name: "无" }]);

const get_config = async () => {
  try {
    const res = await GetConfigApi({});
    kb_name.value = res.data.data.kb_name;
    top_k.value = res.data.data.top_k;
    default_score_threshold.value = res.data.data.score_threshold;
    default_score_Temperature.value = res.data.data.score_Temperature;
  } catch (error) {
    console.error("Axios request failed:", error);
  }
};

const SelectKb = async () => {
  try {
    const res = await SelectKbApi({});
    options.value = res.data.data;
  } catch (error) {
    console.error("Axios request failed:", error);
  }
};
onMounted(get_config);
onMounted(SelectKb);

const save = async () => {
  try {
    const res = await SaveConfigApi({
      top_k: top_k.value,
      default_score_threshold: default_score_threshold.value,
      default_score_Temperature: default_score_Temperature.value,
      kb_name: kb_name.value,
    });
    if (res.data.code == "1") {
      ElMessage({
        message: "保存成功",
        type: "success",
        duration: 1000,
      });
    }
  } catch (error) {
    console.error("Axios request failed:", error);
  }
};

const reset = async () => {
  top_k.value = 3;
  default_score_threshold.value = 1.0;
  default_score_Temperature.value = 0.7;
  kb_name.value = "Olympics";
  try {
    const res = await SaveConfigApi({
      top_k: top_k.value,
      default_score_threshold: default_score_threshold.value,
      default_score_Temperature: default_score_Temperature.value,
      kb_name: kb_name.value,
    });
    if (res.data.code == "1") {
      ElMessage({
        message: "重置成功",
        type: "success",
        duration: 1000,
      });
    }
  } catch (error) {
    console.error("Axios request failed:", error);
  }
};
</script>

<style scoped>
@import "@/assets/css/iconfont.css";
.wrapper {
  height: 600px;
  display: flex;
  align-items: center;
}
.container {
  width: 400px;
  height: 500px;
  margin-left: 100px;
  background-color: rgba(144, 136, 136, 0.1);
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.5),
    -2px -2px 5px 0px rgba(255, 255, 255, 0.5);
}

.div1,
.div2,
.div3,
.div4,
.div5 {
  margin-top: 30px;
  margin-left: 10px;
}

.div1 span {
  margin: 10px 5px;
}

.div2 span {
  margin-left: 30px;
}

.input_number {
  margin-left: 30px;
}

.div3 span {
  margin-left: 30px;
}

.slider-container {
  width: 300px; /* 调整滑块容器的宽度 */
  height: 20px; /* 调整滑块容器的高度 */
  margin-top: 20px;
  margin-left: 30px;
}

.div4 span {
  margin-left: 30px;
}

.btn {
  width: 100px;
  height: 40px;
  margin-right: 10px;
  margin-top: 30px;
}
.btn:first-child {
  margin-left: 70px;
}

.div5 span {
  margin-left: 30px;
  margin-right: 20px;
}
</style>
