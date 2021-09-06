<template>
  <nav class="pagination">
    <div
      class="pag-item first-arrow"
      :class="{ disable: isFirst }"
      @click="$emit('toFirstPage')"
    >
      <img
        src="~/assets/images/common/double_open_bracket.svg"
        alt="first-arrow"
      />
    </div>
    <div
      class="pag-item prev-arrow"
      :class="{ disable: isFirst }"
      @click="$emit('toPrevPage')"
    >
      <img src="~/assets/images/common/open_bracket.svg" alt="prev-arrow" />
    </div>
    <ul class="page-number">
      <li
        v-for="i of pages"
        :key="i"
        class="pag-item num-item"
        :class="{ active: i === num }"
        @click="$emit('clickNum', i)"
      >
        {{ i + 1 }}
      </li>
    </ul>
    <div
      class="pag-item next-arrow"
      :class="{ disable: isLast }"
      @click="$emit('toNextPage')"
    >
      <img src="~/assets/images/common/close_bracket.svg" alt="next-arrow" />
    </div>
    <div
      class="pag-item last-arrow"
      :class="{ disable: isLast }"
      @click="$emit('toLastPage')"
    >
      <img
        src="~/assets/images/common/double_close_bracket.svg"
        alt="last-arrow"
      />
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      required: true,
    },
    num: {
      type: Number,
      required: true,
    },
    showLen: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      start: 0,
      end: 4,
    };
  },
  computed: {
    pages() {
      const range = (start, stop, step) =>
        Array.from(
          { length: (stop - start) / step + 1 },
          (_, i) => start + i * step
        );
      return range(this.start, this.end, 1);
    },
    isFirst() {
      return this.num === 0;
    },
    isLast() {
      return this.num === this.total - 1;
    },
  },
  watch: {
    num() {
      this.setRange();
    },
    total() {
      this.setRange();
    },
  },
  mounted() {
    this.setRange();
  },
  methods: {
    setRange() {
      const start = this.num - parseInt(this.showLen / 2);
      const end = this.num + parseInt(this.showLen / 2);

      if (start < 0) {
        this.start = 0;
        this.end = Math.min(this.total - 1, this.showLen - 1);
      } else if (this.total - 1 < end) {
        this.start = Math.max(0, this.total - this.showLen);
        this.end = this.total - 1;
      } else {
        this.start = start;
        this.end = end;
      }
    },
  },
};
</script>

<style></style>
