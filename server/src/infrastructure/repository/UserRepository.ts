import { ConflictError } from "../../domain/entities/CustomErrors";
import IUser from "../../domain/entities/IUser";
import IUserRepository from "../../domain/interfaces/IUserRepository";
import User from "../model/User";

export default class UserRepository implements IUserRepository {
    model = User;

    async create(user: IUser): Promise<IUser> {
        try {
            return await this.model.create(user);
        } catch (error: any) {
            if (error.code === 11000) {
                throw new ConflictError("User with this email already exists");
            }
            throw error;
        }
    }

    async update(id: string, user: IUser): Promise<IUser | null> {
        return this.model.findByIdAndUpdate(id, user).select("-password");
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return await this.model.findOne({ email });
    }

    async findById(id: string): Promise<IUser | null> {
        return await this.model.findById(id).select("-password");
    }

    async delete(id: string): Promise<void> {
        await this.model.findByIdAndDelete(id);
    }

    async getAll(): Promise<IUser[]> {
        return await this.model.find().select("-password");
    }
}