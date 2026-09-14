using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Template.Application.Feature.v1.Permission.CreatePermission;
using Template.Application.Feature.v1.Permission.DeletePermission;
using Template.Application.Feature.v1.Permission.GetAllPermission;
using Template.Application.Feature.v1.Permission.GetPermissionById;
using Template.Application.Feature.v1.Permission.GrantUserPermission;
using Template.Application.Feature.v1.Permission.RevokeUserPermission;
using Template.Application.Feature.v1.Permission.UpdatePermission;
using Template.Domain.Contract.RequestHandlerHub;
using Template.Domain.DTO;
using Template.Helper.Constant;
using Template.Helper.Localization;

namespace Template.API.Controllers.v1
{
    [ApiController]
    [ApiVersion("1.0")]
    [Authorize]
    [Route("api/v{version:apiVersion}/permissions")]
    public class PermissionController : ControllerBase
    {
        private readonly IDispatcher _dispatcher;
        private readonly IJsonStringLocalizer _localizer;

        public PermissionController(IDispatcher dispatcher, IJsonStringLocalizer localizer)
        {
            _dispatcher = dispatcher;
            _localizer = localizer;
        }

        /// <summary>
        /// Get all permissions
        /// </summary>
        [HttpGet]
        [ProducesResponseType(typeof(BaseAPIResponse<GetAllPermissionResponseDTO>), StatusCodes.Status200OK)]
        public async Task<ActionResult<BaseAPIResponse<GetAllPermissionResponseDTO>>> GetAll([FromQuery] GetAllPermissionRequestDTO request)
        {
            var result = await _dispatcher.DispatchAsync<GetAllPermissionResponseDTO>(request);
            var message = _localizer.GetString(MessageConstants.Permission.GetAllSuccess);
            return Ok(BaseAPIResponse<GetAllPermissionResponseDTO>.Success(result, message));
        }

        /// <summary>
        /// Get permission by ID
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(BaseAPIResponse<GetPermissionByIdResponseDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<BaseAPIResponse<GetPermissionByIdResponseDTO>>> GetById(string id)
        {
            var request = new GetPermissionByIdRequestDTO { Id = id };
            var result = await _dispatcher.DispatchAsync<GetPermissionByIdResponseDTO>(request);
            if (result.Permission == null)
            {
                return NotFound(BaseAPIResponse<GetPermissionByIdResponseDTO>.Failure(_localizer.GetString(MessageConstants.Permission.NotFound), statusCode: 404));
            }

            var message = _localizer.GetString(MessageConstants.Permission.GetByIdSuccess);
            return Ok(BaseAPIResponse<GetPermissionByIdResponseDTO>.Success(result, message));
        }

        /// <summary>
        /// Create a new permission
        /// </summary>
        [HttpPost]
        [ProducesResponseType(typeof(BaseAPIResponse<CreatePermissionResponseDTO>), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<BaseAPIResponse<CreatePermissionResponseDTO>>> Create([FromBody] CreatePermissionRequestDTO request)
        {
            var result = await _dispatcher.DispatchAsync<CreatePermissionResponseDTO>(request);
            var message = _localizer.GetString(MessageConstants.Permission.CreateSuccess);
            return StatusCode(StatusCodes.Status201Created, BaseAPIResponse<CreatePermissionResponseDTO>.Success(result, message));
        }

        /// <summary>
        /// Update an existing permission
        /// </summary>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(BaseAPIResponse<UpdatePermissionResponseDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<BaseAPIResponse<UpdatePermissionResponseDTO>>> Update(string id, [FromBody] UpdatePermissionRequestDTO request)
        {
            request.Id = id;
            var result = await _dispatcher.DispatchAsync<UpdatePermissionResponseDTO>(request);
            var message = _localizer.GetString(MessageConstants.Permission.UpdateSuccess);
            return Ok(BaseAPIResponse<UpdatePermissionResponseDTO>.Success(result, message));
        }

        /// <summary>
        /// Delete a permission
        /// </summary>
        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(BaseAPIResponse<DeletePermissionResponseDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<BaseAPIResponse<DeletePermissionResponseDTO>>> Delete(string id)
        {
            var request = new DeletePermissionRequestDTO { Id = id };
            var result = await _dispatcher.DispatchAsync<DeletePermissionResponseDTO>(request);
            var message = _localizer.GetString(MessageConstants.Permission.DeleteSuccess);
            return Ok(BaseAPIResponse<DeletePermissionResponseDTO>.Success(result, message));
        }

        /// <summary>
        /// Grant permission(s) directly to a user
        /// </summary>
        [HttpPost("grant-user")]
        [ProducesResponseType(typeof(BaseAPIResponse<GrantUserPermissionResponseDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<BaseAPIResponse<GrantUserPermissionResponseDTO>>> GrantUserPermission([FromBody] GrantUserPermissionRequestDTO request)
        {
            var result = await _dispatcher.DispatchAsync<GrantUserPermissionResponseDTO>(request);
            var message = _localizer.GetString(MessageConstants.Permission.GrantUserSuccess);
            return Ok(BaseAPIResponse<GrantUserPermissionResponseDTO>.Success(result, message));
        }

        /// <summary>
        /// Revoke direct permission(s) from a user
        /// </summary>
        [HttpPost("revoke-user")]
        [ProducesResponseType(typeof(BaseAPIResponse<RevokeUserPermissionResponseDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<BaseAPIResponse<RevokeUserPermissionResponseDTO>>> RevokeUserPermission([FromBody] RevokeUserPermissionRequestDTO request)
        {
            var result = await _dispatcher.DispatchAsync<RevokeUserPermissionResponseDTO>(request);
            var message = _localizer.GetString(MessageConstants.Permission.RevokeUserSuccess);
            return Ok(BaseAPIResponse<RevokeUserPermissionResponseDTO>.Success(result, message));
        }
    }
}
