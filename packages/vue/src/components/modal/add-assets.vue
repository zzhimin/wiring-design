<script setup>
import { message } from 'ant-design-vue';
const props = defineProps({
  modelValue: {
    type: Boolean,
  },
  wd: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue']);
const formRef = ref();
const formState = reactive({
  type: 'image',
  imageUrl: '',
  path: '',
});

function handleOk() {
  // console.log('formState >>:', formState);
  formRef.value.validate().then(() => {
    const formData = toRaw(formState);
    if (formData.type === 'image') {
      props.wd.loadLocalStorageNode('wd-assets-image', formData.imageUrl);
    }
    if (formData.type === 'path') {
      props.wd.loadLocalStorageNode('wd-assets-path', formData.path);
    }

    close();
    message.success('添加成功');
  }).catch((err) => {
    console.log('err >>:', err);
  })
}

function close() {
  emit('update:modelValue', false);
  formState.imageUrl = '';
  formState.path = '';
}
</script>

<template>
  <a-modal v-model:open="props.modelValue" title="添加物料" @ok="handleOk" @cancel="close" okText="确定" cancelText="取消" destroyOnClose>
    <a-form ref="formRef" :model="formState" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }"
      autocomplete="off">
      <a-form-item label="类型" name="type">
        <a-radio-group v-model:value="formState.type">
          <a-radio value="image">图片</a-radio>
          <a-radio value="path">路径</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item v-if="formState.type === 'image'" label="图片地址" name="imageUrl"
        :rules="[{ required: true, message: '请输入图片地址' }]">
        <a-textarea v-model:value="formState.imageUrl" placeholder="请输入图片地址" />
      </a-form-item>
      <a-form-item v-if="formState.type === 'path'" label="路径" name="path"
        :rules="[{ required: true, message: '请输入路径，如：M502.4 427.3L508.5 437.9 514.7 427.3z' }]">
        <a-textarea v-model:value="formState.path" autoSize="{ minRows: 5, maxRows: 10 }"
          placeholder="请输入路径，如：M502.4 427.3L508.5 437.9 514.7 427.3z" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>