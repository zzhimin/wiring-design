<template>
  <div class="flex items-center">
    <div class="w-[40%]">{{ props.optionModel.label }}</div>
    <div class="flex-1 flex justify-end">
      <a-button @click="openCodeEditor" :type="val ? 'primary' : 'default'">{{ val ? '已定义' : '未定义' }}</a-button>
    </div>
    <a-modal width="850px" v-model:open="open" :title="props.optionModel.label" @ok="handleOk" okText="确定" cancelText="取消">
      <div class="h-500px">
        <CodeEditor :mode="props.optionModel.mode" v-model:value="editorVal" />
      </div>
    </a-modal>
  </div>
</template>
<script setup>
import { setterProps } from './setter-props'
import { useUpdateNode } from './useUpdateNode'
import CodeEditor from '../../code-editor/codeEditor.vue'
defineOptions({
  name: 'code-editor-setter'
})

const props = defineProps(setterProps)

const { val } = useUpdateNode(props)

const editorVal = ref('')
const open = ref(false);
function openCodeEditor() {
  editorVal.value = val.value
  open.value = true;
}
function handleOk() {
  val.value = editorVal.value
  open.value = false;
}
</script>