<template>
  <div id="css-mac-two-factor" ref="wrapper">
    <input maxlength="1" />
    <input maxlength="1" />
    <input maxlength="1" />
    <input maxlength="1" />
    <input maxlength="1" />
  </div>
</template>

<script>
export default {
  mounted() {
    const i = this.$refs.wrapper;

    i.onkeydown = function (e) {
      const target = e.target;

      // backspace를 누를 경우 뒤로 넘어가도록 합니다.
      if (e.key.toLowerCase() === 'backspace') {
        if (target.value.length === 1) {
          target.value = '';
          e.preventDefault();
          if (target.previousElementSibling) {
            target.previousElementSibling.focus();
          }
        } else if (target.value.length === 0) {
          if (target.previousElementSibling) {
            target.previousElementSibling.focus();
          }
        }
      }
      // backspace외의 키를 누를 경우 입력해줍니다.
      else {
        const maxlength = parseInt(target.attributes.maxlength.value);
        if (target.value.length === maxlength - 1 && e.key.length <= 1) {
          target.value = target.value + e.key;
          e.preventDefault();
          if (target.nextElementSibling) {
            target.nextElementSibling.focus();
          }
        } else if (target.value.length === maxlength) {
          if (target.nextElementSibling) {
            target.nextElementSibling.focus();
          }
        }
      }
    };
  },
};
</script>

<style scoped>
#css-mac-two-factor {
  margin: 30px auto;
  text-align: center;
}
#css-mac-two-factor input {
  width: 30px;
  height: 30px;
  margin-right: 10px;
  text-align: center;
}
</style>
