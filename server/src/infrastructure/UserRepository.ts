import IUser from "../domain/IUser";
import IUserRepository from "../domain/IUserRepository";
import User from "./User";

export default class UserRepository implements IUserRepository {
    model = User;

    async create(user: IUser): Promise<IUser> {
        return await this.model.create(user);
    }

    async update(id: string, user: IUser): Promise<IUser | null> {
        return this.model.findByIdAndUpdate(id, user);
    }

    findByEmail(email: string): Promise<IUser | null> {
        return this.model.findOne({ email });
    }

    findById(id: string): Promise<IUser | null> {
        return this.model.findById(id);
    }
}