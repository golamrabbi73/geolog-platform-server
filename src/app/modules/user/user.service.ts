import bcrypt from "bcryptjs";
import { UserModel } from "./user.model";
import { LoginUserInput, RegisterUserInput } from "./user.validation";
import { USER_ROLES, USER_STATUSES } from "../../../shared/types/common";
import AppError from "../../errors/AppError";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../auth/jwt";
import { env } from "../../../config/env";

// user register
export const registerUser = async (
    payload: RegisterUserInput
) => {
    // Check duplicate email
    const existingUser = await UserModel.findOne({
        email: payload.email,
    });

    if(existingUser){
        throw new AppError(409, "Email already exists.");
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

// user login
export const loginUser = async (
  payload: LoginUserInput
) => {
  // Find user by email
  const user = await UserModel.findOne({
    email: payload.email,
  }).select("+password");

  if (!user) {
    throw new AppError(401, "Invalid email or password.");
  }

  // Compare password
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new AppError(401, "Invalid email or password.");
  }

  // Generate JWT Token
  const accessToken = generateAccessToken({
    userId: user._id,
    role: user.role,
    });

    const refreshToken = generateRefreshToken({
    userId: user._id,
    role: user.role,
    });

  const userObject = user.toObject();

  const { password, ...userWithoutPassword } = userObject;

  return {
    accessToken,
    refreshToken,
    user: userWithoutPassword,
    };
};


//  Token Verification
export const refreshToken = async (token: string) => {
  const decoded = verifyToken(token, env.JWT_REFRESH_SECRET);

  const user = await UserModel.findById(decoded.userId);

  if (!user) {
    throw new AppError(404, "User not found.");
  }

  const accessToken = generateAccessToken({
    userId: user._id,
    role: user.role,
  });

  return {
    accessToken,
  };
};

// getMe service: user data find by id from database
export const getMe = async (userId: string) => {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new AppError(404, "User not found.");
  }

  return user;
};