<template>
  <div class="w-full h-full flex">
    <template v-for="(action, index) in actions" :key="index">
      <template v-if="action.type == 'component'">
        <component :is="action.component" :wd />
      </template>
      <template v-else>
        <div v-html="action.icon" @click="action.action(wd.graph)" :title="action.tooltip" class="w-[30px] h-full flex items-center justify-start"></div>
      </template>
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

const actions = computed(() => {
  if (!props.wd || !props.wd.actions) {
    return []
  }
  return props.wd.actions
})
</script>

<style  scoped>
</style>