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
using Template.Helper.Constant;
using Template.Helper.Localization;

namespace Project_Structure_Template.Controllers.v1
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IDispatcher _dispatcher;
        private readonly IJsonStringLocalizer _localizer;

        public AuthController(IDispatcher dispatcher, IJsonStringLocalizer localizer)
        {
            _dispatcher = dispatcher;
            _localizer = localizer;
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
            var message = _localizer.GetString(MessageConstants.Auth.LoginSuccess);
            return Ok(BaseAPIResponse<LoginResponseDTO>.Success(result, message));
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
            var message = _localizer.GetString(MessageConstants.Auth.RegisterSuccess);
            return Ok(BaseAPIResponse<RegisterResponseDTO>.Success(result, message));
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
            var message = _localizer.GetString(MessageConstants.Auth.LogoutSuccess);
            return Ok(BaseAPIResponse<LogoutResponseDTO>.Success(result, message));
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
            var message = _localizer.GetString(MessageConstants.Auth.SendOtpSuccess);
            return Ok(BaseAPIResponse<SendOtpResponseDTO>.Success(result, message));
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
            var message = _localizer.GetString(MessageConstants.Auth.VerifyOtpSuccess);
            return Ok(BaseAPIResponse<VerifyOtpResponseDTO>.Success(result, message));
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
            var message = _localizer.GetString(MessageConstants.Auth.ForgotPasswordSuccess);
            return Ok(BaseAPIResponse<ForgotPasswordResponseDTO>.Success(result, message));
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
            var message = _localizer.GetString(MessageConstants.Auth.ResetPasswordSuccess);
            return Ok(BaseAPIResponse<ResetPasswordResponseDTO>.Success(result, message));
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
            var userId = User.FindFirst(AuthConstants.Claims.UserId)?.Value
                         ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value
                         ?? User.FindFirst(ClaimTypes.Email)?.Value
                         ?? string.Empty;

            if (string.IsNullOrEmpty(userId))
            {
                var errMessage = _localizer.GetString(MessageConstants.Auth.IdentityNotFound);
                return Unauthorized(BaseAPIResponse<GetMeResponseDTO>.Failure(errMessage, StatusCodes.Status401Unauthorized));
            }

            var result = await _dispatcher.DispatchAsync<GetMeResponseDTO?>(new GetMeQuery(userId));
            if (result == null)
            {
                var notFoundMessage = _localizer.GetString(MessageConstants.Auth.UserNotFound);
                return NotFound(BaseAPIResponse<GetMeResponseDTO>.Failure(notFoundMessage, StatusCodes.Status404NotFound));
            }

            var successMessage = _localizer.GetString(MessageConstants.Auth.GetMeSuccess);
            return Ok(BaseAPIResponse<GetMeResponseDTO>.Success(result, successMessage));
        }
    }
}
