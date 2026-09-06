using Microsoft.EntityFrameworkCore;
using Template.Domain.Entity;

namespace Template.Infrastructure.Database.ModelCreating
{
    public static class StudentModelCreating
    {
        public static void CreateModel(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Student>(entity =>
            {
                entity.ToTable("Students");

                entity.HasKey(st => st.Id);

                entity.Property(st => st.Id)
                      .HasColumnName("ID")
                      .HasMaxLength(50)
                      .ValueGeneratedOnAdd()
                      .HasDefaultValueSql("dbo.fn_GenerateUUIDv7()");

                entity.Property(st => st.Name)
                      .HasColumnName("Name")
                      .IsRequired()
                      .HasMaxLength(255);
            });
        }
    }
}
