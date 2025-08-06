<script setup>
import { onMounted, ref, watch, onUnmounted } from 'vue';
import * as ace from 'ace-builds';
import './aceConfig';

const emit = defineEmits(['update:value'])

const isFullscreen = ref(false)

const props = defineProps({
  value: {
    type: String,
    required: false,
    default: ''
  },
  mode: {
    type: String,
    required: true,
    default: 'javascript'
  }
})

const codeEditRef = ref(null)

const editor = ref(null);


function createEditor() {
  const editorElement = codeEditRef.value;
  let editorOptions = {
    mode: `ace/mode/${props.mode}`,
    // theme: 'ace/theme/github',
    fontSize: 16, // 编辑器内字体大小
    showGutter: true,
    showPrintMargin: false,
  };

  const advancedOptions = {
    enableSnippets: true,
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true
  };

  editorOptions = { ...editorOptions, ...advancedOptions };

  editor.value = ace.edit(editorElement, editorOptions);
  editor.value.session.setUseWrapMode(true);
  if (props.value) editor.value.setValue(props.value, -1);

  editor.value.on("change", () => {
    if (emit) {
      emit("update:value", editor.value.getValue());
    }
  });
}

onMounted(() => {
  createEditor()
})
onUnmounted(() => {
  if (editor.value) editor.value.destroy();
})
defineExpose({
  editor,
})
</script>

<template>
  <div class="w-full h-full relative" v-fullscreen="isFullscreen">
    <label class="absolute top-[10px] right-[10px] z-10 flex items-center">
      <span class="bg-[#f3f3f3] py-[2px] px-[5px] color-[#47acc4]">{{ props.mode }}</span>
      <span @click="isFullscreen = !isFullscreen" class="w-[25px] h-[25px] bg-[#f3f3f3] rounded-full cursor-pointer">
        <img class="w-full h-full" :src="`/${isFullscreen ? 'exitfullscreen' : 'fullscreen'}.png`">
      </span>
    </label>
    <div ref="codeEditRef" style="height: 100%;width: 100%;"></div>
  </div>
</template>

<style scoped>
</style>
