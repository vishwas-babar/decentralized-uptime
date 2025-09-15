import { UserSession } from "./user.type";

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: UserSession;
    }
  }
}

export {};
