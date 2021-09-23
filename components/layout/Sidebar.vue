<template>
  <aside class="site-sidebar">
    <!-- Tag Cloud -->
    <common-tag-cloud></common-tag-cloud>
    <div class="site-sidebar__sticky">
      <!-- TOC -->
      <common-toc
        v-if="$store.state.postList <= 0"
        class="site-sidebar__toc"
      ></common-toc>

      <!-- AD -->
      <common-ad :ad-slot="'4908962850'" class="site-sidebar__ad"></common-ad>
    </div>
  </aside>
</template>
