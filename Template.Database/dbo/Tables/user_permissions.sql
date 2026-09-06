CREATE TABLE [dbo].[user_permissions] (
    [id]            VARCHAR (50)  CONSTRAINT [DF_user_permissions_id] DEFAULT ([dbo].[fn_GenerateUUIDv7]()) NOT NULL,
    [code]          VARCHAR (50)  NULL,
    [user_id]       VARCHAR (50)  NULL,
    [permission_id] VARCHAR (50)  NULL,
    [assigned_at]   DATETIME2 (7) DEFAULT (getdate()) NULL,
    [assigned_by]   INT           NULL,
    [is_active]     BIT           DEFAULT ((1)) NULL,
    PRIMARY KEY CLUSTERED ([id] ASC),
    FOREIGN KEY ([permission_id]) REFERENCES [dbo].[permissions] ([id]) ON DELETE CASCADE,
    FOREIGN KEY ([user_id]) REFERENCES [dbo].[users] ([id]) ON DELETE CASCADE
);

