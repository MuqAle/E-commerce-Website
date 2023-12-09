import { configDotenv } from "dotenv"

configDotenv()

export const {
    MONGODB_URI,
    PORT,
    SECRET,
    SESSION_KEY,
    STRIPE_KEY,
    STRIPE_WEBHOOK,
    CLOUDINARY_SECRET,
    CLOUDINARY_KEY,
    CLOUDINARY_NAME,
    CLIENT_URL} = process.env
