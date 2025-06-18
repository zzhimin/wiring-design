<script setup>
import WdDesign from '@/components/wiring-design/wiring-design.vue';

const config = ref({
  background: {
    color: '#F2F7FA',
  },
})
</script>

<template>
  <WdDesign :config="config" />
</template>

<style scoped>
</style>
