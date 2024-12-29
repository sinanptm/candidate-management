import ITokenService from "../../domain/interfaces/ITokenService";
import IUserRepository from "../../domain/interfaces/IUserRepository";

export default class LoginUserUseCase {
    constructor(
        readonly userRepository: IUserRepository,
        readonly tokenService: ITokenService
    ) { }

    async exec(email: string, password: string) {
        // const 
    }
}