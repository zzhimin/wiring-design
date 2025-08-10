export function useHidden(props) {
  const hide = ref(false);

  watch(() => props.nodeConfig, (newValue) => {
    // console.log('hidden >>:', newValue);
    const rawData = toRaw(newValue);
    const model = rawData.setter.reduce((obj, item) => {
      obj[item.key] = item.value;
      return obj;
    }, {});
    const isHide = props.optionModel.hide;
    if (typeof isHide == 'function') {
      hide.value = isHide(model);
    }
    if (typeof isHide == 'boolean') {
      hide.value = isHide;
    }
    if (typeof isHide == 'string') {
      const hideBody = new Function('model', `return ${isHide}`);
      hide.value = hideBody(model);
    }
  })
  return hide;
}