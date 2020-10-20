<template>
  <div class="time">
    {{ showDate }}
  </div>
</template>

<script>
export default {
  name: "ZpTime",
  data() {
    return {
      date: new Date(),
    };
  },
  computed: {
    showDate() {
      let y = this.date.getFullYear() + "年";
      let M = this.date.getMonth() + 1 + "月";
      let d = this.date.getDate() + "日--";
      let h = this.date.getHours() + "时";
      let m = this.date.getMinutes() + "分";
      let s = this.date.getSeconds() + "秒";
      return y + M + d + h + m + s;
    },
  },
  mounted() {
    setInterval(() => {
      this.date = new Date();
    }, 1000);
  },
};
</script>

<style>
</style>