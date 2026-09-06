import React from 'react';
import { Button } from '@presentation/components/Button';
import { Input } from '@presentation/components/Input';
import { Modal } from '@presentation/components/Modal';
import { useStudentsPage } from './useStudentsPage';
import './StudentsPage.css';

export const StudentsPage: React.FC = () => {
  const {
    students,
    isLoading,
    searchTerm,
    setSearchTerm,
    hasNextPage,
    hasPrevPage,
    handleNextPage,
    handlePrevPage,
    currentCursor,
    isModalOpen,
    setIsModalOpen,
    newStudent,
    setNewStudent,
    isSubmitting,
    handleAddSubmit,
  } = useStudentsPage();

  return (
    <div className="students-container">
      <div className="students-header">
        <div className="students-title-group">
          <h1>Student Directory</h1>
          <p>Manage and track university student records (Cursor Pagination)</p>
        </div>

        <div className="students-controls">
          <div className="students-search-wrapper">
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
        </div>
      </div>

      <div className="students-table-card">
        {isLoading ? (
          <div style={{ padding: '40px', textAlign: 'center' }}>Loading students list...</div>
        ) : students.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No student records found matching search.
          </div>
        ) : (
          <table className="students-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>GPA</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((std) => (
                <tr key={std.id}>
                  <td>
                    <strong>{std.studentCode}</strong>
                  </td>
                  <td>{std.fullName}</td>
                  <td>{std.email}</td>
                  <td>{std.department}</td>
                  <td>
                    <strong>{std.gpa.toFixed(2)}</strong>
                  </td>
                  <td>
                    <span className={`badge badge-${std.status.toLowerCase()}`}>
                      ● {std.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="pagination-footer">
          <span>
            {currentCursor ? `Cursor: ${currentCursor.substring(0, 10)}...` : 'First Page'}
          </span>

          <div className="pagination-controls">
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
      </div>

      {/* Add Student Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Register New Student"
      >
        <form id="add-student-form" onSubmit={handleAddSubmit} className="add-student-form">
          <Input
            label="Student Code"
            placeholder="STD-2026-099"
            value={newStudent.studentCode}
            onChange={(e) => setNewStudent({ ...newStudent, studentCode: e.target.value })}
          />

          <Input
            label="Full Name"
            placeholder="Alice Williams"
            value={newStudent.fullName}
            onChange={(e) => setNewStudent({ ...newStudent, fullName: e.target.value })}
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="alice@university.edu"
            value={newStudent.email}
            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
            required
          />

          <Input
            label="Department"
            placeholder="Software Engineering"
            value={newStudent.department}
            onChange={(e) => setNewStudent({ ...newStudent, department: e.target.value })}
            required
          />

          <Input
            label="GPA"
            type="number"
            step="0.01"
            placeholder="3.80"
            value={String(newStudent.gpa)}
            onChange={(e) => setNewStudent({ ...newStudent, gpa: parseFloat(e.target.value) || 0 })}
            required
          />

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
