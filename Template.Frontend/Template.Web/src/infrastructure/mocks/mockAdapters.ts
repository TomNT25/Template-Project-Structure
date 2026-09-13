import type {
  LoginRequestDTO,
  LoginResponseDTO,
  RegisterRequestDTO,
  RegisterResponseDTO,
  SendOtpRequestDTO,
  SendOtpResponseDTO,
  VerifyOtpRequestDTO,
  VerifyOtpResponseDTO,
  ForgotPasswordRequestDTO,
  ForgotPasswordResponseDTO,
  ResetPasswordRequestDTO,
  ResetPasswordResponseDTO,
  GetMeResponseDTO,
  GetAllStudentRequestDTO,
  GetAllStudentResponseDTO,
  AddStudentRequestDTO,
  AddStudentResponseDTO,
  Student,
  User,
} from '@domain/index';

const MOCK_DELAY = 400; // ms latency simulation

const initialStudents: Student[] = [
  {
    id: '1',
    studentCode: 'STD-2026-001',
    fullName: 'Alex Johnson',
    email: 'alex.j@university.edu',
    department: 'Computer Science',
    gpa: 3.85,
    status: 'Active',
    enrolledDate: '2023-09-01',
  },
  {
    id: '2',
    studentCode: 'STD-2026-002',
    fullName: 'Sophia Martinez',
    email: 'sophia.m@university.edu',
    department: 'Software Engineering',
    gpa: 3.92,
    status: 'Active',
    enrolledDate: '2023-09-01',
  },
  {
    id: '3',
    studentCode: 'STD-2026-003',
    fullName: 'Liam Nguyen',
    email: 'liam.n@university.edu',
    department: 'Information Technology',
    gpa: 3.65,
    status: 'Active',
    enrolledDate: '2024-01-15',
  },
  {
    id: '4',
    studentCode: 'STD-2026-004',
    fullName: 'Emma Davis',
    email: 'emma.d@university.edu',
    department: 'Data Science',
    gpa: 3.78,
    status: 'Inactive',
    enrolledDate: '2022-09-01',
  },
  {
    id: '5',
    studentCode: 'STD-2026-005',
    fullName: 'David Smith',
    email: 'david.s@university.edu',
    department: 'Cybersecurity',
    gpa: 3.40,
    status: 'Graduated',
    enrolledDate: '2021-09-01',
  },
];

let studentList: Student[] = [...initialStudents];

export const mockUser: User = {
  id: "01A06B3F-EDF5-7201-82A2-5258B44F0EA8",
  code: "STD-2026-001",
  username: "danle",
  email: "dan.le@university.edu",
  passwordHash: "AQAAAAEAACcQAAAAEJ...", // Simulated hashed password string
  firstName: "Dan",
  lastName: "Le",
  phoneNumber: "+84901234567",
  avatarUrl: "https://ui-avatars.com/api/?name=Dan+Le",
  avatarMediaFileId: 1042,
  gender: "Male",
  birthDate: "2004-05-15T00:00:00.000Z",
  address: "Ho Chi Minh City, Vietnam",
  provider: "system",
  isActive: true,
  isEmailVerified: true,
  emailVerifiedAt: "2026-09-01T10:15:30.000Z",
  lastLoginAt: "2026-09-09T08:22:10.000Z",
  createdAt: "2026-08-20T09:00:00.000Z",
  updatedAt: "2026-09-05T14:45:00.000Z",
  createdBy: 1, // Example Admin ID who created this record
  updatedBy: 1,
  roleId: "ROLE-STUDENT-999",
  roleName: "Student"
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const mockAuthService = {
  async login(request: LoginRequestDTO): Promise<LoginResponseDTO> {
    await delay(MOCK_DELAY);
    if (!request.email || !request.password) {
      throw new Error('Email and password are required');
    }

    const user: User = {
      ...mockUser,
      email: request.email,
    };

    return {
      token: `mock-jwt-token-${Date.now()}`,
      refreshToken: `mock-refresh-token-${Date.now()}`,
      user,
    };
  },

  async register(request: RegisterRequestDTO): Promise<RegisterResponseDTO> {
    await delay(MOCK_DELAY);
    if (!request.email || !request.password) {
      throw new Error('Email and password are required for registration');
    }
    return {
      userId: `usr-${Math.floor(Math.random() * 9000 + 1000)}`,
      email: request.email,
      isVerificationRequired: true,
    };
  },

  async sendOtp(request: SendOtpRequestDTO): Promise<SendOtpResponseDTO> {
    await delay(MOCK_DELAY);
    return {
      sentTo: request.email,
      expiresInMinutes: 5,
    };
  },

  async verifyOtp(request: VerifyOtpRequestDTO): Promise<VerifyOtpResponseDTO> {
    await delay(MOCK_DELAY);
    if (request.otpCode !== '123456') {
      throw new Error('Invalid OTP code. Try entering 123456 for demo.');
    }
    return {
      isVerified: true,
      token: `mock-verified-token-${Date.now()}`,
    };
  },

  async forgotPassword(request: ForgotPasswordRequestDTO): Promise<ForgotPasswordResponseDTO> {
    await delay(MOCK_DELAY);
    return {
      sentTo: request.email,
      message: 'Password reset OTP has been sent to your email address.',
    };
  },

  async resetPassword(request: ResetPasswordRequestDTO): Promise<ResetPasswordResponseDTO> {
    await delay(MOCK_DELAY);
    if (request.otpCode !== '123456') {
      throw new Error('Invalid OTP code. Use 123456 for demo.');
    }
    return { isSuccess: true };
  },

  async getMe(): Promise<GetMeResponseDTO> {
    await delay(MOCK_DELAY);
    return { user: mockUser };
  },
};

export const mockStudentService = {
  async getAllStudents(request?: GetAllStudentRequestDTO): Promise<GetAllStudentResponseDTO> {
    await delay(MOCK_DELAY);

    let filtered = [...studentList];
    const searchTerm = request?.searchTerm?.toLowerCase().trim();
    if (searchTerm) {
      filtered = filtered.filter(
        (s) =>
          s.fullName.toLowerCase().includes(searchTerm) ||
          s.studentCode.toLowerCase().includes(searchTerm) ||
          s.department.toLowerCase().includes(searchTerm) ||
          s.email.toLowerCase().includes(searchTerm)
      );
    }

    if (request?.department) {
      filtered = filtered.filter((s) => s.department === request.department);
    }

    if (request?.status) {
      filtered = filtered.filter((s) => s.status === request.status);
    }

    // Apply cursor filter if provided (btoa/atob encoded ID or value)
    if (request?.cursor) {
      try {
        const decodedCursor = atob(request.cursor);
        const cursorIndex = filtered.findIndex((s) => s.id === decodedCursor);
        if (cursorIndex !== -1) {
          filtered = filtered.slice(cursorIndex + 1);
        }
      } catch {
        // Fallback if raw cursor passed
        const cursorIndex = filtered.findIndex((s) => s.id === request.cursor);
        if (cursorIndex !== -1) {
          filtered = filtered.slice(cursorIndex + 1);
        }
      }
    }

    const pageSize = request?.pageSize ?? 5;
    const hasNextPage = filtered.length > pageSize;
    const items = hasNextPage ? filtered.slice(0, pageSize) : filtered;

    let nextCursor: string | null = null;
    if (hasNextPage && items.length > 0) {
      const lastItem = items[items.length - 1];
      nextCursor = btoa(lastItem.id);
    }

    return {
      items,
      nextCursor,
      hasNextPage,
      pageSize,
      totalCount: studentList.length,
    };
  },

  async addStudent(request: AddStudentRequestDTO): Promise<AddStudentResponseDTO> {
    await delay(MOCK_DELAY);

    const newStudent: Student = {
      id: String(studentList.length + 1),
      studentCode: request.studentCode || `STD-2026-00${studentList.length + 1}`,
      fullName: request.fullName,
      email: request.email,
      department: request.department,
      gpa: request.gpa,
      status: request.status,
      enrolledDate: new Date().toISOString().split('T')[0],
    };

    studentList = [newStudent, ...studentList];

    return { student: newStudent };
  },
};
