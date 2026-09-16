import type {
  GetAllStudentRequestDTO,
  GetAllStudentResponseDTO,
  AddStudentRequestDTO,
  AddStudentResponseDTO,
  UpdateStudentRequestDTO,
  UpdateStudentResponseDTO,
  DeleteStudentRequestDTO,
  DeleteStudentResponseDTO,
  Student,
} from '@domain/index';
import { httpClient } from '../http/httpClient';
import { mockStudentService } from '../mocks/mockAdapters';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA === 'true';

export const studentApi = {
  getAllStudents: async (request?: GetAllStudentRequestDTO): Promise<GetAllStudentResponseDTO> => {
    if (USE_MOCK) return mockStudentService.getAllStudents(request);
    return httpClient.get<GetAllStudentResponseDTO>('/students', request as unknown as Record<string, string | number | boolean | undefined | null>);
  },

  getStudentById: async (id: string): Promise<Student> => {
    if (USE_MOCK) return mockStudentService.getStudentById(id);
    return httpClient.get<Student>(`/students/${id}`);
  },

  addStudent: async (request: AddStudentRequestDTO): Promise<AddStudentResponseDTO> => {
    if (USE_MOCK) return mockStudentService.addStudent(request);
    // Align request body format with backend (which accepts UserName or AddStudentRequestDTO)
    const payload = {
      ...request,
      userName: request.fullName || request.userName || '',
    };
    return httpClient.post<AddStudentResponseDTO>('/students', payload);
  },

  updateStudent: async (request: UpdateStudentRequestDTO): Promise<UpdateStudentResponseDTO> => {
    if (USE_MOCK) return mockStudentService.updateStudent(request);
    const payload = {
      ...request,
      userName: request.fullName || request.userName || '',
    };
    return httpClient.post<UpdateStudentResponseDTO>('/students/update', payload);
  },

  deleteStudent: async (request: DeleteStudentRequestDTO): Promise<DeleteStudentResponseDTO> => {
    if (USE_MOCK) return mockStudentService.deleteStudent(request);
    return httpClient.post<DeleteStudentResponseDTO>('/students/delete', request);
  },
};

