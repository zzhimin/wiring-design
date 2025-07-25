/**
 * Saves JSON data to a file and triggers a download
 * @param {Object|string} data - The JSON data to save (can be object or string)
 * @param {string} [filename="json.json"] - The name of the file to save
 */
export function saveJSON(data, filename = "wiring-design.json") {
  if (!data) {
    console.error("No data provided to save");
    alert("保存的数据为空");
    return;
  }

  try {
    // Convert to formatted JSON if it's an object
    const jsonString = typeof data === "object" 
      ? JSON.stringify(data, null, 2)  // 2-space indentation is more standard
      : data;

    // Create download link
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    
    a.href = url;
    a.download = filename;
    a.style.display = "none";
    
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  } catch (error) {
    console.error("Error saving JSON:", error);
    alert(`保存文件时出错: ${error.message}`);
  }
}

/**
 * 动态创建style标签并加载CSS字符串
 * @param {string|string[]} cssText - CSS字符串或CSS字符串数组
 */
export function addDynamicStyle(cssText) {
  // 创建style元素
  const styleElement = document.createElement('style');
  styleElement.type = 'text/css';
  
  // 处理传入的CSS文本（支持字符串或数组）
  let cssContent = Array.isArray(cssText) 
    ? cssText.join('\n') 
    : cssText;
  
  // 将CSS内容添加到style元素
  if (styleElement.styleSheet) {
    // IE支持
    styleElement.styleSheet.cssText = cssContent;
  } else {
    // 现代浏览器支持
    styleElement.appendChild(document.createTextNode(cssContent));
  }
  
  // 将style元素添加到head
  document.head.appendChild(styleElement);
  
  return styleElement;
}


export function deepClone(target, ignoreFields) {
  if (target === null) {
    return target;
  }
  if (target instanceof Date) {
    return new Date(target.getTime());
  }
  if (target instanceof Array) {
    const cp = [];
    target.forEach((v) => { cp.push(v); });
    return cp.map((n) => deepClone(n));
  }
  if (typeof target === 'object' && target !== {}) {
    const cp = {...target};
    Object.keys(cp).forEach(k => {
      if (!ignoreFields || ignoreFields.indexOf(k) === -1) {
        cp[k] = deepClone(cp[k]);
      }
    });
    return cp;
  }
  return target;
}
