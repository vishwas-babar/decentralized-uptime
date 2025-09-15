export interface UserSession {
  id: string;
  name: string;
  email: string;
}

export interface AuthPayload {
  user: UserSession;
  iat?: number;
  exp?: number;
}
