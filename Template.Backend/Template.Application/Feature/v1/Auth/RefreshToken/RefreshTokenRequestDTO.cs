using Template.Domain.Contract.RequestHandlerHub;

namespace Template.Application.Feature.v1.Auth.RefreshToken
{
    public class RefreshTokenRequestDTO : IRequest<RefreshTokenResponseDTO>
    {
        public string RefreshToken { get; set; } = string.Empty;
        public string? AccessToken { get; set; }
    }
}
