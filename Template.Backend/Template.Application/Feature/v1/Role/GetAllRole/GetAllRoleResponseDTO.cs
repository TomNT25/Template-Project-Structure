using Template.Domain.DTO.Entity;

namespace Template.Application.Feature.v1.Role.GetAllRole
{
    public class GetAllRoleResponseDTO
    {
        public List<RoleDTO> Roles { get; set; } = new();
    }
}
