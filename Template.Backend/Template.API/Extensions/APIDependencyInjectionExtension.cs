namespace Template.API.Extensions
{
    public static class APIDependencyInjectionExtension
    {
        public static void AddAPIServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddApiVersioningService();

            services.AddControllers();

            services.AddOpenApi();

            services.AddSwaggerGenService();

            services.AddHealthChecks();

            services.AddAuthenticationPolicyService(configuration);

            services.AddAuthorizationPolicyService();

            services.AddCorsService();

            services.AddExceptionHandler<GlobalExceptionExtension>();

            services.AddProblemDetails();

            services.AddMemoryCache();
        }
    }
}
