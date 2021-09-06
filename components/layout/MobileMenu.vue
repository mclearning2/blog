<template>
  <section
    class="mobile-menu"
    :class="{ active: $store.state.activeMobileMenu }"
  >
    <common-search></common-search>
    <common-dock></common-dock>
  </section>
</template>

<script>
export default {};
</script>

<style></style>
