using Template.Domain.Contract.RequestHandlerHub;

namespace Template.Application.Feature.v1.Student.UpdateStudent
{
    public class UpdateStudentRequestDTO : IRequest<UpdateStudentResponseDTO>
    {
        public string Id { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
    }
}
