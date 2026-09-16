import React, { useMemo, useCallback } from 'react';
import {
  Button,
  Input,
  Select,
  Modal,
  Badge,
  Spinner,
  Card,
} from '@presentation/components';
import {
  TableHeader,
  TableBody,
  TableToolbar,
  TablePagination,
  TableProvider,
  TableFilter,
  TableSearch,
  type ColumnDef,
} from '@presentation/components/Table';
import type { Student } from '@domain/index';
import { useToast } from '@application/context/ToastContext';
import { useStudentsPage } from './useStudentsPage';
import './StudentsPage.css';

const departmentOptions = [
  { label: 'All Departments', value: '' },
  { label: 'Computer Science', value: 'Computer Science' },
  { label: 'Information Technology', value: 'Information Technology' },
  { label: 'Software Engineering', value: 'Software Engineering' },
  { label: 'Data Science', value: 'Data Science' },
  { label: 'Cybersecurity', value: 'Cybersecurity' },
];

const statusOptions = [
  { label: 'All Statuses', value: '' },
  { label: 'Active', value: 'Active' },
  { label: 'Inactive', value: 'Inactive' },
  { label: 'Graduated', value: 'Graduated' },
];

export const StudentsPage: React.FC = () => {
  const { showToast } = useToast();
  const {
    students,
    isLoading,
    searchTerm,
    setSearchTerm,
    departmentFilter,
    setDepartmentFilter,
    statusFilter,
    setStatusFilter,
    totalRecords,
    pageIndex,
    setPageIndex,
    pageSize,
    setPageSize,
    // Add modal
    isAddModalOpen,
    setIsAddModalOpen,
    newStudent,
    setNewStudent,
    isSubmittingAdd,
    handleAddSubmit,
    // Edit modal
    isEditModalOpen,
    setIsEditModalOpen,
    editingStudent,
    setEditingStudent,
    isSubmittingEdit,
    openEditModal,
    handleEditSubmit,
    // View modal
    isViewModalOpen,
    setIsViewModalOpen,
    viewingStudent,
    openViewModal,
    // Delete modal
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    deletingStudent,
    isSubmittingDelete,
    openDeleteModal,
    handleDeleteConfirm,
  } = useStudentsPage();

  // Metrics summary calculation
  const metrics = useMemo(() => {
    const total = totalRecords || students.length;
    const activeCount = students.filter((s) => (s.status || 'Active').toLowerCase() === 'active').length;
    const totalGpa = students.reduce((acc, curr) => acc + (typeof curr.gpa === 'number' ? curr.gpa : parseFloat(String(curr.gpa)) || 0), 0);
    const avgGpa = students.length > 0 ? (totalGpa / students.length).toFixed(2) : '0.00';
    const departmentsCount = new Set(students.map((s) => s.department).filter(Boolean)).size;
    return { total, activeCount, avgGpa, departmentsCount };
  }, [students, totalRecords]);

  // Copy code helper
  const handleCopyCode = useCallback(
    (code: string) => {
      navigator.clipboard.writeText(code);
      showToast('info', 'Code Copied', `Copied ${code} to clipboard`);
    },
    [showToast]
  );

  // Column definitions with Action handlers
  const columns: ColumnDef<Student>[] = useMemo(
    () => [
      {
        header: '#',
        accessorKey: '_index',
        align: 'center',
        width: '60px',
        cell: (_, rowIndex) => (
          <span style={{ fontWeight: 600, color: 'var(--text-subtle)', fontSize: '0.82rem' }}>
            {pageIndex * pageSize + (rowIndex ?? 0) + 1}
          </span>
        ),
      },
      {
        header: 'Student Code',
        accessorKey: 'studentCode',
        align: 'left',
        width: '180px',
        sortable: true,
        cell: (row) => {
          const rawCode = row.studentCode || `STD-${row.id}`;
          const displayCode =
            rawCode.length > 16 ? `${rawCode.substring(0, 12)}…` : rawCode;
          return (
            <div className="student-code-wrapper">
              <span className="student-code-tag" title={rawCode}>
                {displayCode}
              </span>
              <button
                type="button"
                className="student-copy-btn"
                title="Copy full code"
                onClick={() => handleCopyCode(rawCode)}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              </button>
            </div>
          );
        },
      },
      {
        header: 'Full Name',
        accessorKey: 'fullName',
        align: 'left',
        sortable: true,
        cell: (row) => (
          <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>
            {row.fullName || row.name || 'N/A'}
          </span>
        ),
      },
      {
        header: 'Email',
        accessorKey: 'email',
        align: 'left',
        cell: (row) => {
          const rawName = (row.fullName || row.name || 'student').toLowerCase().replace(/\s+/g, '.');
          const email = row.email || `${rawName}@university.edu`;
          return <span className="student-email">{email}</span>;
        },
      },
      {
        header: 'Department',
        accessorKey: 'department',
        align: 'center',
        sortable: true,
        cell: (row) => <Badge variant="info">{row.department || 'General'}</Badge>,
      },
      {
        header: 'GPA',
        accessorKey: 'gpa',
        align: 'center',
        sortable: true,
        cell: (row) => {
          const val = typeof row.gpa === 'number' ? row.gpa : parseFloat(String(row.gpa)) || 0;
          const variant = val >= 3.5 ? 'success' : val >= 2.5 ? 'warning' : 'danger';
          return <Badge variant={variant}>{val.toFixed(2)}</Badge>;
        },
      },
      {
        header: 'Status',
        accessorKey: 'status',
        align: 'center',
        sortable: true,
        cell: (row) => {
          const statusStr = row.status || 'Active';
          const variant =
            statusStr.toLowerCase() === 'active'
              ? 'success'
              : statusStr.toLowerCase() === 'graduated'
              ? 'info'
              : 'default';
          return <Badge variant={variant}>{statusStr}</Badge>;
        },
      },
      {
        header: 'Actions',
        accessorKey: 'id',
        align: 'center',
        width: '130px',
        cell: (row) => (
          <div className="student-actions-cell" style={{ justifyContent: 'center' }}>
            <button
              type="button"
              className="student-action-btn student-action-view"
              onClick={() => openViewModal(row)}
              title="View Profile"
              aria-label="View Profile"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
            <button
              type="button"
              className="student-action-btn student-action-edit"
              onClick={() => openEditModal(row)}
              title="Edit Record"
              aria-label="Edit Record"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
            <button
              type="button"
              className="student-action-btn student-action-delete"
              onClick={() => openDeleteModal(row)}
              title="Delete Record"
              aria-label="Delete Record"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        ),
      },
    ],
    [openViewModal, openEditModal, openDeleteModal, pageIndex, pageSize, handleCopyCode]
  );


  return (
    <div className="students-container">
      {/* Page Header */}
      <div className="students-header">
        <div className="students-title-group">
          <h1>Student Directory Management</h1>
          <p>View, search, create, update, and manage university student records efficiently.</p>
        </div>
        <Button variant="primary" size="md" onClick={() => setIsAddModalOpen(true)}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: '6px' }}
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Register New Student
        </Button>
      </div>

      {/* KPI Metric Summary Cards */}
      <div className="students-stats-grid">
        <Card hoverable>
          <div className="stat-card-content">
            <div className="stat-info">
              <span className="stat-label">Total Records</span>
              <span className="stat-value">{metrics.total}</span>
              <span className="stat-subtext">Total enrolled students</span>
            </div>
            <div className="stat-icon-badge stat-icon-purple">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
          </div>
        </Card>

        <Card hoverable>
          <div className="stat-card-content">
            <div className="stat-info">
              <span className="stat-label">Active Students</span>
              <span className="stat-value">{metrics.activeCount}</span>
              <span className="stat-subtext">Currently enrolled</span>
            </div>
            <div className="stat-icon-badge stat-icon-green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
          </div>
        </Card>

        <Card hoverable>
          <div className="stat-card-content">
            <div className="stat-info">
              <span className="stat-label">Average GPA</span>
              <span className="stat-value">{metrics.avgGpa}</span>
              <span className="stat-subtext">Academic Performance</span>
            </div>
            <div className="stat-icon-badge stat-icon-amber">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
          </div>
        </Card>

        <Card hoverable>
          <div className="stat-card-content">
            <div className="stat-info">
              <span className="stat-label">Departments</span>
              <span className="stat-value">{metrics.departmentsCount || 4}</span>
              <span className="stat-subtext">Active faculties</span>
            </div>
            <div className="stat-icon-badge stat-icon-cyan">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                <path d="M9 22v-4h6v4" />
                <line x1="8" y1="6" x2="8.01" y2="6" />
                <line x1="16" y1="6" x2="16.01" y2="6" />
                <line x1="12" y1="6" x2="12.01" y2="6" />
                <line x1="8" y1="10" x2="8.01" y2="10" />
                <line x1="16" y1="10" x2="16.01" y2="10" />
                <line x1="12" y1="10" x2="12.01" y2="10" />
              </svg>
            </div>
          </div>
        </Card>
      </div>


      {/* Main Table Card */}
      <Card>
        <TableProvider
          data={students}
          columns={columns}
          totalCount={totalRecords}
          manualPagination
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          pageSize={pageSize}
          setPageSize={setPageSize}
          searchQuery={searchTerm}
          setSearchQuery={setSearchTerm}
        >
          <TableToolbar title="Student Directory">
            <TableSearch placeholder="Search by name, code, department, email..." />
            <TableFilter
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              options={departmentOptions}
            />
            <TableFilter
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={statusOptions}
            />
          </TableToolbar>

          {isLoading ? (
            <div style={{ padding: '60px', textAlign: 'center' }}>
              <Spinner label="Loading student records..." size="lg" />
            </div>
          ) : students.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
              No student records found matching the specified criteria.
            </div>
          ) : (
            <div className="table-scroll-wrapper">
              <table className="custom-table w-full">
                <TableHeader />
                <TableBody />
              </table>
            </div>
          )}

          <TablePagination className="StudentsPage" />
        </TableProvider>
      </Card>

      {/* Modal 1: Register New Student */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Register New Student"
      >
        <form id="add-student-form" onSubmit={handleAddSubmit} className="add-student-form">
          <div className="student-form-grid">
            <Input
              label="Student Code"
              placeholder="e.g. STD-2026-099"
              value={newStudent.studentCode || ''}
              onChange={(e) => setNewStudent({ ...newStudent, studentCode: e.target.value })}
              required
            />
            <Input
              label="Full Name"
              placeholder="e.g. John Doe"
              value={newStudent.fullName || ''}
              onChange={(e) => setNewStudent({ ...newStudent, fullName: e.target.value })}
              required
            />
          </div>

          <Input
            label="Email Address"
            type="email"
            placeholder="student@university.edu"
            value={newStudent.email || ''}
            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
            required
          />

          <div className="student-form-grid">
            <Select
              label="Department"
              placeholder="Select Department"
              options={departmentOptions.filter((d) => d.value !== '')}
              value={newStudent.department || 'Computer Science'}
              onChange={(e) => setNewStudent({ ...newStudent, department: e.target.value })}
              required
            />
            <Select
              label="Status"
              options={statusOptions.filter((s) => s.value !== '')}
              value={newStudent.status || 'Active'}
              onChange={(e) => setNewStudent({ ...newStudent, status: e.target.value })}
              required
            />
          </div>

          <Input
            label="Cumulative GPA"
            type="number"
            step="0.01"
            min="0"
            max="4.0"
            placeholder="3.80"
            value={newStudent.gpa !== undefined ? newStudent.gpa : ''}
            onChange={(e) => setNewStudent({ ...newStudent, gpa: parseFloat(e.target.value) || 0 })}
          />

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '16px' }}>
            <Button type="button" variant="secondary" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={isSubmittingAdd}>
              Save Student
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal 2: Edit Student Details */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Update Student Information"
      >
        {editingStudent && (
          <form id="edit-student-form" onSubmit={handleEditSubmit} className="add-student-form">
            <div className="student-form-grid">
              <Input
                label="Student Code"
                value={editingStudent.studentCode || ''}
                onChange={(e) => setEditingStudent({ ...editingStudent, studentCode: e.target.value })}
                required
              />
              <Input
                label="Full Name"
                value={editingStudent.fullName || editingStudent.userName || ''}
                onChange={(e) =>
                  setEditingStudent({ ...editingStudent, fullName: e.target.value, userName: e.target.value })
                }
                required
              />
            </div>

            <Input
              label="Email Address"
              type="email"
              value={editingStudent.email || ''}
              onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })}
              required
            />

            <div className="student-form-grid">
              <Select
                label="Department"
                options={departmentOptions.filter((d) => d.value !== '')}
                value={editingStudent.department || 'Computer Science'}
                onChange={(e) => setEditingStudent({ ...editingStudent, department: e.target.value })}
                required
              />
              <Select
                label="Status"
                options={statusOptions.filter((s) => s.value !== '')}
                value={editingStudent.status || 'Active'}
                onChange={(e) => setEditingStudent({ ...editingStudent, status: e.target.value })}
                required
              />
            </div>

            <Input
              label="GPA"
              type="number"
              step="0.01"
              min="0"
              max="4.0"
              value={editingStudent.gpa !== undefined ? editingStudent.gpa : ''}
              onChange={(e) => setEditingStudent({ ...editingStudent, gpa: parseFloat(e.target.value) || 0 })}
            />

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '16px' }}>
              <Button type="button" variant="secondary" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" isLoading={isSubmittingEdit}>
                Update Student
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Modal 3: View Student Details */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Student Details Profile"
      >
        {viewingStudent && (
          <div className="student-detail-grid">
            <div className="detail-item">
              <span className="detail-label">System ID</span>
              <span className="detail-value">{viewingStudent.id}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Student Code</span>
              <span className="detail-value">{viewingStudent.studentCode || `STD-${viewingStudent.id}`}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Full Name</span>
              <span className="detail-value">{viewingStudent.fullName || viewingStudent.name || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Email</span>
              <span className="detail-value">{viewingStudent.email || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Department</span>
              <span className="detail-value">{viewingStudent.department || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">GPA</span>
              <span className="detail-value">
                {typeof viewingStudent.gpa === 'number' ? viewingStudent.gpa.toFixed(2) : viewingStudent.gpa || '0.00'}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Status</span>
              <span className="detail-value">
                <Badge variant={viewingStudent.status === 'Active' ? 'success' : 'default'}>
                  {viewingStudent.status || 'Active'}
                </Badge>
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Enrolled Date</span>
              <span className="detail-value">{viewingStudent.enrolledDate || 'N/A'}</span>
            </div>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
          <Button variant="secondary" onClick={() => setIsViewModalOpen(false)}>
            Close
          </Button>
        </div>
      </Modal>

      {/* Modal 4: Delete Student Confirmation */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Delete Student"
      >
        <div className="delete-confirm-box">
          <div className="delete-warning-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <p>
            Are you sure you want to delete student{' '}
            <strong style={{ color: 'var(--text-main)' }}>
              {deletingStudent?.fullName || deletingStudent?.name || deletingStudent?.id}
            </strong>
            ?
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            This action cannot be undone. The student record will be permanently removed.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '16px' }}>
          <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="danger" isLoading={isSubmittingDelete} onClick={handleDeleteConfirm}>
            Confirm Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};

