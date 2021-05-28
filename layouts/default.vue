<template>
  <div id="main">
    <Header />
    <Dock />
    <Nuxt v-if="!$slots.default" />
    <slot />
  </div>
</template>

<script></script>
