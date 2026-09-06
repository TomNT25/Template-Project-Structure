using Microsoft.AspNetCore.Cors.Infrastructure;

namespace Template.API.Extensions
{
    public static class CorsExtension
    {
        public static void AddCorsService(this IServiceCollection services)
        {
            services.AddCors(delegate (CorsOptions options)
            {
                options.AddDefaultPolicy(delegate (CorsPolicyBuilder builder)
                {
                    builder.AllowAnyMethod()
                            .SetPreflightMaxAge(TimeSpan.FromDays(1.0))
                            .SetIsOriginAllowed((string origin) =>
                            {
                                // Allow localhost for local development/debugging
                                if (string.IsNullOrEmpty(origin))
                                    return false;

                                if (origin.StartsWith("http://localhost", StringComparison.OrdinalIgnoreCase) ||
                                    origin.StartsWith("https://localhost", StringComparison.OrdinalIgnoreCase) ||
                                    origin.Equals("null", StringComparison.OrdinalIgnoreCase))
                                {
                                    return true;
                                }

                                // Production: only allow specific domains over HTTPS
                                return (origin.EndsWith(".avepointonlineservices.com", StringComparison.OrdinalIgnoreCase) ||
                                        origin.EndsWith(".sharepointguild.com", StringComparison.OrdinalIgnoreCase)) &&
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
