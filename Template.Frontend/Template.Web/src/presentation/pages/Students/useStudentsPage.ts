import { useState, useEffect, useCallback } from 'react';
import type { Student, AddStudentRequestDTO } from '@domain/index';
import { studentApi } from '@infrastructure/api/studentApi';
import { useToast } from '@application/context/ToastContext';

export function useStudentsPage() {
  const { showToast } = useToast();
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Cursor pagination state
  const [currentCursor, setCurrentCursor] = useState<string | undefined>(undefined);
  const [nextCursor, setNextCursor] = useState<string | null | undefined>(undefined);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [cursorHistory, setCursorHistory] = useState<(string | undefined)[]>([]);

  // Add modal state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newStudent, setNewStudent] = useState<AddStudentRequestDTO>({
    studentCode: '',
    fullName: '',
    email: '',
    department: 'Computer Science',
    gpa: 3.5,
    status: 'Active',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const fetchStudents = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await studentApi.getAllStudents({
        cursor: currentCursor,
        pageSize: 5,
        searchTerm,
      });
      setStudents(res.items);
      setNextCursor(res.nextCursor);
      setHasNextPage(res.hasNextPage);
    } catch (err: unknown) {
      showToast('error', 'Error Loading Students', (err as Error).message || 'Failed to load list');
    } finally {
      setIsLoading(false);
    }
  }, [currentCursor, searchTerm, showToast]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleNextPage = () => {
    if (hasNextPage && nextCursor) {
      setCursorHistory((prev) => [...prev, currentCursor]);
      setCurrentCursor(nextCursor);
    }
  };

  const handlePrevPage = () => {
    if (cursorHistory.length > 0) {
      const prevCursor = cursorHistory[cursorHistory.length - 1];
      setCursorHistory((prev) => prev.slice(0, prev.length - 1));
      setCurrentCursor(prevCursor);
    }
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentCursor(undefined);
    setCursorHistory([]);
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.fullName || !newStudent.email) {
      showToast('error', 'Validation Error', 'Full Name and Email are required');
      return;
    }

    setIsSubmitting(true);
    try {
      await studentApi.addStudent(newStudent);
      showToast('success', 'Student Added', `Student ${newStudent.fullName} registered successfully.`);
      setIsModalOpen(false);
      setNewStudent({
        studentCode: '',
        fullName: '',
        email: '',
        department: 'Computer Science',
        gpa: 3.5,
        status: 'Active',
      });
      fetchStudents();
    } catch (err: unknown) {
      showToast('error', 'Add Student Failed', (err as Error).message || 'Could not add student');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    students,
    isLoading,
    searchTerm,
    setSearchTerm: handleSearchChange,
    hasNextPage,
    hasPrevPage: cursorHistory.length > 0,
    handleNextPage,
    handlePrevPage,
    currentCursor,
    isModalOpen,
    setIsModalOpen,
    newStudent,
    setNewStudent,
    isSubmitting,
    handleAddSubmit,
  };
}
