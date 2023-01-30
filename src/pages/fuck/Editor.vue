<template>
  <div class="content" @mouseup="handleMouseUp">
    <div class="content-grid" :style="grid_style">
      <div
        class="content-grid-item"
        db-leaf
        @focus="handleModuleFocus(item)"
        @click.stop="handleGridClick(item)"
        @mousedown.stop="handleGridClick"
        v-for="(item, index) in page_data.item_list"
        :key="index"
        :style="parseStyle(item.area)"
      ></div>
      <div
        class="content-grid-creating"
        v-if="creating_item"
        :key="index"
        :style="parseStyle(creating_item.area)"
      ></div>
    </div>
    <div class="content-back" :style="grid_style">
      <div
        class="content-back-item"
        :class="{ active: index === page_status.active_back }"
        v-for="(item, index) in total"
        :key="index"
        @mousedown="handleMouseDown(index)"
        @mouseenter="handleMouseEnter(index)"
        @mouseup="handleMouseUp(true)"
      ></div>
    </div>
    <div class="content-console">
      <div class="content-console-back">
        <div class="content-console-back-title">容器</div>
        <div class="content-console-back-item">
          宽度：<input
            type="number"
            v-model="page_status.width"
            style="margin-right: 10px"
          />px
        </div>
        <div class="content-console-back-item">
          高度：<input
            type="number"
            v-model="page_status.height"
            style="margin-right: 10px"
          />px
        </div>
        <div class="content-console-back-item">
          行数：<input
            type="number"
            v-model="page_status.row"
            style="margin-right: 10px"
          />行
        </div>
        <div class="content-console-back-item">
          列数：<input
            type="number"
            v-model="page_status.column"
            style="margin-right: 10px"
          />列
        </div>
        <div class="content-console-back-item">
          行距：<input
            type="number"
            v-model="page_status.row_gap"
            style="margin-right: 10px"
          />px
        </div>
        <div class="content-console-back-item">
          列距：<input
            type="number"
            v-model="page_status.column_gap"
            style="margin-right: 10px"
          />px
        </div>
        <template
          v-if="page_status.active_back || page_status.active_back === 0"
        >
          <div class="content-console-back-title">单元格</div>
          <div class="content-console-back-item">
            列宽：<input
              :value="active_column_width"
              @input="handleColumnWidthChange"
              style="margin-right: 10px"
            />
          </div>
          <div class="content-console-back-item">
            行高：<input
              :value="active_row_height"
              @input="handleRowHeightChange"
              style="margin-right: 10px"
            />
          </div>
        </template>
        <template v-if="page_status.active_module">
          <div class="content-console-back-title">
            模块<img
              src="@/assets/delete_grey_icon.png"
              @click="handleDeleteClick"
            />
          </div>
          <div class="content-console-back-item">
            起点：<input
              v-model="page_status.active_module.area[1]"
              style="width: 20px; margin-right: 10px"
            />
            <input
              v-model="page_status.active_module.area[0]"
              style="width: 20px; margin-right: 10px"
            />
          </div>
          <div class="content-console-back-item">
            终点：<input
              v-model="page_status.active_module.area[3]"
              style="width: 20px; margin-right: 10px"
            />
            <input
              v-model="page_status.active_module.area[2]"
              style="width: 20px; margin-right: 10px"
            />
          </div>
        </template>
        <div class="content-console-back-save" @click="handleSaveClick">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page_config: {
        module_type: [
          {
            name: "影片",
          },
        ],
      },
      page_data: {
        start_index: null,
        end_index: null,
        creating_item: null,
        item_list: [],
      },
      page_status: {
        row: 4,
        column: 4,
        width: 1920,
        height: 480,
        row_gap: 10,
        column_gap: 10,
        column_width: [],
        row_height: [],
        active_back: null,
        active_module: null,
      },
    };
  },
  mounted() {
    // window.addEventListener("resize", () => {
    //   this.page_status.width = window.innerWidth;
    //   this.page_status.height = window.innerHeight;
    // });
  },
  computed: {
    total() {
      return this.page_status.row * this.page_status.column;
    },
    grid_style() {
      return {
        "grid-template-columns": Array.from(
          Array(parseInt(this.page_status.column)),
          (v, k) => k
        )
          .map((_i) => {
            let e = this.page_status.column_width[_i + 1];
            if (e?.includes("px")) {
              e = `${Math.floor(
                (80 * parseInt(e)) / this.page_status.width
              )}vw`;
            }
            return e || "1fr";
          })
          .join(" "),
        "grid-template-rows": Array.from(
          Array(parseInt(this.page_status.row)),
          (v, k) => k
        )
          .map((_i) => {
            try {
              let e = this.page_status.row_height[_i + 1];
              if (e?.includes("px")) {
                e = `${Math.floor(
                  (80 * parseInt(e)) / this.page_status.width
                )}vw`;
              }
              return e || "1fr";
            } catch (e) {
              console.log(e);
            }
          })
          .join(" "),
        width: `80vw`,
        height: `${(80 * this.page_status.height) / this.page_status.width}vw`,
        "grid-column-gap": `${
          (80 * this.page_status.column_gap) / this.page_status.width
        }vw`,
        "grid-row-gap": `${
          (80 * this.page_status.row_gap) / this.page_status.width
        }vw`,
      };
    },
    active_column_width() {
      return (
        this.page_status.column_width[
          (this.page_status.active_back % this.page_status.column) + 1
        ] || "1fr"
      );
    },
    active_row_height() {
      return (
        this.page_status.row_height[
          Math.floor(this.page_status.active_back / this.page_status.column) + 1
        ] || "1fr"
      );
    },
    creating_item() {
      if (!this.page_data.start_index) return;
      let area = [];
      if (this.page_data.start_index[0] <= this.page_data.end_index[0]) {
        area[0] = this.page_data.start_index[0];
        area[2] = this.page_data.end_index[0] + 1;
      } else {
        area[0] = this.page_data.start_index[0] + 1;
        area[2] = this.page_data.end_index[0];
      }
      if (this.page_data.start_index[1] <= this.page_data.end_index[1]) {
        area[1] = this.page_data.start_index[1];
        area[3] = this.page_data.end_index[1] + 1;
      } else {
        area[1] = this.page_data.start_index[1] + 1;
        area[3] = this.page_data.end_index[1];
      }
      return {
        area,
      };
    },
  },
  methods: {
    handleSaveClick() {
      let name = prompt("请输入模版名称", "自定义模版");
      let storage = JSON.parse(localStorage.getItem("storage") || "[]");
      storage.push({
        name,
        ...this.page_data,
        ...this.page_status,
      });
      localStorage.setItem("storage", JSON.stringify(storage));
      this.$emit('save')
    },
    handleDeleteClick() {
      this.page_data.item_list = this.page_data.item_list.filter(
        (_i) => _i !== this.page_status.active_module
      );
    },
    handleModuleFocus(module) {
      console.log(module);
      this.page_status.active_module = module;
    },
    handleColumnWidthChange(e) {
      e = e.target.value;
      if (parseInt(e) && (e.includes("px") || e.includes("fr"))) {
        this.$set(
          this.page_status.column_width,
          (this.page_status.active_back % this.page_status.row) + 1,
          e
        );
      }
    },
    handleRowHeightChange(e) {
      e = e.target.value;
      if (parseInt(e) && (e.includes("px") || e.includes("fr"))) {
        this.$set(
          this.page_status.row_height,
          Math.floor(this.page_status.active_back / this.page_status.column) +
            1,

          e
        );
      }
    },
    handleGridClick(item) {
      console.log(item);
    },
    handleMouseDown(index) {
      let row = Math.floor(index / this.page_status.column) + 1;
      let column = (index % this.page_status.column) + 1;
      this.page_data.start_index = [row, column];
      this.page_data.end_index = [row, column];
      console.log();
    },
    handleMouseEnter(index) {
      this.page_status.active_back = index;
      let row = Math.floor(index / this.page_status.column) + 1;
      let column = (index % this.page_status.column) + 1;
      this.page_data.end_index = [row, column];
    },
    handleMouseUp(valid) {
      // 合法性校验
      let area = this.creating_item?.area;
      if (!area) return;
      let P1 = {
        y: area[0],
        x: area[1],
      };
      let P2 = {
        y: area[2],
        x: area[3],
      };
      this.page_data.item_list.forEach((_i) => {
        let _i_area = _i.area;
        let P3 = {
          y: _i_area[0],
          x: _i_area[1],
        };
        let P4 = {
          y: _i_area[2],
          x: _i_area[3],
        };
        if (
          !(
            (P1.y <= P3.y && P2.y <= P3.y && P1.y <= P4.y && P2.y <= P4.y) ||
            (P1.x >= P3.x && P2.x >= P3.x && P1.x >= P4.x && P2.x >= P4.x) ||
            (P1.y >= P3.y && P2.y >= P3.y && P1.y >= P4.y && P2.y >= P4.y) ||
            (P1.x <= P3.x && P2.x <= P3.x && P1.x <= P4.x && P2.x <= P4.x)
          )
        ) {
          valid = false;
        }
      });
      if (valid && this.creating_item) {
        this.page_data.item_list.push(this.creating_item);
      }
      this.page_data.end_index = null;
      this.page_data.start_index = null;
    },
    parseStyle(area) {
      return {
        "grid-area": `${area[0]} / ${area[1]} / ${area[2]} / ${area[3]}`,
      };
    },
  },
};
</script>>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  -webkit-user-drag: none !important;
  user-select: none;
}
.header {
  height: 40px;
  background: #234253;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .header-title {
    padding: 0 15px;
    color: #05cd97;
    font-weight: bold;
    font-size: 20px;
  }
  .header-save {
    padding: 0 15px;
    background: #05cd97;
    opacity: 0.6;
    color: #234253;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
      opacity: 0.9;
    }
  }
}
.content {
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  background: #192d38;
  position: relative;
  font-weight: 0;
  overflow: hidden;
  .content-grid {
    top: 0;
    left: 0;
    box-sizing: border-box;
    padding: 10px;
    display: grid;
    position: absolute;
    grid-auto-flow: row dense;
    .content-grid-item {
      cursor: pointer;
      // min-height: 160px;
      background: rgba(138, 107, 15, 0.7);
      &[db-focus] {
        background: rgba(206, 177, 90, 0.7);
      }
    }
    .content-grid-creating {
      background: rgba(138, 61, 15, 0.7);
    }
  }
  .content-back {
    top: 0;
    box-sizing: border-box;
    left: 0;
    padding: 10px;
    display: grid;
    position: absolute;
    .content-back-item {
      // min-height: 160px;
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='8' height='8' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 0h1L0 6V5zm1 5v1H5z' fill='%239C92AC' fill-opacity='.4' fill-rule='evenodd'/%3E%3C/svg%3E");
      &.active {
        // background: rgba(206, 177, 90, 0.39);
        border: 1px dashed rgba(255, 255, 255, 0.593);
      }
    }
  }
  .content-console {
    background: rgb(20, 38, 48);
    position: fixed;
    right: 0;
    height: 100vh;
    width: 20%;
    box-sizing: border-box;
    padding: 40px;
    font-family: Mukta Mahee, Helvetica, Arial, sans-serif;
    color: #aaa;
    font-size: 23px;
    font-weight: 300;
    .content-console-back-title {
      font-size: 18px;
      margin-bottom: 15px;
      color: #08ffbd;
      display: flex;
      align-items: center;
      img {
        margin-left: 10px;
        width: 20px;
        cursor: pointer;
      }
    }
    .content-console-back-item {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
    }
    .content-console-back-save {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0;
      padding: 7px;
      background: #05ac7f;
      font-size: 18px;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover {
        opacity: .8;
      }
    }
    input {
      font-family: Mukta Mahee, Helvetica, Arial, sans-serif;
      outline: none;
      font-size: 18px;
      background: #211f2f;
      background-image: initial;
      background-position-x: initial;
      background-position-y: initial;
      background-size: initial;
      background-repeat-x: initial;
      background-repeat-y: initial;
      background-attachment: initial;
      background-origin: initial;
      background-clip: initial;
      background-color: rgb(33, 31, 47);
      color: #fff;
      width: 50px;
      padding: 0.3ch 5px;
      max-height: 40px;
      border: 1px solid #666;
      border-top-color: rgb(102, 102, 102);
      border-top-style: solid;
      border-top-width: 1px;
      border-right-color: rgb(102, 102, 102);
      border-right-style: solid;
      border-right-width: 1px;
      border-bottom-color: rgb(102, 102, 102);
      border-bottom-style: solid;
      border-bottom-width: 1px;
      border-left-color: rgb(102, 102, 102);
      border-left-style: solid;
      border-left-width: 1px;
      border-image-source: initial;
      border-image-slice: initial;
      border-image-width: initial;
      border-image-outset: initial;
      border-image-repeat: initial;
    }
  }
}
</style>