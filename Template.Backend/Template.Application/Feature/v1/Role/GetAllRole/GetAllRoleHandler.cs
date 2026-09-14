using FluentValidation;
using MapsterMapper;
using Template.Domain.Contract.Repository.Enitity.v1;
using Template.Domain.Contract.RequestHandlerHub;
using Template.Domain.DTO.Entity;

namespace Template.Application.Feature.v1.Role.GetAllRole
{
    public class GetAllRoleHandler : IRequestHandler<GetAllRoleRequestDTO, GetAllRoleResponseDTO>
    {
        private readonly IRoleRepository _roleRepository;
        private readonly IMapper _mapper;

        public GetAllRoleHandler(IRoleRepository roleRepository, IMapper mapper)
        {
            _roleRepository = roleRepository;
            _mapper = mapper;
        }

        public async Task<GetAllRoleResponseDTO> HandleAsync(GetAllRoleRequestDTO request, CancellationToken cancellationToken)
        {
            var roles = await _roleRepository.GetAllAsync(cancellationToken);
            return new GetAllRoleResponseDTO
            {
                Roles = _mapper.Map<List<RoleDTO>>(roles)
            };
        }
    }
}
