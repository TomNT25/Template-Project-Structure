using Template.Domain.Contract.RequestHandlerHub;
using Template.Domain.DTO;

namespace Template.Application.Feature.v1.Permission.GetAllPermission
{
    public class GetAllPermissionRequestDTO : PageNumberPaginationRequest, IRequest<GetAllPermissionResponseDTO>
    {
    }
}
