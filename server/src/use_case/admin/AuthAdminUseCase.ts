import { ADMIN_PASSWORD, ADMIN_USERNAME } from "../../config/env";
import { AuthenticationError } from "../../domain/entities/CustomErrors";
import ITokenService from "../../domain/interfaces/ITokenService";
import IUserRepository from "../../domain/interfaces/IUserRepository";
import { UserRole } from "../../types";

export default class AuthAdminUseCase {
    constructor(
        readonly userRepository: IUserRepository,
        readonly tokenService: ITokenService
    ) { }

    async exec(username: string, password: string) {
        if (ADMIN_USERNAME !== username || password !== ADMIN_PASSWORD) {
            throw new AuthenticationError("Invalid username or password provided");
        }

        const refreshToken = this.tokenService.createRefreshToken(username, 'admin');
        const accessToken = this.tokenService.createAccessToken(username, "admin", UserRole.Admin);

        return { refreshToken, accessToken };
    }
}