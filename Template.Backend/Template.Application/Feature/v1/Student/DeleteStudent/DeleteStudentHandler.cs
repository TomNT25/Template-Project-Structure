using FluentValidation;
using FluentValidation.Results;
using Template.Domain.Contract.Repository.Enitity.v1;
using Template.Domain.Contract.RequestHandlerHub;

namespace Template.Application.Feature.v1.Student.DeleteStudent
{
    public class DeleteStudentHandler : IRequestHandler<DeleteStudentRequestDTO, DeleteStudentResponseDTO>
    {
        private readonly IStudentRepository _studentRepository;
        private readonly IValidator<DeleteStudentRequestDTO> _validator;

        public DeleteStudentHandler(
            IStudentRepository studentRepository,
            IValidator<DeleteStudentRequestDTO> validator)
        {
            _studentRepository = studentRepository;
            _validator = validator;
        }

        public async Task<DeleteStudentResponseDTO> HandleAsync(DeleteStudentRequestDTO request, CancellationToken cancellationToken)
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

            await _studentRepository.DeleteAsync(student, cancellationToken);

            return new DeleteStudentResponseDTO
            {
                Success = true
            };
        }
    }
}
