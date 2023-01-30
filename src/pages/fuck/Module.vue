<template>
  <div class="M-content">
    <div class="M-content-grid" :style="grid_style" db-trunk>
      <div
        class="M-content-grid-item"
        :db-leaf="focus"
        v-for="(item, index) in info.item_list"
        :key="index"
        :style="parseStyle(item.area)"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['info', 'focus'],
  data() {
    return {
      page_config: {},
    };
  },
  mounted() {},
  computed: {
    total() {
      return this.info.row * this.info.column;
    },
    grid_style() {
      return {
        "grid-template-columns": Array.from(
          Array(parseInt(this.info.column)),
          (v, k) => k
        )
          .map((_i) => {
            let e = this.info.column_width[_i + 1];
            // if (e?.includes("px")) {
            //   e = `${Math.floor(
            //     (100 * parseInt(e)) / this.info.width
            //   )}vw`;
            // }
            return e || "1fr";
          })
          .join(" "),
        "grid-template-rows": Array.from(
          Array(parseInt(this.info.row)),
          (v, k) => k
        )
          .map((_i) => {
            let e = this.info.row_height[_i + 1];
            // if (e?.includes("px")) {
            //   e = `${Math.floor(
            //     (100 * parseInt(e)) / this.info.width
            //   )}vw`;
            // }
            return e || "1fr";
          })
          .join(" "),
        width: `${this.info.width}px`,
        height: `${this.info.height}px`,
        "grid-column-gap": `${this.info.column_gap}px`,
        "grid-row-gap": `${this.info.row_gap}px`,
      };
    },
    active_column_width() {
      return (
        this.info.column_width[
          (this.info.active_back % this.info.column) + 1
        ] || "1fr"
      );
    },
    active_row_height() {
      return (
        this.info.row_height[
          Math.floor(this.info.active_back / this.info.column) + 1
        ] || "1fr"
      );
    },
  },
  methods: {
    parseStyle(area) {
      return {
        "grid-area": `${area[0]} / ${area[1]} / ${area[2]} / ${area[3]}`,
      };
    },
  },
};
</script>>
<style lang="less" >
* {
  margin: 0;
  padding: 0;
  -webkit-user-drag: none !important;
  user-select: none;
}
.M-content {
  box-sizing: border-box;
  // background: #192d38;
  font-weight: 0;
  .M-content-grid {
    top: 0;
    left: 0;
    box-sizing: border-box;
    // padding: 10px;
    display: grid;
    grid-auto-flow: row dense;
    .M-content-grid-item {
      cursor: pointer;
      // min-height: 160px;
      background: rgba(138, 107, 15, 0.7);
      &[db-focus] {
        background: rgba(206, 177, 90, 0.7);
      }
    }
    .M-content-grid-creating {
      background: rgba(138, 61, 15, 0.7);
    }
  }
}
</style>