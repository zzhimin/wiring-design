<template>
  <div class="flex items-center">
    <div class="w-[40%]">{{ props.optionModel.label }}</div>
    <div class="flex-1">
      <a-select
        class="w-full"
        v-model:value="val"
        :options="props.optionModel.options"
        :placeholder="props.optionModel.placeholder"
        allowClear
      ></a-select>
    </div>
  </div>
</template>
<script setup>
import { setterProps } from './setter-props'
import { useUpdateNode } from './useUpdateNode'
defineOptions({
  name: 'select-setter'
})

const props = defineProps(setterProps)

const { val } = useUpdateNode(props)

onMounted(() => {
})

</script>