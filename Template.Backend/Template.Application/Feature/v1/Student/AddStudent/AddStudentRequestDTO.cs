using Template.Domain.Contract.RequestHandlerHub;

namespace Template.Application.Feature.v1.Student.AddStudent
{
    public class AddStudentRequestDTO : IRequest<AddStudentResponseDTO>
    {
        public string UserName { get; set; } = string.Empty;
    }
}
