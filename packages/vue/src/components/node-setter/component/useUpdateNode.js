export function useUpdateNode(props) {
  return {
    val: computed({
      get: () => props.optionModel.value,
      set: (value) => {
        const node = props.wd.graph.getCellById(props.nodeId)
        const data = node ? node.getData() : {};
        if (!node) return;

        const setType = props.optionModel.setType;
        const setter = {
          ...data,
          setter: data.setter.map(item => {
            return {
              ...item,
              value: item.key === props.optionModel.key ? value : item.value
            };
          })
        }
        node.setData(setter, {overwrite: true});
        props.optionModel.value = value;

        // 业务data如果有update，则执行业务数据data的update方法
        if (data.update) {
          data.update(node, props.wd);
        }

        if (setType === 'setAttrs') {
          const attrs = node.getAttrs();
          if (props.optionModel.key === 'color') {
            node.setAttrs({
              body: {
                stroke: value
              },
            });
          } else if (props.optionModel.key === 'strokeWidth') {
            node.setAttrs({
              body: {
                strokeWidth: value
              },
            });
          } else if (props.optionModel.key === 'bgColor') {
            node.setAttrs({
              bg: {
                fill: value
              },
            });
          }
        } else if (setType === 'setZIndex') {
          node.setZIndex(value);
        } else if (setType === 'setSize') {
          if (props.optionModel.key === 'width') {
            node.setSize({
              width: value,
              height: node.getSize().height
            });
          } else if (props.optionModel.key === 'height') {
            node.setSize({
              width: node.getSize().width,
              height: value
            });
          }
        }
      }
    }),
  }
}