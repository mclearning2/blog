<template>
  <ul class="main-dock" @mousemove="dockEffect" @mouseleave="dockOff">
    <li
      v-for="(item, idx) of dockItems"
      :key="item.path"
      class="main-dock__item"
    >
      <NuxtLink :to="item.path" class="main-dock-link">
        <img
          class="main-dock__icon"
          :src="loadDockImage(item.name)"
          alt="dockIcon"
          @mouseenter.self="$set(dockFlag, idx, true)"
          @mouseleave.self="$set(dockFlag, idx, false)"
        />
      </NuxtLink>
      <div class="main-dock__name" :class="{ active: dockFlag[idx] }">
        {{ item.name }}
      </div>
    </li>
  </ul>
</template>

<script>
import variable from '~/assets/scss/abstract/variable.scss';
export default {
  data() {
    return {
      dockItems: [],
      dockFlag: [],
      dockItemWidths: [],
      dockRequestId: undefined,
      dockAniSpeed: 3,
    };
  },
  computed: {
    itemLength() {
      return this.dockItems.length;
    },
    dockWidth() {
      let w = variable.dockWidth;
      if (w.includes('rem')) {
        w = parseInt(w.slice(0, -3) + '0');
      } else if (w.includes('px')) {
        w = parseInt(w.slice(0, -2));
      } else {
        throw new Error("dockWidth must be in 'rem', 'px'");
      }
      return w;
    },
  },
  created() {
    this.dockItems = this.$router.options.routes;
    this.dockFlag = Array.from(
      { length: this.dockItems.length },
      (i) => (i = false)
    );
    this.dockItemWidths = Array.from(
      { length: this.dockItems.length },
      (i) => (i = this.dockWidth)
    );
  },
  methods: {
    loadDockImage(name) {
      let img = null;
      try {
        img = require(`~/assets/images/dock/${name}.png`);
      } catch (error) {
        console.log(error);
        console.log(`Can't load '${name}.png'. Change to default image`);
        img = require(`~/assets/images/dock/dock_default.png`);
      }

      return img;
    },
    dockOff() {
      window.cancelAnimationFrame(this.dockRequestId);
      this.dockRequestId = undefined;

      const itemEls = this.$el.querySelectorAll('.main-dock__icon');
      let allDone = true;
      for (let i = 0; i < itemEls.length; i++) {
        const el = itemEls[i];
        if (this.dockItemWidths[i] > this.dockWidth) {
          this.dockItemWidths[i] = this.dockItemWidths[i] - this.dockAniSpeed;
          el.style.width = `${this.dockItemWidths[i]}px`;
          allDone = false;
        }
      }
      if (!allDone) {
        this.dockRequestId = window.requestAnimationFrame(this.dockOff);
      }
    },
    dockEffect(e) {
      window.cancelAnimationFrame(this.dockRequestId);
      this.dockRequestId = undefined;

      const dockRect = e.target.getBoundingClientRect();
      const cursorY = e.clientY - dockRect.top;
      const itemEls = this.$el.querySelectorAll('.main-dock__icon');

      let allDone = true;
      for (let i = 0; i < itemEls.length; i++) {
        const el = itemEls[i];
        const elRect = el.getBoundingClientRect();
        const itemCenterY = elRect.top - dockRect.top + elRect.height / 2;
        const distance = Math.abs(itemCenterY - cursorY) - elRect.height / 2;
        const goalWidth = Math.round(
          Math.max(
            this.dockWidth,
            this.dockWidth * 1.8 - Math.max(0, distance / 3)
          )
        );
        if (this.dockItemWidths[i] < goalWidth) {
          this.dockItemWidths[i] = Math.min(
            goalWidth,
            this.dockItemWidths[i] + this.dockAniSpeed
          );
          el.style.width = `${this.dockItemWidths[i]}px`;
          allDone = false;
        } else if (this.dockItemWidths[i] > goalWidth) {
          this.dockItemWidths[i] = Math.max(
            goalWidth,
            this.dockItemWidths[i] - this.dockAniSpeed
          );
          el.style.width = `${this.dockItemWidths[i]}px`;
          allDone = false;
        }
      }
      if (!allDone) {
        this.dockRequestId = window.requestAnimationFrame(() => {
          this.dockEffect(e);
        });
      }
    },
  },
};
</script>
