using Template.Domain.DTO.Entity;

namespace Template.Application.Feature.v1.Auth.Login
{
    public class LoginResponseDTO
    {
        public UserDTO User { get; set; } = default!;
        public string AccessToken { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
        public int ExpiresIn { get; set; }
    }
}
