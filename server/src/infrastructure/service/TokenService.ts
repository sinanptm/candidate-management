import { UserRole } from "../../types";
import ITokenService from "../../domain/interfaces/services/ITokenService";
import { JwtPayload, sign, TokenExpiredError, verify } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, NODE_ENV, REFRESH_TOKEN_SECRET } from "../../config/env";
import { AuthenticationError, AuthorizationError } from "../../domain/entities/CustomErrors";

export default class TokenService implements ITokenService {
    private createToken(payload: object, secret: string, expiresIn: string) {
        return sign(payload, secret, { expiresIn });
    }

    private verifyToken(token: string, secret: string) {
        try {
            return verify(token, secret) as JwtPayload;
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                throw new AuthenticationError("Token Expired");
            }
            throw new AuthorizationError("Invalid token provided");
        }
    }

    createRefreshToken(email: string, id: string): string {
        return this.createToken({ email, id }, REFRESH_TOKEN_SECRET, "30d");
    }
    verifyRefreshToken(token: string): { email: string; id: string; } {
        const { email, id } = this.verifyToken(token, REFRESH_TOKEN_SECRET);
        return { email, id };
    }
    createAccessToken(email: string, id: string, role: UserRole): string {
        const time = NODE_ENV === "production" ? "15m" : "5s";
        return this.createToken({ email, id, role }, ACCESS_TOKEN_SECRET, time);
    }
    verifyAccessToken(token: string): { email: string; id: string; role: UserRole; } {
        const { email, id, role } = this.verifyToken(token, ACCESS_TOKEN_SECRET);
        return { email, id, role };
    }

}