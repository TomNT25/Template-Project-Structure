-- Seed Data: dbo.permissions

IF NOT EXISTS (SELECT 1 FROM dbo.permissions WHERE name = 'GetAllStudent')
BEGIN
    INSERT INTO dbo.permissions (code, name, description, resource, action, is_active, created_at, updated_at)
    VALUES ('PERM_STU_GET_ALL', 'GetAllStudent', 'View list of all students', 'STUDENT', 'GET_ALL', 1, GETDATE(), GETDATE());
END

IF NOT EXISTS (SELECT 1 FROM dbo.permissions WHERE name = 'GetStudentByID')
BEGIN
    INSERT INTO dbo.permissions (code, name, description, resource, action, is_active, created_at, updated_at)
    VALUES ('PERM_STU_GET_BY_ID', 'GetStudentByID', 'View details of a specific student', 'STUDENT', 'GET_BY_ID', 1, GETDATE(), GETDATE());
END

IF NOT EXISTS (SELECT 1 FROM dbo.permissions WHERE name = 'AddStudent')
BEGIN
    INSERT INTO dbo.permissions (code, name, description, resource, action, is_active, created_at, updated_at)
    VALUES ('PERM_STU_ADD', 'AddStudent', 'Add a new student to the system', 'STUDENT', 'ADD', 1, GETDATE(), GETDATE());
END

IF NOT EXISTS (SELECT 1 FROM dbo.permissions WHERE name = 'UpdateStudent')
BEGIN
    INSERT INTO dbo.permissions (code, name, description, resource, action, is_active, created_at, updated_at)
    VALUES ('PERM_STU_UPDATE', 'UpdateStudent', 'Update an existing student''s information', 'STUDENT', 'UPDATE', 1, GETDATE(), GETDATE());
END

IF NOT EXISTS (SELECT 1 FROM dbo.permissions WHERE name = 'DeleteStudent')
BEGIN
    INSERT INTO dbo.permissions (code, name, description, resource, action, is_active, created_at, updated_at)
    VALUES ('PERM_STU_DELETE', 'DeleteStudent', 'Remove a student from the system', 'STUDENT', 'DELETE', 1, GETDATE(), GETDATE());
END
GO
