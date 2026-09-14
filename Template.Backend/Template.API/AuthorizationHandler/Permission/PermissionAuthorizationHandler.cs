using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Template.Application.Feature.v1.User.GetUserPermission;
using Template.Domain.Contract.RequestHandlerHub;
using Template.Infrastructure.Util.Jwt;

namespace Template.API.AuthorizationHandler.Permission;

public class PermissionAuthorizationHandler : AuthorizationHandler<PermissionRequirement>
{
    private readonly IDispatcher _dispatcher;

    public PermissionAuthorizationHandler(IDispatcher dispatcher)
    {
        _dispatcher = dispatcher;
    }

    protected override async Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        PermissionRequirement requirement)
    {
        var userId = context.User.FindFirstValue(ClaimType.UserObjectId);

        if (string.IsNullOrEmpty(userId))
        {
            return; // Unauthorized
        }

        var request = new GetUserPermissionRequestDTO() { UserID = userId };

        var userPermissions = await _dispatcher.DispatchAsync<GetUserPermissionResponseDTO>(request);

        if (userPermissions?.Permissions != null &&
            userPermissions.Permissions.Any(x => x.Name.Equals(requirement.Permission, StringComparison.OrdinalIgnoreCase)))
        {
            context.Succeed(requirement);
        }
    }
}