<template>
  <div v-if="!hide" class="flex items-center">
    <div class="w-[40%]">{{ props.optionModel.label }}</div>
    <div class="flex-1 flex justify-end">
      <PickColors v-model:value="val" format="rgb" :width="80" show-alpha :format-options="['rgb', 'hex']" />
    </div>
  </div>
</template>
<script setup>
import { setterProps } from './setter-props'
import { useUpdateNode } from '../composables/useUpdateNode'
import { useHidden } from '../composables/useHidden'
// https://qiuzongyuan.github.io/vue-pick-colors/zh/
import PickColors from 'vue-pick-colors'
defineOptions({
  name: 'input-color-setter'
})

const props = defineProps(setterProps)

const { val } = useUpdateNode(props)
const hide = useHidden(props)
</script>