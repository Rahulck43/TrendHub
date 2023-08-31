import cloudinary from "../utils/cloudinary";

const cloudinaryUpload = async (file: any) => {
    try {
        const streamUpload = (fileBuffer: any) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream((error, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                });
                stream.write(fileBuffer);
                stream.end();
            });
        };
        
        const result: any = await streamUpload(file?.buffer);
        return result.secure_url;
    } catch (error) {
        throw new Error('Error uploading to Cloudinary');
    }
};

export default cloudinaryUpload;
