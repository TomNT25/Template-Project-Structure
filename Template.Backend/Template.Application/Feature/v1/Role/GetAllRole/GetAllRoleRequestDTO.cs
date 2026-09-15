using Template.Domain.Contract.RequestHandlerHub;
using Template.Domain.DTO;

namespace Template.Application.Feature.v1.Role.GetAllRole
{
    public class GetAllRoleRequestDTO : PageNumberPaginationRequest, IRequest<GetAllRoleResponseDTO>
    {
    }
}
