using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Template.Application.Feature.v1.Auth.ForgotPassword;
using Template.Application.Feature.v1.Auth.Login;
using Template.Application.Feature.v1.Auth.Logout;
using Template.Application.Feature.v1.Auth.Me;
using Template.Application.Feature.v1.Auth.Register;
using Template.Application.Feature.v1.Auth.VerifyOtp;
using Template.Domain.Contract.RequestHandlerHub;
using Template.Domain.DTO;

namespace Project_Structure_Template.Controllers.v1
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IDispatcher _dispatcher;

        public AuthController(IDispatcher dispatcher)
        {
            _dispatcher = dispatcher;
        }

        /// <summary>
        /// Login
        /// </summary>
        [HttpPost("login")]
        [ProducesResponseType(typeof(BaseAPIResponse<LoginResponseDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<BaseAPIResponse<LoginResponseDTO>>> Login([FromBody] LoginRequestDTO request)
        {
            var result = await _dispatcher.DispatchAsync<LoginResponseDTO>(request);
            return Ok(BaseAPIResponse<LoginResponseDTO>.Success(result, "Login successful"));
        }

        /// <summary>
        /// Register new user account
        /// </summary>
        [HttpPost("register")]
        [ProducesResponseType(typeof(BaseAPIResponse<RegisterResponseDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<BaseAPIResponse<RegisterResponseDTO>>> Register([FromBody] RegisterRequestDTO request)
        {
            var result = await _dispatcher.DispatchAsync<RegisterResponseDTO>(request);
            return Ok(BaseAPIResponse<RegisterResponseDTO>.Success(result, "Registration successful"));
        }

        /// <summary>
        /// Logout user account
        /// </summary>
        [Authorize]
        [HttpPost("logout")]
        [ProducesResponseType(typeof(BaseAPIResponse<LogoutResponseDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<BaseAPIResponse<LogoutResponseDTO>>> Logout([FromBody] LogoutRequestDTO? request)
        {
            var req = request ?? new LogoutRequestDTO();
            var result = await _dispatcher.DispatchAsync<LogoutResponseDTO>(req);
            return Ok(BaseAPIResponse<LogoutResponseDTO>.Success(result, "Logged out successfully"));
        }

        /// <summary>
        /// Send OTP for email verification
        /// </summary>
        [HttpPost("send-otp")]
        [ProducesResponseType(typeof(BaseAPIResponse<SendOtpResponseDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<BaseAPIResponse<SendOtpResponseDTO>>> SendOtp([FromBody] SendOtpRequestDTO request)
        {
            var result = await _dispatcher.DispatchAsync<SendOtpResponseDTO>(request);
            return Ok(BaseAPIResponse<SendOtpResponseDTO>.Success(result, "OTP sent successfully to email"));
        }

        /// <summary>
        /// Verify email with OTP (Valid-Email)
        /// </summary>
        [HttpPost("verify-otp")]
        [HttpPost("valid-email")]
        [ProducesResponseType(typeof(BaseAPIResponse<VerifyOtpResponseDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<BaseAPIResponse<VerifyOtpResponseDTO>>> VerifyOtp([FromBody] VerifyOtpRequestDTO request)
        {
            var result = await _dispatcher.DispatchAsync<VerifyOtpResponseDTO>(request);
            return Ok(BaseAPIResponse<VerifyOtpResponseDTO>.Success(result, "Email verified successfully"));
        }

        /// <summary>
        /// Request OTP for Forgot Password
        /// </summary>
        [HttpPost("forgot-password")]
        [ProducesResponseType(typeof(BaseAPIResponse<ForgotPasswordResponseDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<BaseAPIResponse<ForgotPasswordResponseDTO>>> ForgotPassword([FromBody] ForgotPasswordRequestDTO request)
        {
            var result = await _dispatcher.DispatchAsync<ForgotPasswordResponseDTO>(request);
            return Ok(BaseAPIResponse<ForgotPasswordResponseDTO>.Success(result, "Password reset OTP generated successfully"));
        }

        /// <summary>
        /// Reset Password using OTP
        /// </summary>
        [HttpPost("reset-password")]
        [ProducesResponseType(typeof(BaseAPIResponse<ResetPasswordResponseDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<BaseAPIResponse<ResetPasswordResponseDTO>>> ResetPassword([FromBody] ResetPasswordRequestDTO request)
        {
            var result = await _dispatcher.DispatchAsync<ResetPasswordResponseDTO>(request);
            return Ok(BaseAPIResponse<ResetPasswordResponseDTO>.Success(result, "Password reset successfully"));
        }

        /// <summary>
        /// Get currently authenticated user profile
        /// </summary>
        [Authorize]
        [HttpGet("me")]
        [ProducesResponseType(typeof(BaseAPIResponse<GetMeResponseDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<BaseAPIResponse<GetMeResponseDTO>>> GetMe()
        {
            var userId = User.FindFirst("uid")?.Value
                         ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value
                         ?? User.FindFirst(ClaimTypes.Email)?.Value
                         ?? string.Empty;

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(BaseAPIResponse<GetMeResponseDTO>.Failure("User identity could not be retrieved from token.", 401));
            }

            var result = await _dispatcher.DispatchAsync<GetMeResponseDTO?>(new GetMeQuery(userId));
            if (result == null)
            {
                return NotFound(BaseAPIResponse<GetMeResponseDTO>.Failure("User profile not found.", 404));
            }

            return Ok(BaseAPIResponse<GetMeResponseDTO>.Success(result, "User profile retrieved successfully"));
        }
    }
}
