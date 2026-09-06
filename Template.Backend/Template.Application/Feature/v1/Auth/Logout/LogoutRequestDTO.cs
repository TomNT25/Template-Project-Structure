using Template.Domain.Contract.RequestHandlerHub;

namespace Template.Application.Feature.v1.Auth.Logout
{
    public class LogoutRequestDTO : IRequest<LogoutResponseDTO>
    {
        public string? RefreshToken { get; set; }
    }
}
