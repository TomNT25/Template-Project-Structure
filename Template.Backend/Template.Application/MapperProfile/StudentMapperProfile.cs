using Mapster;
using Template.Application.Feature.v1.Student.AddStudent;
using Template.Domain.DTO.Entity;
using Template.Domain.Entity;

namespace Template.Application.MapperProfile
{
    public class StudentMapperProfile : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<Student, StudentDTO>();
            config.NewConfig<AddStudentRequestDTO, Student>();
        }
    }
}