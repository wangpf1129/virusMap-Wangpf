<template>
  <div id="app">
    <vm-header></vm-header>
    <div class="mainbox">
      <vm-left
        class="left"
        :option1="option1"
        :option3="option3"
        :option5="option5"
      ></vm-left>
      <vm-center class="center" :center-top="centerTop"></vm-center>
      <vm-right
        class="right"
        :option2="option2"
        :option4="option4"
        :option6="option6"
      ></vm-right>
    </div>
  </div>
</template>

<script>
import VmHeader from "@/views/VmHeader";
import VmLeft from "@/views/VmLeft";
import VmCenter from "@/views/VmCenter";
import VmRight from "@/views/VmRight";

import { getForeignData } from "@/network/charts.js";

export default {
  name: "App",
  components: {
    VmHeader,
    VmLeft,
    VmCenter,
    VmRight,
  },
  data() {
    return {
      option1: {},
      option2: {},
      option3: {},
      option4: {},
      option5: {},
      option6: {},
      centerTop: {},
    };
  },
  mounted() {
    getForeignData().then((res) => {
      // 国家新增确诊排行  数据
      this.option1 = res.option1;
      this.option2 = res.option2;
      this.option3 = res.option3;
      this.option4 = res.option4;
      this.option5 = res.option5;
      this.option6 = res.option6;
      this.centerTop = res.centerTop;
    });
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
li {
  list-style: none;
}
/* 声明字体*/
@font-face {
  font-family: electronicFont;
  src: url(~@/assets/font/DS-DIGIT.TTF);
}
#app {
  background: url("~@/assets/image/bg.jpg") no-repeat top center;
  background-size: 100%, 100%;
  line-height: 1.15;
}
.mainbox {
  padding: 10px 10px 0;
  display: flex;
  color: #fff;
}
.mainbox .left {
  flex: 3;
}
.mainbox .center {
  flex: 5;
}
.mainbox .right {
  flex: 3;
}
</style>

