using FluentValidation;
using FluentValidation.Results;
using MapsterMapper;
using Template.Domain.Contract.Repository.Enitity.v1;
using Template.Domain.Contract.RequestHandlerHub;
using Template.Domain.DTO.Entity;
using Template.Domain.Entity;

namespace Template.Application.Feature.v1.Role.CreateRole
{
    public class CreateRoleHandler : IRequestHandler<CreateRoleRequestDTO, CreateRoleResponseDTO>
    {
        private readonly IRoleRepository _roleRepository;
        private readonly IMapper _mapper;
        private readonly IValidator<CreateRoleRequestDTO> _validator;

        public CreateRoleHandler(
            IRoleRepository roleRepository,
            IMapper mapper,
            IValidator<CreateRoleRequestDTO> validator)
        {
            _roleRepository = roleRepository;
            _mapper = mapper;
            _validator = validator;
        }

        public async Task<CreateRoleResponseDTO> HandleAsync(CreateRoleRequestDTO request, CancellationToken cancellationToken)
        {
            ValidationResult results = await _validator.ValidateAsync(request, cancellationToken);
            if (!results.IsValid)
            {
                throw new ValidationException(results.Errors);
            }

            var roleEntity = new Domain.Entity.Role
            {
                Id = Guid.NewGuid().ToString(),
                Code = string.IsNullOrWhiteSpace(request.Code) ? request.Name.Replace(" ", "").ToUpper() : request.Code,
                Name = request.Name,
                Description = request.Description,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };

            await _roleRepository.AddAsync(roleEntity, cancellationToken);

            return new CreateRoleResponseDTO
            {
                Role = _mapper.Map<RoleDTO>(roleEntity)
            };
        }
    }
}
