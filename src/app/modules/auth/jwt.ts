import jwt, { JwtPayload } from "jsonwebtoken";


// Access token generate
export const generateAccessToken = (
  payload: object
) => {
  return jwt.sign(
    payload,
    process.env.JWT_ACCESS_SECRET!,
    {
      expiresIn: "15m",
    }
  );
};


// Refresh token generate
export const generateRefreshToken = (
  payload: object
) => {
  return jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET!,
    {
      expiresIn: "30d",
    }
  );
};

// Token verify
export const verifyToken = (
  token: string,
  secret: string
): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};