using System;
using System.Collections.Generic;
using System.Text;

namespace Template.Domain.Contract.Util
{
    public interface IPasswordHasherService
    {
        string HashPassword(string password);
        bool VerifyHashedPassword(string hashedPassword, string providedPassword);
    }
}
