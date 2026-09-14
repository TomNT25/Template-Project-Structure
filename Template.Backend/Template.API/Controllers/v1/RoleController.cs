using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Template.Application.Feature.v1.Role.CreateRole;
using Template.Application.Feature.v1.Role.DeleteRole;
using Template.Application.Feature.v1.Role.GetAllRole;
using Template.Application.Feature.v1.Role.GetRoleById;
using Template.Application.Feature.v1.Role.GrantRolePermission;
using Template.Application.Feature.v1.Role.GrantUserRole;
using Template.Application.Feature.v1.Role.RevokeRolePermission;
using Template.Application.Feature.v1.Role.RevokeUserRole;
using Template.Application.Feature.v1.Role.UpdateRole;
using Template.Domain.Contract.RequestHandlerHub;
using Template.Domain.DTO;
using Template.Helper.Constant;
using Template.Helper.Localization;

namespace Template.API.Controllers.v1
{
    [ApiController]
    [ApiVersion("1.0")]
    [Authorize]
    [Route("api/v{version:apiVersion}/roles")]
    public class RoleController : ControllerBase
    {
        private readonly IDispatcher _dispatcher;
        private readonly IJsonStringLocalizer _localizer;

        public RoleController(IDispatcher dispatcher, IJsonStringLocalizer localizer)
        {
            _dispatcher = dispatcher;
            _localizer = localizer;
        }

        /// <summary>
        /// Get all roles
        /// </summary>
        [HttpGet]
        [ProducesResponseType(typeof(BaseAPIResponse<GetAllRoleResponseDTO>), StatusCodes.Status200OK)]
        public async Task<ActionResult<BaseAPIResponse<GetAllRoleResponseDTO>>> GetAll([FromQuery] GetAllRoleRequestDTO request)
        {
            var result = await _dispatcher.DispatchAsync<GetAllRoleResponseDTO>(request);
            var message = _localizer.GetString(MessageConstants.Role.GetAllSuccess);
            return Ok(BaseAPIResponse<GetAllRoleResponseDTO>.Success(result, message));
        }

        /// <summary>
        /// Get role by ID
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(BaseAPIResponse<GetRoleByIdResponseDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<BaseAPIResponse<GetRoleByIdResponseDTO>>> GetById(string id)
        {
            var request = new GetRoleByIdRequestDTO { Id = id };
            var result = await _dispatcher.DispatchAsync<GetRoleByIdResponseDTO>(request);
            if (result.Role == null)
            {
                return NotFound(BaseAPIResponse<GetRoleByIdResponseDTO>.Failure(_localizer.GetString(MessageConstants.Role.NotFound), statusCode: 404));
            }

            var message = _localizer.GetString(MessageConstants.Role.GetByIdSuccess);
            return Ok(BaseAPIResponse<GetRoleByIdResponseDTO>.Success(result, message));
        }

        /// <summary>
        /// Create a new role
        /// </summary>
        [HttpPost]
        [ProducesResponseType(typeof(BaseAPIResponse<CreateRoleResponseDTO>), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<BaseAPIResponse<CreateRoleResponseDTO>>> Create([FromBody] CreateRoleRequestDTO request)
        {
            var result = await _dispatcher.DispatchAsync<CreateRoleResponseDTO>(request);
            var message = _localizer.GetString(MessageConstants.Role.CreateSuccess);
            return StatusCode(StatusCodes.Status201Created, BaseAPIResponse<CreateRoleResponseDTO>.Success(result, message));
        }

        /// <summary>
        /// Update an existing role
        /// </summary>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(BaseAPIResponse<UpdateRoleResponseDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<BaseAPIResponse<UpdateRoleResponseDTO>>> Update(string id, [FromBody] UpdateRoleRequestDTO request)
        {
            request.Id = id;
            var result = await _dispatcher.DispatchAsync<UpdateRoleResponseDTO>(request);
            var message = _localizer.GetString(MessageConstants.Role.UpdateSuccess);
            return Ok(BaseAPIResponse<UpdateRoleResponseDTO>.Success(result, message));
        }

        /// <summary>
        /// Delete a role
        /// </summary>
        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(BaseAPIResponse<DeleteRoleResponseDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<BaseAPIResponse<DeleteRoleResponseDTO>>> Delete(string id)
        {
            var request = new DeleteRoleRequestDTO { Id = id };
            var result = await _dispatcher.DispatchAsync<DeleteRoleResponseDTO>(request);
            var message = _localizer.GetString(MessageConstants.Role.DeleteSuccess);
            return Ok(BaseAPIResponse<DeleteRoleResponseDTO>.Success(result, message));
        }

        /// <summary>
        /// Grant permissions to a role
        /// </summary>
        [HttpPost("grant-permission")]
        [ProducesResponseType(typeof(BaseAPIResponse<GrantRolePermissionResponseDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<BaseAPIResponse<GrantRolePermissionResponseDTO>>> GrantPermission([FromBody] GrantRolePermissionRequestDTO request)
        {
            var result = await _dispatcher.DispatchAsync<GrantRolePermissionResponseDTO>(request);
            var message = _localizer.GetString(MessageConstants.Role.GrantPermissionSuccess);
            return Ok(BaseAPIResponse<GrantRolePermissionResponseDTO>.Success(result, message));
        }

        /// <summary>
        /// Revoke permissions from a role
        /// </summary>
        [HttpPost("revoke-permission")]
        [ProducesResponseType(typeof(BaseAPIResponse<RevokeRolePermissionResponseDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<BaseAPIResponse<RevokeRolePermissionResponseDTO>>> RevokePermission([FromBody] RevokeRolePermissionRequestDTO request)
        {
            var result = await _dispatcher.DispatchAsync<RevokeRolePermissionResponseDTO>(request);
            var message = _localizer.GetString(MessageConstants.Role.RevokePermissionSuccess);
            return Ok(BaseAPIResponse<RevokeRolePermissionResponseDTO>.Success(result, message));
        }

        /// <summary>
        /// Grant role(s) to a user
        /// </summary>
        [HttpPost("grant-user")]
        [ProducesResponseType(typeof(BaseAPIResponse<GrantUserRoleResponseDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<BaseAPIResponse<GrantUserRoleResponseDTO>>> GrantUserRole([FromBody] GrantUserRoleRequestDTO request)
        {
            var result = await _dispatcher.DispatchAsync<GrantUserRoleResponseDTO>(request);
            var message = _localizer.GetString(MessageConstants.Role.GrantUserSuccess);
            return Ok(BaseAPIResponse<GrantUserRoleResponseDTO>.Success(result, message));
        }

        /// <summary>
        /// Revoke role(s) from a user
        /// </summary>
        [HttpPost("revoke-user")]
        [ProducesResponseType(typeof(BaseAPIResponse<RevokeUserRoleResponseDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<BaseAPIResponse<RevokeUserRoleResponseDTO>>> RevokeUserRole([FromBody] RevokeUserRoleRequestDTO request)
        {
            var result = await _dispatcher.DispatchAsync<RevokeUserRoleResponseDTO>(request);
            var message = _localizer.GetString(MessageConstants.Role.RevokeUserSuccess);
            return Ok(BaseAPIResponse<RevokeUserRoleResponseDTO>.Success(result, message));
        }
    }
}
