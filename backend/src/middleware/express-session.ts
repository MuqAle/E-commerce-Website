import MongoStore from "connect-mongo";
import { MONGODB_URI, SESSION_KEY } from "../config/config";
import session from "express-session";


const sessionStore = MongoStore.create({
    mongoUrl:MONGODB_URI,
    stringify:false,
    ttl: 14 * 24 * 60 * 60,
})

const sessionOptions:session.SessionOptions  = {
    secret:SESSION_KEY as string,
    resave:false,
    saveUninitialized:false,
    store: sessionStore,
    proxy:true,
    name:'MuqqyE-commerceStore',
    cookie:{
        sameSite:'none',
        httpOnly:true,
    }
}

export {sessionOptions,sessionStore}