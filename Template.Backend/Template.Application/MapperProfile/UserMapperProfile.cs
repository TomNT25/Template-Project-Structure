using Mapster;
using Template.Application.Feature.v1.Auth.Me;
using Template.Application.Feature.v1.Auth.Register;
using Template.Domain.DTO.Entity;
using Template.Domain.Entity;

namespace Template.Application.MapperProfile
{
    public class UserMapperProfile : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<User, UserDTO>()
                .Map(dest => dest.RoleName, src => src.Role != null ? src.Role.Name : null)
                .Map(dest => dest.Permissions, src => src.UserPermissions != null
                    ? src.UserPermissions.Where(up => up.Permission != null).Select(up => new PermissionDTO
                    {
                        Id = up.Permission.Id,
                        Code = up.Permission.Code,
                        Name = up.Permission.Name,
                        Description = up.Permission.Description,
                        Resource = up.Permission.Resource,
                        Action = up.Permission.Action
                    }).ToList()
                    : new List<PermissionDTO>());

            config.NewConfig<User, GetMeResponseDTO>()
                .Inherits<User, UserDTO>();

            config.NewConfig<RegisterRequestDTO, User>()
                .Ignore(dest => dest.Id)
                .Ignore(dest => dest.PasswordHash)
                .Ignore(dest => dest.RoleId)
                .Ignore(dest => dest.Role)
                .Ignore(dest => dest.UserPermissions)
                .Ignore(dest => dest.UserTokens);

            config.NewConfig<User, RegisterResponseDTO>()
                .Map(dest => dest.Message, src => "Registration successful. Please verify your email with the OTP provided.");
        }
    }
}