using System;
using System.Collections.Generic;
using System.Text;
using FluentValidation;

namespace Template.Application.Feature.v1.Student.GetAllStudent
{
    public class GetAllStudentValidator : AbstractValidator<GetAllStudentRequestDTO>
    {
        public GetAllStudentValidator()
        {
        }
    }
}
