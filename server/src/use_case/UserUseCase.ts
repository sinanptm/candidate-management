import { NotFoundError } from "../domain/entities/CustomErrors";
import IUserRepository from "../domain/interfaces/IUserRepository";

export default class UserUseCase {
    constructor(
        private userRepository: IUserRepository,
    ) { }

    async getUserProfile(userId: string) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError('User not found');
        }

        return { user };
    }
}