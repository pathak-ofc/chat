import { v2 as cloudinary } from 'cloudinary';
import "dotenv/config";

cloudinary.config({ 
    cloud_name: process.env.CLAUDINARY_CLOUD_NAME, 
    api_key: process.env.CLAUDINARY_API_KEY, 
    api_secret: process.env.CLAUDINARY_API_SECRET
});

export default cloudinary;