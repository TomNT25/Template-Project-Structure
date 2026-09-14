using Template.Domain.Contract.RequestHandlerHub;

namespace Template.Application.Feature.v1.Role.DeleteRole
{
    public class DeleteRoleRequestDTO : IRequest<DeleteRoleResponseDTO>
    {
        public string Id { get; set; } = string.Empty;
    }
}
