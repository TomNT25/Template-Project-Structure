using MapsterMapper;
using Template.Domain.Contract.Repository.Enitity.v1;
using Template.Domain.Contract.RequestHandlerHub;
using Template.Domain.Contract.Util;
using Template.Domain.Entity;

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
                throw new InvalidOperationException("Email is already registered.");
            }

            var existingByUsername = await _userRepository.GetByUsernameAsync(request.Username, cancellationToken);
            if (existingByUsername != null)
            {
                throw new InvalidOperationException("Username is already taken.");
            }

            var defaultRole = await _roleRepository.GetDefaultRoleAsync(cancellationToken);
            if (defaultRole == null)
            {
                throw new InvalidOperationException("Default system role could not be found.");
            }

            // Map Request DTO -> User Entity via Mapster
            var newUser = _mapper.Map<User>(request);
            newUser.Id = Guid.NewGuid().ToString();
            newUser.PasswordHash = _passwordHasherService.HashPassword(request.Password);
            newUser.RoleId = defaultRole.Id;
            newUser.Provider = "system";
            newUser.IsActive = true;
            newUser.IsEmailVerified = false;
            newUser.CreatedAt = DateTime.UtcNow;
            newUser.UpdatedAt = DateTime.UtcNow;

            await _userRepository.AddAsync(newUser, cancellationToken);

            var otpCode = _otpService.GenerateOtp($"verify_email_{request.Email}");

            // Map User Entity -> Response DTO via Mapster
            var response = _mapper.Map<RegisterResponseDTO>(newUser);
            response.OtpCode = otpCode;

            return response;
        }
    }
}
