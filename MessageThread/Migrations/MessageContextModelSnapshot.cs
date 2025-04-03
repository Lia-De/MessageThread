﻿// <auto-generated />
using MessageThread.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace MessageThread.Migrations
{
    [DbContext(typeof(MessageContext))]
    partial class MessageContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "9.0.3");

            modelBuilder.Entity("MessageThread.Models.Message", b =>
                {
                    b.Property<int>("MessageId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Author")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<long>("Datestamp")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("MessageTreeTreeId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Note")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("MessageId");

                    b.HasIndex("MessageTreeTreeId");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("MessageThread.Models.MessageTree", b =>
                {
                    b.Property<int>("TreeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("TreeId");

                    b.ToTable("MessageTrees");
                });

            modelBuilder.Entity("MessageThread.Models.Message", b =>
                {
                    b.HasOne("MessageThread.Models.MessageTree", null)
                        .WithMany("Messages")
                        .HasForeignKey("MessageTreeTreeId");
                });

            modelBuilder.Entity("MessageThread.Models.MessageTree", b =>
                {
                    b.Navigation("Messages");
                });
#pragma warning restore 612, 618
        }
    }
}
