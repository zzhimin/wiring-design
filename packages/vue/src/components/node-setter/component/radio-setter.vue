<template>
  <div v-if="!hide" class="flex items-center">
    <div class="w-[33%]">{{ props.optionModel.label }}</div>
    <div class="flex-1">
      <a-radio-group @change="onChange($event)" class="w-full" size="small"
        v-if="props.optionModel.radioType === 'button'" v-model:value="val" button-style="solid">
        <a-radio-button v-for="item in props.optionModel.options" :key="item.value" :value="item.value"
          :disabled="item.disabled">{{ item.label }}</a-radio-button>
      </a-radio-group>
    </div>
  </div>
</template>
<script setup>
import { setterProps } from './setter-props'
import { useUpdateNode } from '../composables/useUpdateNode'
import { useChange } from '../composables/useChange'
import { useHidden } from '../composables/useHidden'
defineOptions({
  name: 'radio-setter'
})

const props = defineProps(setterProps)

const { val } = useUpdateNode(props)

const { onChange } = useChange(toRaw(props))
const hide = useHidden(props)
</script>