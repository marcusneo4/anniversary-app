// Convert image file to base64 for storage
export function convertImageToBase64(file: File): Promise<string | null> {
  return new Promise((resolve) => {
    if (!file.type.startsWith('image/')) {
      resolve(null);
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        resolve(result);
      } else {
        resolve(null);
      }
    };
    reader.onerror = () => {
      console.error('Failed to read image file');
      resolve(null);
    };
    reader.readAsDataURL(file);
  });
}
