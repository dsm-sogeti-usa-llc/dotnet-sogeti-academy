using System.Net.Http;
using System.Net.NetworkInformation;
using System.Threading.Tasks;
using Sogeti.Academy.Api.General.Http;
using Sogeti.Academy.Application.Presentations.Commands.Add;
using Sogeti.Academy.Infrastructure.FileSystem;

namespace Sogeti.Academy.Api.Presentations.Factories
{
    public interface IAddPresentationViewModelFactory
    {
        Task<AddPresentationViewModel> Create(HttpRequestMessage request);
    }

    public class AddPresentationViewModelFactory : IAddPresentationViewModelFactory
    {
        private readonly MultipartFormDataProviderFactory _multipartFormDataProviderFactory;
        private readonly IAddFileViewModelFactory _addFileViewModelFactory;

        public AddPresentationViewModelFactory(IServer server, IDirectory directory)
        {
            _addFileViewModelFactory = new AddFileViewModelFactory();
            _multipartFormDataProviderFactory = new MultipartFormDataProviderFactory(server, directory);
        }

        public async Task<AddPresentationViewModel> Create(HttpRequestMessage request)
        {
            var provider = await _multipartFormDataProviderFactory.GetFormDataProvider(request);

            return new AddPresentationViewModel
            {
                Description = provider.FormData.GetStringOrDefault("description"),
                Topic = provider.FormData.GetStringOrDefault("topic"),
                Files = _addFileViewModelFactory.Create(provider)
            };
        }
    }
}
