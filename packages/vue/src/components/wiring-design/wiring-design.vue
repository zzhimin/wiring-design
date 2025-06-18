<script setup>
import WdLayoutToolbar from "@/components/layout/index.vue"
import WdNodeSetter from "@/components/node-setter/index.vue"
import { WiringDesign } from "@wiring-design/core"
const props = defineProps({
  config: {
    type: Object,
    required: true,
  },
})

const wdContainer = ref(null)
const stencilContainer = ref(null)
const wd = ref(null)
onMounted(() => {
  wd.value = new WiringDesign(wdContainer.value, {
    config: props.config,
    stencilContainer: stencilContainer.value,
  });
})
</script>

<template>
  <div class="wd-container">
    <div class="wd-toolbar-container"></div>
    <div class="wd-main-container">
      <div class="wd-stencil-container">
        <div ref="stencilContainer"></div>
      </div>
      <div class="wd-graph-container">
        <div class="wd-graph-toolbar">
          <WdLayoutToolbar :wd />
        </div>
        <div ref="wdContainer"></div>
      </div>
      <div class="wd-setting-container">
        <WdNodeSetter :wd />
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
.wd-container {
  height: 100%;
  width: 100%;
  background-color: #f1f3f4;

  .wd-toolbar-container {
    height: 50px;
    background: #fff;
  }

  .wd-main-container {
    display: flex;
    width: 100%;
    height: calc(100% - 55px);
    overflow: hidden;
    margin-top: 5px;

    .wd-stencil-container {
      background: #fff;
      width: 200px;
      overflow: hidden;

      &:deep(.x6-widget-stencil) {
        top: 55px;
        width: 200px;
        background: #fff;
      }
    }

    .wd-graph-container {
      flex: 1;
      overflow: hidden;
      margin: 0 5px 5px;
      display: flex;
      flex-direction: column;

      .wd-graph-toolbar {
        width: 100%;
        height: 40px;
        background: #fff;
        display: flex;
        align-items: center;
        padding: 0 10px;
      }
    }

    .wd-setting-container {
      background: #fff;
      width: 250px;
      overflow: hidden;
    }
  }
}
</style>
