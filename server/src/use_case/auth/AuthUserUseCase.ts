import ITokenService from "../../domain/interfaces/ITokenService";
import IUserRepository from "../../domain/interfaces/IUserRepository";

export default class AuthUserUseCase {
    constructor(
        readonly userRepository: IUserRepository,
        readonly tokenService: ITokenService
    ) { }

    async exec(email: string, password: string) {
        // const 
    }
}