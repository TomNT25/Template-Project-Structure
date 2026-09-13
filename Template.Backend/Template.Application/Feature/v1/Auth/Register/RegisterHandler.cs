using MapsterMapper;
using Template.Domain.Contract.Repository.Enitity.v1;
using Template.Domain.Contract.RequestHandlerHub;
using Template.Domain.Contract.Util;
using Template.Domain.Entity;
using Template.Helper.Constant;

namespace Template.Application.Feature.v1.Auth.Register
{
    public class RegisterHandler : IRequestHandler<RegisterRequestDTO, RegisterResponseDTO>
    {
        private readonly IUserRepository _userRepository;
        private readonly IRoleRepository _roleRepository;
        private readonly IPasswordHasherService _passwordHasherService;
        private readonly IOtpService _otpService;
        private readonly IMapper _mapper;

        public RegisterHandler(
            IUserRepository userRepository,
            IRoleRepository roleRepository,
            IPasswordHasherService passwordHasherService,
            IOtpService otpService,
            IMapper mapper)
        {
            _userRepository = userRepository;
            _roleRepository = roleRepository;
            _passwordHasherService = passwordHasherService;
            _otpService = otpService;
            _mapper = mapper;
        }

        public async Task<RegisterResponseDTO> HandleAsync(RegisterRequestDTO request, CancellationToken cancellationToken)
        {
            var existingByEmail = await _userRepository.GetByEmailAsync(request.Email, cancellationToken);
            if (existingByEmail != null)
            {
                throw new InvalidOperationException(MessageConstants.Auth.EmailRegistered);
            }

            var existingByUsername = await _userRepository.GetByUsernameAsync(request.Username, cancellationToken);
            if (existingByUsername != null)
            {
                throw new InvalidOperationException(MessageConstants.Auth.UsernameTaken);
            }

            var defaultRole = await _roleRepository.GetDefaultRoleAsync(cancellationToken);
            if (defaultRole == null)
            {
                throw new InvalidOperationException(MessageConstants.Auth.DefaultRoleNotFound);
            }

            var newUser = _mapper.Map<User>(request);
            newUser.Id = Guid.NewGuid().ToString();
            newUser.PasswordHash = _passwordHasherService.HashPassword(request.Password);
            newUser.RoleId = defaultRole.Id;
            newUser.Provider = AuthConstants.Providers.System;
            newUser.IsActive = true;
            newUser.IsEmailVerified = false;
            newUser.CreatedAt = DateTime.UtcNow;
            newUser.UpdatedAt = DateTime.UtcNow;

            await _userRepository.AddAsync(newUser, cancellationToken);

            var otpCode = _otpService.GenerateOtp($"verify_email_{request.Email}");

            var response = _mapper.Map<RegisterResponseDTO>(newUser);
            response.OtpCode = otpCode;

            return response;
        }
    }
}
