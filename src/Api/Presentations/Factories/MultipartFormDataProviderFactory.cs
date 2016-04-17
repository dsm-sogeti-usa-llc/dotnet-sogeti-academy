using System.Net.Http;
using System.Threading.Tasks;
using Sogeti.Academy.Api.General.Http;
using Sogeti.Academy.Infrastructure.FileSystem;

namespace Sogeti.Academy.Api.Presentations.Factories
{
    public class MultipartFormDataProviderFactory
    {
        private readonly IServer _server;
        private readonly IDirectory _directory;

        public MultipartFormDataProviderFactory()
            : this(new Server(), new Directory())
        {
            
        }

        public MultipartFormDataProviderFactory(IServer server, IDirectory directory)
        {
            _server = server;
            _directory = directory;
        }

        public async Task<MultipartFormDataStreamProvider> GetFormDataProvider(HttpRequestMessage request)
        {
            var root = _server.MapPath("~/App_Data");
            if (!_directory.Exists(root))
                _directory.Create(root);

            var provider = new MultipartFormDataStreamProvider(root);
            await request.Content.ReadAsMultipartAsync(provider);
            return provider;
        }
    }
}