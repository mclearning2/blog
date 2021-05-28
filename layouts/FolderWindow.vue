<template>
  <Default>
    <div class="folder-window">
      <FolderWindowNavigation></FolderWindowNavigation>
      <FolderWindowHeader></FolderWindowHeader>
      <FolderWindowBody> <Nuxt /> </FolderWindowBody>
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
