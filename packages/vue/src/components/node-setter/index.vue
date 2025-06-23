<template>
  <div class="flex flex-col p-2">
    <div class="flex items-center justify-between">
      <div>组件名称</div>
      <div>{{ nodeConfig?.name }}</div>
    </div>
    <hr class="my-2" />
    <template v-if="nodeConfig">
      <component
        v-for="(item, index) in nodeConfig.setter"
        :is="item.component"
        :wd="props.wd"
        :nodeId="nodeId"
        :optionModel="item"
        class="mt-2"
      ></component>
    </template>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  wd: {
    type: Object,
    required: true,
  },
})

const nodeId = ref('')
const nodeConfig = ref(null);
const selectNode$ = ref(null);
watch(() => props.wd, (newValue) => {
  if (newValue) {
    selectNode$.value = newValue.selectNode$.asObservable().subscribe((id) => {
      // console.log('id >>:', id);
      if (id) {
        nodeId.value = id;
        const node = newValue.graph.getCellById(id)
        const nodeData = node.getData();
        // console.log('nodeData >>:', nodeData);
        if (nodeData) {
          nodeConfig.value = nodeData;
        }
      }
    })
  }
})
onUnmounted(() => {
  selectNode$.value?.unsubscribe()
})
</script>

<style scoped></style>