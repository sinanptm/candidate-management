import ITokenService from "../../domain/interfaces/services/ITokenService";
import IUserRepository from "../../domain/interfaces/IUserRepository";
import IHashService from "../../domain/interfaces/services/IHashService";
import { AuthenticationError, AuthorizationError } from "../../domain/entities/CustomErrors";
import { UserRole } from "../../types";

export default class AuthUserUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly tokenService: ITokenService,
        private readonly hashService: IHashService
    ) { }

    async exec(email: string, password: string) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new AuthenticationError("Invalid Credentials provided");
        }
        if (!await this.hashService.compare(password, user.password!)) {
            throw new AuthenticationError("Invalid Credentials provided");
        }

        const refreshToken = this.tokenService.createRefreshToken(user.email!, user._id!);
        const accessToken = this.tokenService.createAccessToken(user.email!, user._id!, UserRole.User);

        await this.userRepository.update(user._id!, { token: refreshToken });

        return { accessToken, refreshToken };
    }

    async refreshAccessToken(refreshToken: string) {
        const { id } = this.tokenService.verifyRefreshToken(refreshToken);
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new AuthorizationError();
        }
        
        const accessToken = this.tokenService.createAccessToken(user.email!, user._id!, UserRole.User);
        return { accessToken };
    }
}