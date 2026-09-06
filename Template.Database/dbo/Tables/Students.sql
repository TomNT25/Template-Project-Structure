CREATE TABLE [dbo].[Students] (
    [Name] VARCHAR (255) NOT NULL,
    [ID]   VARCHAR (50)  DEFAULT ([dbo].[fn_GenerateUUIDv7]()) NOT NULL,
    CONSTRAINT [PK_Students] PRIMARY KEY CLUSTERED ([ID] ASC)
);

