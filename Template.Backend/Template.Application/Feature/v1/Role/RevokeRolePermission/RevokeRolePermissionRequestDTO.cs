using Template.Domain.Contract.RequestHandlerHub;

namespace Template.Application.Feature.v1.Role.RevokeRolePermission
{
    public class RevokeRolePermissionRequestDTO : IRequest<RevokeRolePermissionResponseDTO>
    {
        public string RoleId { get; set; } = string.Empty;
        public List<string> PermissionIds { get; set; } = new();
    }
}
