export async function convertImageUrlsToBase64(jsonData) {
  // 深拷贝原始数据避免修改原对象
  const result = JSON.parse(JSON.stringify(jsonData));

  // 收集所有需要转换的图片节点
  const imageConversionPromises = result.cells.map(async (cell) => {
    if (cell.shape === 'image' &&
      cell.attrs?.image?.['xlink:href'] &&
      !cell.attrs.image['xlink:href'].startsWith('data:image')) {

      const originalUrl = cell.attrs.image['xlink:href'];

      try {
        const base64Data = await fetchImageAsBase64(originalUrl);
        cell.attrs.image['xlink:href'] = base64Data;
      } catch (error) {
        console.error(`Failed to convert image: ${originalUrl}`, error);
        // 保留原始URL作为后备
      }
    }
    return cell;
  });

  await Promise.all(imageConversionPromises);
  return result;
}

// 辅助函数：获取图片并转换为Base64
async function fetchImageAsBase64(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Image fetch failed with status ${response.status}`);
  }

  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}