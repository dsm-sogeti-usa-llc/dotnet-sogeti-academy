using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Microsoft.ApplicationInsights.Extensibility;
using Sogeti.Academy.Infrastructure.Configuration;
using Sogeti.Academy.Mvc.General;

namespace Sogeti.Academy.Mvc
{
    public class Global : HttpApplication
    {
        private readonly string _instrumentationKey;

        public Global()
            : this(new Configuration())
        {
            
        }

        public Global(IConfiguration configuration)
        {
            _instrumentationKey = configuration["ApplicationInsights:InstrumentationKey"];
        }

        protected void Application_Start(object sender, EventArgs e)
        {
            TelemetryConfiguration.Active.InstrumentationKey = _instrumentationKey;
            ViewEngines.Engines.Clear();
            ViewEngines.Engines.Add(new FeatureViewEngine());
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }
    }
}