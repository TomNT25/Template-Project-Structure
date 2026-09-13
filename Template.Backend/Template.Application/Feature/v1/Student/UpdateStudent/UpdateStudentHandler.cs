using FluentValidation;
using FluentValidation.Results;
using Template.Domain.Contract.Repository.Enitity.v1;
using Template.Domain.Contract.RequestHandlerHub;

namespace Template.Application.Feature.v1.Student.UpdateStudent
{
    public class UpdateStudentHandler : IRequestHandler<UpdateStudentRequestDTO, UpdateStudentResponseDTO>
    {
        private readonly IStudentRepository _studentRepository;
        private readonly IValidator<UpdateStudentRequestDTO> _validator;

        public UpdateStudentHandler(
            IStudentRepository studentRepository,
            IValidator<UpdateStudentRequestDTO> validator)
        {
            _studentRepository = studentRepository;
            _validator = validator;
        }

        public async Task<UpdateStudentResponseDTO> HandleAsync(UpdateStudentRequestDTO request, CancellationToken cancellationToken)
        {
            ValidationResult results = await _validator.ValidateAsync(request, cancellationToken);

            if (!results.IsValid)
            {
                throw new ValidationException(results.Errors);
            }

            var student = await _studentRepository.GetByIdAsync(request.Id, cancellationToken);

            if (student is null)
            {
                throw new KeyNotFoundException($"Student with ID '{request.Id}' was not found.");
            }

            student.Name = request.UserName;

            await _studentRepository.UpdateAsync(student, cancellationToken);

            return new UpdateStudentResponseDTO
            {
                Success = true
            };
        }
    }
}
