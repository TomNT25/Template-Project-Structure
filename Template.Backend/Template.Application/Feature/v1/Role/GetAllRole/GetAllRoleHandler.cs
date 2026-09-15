using FluentValidation;
using FluentValidation.Results;
using System.Linq.Expressions;
using Template.Domain.Contract.Repository.Enitity.v1;
using Template.Domain.Contract.RequestHandlerHub;
using Template.Domain.DTO.Entity;

namespace Template.Application.Feature.v1.Role.GetAllRole
{
    public class GetAllRoleHandler : IRequestHandler<GetAllRoleRequestDTO, GetAllRoleResponseDTO>
    {
        private readonly IRoleRepository _roleRepository;
        private readonly IValidator<GetAllRoleRequestDTO> _validator;

        public GetAllRoleHandler(
            IRoleRepository roleRepository,
            IValidator<GetAllRoleRequestDTO> validator)
        {
            _roleRepository = roleRepository;
            _validator = validator;
        }

        public async Task<GetAllRoleResponseDTO> HandleAsync(GetAllRoleRequestDTO request, CancellationToken cancellationToken)
        {
            ValidationResult results = await _validator.ValidateAsync(request, cancellationToken);

            if (!results.IsValid)
            {
                throw new ValidationException(results.Errors);
            }

            Expression<Func<Domain.Entity.Role, bool>>? filter = string.IsNullOrWhiteSpace(request.SearchTerm)
                ? null
                : r => (r.Name != null && r.Name.Contains(request.SearchTerm)) || (r.Code != null && r.Code.Contains(request.SearchTerm));

            var pagedResult = await _roleRepository.GetPageNumberPaginationAsync<RoleDTO>(
                request,
                filter,
                cancellationToken);

            return new GetAllRoleResponseDTO
            {
                Items = pagedResult.Items,
                PageNumber = pagedResult.PageNumber,
                PageSize = pagedResult.PageSize,
                TotalRecords = pagedResult.TotalRecords,
                TotalPages = pagedResult.TotalPages,
                HasNextPage = pagedResult.HasNextPage,
                HasPreviousPage = pagedResult.HasPreviousPage
            };
        }
    }
}
