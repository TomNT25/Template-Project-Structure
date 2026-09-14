using FluentValidation;
using FluentValidation.Results;
using MapsterMapper;
using Template.Domain.Contract.Repository.Enitity.v1;
using Template.Domain.Contract.RequestHandlerHub;
using Template.Domain.DTO.Entity;
using Template.Domain.Entity;

namespace Template.Application.Feature.v1.Permission.CreatePermission
{
    public class CreatePermissionHandler : IRequestHandler<CreatePermissionRequestDTO, CreatePermissionResponseDTO>
    {
        private readonly IPermissionRepository _permissionRepository;
        private readonly IMapper _mapper;
        private readonly IValidator<CreatePermissionRequestDTO> _validator;

        public CreatePermissionHandler(
            IPermissionRepository permissionRepository,
            IMapper mapper,
            IValidator<CreatePermissionRequestDTO> validator)
        {
            _permissionRepository = permissionRepository;
            _mapper = mapper;
            _validator = validator;
        }

        public async Task<CreatePermissionResponseDTO> HandleAsync(CreatePermissionRequestDTO request, CancellationToken cancellationToken)
        {
            ValidationResult results = await _validator.ValidateAsync(request, cancellationToken);
            if (!results.IsValid)
            {
                throw new ValidationException(results.Errors);
            }

            var entity = new Domain.Entity.Permission
            {
                Id = Guid.NewGuid().ToString(),
                Code = string.IsNullOrWhiteSpace(request.Code) ? $"{request.Resource}.{request.Action}".ToUpper() : request.Code,
                Name = request.Name,
                Resource = request.Resource,
                Action = request.Action,
                Description = request.Description,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };

            await _permissionRepository.AddAsync(entity, cancellationToken);

            return new CreatePermissionResponseDTO
            {
                Permission = _mapper.Map<PermissionDTO>(entity)
            };
        }
    }
}
