using FluentValidation;

namespace Template.Application.Feature.v1.Student.AddStudent
{
    public class AddStudentValidator : AbstractValidator<AddStudentRequestDTO>
    {
        public AddStudentValidator()
        {
            RuleFor(x => x.UserName)
                .NotEmpty()
                .WithMessage("Please specify a User name");
        }
    }
}
