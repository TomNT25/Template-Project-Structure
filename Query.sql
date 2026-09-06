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
