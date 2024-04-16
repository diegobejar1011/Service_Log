import jwt from 'jsonwebtoken';
import { TokenRepository } from '../domain/repositories/TokenRepository';
import { JWT_SECRET_KEY } from '../domain/constants/secretKey';

export class JWTRepository implements TokenRepository {
    private secretKey: string = JWT_SECRET_KEY;
    veriifyToken(token: string): void {
        jwt.verify(token, this.secretKey, (err : any, _decodedToken) => {
            if(err){
                throw new Error(err.message);
            }
        });
    }
}