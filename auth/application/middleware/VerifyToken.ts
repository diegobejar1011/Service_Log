import { TokenRepository } from "../../domain/repositories/TokenRepository";
import { Request, Response, NextFunction } from 'express';

export class VerifyToken {
    constructor(private readonly tokenRepository: TokenRepository) {}
    async execute(req: Request, res: Response, next: NextFunction) {
        try {
            let token = req.get('Authorization');
            if(token){
                token = token.substring(7);
                this.tokenRepository.veriifyToken(token);
                next();
            }else{
                res.status(400).json({
                    message: 'No token provided'
                })
            }
        } catch (error : any) {
            res.status(500).json({
                message: 'Invalid token',
                error: error.message
            })
        }
    }
}