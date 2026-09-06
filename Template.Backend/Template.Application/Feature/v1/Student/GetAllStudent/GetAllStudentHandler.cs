using FluentValidation;
using FluentValidation.Results;
using System.Linq.Expressions;
using Template.Domain.Contract.Repository.Enitity.v1;
using Template.Domain.Contract.RequestHandlerHub;
using Template.Domain.DTO.Entity;

namespace Template.Application.Feature.v1.Student.GetAllStudent
{
    public class GetAllStudentHandler : IRequestHandler<GetAllStudentRequestDTO, GetAllStudentResponseDTO>
    {
        private readonly IStudentRepository _StudentRepository;
        private readonly IValidator<GetAllStudentRequestDTO> _validator;

        public GetAllStudentHandler(
            IStudentRepository StudentRepository,
            IValidator<GetAllStudentRequestDTO> validator)
        {
            _StudentRepository = StudentRepository;
            _validator = validator;
        }

        public async Task<GetAllStudentResponseDTO> HandleAsync(GetAllStudentRequestDTO request, CancellationToken cancellationToken)
        {
            ValidationResult results = await _validator.ValidateAsync(request, cancellationToken);

            if (!results.IsValid)
            {
                throw new ValidationException(results.Errors);
            }

            Expression<Func<Domain.Entity.Student, bool>>? filter = string.IsNullOrWhiteSpace(request.SearchTerm)
                ? null
                : s => s.Name.Contains(request.SearchTerm);

            var pagedResult = await _StudentRepository.GetPagedAsync<StudentDTO>(
                request,
                filter,
                cancellationToken);

            return new GetAllStudentResponseDTO
            {
                Items = pagedResult.Items,
                NextCursor = pagedResult.NextCursor,
                HasNextPage = pagedResult.HasNextPage,
                PageSize = pagedResult.PageSize
            };
        }
    }
}
