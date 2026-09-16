using Template.Domain.DTO;
using Template.Domain.Contract.RequestHandlerHub;

namespace Template.Application.Feature.v1.Student.GetAllStudent
{
    public class GetAllStudentRequestDTO : PageNumberPaginationRequest, IRequest<GetAllStudentResponseDTO>
    {
        public string? Department { get; set; }
        public string? Status { get; set; }
    }
}

