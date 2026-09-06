using System;
using System.Collections.Generic;
using System.Text;

namespace Template.Domain.Contract.Repository
{
    public interface IReadOnlyRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetDataFromView(CancellationToken cancellationToken = default);
    }
}