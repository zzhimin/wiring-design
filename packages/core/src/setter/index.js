import { NodeShape } from '../shared/nodeShape';
/**
 * 设置类型：
 * 1. width、height:setSize
 * 2. zIndex:setZIndex
 * 3. setAttrs
 * 4. setData
 */
const defaultSetter = (wd) => {
  return [
    {
      component: 'input-number-setter',
      key: 'width',
      setType: 'setSize',
      label: '宽度',
      value: 80,
      placeholder: '节点宽度, 如 80',
    },
    {
      component: 'input-number-setter',
      key: 'height',
      setType: 'setSize',
      label: '高度',
      value: 36,
      placeholder: '节点高度, 如 36',
    },
    {
      component: 'input-number-setter',
      key: 'zIndex',
      setType: 'setZIndex',
      label: '层级',
      value: 0,
      placeholder: '节点层级, 如 0',
    },
    {
      component: 'select-setter',
      key: 'animationName',
      setType: 'setData',
      label: '动画',
      value: '',
      placeholder: '为节点选择动画',
      options: wd._animation
    },
    {
      component: 'code-editor-setter',
      key: 'customCss',
      setType: 'setData',
      label: '自定义样式',
      value: '',
      mode: 'css',
    },
  ]
}

export default function registerSetter(wd) {
  return [
    {
      shape: NodeShape.customText,
      name: '文本',
      setter: [
        ...defaultSetter(wd),
        {
          component: 'input-setter',
          key: 'content',
          setType: 'setData',
          label: '文本内容',
          value: '文字',
          placeholder: '请输入文本内容',
        },
        {
          component: 'input-color-setter',
          key: 'color',
          setType: 'setData',
          label: '颜色',
          value: '#333333',
          placeholder: '颜色值, 如 #333333',
        },
        {
          component: 'input-number-setter',
          key: 'fontSize',
          setType: 'setData',
          label: '字体大小',
          value: 16,
          placeholder: '字体大小, 如 16',
        },
        {
          component: 'input-number-setter',
          key: 'fontWeight',
          setType: 'setData',
          label: '字体粗细',
          value: 400,
          placeholder: '字体粗细, 如 400',
        },
        {
          component: 'input-color-setter',
          key: 'backgroundColor',
          setType: 'setData',
          label: '背景颜色',
          value: 'transparent',
          placeholder: '背景颜色, 如 transparent',
        }
      ]
    },
    {
      shape: NodeShape.image,
      name: '图片',
      setter: [
        ...defaultSetter(wd),
        {
          component: 'input-setter',
          key: 'label',
          setType: 'setData',
          label: '名称',
          value: '',
          placeholder: '图片名称',
        },
        {
          component: 'input-setter',
          key: 'imageUrl',
          setType: 'setData',
          label: '图片url',
          value: '',
          placeholder: '请输入图片url',
        }
      ]
    },
    {
      shape: 'path',
      name: '路径',
      setter: [
        ...defaultSetter(wd),
        {
          component: 'input-color-setter',
          key: 'color',
          setType: 'setAttrs',
          label: '节点颜色',
          value: '#333333',
          placeholder: '颜色值, 如 #333333',
        },
        {
          component: 'input-number-setter',
          key: 'strokeWidth',
          setType: 'setAttrs',
          label: '边框宽度',
          value: 2,
          placeholder: '字体大小, 如 16',
        },
        {
          component: 'input-color-setter',
          key: 'bgColor',
          setType: 'setAttrs',
          label: '背景颜色',
          value: 'transparent',
          placeholder: '背景颜色, 如 transparent',
        }
      ]
    },
    {
      shape: NodeShape.latestValue,
      name: '最新值',
      setter: [
        ...defaultSetter(wd),
        {
          component: 'input-setter',
          key: 'title',
          setType: 'setData',
          label: '标题',
          value: '',
          placeholder: '请输入最新值标题',
        },
        {
          component: 'input-color-setter',
          key: 'titleColor',
          setType: 'setData',
          label: '标题颜色',
          value: '#333333',
          placeholder: '标题颜色值, 如 #333333',
        },
        {
          component: 'input-number-setter',
          key: 'titleFontSize',
          setType: 'setData',
          label: '标题大小',
          value: 16,
          placeholder: '字体大小, 如 16',
        },
        {
          component: 'input-number-setter',
          key: 'titleFontWeight',
          setType: 'setData',
          label: '标题粗细',
          value: 400,
          placeholder: '字体粗细, 如 400',
        },
        {
          component: 'input-color-setter',
          key: 'valueColor',
          setType: 'setData',
          label: '值颜色',
          value: '#333333',
          placeholder: '颜色值, 如 #333333',
        },
        {
          component: 'input-number-setter',
          key: 'valueFontSize',
          setType: 'setData',
          label: '值大小',
          value: 16,
          placeholder: '字体大小, 如 16',
        },
        {
          component: 'input-number-setter',
          key: 'valueFontWeight',
          setType: 'setData',
          label: '值粗细',
          value: 400,
          placeholder: '字体粗细, 如 400',
        },
        {
          component: 'input-setter',
          key: 'unit',
          setType: 'setData',
          label: '单位',
          value: '',
          placeholder: '请输入最新值单位',
        },
        {
          component: 'input-color-setter',
          key: 'unitColor',
          setType: 'setData',
          label: '单位颜色',
          value: '#333333',
          placeholder: '单位颜色值, 如 #333333',
        },
        {
          component: 'input-number-setter',
          key: 'unitFontSize',
          setType: 'setData',
          label: '单位大小',
          value: 16,
          placeholder: '字体大小, 如 16',
        },
        {
          component: 'input-number-setter',
          key: 'unitFontWeight',
          setType: 'setData',
          label: '单位粗细',
          value: 400,
          placeholder: '字体粗细, 如 400',
        },
        {
          component: 'radio-button-setter',
          key: 'justify',
          setType: 'setData',
          label: '对齐方式',
          value: 'flex-start',
        },
        {
          component: 'select-setter',
          key: 'justify',
          setType: 'setData',
          label: '对齐方式',
          value: 'flex-start',
          options: [
            { label: 'flex-start', value: 'flex-start' },
            { label: 'space-between', value: 'space-between' },
            { label: 'center', value: 'center' },
            { label: 'flex-end', value: 'flex-end' },
          ]
        },
        {
          component: 'input-color-setter',
          key: 'backgroundColor',
          setType: 'setData',
          label: '背景颜色',
          value: 'transparent',
          placeholder: '背景颜色, 如 transparent',
        }
      ]
    },
  ]
}

export function findSetter(setter, key, defaultValue = '') {
  return setter.find(item => item.key === key)?.value || defaultValue;
}
export function getSetter(shape, graph) {
  const find = registerSetter(graph).find(item => item.shape === shape)
  return find ? find : null
}