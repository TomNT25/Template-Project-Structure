import type {
  LoginRequestDTO,
  LoginResponseDTO,
  RefreshTokenRequestDTO,
  RefreshTokenResponseDTO,
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
  UpdateStudentRequestDTO,
  UpdateStudentResponseDTO,
  DeleteStudentRequestDTO,
  DeleteStudentResponseDTO,
  Student,
  User,
} from '@domain/index';

const MOCK_DELAY = 400; // ms latency simulation

const initialStudents: Student[] = [
  {
    id: '1',
    studentCode: 'STD-2026-001',
    fullName: 'Alex Johnson',
    name: 'Alex Johnson',
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
    name: 'Sophia Martinez',
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
    name: 'Liam Nguyen',
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
    name: 'Emma Davis',
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
    name: 'David Smith',
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

    const mockToken = `mock-jwt-token-${Date.now()}`;
    return {
      token: mockToken,
      accessToken: mockToken,
      refreshToken: `mock-refresh-token-${Date.now()}`,
      user,
    };
  },

  async refreshToken(request: RefreshTokenRequestDTO): Promise<RefreshTokenResponseDTO> {
    await delay(MOCK_DELAY);
    if (!request.refreshToken) {
      throw new Error('Refresh token is required');
    }
    const newAccessToken = `mock-refreshed-jwt-token-${Date.now()}`;
    const newRefreshToken = `mock-refreshed-refresh-token-${Date.now()}`;
    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      expiresIn: 60,
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
          (s.fullName || s.name || '').toLowerCase().includes(searchTerm) ||
          (s.studentCode || s.id || '').toLowerCase().includes(searchTerm) ||
          (s.department || '').toLowerCase().includes(searchTerm) ||
          (s.email || '').toLowerCase().includes(searchTerm)
      );
    }

    if (request?.department) {
      filtered = filtered.filter((s) => s.department === request.department);
    }

    if (request?.status) {
      filtered = filtered.filter((s) => s.status === request.status);
    }

    const pageSize = request?.pageSize ?? 10;
    const pageNumber = request?.pageNumber ?? 1;
    const totalRecords = filtered.length;
    const totalPages = Math.ceil(totalRecords / pageSize) || 1;

    const startIndex = (pageNumber - 1) * pageSize;
    const items = filtered.slice(startIndex, startIndex + pageSize);

    const hasNextPage = pageNumber < totalPages;
    const hasPreviousPage = pageNumber > 1;

    return {
      items,
      pageNumber,
      pageSize,
      totalRecords,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    };
  },

  async getStudentById(id: string): Promise<Student> {
    await delay(MOCK_DELAY);
    const found = studentList.find((s) => s.id === id);
    if (!found) {
      throw new Error(`Student with ID '${id}' was not found.`);
    }
    return found;
  },

  async addStudent(request: AddStudentRequestDTO): Promise<AddStudentResponseDTO> {
    await delay(MOCK_DELAY);

    const nameToUse = request.fullName || request.userName || 'Unnamed Student';
    const newStudent: Student = {
      id: String(studentList.length + 1),
      studentCode: request.studentCode || `STD-2026-00${studentList.length + 1}`,
      fullName: nameToUse,
      name: nameToUse,
      email: request.email || `${nameToUse.toLowerCase().replace(/\s+/g, '.')}@university.edu`,
      department: request.department || 'Computer Science',
      gpa: request.gpa ?? 3.5,
      status: request.status || 'Active',
      enrolledDate: new Date().toISOString().split('T')[0],
    };

    studentList = [newStudent, ...studentList];

    return { success: true, student: newStudent };
  },

  async updateStudent(request: UpdateStudentRequestDTO): Promise<UpdateStudentResponseDTO> {
    await delay(MOCK_DELAY);

    const index = studentList.findIndex((s) => s.id === request.id);
    if (index === -1) {
      throw new Error(`Student with ID '${request.id}' was not found.`);
    }

    const existing = studentList[index];
    const nameToUse = request.fullName || request.userName || existing.fullName || existing.name;

    const updatedStudent: Student = {
      ...existing,
      studentCode: request.studentCode || existing.studentCode,
      fullName: nameToUse,
      name: nameToUse,
      email: request.email || existing.email,
      department: request.department || existing.department,
      gpa: request.gpa ?? existing.gpa,
      status: request.status || existing.status,
    };

    studentList[index] = updatedStudent;

    return { success: true, student: updatedStudent };
  },

  async deleteStudent(request: DeleteStudentRequestDTO): Promise<DeleteStudentResponseDTO> {
    await delay(MOCK_DELAY);

    studentList = studentList.filter((s) => s.id !== request.id);
    return { success: true };
  },
};

