CREATE TABLE [dbo].[user_tokens] (
    [id]                VARCHAR (50)  CONSTRAINT [DF_user_tokens_id] DEFAULT ([dbo].[fn_GenerateUUIDv7]()) NOT NULL,
    [code]              VARCHAR (50)  NULL,
    [user_id]           VARCHAR (50)  NULL,
    [refresh_token]     VARCHAR (MAX) NOT NULL,
    [issued_at]         DATETIME2 (7) DEFAULT (getdate()) NULL,
    [expires_at]        DATETIME2 (7) DEFAULT (getdate()) NULL,
    [revoked_at]        DATETIME2 (7) NULL,
    [replaced_by_token] VARCHAR (MAX) NULL,
    [is_active]         BIT           DEFAULT ((1)) NULL,
    [jti]               VARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([id] ASC),
    FOREIGN KEY ([user_id]) REFERENCES [dbo].[users] ([id]) ON DELETE CASCADE
);

