using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Template.API.Extensions
{
    public static class AuthorizationPolicyExtension
    {
        public static void AddAuthorizationPolicyService(this IServiceCollection services)
        {
            services.AddAuthorization(options =>
            {
                options.AddPolicy("RequireAdmin", policy =>
                    policy.RequireRole("Admin", "Administrator", "SuperAdmin"));

                options.AddPolicy("RequireUser", policy =>
                    policy.RequireAuthenticatedUser());

                options.DefaultPolicy = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .Build();
            });
        }

        public static void ConfigureAuthorization(this WebApplication app, IWebHostEnvironment env)
        {
            app.UseAuthorization();
        }
    }
}
