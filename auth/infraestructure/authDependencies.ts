import { JWTRepository } from "./JWTRepository";
import { VerifyToken } from "../application/middleware/VerifyToken";

const jwtRepository = new JWTRepository();

export const veriifyToken = new VerifyToken(jwtRepository);

