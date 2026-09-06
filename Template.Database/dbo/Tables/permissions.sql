CREATE TABLE [dbo].[permissions] (
    [id]          VARCHAR (50)  CONSTRAINT [DF_permissions_id] DEFAULT ([dbo].[fn_GenerateUUIDv7]()) NOT NULL,
    [code]        VARCHAR (50)  NULL,
    [name]        VARCHAR (100) NOT NULL,
    [description] VARCHAR (255) NULL,
    [resource]    VARCHAR (50)  NOT NULL,
    [action]      VARCHAR (50)  NOT NULL,
    [is_active]   BIT           DEFAULT ((1)) NULL,
    [created_at]  DATETIME2 (7) DEFAULT (getdate()) NULL,
    [updated_at]  DATETIME2 (7) DEFAULT (getdate()) NULL,
    [created_by]  INT           NULL,
    [updated_by]  INT           NULL,
    PRIMARY KEY CLUSTERED ([id] ASC),
    UNIQUE NONCLUSTERED ([name] ASC)
);

