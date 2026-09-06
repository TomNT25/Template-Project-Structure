using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace Template.Infrastructure.Util.Jwt
{
    public class JwtOptions
    {
        public string Secret { get; set; } = string.Empty;
        public string Issuer { get; set; } = string.Empty;
        public string Audience { get; set; } = string.Empty;
        public int TokenExpireMinutes { get; set; }
        public int RefreshTokenExpireDays { get; set; }
    }

    public static class ClaimType
    {
        #region claim types
        public static readonly string Realm = "realm";
        public static readonly string Scope = "scope";
        public static readonly string Issuer = "iss";
        public static readonly string Audience = "aud";
        public static readonly string CustomerId = "customer_id";
        public static readonly string ClientId = "client_id";
        public static readonly string UserName = ClaimTypes.Upn;
        public static readonly string Language = "language";
        public static readonly string DisplayName = ClaimTypes.Name;
        public static readonly string Email = ClaimTypes.Email;
        public static readonly string Organization = "organization";
        public static readonly string UserObjectId = "uid";
        public static readonly string Office365TenantId = "office365TenantId";
        public static readonly string UserGroups = "user_groups";
        public static readonly string CloudUserId = "objectid";
        public static readonly string Role = ClaimTypes.Role;
        #endregion
    }
}
