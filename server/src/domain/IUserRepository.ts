import IUser from "./IUser";

export default interface IUserRepository {
    create(user: IUser): Promise<IUser>;
    findById(id: string): Promise<IUser | null>;
    findByEmail(email: string): Promise<IUser | null>;
    update(id: string, user: IUser): Promise<IUser | null>;
}