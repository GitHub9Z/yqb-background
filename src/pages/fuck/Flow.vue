<template>
  <div class="F-content">
    <div class="F-content-module" v-for="(info, index) in page_data.module_list" :key="index">
      <Module :info="info" :focus="true"/>
    </div>
    <div class="F-content-create" @click="handleAdd">添加模块</div>
    <div class="F-content-storage" v-if="page_status.dialog_visible"><Storage @confirm="handleConfirm" @create="$emit('create')"/></div>
  </div>
</template>

<script>
import Module from "./Module.vue";
import Storage from "./Storage.vue";
export default {
  components: {
    Module,
    Storage
  },
  data() {
    return {
      page_config: {},
      page_data: {
        module_list: [
        ],
      },
      page_status: {
        dialog_visible: false
      },
    };
  },
  mounted() {},
  computed: {},
  methods: {
    handleAdd() {
      this.page_status.dialog_visible = true
    },
    handleConfirm(_m) {
      this.page_data.module_list.push(_m)
      this.page_status.dialog_visible = false
    }
  },
};
</script>>
<style lang="less">
.F-content {
  background: #192d38;
  padding: 10px;
  .F-content-module {
    max-width: 100vw;
    overflow-x: scroll;
    margin-bottom: 10px;
  }
  .F-content-create {
    color: gray;
    padding: 20px;
    border: 1px dashed gray;
    cursor: pointer;
    &:hover {
      color: rgb(174, 173, 173);
      border: 1px dashed rgb(174, 173, 173);
    }
  }
  .F-content-storage {
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>