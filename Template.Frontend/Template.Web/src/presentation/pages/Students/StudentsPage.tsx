import React from 'react';
import {
  Button,
  Input,
  Select,
  Modal,
  Badge,
  Spinner,
} from '@presentation/components';
import {
  TableHeader,
  TableBody,
  TableToolbar,
  type ColumnDef,
  TableProvider,
} from '@presentation/components/Table';
import { useStudentsPage } from './useStudentsPage';
import './StudentsPage.css';

const studentColumns: ColumnDef<any>[] = [
  {
    header: 'Code',
    accessorKey: 'studentCode',
    cell: (row) => <strong>{row.studentCode}</strong>,
  },
  {
    header: 'Full Name',
    accessorKey: 'name',
  },
  {
    header: 'Email',
    accessorKey: 'email',
  },
  {
    header: 'Department',
    accessorKey: 'department',
  },
  {
    header: 'GPA',
    accessorKey: 'gpa',
    cell: (row) => <strong>{typeof row.gpa === 'number' ? row.gpa.toFixed(2) : row.gpa || '0.00'}</strong>,
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: (row) => {
      const statusStr = row.status || 'Active';
      const variant = statusStr.toLowerCase() === 'active' ? 'success' : 'default';
      return <Badge variant={variant}>{statusStr}</Badge>;
    },
  },
];

const departmentOptions = [
  { label: 'Computer Science', value: 'Computer Science' },
  { label: 'Information Technology', value: 'Information Technology' },
  { label: 'Software Engineering', value: 'Software Engineering' },
  { label: 'Data Science', value: 'Data Science' },
];

export const StudentsPage: React.FC = () => {
  const {
    students,
    isLoading,
    searchTerm,
    setSearchTerm,
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
  } = useStudentsPage();

  return (
    <div className="students-container space-y-6">
      <div className="students-header">
        <div className="students-title-group">
          <h1>Student Directory</h1>
          <p className="text-gray-500">Manage and track university student records</p>
        </div>
      </div>

      <TableProvider
        data={students}
        columns={studentColumns}
        totalCount={totalRecords}
        manualPagination
        manualFiltering
      >
        <TableToolbar>
          <div className="students-search-wrapper w-full sm:w-auto">
            <Input
              placeholder="Search by name, code, dept..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              iconLeft="🔍"
            />
          </div>
          <Button variant="primary" onClick={() => setIsModalOpen(true)} icon="➕">
            Add Student
          </Button>
        </TableToolbar>

        {isLoading ? (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <Spinner label="Loading students list..." size="md" />
          </div>
        ) : students.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No student records found matching search.
          </div>
        ) : (
          <div className="table-scroll-wrapper">
            <table className="custom-table w-full">
              <TableHeader />
              <TableBody />
            </table>
          </div>
        )}

        <div className="pagination-footer flex justify-between items-center p-4 border-t">
          <span className="text-sm text-gray-500">
            Showing Page {pageNumber} of {totalPages || 1} (Total: {totalRecords} records)
          </span>

          <div className="pagination-controls flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              disabled={!hasPrevPage}
              onClick={handlePrevPage}
            >
              Previous
            </Button>
            <Button
              variant="secondary"
              size="sm"
              disabled={!hasNextPage}
              onClick={handleNextPage}
            >
              Next
            </Button>
          </div>
        </div>
      </TableProvider>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Register New Student"
      >
        <form id="add-student-form" onSubmit={handleAddSubmit} className="add-student-form space-y-4">
          <Input
            label="Student Code"
            placeholder="STD-2026-099"
            value={newStudent.studentCode}
            onChange={(e) => setNewStudent({ ...newStudent, studentCode: e.target.value })}
            required
          />
          <Input
            label="Full Name"
            placeholder="John Doe"
            value={newStudent.fullName}
            onChange={(e) => setNewStudent({ ...newStudent, fullName: e.target.value })}
            required
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="student@university.edu"
            value={newStudent.email}
            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
            required
          />
          <Select
            label="Department"
            placeholder="Select Department"
            options={departmentOptions}
            value={newStudent.department}
            onChange={(e) => setNewStudent({ ...newStudent, department: e.target.value })}
            required
          />
          <Input
            label="GPA"
            type="number"
            step="0.01"
            placeholder="3.80"
            value={newStudent.gpa || ''}
            onChange={(e) => setNewStudent({ ...newStudent, gpa: parseFloat(e.target.value) || 0 })}
          />

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={isSubmitting}>
              Submit Student
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
