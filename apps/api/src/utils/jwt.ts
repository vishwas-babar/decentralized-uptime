import jwt from "jsonwebtoken";
import { config } from "../config";
import { UserSession, AuthPayload } from "../types/user.type";

/**
 * Generate a JWT token for a user session
 */
export const generateToken = (user: UserSession): string => {
  const payload: AuthPayload = {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };

  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: "7d", // Token expires in 7 days
    issuer: "decent-uptime",
    audience: "decent-uptime-users",
  });
};

/**
 * Verify and decode a JWT token
 */
export const verifyToken = (token: string): AuthPayload => {
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET, {
      issuer: "decent-uptime",
      audience: "decent-uptime-users",
    }) as AuthPayload;

    return decoded;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid token");
    }
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error("Token expired");
    }
    if (error instanceof jwt.NotBeforeError) {
      throw new Error("Token not active");
    }
    throw new Error("Token verification failed");
  }
};

/**
 * Extract token from Authorization header
 */
export const extractTokenFromHeader = (
  authHeader: string | undefined
): string | null => {
  if (!authHeader) {
    return null;
  }

  // Check if it's a Bearer token
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return null;
  }

  return parts[1];
};

/**
 * Decode token without verification (for debugging purposes)
 */
export const decodeToken = (token: string): AuthPayload | null => {
  try {
    return jwt.decode(token) as AuthPayload;
  } catch (error) {
    return null;
  }
};

/**
 * Check if token is expired
 */
export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwt.decode(token) as AuthPayload;
    if (!decoded || !decoded.exp) {
      return true;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};

/**
 * Refresh token if it's close to expiry (within 1 day)
 */
export const shouldRefreshToken = (token: string): boolean => {
  try {
    const decoded = jwt.decode(token) as AuthPayload;
    if (!decoded || !decoded.exp) {
      return false;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const oneDayInSeconds = 24 * 60 * 60;

    return decoded.exp - currentTime < oneDayInSeconds;
  } catch (error) {
    return false;
  }
};
