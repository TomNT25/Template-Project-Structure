using System.Security.Claims;
using Template.Domain.DTO.Entity;

namespace Template.Domain.Contract.Util
{
    public interface IJwtService
    {
        string GenerateAccessToken(UserDTO user);
        string GenerateRefreshToken();
        ClaimsPrincipal? GetPrincipalFromToken(string token);
        bool ValidateToken(string token);
    }
}
