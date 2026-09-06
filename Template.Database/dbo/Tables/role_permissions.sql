CREATE TABLE [dbo].[role_permissions] (
    [id]            VARCHAR (50)  CONSTRAINT [DF_role_permissions_id] DEFAULT ([dbo].[fn_GenerateUUIDv7]()) NOT NULL,
    [code]          VARCHAR (50)  NULL,
    [role_id]       VARCHAR (50)  NULL,
    [permission_id] VARCHAR (50)  NULL,
    [assigned_at]   DATETIME2 (7) DEFAULT (getdate()) NULL,
    [assigned_by]   INT           NULL,
    [is_active]     BIT           DEFAULT ((1)) NULL,
    PRIMARY KEY CLUSTERED ([id] ASC),
    FOREIGN KEY ([permission_id]) REFERENCES [dbo].[permissions] ([id]) ON DELETE CASCADE,
    FOREIGN KEY ([role_id]) REFERENCES [dbo].[roles] ([id]) ON DELETE CASCADE
);

