<template>
  <ul class="nav">
    <li
      v-for="item of $store.state.dockItems"
      :key="item.path"
      class="nav__item"
      :style="{ order: item.order }"
    >
      <a :href="item.path" class="nav__link">{{ item.name }}</a>
    </li>
  </ul>
</template>
