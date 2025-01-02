import { NotFoundError } from "../domain/entities/CustomErrors";
import IUser from "../domain/entities/IUser";
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

    async updateUserProfile(userId: string, data: IUser) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError('User not found');
        }

        const updatedUser = await this.userRepository.update(userId, data);
        return { user: updatedUser };
    }
}