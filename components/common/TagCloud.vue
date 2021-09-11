<template>
  <div v-if="!isTagEmpty" class="tag-cloud">
    <h2 class="tag-cloud__title">Tag Cloud</h2>
    <div id="tag-cloud"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      words: [],
      isTagEmpty: false,
    };
  },

  async mounted() {
    const tags = await this.$getTags();
    let maxVal = 0;
    for (const tag in tags) {
      maxVal = Math.max(maxVal, tags[tag]);
    }

    for (const tag in tags) {
      this.words.push({
        text: tag,
        size: Math.min((tags[tag] / maxVal) * 50, 50),
      });
    }
    this.isTagEmpty = this.words.length <= 0;
    this.genLayout();
  },
  methods: {
    genLayout() {
      const cloud = require('d3-cloud');
      cloud()
        .words(this.words)
        .padding(1)
        .font('Impact')
        .fontSize((d) => d.size)
        .on('end', this.end)
        .rotate((d) => (Math.random() > 0.5 ? 0 : -90))
        .start()
        .stop();
    },
    randomRGB() {
      const r = parseInt(Math.random() * 255 + 50);
      const g = parseInt(Math.random() * 255 + 50);
      const b = parseInt(Math.random() * 255 + 50);
      return `rgb(${r}, ${g}, ${b})`;
    },
    end(words) {
      const d3 = require('d3');

      d3.select('#tag-cloud')
        .append('svg')
        // .attr('width', width)
        // .attr('height', height)
        .append('g')
        .style('width', '100%')
        .style('height', '100%')
        .style('transform', 'translate(50%, 50%)')
        .selectAll('text')
        .data(words)
        .enter()
        .append('a')
        .attr('href', (d) => '/?t=' + d.text)
        .append('text')
        .style('font-size', (d) => d.size + 'px')
        .style('font-family', 'Impact')
        .style('fill', (d) => this.randomRGB())
        .attr('text-anchor', 'middle')
        .attr('transform', (d) => {
          return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
        })
        .text((d) => d.text);
    },
  },
};
</script>
