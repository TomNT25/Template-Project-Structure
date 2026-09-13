using FluentValidation;

namespace Template.Application.Feature.v1.Student.DeleteStudent
{
    public class DeleteStudentValidator : AbstractValidator<DeleteStudentRequestDTO>
    {
        public DeleteStudentValidator()
        {
            RuleFor(x => x.Id)
                .NotEmpty()
                .WithMessage("Please specify a Student ID");
        }
    }
}
