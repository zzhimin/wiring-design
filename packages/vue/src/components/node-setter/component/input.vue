<template>
  <div class="flex">
    <div class="w-[40%]">{{ props.optionModel.label }}</div>
    <div class="flex-1">
      <input class="w-full" v-model="val" type="text" :placeholder="props.optionModel.placeholder">
    </div>
  </div>
</template>
<script setup>
import { setterProps } from './setter-props'
import { useUpdateStyle } from './useUpdateStyle'
defineOptions({
  name: 'input-setter'
})

const props = defineProps(setterProps)

const { val } = useUpdateStyle(props)

</script>