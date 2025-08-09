<template>
  <div class="flex items-center">
    <div class="w-[40%]">{{ props.optionModel.label }}</div>
    <div class="flex-1">
      <input class="w-full border-#d7d8da hover:border-#4096ff rounded-6px" v-model="val" type="color" :placeholder="props.optionModel.placeholder">
    </div>
  </div>
</template>
<script setup>
import { setterProps } from './setter-props'
import { useUpdateNode } from './useUpdateNode'
defineOptions({
  name: 'input-color-setter'
})

const props = defineProps(setterProps)

const { val } = useUpdateNode(props)

</script>