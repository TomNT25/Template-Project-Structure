using Template.Domain.DTO;
using Template.Domain.Contract.RequestHandlerHub;

namespace Template.Application.Feature.v1.Student.GetAllStudent
{
    public class GetAllStudentRequestDTO : CursorPaginationRequest, IRequest<GetAllStudentResponseDTO>
    {
    }
}
