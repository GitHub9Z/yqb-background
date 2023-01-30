<template>
  <div class="S-content">
    <div
      class="S-content-module"
      v-for="(info, index) in page_data.module_list"
      :key="index"
      @click="handleModuleClick(info)"
    >
      模块名称：{{ info.name }}
      <Module :info="info" :focus="false" />
    </div>
    <div class="S-content-create" @click="handleCreateClick">新建模版</div>
  </div>
</template>

<script>
import Module from "./Module.vue";
export default {
  components: {
    Module,
  },
  data() {
    return {
      page_config: {},
      page_data: {
        module_list: [],
      },
      page_status: {},
    };
  },
  mounted() {
    this.page_data.module_list = JSON.parse(
      localStorage.getItem("storage")
    ).map((_i) => ({
      ..._i,
      width: 380,
      height: (380 * _i.height) / _i.width,
      _o: _i,
    }));
  },
  computed: {},
  methods: {
    handleModuleClick(_m) {
      this.$emit("confirm", _m._o);
    },
    handleCreateClick() {
      this.$emit("create");
    }
  },
};
</script>>
<style lang="less">
.S-content {
  height: 80vh;
  width: 1200px;
  background: #2b4f62 !important;
  z-index: 999;
  // display: flex;
  // align-items: flex-start;
  padding: 20px;
  // flex-wrap: wrap;
  -webkit-column-width: 380px;
  -moz-column-width: 380px;
  -o-colum-width: 380px;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .S-content-module {
    display: inline-block;
    padding: 5px;
    padding-top: 0;
    background: rgba(255, 255, 255, 0.162);
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    color: rgba(255, 255, 255, 0.711);
    font-size: 14px;
    line-height: 35px;
    margin-right: 10px;
    margin-bottom: 15px;
    cursor: pointer;
    &:hover {
      background: rgba(206, 200, 200, 0.162);
    }
  }
  .S-content-create {
    color: gray;
    padding: 20px;
    border: 1px dashed gray;
    cursor: pointer;
    &:hover {
      color: rgb(174, 173, 173);
      border: 1px dashed rgb(174, 173, 173);
    }
  }
}
</style>