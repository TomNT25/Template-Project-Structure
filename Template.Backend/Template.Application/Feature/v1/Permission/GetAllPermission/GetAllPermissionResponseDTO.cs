using Template.Domain.DTO.Entity;

namespace Template.Application.Feature.v1.Permission.GetAllPermission
{
    public class GetAllPermissionResponseDTO
    {
        public List<PermissionDTO> Permissions { get; set; } = new();
    }
}
