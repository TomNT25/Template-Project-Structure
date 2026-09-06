using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using Scrutor;
using Template.Domain.Entity;

namespace Template.Application;

public static class ApplicationDependencyInjection
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        var assembly = typeof(ApplicationDependencyInjection).Assembly;

        services.AddValidatorsFromAssembly(assembly);

        services.Scan(scan => scan
            .FromAssemblies(assembly)
            .AddClasses(classes => classes
                .Where(type => type.Name.EndsWith("Handler"))
                      )
            .AsImplementedInterfaces()
            .WithScopedLifetime());

        services.AddScoped<TenantProvider>();
        services.AddScoped<ITenantSetter>(sp => sp.GetRequiredService<TenantProvider>());
        services.AddScoped<ITenantGetter>(sp => sp.GetRequiredService<TenantProvider>());

        return services;
    }
}