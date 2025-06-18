<template>
  <div class="wd-layout">
    <template v-for="(action, index) in actions" :key="index">
      <template v-if="action.type == 'component'">
        <component :is="action.component" :wd />
      </template>
      <template v-else>
        <div v-html="action.icon" @click="action.action(wd.graph)" class="action-icon" :title="action.tooltip"></div>
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

<style lang="scss" scoped>
.wd-layout {
  width: 100%;
  height: 100%;
  display: flex;

  .action-icon {
    width: 30px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
}
</style>