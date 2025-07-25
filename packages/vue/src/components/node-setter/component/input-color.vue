<template>
  <div class="flex">
    <div class="w-[40%]">{{ props.optionModel.label }}</div>
    <div class="flex-1">
      <input class="w-full" v-model="val" type="color" :placeholder="props.optionModel.placeholder">
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