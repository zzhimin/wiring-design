<template>
  <div class="flex items-center">
    <div class="w-[40%]">{{ props.optionModel.label }}</div>
    <div class="flex-1">
      <a-input class="w-full" v-model:value="val" :placeholder="props.optionModel.placeholder" />
    </div>
  </div>
</template>
<script setup>
import { setterProps } from './setter-props'
import { useUpdateNode } from './useUpdateNode'
defineOptions({
  name: 'input-setter'
})

const props = defineProps(setterProps)

const { val } = useUpdateNode(props)

</script>