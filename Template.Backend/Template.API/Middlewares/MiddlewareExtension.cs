using Template.API.Extensions;
using Template.API.Middlewares.CustomMiddlewares;

namespace Template.API.Middlewares
{
    public static class MiddlewareExtension
    {
        public static void ConfigureMiddlewarePipeline(this WebApplication app, IWebHostEnvironment env)
        {
            // Diagnostics & Error Handling
            app.UseMiddleware<RequestLoggingMiddleware>();
            app.UseExceptionHandler();
            app.UseRequestLocalization();
            app.UseDeveloperExceptionPage();

            // Security & Redirection
            app.UseHsts();
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.ConfigureCors(env);

            // Routing & Authorization
            app.ConfigureAuthentication(env);
            app.ConfigureAuthorization(env);

            // Endpoints
            app.MapHealthChecks("/health");
            app.MapControllers();
        }
    }
}
