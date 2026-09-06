import type {
  GetAllStudentRequestDTO,
  GetAllStudentResponseDTO,
  AddStudentRequestDTO,
  AddStudentResponseDTO,
} from '@domain/index';
import { httpClient } from '../http/httpClient';
import { mockStudentService } from '../mocks/mockAdapters';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA === 'true';

export const studentApi = {
  getAllStudents: async (request?: GetAllStudentRequestDTO): Promise<GetAllStudentResponseDTO> => {
    if (USE_MOCK) return mockStudentService.getAllStudents(request);
    return httpClient.get<GetAllStudentResponseDTO>('/students', request as unknown as Record<string, string | number | boolean | undefined | null>);
  },

  addStudent: async (request: AddStudentRequestDTO): Promise<AddStudentResponseDTO> => {
    if (USE_MOCK) return mockStudentService.addStudent(request);
    return httpClient.post<AddStudentResponseDTO>('/students', request);
  },
};
