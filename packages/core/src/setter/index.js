


export default function registerSetter(graph) {
  return [
    {
      shape: 'custom-text',
      setter: {
        style: [
          {
            type: 'input-setter',
            key: 'value',
            label: '文本内容',
            value: '文字',
            placeholder: '请输入文本内容',
          },
          {
            type: 'input-setter',
            key: 'color',
            label: '颜色',
            value: '#333333',
            placeholder: '颜色值, 如 #333333',
          },
          {
            type: 'input-number-setter',
            key: 'fontSize',
            label: '字体大小',
            value: 16,
            placeholder: '字体大小, 如 16',
          },
          {
            type: 'input-number-setter',
            key: 'fontWeight',
            label: '字体粗细',
            value: 400,
            placeholder: '字体粗细, 如 400',
          },
          {
            type: 'input-setter',
            key: 'backgroundColor',
            label: '背景颜色',
            value: 'transparent',
            placeholder: '背景颜色, 如 transparent',
          }
        ],
        name: '文字',
      }
    }
  ]
}

function transformStyle(style) {
  return style.reduce((acc, cur) => {
    if (cur.type === 'input-setter') {
      acc[cur.key] = cur.value
    }
    if (cur.type === 'input-number-setter') {
      acc[cur.key] = Number(cur.value)
    }
    return acc
  }, {})
}
export function getSetter(shape, graph) {
  const find = registerSetter(graph).find(item => item.shape === shape)
  if (find) {
    return {
      ...find.setter,
      style: transformStyle(find.setter.style)
    }
  }
}