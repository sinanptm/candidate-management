import { ReactNode } from "react";

export enum UserRole {
    Admin = 'admin',
    User = "user"
}
export type NotAuthenticatedProps = {
    children: ReactNode;
    role: UserRole;
    redirectTo?: string;
};

export type AuthenticatedProps = {
    children: ReactNode;
    role: UserRole;
};

export interface IUser {
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