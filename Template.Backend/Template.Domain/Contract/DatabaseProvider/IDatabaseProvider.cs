using System;
using System.Collections.Generic;
using System.Text;

namespace Template.Domain.Contract.DatabaseProvider
{
    public interface IDatabaseProvider
    {
        string Name { get; }
        string ConnectionString { get; }
    }
}
