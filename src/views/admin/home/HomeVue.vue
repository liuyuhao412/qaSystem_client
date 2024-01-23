<template>
  <div class="wrapper">
    <div class="top">
      <div class="user_count">
        <span class="label">用户总数</span>
        <span class="total">{{ userTotal }}</span>
      </div>
      <div class="log_count">
        <span class="label">用户登录次数</span>
        <span class="total">{{ logTotal }}</span>
      </div>
    </div>
    <div class="bottom">
      <div ref="chartUserRef" class="chart-container"></div>
      <div ref="chartLoginRef" class="chart-container"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";

import { ref, onMounted } from "vue";
import {
  GetUserCountApi,
  GetRegisterListApi,
  GetUserLogApi,
  GetLoginListApi,
} from "@/api/admin";
const userTotal = ref(0);
const logTotal = ref(0);
const chartUserRef = ref<HTMLElement | null>(null);
const chartLoginRef = ref<HTMLElement | null>(null);
const userCountList = ref([]);
const logCountList = ref([]);

const init_chart_user = () => {
  const options = ref({
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
        crossStyle: {
          color: "#999",
        },
      },
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ["line", "bar"] },
        saveAsImage: { show: true },
      },
    },
    legend: {
      data: ["新注册用户数"],
    },
    xAxis: [
      {
        type: "category",
        data: [
          "2024-01",
          "2024-02",
          "2024-03",
          "2024-04",
          "2024-05",
          "2024-06",
          "2024-07",
          "2024-08",
          "2024-09",
          "2024-10",
          "2024-11",
          "2024-12",
        ],
        axisPointer: {
          type: "shadow",
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "新注册用户数",
        min: 0,
        max: 50,
        interval: 5,
        axisLabel: {
          formatter: "{value}人 ",
        },
      },
    ],
    series: [
      {
        name: "新注册用户数",
        type: "bar",
        tooltip: {
          valueFormatter: function (value: number) {
            return value + " 人";
          },
        },
        data: userCountList.value,
      },
    ],
  });
  if (chartUserRef.value) {
    const myChart = echarts.init(chartUserRef.value);
    myChart.setOption(options.value);
    window.addEventListener("resize", () => {
      myChart.resize();
    });
  }
};

const init_chart_login = () => {
  const options = ref({
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
        crossStyle: {
          color: "#999",
        },
      },
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ["line", "bar"] },
        saveAsImage: { show: true },
      },
    },
    legend: {
      data: ["用户登录次数"],
    },
    xAxis: [
      {
        type: "category",
        data: [
          "2024-01",
          "2024-02",
          "2024-03",
          "2024-04",
          "2024-05",
          "2024-06",
          "2024-07",
          "2024-08",
          "2024-09",
          "2024-10",
          "2024-11",
          "2024-12",
        ],
        axisPointer: {
          type: "shadow",
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "用户登录次数",
        min: 0,
        max: 50,
        interval: 5,
        axisLabel: {
          formatter: "{value}次 ",
        },
      },
    ],
    series: [
      {
        name: "用户登录次数",
        type: "line",
        tooltip: {
          valueFormatter: function (value: number) {
            return value + " 人";
          },
        },
        data: logCountList.value,
      },
    ],
  });
  if (chartLoginRef.value) {
    const myLogChart = echarts.init(chartLoginRef.value);
    myLogChart.setOption(options.value);
    window.addEventListener("resize", () => {
      myLogChart.resize();
    });
  }
};

const get_user_cout = () => {
  GetUserCountApi().then((res) => {
    userTotal.value = res.data.count;
  });
  GetUserLogApi().then((res) => {
    logTotal.value = res.data.count;
  });
};

const get_register_list = () => {
  GetRegisterListApi().then((res) => {
    userCountList.value = res.data.user_list;
    init_chart_user();
  });
  GetLoginListApi().then((res) => {
    logCountList.value = res.data.user_list;
    init_chart_login();
  });
};

onMounted(get_user_cout);
onMounted(get_register_list);
</script>

<style scoped>
@import "animate.css";
.top {
  height: 100px;
  width: 100%;
  margin-top: 30px;
  display: flex;
  position: relative;
}
.user_count,
.log_count {
  width: 250px;
  height: 100px;
  margin-left: 40px;
  background-color: #f4f4f4;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.5),
    -2px -2px 5px 0px rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.log_count {
  margin-left: 350px;
}
.bottom {
  width: 1200px;
  height: 400px;
  margin-left: 20px;
  margin-top: 50px;
  display: flex;
}
.user_count span {
  font-size: 20px;
  color: blueviolet;
}

.label {
  font-size: 20px;
  color: blueviolet;
  margin-bottom: 10px;
  margin-left: 20px;
  text-align: left;
}

.total {
  font-size: 24px;
  color: blueviolet;
  text-align: center;
}

.chart-container {
  width: 100%;
  height: 100%;
}
</style>
