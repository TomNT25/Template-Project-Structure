-- Seed Data: dbo.roles

DECLARE @AdminRoleId VARCHAR(50) = '018f4b5a-1a2b-7c3d-8e4f-5a6b7c8d9e0f';
DECLARE @StudentRoleId VARCHAR(50) = '018f4b5a-1a2b-7c3d-8e4f-5a6b7c8d9e10';

-- 1. Insert System Administrator Role
IF NOT EXISTS (SELECT 1 FROM dbo.roles WHERE id = @AdminRoleId OR code = 'ROLE_ADMIN')
BEGIN
    INSERT INTO dbo.roles (
        id, code, name, description, is_active, is_system_role, created_at, updated_at
    )
    VALUES (
        @AdminRoleId,
        'ROLE_ADMIN',
        'System Administrator',
        'Has full access to all resources and management actions',
        1, -- is_active
        1, -- is_system_role
        GETDATE(),
        GETDATE()
    );
END

-- 2. Insert Student / Standard User Role
IF NOT EXISTS (SELECT 1 FROM dbo.roles WHERE id = @StudentRoleId OR code = 'ROLE_STUDENT')
BEGIN
    INSERT INTO dbo.roles (
        id, code, name, description, is_active, is_system_role, created_at, updated_at
    )
    VALUES (
        @StudentRoleId,
        'ROLE_STUDENT',
        'Student User',
        'Standard student role with access to personal records and directory views',
        1, -- is_active
        0, -- is_system_role
        GETDATE(),
        GETDATE()
    );
END
GO
