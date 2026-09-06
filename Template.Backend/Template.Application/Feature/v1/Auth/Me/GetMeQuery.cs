using Template.Domain.Contract.RequestHandlerHub;

namespace Template.Application.Feature.v1.Auth.Me
{
    public record GetMeQuery(string UserId) : IRequest<GetMeResponseDTO?>;
}
