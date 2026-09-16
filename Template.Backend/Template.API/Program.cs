using Serilog;
using Template.API.Environment;
using Template.API.Extensions;
using Template.API.Middlewares;
using Template.Application;
using Template.Infrastructure;

namespace Template.API;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Host.UseSerilog((context, services, configuration) =>
        {
            configuration.ReadFrom.Configuration(context.Configuration);
        });

        builder.Services.AddAPIServices(builder.Configuration);
        builder.Services.AddApplicationServices();
        builder.Services.AddInfrastructureServices(builder.Configuration);

        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.UseDevelopmentSwagger();
        }

        app.ConfigureMiddlewarePipeline(builder.Environment);        

        app.Run();
    }
}