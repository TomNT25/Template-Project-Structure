using FluentValidation;

namespace Template.Application.Feature.v1.Student.UpdateStudent
{
    public class UpdateStudentValidator : AbstractValidator<UpdateStudentRequestDTO>
    {
        public UpdateStudentValidator()
        {
            RuleFor(x => x.Id)
                .NotEmpty()
                .WithMessage("Please specify a Student ID");

            RuleFor(x => x.UserName)
                .NotEmpty()
                .WithMessage("Please specify a User name");
        }
    }
}
