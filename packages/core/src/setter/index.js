
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
    }
  ]
}

export default function registerSetter(wd) {
  return [
    {
      shape: 'custom-text',
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
  ]
}
export function getSetter(shape, graph) {
  const find = registerSetter(graph).find(item => item.shape === shape)
  return find ? find : null
}