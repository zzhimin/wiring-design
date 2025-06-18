<template>
  <div class="flex flex-col p-2">
    <div class="flex items-center justify-between">
      <div>组件名称</div>
      <div>{{ setter?.name }}</div>
    </div>
    <hr class="my-2" />
    <container v-if="setter">
      <component
        v-for="(item, index) in setter.style"
        :is="item.type"
        :wd="props.wd"
        :nodeId="nodeId"
        :optionModel="item"
        class="mt-2"
      ></component>
    </container>
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
const setter = ref(null);
watch(() => props.wd, (newValue) => {
  if (newValue) {
    newValue.selectNode$.asObservable().subscribe((id) => {
      if (id) {
        nodeId.value = id;
        const node = newValue.graph.getCellById(id)
        if (node) {
          setter.value = newValue.nodeSetter.get(node.shape)
          console.log('setter.value >>:', setter.value);
        }
      }
    })
  }
})
</script>

<style scoped lang="scss"></style>