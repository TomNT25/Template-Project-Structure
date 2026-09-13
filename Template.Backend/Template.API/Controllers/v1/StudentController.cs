using Microsoft.AspNetCore.Mvc;
using Asp.Versioning;
using Template.Domain.Contract.RequestHandlerHub;
using Template.Domain.DTO;
using Template.Application.Feature.v1.Student.AddStudent;
using Template.Application.Feature.v1.Student.DeleteStudent;
using Template.Application.Feature.v1.Student.GetAllStudent;
using Template.Application.Feature.v1.Student.UpdateStudent;

namespace Project_Structure_Template.Controllers.v1
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/students")]
    public class StudentController : ControllerBase
    {
        private readonly IDispatcher _dispatcher;

        public StudentController(IDispatcher dispatcher)
        {
            _dispatcher = dispatcher;
        }

        /// <summary>
        /// Get All Student
        /// </summary>
        /// <param name="request"></param>
        /// <response code="200">Get All Student Success</response>
        /// <response code="400">Get All Student Fail</response>
        [HttpGet]
        [ProducesResponseType(typeof(BaseAPIResponse<GetAllStudentResponseDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<BaseAPIResponse<GetAllStudentResponseDTO>>> GetAllStudent([FromQuery] GetAllStudentRequestDTO request)
        {
            var result = await _dispatcher.DispatchAsync<GetAllStudentResponseDTO>(request);
            return Ok(BaseAPIResponse<GetAllStudentResponseDTO>.Success(result, "Get All Student successful"));
        }

        /// <summary>
        /// Get Student ID
        /// </summary>
        /// <param name="request"></param>
        /// <response code="200">Get Student By ID Success</response>
        /// <response code="400">Get Student By ID Fail</response>
        [HttpGet("id")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<BaseAPIResponse<GetAllStudentResponseDTO>>> GetStudentByID([FromBody] GetAllStudentRequestDTO request)
        {
            var result = await _dispatcher.DispatchAsync<GetAllStudentResponseDTO>(request);
            return Ok(BaseAPIResponse<GetAllStudentResponseDTO>.Success(result, "Get All Student successful"));
        }

        /// <summary>
        /// Add Student
        /// </summary>
        /// <param name="request"></param>
        /// <response code="200">Add Student success</response>
        /// <response code="400">Add Student fail</response>
        [HttpPost]
        [ProducesResponseType(typeof(BaseAPIResponse<AddStudentRequestDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        //[Policy]
        public async Task<ActionResult<BaseAPIResponse<AddStudentResponseDTO>>> AddStudent([FromBody] AddStudentRequestDTO request)
        {
            var result = await _dispatcher.DispatchAsync<AddStudentResponseDTO>(request);
            return Ok(BaseAPIResponse<AddStudentResponseDTO>.Success(result, "Add Student successful"));
        }

        /// <summary>
        /// Update Student
        /// </summary>
        /// <param name="request"></param>
        /// <response code="200">Update Student success</response>
        /// <response code="400">Update Student fail</response>
        [HttpPost("update")]
        [ProducesResponseType(typeof(BaseAPIResponse<UpdateStudentResponseDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        //[Policy]
        public async Task<ActionResult<BaseAPIResponse<UpdateStudentResponseDTO>>> UpdateStudent([FromBody] UpdateStudentRequestDTO request)
        {
            var result = await _dispatcher.DispatchAsync<UpdateStudentResponseDTO>(request);
            return Ok(BaseAPIResponse<UpdateStudentResponseDTO>.Success(result, "Update Student successful"));
        }

        /// <summary>
        /// Delete Student
        /// </summary>
        /// <param name="request"></param>
        /// <response code="200">Delete Student success</response>
        /// <response code="400">Delete Student fail</response>
        [HttpPost("delete")]
        [ProducesResponseType(typeof(BaseAPIResponse<DeleteStudentResponseDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        //[Policy]
        public async Task<ActionResult<BaseAPIResponse<DeleteStudentResponseDTO>>> DeleteStudent([FromBody] DeleteStudentRequestDTO request)
        {
            var result = await _dispatcher.DispatchAsync<DeleteStudentResponseDTO>(request);
            return Ok(BaseAPIResponse<DeleteStudentResponseDTO>.Success(result, "Delete Student successful"));
        }
    }
}
