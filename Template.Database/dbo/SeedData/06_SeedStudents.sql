-- Seed Data: dbo.Students

IF NOT EXISTS (SELECT 1 FROM dbo.Students WHERE Name = 'Alex Johnson')
BEGIN
    INSERT INTO dbo.Students (Name) VALUES ('Alex Johnson');
END

IF NOT EXISTS (SELECT 1 FROM dbo.Students WHERE Name = 'Sophia Martinez')
BEGIN
    INSERT INTO dbo.Students (Name) VALUES ('Sophia Martinez');
END

IF NOT EXISTS (SELECT 1 FROM dbo.Students WHERE Name = 'Liam Nguyen')
BEGIN
    INSERT INTO dbo.Students (Name) VALUES ('Liam Nguyen');
END

IF NOT EXISTS (SELECT 1 FROM dbo.Students WHERE Name = 'Emma Davis')
BEGIN
    INSERT INTO dbo.Students (Name) VALUES ('Emma Davis');
END

IF NOT EXISTS (SELECT 1 FROM dbo.Students WHERE Name = 'David Smith')
BEGIN
    INSERT INTO dbo.Students (Name) VALUES ('David Smith');
END
GO
