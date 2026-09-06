using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Template.Infrastructure.Database.Interceptors;
using Template.Infrastructure.Extension;

namespace Template.Infrastructure.Database
{
    public static class TemplateDbConfiguration
    {
        public static IServiceCollection AddDatabaseConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            var dbOptions = new DatabaseOptions();
            var section = configuration.GetSection("Database");
            section.Bind(dbOptions);

            services.AddSingleton<AuditableEntitySaveChangesInterceptor>();
            services.AddSingleton<LoggingDbCommandInterceptor>();
            services.AddSingleton<LoggingDbConnectionInterceptor>();
            services.AddSingleton<LoggingDbTransactionInterceptor>();

            services.AddDbContextPool<TemplateDbContext>((serviceProvider, options) =>
            {
                options.ApplyConfiguration(dbOptions);                

                if (dbOptions.EnableSensitiveDataLogging)
                {
                    options.EnableSensitiveDataLogging();
                }

                options.AddInterceptors(
                    serviceProvider.GetRequiredService<AuditableEntitySaveChangesInterceptor>(),
                    serviceProvider.GetRequiredService<LoggingDbCommandInterceptor>(),
                    serviceProvider.GetRequiredService<LoggingDbConnectionInterceptor>(),
                    serviceProvider.GetRequiredService<LoggingDbTransactionInterceptor>()
                );
            }, dbOptions.PoolSize);

            return services;
        }
    }
}
