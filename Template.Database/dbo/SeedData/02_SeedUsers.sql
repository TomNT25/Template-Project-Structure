-- Seed Data: dbo.users

DECLARE @AdminRoleId VARCHAR(50) = '018f4b5a-1a2b-7c3d-8e4f-5a6b7c8d9e0f';
DECLARE @StudentRoleId VARCHAR(50) = '018f4b5a-1a2b-7c3d-8e4f-5a6b7c8d9e10';

DECLARE @AdminUserId VARCHAR(50) = '018f4b5a-2b3c-7d4e-8f5a-6b7c8d9e0f1a';
DECLARE @StudentUserId VARCHAR(50) = '01A06B3F-EDF5-7201-82A2-5258B44F0EA8';

-- 1. Insert System Administrator User
IF NOT EXISTS (SELECT 1 FROM dbo.users WHERE email = 'admin@example.com' OR username = 'admin')
BEGIN
    INSERT INTO dbo.users (
        id, code, username, email, password_hash, first_name, last_name,
        role_id, is_active, is_email_verified, email_verified_at, created_at, updated_at
    )
    VALUES (
        @AdminUserId,
        'USR-0001',
        'admin',
        'admin@example.com',
        '$2y$10$dmqs2ksXAlQHrq.hIK7nQ.5DEiUAKYW3oBFDHvOgejCLQEAJX2VJ2', -- BCrypt hash for 'Password123!'
        'System',
        'Admin',
        @AdminRoleId,
        1, -- is_active
        1, -- is_email_verified
        GETDATE(),
        GETDATE(),
        GETDATE()
    );
END

-- 2. Insert Demo Student User
IF NOT EXISTS (SELECT 1 FROM dbo.users WHERE email = 'dan.le@university.edu' OR username = 'danle')
BEGIN
    INSERT INTO dbo.users (
        id, code, username, email, password_hash, first_name, last_name,
        phone_number, avatar_url, gender, address, provider, role_id,
        is_active, is_email_verified, email_verified_at, created_at, updated_at
    )
    VALUES (
        @StudentUserId,
        'STD-2026-001',
        'danle',
        'dan.le@university.edu',
        '$2y$10$dmqs2ksXAlQHrq.hIK7nQ.5DEiUAKYW3oBFDHvOgejCLQEAJX2VJ2',
        'Dan',
        'Le',
        '+84901234567',
        'https://ui-avatars.com/api/?name=Dan+Le',
        'Male',
        'Ho Chi Minh City, Vietnam',
        'system',
        @StudentRoleId,
        1,
        1,
        GETDATE(),
        GETDATE(),
        GETDATE()
    );
END
GO
