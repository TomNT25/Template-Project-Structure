-- 1. Declare static IDs so we can link the User to the Role
DECLARE @AdminRoleId VARCHAR(50) = '018f4b5a-1a2b-7c3d-8e4f-5a6b7c8d9e0f';
DECLARE @AdminUserId VARCHAR(50) = '018f4b5a-2b3c-7d4e-8f5a-6b7c8d9e0f1a';

-- 2. Insert the 'Admin' Role
-- Using IF NOT EXISTS to prevent errors if you run this script multiple times
IF NOT EXISTS (SELECT 1 FROM roles WHERE id = @AdminRoleId)
BEGIN
    INSERT INTO roles (
        id, code, name, description, is_active, is_system_role, created_at, updated_at
    )
    VALUES (
        @AdminRoleId,
        'ROLE_ADMIN',
        'System Administrator',
        'Has full access to the system',
        1, -- is_active (BIT)
        1, -- is_system_role (BIT)
        GETDATE(),
        GETDATE()
    );
END

-- 3. Insert the Admin User
IF NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@example.com')
BEGIN
    INSERT INTO users (
        id, code, username, email, password_hash, first_name, last_name,
        role_id, is_active, is_email_verified, created_at, updated_at
    )
    VALUES (
        @AdminUserId,
        'USR-0001',
        'admin',
        'admin@example.com',

        -- Option A: BCrypt hash for 'Password123!' (Common for standard JWT auth)
        '$2y$10$dmqs2ksXAlQHrq.hIK7nQ.5DEiUAKYW3oBFDHvOgejCLQEAJX2VJ2',

        'System',
        'Admin',
        @AdminRoleId, -- Links to the role created above
        1, -- is_active
        1, -- is_email_verified (Important: many login systems block unverified emails)
        GETDATE(),
        GETDATE()
    );
END
GO

DECLARE @AdminRoleId VARCHAR(50) = '018f4b5a-1a2b-7c3d-8e4f-5a6b7c8d9e0f';
DECLARE @AdminUserId VARCHAR(50) = '018f4b5a-2b3c-7d4e-8f5a-6b7c8d9e0f1a';

-- 4. Insert Permissions
-- Relying on the DF_permissions_id default constraint to auto-generate the UUIDs

IF NOT EXISTS (SELECT 1 FROM permissions WHERE name = 'GetAllStudent')
BEGIN
    INSERT INTO permissions (code, name, description, resource, action, is_active)
    VALUES ('PERM_STU_GET_ALL', 'GetAllStudent', 'View list of all students', 'STUDENT', 'GET_ALL', 1);
END

IF NOT EXISTS (SELECT 1 FROM permissions WHERE name = 'GetStudentByID')
BEGIN
    INSERT INTO permissions (code, name, description, resource, action, is_active)
    VALUES ('PERM_STU_GET_BY_ID', 'GetStudentByID', 'View details of a specific student', 'STUDENT', 'GET_BY_ID', 1);
END

IF NOT EXISTS (SELECT 1 FROM permissions WHERE name = 'AddStudent')
BEGIN
    INSERT INTO permissions (code, name, description, resource, action, is_active)
    VALUES ('PERM_STU_ADD', 'AddStudent', 'Add a new student to the system', 'STUDENT', 'ADD', 1);
END

IF NOT EXISTS (SELECT 1 FROM permissions WHERE name = 'UpdateStudent')
BEGIN
    INSERT INTO permissions (code, name, description, resource, action, is_active)
    VALUES ('PERM_STU_UPDATE', 'UpdateStudent', 'Update an existing student''s information', 'STUDENT', 'UPDATE', 1);
END

IF NOT EXISTS (SELECT 1 FROM permissions WHERE name = 'DeleteStudent')
BEGIN
    INSERT INTO permissions (code, name, description, resource, action, is_active)
    VALUES ('PERM_STU_DELETE', 'DeleteStudent', 'Remove a student from the system', 'STUDENT', 'DELETE', 1);
END

-- 5. Map Permissions to the Admin Role
-- We find the generated IDs based on the permission names and link them to @AdminRoleId
-- The IF NOT EXISTS check ensures we don't insert duplicate mappings if run multiple times.

INSERT INTO role_permissions (role_id, permission_id, assigned_at, is_active)
SELECT
    @AdminRoleId, 
    p.id, 
    GETDATE(), 
    1
FROM permissions p
WHERE p.name IN (
    'GetAllStudent', 
    'GetStudentByID', 
    'AddStudent', 
    'UpdateStudent', 
    'DeleteStudent'
)
AND NOT EXISTS (
    SELECT 1 
    FROM role_permissions rp 
    WHERE rp.role_id = @AdminRoleId AND rp.permission_id = p.id
);

GO

-- Declare the static User ID we used earlier
DECLARE @AdminUserId VARCHAR(50) = '018f4b5a-2b3c-7d4e-8f5a-6b7c8d9e0f1a';

-- Insert direct user-level permissions
INSERT INTO user_permissions (
    user_id, 
    permission_id, 
    assigned_at, 
    is_active
)
SELECT 
    @AdminUserId, 
    p.id, 
    GETDATE(), 
    1
FROM permissions p
WHERE p.name IN (
    'GetAllStudent', 
    'GetStudentByID', 
    'AddStudent', 
    'UpdateStudent', 
    'DeleteStudent'
)
-- Ensure we don't insert duplicate mappings if the script is run again
AND NOT EXISTS (
    SELECT 1 
    FROM user_permissions up 
    WHERE up.user_id = @AdminUserId 
      AND up.permission_id = p.id
);

GO