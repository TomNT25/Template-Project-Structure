using Microsoft.EntityFrameworkCore;
using Template.Domain.Entity;
using Template.Infrastructure.Database.ModelCreating;

namespace Template.Infrastructure.Database
{
    public class TemplateDbContext : DbContext
    {
        public TemplateDbContext(DbContextOptions<TemplateDbContext> options) : base(options) { }
        public DbSet<Student> Students { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<UserPermission> UserPermissions { get; set; }
        public DbSet<RolePermission> RolePermissions { get; set; }
        public DbSet<UserToken> UserTokens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            UserModelCreating.CreateModel(modelBuilder);
            RoleModelCreating.CreateModel(modelBuilder);
            PermissionModelCreating.CreateModel(modelBuilder);
            UserRoleModelCreating.CreateModel(modelBuilder);
            UserPermissionModelCreating.CreateModel(modelBuilder);
            RolePermissionModelCreating.CreateModel(modelBuilder);
            UserTokenModelCreating.CreateModel(modelBuilder);
            StudentModelCreating.CreateModel(modelBuilder);
            base.OnModelCreating(modelBuilder);
        }
    }
}