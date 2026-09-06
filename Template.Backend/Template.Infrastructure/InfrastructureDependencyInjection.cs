using Mapster;
using MapsterMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using Template.Domain.Contract.Cache;
using Template.Domain.Contract.RequestHandlerHub;
using Template.Helper.Constant;
using Template.Infrastructure.Database;
using Template.Infrastructure.RequestHandlerHub;
using Template.Infrastructure.Util.Cache;

namespace Template.Infrastructure;

public static class InfrastructureDependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        var assembly = typeof(InfrastructureDependencyInjection).Assembly;

        services.AddTransient<IDispatcher, NativeDispatcher>();

        services.Scan(scan => scan
            .FromAssemblies(assembly)
            .AddClasses(classes => classes
                .Where(type => type.Name.Contains("Repository") || 
                               type.Name.Contains("Service")))
            .AsImplementedInterfaces()
            .WithScopedLifetime());

        // Redis Configuration
        var redisConn = configuration["Redis:ConnectionString"];
        if (!string.IsNullOrWhiteSpace(redisConn))
        {
            services.AddStackExchangeRedisCache(options =>
            {
                options.Configuration = redisConn;
                options.InstanceName = configuration["Redis:InstanceName"] ?? "TemplateApp:";
            });
        }

        services.AddScoped<ICacheService, RedisCacheService>();

        services.AddDatabaseConfiguration(configuration);

        services.AddScoped(sp => new DatabaseConfiguration(DatabaseConfigurationConstant.SQL_SERVER_CONNECTION_STRING));

        var config = TypeAdapterConfig.GlobalSettings;
        var applicationAssembly = Assembly.Load("Template.Application");
        config.Scan(assembly, applicationAssembly);
        services.AddSingleton(config);
        services.AddScoped<IMapper, ServiceMapper>();

        var healthChecks = services.AddHealthChecks().AddDbContextCheck<TemplateDbContext>();
        if (!string.IsNullOrWhiteSpace(redisConn))
        {
            healthChecks.AddRedis(redisConn, name: "redis_check");
        }

        return services;
    }
}