using Microsoft.AspNetCore.Mvc;
using Asp.Versioning;
using Template.Domain.Contract.RequestHandlerHub;
using Template.Domain.DTO;
using Template.Application.Feature.v1.Student.AddStudent;
using Template.Application.Feature.v1.Student.DeleteStudent;
using Template.Application.Feature.v1.Student.GetAllStudent;
using Template.Application.Feature.v1.Student.UpdateStudent;
using Template.Helper.Constant;
using Template.Helper.Localization;
using Microsoft.AspNetCore.Authorization;

namespace Project_Structure_Template.Controllers.v1
{
    [ApiController]
    [ApiVersion("1.0")]
    [Authorize]
    [Route("api/v{version:apiVersion}/students")]
    public class StudentController : ControllerBase
    {
        private readonly IDispatcher _dispatcher;
        private readonly IJsonStringLocalizer _localizer;

        public StudentController(IDispatcher dispatcher, IJsonStringLocalizer localizer)
        {
            _dispatcher = dispatcher;
            _localizer = localizer;
        }

        /// <summary>
        /// Get All Student
        /// </summary>
        /// <param name="request"></param>
        /// <response code="200">Get All Student Success</response>
        /// <response code="400">Get All Student Fail</response>
        [HttpGet]
        [Authorize(Policy = "GetAllStudenT")]
        [ProducesResponseType(typeof(BaseAPIResponse<GetAllStudentResponseDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<BaseAPIResponse<GetAllStudentResponseDTO>>> GetAllStudent([FromQuery] GetAllStudentRequestDTO request)
        {
            var result = await _dispatcher.DispatchAsync<GetAllStudentResponseDTO>(request);
            var message = _localizer.GetString(MessageConstants.Student.GetAllSuccess);
            return Ok(BaseAPIResponse<GetAllStudentResponseDTO>.Success(result, message));
        }

        /// <summary>
        /// Get Student ID
        /// </summary>
        /// <param name="request"></param>
        /// <response code="200">Get Student By ID Success</response>
        /// <response code="400">Get Student By ID Fail</response>
        [HttpGet("id")]
        [Authorize(Policy = "GetStudentByID")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<BaseAPIResponse<GetAllStudentResponseDTO>>> GetStudentByID([FromBody] GetAllStudentRequestDTO request)
        {
            var result = await _dispatcher.DispatchAsync<GetAllStudentResponseDTO>(request);
            var message = _localizer.GetString(MessageConstants.Student.GetByIdSuccess);
            return Ok(BaseAPIResponse<GetAllStudentResponseDTO>.Success(result, message));
        }

        /// <summary>
        /// Add Student
        /// </summary>
        /// <param name="request"></param>
        /// <response code="200">Add Student success</response>
        /// <response code="400">Add Student fail</response>
        [HttpPost]
        [Authorize(Policy = "AddStudent")]
        [ProducesResponseType(typeof(BaseAPIResponse<AddStudentResponseDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<BaseAPIResponse<AddStudentResponseDTO>>> AddStudent([FromBody] AddStudentRequestDTO request)
        {
            var result = await _dispatcher.DispatchAsync<AddStudentResponseDTO>(request);
            var message = _localizer.GetString(MessageConstants.Student.AddSuccess);
            return Ok(BaseAPIResponse<AddStudentResponseDTO>.Success(result, message));
        }

        /// <summary>
        /// Update Student
        /// </summary>
        /// <param name="request"></param>
        /// <response code="200">Update Student success</response>
        /// <response code="400">Update Student fail</response>
        [HttpPost("update")]
        [Authorize(Policy = "UpdateStudent")]
        [ProducesResponseType(typeof(BaseAPIResponse<UpdateStudentResponseDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<BaseAPIResponse<UpdateStudentResponseDTO>>> UpdateStudent([FromBody] UpdateStudentRequestDTO request)
        {
            var result = await _dispatcher.DispatchAsync<UpdateStudentResponseDTO>(request);
            var message = _localizer.GetString(MessageConstants.Student.UpdateSuccess);
            return Ok(BaseAPIResponse<UpdateStudentResponseDTO>.Success(result, message));
        }

        /// <summary>
        /// Delete Student
        /// </summary>
        /// <param name="request"></param>
        /// <response code="200">Delete Student success</response>
        /// <response code="400">Delete Student fail</response>
        [HttpPost("delete")]
        [Authorize(Policy = "DeleteStudent")]
        [ProducesResponseType(typeof(BaseAPIResponse<DeleteStudentResponseDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<BaseAPIResponse<DeleteStudentResponseDTO>>> DeleteStudent([FromBody] DeleteStudentRequestDTO request)
        {
            var result = await _dispatcher.DispatchAsync<DeleteStudentResponseDTO>(request);
            var message = _localizer.GetString(MessageConstants.Student.DeleteSuccess);
            return Ok(BaseAPIResponse<DeleteStudentResponseDTO>.Success(result, message));
        }
    }
}
