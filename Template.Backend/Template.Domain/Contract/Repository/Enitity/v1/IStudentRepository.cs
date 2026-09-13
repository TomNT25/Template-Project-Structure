using Template.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Template.Domain.Contract.Repository.Enitity.v1
{
    public interface IStudentRepository : IRepository<Student>
    {
        Task<Student?> GetByIdAsync(string id, CancellationToken cancellationToken = default);
    }
}                                                                        