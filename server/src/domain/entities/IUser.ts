export default interface IUser {
    readonly _id?: string;
    readonly name?: string;
    readonly password?: string;
    readonly email?:string;
    readonly token?: string;
    readonly mobile?: string;
    readonly address?: string;
    readonly profile?: string;
    readonly resume?: string;
}