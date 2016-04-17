using System;
using System.IO;
using System.Runtime.InteropServices;
using Xunit;
using Directory = Sogeti.Academy.Infrastructure.FileSystem.Directory;

namespace Sogeti.Academy.Infrastructure.Test.FileSystem
{
    public class DirectoryTests : IDisposable
    {
        private readonly Directory _directory;
        private string _path;

        public DirectoryTests()
        {
            _directory = new Directory();
        }

        [Fact]
        public void Exists_ShouldBeTrue()
        {
            _path = Path.Combine(System.IO.Directory.GetCurrentDirectory(), Guid.NewGuid().ToString());
            System.IO.Directory.CreateDirectory(_path);

            Assert.True(_directory.Exists(_path));
        }

        [Fact]
        public void Exists_ShouldBeFalse()
        {
            Assert.False(_directory.Exists(Guid.NewGuid().ToString()));
        }

        [Fact]
        public void Create_ShouldCreateDirectory()
        {
            _path = Path.Combine(System.IO.Directory.GetCurrentDirectory(), Guid.NewGuid().ToString());
            _directory.Create(_path);
            Assert.True(System.IO.Directory.Exists(_path));
        }

        public void Dispose()
        {
            if (System.IO.Directory.Exists(_path))
                System.IO.Directory.Delete(_path, true);
        }
    }
}
