import { configDotenv } from "dotenv"

configDotenv()

export const {
    MONGODB_URI,
    PORT,
    SECRET,
    SESSION_KEY,
    STRIPE_KEY} = process.env
