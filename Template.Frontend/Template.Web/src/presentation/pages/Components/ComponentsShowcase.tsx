import React, { useState } from 'react';
import {
  Button,
  Badge,
  Card,
  Input,
  Select,
  Modal,
  Pagination,
  TableProvider,
  TableToolbar,
  TableSearch,
  TableFilter,
  TableHeader,
  TableBody,
  TablePagination,
  Spinner,
} from '@presentation/components';
import { useToast } from '@application/context/ToastContext';
import './ComponentsShowcase.css';

export const ComponentsShowcase: React.FC = () => {
  const { showToast } = useToast();

  // State for interactive Standalone Pagination demo
  const [paginationPage, setPaginationPage] = useState<number>(1);
  const [paginationSize, setPaginationSize] = useState<number>(10);
  const totalDemoItems = 85;

  // State for interactive Modal demo
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // State for interactive Form Inputs demo
  const [inputText, setInputText] = useState<string>('John Doe');
  const [selectedRole, setSelectedRole] = useState<string>('admin');

  // Sample data for Data Table showcase
  const sampleTableData = [
    { id: '1', code: 'STU-1001', name: 'Alice Smith', department: 'Computer Science', status: 'Active' },
    { id: '2', code: 'STU-1002', name: 'Bob Johnson', department: 'Electrical Eng', status: 'Active' },
    { id: '3', code: 'STU-1003', name: 'Charlie Brown', department: 'Mathematics', status: 'Inactive' },
    { id: '4', code: 'STU-1004', name: 'Diana Prince', department: 'Physics', status: 'Graduated' },
    { id: '5', code: 'STU-1005', name: 'Evan Wright', department: 'Computer Science', status: 'Active' },
  ];

  const sampleTableColumns = [
    { key: 'code', label: 'Student Code' },
    { key: 'name', label: 'Full Name' },
    { key: 'department', label: 'Department' },
    {
      key: 'status',
      label: 'Status',
      render: (row: any) => {
        const variantMap: Record<string, 'active' | 'inactive' | 'pending'> = {
          Active: 'active',
          Inactive: 'inactive',
          Graduated: 'pending',
        };
        return <Badge variant={variantMap[row.status] || 'default'}>{row.status}</Badge>;
      },
    },
  ];

  return (
    <div className="showcase-container">
      {/* Page Header */}
      <div className="showcase-header">
        <h1 className="showcase-title">
          <span>🧩</span> UI Component System & Gallery
        </h1>
        <p className="showcase-subtitle">
          Interactive showcase demonstrating all modular design components built for this template application.
        </p>
      </div>

      {/* Grid Section 1: Buttons & Badges */}
      <div className="showcase-grid">
        {/* Buttons Section */}
        <Card title="Button Component Variants" subtitle="Customizable buttons with variants, sizes, and states">
          <div className="showcase-card-body">
            <div>
              <div className="showcase-section-title">Variants</div>
              <div className="showcase-row">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="success">Success</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>

            <div>
              <div className="showcase-section-title">Sizes</div>
              <div className="showcase-row">
                <Button size="sm">Small (sm)</Button>
                <Button size="md">Medium (md)</Button>
                <Button size="lg">Large (lg)</Button>
              </div>
            </div>

            <div>
              <div className="showcase-section-title">Icons & Loading States</div>
              <div className="showcase-row">
                <Button icon={<span>⚡</span>} variant="primary">
                  With Icon
                </Button>
                <Button isLoading variant="primary">
                  Loading...
                </Button>
                <Button disabled variant="outline">
                  Disabled
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Badges Section */}
        <Card title="Status Badge Components" subtitle="Pill status indicators with optional pulsing dots">
          <div className="showcase-card-body">
            <div>
              <div className="showcase-section-title">Status Variants (With Dot)</div>
              <div className="showcase-row">
                <Badge variant="active">Active</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="inactive">Inactive</Badge>
                <Badge variant="pending">Pending</Badge>
                <Badge variant="info">Information</Badge>
                <Badge variant="default">Default</Badge>
              </div>
            </div>

            <div>
              <div className="showcase-section-title">Without Dot</div>
              <div className="showcase-row">
                <Badge variant="active" showDot={false}>
                  Active Tag
                </Badge>
                <Badge variant="warning" showDot={false}>
                  Pending Review
                </Badge>
                <Badge variant="danger" showDot={false}>
                  Blocked
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Grid Section 2: Standalone Pagination & Toasts */}
      <div className="showcase-grid">
        {/* Task 1 Highlight: Standalone Pagination Component */}
        <Card
          title="Standalone Pagination Component (Task 1)"
          subtitle="Independent pagination bar supporting page index windowing, page size selector, and total records"
        >
          <div className="showcase-card-body">
            <div className="showcase-demo-box">
              <div className="showcase-interactive-value">
                Current Page: <strong>{paginationPage}</strong> | Page Size: <strong>{paginationSize}</strong> | Total Items: <strong>{totalDemoItems}</strong>
              </div>

              <Pagination
                currentPage={paginationPage}
                totalItems={totalDemoItems}
                pageSize={paginationSize}
                onPageChange={(page) => setPaginationPage(page)}
                onPageSizeChange={(size) => {
                  setPaginationSize(size);
                  setPaginationPage(1);
                }}
                zeroIndexed={false}
              />
            </div>
          </div>
        </Card>

        {/* Toast Notifications */}
        <Card title="Toast Notification System" subtitle="Global toast popups for user feedback">
          <div className="showcase-card-body">
            <div className="showcase-row">
              <Button
                variant="success"
                onClick={() => showToast('success', 'Success', 'Operation completed successfully!')}
              >
                Trigger Success Toast
              </Button>
              <Button
                variant="danger"
                onClick={() => showToast('error', 'Error', 'Failed to save changes. Please try again.')}
              >
                Trigger Error Toast
              </Button>
              <Button
                variant="secondary"
                onClick={() => showToast('info', 'Info', 'A new update is available for your application.')}
              >
                Trigger Info Toast
              </Button>
              <Button
                variant="outline"
                onClick={() => showToast('warning', 'Warning', 'Your session will expire in 5 minutes.')}
              >
                Trigger Warning Toast
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Grid Section 3: Input Controls & Modal Demo */}
      <div className="showcase-grid">
        {/* Input & Form Controls */}
        <Card title="Form Input & Select Controls" subtitle="Labels, helper text, error messages, and icon slots">
          <div className="showcase-card-body">
            <Input
              label="Full Name"
              placeholder="Enter full name"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              helperText="This name will appear on your profile."
            />

            <Select
              label="User Role"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              options={[
                { label: 'Administrator', value: 'admin' },
                { label: 'Standard User', value: 'user' },
                { label: 'Manager', value: 'manager' },
              ]}
            />

            <Input
              label="Input with Error State"
              placeholder="Invalid input example"
              value="invalid-email-format"
              error="Please enter a valid email address."
            />
          </div>
        </Card>

        {/* Modal & Overlay Demo */}
        <Card title="Interactive Modal Dialog" subtitle="Backdrop overlay dialog for forms or actions">
          <div className="showcase-card-body">
            <p>Click the button below to launch a responsive human modal dialog.</p>
            <div>
              <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                Launch Sample Modal
              </Button>
            </div>

            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Sample Action Dialog"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p>This is an example modal component formatted according to human UI/UX standards.</p>
                <Input label="Modal Input Field" placeholder="Type something inside modal..." />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      showToast('success', 'Modal Action', 'Action confirmed inside modal!');
                      setIsModalOpen(false);
                    }}
                  >
                    Confirm Action
                  </Button>
                </div>
              </div>
            </Modal>
          </div>
        </Card>
      </div>

      {/* Full Width Data Table Showcase */}
      <Card
        title="Composite Data Table Component"
        subtitle="Complete reusable Table with integrated Toolbar, Search, Filter, Headers, Rows, and optional TablePagination"
      >
        <div className="showcase-card-body">
          <TableProvider data={sampleTableData} columns={sampleTableColumns} initialPageSize={5}>
            <TableToolbar title="Student Directory Sample">
              <TableSearch placeholder="Search students..." />
              <TableFilter />
            </TableToolbar>
            <TableHeader />
            <TableBody />
            <TablePagination />
          </TableProvider>
        </div>
      </Card>

      {/* Spinners Showcase */}
      <Card title="Loading Indicators" subtitle="Accessible spinner animations">
        <div className="showcase-card-body">
          <div className="showcase-row">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ComponentsShowcase;
