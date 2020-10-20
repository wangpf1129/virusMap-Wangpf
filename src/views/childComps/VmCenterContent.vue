<template>
  <div class="conter-content">
    <div class="map">
      <div class="worldMap"></div>
      <div class="map1"></div>
      <div class="map2"></div>
      <div class="map3"></div>
      <div class="btn">
        <button @click="btnclick1" :class="{ click: ifclick1 }">
          累计确诊
        </button>
        <button @click="btnclick2" :class="{ click: ifclick2 }">
          现存确诊
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import "@/common/world";
import { nameMap } from "@/common/nameMap";
import { worldMapOption } from "@/common/option";
import { getWorldData, addChart } from "@/network/charts.js";

export default {
  name: "VmCenterContent",
  data() {
    return {
      confirmData: [],
      confirmDataNow: [],
      worldMapOption: {},
      chart: {},
      ifclick1: true,
      ifclick2: false,
    };
  },
  methods: {
    btnclick1() {
      if (this.ifclick1) {
        return;
      } else {
        this.ifclick1 = true;
        this.ifclick2 = false;
        // 现存确诊数据
        this.worldMapOption.series[0].data = this.confirmData;
        this.chart.setOption(this.worldMapOption);
      }
    },
    btnclick2() {
      if (this.ifclick2) {
        return;
      } else {
        this.ifclick1 = false;
        this.ifclick2 = true;
        // 现存确诊数据
        this.worldMapOption.series[0].data = this.confirmDataNow;
        this.chart.setOption(this.worldMapOption);
      }
    },
  },
  mounted() {
    this.worldMapOption = worldMapOption();

    //  把世界地图中英文对映关系 放到里面
    this.worldMapOption.series[0].nameMap = nameMap;
    // console.log(this.worldMapOption);
    getWorldData().then((res) => {
      console.log(res);
      let name = res[1].name;
      let confirm = res[1].confirm;
      let nowConfirm = res[1].nowConfirm;

      // 把中国的数据 加入里面
      res[0].confirmData.push({ name, value: confirm });
      res[0].nowConfirmData.push({ name, value: nowConfirm });

      this.confirmData = res[0].confirmData;
      this.confirmDataNow = res[0].nowConfirmData;
      // 累计确诊数据
      this.worldMapOption.series[0].data = this.confirmData;
      let worldMap = document.querySelector(".worldMap");
      this.chart = addChart(worldMap, this.worldMapOption);
    });
  },
};
</script>

<style scoped>
.map {
  position: relative;
  height: 810px;
}

.map .worldMap {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  height: 810px;
  width: 100%;
}

.map .map1,
.map .map2,
.map .map3 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 518px;
  height: 518px;
  background: url("~@/assets/image/map.png") no-repeat;
  background-size: 100%, 100%;
  opacity: 0.4;
}

.map .map2 {
  width: 643px;
  height: 643px;
  background: url("~@/assets/image/lbx.png") no-repeat;
  background-size: 100%, 100%;
  animation: map2Rotate 10s linear infinite;
}

.map .map3 {
  width: 566px;
  height: 566px;
  background: url("~@/assets/image/jt.png") no-repeat;
  background-size: 100%, 100%;
  animation: map3Rotate 10s linear infinite;
}
.btn {
  width: 810px;
  position: absolute;
  top: 40px;
  display: flex;
  justify-content: space-around;
}
.btn button {
  height: 60px;
  width: 200px;
  font-size: 25px;
  z-index: 10;
  border-radius: 30px;
  background-color: #62b6ff3d;
  border: none;
  color: white;
  cursor: pointer;
}
.btn .click {
  color: #ffe14d;
}

.btn button:focus {
  outline: none;
}

@keyframes map2Rotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes map3Rotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  to {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}
</style>