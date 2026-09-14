using FluentValidation;
using FluentValidation.Results;
using MapsterMapper;
using Template.Domain.Contract.Repository.Enitity.v1;
using Template.Domain.Contract.RequestHandlerHub;
using Template.Domain.DTO.Entity;

namespace Template.Application.Feature.v1.Permission.UpdatePermission
{
    public class UpdatePermissionHandler : IRequestHandler<UpdatePermissionRequestDTO, UpdatePermissionResponseDTO>
    {
        private readonly IPermissionRepository _permissionRepository;
        private readonly IMapper _mapper;
        private readonly IValidator<UpdatePermissionRequestDTO> _validator;

        public UpdatePermissionHandler(
            IPermissionRepository permissionRepository,
            IMapper mapper,
            IValidator<UpdatePermissionRequestDTO> validator)
        {
            _permissionRepository = permissionRepository;
            _mapper = mapper;
            _validator = validator;
        }

        public async Task<UpdatePermissionResponseDTO> HandleAsync(UpdatePermissionRequestDTO request, CancellationToken cancellationToken)
        {
            ValidationResult results = await _validator.ValidateAsync(request, cancellationToken);
            if (!results.IsValid)
            {
                throw new ValidationException(results.Errors);
            }

            var entity = await _permissionRepository.GetByIdAsync(request.Id, cancellationToken);
            if (entity == null)
            {
                throw new KeyNotFoundException($"Permission with ID {request.Id} not found.");
            }

            entity.Name = request.Name;
            entity.Resource = request.Resource;
            entity.Action = request.Action;
            entity.Description = request.Description;
            entity.IsActive = request.IsActive;
            entity.UpdatedAt = DateTime.UtcNow;

            await _permissionRepository.UpdateAsync(entity, cancellationToken);

            return new UpdatePermissionResponseDTO
            {
                Permission = _mapper.Map<PermissionDTO>(entity)
            };
        }
    }
}
