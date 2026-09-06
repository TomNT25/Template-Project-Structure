using FluentValidation;
using FluentValidation.Results;
using Mapster;
using MapsterMapper;
using Template.Domain.Contract.Repository.Enitity.v1;
using Template.Domain.Contract.RequestHandlerHub;

namespace Template.Application.Feature.v1.Student.AddStudent
{
    public class AddStudentHandler : IRequestHandler<AddStudentRequestDTO, AddStudentResponseDTO>
    {
        private readonly IStudentRepository _studentRepository;
        private readonly IMapper _mapper;
        private readonly IValidator<AddStudentRequestDTO> _validator;

        public AddStudentHandler(
            IStudentRepository studentRepository,
            IMapper mapper,
            IValidator<AddStudentRequestDTO> validator)
        {
            _studentRepository = studentRepository;
            _mapper = mapper;
            _validator = validator;
        }

        public async Task<AddStudentResponseDTO> HandleAsync(AddStudentRequestDTO request, CancellationToken cancellationToken)
        {
            ValidationResult results = await _validator.ValidateAsync(request, cancellationToken);

            if (!results.IsValid)
            {
                throw new ValidationException(results.Errors);
            }

            await _studentRepository.AddAsync(_mapper.Map<Domain.Entity.Student>(request), cancellationToken);

            return new AddStudentResponseDTO()
            {
                Success = true
            };
        }
    }
}
