using Microsoft.AspNetCore.Cors.Infrastructure;
using Template.Helper.Constant;

namespace Template.API.Extensions
{
    public static class CorsExtension
    {
        public static void AddCorsService(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.AllowAnyMethod()
                           .SetPreflightMaxAge(TimeSpan.FromDays(1.0))
                           .SetIsOriginAllowed((string origin) =>
                           {
                               if (string.IsNullOrEmpty(origin))
                                   return false;

                               if (origin.StartsWith(CorsPolicyConstants.HttpLocalhostPrefix, StringComparison.OrdinalIgnoreCase) ||
                                   origin.StartsWith(CorsPolicyConstants.HttpsLocalhostPrefix, StringComparison.OrdinalIgnoreCase) ||
                                   origin.Equals(CorsPolicyConstants.NullOrigin, StringComparison.OrdinalIgnoreCase))
                               {
                                   return true;
                               }

                               return (origin.EndsWith(CorsPolicyConstants.AvepointDomainSuffix, StringComparison.OrdinalIgnoreCase) ||
                                       origin.EndsWith(CorsPolicyConstants.SharepointGuildDomainSuffix, StringComparison.OrdinalIgnoreCase)) &&
                                      Uri.TryCreate(origin, UriKind.Absolute, out Uri? _);
                           })
                           .AllowAnyHeader()
                           .AllowCredentials();
                });
            });
        }

        public static void ConfigureCors(this WebApplication app, IWebHostEnvironment env)
        {
            app.UseCors();
        }
    }
}
