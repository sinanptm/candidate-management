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