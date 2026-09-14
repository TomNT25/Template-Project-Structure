using Microsoft.EntityFrameworkCore;
using Template.Domain.Entity;

namespace Template.Infrastructure.Database.ModelCreating
{
    public static class UserRoleModelCreating
    {
        public static void CreateModel(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserRole>(entity =>
            {
                entity.ToTable("user_roles");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Code).HasColumnName("code");
                entity.Property(e => e.UserId).HasColumnName("user_id");
                entity.Property(e => e.RoleId).HasColumnName("role_id");
                entity.Property(e => e.AssignedAt).HasColumnName("assigned_at");
                entity.Property(e => e.AssignedBy).HasColumnName("assigned_by");
                entity.Property(e => e.IsActive).HasColumnName("is_active");

                entity.HasOne(e => e.User)
                    .WithMany()
                    .HasForeignKey(e => e.UserId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(e => e.Role)
                    .WithMany()
                    .HasForeignKey(e => e.RoleId)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
