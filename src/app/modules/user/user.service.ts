import bcrypt from "bcryptjs";
import { UserModel } from "./user.model";
import { RegisterUserInput } from "./user.validation";
import { USER_ROLES, USER_STATUSES } from "../../../shared/types/common";

export const registerUser = async (
    payload: RegisterUserInput
) => {
    // Check duplicate email
    const existingUser = await UserModel.findOne({
        email: payload.email,
    });

    if(existingUser){
        throw new Error("Email already exists.");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    
    const user = await UserModel.create({
    ...payload,
    password: hashedPassword,
    role: USER_ROLES[0],
    status: USER_STATUSES[0],
    });

    const userObject = user.toObject();

    const { password, ...userWithoutPassword } = userObject;

    return userWithoutPassword;
};