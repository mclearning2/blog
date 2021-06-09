<template>
  <Default>
    <div class="folder-window">
      <FolderWindowNavigation></FolderWindowNavigation>
      <FolderWindowHeader></FolderWindowHeader>
      <div class="folder-body">
        <Nuxt />
      </div>
    </div>
  </Default>
</template>

<script>
import Default from '~/layouts/default.vue';
export default {
  components: {
    Default,
  },
};
</script>
