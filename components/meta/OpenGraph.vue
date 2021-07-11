<template>
  <span v-if="false" />
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      default: 'article',
    },
    url: {
      type: String,
      default: 'https://mclearning-blog.com',
    },
  },

  head() {
    return {
      title: this.title,
      meta: [
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.description,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.url + this.image,
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: this.title,
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: this.type,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.title,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.description,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.url + this.image,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.url + this.path,
        },
        {
          hid: 'og:image:secure_url',
          property: 'og:image:secure_url',
          content: this.url + this.image,
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: this.title,
        },
      ],
    };
  },
};
</script>
