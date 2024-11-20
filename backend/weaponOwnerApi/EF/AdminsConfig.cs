using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using weaponOwnerApi.Entities;

namespace weaponOwnerApi.EF
{
    public class AdminsConfig : IEntityTypeConfiguration<Admin>
    {
        public void Configure(EntityTypeBuilder<Admin> builder)
        {
            builder.ToTable("admins");

            builder.HasKey(a => a.id);

            builder.Property(a => a.first_name)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(a => a.last_name)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(a => a.email)
                   .IsRequired()
                   .HasMaxLength(150);

            builder.Property(a => a.username)
                   .IsRequired()
                   .HasMaxLength(50);

            builder.Property(a => a.password)
                   .IsRequired()
                   .HasMaxLength(255);

            builder.Property(a => a.is_active)
                   .IsRequired();

            builder.Property(a => a.card_count)
                   .IsRequired()
                   .HasDefaultValue(0);
        }
    }
}
