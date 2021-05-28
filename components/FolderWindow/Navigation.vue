<template>
  <aside class="folder-navigation">
    <div class="btns">
      <div class="btn close">
        <img
          src="~/assets/images/folder/navigation/close_btn.png"
          alt="close-btn"
        />
      </div>
      <div class="btn minimize">
        <img
          src="~/assets/images/folder/navigation/minimize_btn.png"
          alt="minimize-btn"
        />
      </div>
      <div class="btn maximize">
        <img
          src="~/assets/images/folder/navigation/maximize_btn.png"
          alt="maximize-btn"
        />
      </div>
    </div>
    <div class="title">Category</div>
    <div class="category">
      <nuxt-link
        v-for="item of $router.options.routes"
        :key="item.path"
        class="category__item"
        :to="item.path"
      >
        <img
          src="~/assets/images/folder/navigation/item.png"
          alt="category_image"
          class="category__image"
        />
        <span class="category__name"> {{ item.name }} </span>
      </nuxt-link>
    </div>
  </aside>
</template>

<script>
export default {};
</script>

<style></style>
