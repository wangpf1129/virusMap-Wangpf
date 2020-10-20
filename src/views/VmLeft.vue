<template>
  <div class="vm-left">
    <vm-panel>
      <div slot="panelcontent">
        <h2>国家新增确诊TOP10</h2>
        <div class="chart newDiagnosis"></div>
      </div>
    </vm-panel>
    <vm-panel>
      <div slot="panelcontent">
        <h2>主要大洲感染总人数趋势图</h2>
        <div class="chart infectedLine"></div>
      </div>
    </vm-panel>
    <vm-panel>
      <div slot="panelcontent">
        <h2>大洲感染人数饼状图</h2>
        <div class="chart infectedPie"></div>
      </div>
    </vm-panel>
  </div>
</template>

<script>
import VmPanel from "@/views/VmPanel";

import { addChart } from "@/network/charts";

export default {
  name: "VmLeft",
  components: {
    VmPanel,
  },
  props: {
    option1: {},
    option3: {},
    option5: {},
  },
  watch: {
    option1() {
      let newDiagnosis = document.querySelector(".newDiagnosis");
      addChart(newDiagnosis, this.option1);
    },
    option3() {
      let infectedLine = document.querySelector(".infectedLine");
      addChart(infectedLine, this.option3);
    },
    option5() {
      let infectedPie = document.querySelector(".infectedPie");
      addChart(infectedPie, this.option5);
    },
  },
};
</script>

<style scoped>
</style>