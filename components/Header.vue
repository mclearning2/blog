<template>
  <header class="main-header">
    <img
      class="main-header__logo"
      src="~assets/images/logo.png"
      alt="main-header__logo"
    />
    <div class="main-header__title">{{ title }}</div>
    <div class="main-header__content-title">글 제목</div>
    <ul class="right-section">
      <li class="right-section__item">
        <a href="">
          <img src="~assets/images/header/icon_github.svg" alt="icon_github" />
        </a>
      </li>
      <li class="right-section__item">
        <a href="">
          <img src="~assets/images/header/icon_mail.svg" alt="icon_mail" />
        </a>
      </li>
      <li class="right-section__item clock">
        <Clock></Clock>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  data() {
    return {
      title: '',
    };
  },
  head() {
    return {
      changed: (info) => {
        this.title = info.title;
      },
    };
  },
};
</script>
