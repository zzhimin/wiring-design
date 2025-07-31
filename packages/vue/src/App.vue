<script setup>
import WdDesign from '@/components/wiring-design/wiring-design.vue';
import AddAssets from '@/components/modal/add-assets.vue';

const open = ref(false);
const wd = ref(null);
const config = ref({
  background: {
    color: '#F2F7FA',
  },
  actions: [ // 操作栏自定义事件
    {
      name: '添加物料',
      index: 1,
      icon: '<svg t="1753879269490" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4952" width="20" height="20"><path d="M440.96 535.04a37.76 37.76 0 0 0 33.92 0l391.68-204.8a25.6 25.6 0 0 0 0-42.88L472.96 81.28a33.92 33.92 0 0 0-32 0L48.64 286.72a25.6 25.6 0 0 0 0 42.88z" fill="#3296FC" p-id="4953"></path><path d="M789.76 946.56a197.76 197.76 0 1 1 197.76-197.76 197.76 197.76 0 0 1-197.76 197.76z m0-351.36a153.6 153.6 0 1 0 153.6 153.6 154.24 154.24 0 0 0-153.6-153.6z" fill="#3296FC" p-id="4954"></path><path d="M685.44 727.04h208v43.52h-208z" fill="#3296FC" p-id="4955"></path><path d="M768 645.12h43.52v208H768z" fill="#3296FC" p-id="4956"></path><path d="M561.28 746.88l-64 33.92a78.72 78.72 0 0 1-39.68 8.96 97.28 97.28 0 0 1-39.68-8.96l-281.6-147.2a19.84 19.84 0 0 0-14.08 0l-73.6 37.76a25.6 25.6 0 0 0 0 42.88l391.68 204.8a37.76 37.76 0 0 0 33.92 0l117.12-64a220.8 220.8 0 0 1-30.08-108.16z" fill="#3296FC" p-id="4957"></path><path d="M784 523.52a220.8 220.8 0 0 1 59.52 8.96l23.04-12.16a26.24 26.24 0 0 0 0-42.88l-73.6-37.76a19.2 19.2 0 0 0-14.08 0l-282.88 147.2a78.72 78.72 0 0 1-39.68 8.96 97.28 97.28 0 0 1-39.68-8.96l-280.32-147.2a19.2 19.2 0 0 0-14.08 0l-73.6 37.76a25.6 25.6 0 0 0 0 42.88l391.68 204.8a37.76 37.76 0 0 0 33.92 0L576 673.28a222.72 222.72 0 0 1 208-149.76z" fill="#3296FC" p-id="4958"></path></svg>',
      tooltip: '添加物料',
      action: (wdesign) => {
        wd.value = wdesign;
        open.value = true;
      },
      init: (graph) => {
      },
    }
  ]
})
</script>

<template>
  <WdDesign :config="config" />
  <AddAssets v-model="open" :wd="wd" />
</template>

<style scoped></style>
