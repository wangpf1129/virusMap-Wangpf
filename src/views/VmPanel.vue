<template>
  <div class="panel">
    <slot name="panelcontent">
      <h2>柱形图</h2>
      <div class="chart"></div>
    </slot>
    <div class="panel-footer"></div>
  </div>
</template>

<script>
export default {
  name: "VmPanel",
};
</script>

<style scoped>
.panel {
  position: relative;
  height: 310px;
  border: 1px solid rgba(25, 186, 139, 0.17);
  background: url("~@/assets/image/line(1).png") no-repeat;
  background-size: 100%, 100%;
  padding: 0 15px 40px;
  margin-bottom: 15px;
  background-color: rgba(0, 0, 0, 0.2);
}
.panel::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 10px;
  width: 10px;
  border-top: 2px solid #02a6b5;
  border-left: 2px solid #02a6b5;
}
.panel::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  height: 10px;
  width: 10px;
  border-top: 2px solid #02a6b5;
  border-right: 2px solid #02a6b5;
}
.panel h2 {
  font-size: 20px;
  height: 48px;
  color: #fff;
  text-align: center;
  padding-top: 10px;
  font-weight: 400;
}
.panel h2 a {
  color: #fff;
  text-decoration: none;
  padding-left: 10px;
}
.panel .panel-footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}
.panel .panel-footer::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  border-bottom: 2px solid #02a6b5;
  border-left: 2px solid #02a6b5;
  width: 10px;
  height: 10px;
}
.panel .panel-footer::after {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  border-bottom: 2px solid #02a6b5;
  border-right: 2px solid #02a6b5;
  width: 10px;
  height: 10px;
}
.panel .chart {
  height: 240px;
}
</style>