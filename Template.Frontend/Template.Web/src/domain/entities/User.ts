export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: string;
  avatarUrl?: string;
  emailVerified: boolean;
  createdAt?: string;
}
