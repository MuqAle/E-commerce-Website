declare namespace Express {
    export interface Request {
        token?: string | null 
        user?: Record<string,unknown> | null | undefined,
    }
 }