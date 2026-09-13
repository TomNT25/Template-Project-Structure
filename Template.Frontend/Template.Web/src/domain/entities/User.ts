export interface User {
  id: string;
  code?: string;
  username: string;
  email: string;
  passwordHash: string;
  firstName?: string;
  lastName?: string;
  fullName?: string,
  phoneNumber?: string;
  avatarUrl?: string;
  avatarMediaFileId?: number;
  gender?: string;
  birthDate?: string;
  address?: string;
  provider: string;
  isActive: boolean;
  isEmailVerified: boolean;
  emailVerifiedAt?: string;
  lastLoginAt?: string;
  createdAt: string; // DateTimes come through as ISO 8601 strings
  updatedAt?: string;
  createdBy?: number;
  updatedBy?: number;
  roleId?: string;
  roleName?: string;
}
