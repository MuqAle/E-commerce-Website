import { CartTypes, UserTypes } from "./types/type";
import "express-session";
import 'http'





declare global{
    declare namespace Express {
    export interface Request {
        token?: string | null ,
        user:UserTypes,
    }
 }}


declare module 'express-session'{
    export interface SessionData{
            guestCart: CartTypes
    }
}
 
declare module 'http' {
    export interface IncomingMessage {
        rawBody: unknown;
    }
}
