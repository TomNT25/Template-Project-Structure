import type { PaginationRequest, PaginationResponse } from './Pagination';

export interface Student {
  id: string;
  studentCode: string;
  fullName: string;
  email: string;
  department: string;
  gpa: number;
  status: 'Active' | 'Inactive' | 'Graduated';
  enrolledDate: string;
}

export interface GetAllStudentRequestDTO extends PaginationRequest {
  department?: string;
  status?: string;
}

export type GetAllStudentResponseDTO = PaginationResponse<Student>;

export interface AddStudentRequestDTO {
  studentCode: string;
  fullName: string;
  email: string;
  department: string;
  gpa: number;
  status: 'Active' | 'Inactive' | 'Graduated';
}

export interface AddStudentResponseDTO {
  student: Student;
}
