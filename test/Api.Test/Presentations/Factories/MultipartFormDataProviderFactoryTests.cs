using System;
using System.Net.Http;
using AutoMoq;
using Moq;
using Sogeti.Academy.Api.General.Http;
using Sogeti.Academy.Api.Presentations.Factories;
using Sogeti.Academy.Infrastructure.FileSystem;
using Xunit;

namespace Sogeti.Academy.Api.Test.Presentations.Factories
{
    public class MultipartFormDataProviderFactoryTests
    {
        private readonly AutoMoqer _mocker;
        private readonly MultipartFormDataProviderFactory _multipartFormDataProviderFactory;

        public MultipartFormDataProviderFactoryTests()
        {
            _mocker = new AutoMoqer();
            _multipartFormDataProviderFactory = _mocker.Create<MultipartFormDataProviderFactory>();
        }

        [Fact]
        public async void Create_ShouldCreateUploadsFolder()
        {
            var root = Guid.NewGuid().ToString();
            _mocker.GetMock<IServer>().Setup(s => s.MapPath("~/App_Data")).Returns(root);

            var message = new HttpRequestMessage
            {
                Content = new MultipartFormDataContent()
            };
            await _multipartFormDataProviderFactory.GetFormDataProvider(message);
            _mocker.GetMock<IDirectory>()
                .Verify(s => s.Create(root), Times.Once());
        }
        
        [Fact]
        public async void Create_ShouldNotCreateUploadsFolder()
        {
            var root = Guid.NewGuid().ToString();
            _mocker.GetMock<IServer>().Setup(s => s.MapPath("~/App_Data")).Returns(root);
            _mocker.GetMock<IDirectory>().Setup(s => s.Exists(root)).Returns(true);

            var message = new HttpRequestMessage
            {
                Content = new MultipartFormDataContent()
            };

            await _multipartFormDataProviderFactory.GetFormDataProvider(message);
            _mocker.GetMock<IDirectory>()
                .Verify(s => s.Create(root), Times.Never());
        }
    }
}
