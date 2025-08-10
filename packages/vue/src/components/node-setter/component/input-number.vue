<template>
  <div v-if="!hide" class="flex items-center">
    <div class="w-[40%]">{{ props.optionModel.label }}</div>
    <div class="flex-1">
      <a-input-number @change="onChange($event)" class="w-full" v-model:value="val" :placeholder="props.optionModel.placeholder" />
    </div>
  </div>
</template>
<script setup>
import { setterProps } from './setter-props'
import { useUpdateNode } from '../composables/useUpdateNode'
import { useChange } from '../composables/useChange'
import { useHidden } from '../composables/useHidden'
defineOptions({
  name: 'input-number-setter'
})

const props = defineProps(setterProps)
const { val } = useUpdateNode(props)
const { onChange } = useChange(toRaw(props))
const hide = useHidden(props)
</script>