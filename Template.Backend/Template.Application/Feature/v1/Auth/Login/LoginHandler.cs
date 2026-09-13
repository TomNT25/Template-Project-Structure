using Microsoft.Extensions.Configuration;
using Template.Domain.Contract.RequestHandlerHub;
using Template.Domain.Contract.Util;
using Template.Helper.Constant;

namespace Template.Application.Feature.v1.Auth.Login
{
    public class LoginHandler : IRequestHandler<LoginRequestDTO, LoginResponseDTO>
    {
        private readonly IDispatcher _dispatcher;
        private readonly IJwtService _jwtService;
        private readonly IPasswordHasherService _passwordHasherService;
        private readonly IConfiguration _configuration;

        public LoginHandler(
            IDispatcher dispatcher,
            IJwtService jwtService,
            IPasswordHasherService passwordHasherService,
            IConfiguration configuration)
        {
            _dispatcher = dispatcher;
            _jwtService = jwtService;
            _passwordHasherService = passwordHasherService;
            _configuration = configuration;
        }

        public async Task<LoginResponseDTO> HandleAsync(LoginRequestDTO request, CancellationToken cancellationToken)
        {
            var getUserByEmailResult = await _dispatcher.DispatchAsync(new GetUserByEmailQuery(request.Email), cancellationToken);
            if (getUserByEmailResult == null)
            {
                throw new UnauthorizedAccessException(MessageConstants.Auth.InvalidCredentials);
            }

            var passwordMatch = _passwordHasherService.VerifyHashedPassword(getUserByEmailResult.PasswordHash, request.Password);
            if (!passwordMatch)
            {
                throw new UnauthorizedAccessException(MessageConstants.Auth.InvalidCredentials);
            }

            var accessToken = _jwtService.GenerateAccessToken(getUserByEmailResult);
            var refreshToken = _jwtService.GenerateRefreshToken();
            var tokenExpireMinutes = int.Parse(_configuration[AuthConstants.JwtConfig.TokenExpireMinutesPath] ?? AuthConstants.JwtConfig.DefaultTokenExpireMinutes.ToString());

            return new LoginResponseDTO
            {
                User = getUserByEmailResult,
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                ExpiresIn = tokenExpireMinutes
            };
        }
    }
}
