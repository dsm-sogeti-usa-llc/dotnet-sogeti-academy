using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Owin;
using Sogeti.Academy.Api;
using Sogeti.Academy.Infrastructure.Configuration;

[assembly:OwinStartup(typeof(Startup))]
namespace Sogeti.Academy.Api
{
    public class Startup
    {
        private readonly string _instrumentationKey;

        public Startup()
            : this(new Configuration())
        {
            
        }

        public Startup(IConfiguration configuration)
        {
            _instrumentationKey = configuration["ApplicationInsights:InstrumentationKey"];
        }

        public void Configuration(IAppBuilder app)
        {
            TelemetryConfiguration.Active.InstrumentationKey = _instrumentationKey;
            app.UseErrorPage();
            app.UseCors(CorsOptions.AllowAll);
            app.UseWebApi(WebApiConfiguration.Create());
        }
    }
}
