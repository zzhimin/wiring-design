export function useUpdateStyle(props) {
  return {
    val: computed({
      get: () => props.optionModel.value,
      set: (value) => {
        const node = props.wd.graph.getCellById(props.nodeId)
        if (node) {
          const style = {
            name: node.data.name,
            style: {
              ...node.data.style,
              [props.optionModel.key]: value
            }
          }
          node.setData(style);
        }
      }
    }),
  }
}