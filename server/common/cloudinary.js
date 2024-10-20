import { v2 as cloudinary } from 'cloudinary';

export const uploadImage = async (image) => {
  try {
    const result = await cloudinary.uploader.upload(image.path, {
      folder: 'CodeSnippets/Profile-Picture',
      public_id: `user_${Date.now()}`,
      overwrite: true,
      quality: 'auto:low',
      fetch_format: 'auto',
      compression: 'low',
    });
    return result;

  } catch (error) {
    console.error('Error uploading image:', error);
    return error;
  }
};

export const deleteImage = (publicId) => {
    return cloudinary.uploader.destroy(publicId);
}

export const getImage = (publicId) => {
    return cloudinary.image(`${publicId}.jpg`);
}

        
