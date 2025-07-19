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
const wd = ref({})
onMounted(() => {
  wd.value = new WiringDesign(wdContainer.value, {
    config: props.config,
    stencilContainer: stencilContainer.value,
  });
})
</script>

<template>
  <div class="w-full h-full bg-[#f1f3f4]">
    <div class="h-[50px] bg-white flex items-center justify-between px-4">
      <div class="flex items-center justify-start">
        <div class="h-full center font-600 text-6 font-mono">接线图设计器</div>
      </div>
      <div class="flex items-center justify-start">
        <a-space>
          <a-upload action="/" :file-list="null" :before-upload="wd.importFromJSON">
            <a-button>导入</a-button>
          </a-upload>
          <a-dropdown-button @click="wd.exportJSON()">
            导出
            <template #overlay>
              <a-menu>
                <a-menu-item key="1" @click="wd.exportSVG()">
                  导出为SVG
                </a-menu-item>
                <a-menu-item key="2" @click="wd.exportPNG()">
                  导出为PNG
                </a-menu-item>
                <a-menu-item key="3" @click="wd.exportJPEG()">
                  导出为JPEG
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown-button>
        </a-space>
      </div>
    </div>
    <div class="flex w-full h-[calc(100%-55px)] overflow-hidden mt-[5px]">
      <div class="bg-white w-[200px] overflow-hidden">
        <div ref="stencilContainer"></div>
      </div>
      <div class="flex-1 overflow-hidden mt-0 mx-[5px] mb-[5px] flex flex-col">
        <div class="w-full h-[40px] bg-white flex items-center px-[10px]">
          <WdLayoutToolbar :wd />
        </div>
        <div ref="wdContainer"></div>
      </div>
      <div class="bg-white w-[250px] overflow-hidden">
        <WdNodeSetter :wd />
      </div>
    </div>
  </div>

</template>

<style scoped>
:deep(.x6-widget-stencil) {
  top: 55px;
  width: 200px;
  background: #fff;
}
</style>
