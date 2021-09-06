<template>
  <nav v-if="toc.length > 0" class="toc-nav layout-block">
    <h2 class="title">Table of content</h2>
    <ol class="toc-list">
      <li
        v-for="t of toc"
        :key="t.id"
        class="toc-item"
        :class="{ active: t.id === activeId }"
      >
        <span
          v-if="t.depth == 2"
          class="toc-text"
          @click="clickTocItem('#' + t.id)"
        >
          {{ t.text }}
        </span>
        <ul v-if="t.children.length > 0" class="toc-sub-list">
          <li
            v-for="sub of t.children"
            :key="sub.id"
            class="toc-sub-item"
            :class="{ active: sub.id === activeId }"
          >
            <span class="toc-text" @click="clickTocItem('#' + sub.id)">
              {{ sub.text }}
            </span>
          </li>
        </ul>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      activeId: null,
    };
  },
  computed: {
    toc() {
      if (!this.$store.state.post.toc) {
        return [];
      }
      const tocList = [];
      for (const t of this.$store.state.post.toc) {
        if (t.depth === 2) {
          tocList.push({
            id: t.id,
            text: t.text,
            depth: t.depth,
            children: [],
          });
        } else {
          tocList[tocList.length - 1].children.push({
            id: t.id,
            text: t.text,
            depth: t.depth,
          });
        }
      }
      return tocList;
    },
  },
  mounted() {
    // for TOC highlight
    window.addEventListener('scroll', this.scrollHandler);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollHandler);
  },
  methods: {
    clickTocItem(elId) {
      const offsetTop = document.querySelector(elId).offsetTop;
      scroll({
        top: offsetTop,
        behavior: 'smooth',
      });
    },
    scrollHandler() {
      for (const t of this.$store.state.post.toc) {
        const elScrollY = document
          .querySelector('#' + t.id)
          .getBoundingClientRect().top;
        if (elScrollY <= 10) {
          this.activeId = t.id;
        }
      }
    },
  },
};
</script>
