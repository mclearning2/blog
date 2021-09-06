<template>
  <div class="sns">
    <a
      v-for="(sns, name) in snsLinks"
      :key="sns.link"
      :href="sns.link"
      :class="name"
      class="sns__item"
    >
      <img :src="sns.image" :alt="name" />
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      snsLinks: {
        mail: {
          link: 'mailto:mclearning2@gmail.com',
          image: require('~/assets/images/sns/mail.png'),
        },
        facebook: {
          link: 'https://www.facebook.com/mclearning2',
          image: require('~/assets/images/sns/facebook.png'),
        },
        twitter: {
          link: 'https://twitter.com/mclearning2',
          image: require('~/assets/images/sns/twitter.png'),
        },
        instagram: {
          link: 'https://www.instagram.com/mclearning_dev/',
          image: require('~/assets/images/sns/instagram.png'),
        },
        github: {
          link: 'https://github.com/mclearning2',
          image: require('~/assets/images/sns/github.png'),
        },
        // linkedin: '',
        // youtube: '',
      },
    };
  },
};
</script>
