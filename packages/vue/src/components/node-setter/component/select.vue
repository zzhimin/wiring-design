<template>
  <div v-if="!hide" class="flex items-center">
    <div class="w-[40%]">{{ props.optionModel.label }}</div>
    <div class="flex-1">
      <a-select
        class="w-full"
        v-model:value="val"
        :options="props.optionModel.options"
        :placeholder="props.optionModel.placeholder"
        allowClear
        @change="onChange($event)"
      ></a-select>
    </div>
  </div>
</template>
<script setup>
import { setterProps } from './setter-props'
import { useUpdateNode } from '../composables/useUpdateNode'
import { useChange } from '../composables/useChange'
import { useHidden } from '../composables/useHidden'
defineOptions({
  name: 'select-setter'
})

const props = defineProps(setterProps)

const { val } = useUpdateNode(props)
const { onChange } = useChange(toRaw(props))
const hide = useHidden(props)
</script>