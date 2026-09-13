using Template.Domain.Contract.RequestHandlerHub;

namespace Template.Application.Feature.v1.Student.DeleteStudent
{
    public class DeleteStudentRequestDTO : IRequest<DeleteStudentResponseDTO>
    {
        public string Id { get; set; } = string.Empty;
    }
}
