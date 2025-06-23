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
        <span class="cursor-pointer color-[#188ffe] hover:color-[#40a9ff]">导出</span>
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
