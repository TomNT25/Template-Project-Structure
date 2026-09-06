using Microsoft.OpenApi;
using System.Reflection;

namespace Template.API.Extensions
{
    public static class SwaggerGenExtension
    {
        public static void AddSwaggerGenService(this IServiceCollection services)
        {
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Template API",
                    Version = "v1",
                    Description = "Clean Architecture .NET Web API with JWT Authentication"
                });

                var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFilename);
                if (File.Exists(xmlPath))
                {
                    options.IncludeXmlComments(xmlPath);
                }

                options.CustomSchemaIds(type =>
                {
                    if (type.IsGenericType)
                    {
                        var genericArguments = type.GetGenericArguments().Select(t => t.Name);
                        var baseName = type.Name.Split('`')[0];
                        return $"{baseName}Of{string.Join("And", genericArguments)}";
                    }

                    return type.Name;
                });

                var securityScheme = new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "Enter JWT Bearer token. Example: 'Bearer {your_token}'"
                };

                options.AddSecurityDefinition("Bearer", securityScheme);

                options.AddSecurityRequirement(_ => new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecuritySchemeReference("Bearer"),
                        new List<string>()
                    }
                });
            });
        }
    }
}
