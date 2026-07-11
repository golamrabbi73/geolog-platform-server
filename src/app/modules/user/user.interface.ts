import { BaseEntity } from "../../../shared/types/base";
import { UserRole, UserStatus } from "../../../shared/types/common";

export interface User extends BaseEntity{
    name: string;
    email: string;
    password: string;
    photoURL?: string;
    role: UserRole;
    status: UserStatus;
}