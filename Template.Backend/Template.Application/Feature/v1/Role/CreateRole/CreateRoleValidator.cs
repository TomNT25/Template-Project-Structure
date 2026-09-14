using FluentValidation;

namespace Template.Application.Feature.v1.Role.CreateRole
{
    public class CreateRoleValidator : AbstractValidator<CreateRoleRequestDTO>
    {
        public CreateRoleValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .WithMessage("Role Name is required.");
        }
    }
}
