import {v2 } from 'cloudinary';
import { CLOUDINARY_KEY,CLOUDINARY_NAME,CLOUDINARY_SECRET } from './config';
          
const cloudinary = v2.config({ 
  cloud_name: CLOUDINARY_NAME, 
  api_key: CLOUDINARY_KEY, 
  api_secret: CLOUDINARY_SECRET 
});

export default cloudinary