
/**
 * Utility to compress images before uploading
 */

export async function compressImage(file: File, maxWidth = 800, maxHeight = 800, quality = 0.7): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      
      img.onload = () => {
        // Create canvas
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Scale down image if larger than maxWidth or maxHeight
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw image on canvas and get data URL
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        ctx.drawImage(img, 0, 0, width, height);
        
        // Get the file extension
        const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'jpeg';
        const mimeType = fileExtension === 'png' ? 'image/png' : 'image/jpeg';
        
        // Convert canvas to blob
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Could not create blob'));
            return;
          }
          
          // Create new file from blob
          const compressedFile = new File(
            [blob], 
            file.name, 
            { type: mimeType, lastModified: Date.now() }
          );
          
          resolve(compressedFile);
        }, mimeType, quality);
      };
      
      img.onerror = () => {
        reject(new Error('Error loading image'));
      };
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
  });
}
