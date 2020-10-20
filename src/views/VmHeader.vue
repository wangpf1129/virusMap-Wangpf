<template>
  <div class="header">
    <h1>世界新型冠状肺炎疫情实时监测</h1>
    <zp-time class="showTime"></zp-time>
  </div>
</template>

<script>
import ZpTime from "@/components/common/ZpTime";
export default {
  name: "VmHeader",
  components: {
    ZpTime,
  },
};
</script>

<style scoped>

.header {
  position: relative;
  height: 100px;
  background: url("~@/assets/image/head_bg.png") no-repeat top center;
  background-size: 100%, 100%;
}

.header h1 {
  color: #fff;
  text-align: center;
  font-size: 38px;
  line-height: 80px;
}

.header .showTime {
  position: absolute;
  right: 30px;
  top: 0;
  line-height: 75px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 20px;
}
</style>

