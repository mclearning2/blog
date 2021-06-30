<template>
  <span>
    {{ currentTime() }}
  </span>
</template>

<script>
export default {
  methods: {
    currentTime() {
      const date = new Date();
      const m = date.getMonth() + 1;
      const d = date.getDate();
      const D = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];

      // https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
      let h = date.getHours();
      const ampm = h >= 12 ? '오후' : '오전';
      h = h % 12;
      h = h === 0 ? 12 : h; // the hour '0' should be '12'
      let M = date.getMinutes();
      M = M < 10 ? '0' + M : M;

      return `${m}월 ${d}일 (${D}) ${ampm} ${h}:${M}`;
    },
  },
};
</script>
