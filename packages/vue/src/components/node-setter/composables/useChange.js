export function useChange(props) {
  function onChange(e) {
    // console.log('e >>:', e);
    const value = typeof e == 'object' ? e.target.value : e;
    props.optionModel.onChange && props.optionModel.onChange(value, props);
  }

  return {
    onChange
  }
}