import IUserRepository from "../domain/interfaces/IUserRepository";

export default class UserUseCase {
    constructor(
        private userRepository:IUserRepository,
    ){}

    
}