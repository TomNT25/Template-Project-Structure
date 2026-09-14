using MapsterMapper;
using Template.Domain.Contract.Repository.Enitity.v1;
using Template.Domain.Contract.RequestHandlerHub;
using Template.Domain.DTO.Entity;

namespace Template.Application.Feature.v1.Permission.GetAllPermission
{
    public class GetAllPermissionHandler : IRequestHandler<GetAllPermissionRequestDTO, GetAllPermissionResponseDTO>
    {
        private readonly IPermissionRepository _permissionRepository;
        private readonly IMapper _mapper;

        public GetAllPermissionHandler(IPermissionRepository permissionRepository, IMapper mapper)
        {
            _permissionRepository = permissionRepository;
            _mapper = mapper;
        }

        public async Task<GetAllPermissionResponseDTO> HandleAsync(GetAllPermissionRequestDTO request, CancellationToken cancellationToken)
        {
            var permissions = await _permissionRepository.GetAllPermissionsAsync(cancellationToken);
            return new GetAllPermissionResponseDTO
            {
                Permissions = _mapper.Map<List<PermissionDTO>>(permissions)
            };
        }
    }
}
