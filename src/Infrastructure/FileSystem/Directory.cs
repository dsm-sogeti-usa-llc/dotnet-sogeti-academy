namespace Sogeti.Academy.Infrastructure.FileSystem
{
    public interface IDirectory
    {
        void Create(string path);
        bool Exists(string path);
    }

    public class Directory : IDirectory
    {
        public void Create(string path)
        {
            System.IO.Directory.CreateDirectory(path);
        }

        public bool Exists(string path)
        {
            return System.IO.Directory.Exists(path);
        }
    }
}