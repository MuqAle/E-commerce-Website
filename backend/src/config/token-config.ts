import { configDotenv } from "dotenv"

configDotenv()

const {SECRET} = process.env

export default SECRET