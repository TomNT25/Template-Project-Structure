using Template.Domain.Contract.RequestHandlerHub;

namespace Template.Application.Feature.v1.Auth.VerifyOtp
{
    public class VerifyOtpRequestDTO : IRequest<VerifyOtpResponseDTO>
    {
        public string Email { get; set; } = string.Empty;
        public string OtpCode { get; set; } = string.Empty;
    }
}
