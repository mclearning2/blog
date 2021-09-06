<template>
  <div class="site-dock">
    <ul class="dock" @mouseleave="dockOff" @mousemove="dockEffect">
      <li
        v-for="(item, idx) of $store.state.dockItems"
        :key="item.path"
        class="dock-item"
        :style="{ order: item.order }"
      >
        <a :href="item.path" class="dock-item__link">
          <img
            :src="loadDockImage(item.name)"
            alt="dock-icon"
            class="dock-item__icon"
            @mouseenter.self="$set(dockFlag, idx, true)"
            @mouseleave.self="$set(dockFlag, idx, false)"
          />
          <div
            :href="item.path"
            :class="{ active: dockFlag[idx] }"
            class="dock-item__name"
          >
            {{ item.name }}
          </div>
          <div
            :href="item.path"
            :class="{ active: dockFlag[idx] }"
            class="dock-item__name total"
          >
            {{ item.length }}
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import variable from '~/assets/scss/abstract/variable.scss';

export default {
  data() {
    return {
      dockFlag: [],
      dockRequestId: undefined,
      dockAniSpeed: 3,
    };
  },
  computed: {
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
    breakpointMobile() {
      let b = variable.breakpointMobile;
      if (b.includes('rem')) {
        b = parseInt(b.slice(0, -3) + '0');
      } else if (b.includes('px')) {
        b = parseInt(b.slice(0, -2));
      } else {
        throw new Error("dockWidth must be in 'rem', 'px'");
      }
      return b;
    },

    dockItemWidths() {
      return Array.from(
        { length: this.$store.state.dockItems.length },
        (i) => (i = this.dockWidth)
      );
    },
  },
  created() {
    this.dockFlag = Array.from(
      { length: this.$store.state.dockItems.length },
      (i) => (i = false)
    );
  },
  methods: {
    loadDockImage(name) {
      return require(`~/assets/images/dock/${name.toLowerCase()}.png`);
    },
    dockOff() {
      if (window.innerWidth < this.breakpointMobile) {
        return;
      }

      window.cancelAnimationFrame(this.dockRequestId);
      this.dockRequestId = undefined;

      const itemEls = this.$el.querySelectorAll('.dock-item__icon');
      let allDone = true;
      for (let i = 0; i < itemEls.length; i++) {
        const el = itemEls[i];
        if (this.dockItemWidths[i] > this.dockWidth) {
          this.dockItemWidths[i] = this.dockItemWidths[i] - this.dockAniSpeed;
          el.style.width = `${this.dockItemWidths[i]}px`;
          el.style.height = `${this.dockItemWidths[i]}px`;
          allDone = false;
        }
      }
      if (!allDone) {
        this.dockRequestId = window.requestAnimationFrame(this.dockOff);
      }
    },
    dockEffect(e) {
      if (window.innerWidth < this.breakpointMobile) {
        return;
      }

      window.cancelAnimationFrame(this.dockRequestId);
      this.dockRequestId = undefined;

      const dockRect = e.target.getBoundingClientRect();

      // Dock 내에서의 mouse y좌표
      const cursorY = e.clientY - dockRect.top;

      const itemEls = this.$el.querySelectorAll('.dock-item__icon');
      let allDone = true; // 모든 dock item이 목표 width까지 변했는지
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
          el.style.height = `${this.dockItemWidths[i]}px`;
          allDone = false;
        } else if (this.dockItemWidths[i] > goalWidth) {
          this.dockItemWidths[i] = Math.max(
            goalWidth,
            this.dockItemWidths[i] - this.dockAniSpeed
          );
          el.style.width = `${this.dockItemWidths[i]}px`;
          el.style.height = `${this.dockItemWidths[i]}px`;
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
