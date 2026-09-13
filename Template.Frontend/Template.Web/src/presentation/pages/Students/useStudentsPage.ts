import { useState, useEffect } from 'react';

export const useStudentsPage = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);

  // Response Metadata States
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  // Modal & Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newStudent, setNewStudent] = useState({
    studentCode: '', fullName: '', email: '', department: '', gpa: 0
  });

  // Fetch data whenever page, size, or search term changes
  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams({
          PageNumber: pageNumber.toString(),
          PageSize: pageSize.toString(),
        });

        if (searchTerm) {
          queryParams.append('SearchTerm', searchTerm);
        }

        const response = await fetch(`http://localhost:5290/api/v1/students?${queryParams.toString()}`, {
          method: 'GET',
          headers: {
            'accept': 'application/json' // updated to json
          }
        });

        const result = await response.json();

        if (result.isSuccess) {
          setStudents(result.data.items);
          setTotalPages(result.data.totalPages);
          setTotalRecords(result.data.totalRecords);
          setHasNextPage(result.data.hasNextPage);
          setHasPrevPage(result.data.hasPreviousPage);
        }
      } catch (error) {
        console.error("Failed to fetch students:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Optional: Add a debounce here if you don't want to spam the API on every keystroke
    const delayDebounceFn = setTimeout(() => {
      fetchStudents();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [pageNumber, pageSize, searchTerm]);

  // Handlers
  const handleNextPage = () => {
    if (hasNextPage) setPageNumber((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (hasPrevPage) setPageNumber((prev) => prev - 1);
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Add your POST request logic here
    setTimeout(() => {
      setIsSubmitting(false);
      setIsModalOpen(false);
    }, 1000);
  };

  // Reset to page 1 when searching
  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    setPageNumber(1);
  };

  return {
    students,
    isLoading,
    searchTerm,
    setSearchTerm: handleSearchChange, // Use the wrapper handler
    pageNumber,
    totalPages,
    totalRecords,
    hasNextPage,
    hasPrevPage,
    handleNextPage,
    handlePrevPage,
    isModalOpen,
    setIsModalOpen,
    newStudent,
    setNewStudent,
    isSubmitting,
    handleAddSubmit,
  };
};
