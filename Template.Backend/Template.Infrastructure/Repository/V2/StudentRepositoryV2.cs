using Microsoft.Data.SqlClient;
using Template.Domain.Contract.Repository.Enitity.v1;
using Template.Domain.Entity;
using Template.Helper.ExceptionHandler;
using Template.Infrastructure.Database;
using Template.Infrastructure.Repository.Base;

namespace Template.Infrastructure.Repository.V2;

public class StudentRepositoryV2 : Repository<Student>, IStudentRepository
{
    private readonly DatabaseConfiguration _databaseConfiguration;
    public StudentRepositoryV2(DatabaseConfiguration databaseConfiguration)
    {
        _databaseConfiguration = databaseConfiguration;
    }

    public override async Task<Student> AddAsync(Student entity, CancellationToken cancellationToken = default)
    {
        string query = @"
            INSERT INTO Students (Name)
            OUTPUT INSERTED.ID
            VALUES (@Name);";

        try
        {
            using (SqlConnection conn = _databaseConfiguration.CreateSqlConnection())
            using (SqlCommand cmd = _databaseConfiguration.CreateSqlCommand(query, conn))
            {
                cmd.Parameters.AddWithValue("@Name", entity.Name);

                await conn.OpenAsync(cancellationToken);

                object result = await cmd.ExecuteScalarAsync(cancellationToken);

                if (result == null)
                {
                    throw new InvalidOperationException("Insert completed, but no ID was returned. Check SQL Server for table triggers.");
                }

                if (result == DBNull.Value)
                {
                    throw new InvalidOperationException("Insert completed, but the generated ID was NULL.");
                }

                entity.Id = result.ToString() ?? string.Empty;
                return entity;
            }
        }
        catch (SqlException ex)
        {
            throw new DatabaseOperationException("An error occurred while adding the Student.", ex);
        }
    }

    public async Task<Student?> GetByIdAsync(string id, CancellationToken cancellationToken = default)
    {
        string query = "SELECT ID, Name FROM Students WHERE ID = @Id;";

        try
        {
            using (SqlConnection conn = _databaseConfiguration.CreateSqlConnection())
            using (SqlCommand cmd = _databaseConfiguration.CreateSqlCommand(query, conn))
            {
                cmd.Parameters.AddWithValue("@Id", id);

                await conn.OpenAsync(cancellationToken);

                using (SqlDataReader reader = await cmd.ExecuteReaderAsync(cancellationToken))
                {
                    if (await reader.ReadAsync(cancellationToken))
                    {
                        return new Student
                        {
                            Id = reader["ID"].ToString() ?? string.Empty,
                            Name = reader["Name"].ToString() ?? string.Empty
                        };
                    }
                }
            }

            return null;
        }
        catch (SqlException ex)
        {
            throw new DatabaseOperationException($"An error occurred while retrieving the Student with ID {id}.", ex);
        }
    }

    public override async Task<bool> DeleteAsync(Student entity, CancellationToken cancellationToken = default)
    {
        string query = "DELETE FROM Students WHERE ID = @Id;";

        try
        {
            using (SqlConnection conn = _databaseConfiguration.CreateSqlConnection())
            using (SqlCommand cmd = _databaseConfiguration.CreateSqlCommand(query, conn))
            {
                cmd.Parameters.AddWithValue("@Id", entity.Id);

                await conn.OpenAsync(cancellationToken);
                int rowsAffected = await cmd.ExecuteNonQueryAsync(cancellationToken);
                return rowsAffected > 0;
            }
        }
        catch (SqlException ex)
        {
            if (ex.Number == 547)
            {
                throw new DatabaseOperationException("Cannot delete Student because they are referenced by existing records.", ex);
            }

            throw new DatabaseOperationException("An error occurred while deleting the Student.", ex);
        }
    }

    public override async Task<IEnumerable<Student>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var Students = new List<Student>();
        string query = "SELECT ID, Name FROM Students;";

        try
        {
            using (SqlConnection conn = _databaseConfiguration.CreateSqlConnection())
            using (SqlCommand cmd = _databaseConfiguration.CreateSqlCommand(query, conn))
            {
                await conn.OpenAsync(cancellationToken);

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Students.Add(new Student
                        {
                            Id = reader["ID"].ToString() ?? string.Empty,
                            Name = reader["Name"].ToString() ?? string.Empty
                        });
                    }
                }
            }
            return Students;
        }
        catch (SqlException ex)
        {
            throw new DatabaseOperationException("An error occurred while retrieving Students.", ex);
        }
    }

    public override async Task<Student?> GetByIDAsync(int id, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();

        //string query = "SELECT StudentID, StudentName FROM Students WHERE StudentID = @StudentID;";

        //try
        //{
        //    using (SqlConnection conn = _databaseConfiguration.CreateSqlConnection())
        //    using (SqlCommand cmd = _databaseConfiguration.CreateSqlCommand(query, conn))
        //    {
        //        cmd.Parameters.AddWithValue("@StudentID", id);

        //        conn.Open();
        //        using (SqlDataReader reader = cmd.ExecuteReader())
        //        {
        //            if (reader.Read())
        //            {
        //                return new Student()
        //                {
        //                    StudentID = Convert.ToInt32(reader["StudentID"]),
        //                    StudentName = reader["StudentName"].ToString()
        //                };
        //            }
        //        }
        //    }
        //    return null;
        //}
        //catch (SqlException ex)
        //{
        //    throw new DatabaseOperationException($"An error occurred while retrieving the Student with ID {id}.", ex);
        //}
    }

    public override async Task<bool> UpdateAsync(Student entity, CancellationToken cancellationToken = default)
    {
        string query = "UPDATE Students SET Name = @Name WHERE ID = @Id;";

        try
        {
            using (SqlConnection conn = _databaseConfiguration.CreateSqlConnection())
            using (SqlCommand cmd = _databaseConfiguration.CreateSqlCommand(query, conn))
            {
                cmd.Parameters.AddWithValue("@Name", entity.Name);
                cmd.Parameters.AddWithValue("@Id", entity.Id);

                await conn.OpenAsync(cancellationToken);
                int rowsAffected = await cmd.ExecuteNonQueryAsync(cancellationToken);
                return rowsAffected > 0;
            }
        }
        catch (SqlException ex)
        {
            throw new DatabaseOperationException("An error occurred while updating the Student.", ex);
        }
    }
}