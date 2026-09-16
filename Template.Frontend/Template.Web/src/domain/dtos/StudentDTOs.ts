import type { PaginationRequest, PaginationResponse } from './Pagination';

export interface Student {
  id: string;
  studentCode?: string;
  fullName?: string;
  name?: string;
  email?: string;
  department?: string;
  gpa?: number;
  status?: 'Active' | 'Inactive' | 'Graduated' | string;
  enrolledDate?: string;
}

export interface GetAllStudentRequestDTO extends PaginationRequest {
  pageNumber?: number;
  department?: string;
  status?: string;
  sortColumn?: string;
  sortDescending?: boolean;
}

export interface GetAllStudentResponseDTO extends PaginationResponse<Student> {
  items: Student[];
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface AddStudentRequestDTO {
  studentCode?: string;
  fullName: string;
  userName?: string;
  email: string;
  department: string;
  gpa?: number;
  status?: 'Active' | 'Inactive' | 'Graduated' | string;
}

export interface AddStudentResponseDTO {
  success?: boolean;
  student?: Student;
}

export interface UpdateStudentRequestDTO {
  id: string;
  studentCode?: string;
  fullName?: string;
  userName?: string;
  email?: string;
  department?: string;
  gpa?: number;
  status?: 'Active' | 'Inactive' | 'Graduated' | string;
}

export interface UpdateStudentResponseDTO {
  success?: boolean;
  student?: Student;
}

export interface DeleteStudentRequestDTO {
  id: string;
}

export interface DeleteStudentResponseDTO {
  success?: boolean;
}

