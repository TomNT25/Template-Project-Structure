using Template.Domain.Contract.RequestHandlerHub;

namespace Template.Application.Feature.v1.Auth.Login
{
    public class LoginRequestDTO : IRequest<LoginResponseDTO>
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
