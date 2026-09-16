/*
Post-Deployment Script Template
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.
 Use SQLCMD syntax to include a file in the post-deployment script.
 Example:      :r .\filepath.file
--------------------------------------------------------------------------------------
*/

PRINT 'Executing Post-Deployment Seed Scripts...';

:r .\SeedData\01_SeedRoles.sql
:r .\SeedData\02_SeedUsers.sql
:r .\SeedData\03_SeedPermissions.sql
:r .\SeedData\04_SeedRolePermissions.sql
:r .\SeedData\05_SeedUserPermissions.sql
:r .\SeedData\06_SeedStudents.sql
:r .\SeedData\07_SeedUserTokens.sql

PRINT 'Post-Deployment Seed Data complete.';
GO
