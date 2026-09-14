using Mapster;
using Template.Domain.DTO.Entity;
using Template.Domain.Entity;

namespace Template.Application.MapperProfile
{
    public class PermissionMapperProfile : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<Permission, PermissionDTO>();
            config.NewConfig<List<Permission>, List<PermissionDTO>>();
        }
    }
}