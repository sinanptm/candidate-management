import IHashService from "../../domain/interfaces/services/IHashService";
import {hash, compare} from 'bcryptjs'

export default class HashService implements IHashService {
    async hash(password: string): Promise<string> {
        return await hash(password, 10);
    }

    async compare(password: string, hashedPassword: string): Promise<boolean> {
        return await compare(password, hashedPassword);
    }
}