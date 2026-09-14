using System;
using System.Collections.Generic;
using System.Text;
using Template.Domain.Contract.RequestHandlerHub;

namespace Template.Application.Feature.v1.User.GetUserPermission
{
    public class GetUserPermissionRequestDTO : IRequest<GetUserPermissionResponseDTO>
    {
        public string UserID { get; set; }
    }
}
