import React from 'react';
import { Button } from '@presentation/components/Button';
import { Input } from '@presentation/components/Input';
import { Modal } from '@presentation/components/Modal';
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
    accessorKey: 'name', // Note: Updated to match your API response "name" field
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
    cell: (row) => <strong>{row.gpa?.toFixed(2)}</strong>,
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: (row) => (
      <span className={`badge badge-${row.status?.toLowerCase() || 'default'}`}>
        ● {row.status || 'Active'}
      </span>
    ),
  },
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
          <div style={{ padding: '40px', textAlign: 'center' }}>Loading students list...</div>
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
            Showing Page {pageNumber} of {totalPages} (Total: {totalRecords} records)
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
          />
          {/* Form remains the same */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '16px' }}>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
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
