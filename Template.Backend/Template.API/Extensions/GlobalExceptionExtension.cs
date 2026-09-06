using FluentValidation;
using Microsoft.AspNetCore.Diagnostics;
using System.Net.Mime;
using System.Text.Json;
using Template.Domain.DTO;

namespace Template.API.Extensions
{
    public class GlobalExceptionExtension : IExceptionHandler
    {
        private readonly ILogger<GlobalExceptionExtension> _logger;
        private readonly IHostEnvironment _env;

        private static readonly JsonSerializerOptions _jsonOptions = new()
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };

        public GlobalExceptionExtension(ILogger<GlobalExceptionExtension> logger, IHostEnvironment env)
        {
            _logger = logger;
            _env = env;
        }

        public async ValueTask<bool> TryHandleAsync(
            HttpContext httpContext,
            Exception exception,
            CancellationToken cancellationToken)
        {
            _logger.LogError(exception, "An unhandled exception occurred: {Message}", exception.Message);

            httpContext.Response.ContentType = MediaTypeNames.Application.Json;

            var (statusCode, message, errors) = exception switch
            {
                ValidationException valEx => (
                    StatusCodes.Status400BadRequest,
                    "Validation failed",
                    valEx.Errors.Select(e => e.ErrorMessage).ToList()
                ),
                UnauthorizedAccessException => (
                    StatusCodes.Status401Unauthorized,
                    exception.Message,
                    null
                ),
                KeyNotFoundException => (
                    StatusCodes.Status404NotFound,
                    exception.Message,
                    null
                ),
                ArgumentException or InvalidOperationException => (
                    StatusCodes.Status400BadRequest,
                    exception.Message,
                    null
                ),
                _ => (
                    StatusCodes.Status500InternalServerError,
                    _env.IsDevelopment() ? exception.Message : "An unexpected error occurred.",
                    null
                )
            };

            httpContext.Response.StatusCode = statusCode;

            var response = BaseAPIResponse<object>.Failure(message, statusCode, errors);

            await JsonSerializer.SerializeAsync(httpContext.Response.Body, response, _jsonOptions, cancellationToken);

            return true;
        }
    }
}