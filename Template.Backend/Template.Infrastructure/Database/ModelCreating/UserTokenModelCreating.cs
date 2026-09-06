using Microsoft.EntityFrameworkCore;
using Template.Domain.Entity;

namespace Template.Infrastructure.Database.ModelCreating
{
    public static class UserTokenModelCreating
    {
        public static void CreateModel(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserToken>(entity =>
            {
                entity.ToTable("user_tokens");
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasMaxLength(50)
                    .ValueGeneratedOnAdd()
                    .HasDefaultValueSql("dbo.fn_GenerateUUIDv7()");

                entity.Property(e => e.Code).HasColumnName("code").HasMaxLength(50);
                entity.Property(e => e.UserId).HasColumnName("user_id").HasMaxLength(50);

                entity.Property(e => e.RefreshToken).HasColumnName("refresh_token").IsRequired();

                entity.Property(e => e.IssuedAt)
                    .HasColumnName("issued_at")
                    .ValueGeneratedOnAdd()
                    .HasDefaultValueSql("GETDATE()");

                entity.Property(e => e.ExpiresAt)
                    .HasColumnName("expires_at")
                    .ValueGeneratedOnAdd()
                    .HasDefaultValueSql("GETDATE()");

                entity.Property(e => e.RevokedAt).HasColumnName("revoked_at");
                entity.Property(e => e.ReplacedByToken).HasColumnName("replaced_by_token");

                entity.Property(e => e.IsActive)
                    .HasColumnName("is_active")
                    .HasDefaultValue(true);

                entity.Property(e => e.Jti).HasColumnName("jti").HasMaxLength(255);

                entity.HasOne(e => e.User)
                    .WithMany(u => u.UserTokens)
                    .HasForeignKey(e => e.UserId)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
