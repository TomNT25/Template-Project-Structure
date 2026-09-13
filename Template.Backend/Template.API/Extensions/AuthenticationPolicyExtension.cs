using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using Template.Helper.Constant;

namespace Template.API.Extensions
{
    public static class AuthenticationPolicyExtension
    {
        public static void AddAuthenticationPolicyService(this IServiceCollection services, IConfiguration configuration)
        {
            var secretKey = configuration[AuthConstants.JwtConfig.SecretKeyPath]
                ?? throw new InvalidOperationException(ExceptionConstants.MissingJwtSecretMessage);
            var issuer = configuration[AuthConstants.JwtConfig.IssuerPath] ?? AuthConstants.JwtConfig.DefaultIssuer;
            var audience = configuration[AuthConstants.JwtConfig.AudiencePath] ?? AuthConstants.JwtConfig.DefaultAudience;

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = securityKey,
                    ValidateIssuer = true,
                    ValidIssuer = issuer,
                    ValidateAudience = true,
                    ValidAudience = audience,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero,
                    RoleClaimType = ClaimTypes.Role,
                    NameClaimType = ClaimTypes.Upn
                };

                options.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = context =>
                    {
                        if (context.Exception is SecurityTokenExpiredException)
                        {
                            context.Response.Headers.Append(AuthConstants.Headers.TokenExpired, AuthConstants.Headers.ValueTrue);
                        }
                        return Task.CompletedTask;
                    }
                };
            });
        }

        public static void ConfigureAuthentication(this WebApplication app, IWebHostEnvironment env)
        {
            app.UseAuthentication();
        }
    }
}
