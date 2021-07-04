<template>
  <footer class="site-footer">
    <h4 class="designed-by">
      Designed by <span class="host">MCLearning2</span>
    </h4>
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
  </footer>
</template>

<script>
export default {
  data() {
    return {
      snsLinks: {
        mail: {
          link: 'mailto:mclearning2@gmail.com',
          image: require('~/assets/images/footer/sns/mail.png'),
        },
        facebook: {
          link: 'https://www.facebook.com/profile.php?id=100069912350331',
          image: require('~/assets/images/footer/sns/facebook.png'),
        },
        twitter: {
          link: 'https://twitter.com/mclearning2',
          image: require('~/assets/images/footer/sns/twitter.png'),
        },
        instagram: {
          link: 'https://www.instagram.com/mclearning2/',
          image: require('~/assets/images/footer/sns/instagram.png'),
        },
        github: {
          link: 'https://github.com/mclearning2',
          image: require('~/assets/images/footer/sns/github.png'),
        },
        // linkedin: '',
        // youtube: '',
      },
    };
  },
};
</script>
