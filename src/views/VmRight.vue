<template>
  <div class="vm-right">
    <vm-panel>
      <div slot="panelcontent">
        <h2>主要疫情国家治愈率</h2>
        <div class="chart nationalCureRate"></div>
      </div>
    </vm-panel>
    <vm-panel>
      <div slot="panelcontent">
        <h2>世界每周新增治愈和死亡人数</h2>
        <div class="chart healAndDead"></div>
      </div>
    </vm-panel>
    <vm-panel>
      <div slot="panelcontent">
        <h2>境外输入病情top10省份</h2>
        <div class="chart importeDepidemic"></div>
      </div>
    </vm-panel>
  </div>
</template>

<script>
import VmPanel from "@/views/VmPanel";

import { addChart } from "@/network/charts";
export default {
  name: "VmRight",
  components: {
    VmPanel,
  },
  props: {
    option2: {},
    option4: {},
    option6: {},
  },
  watch: {
    option2() {
      let nationalCureRate = document.querySelector(".nationalCureRate");
      addChart(nationalCureRate, this.option2);
    },
    option4() {
      let healAndDead = document.querySelector(".healAndDead");
      addChart(healAndDead, this.option4);
    },
    option6() {
      let importeDepidemic = document.querySelector(".importeDepidemic");
      addChart(importeDepidemic, this.option6);
    },
  },
};
</script>

<style scoped>
</style>