<template>
  <div class="vm-center">
    <vm-center-top :center-top="centerTop"></vm-center-top>
    <vm-center-content></vm-center-content>
  </div>
</template>

<script>
import VmCenterTop from "@/views/childComps/VmCenterTop";
import VmCenterContent from "@/views/childComps/VmCenterContent";

export default {
  name: "VmCenter",
  components: {
    VmCenterTop,
    VmCenterContent,
  },
  props: {
    centerTop: {},
  },
};
</script>

<style scoped>
</style>