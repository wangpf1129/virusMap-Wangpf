<template>
  <div class="center-top">
    <!--数字模块-->
    <div class="no">
      <div class="no-hd">
        <ul>
          <li>{{ centerTop.confirm }}</li>
          <li>{{ centerTop.nowConfirm }}</li>
          <li>{{ centerTop.heal }}</li>
          <li>{{ centerTop.dead }}</li>
        </ul>
      </div>
      <div class="no-bd">
        <ul>
          <li>累计确诊</li>
          <li>现存确诊</li>
          <li>累计治愈</li>
          <li>累计死亡</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VmCenterTop",
  props: {
    centerTop: {},
  },
};
</script>

<style scoped>
.no {
  background-color: rgba(101, 123, 226, 0.1);
  padding: 15px;
}

.no .no-hd {
  position: relative;
  border: 1px solid rgba(25, 186, 139, 0.17);
}

.no .no-hd::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 10px;
  border-top: 2px solid #02a6b5;
  border-left: 2px solid #02a6b5;
}

.no .no-hd::after {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  width: 30px;
  height: 10px;
  border-bottom: 2px solid #02a6b5;
  border-right: 2px solid #02a6b5;
}

.no .no-hd ul {
  display: flex;
}

.no .no-hd ul li {
  flex: 1;
  height: 80px;
  font-size: 45px;
  line-height: 80px;
  color: #ffeb7b;
  font-family: "electronicFont";
  text-align: center;
}
.no .no-hd ul li:nth-child(1) {
  position: relative;
}

.no .no-hd ul li:nth-child(1)::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  height: 40px;
  width: 1px;
  background-color: rgba(255, 255, 255, 0.2);
  font-size: 18px;
  padding-top: 10px;
}

.no .no-bd ul {
  display: flex;
}

.no .no-bd li {
  flex: 1;
  height: 40px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 18px;
  padding-top: 15px;
  text-align: center;
}
</style>