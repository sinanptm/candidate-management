import { ValidationError } from "../domain/entities/CustomErrors";
import IUser from "../domain/entities/IUser";
import IUserRepository from "../domain/interfaces/IUserRepository";
import IHashService from "../domain/interfaces/services/IHashService";
import { isValidString } from "../utils";

export default class AdminUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly hasService: IHashService
    ) { }

    async getUsers() {
        return await this.userRepository.getAll();
    }

    async createUser(user: IUser) {
        this.validateUser(user);
        const hashedPassword = await this.hasService.hash(user.password!);

        return await this.userRepository.create({ ...user, password: hashedPassword });
    }

    async deleteUser(id: string) {
        if (!isValidString(id) || !await this.userRepository.findById(id)) {
            throw new ValidationError("Invalid user id");
        }

        await this.userRepository.delete(id);
    }

    private validateUser(user: IUser) {
        if (!isValidString(user.name)) {
            throw new ValidationError("User name is required");
        }

        if (!isValidString(user.password) || user.password!.length < 4) {
            throw new ValidationError("Password must be at least 4 characters long");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!user.email || !emailRegex.test(user.email)) {
            throw new ValidationError("Invalid email address");
        }
    }

}