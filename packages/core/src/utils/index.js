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